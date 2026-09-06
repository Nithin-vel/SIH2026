from abc import ABC, abstractmethod
from typing import Dict, Any
import requests
from datetime import datetime

class SoilProvider(ABC):
    @abstractmethod
    def get_soil_properties(self, lat: float, lon: float) -> Dict[str, Any]:
        pass

class ISRICSoilProvider(SoilProvider):
    """
    ISRIC SoilGrids REST API Provider.
    Provides estimated global soil information.
    """
    def __init__(self):
        self.base_url = "https://rest.isric.org/soilgrids/v2.0/properties/query"
        
    def get_soil_properties(self, lat: float, lon: float) -> Dict[str, Any]:
        try:
            # Querying pH and Clay/Sand content at 0-5cm depth
            params = {
                "lon": lon,
                "lat": lat,
                "property": ["phh2o", "clay", "sand", "soc"],
                "depth": ["0-5cm"],
                "value": ["mean"]
            }
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            properties = data.get("properties", {}).get("layers", [])
            
            # Helper to extract the mean value at 0-5cm
            def extract_value(layer_name, conversion_factor=1):
                layer = next((l for l in properties if l["name"] == layer_name), None)
                if layer and layer["depths"]:
                    val = layer["depths"][0].get("values", {}).get("mean")
                    if val is not None:
                        return val / conversion_factor
                return None
                
            # ISRIC pH is in pH * 10
            ph = extract_value("phh2o", 10)
            clay = extract_value("clay", 10) # usually g/kg, divide by 10 for percentage
            sand = extract_value("sand", 10)
            soc = extract_value("soc", 10)
            
            # Estimate texture class roughly
            texture = "loamy"
            if clay and clay > 40: texture = "clayey"
            elif sand and sand > 70: texture = "sandy"
            
            return {
                "source": "geospatial_estimate",
                "provider": "ISRIC SoilGrids",
                "retrieved_at": datetime.utcnow().isoformat(),
                "coordinates": {"lat": lat, "lon": lon},
                "ph": ph,
                "texture": texture,
                "organic_carbon": soc,
                "measurement_type": "estimated"
            }
            
        except Exception as e:
            # Fallback if ISRIC is down
            return {
                "source": "geospatial_estimate",
                "provider": "ISRIC SoilGrids (Failed)",
                "error": str(e),
                "measurement_type": "estimated",
                "ph": None,
                "texture": "unknown"
            }
