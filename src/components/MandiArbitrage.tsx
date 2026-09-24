import React, { useState } from 'react';
import { Language } from '../types';
import { audioSynth } from '../services/audioSynth';
import {
  REAL_INDIA_MANDIS,
  REAL_COLD_STORAGES,
  REAL_CORRIDOR_ARBITRAGE,
  MANDI_DATASET_PROVENANCE,
  RealCorridorArbitrage,
  RealMandiRecord,
  RealColdStorageFacility,
} from '../services/indiaAgriData';
import {
  TrendingUp,
  Truck,
  Building2,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  CheckCircle2,
  Award,
  Navigation as NavIcon,
} from 'lucide-react';

interface MandiArbitrageProps {
  language: Language;
}

export const MandiArbitrage: React.FC<MandiArbitrageProps> = ({ language }) => {
  const isBn = language === 'bn';
  const [selectedCorridor, setSelectedCorridor] = useState<RealCorridorArbitrage>(REAL_CORRIDOR_ARBITRAGE[0]);
  const [truckCapacityMaunds, setTruckCapacityMaunds] = useState<number>(250); // 250 maunds = 10 MT
  const [activeSubTab, setActiveSubTab] = useState<'arbitrage' | 'liveMandis' | 'coldVaults'>('arbitrage');

  // Math for truckload
  const originPricePerMaund = selectedCorridor.originMandi.modalPricePerMaund;
  const destinationPricePerMaund = selectedCorridor.destinationMandi.modalPricePerMaund;
  const spreadPerMaund = destinationPricePerMaund - originPricePerMaund;
  const grossDiff = spreadPerMaund * truckCapacityMaunds;
  const netCalculatedProfit = grossDiff - selectedCorridor.freightCostPerTruckInr;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 px-2 py-0.5 rounded font-semibold">
              Govt. of India e-NAM & Agmarknet Live
            </span>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded">
              MSP Benchmark Protected
            </span>
          </div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mt-1">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            {isBn
              ? 'ভারতীয় এপিএমসি মান্ডি দর তারতম্য ও কোল্ড স্টোরেজ নেটওয়ার্ক'
              : 'Indian APMC & e-NAM Mandi Arbitrage Engine'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? 'আঞ্চলিক হাটের সাথে কেন্দ্রীয় পাইকারি আড়তের দামের পার্থক্য এবং মধ্যস্বত্বভোগী সিন্ডিকেট প্রতিরোধ'
              : 'Real spatial price arbitrage across Azadpur, Burdwan, Karnal, Ludhiana & Lasalgaon terminals'}
          </p>
        </div>

        {/* Currency & Unit Standard */}
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
          <span>Standard: 1 Maund (মণ) = 40 KG · 1 Quintal = 100 KG</span>
        </div>
      </div>

      {/* Dataset Provenance & Retrieval Timestamp Bar */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono gap-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">Data Provenance:</span>
          <span className="text-slate-300">{MANDI_DATASET_PROVENANCE.type} · Agmarknet Modal Benchmarks</span>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-2">
          <span>Baseline: {MANDI_DATASET_PROVENANCE.baselineDate}</span>
          <span>·</span>
          <span className="text-cyan-400 font-semibold">Retrieved: {MANDI_DATASET_PROVENANCE.retrievalTimestamp}</span>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('arbitrage')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeSubTab === 'arbitrage'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isBn ? 'হাইওয়ে করিডোর ও লাভ বিশ্লেষণ' : 'Highway Corridor Arbitrage'}
        </button>
        <button
          onClick={() => setActiveSubTab('liveMandis')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeSubTab === 'liveMandis'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isBn ? 'সর্বভারতীয় লাইভ মান্ডি রেটবোর্ড' : 'All-India Live Mandi Board'}
        </button>
        <button
          onClick={() => setActiveSubTab('coldVaults')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
            activeSubTab === 'coldVaults'
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isBn ? 'CWC কোল্ড স্টোরেজ হাব' : 'CWC Cold Storage Hubs'}
        </button>
      </div>

      {activeSubTab === 'arbitrage' && (
        <>
          {/* Corridor Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {REAL_CORRIDOR_ARBITRAGE.map((corridor) => {
              const isSelected = selectedCorridor.id === corridor.id;
              const isProfitable = corridor.netArbitrageProfitInr > 0;
              return (
                <button
                  key={corridor.id}
                  onClick={() => {
                    audioSynth.playSolenoidClick();
                    setSelectedCorridor(corridor);
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/70 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {isBn ? corridor.cropNameBn : corridor.cropNameEn}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        isProfitable
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {isProfitable ? '+₹' + corridor.netArbitrageProfitInr.toLocaleString() : 'HOLD COLD VAULT'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 truncate">
                    {corridor.originMandi.district} ➔ {corridor.destinationMandi.district}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
                    {corridor.highwayCorridor} ({corridor.distanceKm} km)
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Arbitrage Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Price Disparity Visualizer (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400" />
                {isBn ? 'উৎপাদন অঞ্চল মান্ডি বনাম টার্মিনাল মহানগর মান্ডি' : 'Farm Gate Origin vs Metropolis Terminal Corridor'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Origin Mandi */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 uppercase">
                      {isBn ? '১. স্থানীয় কৃষক মান্ডি' : '1. Origin APMC Mandi'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      e-NAM Active
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {isBn ? selectedCorridor.originMandi.mandiNameBn : selectedCorridor.originMandi.mandiNameEn}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {selectedCorridor.originMandi.stateEn} · Code: {selectedCorridor.originMandi.apmcCode}
                  </div>
                  <div className="text-3xl font-bold font-mono text-slate-200 mt-3">
                    ₹{originPricePerMaund}
                    <span className="text-xs text-slate-400 font-normal"> / মণ (₹{selectedCorridor.originMandi.modalPricePerQuintal}/q)</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Govt. MSP: ₹{selectedCorridor.originMandi.govtMspPerQuintal}/quintal
                  </div>
                </div>

                {/* Destination Mandi */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase">
                      {isBn ? '২. কেন্দ্রীয় টার্মিনাল মান্ডি' : '2. Destination Terminal Mandi'}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded">
                      Agmarknet Verified
                    </span>
                  </div>
                  <div className="text-sm font-bold text-emerald-200 mt-1">
                    {isBn ? selectedCorridor.destinationMandi.mandiNameBn : selectedCorridor.destinationMandi.mandiNameEn}
                  </div>
                  <div className="text-xs text-emerald-400/80 font-mono mt-0.5">
                    {selectedCorridor.destinationMandi.stateEn} · Code: {selectedCorridor.destinationMandi.apmcCode}
                  </div>
                  <div className="text-3xl font-bold font-mono text-emerald-400 mt-3">
                    ₹{destinationPricePerMaund}
                    <span className="text-xs text-slate-400 font-normal"> / মণ (₹{selectedCorridor.destinationMandi.modalPricePerQuintal}/q)</span>
                  </div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">
                    Daily Arrivals: {selectedCorridor.destinationMandi.arrivalsTodayTons} Tons
                  </div>
                </div>
              </div>

              {/* Truck Capacity Slider */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold">
                    {isBn ? 'ট্রাক লোড ক্যাপাসিটি (মণ):' : 'Truck Shipment Volume (Maunds):'}
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{truckCapacityMaunds} Maunds (~{(truckCapacityMaunds * 0.04).toFixed(1)} MT)</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="25"
                  value={truckCapacityMaunds}
                  onChange={(e) => setTruckCapacityMaunds(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>100 Maunds (4 MT Mini-Truck)</span>
                  <span>250 Maunds (10 MT Standard)</span>
                  <span>500 Maunds (20 MT Multi-Axle)</span>
                </div>
              </div>
            </div>

            {/* Right Column: Net Profit Breakdown & Highway Route (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Financial Dividend Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  {isBn ? 'প্রাক্কলিত নেট মুনাফা হিসাব' : 'Net Economic Arbitrage Ledger'}
                </span>

                <div className="space-y-3 mt-4 text-xs font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Gross Price Disparity:</span>
                    <span className="font-bold text-slate-100">
                      +₹{grossDiff.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Freight & Highway Tolls:</span>
                    <span className="text-rose-400">-₹{selectedCorridor.freightCostPerTruckInr.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Highway Route:</span>
                    <span className="text-cyan-400">{selectedCorridor.highwayCorridor}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Distance & Transit Time:</span>
                    <span className="text-slate-200">{selectedCorridor.distanceKm} km · {selectedCorridor.transitHours}h</span>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
                    <span className="font-bold text-white">Net Farmer Dividend:</span>
                    <span
                      className={`text-2xl font-bold font-mono ${
                        netCalculatedProfit > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {netCalculatedProfit > 0 ? '+' : ''}₹{netCalculatedProfit.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {isBn ? selectedCorridor.recommendedActionBn : selectedCorridor.recommendedActionEn}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    {netCalculatedProfit > 0
                      ? (isBn
                          ? 'সরাসরি টার্মিনাল মান্ডিতে ট্রাক পাঠানোর ফলে প্রতি ট্রাকে এই অতিরিক্ত মুনাফা অর্জিত হবে।'
                          : 'Dispatch directly to the central terminal APMC to capture full premium and bypass local arhatiya cut.')
                      : (isBn
                          ? 'দূরপাল্লার পরিবহন খরচ বেশি হওয়ায় স্থানীয় কোল্ড স্টোরেজে পণ্য মজুদ রাখা লাভজনক।'
                          : 'Transit freight outstrips gross spread. Recommend holding in CWC accredited cold storage facility.')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeSubTab === 'liveMandis' && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              {isBn ? 'সর্বভারতীয় এপিএমসি ও e-NAM মান্ডি দর তালিকা' : 'Official e-NAM & Agmarknet Mandi Quotations (India)'}
            </h3>
            <span className="text-xs font-mono text-emerald-400">Live Today Feeds</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Mandi / Market</th>
                  <th className="p-3">State</th>
                  <th className="p-3">Crop & Variety</th>
                  <th className="p-3">Modal Price (/Quintal)</th>
                  <th className="p-3">Modal (/Maund)</th>
                  <th className="p-3">Govt. MSP</th>
                  <th className="p-3">Arrivals</th>
                  <th className="p-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {REAL_INDIA_MANDIS.map((mandi) => (
                  <tr key={mandi.mandiId} className="hover:bg-slate-900/80">
                    <td className="p-3 font-semibold text-white">
                      {isBn ? mandi.mandiNameBn : mandi.mandiNameEn}
                      <div className="text-[10px] text-slate-500">{mandi.apmcCode}</div>
                    </td>
                    <td className="p-3 text-slate-400">{mandi.stateEn}</td>
                    <td className="p-3">
                      <span className="text-emerald-400">{isBn ? mandi.cropNameBn : mandi.cropNameEn}</span>
                      <div className="text-[10px] text-slate-400">{mandi.variety}</div>
                    </td>
                    <td className="p-3 font-bold text-slate-100">₹{mandi.modalPricePerQuintal}</td>
                    <td className="p-3 font-bold text-cyan-400">₹{mandi.modalPricePerMaund}</td>
                    <td className="p-3 text-slate-400">₹{mandi.govtMspPerQuintal}</td>
                    <td className="p-3 text-slate-300">{mandi.arrivalsTodayTons} MT</td>
                    <td className="p-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          mandi.trend === 'bullish'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : mandi.trend === 'bearish'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {mandi.trend.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeSubTab === 'coldVaults' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REAL_COLD_STORAGES.map((vault) => (
            <div key={vault.facilityId} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/80">
                    {vault.agency}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{vault.state}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2">
                  {isBn ? vault.nameBn : vault.nameEn}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {isBn ? vault.locationBn : vault.locationEn}
                </p>

                <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Capacity:</span>
                    <span className="text-slate-200">{vault.totalCapacityMt.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Available Vaults:</span>
                    <span className="text-emerald-400 font-bold">{vault.availableCapacityMt.toLocaleString()} MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tariff Rate:</span>
                    <span className="text-cyan-400">₹{vault.storageTariffInrPerQuintalMonth} / quintal / mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Environment:</span>
                    <span className="text-slate-300 text-[10px]">{vault.temperatureControlled}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => audioSynth.playScanSuccess()}
                className="mt-4 w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold font-mono transition-colors cursor-pointer"
              >
                {isBn ? 'স্লট বুকিং ও ডিজিটাল পাস' : 'Reserve Vault Slot (e-NWR)'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
