from pydantic import BaseModel

class AnalysisResponse(BaseModel):

    ats_score: float

    matched_skills: list

    missing_skills: list

    recommendations: list

    roadmap: list
