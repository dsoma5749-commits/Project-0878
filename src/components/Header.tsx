import React from 'react';
import { Language, ActiveTab } from '../types';
import { audioSynth } from '../services/audioSynth';
import { ShieldCheck, Volume2, VolumeX, Globe, Sparkles, Award, Radio } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onLaunchPitch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeTab,
  onTabChange,
  soundEnabled,
  onToggleSound,
  onLaunchPitch,
}) => {
  const isBn = language === 'bn';

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm shadow-emerald-500/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                {isBn ? 'কৃষি-পালস এআই' : 'AgroPulse AI'}
                <span className="text-[10px] font-mono tracking-wider font-semibold text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  v2.4 Live
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400/90 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isBn ? 'সক্রিয় লরা গ্রিড' : 'Active LoRa Grid'}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-[11px] hidden sm:inline">
                {isBn ? 'জলবায়ু ও শস্য সুরক্ষা নেটওয়ার্ক' : 'Climate & Crop Resilience Engine'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hackathon Pitch / Judges Showcase Button */}
          <button
            onClick={() => {
              audioSynth.playScanSuccess();
              onLaunchPitch();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'judge'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="hidden md:inline">{isBn ? 'বিচারক পিচ ও ডেমো' : 'Hackathon Pitch Deck'}</span>
            <span className="md:hidden">{isBn ? 'পিচ' : 'Pitch'}</span>
          </button>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            title={soundEnabled ? (isBn ? 'শব্দ বন্ধ করুন' : 'Mute Audio') : (isBn ? 'শব্দ চালু করুন' : 'Enable Audio')}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Language Switcher (বাংলা / English) */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => {
                audioSynth.playSolenoidClick();
                onLanguageChange('bn');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                isBn ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => {
                audioSynth.playSolenoidClick();
                onLanguageChange('en');
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                !isBn ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
