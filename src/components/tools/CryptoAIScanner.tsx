"use client";
import React, { useState, useEffect } from "react";
import { BrainCircuit, Activity, AlertTriangle, TrendingUp, TrendingDown, Cpu, ChevronDown, ChevronUp } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

interface CryptoProject {
  id: string;
  name: string;
  ticker: string;
  category: string;
  revenue30d: string;
  aiRiskScore: "A+" | "A" | "B" | "C" | "D";
  aiValuation: "UNDERVALUED" | "FAIR_VALUE" | "OVERVALUED";
  competitors: string[];
  aiAnalysis: string;
  status: "Analyzing..." | "Completed" | "Fallback";
}

export function CryptoAIScanner() {
  const { language } = useAppStore();
  const t = (translations as any)[language];

  const [isScanning, setIsScanning] = useState(true);
  const [projects, setProjects] = useState<CryptoProject[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScannerData() {
      try {
        setIsScanning(true);
        const res = await fetch(`/api/scanner?lang=${language}`);
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
          setIsScanning(false);
          return;
        }

        setProjects(data.projects || []);
      } catch (err) {
        setError("Network Error");
      } finally {
        setIsScanning(false);
      }
    }

    fetchScannerData();
  }, [language]);

  const getRiskColor = (score: string) => {
    if (!score) return "text-zinc-500";
    if (score.includes("A")) return "text-green-500 bg-green-500/10 border-green-500/20";
    if (score.includes("B")) return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    if (score.includes("C")) return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  const getValuationColor = (val: string) => {
    if (val === "UNDERVALUED") return "text-green-400";
    if (val === "OVERVALUED") return "text-red-400";
    return "text-zinc-400";
  };

  const getValuationText = (val: string) => {
    if (val === "UNDERVALUED") return t.scanUnder;
    if (val === "OVERVALUED") return t.scanOver;
    return t.scanFair;
  };

  if (error) {
    return (
      <div id="tour-crypto-scanner" className="glass-panel p-6 rounded-2xl w-full border border-red-500/30 bg-red-500/5 text-center xl:col-span-12">
        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">{t.scanErr}</h3>
        <p className="text-zinc-400 text-sm mb-4">{error}</p>
        <p className="text-xs text-zinc-500">
          {t.scanFall}
        </p>
      </div>
    );
  }

  return (
    <div id="tour-crypto-scanner" className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden xl:col-span-12">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 relative z-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BrainCircuit className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold tracking-tight text-white">{t.scanTitle}</h3>
          </div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">{t.scanDesc}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/10 rounded-lg">
            <Cpu className={`w-4 h-4 ${isScanning ? "text-blue-500 animate-pulse" : "text-green-500"}`} />
            <span className="text-xs font-bold text-white/70">
              {isScanning ? t.scanActive : t.scanDone}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <th className="pb-4 font-semibold pl-4">{t.scanProj}</th>
              <th className="pb-4 font-semibold">{t.scanRev}</th>
              <th className="pb-4 font-semibold">{t.scanRisk}</th>
              <th className="pb-4 font-semibold">{t.scanVal}</th>
              <th className="pb-4 font-semibold text-right pr-4">{t.scanAnal}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {projects.map((p) => (
              <React.Fragment key={p.id}>
                <tr 
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer ${isScanning ? 'opacity-50 animate-pulse' : 'opacity-100'}`}
                >
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                        {p.ticker[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          {p.name}
                          <span className="text-[10px] text-white/30 font-normal px-2 py-0.5 bg-white/5 rounded-full border border-white/5">{p.category}</span>
                        </div>
                        <div className="text-xs text-zinc-500">{p.ticker}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="font-mono text-white font-bold">{p.revenue30d}</span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md border text-xs font-bold ${getRiskColor(p.aiRiskScore)}`}>
                      {t.scanGrade} {p.aiRiskScore}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {p.aiValuation === "UNDERVALUED" && <TrendingUp className="w-3 h-3 text-green-400" />}
                      {p.aiValuation === "OVERVALUED" && <TrendingDown className="w-3 h-3 text-red-400" />}
                      {p.aiValuation === "FAIR_VALUE" && <Activity className="w-3 h-3 text-zinc-400" />}
                      <span className={`font-bold text-xs ${getValuationColor(p.aiValuation)}`}>
                        {getValuationText(p.aiValuation)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white">
                      {expandedId === p.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
                {/* Ligne d'expansion pour le rapport IA */}
                {expandedId === p.id && (
                  <tr>
                    <td colSpan={5} className="bg-black/40 p-0 border-b border-white/5">
                      <div className="p-6 border-l-2 border-blue-500/50 m-4 bg-[#0a0f1a] rounded-r-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl pointer-events-none"></div>
                        <div className="flex items-start gap-4 relative z-10">
                          <div className="mt-1">
                            <BrainCircuit className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                              {t.scanRep} <span className="text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{t.scanGen}</span>
                            </h4>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                              {p.aiAnalysis}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{t.scanComp}</span>
                              <div className="flex gap-2">
                                {p.competitors.map((comp, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/70">
                                    {comp}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
