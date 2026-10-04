import React, { useState, useEffect } from 'react';
import {
  Search,
  Trash2,
  Eye,
  Calendar,
  Inbox,
  X,
  Stethoscope,
  Pill
} from 'lucide-react';
import type { HistoryItem } from '../types';
import { fetchHistory, deleteHistoryRecord } from '../services/api';
import { StatusBadge } from '../components/StatusBadge';

interface HistoryPageProps {
  onStartDetection: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onStartDetection }) => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedItemForModal, setSelectedItemForModal] = useState<HistoryItem | null>(null);

  useEffect(() => {
    loadHistory();
  }, [searchQuery, selectedPlant, selectedStatus]);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory(searchQuery, selectedPlant, selectedStatus);
      setItems(data);
    } catch (err) {
      console.error('Error loading history:', err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this detection record?')) {
      await deleteHistoryRecord(id);
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedItemForModal?.id === id) {
        setSelectedItemForModal(null);
      }
    }
  };

  // Distinct plant names from current records
  const plantOptions = ['All', 'Tomato', 'Potato', 'Apple', 'Corn (Maize)', 'Grape', 'Bell Pepper', 'Strawberry', 'Rice', 'Wheat', 'Cotton'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
            DIAGNOSTIC ARCHIVE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-950 tracking-tight mt-2">
            Detection History
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Review past foliar scan records, treatment recommendations, and health trajectories.
          </p>
        </div>

        <button
          onClick={onStartDetection}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
        >
          <span>+ Scan Another Leaf</span>
        </button>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search plants, pathogens, or symptoms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition"
          />
        </div>

        {/* Plant Filter Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Crop:</span>
          <select
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition cursor-pointer"
          >
            {plantOptions.map((plant) => (
              <option key={plant} value={plant}>
                {plant === 'All' ? 'All Crops' : plant}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5">
          {['All', 'Healthy', 'Diseased', 'Uncertain'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedStatus === status
                  ? 'bg-forest-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* History Items Grid */}
      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 border border-slate-200/80 shadow-soft text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Inbox className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-forest-950 text-base">No Scans Found</h3>
            <p className="text-xs text-slate-500">
              No detection records match your selected filter criteria or no scans have been recorded yet.
            </p>
          </div>
          <button
            onClick={onStartDetection}
            className="px-6 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm transition active:scale-95"
          >
            Detect Your First Leaf
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItemForModal(item)}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Thumbnail & Badges */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.plant}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      🌿
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  {item.demo && (
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300">
                      Demo
                    </div>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
                    <span>{item.plant}</span>
                    <span className="font-bold text-brand-700">{item.confidence}% Conf.</span>
                  </div>
                  <h3 className="font-black text-forest-950 text-lg group-hover:text-brand-700 transition">
                    {item.disease}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItemForModal(item);
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-900 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDelete(item.id, e)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete scan record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedItemForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 px-6 border-b border-slate-100 bg-slate-50/60">
              <div className="flex items-center gap-3">
                <StatusBadge status={selectedItemForModal.status} />
                <div>
                  <h3 className="font-black text-forest-950 text-lg">{selectedItemForModal.disease}</h3>
                  <span className="text-xs text-slate-500">Specimen: {selectedItemForModal.plant}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {selectedItemForModal.imageUrl && (
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                    <img
                      src={selectedItemForModal.imageUrl}
                      alt={selectedItemForModal.plant}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-xs text-slate-500">Model Certainty:</div>
                  <div className="text-3xl font-black text-brand-700">
                    {selectedItemForModal.confidence}%
                  </div>
                  <div className="text-xs text-slate-400">
                    Diagnosed on {new Date(selectedItemForModal.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              {selectedItemForModal.symptoms && selectedItemForModal.symptoms.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-amber-600" />
                    <span>Identified Symptoms</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedItemForModal.symptoms.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Treatment */}
              {selectedItemForModal.treatment && selectedItemForModal.treatment.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-brand-600" />
                    <span>Recommended Treatment</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {selectedItemForModal.treatment.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedItemForModal(null)}
                className="px-5 py-2 rounded-full bg-forest-900 text-white font-bold text-xs"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
