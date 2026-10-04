import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Layers,
  UploadCloud,
  Cpu,
  FileCheck2,
  CheckCircle,
  Leaf
} from 'lucide-react';
import type { SupportedCrop } from '../types';

interface HomePageProps {
  onStartDetection: () => void;
  onSelectCropDemo?: (cropName: string) => void;
}

const SUPPORTED_CROPS: SupportedCrop[] = [
  {
    name: 'Tomato',
    emoji: '🍅',
    scientific: 'Solanum lycopersicum',
    commonDiseases: ['Early Blight', 'Late Blight', 'Bacterial Spot', 'Yellow Leaf Curl'],
    description: 'High susceptibility to fungal blights during warm, humid rainfall.',
    badge: '4 Disease Classes'
  },
  {
    name: 'Potato',
    emoji: '🥔',
    scientific: 'Solanum tuberosum',
    commonDiseases: ['Late Blight', 'Early Blight', 'Blackleg'],
    description: 'Vulnerable to destructive Phytophthora spore rain on foliage and tubers.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Apple',
    emoji: '🍎',
    scientific: 'Malus domestica',
    commonDiseases: ['Apple Scab', 'Black Rot', 'Cedar Rust'],
    description: 'Requires seasonal monitoring for scab ascospores from spring bud break.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Corn (Maize)',
    emoji: '🌽',
    scientific: 'Zea mays',
    commonDiseases: ['Common Rust', 'Northern Blight', 'Gray Leaf Spot'],
    description: 'Biotrophic rust spores migrate with seasonal air currents onto ear leaves.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Grape',
    emoji: '🍇',
    scientific: 'Vitis vinifera',
    commonDiseases: ['Black Rot', 'Esca (Measles)', 'Leaf Blight'],
    description: 'Fruiting zones need rapid canopy drying to stop black rot berry mummies.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Bell Pepper',
    emoji: '🌶️',
    scientific: 'Capsicum annuum',
    commonDiseases: ['Bacterial Spot', 'Anthracnose', 'Phytophthora'],
    description: 'Rain splash spreads bacterial blisters across developing bell fruits.',
    badge: '2 Disease Classes'
  },
  {
    name: 'Strawberry',
    emoji: '🍓',
    scientific: 'Fragaria × ananassa',
    commonDiseases: ['Leaf Scorch', 'Leaf Spot', 'Powdery Mildew'],
    description: 'Foliar scorch diminishes crown vigor and daughter runner propagation.',
    badge: '2 Disease Classes'
  },
  {
    name: 'Rice',
    emoji: '🌱',
    scientific: 'Oryza sativa',
    commonDiseases: ['Bacterial Blight', 'Blast', 'Brown Spot'],
    description: 'Key staple crop requiring paddy water drainage when blight streaks appear.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Wheat',
    emoji: '🌾',
    scientific: 'Triticum aestivum',
    commonDiseases: ['Stripe Rust', 'Leaf Rust', 'Powdery Mildew'],
    description: 'Yellow stripe rust pustules threaten flag leaf yield synthesis in cool springs.',
    badge: '3 Disease Classes'
  },
  {
    name: 'Cotton',
    emoji: '🌿',
    scientific: 'Gossypium hirsutum',
    commonDiseases: ['Bacterial Blight', 'Target Spot', 'Alternaria'],
    description: 'Angular lesions cause premature square shedding and stained boll lint.',
    badge: '2 Disease Classes'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onStartDetection }) => {
  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-12 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-gradient-to-b from-brand-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-800 text-xs font-bold tracking-wide uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                <span>AI-POWERED PLANT HEALTH</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest-950 tracking-tight leading-[1.15]">
                Detect{' '}
                <span className="bg-gradient-to-r from-brand-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Plant Diseases
                </span>{' '}
                Before They Spread.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Upload a photo of a plant leaf and let AI identify possible diseases, symptoms, and recommended care in seconds. Protect yields and reduce chemical waste with precision diagnostics.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onStartDetection}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition-all duration-200 active:scale-95 group"
                >
                  <Leaf className="w-5 h-5 text-brand-200 group-hover:rotate-12 transition-transform" />
                  <span>Detect Disease Now</span>
                  <ArrowRight className="w-4 h-4 text-brand-200 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#how-it-works"
                  className="flex items-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base border border-slate-200 shadow-xs hover:border-slate-300 transition"
                >
                  <span>Learn How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span>AI-powered analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span>Fast detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span>10+ crops supported</span>
                </div>
              </div>
            </div>

            {/* Right Card / Interactive Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl p-3 bg-gradient-to-b from-brand-500/20 via-slate-100/40 to-slate-200/50 shadow-2xl border border-white/60 backdrop-blur-md">
                {/* Main Hero Leaf Image Container */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 shadow-inner group">
                  <img
                    src="/samples/tomato_early_blight.jpg"
                    alt="Tomato leaf analysis demonstration"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Scanning Line Animation */}
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-400 to-transparent shadow-[0_0_15px_#22c55e] animate-scan pointer-events-none" />

                  {/* Corner Reticle Marks */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-brand-400 rounded-tl-lg pointer-events-none" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-brand-400 rounded-tr-lg pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-brand-400 rounded-bl-lg pointer-events-none" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-brand-400 rounded-br-lg pointer-events-none" />

                  {/* Scan indicator badge */}
                  <div className="absolute top-4 left-4 ml-3 mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium">
                    <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                    <span>Neural Scan 224×224</span>
                  </div>
                </div>

                {/* Overlaid Floating AI Analysis Glass Card */}
                <div className="absolute -bottom-8 -left-4 sm:-left-8 right-4 sm:right-auto bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xl space-y-3 sm:min-w-[280px] animate-float">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        AI Analysis Complete
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                      Diseased
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-medium text-slate-500">Specimen: Tomato Leaf</span>
                    <h4 className="text-lg font-extrabold text-forest-900 flex items-center gap-2">
                      <span>Early Blight</span>
                    </h4>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Model Confidence</span>
                    <span className="font-extrabold text-brand-700 text-sm bg-brand-50 px-2 py-0.5 rounded-md">
                      94.6%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '10+', label: 'Supported Crops', desc: 'Major agricultural staples' },
            { value: '50+', label: 'Disease Classes', desc: 'Pathogen profiles mapped' },
            { value: '95%+', label: 'Demo Accuracy', desc: 'Curated PlantVillage baseline' },
            { value: '< 10s', label: 'Analysis Time', desc: 'Real-time edge diagnosis' }
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-forest-900 tracking-tight mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            SIMPLE WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight">
            Plant Health Analysis Made Simple
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From field photo to actionable agronomist treatment guidelines in three frictionless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-200 via-emerald-300 to-brand-200 -z-10 -translate-y-8" />

          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft relative group hover:border-brand-500/40 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <UploadCloud className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
                STEP 01
              </span>
              <h3 className="text-xl font-bold text-forest-950 mb-3">Upload a Leaf</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Take a photo with your mobile camera or upload an existing image from your device. Make sure the leaf blade is in clear focus.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>JPG, PNG, WEBP accepted</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft relative group hover:border-brand-500/40 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <Cpu className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
                STEP 02
              </span>
              <h3 className="text-xl font-bold text-forest-950 mb-3">AI Analyzes It</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our computer vision neural network scans color profiles, necrotic ring patterns, lesions, and chlorosis halos across 50+ pathogen benchmarks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Deterministic pattern matching</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft relative group hover:border-brand-500/40 hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                <FileCheck2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-600 block mb-1">
                STEP 03
              </span>
              <h3 className="text-xl font-bold text-forest-950 mb-3">Get Your Diagnosis</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Receive disease classification, confidence score, visible symptoms, biological causes, and practical organic or chemical treatment tips.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
              <span>Saved automatically to History</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SUPPORTED CROPS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
              EXPANSIVE COVERAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight mt-3">
              Built for the Plants You Grow
            </h2>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm max-w-md">
            Our diagnostic architecture covers key horticulture, cereal grains, and commercial cash crops.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SUPPORTED_CROPS.map((crop) => (
            <div
              key={crop.name}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform">
                    {crop.emoji}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-50 text-brand-800 border border-brand-200">
                    {crop.badge}
                  </span>
                </div>
                <h3 className="font-extrabold text-forest-950 text-base group-hover:text-brand-700 transition">
                  {crop.name}
                </h3>
                <span className="text-[11px] italic text-slate-400 block mb-2 font-serif">
                  {crop.scientific}
                </span>
                <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                  {crop.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex flex-wrap gap-1">
                  {crop.commonDiseases.slice(0, 2).map((d) => (
                    <span
                      key={d}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {d}
                    </span>
                  ))}
                  {crop.commonDiseases.length > 2 && (
                    <span className="text-[10px] font-semibold text-brand-700 self-center">
                      +{crop.commonDiseases.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-forest-900 via-forest-950 to-brand-950 text-white p-8 sm:p-14 overflow-hidden shadow-2xl border border-brand-500/20">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Immediate Crop Assessment</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Test Your Crop Foliage in Seconds.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Don't wait for fungal spots to ravage your entire field. Upload a single leaf photo now to verify plant health and prevent irreversible yield loss.
            </p>
            <div className="pt-2">
              <button
                onClick={onStartDetection}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-400 text-white font-bold text-base shadow-xl shadow-brand-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Launch Disease Detector</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Decorative Plant Outline Graphic */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
            <Leaf className="w-96 h-96 text-brand-400 transform rotate-45 translate-x-12" />
          </div>
        </div>
      </section>
    </div>
  );
};
