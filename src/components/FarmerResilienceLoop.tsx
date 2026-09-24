import React, { useState } from 'react';
import { Language, ActiveTab } from '../types';
import { audioSynth } from '../services/audioSynth';
import {
  Satellite,
  Waves,
  Eye,
  Scan,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Droplets,
  DollarSign,
  Truck,
  Building2,
  Play,
  RotateCcw,
} from 'lucide-react';

interface FarmerResilienceLoopProps {
  language: Language;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const FarmerResilienceLoop: React.FC<FarmerResilienceLoopProps> = ({
  language,
  onNavigateTab,
}) => {
  const isBn = language === 'bn';
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const steps = [
    {
      id: 'observe',
      stage: '1. OBSERVE',
      stageBn: '১. পর্যবেক্ষণ (OBSERVE)',
      title: 'NASA POWER & ISRO INSAT-3DR Live Satellite Stream',
      titleBn: 'নাসা পাওয়ার ও ইসরো ইনস্যাট-৩ডিআর লাইভ স্যাটেলাইট ডেটা',
      icon: Satellite,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/40',
      bgGlow: 'bg-cyan-950/30',
      badge: 'NASA Langley & ISRO 74°E',
      badgeBn: 'নাসা ল্যাংলি ও ইসরো ৭৪°E',
      dataMetrics: [
        { label: 'NASA T2M Air Temp', value: '27.4°C' },
        { label: 'NASA PRECTOTCORR', value: '48.5 mm/day' },
        { label: 'NASA RH2M Humidity', value: '86%' },
        { label: 'ISRO TIR Cloud Top', value: '-64.5°C' },
      ],
      farmerStory:
        'Farmer Debabrata Sarkar (5 acres paddy & potato in Brahmaputra basin) receives continuous NASA POWER AG telemetry. Satellite infrared detects a massive convective cloudburst system building upstream in the transboundary catchment.',
      farmerStoryBn:
        'ব্রহ্মপুত্র অববাহিকার কৃষক দেবব্রত সরকার (৫ একর আমন ধান ও আলু) নাসার লাইভ স্যাটেলাইট ডেটা গ্রহণ করছেন। ইনস্যাট-৩ডিআর ইনফ্রারেড ইমেজে দেখা যায় নদীর উজানে তীব্র মেঘপুঞ্জ ও ভারী বৃষ্টিপাত ঘনীভূত হচ্ছে।',
      actionLabel: 'Inspect NASA Radar',
      actionLabelBn: 'নাসা ক্লাইমেট রাডার দেখুন',
      targetTab: 'climate' as ActiveTab,
    },
    {
      id: 'detect',
      stage: '2. DETECT',
      stageBn: '২. শনাক্তকরণ (DETECT)',
      title: 'CWC River Gauge Surge & AI-Assisted Pathology Outbreak',
      titleBn: 'সিডব্লিউসি নদীর পানির উচ্চতা বৃদ্ধি ও পাতার রোগ শনাক্ত',
      icon: Waves,
      color: 'text-rose-400',
      borderColor: 'border-rose-500/40',
      bgGlow: 'bg-rose-950/30',
      badge: 'CWC Site #031 & AI Vision',
      badgeBn: 'সিডব্লিউসি গেজ #০৩১ ও এআই ভিশন',
      dataMetrics: [
        { label: 'CWC Water Level', value: '51.33 m (+1.65m Surge)' },
        { label: 'Scaled Discharge', value: '54,800 m³/s' },
        { label: 'Pathology Status', value: 'Rice Blast / Blight Detected' },
        { label: 'Necrotic Foliar Area', value: '24.5% Leaf Lesions' },
      ],
      farmerStory:
        'Central Water Commission Guwahati gauge overflows +1.65m above official danger mark. Simultaneously, extreme 86% humidity triggers fungal spore germination: the AI-assisted pathology prototype detects 24.5% necrotic lesions on his standing crops.',
      farmerStoryBn:
        'কেন্দ্রীয় পানি কমিশনের (CWC) গুয়াহাটি গেজে পানি বিপদসীমার ১.৬৫ মিটার ওপর দিয়ে বইছে (প্রবাহ ৫৪,৮০০ m³/s)। একই সাথে অতিরিক্ত আর্দ্রতায় ধানের পাতায় ব্লাস্ট ও আলুতে ধসা রোগ ধরেছে, যা এআই ভিশন প্রোটোটাইপে ২৪.৫% ক্ষতে ধরা পড়ে।',
      actionLabel: 'View Vision Pathology',
      actionLabelBn: 'এআই প্যাথোলজি স্ক্যানার দেখুন',
      targetTab: 'vision' as ActiveTab,
    },
    {
      id: 'predict',
      stage: '3. PREDICT',
      stageBn: '৩. পূর্বাভাস (PREDICT)',
      title: 'Flood Wave Arrival & Rhizosphere Root-Zone Saturation',
      titleBn: 'বন্যা প্লাবনের সময় ও শিকড় অঞ্চলের অতিরিক্ত স্যাচুরেশন',
      icon: AlertTriangle,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/40',
      bgGlow: 'bg-amber-950/30',
      badge: 'CWC Rating Curve & NASA GWETROOT',
      badgeBn: 'রেটিং কার্ভ ও নাসা রুট-জোন আর্দ্রতা',
      dataMetrics: [
        { label: 'Flood Inundation ETA', value: '18 to 24 Hours' },
        { label: 'NASA GWETROOT Wetness', value: '94% Root Saturation' },
        { label: 'At-Risk Standing Crop', value: '₹3,25,000 Total Value' },
        { label: 'Projected Loss (No Action)', value: '38% Loss (₹1,23,500)' },
      ],
      farmerStory:
        'The hydrological routing model predicts lowland char inundation within 18 hours. NASA soil wetness (GWETROOT) reaches 94% saturation—if standing ripe paddy and tubers remain in flooded mud, they will rot completely within 48 hours.',
      farmerStoryBn:
        'হাইড্রো-মডেলিং অনুযায়ী ১৮ ঘণ্টার মধ্যে প্লাবন চরের নিচু জমি ভাসিয়ে দেবে। নাসার রুট-জোন আর্দ্রতা ৯৪% স্যাচুরেশনে পৌঁছেছে—দ্রুত না কাটলে পাকা ধান ও আলু পানিতে পচে ১,২৩,৫০০ টাকার সম্পূর্ণ ক্ষতি হবে।',
      actionLabel: 'Inspect Soil Telemetry',
      actionLabelBn: 'মাটির স্যাটেলাইট আর্দ্রতা দেখুন',
      targetTab: 'iot' as ActiveTab,
    },
    {
      id: 'decide',
      stage: '4. DECIDE',
      stageBn: '৪. সিদ্ধান্ত গ্রহণ (DECIDE)',
      title: 'Autonomous Harvest Notice, e-NAM Arbitrage & Cold Vault',
      titleBn: 'জরুরি ধান কর্তন, এপিএমসি মান্ডি লাভ ও কোল্ড স্টোরেজ সংরক্ষণ',
      icon: TrendingUp,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-950/30',
      badge: 'e-NAM Arbitrage & CWC Vault',
      badgeBn: 'ই-ন্যাম মান্ডি ও কোল্ড স্টোরেজ',
      dataMetrics: [
        { label: 'Distress Middleman Bid', value: '₹1,400/maund (REJECTED)' },
        { label: 'Terminal Mandi Rate', value: '₹2,900/quintal (Azadpur)' },
        { label: 'Net Arbitrage Profit', value: '+₹38,500 / 10 MT Truck' },
        { label: 'Saved Crop Capital', value: '₹1,04,000 Preserved' },
      ],
      farmerStory:
        'Local middlemen offer a panic distress price of only ₹1,400/maund. AgroPulse autonomous engine guides Debabrata: (1) Mobilize early harvest within 18h, (2) Reject middleman syndicate, (3) Dispatch 10 MT truckload via e-NAM corridor to Azadpur or reserve CWC Cold Vault at ₹32/quintal/month!',
      farmerStoryBn:
        'ফড়িয়া ও মধ্যস্বত্বভোগীরা আতঙ্কের সুযোগ নিয়ে মাত্র ১,৪০০ টাকা/মণে ফসল কিনতে চায়। এগ্রোপালস ইঞ্জিন পরামর্শ দেয়: (১) ১৮ ঘণ্টার মধ্যে পাকা ধান কেটে ফেলা, (২) ফড়িয়ার প্রস্তাব প্রত্যাখ্যান করা, (৩) ই-ন্যাম করিডোরে আজাদপুর টার্মিনাল মান্ডিতে ট্রাক পাঠানো বা গুয়াহাটি কোল্ড স্টোরেজে রাখা—এতে কৃষক ৩৮,৫০০ টাকা অতিরিক্ত লাভ করেন এবং ১,০৪,০০০ টাকার ফসল রক্ষা পায়!',
      actionLabel: 'Execute Mandi Arbitrage',
      actionLabelBn: 'মান্ডি দর ও কোল্ড স্টোরেজ দেখুন',
      targetTab: 'market' as ActiveTab,
    },
  ];

  const handleStepClick = (index: number) => {
    audioSynth.playSolenoidClick();
    setActiveStep(index);
  };

  const runFullSimulation = () => {
    audioSynth.playScanSuccess();
    setIsSimulating(true);
    let cur = 0;
    const interval = setInterval(() => {
      cur++;
      if (cur < steps.length) {
        setActiveStep(cur);
        audioSynth.playSolenoidClick();
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1800);
  };

  const current = steps[activeStep];
  const CurrentIcon = current.icon;

  return (
    <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Scenario Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-950/90 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Project-0878 Hero Workflow
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              NASA Climate ➔ River Flood ➔ Soil Saturation ➔ Mandi Arbitrage
            </span>
          </div>
          <h2 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
            <span>{isBn ? 'কৃষক রেজিলিয়েন্স সিদ্ধান্ত লুপ' : 'Farmer Resilience Decision Loop'}</span>
            <span className="text-xs font-normal text-slate-400 font-mono">
              (Observe ➔ Detect ➔ Predict ➔ Decide)
            </span>
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            {isBn
              ? 'বাস্তব কেস স্টাডি: কৃষক দেবব্রত সরকার (৫ একর জমি, ব্রহ্মপুত্র অববাহিকা) — বন্যা ও ছত্রাক আক্রমণ মোকাবিলা করে ₹৩৮,৫০০ অতিরিক্ত লাভ নিশ্চিতকরণ'
              : 'Real Farmer Scenario: Debabrata Sarkar (5 Acres, Brahmaputra Basin) overcoming river flood surge & fungal blight to protect ₹1,42,500 value.'}
          </p>
        </div>

        {/* Simulation Control */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={runFullSimulation}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? (isBn ? 'সিমুলেশন চলছে...' : 'Simulating Loop...') : (isBn ? 'সম্পূর্ণ পরিস্থিতি সিমুলেট করুন' : 'Simulate Farmer Loop')}</span>
          </button>
        </div>
      </div>

      {/* 4-Step Interactive Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(idx)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? `${step.bgGlow} ${step.borderColor} border-2 text-white shadow-lg`
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {isActive && (
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-current ${step.color}`}
                />
              )}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-mono font-bold uppercase ${step.color}`}>
                  {isBn ? step.stageBn : step.stage}
                </span>
                <Icon className={`w-4 h-4 ${step.color} ${isActive ? 'animate-pulse' : ''}`} />
              </div>
              <div className="text-xs font-bold text-white mt-1 truncate">
                {isBn ? step.badgeBn : step.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Deep-Dive Card */}
      <div className={`p-4 rounded-xl border ${current.borderColor} ${current.bgGlow} transition-all`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-slate-950 border ${current.borderColor} flex items-center justify-center ${current.color}`}>
                <CurrentIcon className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] font-mono font-bold uppercase ${current.color}`}>
                  {isBn ? current.stageBn : current.stage} · {isBn ? current.badgeBn : current.badge}
                </span>
                <h3 className="text-base font-bold text-white">
                  {isBn ? current.titleBn : current.title}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
              {isBn ? current.farmerStoryBn : current.farmerStory}
            </p>
          </div>

          {/* Key Data Box */}
          <div className="shrink-0 bg-slate-950/90 border border-slate-800 p-3 rounded-xl min-w-[260px] space-y-2 font-mono">
            <div className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span>Telemetry Snapshot</span>
              <span className={current.color}>Verified Live</span>
            </div>
            <div className="space-y-1.5 text-xs">
              {current.dataMetrics.map((m, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-slate-400 text-[11px]">{m.label}:</span>
                  <span className="text-white font-bold">{m.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                audioSynth.playScanSuccess();
                onNavigateTab(current.targetTab);
              }}
              className={`w-full mt-2 py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border ${current.borderColor} cursor-pointer`}
            >
              <span>{isBn ? current.actionLabelBn : current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
