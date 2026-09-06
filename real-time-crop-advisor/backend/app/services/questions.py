from app.schemas.questions import Question, QuestionOption
from typing import Dict, Any, Optional

# Predefined Knowledge Base of Questions
# In a full production system, this could be loaded from the database.
QUESTIONS_KB = [
    Question(
        id="location",
        question="What is the location of your field?",
        type="location", # Custom UI component will handle this (Map/GPS)
        importance=1.0
    ),
    Question(
        id="land_area",
        question="What is the cultivable land area (in acres)?",
        type="number",
        importance=0.9
    ),
    Question(
        id="planting_date",
        question="When do you intend to plant?",
        type="date",
        importance=1.0
    ),
    Question(
        id="water_availability",
        question="What is the primary source of water for this crop?",
        type="select",
        options=[
            QuestionOption(label="Rainfed (No Irrigation)", value="rainfed"),
            QuestionOption(label="Irrigated (Reliable Well/Canal)", value="irrigated"),
            QuestionOption(label="Partially Irrigated (Limited)", value="partial")
        ],
        importance=1.0
    ),
    Question(
        id="water_reliability",
        question="How reliable is the irrigation during the growing season?",
        type="select",
        options=[
            QuestionOption(label="Very Reliable", value="reliable"),
            QuestionOption(label="Sometimes unavailable", value="inconsistent"),
            QuestionOption(label="Very limited", value="limited")
        ],
        required_when={"water_availability": "irrigated"},
        importance=0.8
    ),
    Question(
        id="previous_crop",
        question="What was the previous crop grown in this field?",
        type="text", # Could be a searchable select
        importance=0.9
    ),
    Question(
        id="has_soil_test",
        question="Do you have a recent soil test report for this field?",
        type="boolean",
        importance=0.8
    ),
    Question(
        id="soil_ph",
        question="What is the soil pH from your report?",
        type="number",
        required_when={"has_soil_test": True},
        importance=0.9
    ),
    Question(
        id="soil_texture",
        question="What is the primary soil texture?",
        type="select",
        options=[
            QuestionOption(label="Sandy", value="sandy"),
            QuestionOption(label="Loamy", value="loamy"),
            QuestionOption(label="Clayey", value="clayey")
        ],
        required_when={"has_soil_test": False}, # Ask if no test is available and geo-data is weak
        importance=0.7
    )
]

class AdaptiveQuestionEngine:
    def __init__(self, questions=QUESTIONS_KB):
        self.questions = questions

    def evaluate_condition(self, condition: Dict[str, Any], collected_data: Dict[str, Any]) -> bool:
        """
        Evaluates the `required_when` conditions against the already collected data.
        """
        for key, expected_value in condition.items():
            if key not in collected_data:
                return False
            if collected_data[key] != expected_value:
                return False
        return True

    def get_next_question(self, collected_data: Dict[str, Any]) -> Optional[Question]:
        """
        Determines the most important missing question that needs to be asked.
        Calculates information value based on missing critical fields.
        """
        candidate_questions = []

        for q in self.questions:
            # Skip if already answered
            if q.id in collected_data:
                continue
            
            # Check dependency condition
            if q.required_when is not None:
                if not self.evaluate_condition(q.required_when, collected_data):
                    continue
            
            candidate_questions.append(q)

        if not candidate_questions:
            return None # We have enough info!

        # Sort candidates by importance (highest first)
        # We can expand this later to use information-theory/entropy calculations.
        candidate_questions.sort(key=lambda x: x.importance, reverse=True)
        
        return candidate_questions[0]
