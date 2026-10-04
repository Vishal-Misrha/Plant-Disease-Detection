from fastapi import APIRouter
from backend.models.schemas import HealthResponse
from backend.services.prediction_service import prediction_service

router = APIRouter(tags=["Health"])

@router.get("/health", response_model=HealthResponse)
def get_health():
    """Health check endpoint confirming API status, model availability, and device."""
    return HealthResponse(
        status="ok",
        service="PlantCare AI Prediction Engine",
        version="1.0.0",
        device=prediction_service.ml_engine.device,
        model_loaded=prediction_service.ml_engine.is_loaded(),
        demo_mode_available=True
    )
