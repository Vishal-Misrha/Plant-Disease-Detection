import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from backend.routes.health import router as health_router
from backend.routes.predict import router as predict_router
from backend.routes.history import router as history_router

app = FastAPI(
    title="PlantCare AI – Plant Disease Detection & Diagnosis API",
    description="High-performance REST API for automated crop disease diagnosis, symptom extraction, and agronomic treatment guidance.",
    version="1.0.0"
)

# Enable CORS for frontend communication (Vite, localhost, production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(health_router)
app.include_router(predict_router)
app.include_router(history_router)

# Mount sample images directory for easy access
sample_images_dir = os.path.join(os.path.dirname(__file__), "sample_images")
os.makedirs(sample_images_dir, exist_ok=True)
app.mount("/samples", StaticFiles(directory=sample_images_dir), name="samples")

@app.get("/")
def root():
    return {
        "message": "Welcome to PlantCare AI REST API",
        "docs": "/docs",
        "health": "/health",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
