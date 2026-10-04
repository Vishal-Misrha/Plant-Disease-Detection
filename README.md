# 🌿 PlantCare AI – Plant Disease Detection & Diagnosis System

An intelligent, modern, responsive AI-powered agricultural web application designed to detect foliar crop diseases early, provide biological and chemical treatment guidance, and help farmers, agronomists, and researchers protect crop yields.

![PlantCare AI Banner](public/leaf-icon.svg)

---

## 🌟 Key Features

- **Instant Leaf Disease Diagnosis**: Upload or drag-and-drop foliar photographs or use your device camera.
- **Computer Vision & Pattern Analysis**: Evaluates leaf color profiles, chlorotic halos, necrotic bullseye rings, and lesion borders.
- **Deterministic AI & Real ML Pipeline**: Modular architecture designed for PyTorch/Torchvision deep learning models, paired with a deterministic feature-based demo engine (no random numbers).
- **Comprehensive Agronomic Guidance**: Every diagnosis returns visible symptoms, primary biological causes, recommended treatments (both cultural/organic and chemical fungicides), and long-term prevention protocols.
- **10+ Supported Crop Families**: Tomato, Potato, Apple, Corn (Maize), Grape, Bell Pepper, Strawberry, Rice, Wheat, and Cotton.
- **Interactive Health Analytics Dashboard**: KPI summary cards, SVG detection activity trend line chart, and status distribution donut chart.
- **Diagnostic History Archive**: Filter by crop or disease status, real-time search, full detail modal view, and record deletion with automatic local synchronization.
- **Live Camera Capture**: Integrated webcam/mobile camera modal with guide reticle and front/rear camera flip.
- **Low-Confidence & Uncertainty Safeguard**: Low-confidence or non-leaf images trigger an explicit uncertainty warning rather than a false diagnosis.

---

## 🏗️ Architecture & Technology Stack

```
                              ┌────────────────────────────────────────┐
                              │           Client Web Browser           │
                              │  React 18 + TypeScript + Tailwind CSS  │
                              └───────────────────┬────────────────────┘
                                                  │
                               HTTP Multipart / REST API (Port 8000)
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │            FastAPI Backend             │
                              │  Python 3.11+ / Uvicorn / Pydantic     │
                              └───────────────────┬────────────────────┘
                                                  │
                    ┌─────────────────────────────┴─────────────────────────────┐
                    │                                                           │
                    ▼                                                           ▼
    ┌───────────────────────────────┐                           ┌───────────────────────────────┐
    │     PyTorch ML Engine         │                           │   Intelligent Demo Engine     │
    │  (ResNet / MobileNet weights) │                           │ (Deterministic Feature Extr.) │
    └───────────────┬───────────────┘                           └───────────────┬───────────────┘
                    │                                                           │
                    └─────────────────────────────┬─────────────────────────────┘
                                                  │
                                                  ▼
                              ┌────────────────────────────────────────┐
                              │        Disease Knowledge Base          │
                              │ (Pathology, Symptoms, Treatments, etc) │
                              └────────────────────────────────────────┘
```

### Frontend

- **Core**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom agriculture design tokens
- **Icons**: Lucide React

### Backend

- **Web Framework**: FastAPI (Asynchronous Python 3.11+)
- **Server**: Uvicorn
- **Image Processing**: Pillow (PIL), NumPy
- **Deep Learning Framework**: PyTorch / Torchvision

---

## 📁 Project Structure

