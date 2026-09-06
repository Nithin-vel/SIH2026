import pytest
from app.services.advisor import RecommendationEngine
from app.models.domain import Crop

class MockDB:
    def query(self, model):
        self.model = model
        return self
    
    def all(self):
        # Mock some crops
        c1 = Crop(name="Wheat", water_requirement="medium", soil_ph_range={"min": 6.0, "max": 7.5})
        c2 = Crop(name="Rice", water_requirement="high", soil_ph_range={"min": 5.5, "max": 7.0})
        c3 = Crop(name="Millets", water_requirement="low", soil_ph_range={"min": 5.0, "max": 8.0})
        return [c1, c2, c3]

def test_confidence_calculation():
    db = MockDB()
    engine = RecommendationEngine(db)
    
    # Missing soil test
    session_data = {"water_availability": "rainfed", "planting_date": "2026-06-01"}
    soil_data = {"source": "geospatial_estimate"}
    
    conf = engine.calculate_confidence(session_data, soil_data)
    assert conf == 85.0 # 100 - 15 (estimated soil)
    
    # Missing everything
    conf = engine.calculate_confidence({}, {})
    assert conf == 45.0 # 100 - 30 (no soil) - 15 (no water) - 10 (no date)

def test_recommendation_generation():
    db = MockDB()
    engine = RecommendationEngine(db)
    
    session_data = {"water_availability": "rainfed", "planting_date": "2026-06-01"}
    soil_data = {"source": "farmer_soil_test", "ph": 6.5}
    weather_data = {"temperature": 25.0}
    
    recs = engine.generate_recommendations(session_data, weather_data, soil_data)
    
    assert "recommendedCrops" in recs
    assert len(recs["recommendedCrops"]) > 0
    assert recs["confidence"] == 100.0 # High confidence since we provided measured soil and all basic info
