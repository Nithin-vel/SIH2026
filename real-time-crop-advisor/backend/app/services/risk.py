from typing import List, Dict, Any

class Risk:
    def __init__(self, type: str, severity: str, explanation: str, evidence: str, mitigation: str):
        self.type = type
        self.severity = severity # high, medium, low
        self.explanation = explanation
        self.evidence = evidence
        self.mitigation = mitigation
        
    def dict(self):
        return {
            "type": self.type,
            "severity": self.severity,
            "explanation": self.explanation,
            "evidence": self.evidence,
            "mitigation": self.mitigation
        }

class RiskEngine:
    def evaluate_risks(self, crop: Any, field_data: Dict, weather_data: Dict, soil_data: Dict) -> List[Risk]:
        risks = []
        
        # Check water availability
        water_avail = field_data.get("water_availability", "unknown")
        if water_avail == "rainfed" and crop.water_requirement == "high":
            risks.append(Risk(
                type="drought",
                severity="high",
                explanation=f"{crop.name} has a high water requirement but is planned for a rainfed field.",
                evidence="Farmer indicated field is rainfed.",
                mitigation="Ensure supplemental irrigation is available or choose a more drought-tolerant crop."
            ))
            
        # Check soil pH risks if data exists
        if soil_data and soil_data.get("ph"):
            ph = soil_data["ph"]
            if crop.soil_ph_range:
                min_ph = crop.soil_ph_range.get("min", 0)
                max_ph = crop.soil_ph_range.get("max", 14)
                if ph < min_ph or ph > max_ph:
                    risks.append(Risk(
                        type="unsuitable_soil_ph",
                        severity="medium",
                        explanation=f"Soil pH of {ph} is outside the optimal range for {crop.name}.",
                        evidence=f"Measured/Estimated pH is {ph}. Optimal is {min_ph}-{max_ph}.",
                        mitigation="Consider soil amendments like lime for acidic soil or sulfur for alkaline soil before planting."
                    ))
                    
        # Future: Add forecast weather risks (heavy rain, heat stress, etc.)
        
        return risks
