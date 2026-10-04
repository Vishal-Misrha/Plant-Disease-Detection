import React from 'react';
import { CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';
import type { PlantStatus } from '../types';

interface StatusBadgeProps {
  status: PlantStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  if (status === 'Healthy') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-full ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-3 py-1 text-sm'
        }`}
      >
        <CheckCircle2 className={size === 'sm' ? 'w-3.5 h-3.5 text-emerald-600' : 'w-4 h-4 text-emerald-600'} />
        <span>Healthy</span>
      </span>
    );
  }

  if (status === 'Diseased') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold text-rose-800 bg-rose-50 border border-rose-200/80 rounded-full ${
          size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-3 py-1 text-sm'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        <AlertOctagon className={size === 'sm' ? 'w-3.5 h-3.5 text-rose-600' : 'w-4 h-4 text-rose-600'} />
        <span>Diseased</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-full ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : size === 'lg' ? 'px-4 py-1.5 text-base' : 'px-3 py-1 text-sm'
      }`}
    >
      <HelpCircle className={size === 'sm' ? 'w-3.5 h-3.5 text-amber-600' : 'w-4 h-4 text-amber-600'} />
      <span>Uncertain</span>
    </span>
  );
};
