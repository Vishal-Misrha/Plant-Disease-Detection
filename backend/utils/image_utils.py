import io
import base64
import hashlib
from typing import Tuple, Dict, Any, Optional
from PIL import Image
import numpy as np

MAX_IMAGE_SIZE_BYTES = 15 * 1024 * 1024  # 15MB
ALLOWED_FORMATS = {"JPEG", "JPG", "PNG", "WEBP"}

def validate_and_open_image(file_bytes: bytes) -> Tuple[Image.Image, str]:
    """
    Validates file size and image integrity.
    Returns the PIL Image and format.
    Raises ValueError with user-friendly error messages.
    """
    if not file_bytes:
        raise ValueError("No image file provided. Please select or capture a plant leaf photo.")
    
    if len(file_bytes) > MAX_IMAGE_SIZE_BYTES:
        raise ValueError(f"Image file is too large ({len(file_bytes) // (1024 * 1024)}MB). Maximum allowed size is 15MB.")

    try:
        image = Image.open(io.BytesIO(file_bytes))
        image_format = (image.format or "JPEG").upper()
    except Exception:
        raise ValueError("Invalid image file. Please upload a valid JPG, JPEG, or PNG image.")

    if image_format not in ALLOWED_FORMATS and image.format != "MPO":
        raise ValueError(f"Unsupported image format: {image_format}. Please upload JPG, JPEG, or PNG.")

    # Convert RGBA or CMYK or Palette to RGB for uniform handling
    if image.mode != "RGB":
        image = image.convert("RGB")

    return image, image_format

def image_to_base64_thumbnail(image: Image.Image, size=(400, 400)) -> str:
    """Create an optimized base64 thumbnail string for history preview."""
    thumb = image.copy()
    thumb.thumbnail(size, Image.Resampling.LANCZOS)
    buffer = io.BytesIO()
    thumb.save(buffer, format="JPEG", quality=85)
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{encoded}"

def compute_image_metrics(image: Image.Image) -> Dict[str, Any]:
    """
    Extracts computer vision color and texture features from leaf image.
    Calculates:
    - Green Chlorophyll Ratio
    - Brown / Necrotic Spot Ratio
    - Yellow / Chlorosis Ratio
    - Image Sharpness / Contrast
    - Perceptual Hash
    """
    resized = image.resize((224, 224), Image.Resampling.BILINEAR)
    img_array = np.array(resized, dtype=np.float32) / 255.0
    r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]

    # Green dominance: green significantly higher than red and blue
    green_mask = (g > r * 1.05) & (g > b * 1.05) & (g > 0.15)
    green_ratio = float(np.mean(green_mask))

    # Brown / dark spot mask (necrotic): moderate red, low green/blue, dark to medium
    brown_mask = (r > g) & (g > b) & (r < 0.7) & (b < 0.4) & (r > 0.12)
    brown_ratio = float(np.mean(brown_mask))

    # Yellow / chlorosis mask: high red and green, low blue
    yellow_mask = (r > 0.45) & (g > 0.45) & (b < (r + g) * 0.4)
    yellow_ratio = float(np.mean(yellow_mask))

    # Grayscale variance for contrast/sharpness check
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    contrast = float(np.std(gray))

    # MD5 hash for deterministic sample recognition
    img_bytes = resized.tobytes()
    img_hash = hashlib.md5(img_bytes).hexdigest()

    return {
        "green_ratio": green_ratio,
        "brown_ratio": brown_ratio,
        "yellow_ratio": yellow_ratio,
        "contrast": contrast,
        "hash": img_hash,
        "width": image.width,
        "height": image.height
    }
