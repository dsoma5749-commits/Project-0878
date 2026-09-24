import React, { useState, useEffect } from 'react';
import { IoTSensorNode, Language } from '../types';
import { IOT_NODES } from '../data/mockData';
import { audioSynth } from '../services/audioSynth';
import { nasaEarthData, INDIA_AGRI_REGIONS } from '../services/nasaEarthData';
import {
  Cpu,
  Droplet,
  Thermometer,
  Zap,
  Activity,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Radio,
  Satellite,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface ExtendedSensorNode extends IoTSensorNode {
  regionKey: string;
  soilClassificationEn: string;
  soilClassificationBn: string;
  nasaCalibratedMoisturePct: number;
}

const EXTENDED_NODES: ExtendedSensorNode[] = [
  {
    ...IOT_NODES[0],
    id: 'NODE-01-PUNJAB',
    name: 'LoRa-Node #1 (Punjab Granary - Ludhiana Sutlej Basin)',
    regionKey: 'punjab-ludhiana',
    soilClassificationEn: 'Indo-Gangetic Sandy Loam (Inceptisols)',
    soilClassificationBn: 'গাঙ্গেয় সমভূমি বেলে দোআঁশ মাটি',
    nasaCalibratedMoisturePct: 38,
  },
  {
    ...IOT_NODES[1],
    id: 'NODE-02-BENGAL',
    name: 'LoRa-Node #2 (Burdwan / Hooghly Damodar Alluvial Ridge)',
    regionKey: 'ganga-bengal',
    soilClassificationEn: 'Alluvial Silt Loam (Fluvisols)',
    soilClassificationBn: 'পলিমাটি ও পলি দোআঁশ (দামোদর অববাহিকা)',
    nasaCalibratedMoisturePct: 34,
  },
  {
    ...IOT_NODES[2],
    id: 'NODE-03-SUNDARBAN',
    name: 'LoRa-Node #3 (Sundarbans Coastal Saline Polder Beta)',
    regionKey: 'sundarbans-delta',
    soilClassificationEn: 'Coastal Halomorphic Saline Clay (Entisols)',
    soilClassificationBn: 'উপকূলীয় লবণাক্ত এঁটেল মাটি (সুন্দরবন)',
    nasaCalibratedMoisturePct: 62,
  },
  {
    id: 'NODE-04-MAHARASHTRA',
    name: 'LoRa-Node #4 (Nashik / Lasalgaon Godavari Onion Ridge)',
    batteryLevel: 91,
    signalStrengthDbm: -76,
    soilMoisturePct: 42,
    soilTemperatureC: 28.6,
    soilPh: 7.2,
    nitrogenPpm: 54,
    phosphorusPpm: 28,
    potassiumPpm: 235,
    electricalConductivityMsCm: 0.95,
    irrigationStatus: 'idle',
    lastPingSecsAgo: 11,
    regionKey: 'maharashtra-nashik',
    soilClassificationEn: 'Deccan Black Cotton Soil (Vertisols / Regur)',
    soilClassificationBn: 'দাক্ষিণাত্য কালো তুলা মাটি (রেগুর)',
    nasaCalibratedMoisturePct: 44,
  },
];

interface SoilTelemetryProps {
  language: Language;
}

export const SoilTelemetry: React.FC<SoilTelemetryProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [nodes, setNodes] = useState<ExtendedSensorNode[]>(EXTENDED_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(EXTENDED_NODES[1].id);
  const [isAutonomous, setIsAutonomous] = useState<boolean>(true);
  const [isSyncingNasa, setIsSyncingNasa] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  const activeNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  const toggleIrrigationValve = () => {
    audioSynth.playSolenoidClick();
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === activeNode.id) {
          const nextStatus = node.irrigationStatus === 'irrigating' ? 'idle' : 'irrigating';
          return {
            ...node,
            irrigationStatus: nextStatus,
            // If irrigating, moisture goes up
            soilMoisturePct: nextStatus === 'irrigating' ? Math.min(95, node.soilMoisturePct + 14) : node.soilMoisturePct,
          };
        }
        return node;
      })
    );
  };

  const handleSyncWithNasaSatellite = async () => {
    audioSynth.playScanSuccess();
    setIsSyncingNasa(true);

    const targetRegion = INDIA_AGRI_REGIONS.find((r) => r.id === activeNode.regionKey) || INDIA_AGRI_REGIONS[1];

    try {
      const hydro = await nasaEarthData.fetchBasinHydrology(targetRegion);
      
      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === activeNode.id) {
            return {
              ...n,
              soilMoisturePct: hydro.soilMoistureRhizospherePct,
              soilTemperatureC: hydro.soilTemperatureC,
              nasaCalibratedMoisturePct: hydro.soilMoistureRhizospherePct,
              lastPingSecsAgo: 1,
            };
          }
          return n;
        })
      );

      const msg = isBn
        ? `নাসা ও কোপার্নিকাস স্যাটেলাইট মৃত্তিকা আর্দ্রতা সফলভাবে সিঙ্ক হয়েছে (${hydro.soilMoistureRhizospherePct}%)`
        : `Synced with NASA & Copernicus satellite soil moisture (${hydro.soilMoistureRhizospherePct}%)`;
      setSyncNotice(msg);
      setTimeout(() => setSyncNotice(null), 4000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSyncingNasa(false);
    }
  };

  const isLowMoisture = activeNode.soilMoisturePct < 40;
  const isHighSalinity = activeNode.electricalConductivityMsCm > 2.5;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              LoRaWAN 868MHz + NASA Satellite Calibrated
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-1">
            <Cpu className="w-5 h-5 text-emerald-400" />
            {isBn ? 'লরা আইওটি ও নাসা স্যাটেলাইট মৃত্তিকা আর্দ্রতা কনসোল' : 'LoRa Edge IoT & NASA Satellite Soil Telemetry'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? 'নাসার রুট-জোন আর্দ্রতা ও ফিল্ড সেন্সর নোডের মাধ্যমে স্বয়ংক্রিয় ড্রিপ সেচ ভালভ অ্যাকচুয়েটর'
              : 'Direct integration of real NASA MERRA-2 rhizosphere moisture with edge LoRa solenoid valves'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncWithNasaSatellite}
            disabled={isSyncingNasa}
            className="px-3 py-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-900/60 cursor-pointer transition-colors"
          >
            <Satellite className={`w-3.5 h-3.5 text-cyan-400 ${isSyncingNasa ? 'animate-spin' : ''}`} />
            <span>{isSyncingNasa ? 'Syncing NASA...' : (isBn ? 'নাসা স্যাটেলাইট সিঙ্ক' : 'Sync NASA Satellite')}</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>LoRa 868MHz Mesh: Active</span>
          </div>
        </div>
      </div>

      {/* Sync Toast Notice */}
      {syncNotice && (
        <div className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-200 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Node Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {nodes.map((node) => {
          const isSelected = node.id === activeNode.id;
          return (
            <button
              key={node.id}
              onClick={() => {
                audioSynth.playSolenoidClick();
                setSelectedNodeId(node.id);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/70 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">{node.id}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    node.irrigationStatus === 'irrigating'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {node.irrigationStatus.toUpperCase()}
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-1.5 truncate">{node.name}</div>
              <div className="mt-2 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Moisture:</span>
                <span className={node.soilMoisturePct < 40 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                  {node.soilMoisturePct}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Node Deep-Dive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Gauges & Valve Actuator (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-6">
          {/* Node Meta & Health */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-slate-400">{activeNode.id}</span>
              <h3 className="text-base font-bold text-white">{activeNode.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isBn ? activeNode.soilClassificationBn : activeNode.soilClassificationEn}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="text-right">
                <div className="text-slate-400">Signal (RSSI)</div>
                <div className="text-emerald-400 font-bold">{activeNode.signalStrengthDbm} dBm</div>
              </div>
              <div className="text-right">
                <div className="text-slate-400">Battery</div>
                <div className="text-emerald-400 font-bold">{activeNode.batteryLevel}%</div>
              </div>
            </div>
          </div>

          {/* Actuator Solenoid Control Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                {isBn ? 'সোলেনয়েড ড্রিপ সেচ ভালভ নিয়ন্ত্রণ' : 'Solenoid Micro-Drip Valve Control'}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {activeNode.irrigationStatus === 'irrigating' ? (
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    {isBn ? 'ভালভ সক্রিয় — পানি প্রবাহিত হচ্ছে' : 'Valve OPEN — Drip Flow Active'}
                  </span>
                ) : (
                  <span className="text-slate-400">{isBn ? 'ভালভ বন্ধ (স্ট্যান্ডবাই)' : 'Valve CLOSED (Standby)'}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleIrrigationValve}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${
                  activeNode.irrigationStatus === 'irrigating'
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20'
                }`}
              >
                <Droplet className="w-4 h-4" />
                <span>
                  {activeNode.irrigationStatus === 'irrigating'
                    ? (isBn ? 'সেচ বন্ধ করুন' : 'CLOSE VALVE')
                    : (isBn ? 'সেচ শুরু করুন' : 'OPEN VALVE')}
                </span>
              </button>
            </div>
          </div>

          {/* Sensor Gauges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Volumetric Moisture */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-cyan-400" />
                Moisture (VWC)
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-cyan-400">
                {activeNode.soilMoisturePct}%
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">
                NASA Cal: {activeNode.nasaCalibratedMoisturePct}%
              </div>
            </div>

            {/* Soil Temperature */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-amber-400" />
                Temperature
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-amber-300">
                {activeNode.soilTemperatureC}°C
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">Rhizosphere depth</div>
            </div>

            {/* Soil pH */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-purple-400" />
                Soil pH
              </span>
              <div className="text-2xl font-bold font-mono mt-1 text-purple-300">
                {activeNode.soilPh}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">
                {activeNode.soilPh > 7.5 ? 'Alkaline' : 'Optimal Neutral'}
              </div>
            </div>

            {/* Electrical Conductivity (Salinity) */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-rose-400" />
                EC (Salinity)
              </span>
              <div className={`text-2xl font-bold font-mono mt-1 ${isHighSalinity ? 'text-rose-400' : 'text-slate-200'}`}>
                {activeNode.electricalConductivityMsCm}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-mono">mS/cm (Salinity)</div>
            </div>
          </div>
        </div>

        {/* Right Column: N-P-K Soil Nutrients & Agronomic Guidance (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* N-P-K Telemetry Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              {isBn ? 'এন-পি-কে (N-P-K) মাটির পুষ্টি অনুপাত' : 'Rhizosphere N-P-K Nutrient Assay'}
            </h3>

            <div className="space-y-3.5 mt-4">
              {/* Nitrogen */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Nitrogen (N - ইউরিয়া):</span>
                  <span className="font-bold text-cyan-400">{activeNode.nitrogenPpm} PPM</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (activeNode.nitrogenPpm / 80) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Phosphorus (P - টিএসপি / ডিএপি):</span>
                  <span className="font-bold text-amber-400">{activeNode.phosphorusPpm} PPM</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (activeNode.phosphorusPpm / 50) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Potassium */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-400">Potassium (K - এমওপি):</span>
                  <span className="font-bold text-emerald-400">{activeNode.potassiumPpm} PPM</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (activeNode.potassiumPpm / 300) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Autonomous Advisory Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4" />
              {isBn ? 'স্বয়ংক্রিয় মৃত্তিকা প্রেসক্রিপশন' : 'Autonomous Soil Prescription'}
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              {isLowMoisture && (
                <div className="text-amber-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isBn
                      ? 'আর্দ্রতা সতর্কীকরণ: মাটির আর্দ্রতা ৩৪%-এ নেমে গেছে। ৩০ মিনিট ড্রিপ সেচ চালু রাখুন।'
                      : 'Moisture Deficit: Rhizosphere moisture is below threshold (34%). Micro-drip recommended.'}
                  </span>
                </div>
              )}
              {isHighSalinity && (
                <div className="text-rose-400 font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {isBn
                      ? 'লবণাক্ততা বৃদ্ধি: সুন্দরবন অঞ্চলে ইসি ৩.৪৫ mS/cm। মিঠা পানির ফ্লাশিং প্রয়োজন।'
                      : 'High Salinity Risk: EC exceeds 2.5 mS/cm in Sundarbans polder. Sluice gate flush required.'}
                  </span>
                </div>
              )}
              <p className="text-slate-400 text-[11px]">
                {isBn
                  ? 'আইসিএআর (ICAR) মৃত্তিকা স্বাস্থ্য কার্ড স্ট্যান্ডার্ড অনুযায়ী পুষ্টির মাত্রা পরিমাপ করা হয়েছে। অতিরিক্ত রাসায়নিক সার ব্যবহার রোধ করে ভূগর্ভস্থ পানি রক্ষা করুন।'
                  : 'Calibrated with ICAR Soil Health Card benchmarks. Protects groundwater and cuts redundant chemical input costs by up to 25%.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
