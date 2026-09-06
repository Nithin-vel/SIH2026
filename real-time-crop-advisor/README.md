# Real-Time Crop Advisor

A production-quality web application that provides personalized, real-time crop recommendations to farmers based on their actual field conditions, weather data, and soil metrics.

## Architecture

* **Frontend**: Next.js, React, Tailwind CSS
* **Backend**: FastAPI (Python)
* **Database**: PostgreSQL with PostGIS extension for spatial queries
* **External Providers**: 
  * Open-Meteo for real-time and forecast weather
  * ISRIC SoilGrids for geospatial soil estimation

## Core Features

1. **Adaptive Question Engine**: Instead of long forms, the system intelligently asks only the minimum necessary questions. It evaluates the "information value" of each question based on previous answers (e.g., it won't ask for soil pH if you don't have a lab report; it will fetch geospatial estimates instead).
2. **Crop Recommendation Engine**: Separates **Suitability** (how well the crop matches the environment) from **Confidence** (how reliable the input data is). 
3. **Risk Engine**: Identifies specific risks (e.g., drought risk if rainfed and crop has high water requirements) and provides mitigation strategies.
4. **Data Provenance**: Every metric retains its source (measured vs. estimated) to ensure trustworthy recommendations.

## Setup Instructions

### 1. Database Setup
Ensure Docker is installed.
```bash
docker-compose up -d
```
This will start a PostgreSQL instance with PostGIS enabled on port 5432.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt

# Run the API
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Running Tests
```bash
cd backend
pytest tests/
```
