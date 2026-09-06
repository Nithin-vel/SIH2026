from abc import ABC, abstractmethod
from typing import Dict, Any
import requests
from datetime import datetime

class WeatherProvider(ABC):
    @abstractmethod
    def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        pass
        
    @abstractmethod
    def get_forecast(self, lat: float, lon: float) -> Dict[str, Any]:
        pass

class OpenMeteoProvider(WeatherProvider):
    """
    Free/Open-Source Weather Provider using Open-Meteo.
    Requires no API key.
    """
    def __init__(self):
        self.base_url = "https://api.open-meteo.com/v1"
        
    def get_current_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        url = f"{self.base_url}/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        return {
            "provider": "Open-Meteo",
            "retrieved_at": datetime.utcnow().isoformat(),
            "coordinates": {"lat": lat, "lon": lon},
            "temperature": data["current"]["temperature_2m"],
            "humidity": data["current"]["relative_humidity_2m"],
            "precipitation": data["current"]["precipitation"],
            "wind_speed": data["current"]["wind_speed_10m"]
        }
        
    def get_forecast(self, lat: float, lon: float) -> Dict[str, Any]:
        url = f"{self.base_url}/forecast?latitude={lat}&longitude={lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        return {
            "provider": "Open-Meteo",
            "retrieved_at": datetime.utcnow().isoformat(),
            "forecast_days": len(data["daily"]["time"]),
            "daily": data["daily"]
        }