```
plant-decatation/
├── backend/
│   ├── main.py                     # FastAPI application entrypoint & CORS
│   ├── requirements.txt            # Python dependencies
│   ├── create_samples.py           # Sample image generator for demo mode
│   ├── models/
│   │   └── schemas.py              # Pydantic data schemas
│   ├── routes/
│   │   ├── health.py               # GET /health
│   │   ├── predict.py              # POST /predict
│   │   └── history.py              # GET/DELETE /history & stats summary
│   ├── services/
│   │   ├── disease_knowledge.py    # Agricultural database (symptoms, treatments)
│   │   ├── prediction_service.py   # Modular ML & demo prediction manager
│   │   └── history_service.py      # History storage & JSON persistence
│   ├── utils/
│   │   └── image_utils.py          # Image validation & feature extraction
│   └── sample_images/              # High-res sample leaves for demo mode
├── public/
│   ├── leaf-icon.svg               # Vector brand favicon
│   └── samples/                    # Public sample leaf images
├── src/
│   ├── components/
│   │   ├── Navbar.tsx              # Sticky glassmorphism header & mobile drawer
│   │   ├── Footer.tsx              # Agriculture footer & agronomic disclaimer
│   │   ├── DemoBanner.tsx          # Demo mode & backend status banner
│   │   ├── ConfidenceRing.tsx      # Circular SVG confidence gauge
│   │   ├── StatusBadge.tsx         # Color-coded status badge
│   │   └── CameraModal.tsx         # Live camera preview and snapshot modal
│   ├── pages/
│   │   ├── HomePage.tsx            # Split hero, stats, how it works, crops grid
│   │   ├── DetectPage.tsx          # Detection workspace & detailed diagnosis card
│   │   ├── DashboardPage.tsx       # Analytics dashboard & SVG charts
│   │   ├── HistoryPage.tsx         # Searchable diagnostic scan archive
│   │   └── AboutPage.tsx           # Technical architecture & educational details
│   ├── services/
│   │   └── api.ts                  # API service with offline localStorage sync
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── App.tsx                     # Main layout & routing
│   ├── index.css                   # Custom Tailwind directives & animations
│   └── main.tsx                    # React DOM entry
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.10 or higher)

---

### 2. Backend Setup & Startup

1. Open a terminal in the project root:
   ```bash
   python -m pip install -r backend/requirements.txt
   ```
2. Generate demo sample images (optional, already generated):
   ```bash
   python backend/create_samples.py
   ```
3. Run the FastAPI backend server:
   ```bash
   python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
   ```
4. Verify backend health in your browser or terminal:
   - **API Docs (Swagger UI)**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
   - **Health Endpoint**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

---

### 3. Frontend Setup & Startup

1. In a second terminal in the project root:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to:
   [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

---

## 📡 API Specification

### `GET /health`

Returns system status, device information, and model loading state.

```json
{
  "status": "ok",
  "service": "PlantCare AI Prediction Engine",
  "version": "1.0.0",
  "device": "cpu",
  "model_loaded": false,
  "demo_mode_available": true,
  "timestamp": "2026-10-04T11:09:30.166188"
}
```

### `POST /predict`

Accepts a plant leaf image as `multipart/form-data`.

- **Field**: `file` (JPG, JPEG, PNG, WEBP, up to 15MB)
- **Optional query param**: `demo=true` (forces demo pipeline)

**Response Example:**

```json
{
  "id": "e4b2d3c1-84fb-4b55-a228-3e4b78910abc",
  "plant": "Tomato",
  "disease": "Early Blight",
  "status": "Diseased",
  "confidence": 94.6,
  "symptoms": [
    "Concentric ring 'bullseye' target-like dark brown to black spots on older leaves",
    "Yellowing (chlorosis) halo surrounding lesions, leading to premature leaf drop",
    "Sunken dark lesions on stems near soil level causing collar rot"
  ],
  "causes": [
    "Alternaria solani fungal pathogen surviving in infected plant debris and soil",
    "Prolonged periods of warm temperatures with high humidity"
  ],
  "treatment": [
    "Prune and safely dispose of infected lower leaves",
    "Apply copper-based fungicides or chlorothalonil at the earliest signs",
    "Stake plants to lift foliage off damp soil and enhance air circulation"
  ],
  "prevention": [
    "Rotate crops on a 3-year cycle away from solanaceous plants",
    "Employ drip irrigation to keep foliage dry during irrigation",
    "Apply organic mulch to prevent soil splash"
  ],
  "demo": true,
  "timestamp": "2026-10-04T11:10:00.000Z",
  "scientificName": "Alternaria solani",
  "severity": "Moderate"
}
```

### `GET /history`

Returns list of all historical detections with optional filters:

- `q`: Search query string
- `plant`: Crop filter (e.g. `Tomato`, `Apple`)
- `status`: `Healthy`, `Diseased`, `Uncertain`

### `DELETE /history/{id}`

Deletes a specific detection record by unique ID.

### `GET /history/stats/summary`

Returns aggregated analytics metrics for the dashboard.

---

## 🧪 Connecting a Real Trained ML Model

PlantCare AI is architected with an abstract prediction base class `BasePredictionEngine` in [`backend/services/prediction_service.py`](file:///backend/services/prediction_service.py).

To plug in a trained PyTorch or TensorFlow model:

1. Export your trained model weights to `backend/models/plant_disease_model.pth`.
2. In `PyTorchModelEngine`:
   ```python
   # Load weights
   self.model = torch.load("backend/models/plant_disease_model.pth", map_location=self.device)
   self.model.eval()
   ```
3. Pass input tensors through standard ImageNet normalization:
   ```python
   transform = torchvision.transforms.Compose([
       torchvision.transforms.Resize(256),
       torchvision.transforms.CenterCrop(224),
       torchvision.transforms.ToTensor(),
       torchvision.transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
   ])
   ```
4. Output classes map directly to keys in [`backend/services/disease_knowledge.py`](file:///backend/services/disease_knowledge.py), which automatically attaches complete symptoms, causes, treatments, and prevention protocols.

---

## 🛡️ Agricultural Disclaimer

PlantCare AI provides AI-based decision support for educational, clinical, and informational purposes. AI predictions should be verified by certified agricultural extension agents or plant pathologists before applying expensive or regulated agrochemicals.
