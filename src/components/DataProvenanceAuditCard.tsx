import React, { useState } from 'react';
import { Language } from '../types';
import {
  dataProvenance,
  ProvenanceStatus,
  ExplainableRecommendation,
  ProvenanceAuditReport,
} from '../services/dataProvenance';
import { audioSynth } from '../services/audioSynth';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Layers,
  Activity,
  FileCheck,
} from 'lucide-react';

interface DataProvenanceAuditCardProps {
  language: Language;
  waterLevel?: number;
  dangerLevel?: number;
  precipitationMm?: number;
  relativeHumidity?: number;
  dischargeM3s?: number;
  isFloodSurge?: boolean;
  isLiveNasa?: boolean;
}

export const DataProvenanceAuditCard: React.FC<DataProvenanceAuditCardProps> = ({
  language,
  waterLevel = 51.33,
  dangerLevel = 49.68,
  precipitationMm = 10.2,
  relativeHumidity = 86,
  dischargeM3s = 54800,
  isFloodSurge = true,
  isLiveNasa = true,
}) => {
  const isBn = language === 'bn';
  const [activeTab, setActiveTab] = useState<'provenance' | 'recommendations' | 'pipeline'>('provenance');
  const [expandedRecId, setExpandedRecId] = useState<string | null>('rec-flood-harvest');

  const auditReport: ProvenanceAuditReport = dataProvenance.getAuditReport(isLiveNasa);
  const recommendations: ExplainableRecommendation[] = dataProvenance.generateRecommendations(
    waterLevel,
    dangerLevel,
    precipitationMm,
    relativeHumidity,
    dischargeM3s,
    isFloodSurge,
    2050, // Local APMC
    2900, // Terminal Azadpur
    isLiveNasa
  );

  const getStatusBadge = (status: ProvenanceStatus) => {
    switch (status) {
      case 'LIVE':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </span>
        );
      case 'FALLBACK':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            FALLBACK
          </span>
        );
      case 'DEMO':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            DEMO DATASET
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Header Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{isBn ? 'ডেটা প্রোভেন্যান্স ও ভ্যালিডেশন লেয়ার' : 'Data Provenance & Verification Layer'}</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Arnab Architecture
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Observe ➔ Verify ➔ Analyze ➔ Recommend ➔ Explain
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setActiveTab('provenance');
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'provenance'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? 'ডেটা রেকর্ড ও সোর্স' : 'Ingested Records (Evidence)'}
          </button>
          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setActiveTab('recommendations');
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'recommendations'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? 'ব্যাখ্যামূলক সিদ্ধান্ত' : 'Explainable Decisions (3)'}
          </button>
          <button
            onClick={() => {
              audioSynth.playSolenoidClick();
              setActiveTab('pipeline');
            }}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
              activeTab === 'pipeline'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isBn ? 'ভ্যালিডেশন পাইপলাইন' : 'Validation Pipeline'}
          </button>
        </div>
      </div>

      {/* TAB 1: Ingested Records (Evidence) */}
      {activeTab === 'provenance' && (
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{auditReport.totalRecordsIngested} Variables Tracked</span>
              <span>·</span>
              <span className="text-emerald-400">{auditReport.liveFeedCount} Live</span>
              <span>·</span>
              <span className="text-cyan-400">{auditReport.demoDatasetCount} Demo Benchmarks</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Rule: Fallback is strictly labeled; never masked as live.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {auditReport.auditedSources.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2 hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {item.domain}
                    </span>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">{item.parameterName}</div>
                  <div className="text-lg font-mono font-bold text-emerald-400 mt-1">
                    {item.currentValue} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-[10px] font-mono space-y-1 text-slate-400">
                  <div className="text-slate-300 truncate">
                    <span className="text-slate-500">Source:</span> {item.source}
                  </div>
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Origin:</span> {item.endpointOrOrigin}
                  </div>
                  <div className="text-emerald-500/80 flex items-center gap-1 truncate">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{item.validationCheck}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Explainable Decisions (Not just "Do X", but What, Why, Based on Data, Confidence, Alternative) */}
      {activeTab === 'recommendations' && (
        <div className="p-4 space-y-3">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 pb-1">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Decision Engine output standard: <span className="text-slate-200">What ➔ Why ➔ Ingested Data Evidence ➔ Confidence ➔ Alternative Action</span>
            </span>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec) => {
              const isExpanded = expandedRecId === rec.id;
              return (
                <div
                  key={rec.id}
                  className="rounded-xl bg-slate-950/90 border border-slate-800 overflow-hidden transition-all"
                >
                  {/* Summary Bar */}
                  <div
                    onClick={() => {
                      audioSynth.playSolenoidClick();
                      setExpandedRecId(isExpanded ? null : rec.id);
                    }}
                    className="p-3.5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                          rec.urgency === 'IMMEDIATE'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : rec.urgency === 'WATCH_24H'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {rec.urgency}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{isBn ? rec.whatBn : rec.what}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{isBn ? rec.whyBn : rec.why}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px]">Confidence:</span>
                        <div className="text-emerald-400 font-bold">{rec.confidencePct}%</div>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Proof & Evidence Details */}
                  {isExpanded && (
                    <div className="p-4 bg-slate-900/50 border-t border-slate-800/80 space-y-3.5 text-xs font-sans">
                      {/* Why Details */}
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-1">
                          Why this decision was generated (Causal Reasoning):
                        </div>
                        <p className="text-slate-200 leading-relaxed bg-slate-950/80 p-2.5 rounded-lg border border-slate-800">
                          {isBn ? rec.whyBn : rec.why}
                        </p>
                      </div>

                      {/* Ingested Evidence Table */}
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase text-slate-400 mb-1.5 flex items-center justify-between">
                          <span>Empirical Data Evidence Points:</span>
                          <span className="text-emerald-400 text-[10px]">Cross-Validated Multi-Source</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono">
                          {rec.basedOnData.map((d, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-[10px]">{d.parameter}</span>
                                {getStatusBadge(d.status)}
                              </div>
                              <div className="text-sm font-bold text-white">{d.value}</div>
                              <div className="text-[9px] text-slate-400 truncate">{d.source}</div>
                              <div className="text-[9px] text-cyan-400/80 truncate">{d.retrievedAt}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Alternative Action */}
                      <div className="p-2.5 rounded-lg bg-slate-950/80 border border-amber-900/30 text-amber-200/90 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-amber-300 font-mono uppercase text-[10px]">Contingency / Alternative Action: </span>
                          <span>{isBn ? rec.alternativeActionBn : rec.alternativeAction}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Validation Pipeline Workflow */}
      {activeTab === 'pipeline' && (
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Step 1</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-cyan-400" />
                Raw Ingestion
              </div>
              <p className="text-[11px] text-slate-400">
                NASA POWER AG API, ISRO INSAT-3DR, CWC Gauges, Agmarknet
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Step 2</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                Schema & Range
              </div>
              <p className="text-[11px] text-slate-400">
                HTTP status check, JSON schema parsing, non-null check
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Step 3</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                Normalization
              </div>
              <p className="text-[11px] text-slate-400">
                Kelvin to Celsius, CWC Rating curve catchment scaling
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Step 4</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Provenance Tag
              </div>
              <p className="text-[11px] text-slate-400">
                Tagged as LIVE, FALLBACK, or DEMO. Never spoofed.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="text-slate-400 text-[10px] font-bold uppercase">Step 5</div>
              <div className="text-white font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Explainable Rec
              </div>
              <p className="text-[11px] text-slate-400">
                Decision engine outputs What, Why, Evidence, & Alternative
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <span className="text-emerald-400 font-bold">Arnab Integrity Rule:</span>
            <p className="text-slate-400 text-[11px]">
              If NASA POWER API times out (&gt;6.5s) or returns an error, the engine automatically routes to the seasonal NASA MERRA-2 baseline and tags status = "FALLBACK". Under no circumstances is fallback data disguised as live data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
