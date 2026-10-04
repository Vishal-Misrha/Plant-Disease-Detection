from fastapi import APIRouter, HTTPException, Query, status
from typing import List, Optional, Dict, Any
from backend.models.schemas import HistoryItem
from backend.services.history_service import history_service

router = APIRouter(prefix="/history", tags=["History"])

@router.get("", response_model=List[HistoryItem])
def get_history(
    q: Optional[str] = Query(None, description="Search term for plant or disease"),
    plant: Optional[str] = Query(None, description="Filter by crop name"),
    status: Optional[str] = Query(None, description="Filter by status (Healthy/Diseased/Uncertain)")
):
    """Retrieve all saved plant disease detection records with filtering."""
    return history_service.list_all(query=q, plant=plant, status=status)

@router.get("/stats/summary")
def get_dashboard_stats() -> Dict[str, Any]:
    """Retrieve computed analytics and summary metrics for the plant health dashboard."""
    records = history_service.list_all()
    total = len(records)
    if total == 0:
        return {
            "total_scans": 0,
            "healthy_count": 0,
            "diseased_count": 0,
            "uncertain_count": 0,
            "avg_confidence": 0.0,
            "top_disease": "None detected",
            "recent": []
        }

    healthy_count = sum(1 for r in records if r.get("status") == "Healthy")
    diseased_count = sum(1 for r in records if r.get("status") == "Diseased")
    uncertain_count = sum(1 for r in records if r.get("status") == "Uncertain")
    avg_conf = round(sum(r.get("confidence", 0.0) for r in records) / total, 1)

    # Frequency count of diseases
    disease_counts: Dict[str, int] = {}
    for r in records:
        if r.get("status") == "Diseased":
            dis = r.get("disease", "Unknown")
            disease_counts[dis] = disease_counts.get(dis, 0) + 1

    top_disease = max(disease_counts, key=disease_counts.get) if disease_counts else "None"

    return {
        "total_scans": total,
        "healthy_count": healthy_count,
        "diseased_count": diseased_count,
        "uncertain_count": uncertain_count,
        "avg_confidence": avg_conf,
        "top_disease": top_disease,
        "recent": records[:5]
    }

@router.get("/{item_id}", response_model=HistoryItem)
def get_history_item(item_id: str):
    """Retrieve details for a single detection scan."""
    item = history_service.get_by_id(item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection scan with ID '{item_id}' not found."
        )
    return item

@router.delete("/{item_id}")
def delete_history_item(item_id: str):
    """Delete a detection record from history."""
    deleted = history_service.delete(item_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Detection record with ID '{item_id}' not found."
        )
    return {"status": "success", "message": f"Record '{item_id}' successfully removed."}
