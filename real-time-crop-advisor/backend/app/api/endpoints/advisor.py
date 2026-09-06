from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.domain import AdvisorSession
from app.schemas.questions import Answer, AdvisorSessionSchema
from app.services.questions import AdaptiveQuestionEngine
from app.services.advisor import RecommendationEngine
from app.providers.weather import OpenMeteoProvider
from app.providers.soil import ISRICSoilProvider
import uuid

router = APIRouter()
question_engine = AdaptiveQuestionEngine()

@router.post("/session", response_model=AdvisorSessionSchema)
def create_session(db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    new_session = AdvisorSession(
        id=session_id,
        status="gathering_info",
        collected_data={}
    )
    db.add(new_session)
    db.commit()
    db.refresh(new_session)
    return AdvisorSessionSchema(
        session_id=new_session.id,
        status=new_session.status,
        collected_data=new_session.collected_data
    )

@router.get("/session/{session_id}")
def get_session(session_id: str, db: Session = Depends(get_db)):
    session = db.query(AdvisorSession).filter(AdvisorSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.get("/session/{session_id}/next-question")
def get_next_question(session_id: str, db: Session = Depends(get_db)):
    session = db.query(AdvisorSession).filter(AdvisorSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    next_q = question_engine.get_next_question(session.collected_data)
    
    if not next_q:
        session.status = "ready"
        db.commit()
        return {"status": "ready", "message": "All necessary information collected."}
        
    return next_q

@router.post("/session/{session_id}/answer")
def submit_answer(session_id: str, answer: Answer, db: Session = Depends(get_db)):
    session = db.query(AdvisorSession).filter(AdvisorSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    # Update JSON collected data
    collected = dict(session.collected_data)
    collected[answer.question_id] = answer.value
    session.collected_data = collected
    
    # Check if we have enough info now
    next_q = question_engine.get_next_question(collected)
    if not next_q:
        session.status = "ready"
        
    db.commit()
    
    return {"status": session.status, "collected_data": collected}

@router.get("/session/{session_id}/recommendations")
def get_recommendations(session_id: str, db: Session = Depends(get_db)):
    session = db.query(AdvisorSession).filter(AdvisorSession.id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    if session.status != "ready" and session.status != "completed":
        # Allow partial recommendations but with lower confidence warning
        pass
        
    data = session.collected_data
    
    # Fetch Weather Data based on location if provided
    weather_data = {}
    soil_data = {}
    
    if "location" in data:
        # Assuming location is passed as {"lat": 11.0, "lon": 77.0}
        loc = data["location"]
        lat = loc.get("lat")
        lon = loc.get("lon")
        
        if lat and lon:
            weather_provider = OpenMeteoProvider()
            weather_data = weather_provider.get_current_weather(lat, lon)
            
            # If no manual soil test is provided, fetch geospatial data
            if not data.get("has_soil_test", False):
                soil_provider = ISRICSoilProvider()
                soil_data = soil_provider.get_soil_properties(lat, lon)
                
    # If manual soil test is provided, construct soil data from collected_data
    if data.get("has_soil_test", False):
        soil_data = {
            "source": "farmer_soil_test",
            "measurement_type": "measured",
            "ph": data.get("soil_ph"),
            "texture": data.get("soil_texture")
        }
        
    engine = RecommendationEngine(db)
    recs = engine.generate_recommendations(data, weather_data, soil_data)
    
    session.status = "completed"
    db.commit()
    
    return recs
