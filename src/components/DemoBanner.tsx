import React from 'react';
import { Sparkles, Server } from 'lucide-react';

interface DemoBannerProps {
  isBackendConnected: boolean;
  demoModeActive: boolean;
  onToggleDemo?: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  isBackendConnected,
  demoModeActive,
  onToggleDemo
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-brand-500/10 to-emerald-500/10 border-y border-amber-200/60 py-2.5 px-4 text-xs font-medium text-slate-700">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isBackendConnected ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </span>
          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Demo Mode Active:
          </span>
          <span className="text-slate-600">
            Results are simulated for demonstration with deterministic computer vision metrics.
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 border border-slate-200 shadow-xs">
            <Server className={`w-3 h-3 ${isBackendConnected ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="text-[11px] text-slate-600">
              API: {isBackendConnected ? <strong className="text-emerald-700">FastAPI Online</strong> : <span className="text-amber-700">Offline / Local Standalone</span>}
            </span>
          </div>
          {onToggleDemo && (
            <button
              onClick={onToggleDemo}
              className="text-[11px] text-brand-700 hover:text-brand-900 underline font-semibold transition"
            >
              {demoModeActive ? 'Using Sample Pipeline' : 'Force ML Engine'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
