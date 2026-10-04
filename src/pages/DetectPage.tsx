import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Camera,
  Image as ImageIcon,
  X,
  RefreshCw,
  Search,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  Pill,
  ArrowRight,
  Download
} from 'lucide-react';
import type { PredictionResult } from '../types';
import { predictLeafImage } from '../services/api';
import { ConfidenceRing } from '../components/ConfidenceRing';
import { StatusBadge } from '../components/StatusBadge';
import { CameraModal } from '../components/CameraModal';

interface DetectPageProps {
  onViewHistory: () => void;
  preselectedSample?: string | null;
}

interface SampleLeafOption {
  id: string;
  name: string;
  crop: string;
  status: 'Healthy' | 'Diseased';
  expectedDisease: string;
  imagePath: string;
  description: string;
}

const SAMPLE_LEAVES: SampleLeafOption[] = [
  {
    id: 'sample-early-blight',
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    status: 'Diseased',
    expectedDisease: 'Early Blight (Alternaria solani)',
    imagePath: '/samples/tomato_early_blight.jpg',
    description: 'Concentric ring target spots with yellow halo'
  },
  {
    id: 'sample-healthy-tomato',
    name: 'Healthy Tomato',
    crop: 'Tomato',
    status: 'Healthy',
    expectedDisease: 'Healthy Leaf (No pathogens)',
    imagePath: '/samples/healthy_tomato.jpg',
    description: 'Lush green leaf tissue without necrotic lesions'
  },
  {
    id: 'sample-potato-blight',
    name: 'Potato Late Blight',
    crop: 'Potato',
    status: 'Diseased',
    expectedDisease: 'Late Blight (Phytophthora infestans)',
    imagePath: '/samples/potato_late_blight.jpg',
    description: 'Water-soaked irregular brown decay'
  },
  {
    id: 'sample-apple-scab',
    name: 'Apple Scab',
    crop: 'Apple',
    status: 'Diseased',
    expectedDisease: 'Apple Scab (Venturia inaequalis)',
    imagePath: '/samples/apple_scab.jpg',
    description: 'Olive-green to velvety brown scabby lesions'
  }
];

