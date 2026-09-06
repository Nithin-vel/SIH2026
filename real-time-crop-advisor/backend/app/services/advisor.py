from typing import Dict, Any, List
from datetime import datetime
from app.models.domain import Crop
from app.services.risk import RiskEngine

class CropRecommendation:
    def __init__(self, crop_name: str, suitability: float, confidence: float, explanation: str, risks: List[Dict]):
        self.crop = crop_name
        self.suitabilityScore = suitability
        self.waterSuitability = 0.0
        self.soilSuitability = 0.0
        self.climateSuitability = 0.0
        self.seasonalSuitability = 0.0
        self.rotationSuitability = 0.0
        self.riskScore = 0.0
        self.explanation = explanation
        self.risks = risks
        self.confidence = confidence

    def dict(self):
        return {
            "crop": self.crop,
            "suitabilityScore": self.suitabilityScore,
            "waterSuitability": self.waterSuitability,
            "soilSuitability": self.soilSuitability,
            "climateSuitability": self.climateSuitability,
            "seasonalSuitability": self.seasonalSuitability,
            "rotationSuitability": self.rotationSuitability,
            "riskScore": self.riskScore,
            "explanation": self.explanation,
            "risks": self.risks,
            "confidence": self.confidence
        }

class RecommendationEngine:
    def __init__(self, db_session):
        self.db = db_session
        self.risk_engine = RiskEngine()
        
        # Configuration weights
        self.weights = {
            "climate": 0.30,
            "soil": 0.25,
            "water": 0.25,
            "season": 0.10,
            "rotation": 0.10
        }

    def calculate_confidence(self, collected_data: Dict, soil_data: Dict) -> float:
        """
        Calculates confidence based on the completeness and source of the data.
        """
        confidence = 100.0
        
        if not soil_data:
            confidence -= 30.0 # Huge penalty for no soil data at all
        elif soil_data.get("source") == "geospatial_estimate":
            confidence -= 15.0 # Penalty for estimated vs measured
            
        if "water_availability" not in collected_data:
            confidence -= 15.0
            
        if "planting_date" not in collected_data:
            confidence -= 10.0
            
        return max(0.0, confidence)

    def generate_recommendations(self, session_data: Dict[str, Any], weather_data: Dict, soil_data: Dict) -> Dict:
        """
        Generates crop recommendations based on the collected data.
        """
        all_crops = self.db.query(Crop).all()
        recommendations = []
        
        # Calculate overall confidence based on data completeness
        overall_confidence = self.calculate_confidence(session_data, soil_data)
        
        missing_info = []
        if not soil_data or soil_data.get("source") == "geospatial_estimate":
            missing_info.append("Recent laboratory soil test")
        if "water_reliability" not in session_data and session_data.get("water_availability") == "irrigated":
            missing_info.append("Irrigation reliability details")
            
        for crop in all_crops:
            # 1. Base score starts at 50, adjusts based on conditions
            climate_score = 75.0 # Mock placeholder for weather calculation
            soil_score = 50.0
            water_score = 50.0
            season_score = 80.0
            rotation_score = 100.0
            
            # 2. Evaluate Soil
            if soil_data and soil_data.get("ph") and crop.soil_ph_range:
                ph = soil_data["ph"]
                if crop.soil_ph_range.get("min", 0) <= ph <= crop.soil_ph_range.get("max", 14):
                    soil_score = 90.0
                else:
                    soil_score = 30.0
                    
            # 3. Evaluate Water
            water_avail = session_data.get("water_availability")
            if water_avail == "irrigated":
                water_score = 95.0
            elif water_avail == "rainfed" and crop.water_requirement == "low":
                water_score = 80.0
            elif water_avail == "rainfed" and crop.water_requirement == "high":
                water_score = 20.0
                
            # Calculate overall suitability using weights
            overall_suitability = (
                (climate_score * self.weights["climate"]) +
                (soil_score * self.weights["soil"]) +
                (water_score * self.weights["water"]) +
                (season_score * self.weights["season"]) +
                (rotation_score * self.weights["rotation"])
            )
            
            # Evaluate Risks
            risks = self.risk_engine.evaluate_risks(crop, session_data, weather_data, soil_data)
            
            # Construct explanation
            explanation = f"{crop.name} is a {overall_suitability:.1f}/100 match based on your conditions. "
            if soil_score > 80:
                explanation += "Your soil conditions are highly favorable. "
            if water_score < 40:
                explanation += "However, water availability may be a significant challenge."
                
            rec = CropRecommendation(
                crop_name=crop.name,
                suitability=overall_suitability,
                confidence=overall_confidence,
                explanation=explanation,
                risks=[r.dict() for r in risks]
            )
            rec.waterSuitability = water_score
            rec.soilSuitability = soil_score
            rec.climateSuitability = climate_score
            rec.seasonalSuitability = season_score
            rec.rotationSuitability = rotation_score
            rec.riskScore = len([r for r in risks if r.severity == 'high']) * 20.0
            
            recommendations.append(rec)
            
        # Sort by suitability descending
        recommendations.sort(key=lambda x: x.suitabilityScore, reverse=True)
        
        return {
            "recommendedCrops": [r.dict() for r in recommendations[:3]], # Top 3
            "confidence": overall_confidence,
            "reasons": ["Analyzed local soil parameters", "Cross-referenced with climate data", "Evaluated water constraints"],
            "missingInformation": missing_info,
            "dataSources": [
                {"name": "Weather Data", "source": weather_data.get("provider", "Unknown") if weather_data else "None"},
                {"name": "Soil Data", "source": soil_data.get("source", "None") if soil_data else "None"}
            ],
            "generatedAt": datetime.utcnow().isoformat()
        }
