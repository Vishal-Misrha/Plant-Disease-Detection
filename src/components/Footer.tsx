import React from 'react';
import { Sprout, ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-forest-950 text-slate-300 pt-16 pb-12 border-t border-forest-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-forest-900/60">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                PlantCare<span className="text-brand-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering farmers, agronomists, and researchers with state-of-the-art computer vision to detect crop diseases early, minimize yield loss, and protect global food security.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-forest-900/80 text-brand-300 border border-brand-500/20">
                <span>🌱 Agricultural AI System</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('detect'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition font-medium text-white"
                >
                  Instant Leaf Detection
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Health Analytics Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Scan History Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-brand-400 transition"
                >
                  Architecture & About
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Crops */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Supported Crops
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Tomato', 'Potato', 'Apple', 'Corn (Maize)', 'Grape', 'Bell Pepper', 'Strawberry', 'Rice', 'Wheat', 'Cotton'].map((crop) => (
                <span
                  key={crop}
                  className="px-2.5 py-1 rounded-lg bg-forest-900/90 text-slate-300 border border-forest-800"
                >
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Agricultural Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Agronomic Notice
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed bg-forest-900/40 p-3 rounded-2xl border border-forest-800/60">
              PlantCare AI is an educational and clinical decision-support tool. Predictions are generated via computer vision models and must be verified by certified agricultural extension agents or plant pathologists before applying expensive or regulated agrochemicals.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PlantCare AI. Built for modern precision agriculture.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              Developed with <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" /> for farmers worldwide
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