export const DetectPage: React.FC<DetectPageProps> = ({ onViewHistory, preselectedSample }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (preselectedSample) {
      const match = SAMPLE_LEAVES.find(s => s.name.toLowerCase().includes(preselectedSample.toLowerCase()));
      if (match) {
        handleSelectSample(match);
      }
    }
  }, [preselectedSample]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelected = (file: File) => {
    setErrorMessage(null);
    setPrediction(null);
    setActiveSampleId(null);

    // Format validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
      setErrorMessage('Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    // Size validation (15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum supported size is 15MB.`);
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleSelectSample = async (sample: SampleLeafOption) => {
    setActiveSampleId(sample.id);
    setErrorMessage(null);
    setPrediction(null);

    try {
      const response = await fetch(sample.imagePath);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id.replace('sample-', '')}.jpg`, { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(sample.imagePath);
    } catch (err) {
      console.error('Failed to load sample image:', err);
      setErrorMessage('Could not load sample image. Please try uploading manually.');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select or capture a plant leaf image first.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const result = await predictLeafImage(selectedFile);
      setPrediction(result);
    } catch (err: any) {
      setErrorMessage(
        err.message || 'Unable to analyze this image. Please check your connection and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setErrorMessage(null);
    setActiveSampleId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
          DIAGNOSTIC WORKSPACE
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          What's Wrong With Your Plant?
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Upload a clear image of a plant leaf and get an AI-powered analysis with symptoms, causes, and treatment advice.
        </p>
      </div>

      {/* Main Workspace Card */}
      {!prediction ? (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft max-w-4xl mx-auto space-y-8">
          {/* Quick Demo Pickers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quick Test Samples (Demo Mode)
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Click any card to load</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAMPLE_LEAVES.map((sample) => {
                const isSelected = activeSampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/60 shadow-xs ring-2 ring-brand-500/20'
                        : 'border-slate-200/80 hover:border-brand-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={sample.imagePath} alt={sample.name} className="w-full h-full object-cover" />
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        sample.status === 'Healthy' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {sample.status}
                      </span>
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 line-clamp-1">{sample.name}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-1">{sample.crop}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upload Drop Zone or Preview */}
          {!previewUrl ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center transition-all duration-200 ${
                isDragging
                  ? 'border-brand-500 bg-brand-50/60 scale-[1.01]'
                  : 'border-slate-300 hover:border-brand-400 bg-slate-50/40 hover:bg-brand-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                className="hidden"
                id="leaf-upload-input"
              />

              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center mx-auto shadow-inner">
                  <UploadCloud className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg text-forest-950">
                    Drop your leaf image here
                  </h3>
                  <p className="text-xs text-slate-500">
                    Supports JPG, JPEG, PNG, or WEBP (Max 15MB)
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <label
                    htmlFor="leaf-upload-input"
                    className="cursor-pointer px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition active:scale-95 flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Browse Files</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setIsCameraOpen(true)}
                    className="px-5 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-brand-600" />
                    <span>Take Photo</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 italic pt-2">
                  "For best results, upload a clear, well-lit image of a single plant leaf."
                </p>
              </div>
            </div>
          ) : (
            /* Image Preview State */
            <div className="space-y-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 aspect-[16/9] sm:aspect-[21/9] max-h-[380px] flex items-center justify-center group shadow-inner">
                <img
                  src={previewUrl}
                  alt="Selected Leaf Preview"
                  className="max-h-full max-w-full object-contain"
                />

                {/* Animated Scanning Overlay when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-forest-950/60 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-4">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-brand-400/30 border-t-brand-400 animate-spin" />
                      <Stethoscope className="w-8 h-8 text-brand-300 animate-pulse" />
                    </div>
                    <div className="text-center space-y-1">
                      <div className="font-extrabold text-lg text-white">Analyzing your plant...</div>
                      <p className="text-xs text-brand-200 font-medium">Extracting foliar lesions and color distribution</p>
                    </div>
                    {/* Laser Bar Scan Animation */}
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_20px_#22c55e] animate-scan pointer-events-none" />
                  </div>
                )}

                {/* Quick actions top-right */}
                {!isAnalyzing && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition shadow-md"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* File details bar */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-100 text-brand-700">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-800 block truncate max-w-xs sm:max-w-md">
                      {selectedFile?.name || 'Selected specimen'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {selectedFile ? formatFileSize(selectedFile.size) : 'Ready'} • Leaf Specimen
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition disabled:opacity-50"
                  >
                    Replace Image
                  </button>

                  <button
                    onClick={handleReset}
                    disabled={isAnalyzing}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-800 hover:bg-rose-50 transition disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto min-w-[280px] flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/30 hover:shadow-brand-600/50 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Diagnosing Specimen...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>Detect Disease</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-fade-in text-xs sm:text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold block">Analysis Notice:</span>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= 6. DETECTION RESULT UI ================= */
        <div className="space-y-8 animate-fade-in">
          {/* Back & Breadcrumb bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-xs font-bold text-brand-700 hover:text-brand-900 transition"
            >
              <ArrowRight className="w-4 h-4 transform rotate-180" />
              <span>Analyze Another Leaf</span>
            </button>

            <div className="flex items-center gap-3">
              {prediction.demo && (
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Demo Prediction
                </span>
              )}
              <button
                onClick={onViewHistory}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline transition"
              >
                View in History →
              </button>
            </div>
          </div>

          {/* TOP RESULT CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-soft">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Uploaded leaf thumbnail */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
                  <img
                    src={prediction.imageUrl || previewUrl || ''}
                    alt={`${prediction.plant} Leaf Specimen`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={prediction.status} size="sm" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] flex justify-between items-center">
                    <span>Analyzed: {new Date(prediction.timestamp).toLocaleDateString()}</span>
                    <span className="text-brand-300 font-mono">ID: {prediction.id.slice(0, 8)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Diagnosis Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      CROP SPECIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-950">
                      {prediction.plant}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <ConfidenceRing confidence={prediction.confidence} size={92} strokeWidth={8} />
                  </div>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    DIAGNOSED CONDITION
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xl sm:text-2xl font-black text-forest-900">
                      {prediction.disease}
                    </span>
                    <StatusBadge status={prediction.status} />
                  </div>
                  {prediction.scientificName && (
                    <span className="text-xs italic text-slate-500 font-serif block">
                      Organism: {prediction.scientificName}
                    </span>
                  )}
                </div>

                {/* Status-specific alert message */}
                {prediction.status === 'Healthy' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>🌿 Plant Looks Healthy</span>
                    </div>
                    <p className="text-emerald-800 leading-relaxed">
                      No significant foliar pathogens, necrotic target spots, or chlorotic halos were detected on this specimen. Continue regular maintenance.
                    </p>
                  </div>
                )}

                {prediction.status === 'Uncertain' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-2">
                    <div className="font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>⚠️ Unable to confidently identify the disease ({prediction.confidence}%)</span>
                    </div>
                    <p className="text-amber-800 leading-relaxed">
                      The image may be unclear, blurry, or the condition may not be supported by our current model. Low confidence predictions should NOT be treated as guaranteed diagnoses.
                    </p>
                    <div className="pt-1 flex gap-2">
                      <button
                        onClick={handleReset}
                        className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-xs transition"
                      >
                        Upload Clearer Image
                      </button>
                    </div>
                  </div>
                )}

                {/* Visible findings quick bullets */}
                {prediction.symptoms && prediction.symptoms.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      What we found:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                      {prediction.symptoms.slice(0, 4).map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-600 mt-1.5 shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* THREE DETAILED CARDS: Symptoms, Causes, Treatment, Prevention */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Symptoms */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest-950 text-base">🔬 Visible Symptoms</h3>
                  <span className="text-[11px] text-slate-400">Diagnostic Indicators</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {prediction.symptoms.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Treatment */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest-950 text-base">💊 Recommended Treatment</h3>
                  <span className="text-[11px] text-slate-400">Curative Protocols</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {prediction.treatment.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Prevention */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-forest-950 text-base">🛡 Long-Term Prevention</h3>
                  <span className="text-[11px] text-slate-400">Cultural & Farm Practices</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                {prediction.prevention.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200">
            <div className="text-xs text-slate-500">
              Diagnostic record saved to your local browser storage.
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-white font-bold text-xs shadow-md transition active:scale-95"
              >
                Analyze Another Leaf
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-xs transition flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleFileSelected}
      />
    </div>
  );
};
