from typing import List, Optional, Literal, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class SecondaryPrediction(BaseModel):
    disease: str
    confidence: float

class PredictionResponse(BaseModel):
    id: str
    plant: str
    disease: str
    status: Literal["Healthy", "Diseased", "Uncertain"]
    confidence: float
    symptoms: List[str]
    causes: List[str]
    treatment: List[str]
    prevention: List[str]
    demo: bool = False
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    imageUrl: Optional[str] = None
    severity: Optional[str] = "Moderate"
    scientificName: Optional[str] = None
    secondaryPredictions: Optional[List[SecondaryPrediction]] = []
    notes: Optional[str] = None

class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "PlantCare AI Prediction Engine"
    version: str = "1.0.0"
    device: str = "cpu"
    model_loaded: bool = False
    demo_mode_available: bool = True
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

class HistoryItem(BaseModel):
    id: str
    plant: str
    disease: str
    status: Literal["Healthy", "Diseased", "Uncertain"]
    confidence: float
    timestamp: str
    imageUrl: Optional[str] = None
    severity: Optional[str] = None
    symptoms: Optional[List[str]] = []
    treatment: Optional[List[str]] = []
    prevention: Optional[List[str]] = []
    demo: bool = False
