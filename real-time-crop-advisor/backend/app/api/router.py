from fastapi import APIRouter
from .endpoints import advisor, fields, recommendations, data

api_router = APIRouter()

api_router.include_router(fields.router, prefix="/fields", tags=["Fields"])
api_router.include_router(advisor.router, prefix="/advisor", tags=["Advisor Session"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
api_router.include_router(data.router, prefix="/data", tags=["Data Sources (Weather, Soil, Crops)"])
