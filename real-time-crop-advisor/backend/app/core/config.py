from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Real-Time Crop Advisor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "sqlite:///./crop_advisor.db"
    
    # Optional APIs
    WEATHER_API_KEY: str | None = None
    SOIL_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
