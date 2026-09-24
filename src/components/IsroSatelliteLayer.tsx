import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { NasaRegionalCluster } from '../services/nasaEarthData';
import { HydrometeorologicalData } from '../services/dataSync';
import { audioSynth } from '../services/audioSynth';
import {
  Satellite,
  Layers,
  Thermometer,
  CloudRain,
  Eye,
  Wind,
  Radio,
  Sparkles,
  Compass,
  RefreshCw,
  Info,
  Maximize2,
  ShieldCheck,
} from 'lucide-react';

export type IsroGeostationaryChannel =
  | 'TIR_THERMAL'      // INSAT-3DR Thermal Infrared (10.8 µm) Cloud Top Temperature
  | 'WATER_VAPOR'      // INSAT-3DR Water Vapor (6.8 µm) Tropospheric Moisture Flux
  | 'IMSRA_RAINFALL'   // INSAT Multi-Spectral Rainfall Algorithm (Precipitation Rate mm/hr)
  | 'AWIFS_NDVI';      // Resourcesat-2A AWiFS Agro-NDVI Vegetation Composite

interface IsroSatelliteLayerProps {
  region: NasaRegionalCluster;
  syncedData?: HydrometeorologicalData | null;
  language: Language;
}

export const IsroSatelliteLayer: React.FC<IsroSatelliteLayerProps> = ({
  region,
  syncedData,
  language,
}) => {
  const isBn = language === 'bn';
  const [selectedChannel, setSelectedChannel] = useState<IsroGeostationaryChannel>('TIR_THERMAL');
  const [opacity, setOpacity] = useState<number>(85);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanCycleTimestamp, setScanCycleTimestamp] = useState<string>('Live (15m Rapid Scan)');

  // Coordinates for crosshair reticle on Indian geostationary projection
  // Lat: 8 to 37 -> Y percentage (37 top to 8 bottom)
  // Lon: 68 to 98 -> X percentage (68 left to 98 right)
  const normX = Math.min(92, Math.max(8, ((region.lon - 68) / (98 - 68)) * 100));
  const normY = Math.min(92, Math.max(8, 100 - ((region.lat - 8) / (37 - 8)) * 100));

  // Compute channel telemetry based on region & live data
  const isCriticalSurge = region.id === 'brahmaputra-assam';
  const cloudTopTempC = isCriticalSurge ? -64.5 : -42.0; // Convective storm top temperature
  const waterVaporMm = isCriticalSurge ? 58.2 : 44.5;    // Precipitable water vapor mm
  const rainRateMmHr = isCriticalSurge ? 18.4 : (syncedData?.meteorology.precipitationMmDay ? Number((syncedData.meteorology.precipitationMmDay / 6).toFixed(1)) : 1.2);
  const ndviValue = syncedData?.isroRemoteSensing.ndviVegetationIndex ?? region.isroNdviBase;

  const triggerRapidScan = () => {
    audioSynth.playScanSuccess();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanCycleTimestamp(`Acquired ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} IST`);
    }, 1200);
  };

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex flex-col justify-between">
      {/* Geostationary Header Toolbar */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Satellite className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>ISRO INSAT-3DR Geostationary Imager</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                74.0°E Meridian
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-2">
              <span>Altitude: 35,786 km (GEO)</span>
              <span>·</span>
              <span className="text-emerald-400">{scanCycleTimestamp}</span>
            </div>
          </div>
        </div>

        {/* Rapid Scan Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerRapidScan}
            disabled={isScanning}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono flex items-center gap-1.5 border border-slate-700 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3 h-3 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Imager...' : (isBn ? 'ইসরো র‍্যাপিড স্ক্যান' : '15m Rapid Scan')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Channel Selector Bar */}
      <div className="px-3 py-2 bg-slate-900/50 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setSelectedChannel('TIR_THERMAL');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
              selectedChannel === 'TIR_THERMAL'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            TIR Thermal (10.8µm)
          </button>

          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setSelectedChannel('WATER_VAPOR');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
              selectedChannel === 'WATER_VAPOR'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            Water Vapor (6.8µm)
          </button>

          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setSelectedChannel('IMSRA_RAINFALL');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
              selectedChannel === 'IMSRA_RAINFALL'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            IMSRA Rain Rate
          </button>

          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setSelectedChannel('AWIFS_NDVI');
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all cursor-pointer ${
              selectedChannel === 'AWIFS_NDVI'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            AWiFS Agro-NDVI
          </button>
        </div>

        {/* Opacity slider */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Overlay Opacity:</span>
          <input
            type="range"
            min="30"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-16 sm:w-20 accent-emerald-500 cursor-pointer"
          />
          <span className="w-7 text-right text-slate-300">{opacity}%</span>
        </div>
      </div>

      {/* Geostationary Visual Canvas */}
      <div className="relative aspect-16/10 w-full bg-slate-950 overflow-hidden flex items-center justify-center">
        {/* Geostationary Coordinate Grid (Clarke Orbit projection lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 500 320">
          {/* Latitude Arcs */}
          <path d="M 0 60 Q 250 80 500 60" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 0 130 Q 250 160 500 130" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 0 210 Q 250 240 500 210" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 0 290 Q 250 310 500 290" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />

          {/* Longitude Meridians (Curved Geostationary Horizon) */}
          <path d="M 90 0 Q 110 160 90 320" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 190 0 Q 205 160 190 320" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 280 0 Q 285 160 280 320" stroke="#38bdf8" strokeWidth="1.5" fill="none" /> {/* Central Meridian ~78E */}
          <path d="M 370 0 Q 365 160 370 320" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
          <path d="M 460 0 Q 445 160 460 320" stroke="#38bdf8" strokeWidth="1" fill="none" strokeDasharray="3,3" />
        </svg>

        {/* Indian Subcontinent Stylized Landmass Vector */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 320"
          style={{ opacity: opacity / 100 }}
        >
          {/* Subcontinent outline */}
          <path
            d="M 120 40 L 160 30 L 210 25 L 260 40 L 320 60 L 350 75 L 430 80 L 460 120 L 420 140 L 390 145 L 340 160 L 310 200 L 280 260 L 250 295 L 240 290 L 220 250 L 190 200 L 170 170 L 140 140 L 110 110 Z"
            fill="#0f172a"
            stroke="#334155"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Sri Lanka */}
          <ellipse cx="270" cy="305" rx="8" ry="12" fill="#0f172a" stroke="#334155" strokeWidth="1" />

          {/* Major River Basins (Ganga, Brahmaputra, Indus, Godavari) */}
          <path d="M 220 50 Q 280 90 350 120 T 400 135" stroke="#0284c7" strokeWidth="2.5" fill="none" opacity="0.7" />
          <path d="M 360 70 Q 420 80 440 110" stroke="#0284c7" strokeWidth="3" fill="none" opacity="0.7" />
          <path d="M 200 170 Q 260 180 310 200" stroke="#0284c7" strokeWidth="1.8" fill="none" opacity="0.6" />

          {/* CHANNEL-SPECIFIC DATA OVERLAYS */}
          {selectedChannel === 'TIR_THERMAL' && (
            <g>
              {/* Convective storm clusters over Bay of Bengal and NE India */}
              <circle cx="390" cy="115" r="55" fill="#e11d48" opacity="0.55">
                <animate attributeName="r" values="50;58;50" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="390" cy="115" r="32" fill="#9333ea" opacity="0.75" />
              <circle cx="390" cy="115" r="14" fill="#ffffff" opacity="0.9" />

              {/* Arabian Sea cloud band */}
              <ellipse cx="160" cy="180" rx="45" ry="30" fill="#2563eb" opacity="0.5" />
              <ellipse cx="260" cy="80" rx="60" ry="25" fill="#0284c7" opacity="0.4" />
            </g>
          )}

          {selectedChannel === 'WATER_VAPOR' && (
            <g>
              {/* Atmospheric moisture plume across Monsoon Trough */}
              <path
                d="M 120 220 Q 240 180 340 140 T 440 100"
                stroke="#06b6d4"
                strokeWidth="45"
                fill="none"
                opacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M 150 200 Q 250 160 360 120 T 420 90"
                stroke="#38bdf8"
                strokeWidth="20"
                fill="none"
                opacity="0.55"
                strokeLinecap="round"
              />
            </g>
          )}

          {selectedChannel === 'IMSRA_RAINFALL' && (
            <g>
              {/* Heavy precipitation cores in Assam / Bengal / Western Ghats */}
              <circle cx="395" cy="115" r="40" fill="#2563eb" opacity="0.6" />
              <circle cx="395" cy="115" r="22" fill="#06b6d4" opacity="0.8" />
              <circle cx="395" cy="115" r="8" fill="#ec4899" opacity="0.95" />

              {/* Rain bands along Western Ghats */}
              <path d="M 180 180 Q 190 220 210 260" stroke="#0284c7" strokeWidth="18" fill="none" opacity="0.55" strokeLinecap="round" />
            </g>
          )}

          {selectedChannel === 'AWIFS_NDVI' && (
            <g>
              {/* Agricultural Green Belt High NDVI Zones */}
              <ellipse cx="210" cy="65" rx="35" ry="22" fill="#10b981" opacity="0.6" /> {/* Punjab/Haryana */}
              <ellipse cx="360" cy="125" rx="35" ry="25" fill="#10b981" opacity="0.65" /> {/* Bengal/Bihar */}
              <ellipse cx="410" cy="100" rx="30" ry="18" fill="#059669" opacity="0.7" /> {/* Assam Valley */}
              <ellipse cx="270" cy="270" rx="20" ry="30" fill="#10b981" opacity="0.55" /> {/* Cauvery Delta */}
            </g>
          )}
        </svg>

        {/* Dynamic Target Reticle Pinned to Selected Indian Basin */}
        <div
          className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${normX}%`, top: `${normY}%` }}
        >
          <div className="relative flex items-center justify-center">
            {/* Pulsing ring */}
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400/80 animate-ping absolute" />
            <div className="w-5 h-5 rounded-full border border-cyan-300 bg-cyan-500/20 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>

            {/* Target Label Pin */}
            <div className="absolute left-6 top-0 bg-slate-950/90 backdrop-blur-md px-2 py-1 rounded border border-cyan-500/50 text-[10px] font-mono whitespace-nowrap shadow-lg">
              <span className="text-cyan-400 font-bold">{region.state}</span>
              <div className="text-slate-300">{region.lat.toFixed(2)}°N, {region.lon.toFixed(2)}°E</div>
            </div>
          </div>
        </div>

        {/* Real-time Color Legend according to selected channel */}
        <div className="absolute bottom-2.5 left-2.5 z-20 bg-slate-900/90 backdrop-blur-md p-2 rounded-lg border border-slate-800 text-[10px] font-mono space-y-1 max-w-[210px]">
          <div className="text-slate-300 font-bold flex items-center justify-between">
            <span>{selectedChannel.replace('_', ' ')}</span>
            <span className="text-emerald-400">ISRO Calibrated</span>
          </div>

          {selectedChannel === 'TIR_THERMAL' && (
            <div>
              <div className="h-2 w-full rounded bg-gradient-to-r from-purple-700 via-rose-500 to-amber-300" />
              <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                <span>-80°C (Deep Storm)</span>
                <span>0°C</span>
                <span>+35°C</span>
              </div>
            </div>
          )}

          {selectedChannel === 'WATER_VAPOR' && (
            <div>
              <div className="h-2 w-full rounded bg-gradient-to-r from-slate-800 via-cyan-600 to-cyan-300" />
              <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                <span>Dry (&lt;20mm)</span>
                <span>Moist (60mm)</span>
              </div>
            </div>
          )}

          {selectedChannel === 'IMSRA_RAINFALL' && (
            <div>
              <div className="h-2 w-full rounded bg-gradient-to-r from-blue-900 via-cyan-400 to-pink-500" />
              <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                <span>0.5 mm/h</span>
                <span>20 mm/h</span>
                <span>50+ mm/h</span>
              </div>
            </div>
          )}

          {selectedChannel === 'AWIFS_NDVI' && (
            <div>
              <div className="h-2 w-full rounded bg-gradient-to-r from-amber-700 via-yellow-400 to-emerald-500" />
              <div className="flex justify-between text-[9px] text-slate-400 mt-0.5">
                <span>0.2 (Fallow)</span>
                <span>0.5</span>
                <span>0.85 (Canopy)</span>
              </div>
            </div>
          )}
        </div>

        {/* Orbit & Telemetry Badge */}
        <div className="absolute top-2.5 right-2.5 z-20 bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded border border-slate-800 text-[10px] font-mono text-slate-300">
          SSP: 74.0°E, 0.0°N · Imager S/N: ISRO-INSAT-3DR-IMG-04
        </div>
      </div>

      {/* Geostationary Spectral Telemetry Footer Metrics */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
        <div className="p-2 rounded bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Thermometer className="w-3 h-3 text-rose-400" />
            <span>Cloud Top Temp (TIR)</span>
          </div>
          <div className="text-sm font-bold text-rose-300 mt-0.5">
            {cloudTopTempC}°C
          </div>
          <div className="text-[9px] text-slate-500">
            {cloudTopTempC < -60 ? 'Deep Convective Top' : 'Medium Cirrus / Stratum'}
          </div>
        </div>

        <div className="p-2 rounded bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Wind className="w-3 h-3 text-cyan-400" />
            <span>Water Vapor Column</span>
          </div>
          <div className="text-sm font-bold text-cyan-300 mt-0.5">
            {waterVaporMm} mm
          </div>
          <div className="text-[9px] text-slate-500">Precipitable water mass</div>
        </div>

        <div className="p-2 rounded bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <CloudRain className="w-3 h-3 text-blue-400" />
            <span>IMSRA Rain Rate</span>
          </div>
          <div className="text-sm font-bold text-blue-300 mt-0.5">
            {rainRateMmHr} mm/hr
          </div>
          <div className="text-[9px] text-slate-500">Hydro-Estimator rate</div>
        </div>

        <div className="p-2 rounded bg-slate-950 border border-slate-800">
          <div className="text-[10px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AWiFS NDVI Vigour</span>
          </div>
          <div className="text-sm font-bold text-emerald-300 mt-0.5">
            {ndviValue}
          </div>
          <div className="text-[9px] text-slate-500">High Biomass Canopy</div>
        </div>
      </div>
    </div>
  );
};
