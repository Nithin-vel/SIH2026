import pytest
from app.services.questions import AdaptiveQuestionEngine, Question, QuestionOption

def test_question_engine_initial():
    engine = AdaptiveQuestionEngine()
    # Initially with no data, it should ask the highest importance question that has no unmet dependencies
    collected_data = {}
    next_q = engine.get_next_question(collected_data)
    
    assert next_q is not None
    # Usually location or planting_date are 1.0 importance
    assert next_q.importance == 1.0

def test_question_engine_dependency():
    engine = AdaptiveQuestionEngine()
    
    # If water_availability is irrigated, it should ask water_reliability
    collected_data = {
        "location": {"lat": 10, "lon": 77},
        "land_area": 5,
        "planting_date": "2026-06-01",
        "water_availability": "irrigated",
        "previous_crop": "wheat",
        "has_soil_test": True,
        "soil_ph": 6.5
    }
    
    next_q = engine.get_next_question(collected_data)
    assert next_q is not None
    assert next_q.id == "water_reliability"

def test_question_engine_completion():
    engine = AdaptiveQuestionEngine()
    
    collected_data = {
        "location": {"lat": 10, "lon": 77},
        "land_area": 5,
        "planting_date": "2026-06-01",
        "water_availability": "rainfed", # water_reliability not required
        "previous_crop": "wheat",
        "has_soil_test": True,
        "soil_ph": 6.5
    }
    
    next_q = engine.get_next_question(collected_data)
    assert next_q is None # All required questions answered
