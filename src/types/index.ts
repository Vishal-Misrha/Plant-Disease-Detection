export type PlantStatus = 'Healthy' | 'Diseased' | 'Uncertain';

export interface SecondaryPrediction {
  disease: string;
  confidence: number;
}

export interface PredictionResult {
  id: string;
  plant: string;
  disease: string;
  status: PlantStatus;
  confidence: number;
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  demo: boolean;
  timestamp: string;
  imageUrl?: string;
  severity?: 'None' | 'Low' | 'Moderate' | 'Moderate to High' | 'High' | 'Critical';
  scientificName?: string;
  secondaryPredictions?: SecondaryPrediction[];
  notes?: string;
}

export interface HistoryItem {
  id: string;
  plant: string;
  disease: string;
  status: PlantStatus;
  confidence: number;
  timestamp: string;
  imageUrl?: string;
  severity?: string;
  symptoms?: string[];
  treatment?: string[];
  prevention?: string[];
  demo: boolean;
  scientificName?: string;
}

export interface DashboardStats {
  total_scans: number;
  healthy_count: number;
  diseased_count: number;
  uncertain_count: number;
  avg_confidence: number;
  top_disease: string;
  recent: HistoryItem[];
}

export interface SupportedCrop {
  name: string;
  emoji: string;
  scientific: string;
  commonDiseases: string[];
  description: string;
  badge: string;
}
