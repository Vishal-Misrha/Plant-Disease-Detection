import os
import json
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from backend.models.schemas import PredictionResponse, HistoryItem

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
HISTORY_FILE = os.path.join(DATA_DIR, "history.json")

# Sample starter history for demonstration
SEED_HISTORY: List[Dict[str, Any]] = [
    {
        "id": "hist-1001",
        "plant": "Tomato",
        "disease": "Early Blight",
        "status": "Diseased",
        "confidence": 94.6,
        "timestamp": (datetime.now() - timedelta(hours=2)).isoformat(),
        "severity": "Moderate",
        "demo": True,
        "symptoms": [
            "Concentric ring dark brown spots on older foliage",
            "Yellow halo surrounding lesions"
        ],
        "treatment": [
            "Prune infected bottom leaves",
            "Apply copper-based fungicide spray"
        ],
        "prevention": [
            "Maintain drip irrigation",
            "Apply organic mulch around stems"
        ]
    },
    {
        "id": "hist-1002",
        "plant": "Tomato",
        "disease": "Healthy Leaf",
        "status": "Healthy",
        "confidence": 97.8,
        "timestamp": (datetime.now() - timedelta(hours=6)).isoformat(),
        "severity": "None",
        "demo": True,
        "symptoms": [
            "Vibrant green leaf blade without blemishes"
        ],
        "treatment": [
            "Maintain current watering and sunlight"
        ],
        "prevention": [
            "Weekly scouting for pests"
        ]
    },
    {
        "id": "hist-1003",
        "plant": "Potato",
        "disease": "Late Blight",
        "status": "Diseased",
        "confidence": 92.4,
        "timestamp": (datetime.now() - timedelta(days=1)).isoformat(),
        "severity": "Critical",
        "demo": True,
        "symptoms": [
            "Water-soaked dark lesions",
            "Fuzzy white mold on underside in humid air"
        ],
        "treatment": [
            "Immediately destroy affected vine tissue",
            "Apply cymoxanil or mancozeb"
        ],
        "prevention": [
            "Use certified seed tubers",
            "Ensure wide spacing for air circulation"
        ]
    },
    {
        "id": "hist-1004",
        "plant": "Apple",
        "disease": "Apple Scab",
        "status": "Diseased",
        "confidence": 91.5,
        "timestamp": (datetime.now() - timedelta(days=2)).isoformat(),
        "severity": "Moderate to High",
        "demo": True,
        "symptoms": [
            "Olive-green velvety scabs on leaf surface"
        ],
        "treatment": [
            "Rake and compost fallen leaves",
            "Apply sulfur or captan spray"
        ],
        "prevention": [
            "Winter pruning to open tree canopy"
        ]
    },
    {
        "id": "hist-1005",
        "plant": "Corn (Maize)",
        "disease": "Common Rust",
        "status": "Diseased",
        "confidence": 88.9,
        "timestamp": (datetime.now() - timedelta(days=3)).isoformat(),
        "severity": "Moderate",
        "demo": True,
        "symptoms": [
            "Cinnamon-brown powdery pustules"
        ],
        "treatment": [
            "Apply azoxystrobin if ear leaf is affected"
        ],
        "prevention": [
            "Plant rust-resistant hybrids"
        ]
    },
    {
        "id": "hist-1006",
        "plant": "Bell Pepper",
        "disease": "Healthy Leaf",
        "status": "Healthy",
        "confidence": 98.2,
        "timestamp": (datetime.now() - timedelta(days=4)).isoformat(),
        "severity": "None",
        "demo": True,
        "symptoms": [
            "Glossy, emerald-green leaves without spotting"
        ],
        "treatment": [
            "No chemical treatment required"
        ],
        "prevention": [
            "Consistent moisture delivery via drip irrigation"
        ]
    }
]

class HistoryService:
    def __init__(self):
        os.makedirs(DATA_DIR, exist_ok=True)
        self.records: List[Dict[str, Any]] = []
        self._load()

    def _load(self):
        if os.path.exists(HISTORY_FILE):
            try:
                with open(HISTORY_FILE, "r", encoding="utf-8") as f:
                    self.records = json.load(f)
                    return
            except Exception as e:
                print(f"[HistoryService] Warning: Could not read history file: {e}")
        # Initialize with seed data
        self.records = list(SEED_HISTORY)
        self._save()

    def _save(self):
        try:
            with open(HISTORY_FILE, "w", encoding="utf-8") as f:
                json.dump(self.records, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"[HistoryService] Error saving history: {e}")

    def add(self, item: PredictionResponse) -> Dict[str, Any]:
        data = {
            "id": item.id,
            "plant": item.plant,
            "disease": item.disease,
            "status": item.status,
            "confidence": item.confidence,
            "timestamp": item.timestamp,
            "imageUrl": item.imageUrl,
            "severity": item.severity,
            "symptoms": item.symptoms,
            "treatment": item.treatment,
            "prevention": item.prevention,
            "demo": item.demo,
            "scientificName": item.scientificName
        }
        # Insert at the beginning so newest scans appear first
        self.records.insert(0, data)
        self._save()
        return data

    def list_all(
        self,
        query: Optional[str] = None,
        plant: Optional[str] = None,
        status: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        results = self.records
        if query:
            q = query.lower()
            results = [
                r for r in results
                if q in r.get("plant", "").lower() or q in r.get("disease", "").lower()
            ]
        if plant and plant.lower() != "all":
            results = [r for r in results if r.get("plant", "").lower() == plant.lower()]
        if status and status.lower() != "all":
            results = [r for r in results if r.get("status", "").lower() == status.lower()]
        return results

    def get_by_id(self, item_id: str) -> Optional[Dict[str, Any]]:
        for r in self.records:
            if r.get("id") == item_id:
                return r
        return None

    def delete(self, item_id: str) -> bool:
        initial_len = len(self.records)
        self.records = [r for r in self.records if r.get("id") != item_id]
        if len(self.records) != initial_len:
            self._save()
            return True
        return False

# Singleton instance
history_service = HistoryService()
