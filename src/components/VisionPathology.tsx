import React, { useState, useRef, useEffect } from 'react';
import { CropDisease, Language } from '../types';
import { CROP_DISEASES } from '../data/mockData';
import { audioSynth } from '../services/audioSynth';
import {
  Scan,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Volume2,
  RefreshCw,
  Upload,
  Leaf,
  ShieldAlert,
  Clock,
  Sparkles,
  FileText
} from 'lucide-react';

interface VisionPathologyProps {
  language: Language;
}

export const VisionPathology: React.FC<VisionPathologyProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [selectedDisease, setSelectedDisease] = useState<CropDisease>(CROP_DISEASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [highlightBox, setHighlightBox] = useState<number | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerScanSimulation = (disease: CropDisease, customImg?: string) => {
    setIsScanning(true);
    setScanProgress(0);
    if (customImg) {
      setUploadedImage(customImg);
    } else {
      setUploadedImage(null);
    }
    setSelectedDisease(disease);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          audioSynth.playScanSuccess();
          return 100;
        }
        return prev + 25;
      });
    }, 120);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Map to potato blight or rice blast for simulated diagnosis
        triggerScanSimulation(CROP_DISEASES[1], result);
      };
      reader.readAsDataURL(file);
    }
  };

  const playVoiceAdvisory = () => {
    if (isBn) {
      audioSynth.speakGuidance(selectedDisease.audioGuidanceBn, 'bn-IN');
    } else {
      audioSynth.speakGuidance(selectedDisease.audioGuidanceEn, 'en-US');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-emerald-400" />
            {isBn ? 'মাল্টি-স্পেকট্রাল এআই প্যাথোলজি স্ক্যানার' : 'Multi-Spectral AI Pathology Diagnostic Engine'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? 'পাতার রোগ ও ছত্রাক বিশ্লেষণ, নেক্রোটিক ক্ষতের বাউন্ডিং বক্স এবং প্রেসক্রিপশন'
              : 'Sub-millimeter lesion segmentation, pathogen taxonomy & dual organic/chemical prescription'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isBn ? 'নিজের ছবি আপলোড করুন' : 'Upload Field Image'}</span>
          </button>

          <button
            onClick={playVoiceAdvisory}
            className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-emerald-500/30 cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isBn ? 'ভয়েস পরামর্শ শুনুন' : 'Play Voice Advisory'}</span>
          </button>
        </div>
      </div>

      {/* Preset Test Cases for Judges and Farmers */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {isBn ? 'শনাক্তকরণের জন্য নমুনা টেস্ট কেস নির্বাচন করুন:' : 'Select Diagnostic Sample Case:'}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CROP_DISEASES.map((disease) => {
            const isSelected = selectedDisease.id === disease.id && !uploadedImage;
            return (
              <button
                key={disease.id}
                onClick={() => {
                  audioSynth.playSolenoidClick();
                  triggerScanSimulation(disease);
                }}
                className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-xs'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate">
                    {isBn ? disease.cropBn : disease.cropEn}
                  </span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      disease.severity === 'critical'
                        ? 'bg-red-500'
                        : disease.severity === 'moderate'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {isBn ? disease.nameBn.split('(')[0] : disease.nameEn.split('(')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnostic Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Visual Canvas & Bounding Box Inspection (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                {isBn ? 'মাল্টি-স্পেকট্রাল পাতার ভিউপোর্ট' : 'Multispectral Leaf Analysis Viewport'}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Resolution: 2048x1536 · 30fps Inference
              </span>
            </div>

            {/* Simulated High-Res Synthetic Canvas / Image View */}
            <div className="relative aspect-4/3 w-full bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center select-none group">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Uploaded leaf"
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Dynamic SVG/Canvas Simulation representing real agronomy leaf pathology */
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full object-cover bg-linear-to-b from-slate-950 via-slate-900 to-slate-950"
                >
                  {/* Stem & Veins */}
                  <path
                    d="M 200 290 Q 200 150 195 20"
                    stroke="#15803d"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Leaf Blade Outline */}
                  <path
                    d="M 195 20 C 130 50 80 140 100 240 C 115 275 160 285 200 290 C 240 285 285 275 300 240 C 320 140 270 50 195 20 Z"
                    fill={selectedDisease.id === 'healthy-rice' ? '#166534' : '#14532d'}
                    stroke="#22c55e"
                    strokeWidth="2"
                    opacity="0.9"
                  />
                  {/* Lateral Secondary Veins */}
                  <path
                    d="M 196 90 Q 140 80 120 100 M 196 90 Q 255 80 275 100 M 198 160 Q 130 150 105 180 M 198 160 Q 265 150 290 180 M 199 220 Q 140 215 125 240 M 199 220 Q 260 215 275 240"
                    stroke="#16a34a"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                  />

                  {/* Disease Necrotic Spots representation */}
                  {selectedDisease.id === 'rice-blast' && (
                    <g>
                      <ellipse cx="150" cy="115" rx="35" ry="18" fill="#78350f" opacity="0.85" />
                      <ellipse cx="150" cy="115" rx="22" ry="9" fill="#9ca3af" />
                      <ellipse cx="240" cy="170" rx="30" ry="15" fill="#78350f" opacity="0.85" />
                      <ellipse cx="240" cy="170" rx="18" ry="7" fill="#cbd5e1" />
                      <ellipse cx="170" cy="220" rx="24" ry="12" fill="#78350f" opacity="0.8" />
                    </g>
                  )}

                  {selectedDisease.id === 'potato-blight' && (
                    <g>
                      <path
                        d="M 160 80 Q 220 70 240 120 Q 260 180 200 190 Q 140 180 130 130 Z"
                        fill="#1c1917"
                        opacity="0.9"
                      />
                      <circle cx="210" cy="130" r="28" fill="#44403c" opacity="0.8" />
                      <path
                        d="M 230 110 Q 250 140 245 160"
                        stroke="#e2e8f0"
                        strokeWidth="3"
                        strokeDasharray="2,3"
                        fill="none"
                      />
                    </g>
                  )}

                  {selectedDisease.id === 'tomato-curl' && (
                    <g>
                      <path
                        d="M 120 70 Q 170 120 160 180 Q 230 140 280 80"
                        stroke="#eab308"
                        strokeWidth="14"
                        fill="none"
                        opacity="0.75"
                      />
                    </g>
                  )}
                </svg>
              )}

              {/* Scanning Laser Animation Bar */}
              {isScanning && (
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400 transition-all duration-150"
                  style={{ top: `${scanProgress}%` }}
                />
              )}

              {/* Real-time Bounding Boxes overlay */}
              {!isScanning &&
                selectedDisease.boxCoordinates.map((box, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHighlightBox(idx)}
                    onMouseLeave={() => setHighlightBox(null)}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.w}%`,
                      height: `${box.h}%`,
                    }}
                    className={`absolute border-2 transition-all cursor-pointer ${
                      highlightBox === idx
                        ? 'border-emerald-400 bg-emerald-400/20 z-20 scale-102'
                        : 'border-amber-400/80 bg-amber-400/10'
                    }`}
                  >
                    <span className="absolute -top-5 left-0 bg-slate-900/90 text-amber-300 font-mono text-[10px] px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap shadow-xs">
                      {box.label}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Diagnostic Stats Below Canvas */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-800/80">
            <div>
              <div className="text-[11px] text-slate-400">
                {isBn ? 'এআই নিশ্চিতকরণ স্কোর' : 'AI Confidence'}
              </div>
              <div className="text-base font-bold text-emerald-400 font-mono">
                {(selectedDisease.confidence * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">
                {isBn ? 'ক্ষতিগ্রস্ত পৃষ্ঠভাগ' : 'Infected Area'}
              </div>
              <div className="text-base font-bold text-amber-400 font-mono">
                {selectedDisease.affectedAreaPercentage}%
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">
                {isBn ? 'জরুরি সময়সীমা' : 'Action Window'}
              </div>
              <div className="text-base font-bold text-rose-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedDisease.urgencyDays === 0
                  ? isBn
                    ? 'স্বাভাবিক'
                    : 'Optimal'
                  : isBn
                  ? `${selectedDisease.urgencyDays} দিন`
                  : `${selectedDisease.urgencyDays} Days`}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Pathology Report, Clinical Prescription & Treatment (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Disease Identification Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  {selectedDisease.pathogenType.toUpperCase()} PATHOGEN
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {isBn ? selectedDisease.nameBn : selectedDisease.nameEn}
                </h3>
                <div className="text-xs text-emerald-400">
                  {isBn ? selectedDisease.cropBn : selectedDisease.cropEn}
                </div>
              </div>
              <div
                className={`p-2 rounded-lg ${
                  selectedDisease.severity === 'critical'
                    ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                    : selectedDisease.severity === 'moderate'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {selectedDisease.severity === 'critical' ? (
                  <Flame className="w-5 h-5" />
                ) : selectedDisease.severity === 'moderate' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
            </div>

            {/* Pathological Symptoms */}
            <div className="mt-3">
              <span className="text-xs font-semibold text-slate-300">
                {isBn ? 'চিহ্নিত লক্ষণসমূহ:' : 'Diagnostic Symptoms:'}
              </span>
              <ul className="mt-1.5 space-y-1 text-xs text-slate-400">
                {(isBn ? selectedDisease.symptomsBn : selectedDisease.symptomsEn).map((sym, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">·</span>
                    <span>{sym}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Dual Prescription: Organic & Chemical */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              {isBn ? 'সমন্বিত বালাই দমন ও প্রেসক্রিপশন (IPM)' : 'Prescription & IPM Intervention Plan'}
            </h4>

            {/* Organic Eco-friendly treatment */}
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
              <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                {isBn ? '১. জৈব ও পরিবেশবান্ধব প্রতিকার' : '1. Organic & Bio-Control Action'}
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {isBn ? selectedDisease.organicTreatmentBn : selectedDisease.organicTreatmentEn}
              </p>
            </div>

            {/* Chemical Systemic treatment */}
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                {isBn ? '২. রাসায়নিক ছত্রাকনাশক/কীটনাশক প্রয়োগ' : '2. Chemical Systemic Protocol'}
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-mono text-[11px]">
                {isBn ? selectedDisease.chemicalTreatmentBn : selectedDisease.chemicalTreatmentEn}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
