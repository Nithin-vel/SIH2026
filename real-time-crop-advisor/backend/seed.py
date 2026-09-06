from app.core.database import SessionLocal, Base, engine
from app.models.domain import Crop

# Create tables
Base.metadata.create_all(bind=engine)

def seed_db():
    db = SessionLocal()
    if db.query(Crop).count() == 0:
        print("Seeding crops...")
        crops = [
            Crop(
                name="Groundnut",
                water_requirement="medium",
                soil_ph_range={"min": 6.0, "max": 7.5},
                growth_duration_days={"min": 90, "max": 120}
            ),
            Crop(
                name="Paddy",
                water_requirement="high",
                soil_ph_range={"min": 5.5, "max": 6.5},
                growth_duration_days={"min": 100, "max": 150}
            ),
            Crop(
                name="Tomato",
                water_requirement="medium",
                soil_ph_range={"min": 6.0, "max": 7.0},
                growth_duration_days={"min": 90, "max": 120}
            ),
            Crop(
                name="Maize",
                water_requirement="medium",
                soil_ph_range={"min": 5.8, "max": 7.0},
                growth_duration_days={"min": 90, "max": 120}
            )
        ]
        db.add_all(crops)
        db.commit()
        print("Done seeding.")
    else:
        print("Already seeded.")
    db.close()

if __name__ == "__main__":
    seed_db()
