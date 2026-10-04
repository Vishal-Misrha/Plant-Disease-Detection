import React from 'react';
import {
  Sprout,
  ShieldCheck,
  Cpu,
  AlertTriangle,
  Code2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const techStack = [
    { name: 'React 18', role: 'Reactive UI Component Architecture', color: 'bg-cyan-50 text-cyan-800 border-cyan-200' },
    { name: 'TypeScript', role: 'End-to-End Type Safety', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { name: 'Tailwind CSS', role: 'Precision Modern Design System', color: 'bg-teal-50 text-teal-800 border-teal-200' },
    { name: 'Python 3.11+', role: 'Machine Learning Backend', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { name: 'FastAPI', role: 'High-Performance Asynchronous REST API', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { name: 'PyTorch / Torchvision', role: 'Deep Learning Vision Inference', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
          ABOUT THE SYSTEM
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-950 tracking-tight">
          Precision Agriculture Meets Computer Vision
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          PlantCare AI was developed to bridge modern deep learning image classification with on-the-ground agronomic disease management.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 flex items-center justify-center font-bold">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-forest-950">What is Plant Disease Detection?</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Plant disease detection is the scientific identification of biotic pathogens (fungi, bacteria, viruses, oomycetes) and abiotic stresses affecting crops. Visual diagnosis examines characteristic foliar lesions, chlorotic yellow halos, concentric rings, pustules, and leaf wilting.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-forest-950">Why Early Detection Matters</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            According to the UN Food and Agriculture Organization (FAO), plant diseases cause between 20% to 40% of global crop yield losses annually. Early detection enables targeted pruning and organic biological treatments before airborne spores contaminate surrounding acreage.
          </p>
        </div>
      </div>

      {/* How the Pipeline Works */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold text-forest-950">How the AI System Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs font-black uppercase tracking-wider text-brand-600">1. Ingestion & Preprocessing</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Uploaded leaf photographs are resized to standard neural resolution (224×224), normalized for RGB color balance, and validated for file integrity and contrast.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs font-black uppercase tracking-wider text-brand-600">2. Feature Classification</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A convolutional neural network extracts spatial hierarchies of features—from leaf venation and serration edges to necrotic discoloration zones.
            </p>
          </div>

          <div className="space-y-2 p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs font-black uppercase tracking-wider text-brand-600">3. Pathological Mapping</div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Predictions are correlated with scientific literature to retrieve verified visible symptoms, environmental causes, and immediate treatment guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Badges */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-soft space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-forest-950">Technology Architecture</h2>
            <p className="text-xs text-slate-500">Built with modern web standards and high-performance ML services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className={`p-4 rounded-2xl border ${tech.color} flex flex-col justify-between`}
            >
              <div className="font-bold text-sm">{tech.name}</div>
              <div className="text-xs opacity-90 mt-1">{tech.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations & Agronomic Notice */}
      <div className="rounded-3xl p-8 bg-amber-50/70 border border-amber-200/80 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>System Limitations & Disclaimer</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          While computer vision models achieve high accuracy on standard benchmarks, field images may suffer from lighting glare, nutrient deficiencies that resemble viral symptoms, or simultaneous co-infections.
        </p>
        <div className="p-4 bg-white/80 rounded-2xl border border-amber-200 text-xs font-semibold text-amber-950">
          "This tool is intended for educational and decision-support purposes. AI predictions should be verified by a certified agricultural expert or plant pathology laboratory before making important crop treatment or pesticide application decisions."
        </div>
      </div>
    </div>
  );
};
