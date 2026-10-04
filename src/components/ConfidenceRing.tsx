import React from 'react';

interface ConfidenceRingProps {
  confidence: number;
  size?: number;
  strokeWidth?: number;
}

export const ConfidenceRing: React.FC<ConfidenceRingProps> = ({
  confidence,
  size = 110,
  strokeWidth = 9,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, confidence));
  const offset = circumference - (clamped / 100) * circumference;

  let strokeColor = '#16a34a'; // brand green
  let textColor = 'text-brand-700';

  if (clamped < 60) {
    strokeColor = '#d97706'; // amber warning
    textColor = 'text-amber-700';
  } else if (clamped < 80) {
    strokeColor = '#059669'; // emerald
    textColor = 'text-emerald-700';
  }

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`text-2xl font-extrabold tracking-tight ${textColor}`}>
          {confidence.toFixed(1)}%
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Confidence
        </span>
      </div>
    </div>
  );
};
