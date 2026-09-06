from sqlalchemy import Column, Integer, String, Float, Boolean, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime

class FarmerProfile(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String, unique=True)
    fields = relationship("Field", back_populates="farmer")

class Field(Base):
    __tablename__ = "fields"
    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    area_acres = Column(Float)
    location = Column(JSON) # Store as {"lat": ..., "lon": ...}
    
    farmer = relationship("FarmerProfile", back_populates="fields")
    soil_tests = relationship("SoilTest", back_populates="field")

class SoilTest(Base):
    __tablename__ = "soil_tests"
    id = Column(Integer, primary_key=True, index=True)
    field_id = Column(Integer, ForeignKey("fields.id"))
    ph = Column(Float, nullable=True)
    nitrogen = Column(Float, nullable=True)
    phosphorus = Column(Float, nullable=True)
    potassium = Column(Float, nullable=True)
    organic_carbon = Column(Float, nullable=True)
    ec = Column(Float, nullable=True)
    tested_at = Column(DateTime, default=datetime.utcnow)
    source = Column(String, default="farmer_entered") # farmer_entered, lab_report, geospatial_estimate
    
    field = relationship("Field", back_populates="soil_tests")

class Crop(Base):
    __tablename__ = "crops"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    scientific_name = Column(String)
    
    # Requirements stored as JSON for flexibility
    temperature_range = Column(JSON) # {"min": 15, "max": 35, "optimal_min": 20, "optimal_max": 30}
    rainfall_requirement = Column(JSON) # {"min_mm": 500, "max_mm": 1500}
    soil_ph_range = Column(JSON) # {"min": 6.0, "max": 7.5}
    soil_texture_preferences = Column(JSON) # ["loam", "clay-loam"]
    water_requirement = Column(String)
    growth_duration_days = Column(JSON) # {"min": 90, "max": 120}
    planting_windows = Column(JSON) # [{"start_month": 6, "end_month": 7}]
    
    # Tolerances
    drought_tolerance = Column(String) # low, medium, high
    waterlogging_tolerance = Column(String)
    salinity_tolerance = Column(String)
    
    # Risks and other
    major_risks = Column(JSON)
    nutrient_requirements = Column(JSON)
    source_references = Column(JSON)

class AdvisorSession(Base):
    __tablename__ = "advisor_sessions"
    id = Column(String, primary_key=True, index=True) # UUID
    field_id = Column(Integer, ForeignKey("fields.id"), nullable=True)
    status = Column(String, default="gathering_info") # gathering_info, ready, completed
    collected_data = Column(JSON, default=dict) # {"water_availability": "irrigated", "previous_crop": "wheat"}
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"
    id = Column(String, primary_key=True) # UUID
    session_id = Column(String, ForeignKey("advisor_sessions.id"))
    recommended_crops = Column(JSON) # List of crop recommendations with scores
    confidence = Column(Float)
    reasons = Column(JSON)
    risks = Column(JSON)
    missing_information = Column(JSON)
    data_sources = Column(JSON)
    generated_at = Column(DateTime, default=datetime.utcnow)
