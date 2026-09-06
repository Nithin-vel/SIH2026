from pydantic import BaseModel
from typing import List, Dict, Optional, Any

class QuestionOption(BaseModel):
    label: str
    value: str

class Question(BaseModel):
    id: str
    question: str
    type: str # select, text, number, boolean
    options: Optional[List[QuestionOption]] = None
    required_when: Optional[Dict[str, Any]] = None
    importance: float = 1.0

class Answer(BaseModel):
    question_id: str
    value: Any

class AdvisorSessionSchema(BaseModel):
    session_id: str
    status: str
    collected_data: Dict[str, Any]
