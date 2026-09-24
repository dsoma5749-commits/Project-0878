import React, { useState } from 'react';
import { Language, ActiveTab, DemoScenario } from './types';
import { audioSynth } from './services/audioSynth';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Overview } from './components/Overview';
import { VisionPathology } from './components/VisionPathology';
import { ClimateRadar } from './components/ClimateRadar';
import { SoilTelemetry } from './components/SoilTelemetry';
import { MandiArbitrage } from './components/MandiArbitrage';
import { JudgePitchDeck } from './components/JudgePitchDeck';
import { ShieldCheck, Globe, Heart, Award, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioSynth.setEnabled(next);
    if (next) {
      audioSynth.playScanSuccess();
    }
  };

  const handleSelectScenario = (scenario: DemoScenario) => {
    setActiveTab(scenario.targetTab);
    const msg = language === 'bn'
      ? `সফলভাবে সক্রিয় করা হয়েছে: ${scenario.titleBn} (${scenario.region})`
      : `Activated Scenario: ${scenario.titleEn} (${scenario.region})`;
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isBn = language === 'bn';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onLaunchPitch={() => setActiveTab('judge')}
      />

      {/* Navigation Sub-header */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <Overview language={language} onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'vision' && <VisionPathology language={language} />}
        {activeTab === 'climate' && <ClimateRadar language={language} />}
        {activeTab === 'iot' && <SoilTelemetry language={language} />}
        {activeTab === 'market' && <MandiArbitrage language={language} />}
        {activeTab === 'judge' && (
          <JudgePitchDeck
            language={language}
            onSelectScenario={handleSelectScenario}
            onNavigateTab={setActiveTab}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-400">
              {isBn ? 'কৃষি-পালস এআই (AgroPulse)' : 'AgroPulse AI'}
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>UN SDG 2 (Zero Hunger) & SDG 13 (Climate Action)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-400/90">Edge AI & LoRa Mesh Architecture</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setActiveTab('judge')}
              className="text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isBn ? 'বিচারক পিচ ডেক' : 'Hackathon Showcase'}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
