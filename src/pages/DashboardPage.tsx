import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  AlertOctagon,
  TrendingUp,
  BarChart3,
  PieChart,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import type { DashboardStats } from '../types';
import { fetchDashboardStats } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';

interface DashboardPageProps {
  onStartDetection: () => void;
  onViewHistory: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartDetection,
  onViewHistory,
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  // Mock trend data points for the line chart (last 7 days scans)
  const trendData = [
    { day: 'Mon', scans: 4, healthy: 2, diseased: 2 },
    { day: 'Tue', scans: 7, healthy: 4, diseased: 3 },
    { day: 'Wed', scans: 5, healthy: 2, diseased: 3 },
    { day: 'Thu', scans: 9, healthy: 5, diseased: 4 },
    { day: 'Fri', scans: 12, healthy: 7, diseased: 5 },
    { day: 'Sat', scans: 8, healthy: 4, diseased: 4 },
    { day: 'Sun', scans: stats?.total_scans || 11, healthy: stats?.healthy_count || 6, diseased: stats?.diseased_count || 5 },
  ];

  // Top diseases bar distribution
  const diseaseBreakdown = [
    { name: 'Early Blight', count: 4, percentage: 38 },
    { name: 'Late Blight', count: 3, percentage: 28 },
    { name: 'Apple Scab', count: 2, percentage: 19 },
    { name: 'Common Rust', count: 1, percentage: 9 },
    { name: 'Bacterial Spot', count: 1, percentage: 6 },
  ];

  const total = stats?.total_scans || 1;
  const healthyPct = Math.round(((stats?.healthy_count || 0) / total) * 100);
  const diseasedPct = Math.round(((stats?.diseased_count || 0) / total) * 100);
  const uncertainPct = 100 - healthyPct - diseasedPct;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            FARM HEALTH OVERVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight mt-2">
            Plant Health Dashboard
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Real-time analytics on foliar scans, disease distribution, and diagnosis trends.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartDetection}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
          >
            <span>+ New Foliar Scan</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Scans */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Scans</span>
            <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-950">
            {stats?.total_scans ?? 0}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="text-brand-600 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 inline mr-0.5" /> +12%
            </span>{' '}
            from previous period
          </div>
        </div>

        {/* Healthy Plants */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Healthy Plants</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">
            {stats?.healthy_count ?? 0}
          </div>
          <div className="text-[11px] text-slate-500">
            {healthyPct}% of all evaluated specimens
          </div>
        </div>

        {/* Diseased Plants */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Diseased Plants</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-700">
            {stats?.diseased_count ?? 0}
          </div>
          <div className="text-[11px] text-slate-500">
            {diseasedPct}% requiring agronomic care
          </div>
        </div>

        {/* Avg Confidence */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg transition space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Confidence</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-forest-900">
            {stats?.avg_confidence ?? 94.2}%
          </div>
          <div className="text-[11px] text-slate-500">
            High statistical model certainty
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Line Chart: Disease Trends */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-extrabold text-forest-950 text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" />
                <span>Detection Activity Trends</span>
              </h3>
              <p className="text-xs text-slate-500">Daily leaf assessments over the past 7 days</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-500" /> Total
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Diseased
              </span>
            </div>
          </div>

          {/* SVG Area Line Chart */}
          <div className="h-56 w-full pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal Grid lines */}
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="20" y1={y} x2="480" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
              ))}

              {/* Area fill */}
              <polygon
                fill="url(#trendGradient)"
                points="
                  30,140
                  100,105
                  170,125
                  240,80
                  310,50
                  380,95
                  450,60
                  450,170
                  30,170
                "
              />

              {/* Line path */}
              <polyline
                fill="none"
                stroke="#16a34a"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="
                  30,140
                  100,105
                  170,125
                  240,80
                  310,50
                  380,95
                  450,60
                "
              />

              {/* Data points */}
              {[
                { x: 30, y: 140, val: 4 },
                { x: 100, y: 105, val: 7 },
                { x: 170, y: 125, val: 5 },
                { x: 240, y: 80, val: 9 },
                { x: 310, y: 50, val: 12 },
                { x: 380, y: 95, val: 8 },
                { x: 450, y: 60, val: 11 },
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
                  <text x={pt.x} y={178} textAnchor="middle" fontSize="10" fill="#94a3b8" fontWeight="600">
                    {trendData[i].day}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Donut Chart: Health Distribution */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-extrabold text-forest-950 text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600" />
              <span>Health Distribution</span>
            </h3>
            <p className="text-xs text-slate-500">Overall status percentage ratio</p>
          </div>

          {/* Donut Visual */}
          <div className="relative flex items-center justify-center py-2">
            <svg width="160" height="160" viewBox="0 0 160 160">
              {/* Healthy Segment */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#22c55e"
                strokeWidth="20"
                strokeDasharray={`${(healthyPct / 100) * 377} 377`}
                strokeDashoffset="0"
                className="transform -rotate-90 origin-center transition-all duration-1000"
              />
              {/* Diseased Segment */}
              <circle
                cx="80"
                cy="80"
                r="60"
                fill="transparent"
                stroke="#f43f5e"
                strokeWidth="20"
                strokeDasharray={`${(diseasedPct / 100) * 377} 377`}
                strokeDashoffset={`-${(healthyPct / 100) * 377}`}
                className="transform -rotate-90 origin-center transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-forest-950">{healthyPct}%</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Healthy</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-700 font-medium">Healthy Foliage</span>
              </div>
              <span className="font-bold text-slate-800">{healthyPct}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-slate-700 font-medium">Diseased Pathogens</span>
              </div>
              <span className="font-bold text-slate-800">{diseasedPct}%</span>
            </div>
            {uncertainPct > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-700 font-medium">Uncertain / Low Conf.</span>
                </div>
                <span className="font-bold text-slate-800">{uncertainPct}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Most Detected Diseases & Recent Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Most Detected Diseases Bar Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
          <div className="space-y-1">
            <h3 className="font-extrabold text-forest-950 text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-brand-600" />
              <span>Most Detected Diseases</span>
            </h3>
            <p className="text-xs text-slate-500">Prevalence breakdown across scans</p>
          </div>

          <div className="space-y-3.5 pt-2">
            {diseaseBreakdown.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.name}</span>
                  <span className="text-brand-700">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-brand-600 h-2.5 rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Detections Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-soft space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-extrabold text-forest-950 text-base">Recent Foliar Detections</h3>
              <p className="text-xs text-slate-500">Latest diagnosis events</p>
            </div>
            <button
              onClick={onViewHistory}
              className="text-xs font-bold text-brand-700 hover:text-brand-900 transition flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Plant</th>
                  <th className="pb-3">Diagnosis</th>
                  <th className="pb-3">Confidence</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {(stats?.recent || []).map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 font-bold text-forest-950 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md overflow-hidden bg-slate-100 shrink-0">
                        {row.imageUrl ? (
                          <img src={row.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-[10px]">🌿</span>
                        )}
                      </div>
                      <span>{row.plant}</span>
                    </td>
                    <td className="py-3 text-slate-800">{row.disease}</td>
                    <td className="py-3 font-semibold text-brand-700">{row.confidence}%</td>
                    <td className="py-3">
                      <StatusBadge status={row.status} size="sm" />
                    </td>
                    <td className="py-3 text-slate-400 text-[11px]">
                      {new Date(row.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
