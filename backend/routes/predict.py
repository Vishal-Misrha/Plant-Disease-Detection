from fastapi import APIRouter, UploadFile, File, Form, Query, HTTPException, status
from typing import Optional
from backend.models.schemas import PredictionResponse
from backend.services.prediction_service import prediction_service
from backend.services.history_service import history_service

router = APIRouter(tags=["Prediction"])

@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(
    file: UploadFile = File(..., description="Plant leaf image (JPG, PNG, WEBP)"),
    demo: Optional[bool] = Query(False, description="Explicitly enable demo simulation mode")
):
    """
    Analyzes an uploaded plant leaf image using deep learning or deterministic feature classifier.
    Returns:
    - Plant species
    - Disease diagnosis & status (Healthy / Diseased / Uncertain)
    - Confidence score
    - Visible symptoms
    - Probable causes
    - Practical treatments & preventive cultural controls
    """
    if not file or not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No leaf image provided. Please select or capture a plant leaf photo."
        )

    try:
        content = await file.read()
        if len(content) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file is empty. Please provide a valid leaf image."
            )

        # Run prediction
        result = prediction_service.predict_leaf(
            file_bytes=content,
            filename=file.filename,
            force_demo=demo
        )

        # Automatically store in detection history
        history_service.add(result)

        return result

    except ValueError as val_err:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(val_err)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unable to analyze this image. Please check the image quality and try again. ({str(e)})"
        )
