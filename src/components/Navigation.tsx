import React from 'react';
import { ActiveTab, Language } from '../types';
import { audioSynth } from '../services/audioSynth';
import {
  LayoutDashboard,
  ScanEye,
  CloudRain,
  Cpu,
  TrendingUp,
  Award,
} from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  language,
}) => {
  const isBn = language === 'bn';

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'overview',
      label: isBn ? 'সারসংক্ষেপ' : 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'vision',
      label: isBn ? 'এআই রোগ নির্ণয়' : 'Vision Pathology',
      icon: <ScanEye className="w-4 h-4" />,
    },
    {
      id: 'climate',
      label: isBn ? 'প্লাবন ও দুর্যোগ রাডার' : 'Climate Radar',
      icon: <CloudRain className="w-4 h-4" />,
    },
    {
      id: 'iot',
      label: isBn ? 'স্মার্ট সেচ ও আইওটি' : 'IoT Hydro-Soil',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      id: 'market',
      label: isBn ? 'আড়তের দর ও কোল্ড স্টোরেজ' : 'Mandi Arbitrage',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'judge',
      label: isBn ? 'বিচারক পিচ ও ব্লুপ্রিন্ট' : 'Judges Pitch & README',
      icon: <Award className="w-4 h-4 text-amber-400" />,
    },
  ];

  return (
    <div className="border-b border-slate-800 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2.5 no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  audioSynth.playSolenoidClick();
                  onTabChange(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
