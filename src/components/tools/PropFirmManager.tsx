"use client";
import { useState } from "react";
import { ShieldAlert } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function PropFirmManager() {
  const { language } = useAppStore();
  const t = translations[language].terminal;

  const [capital, setCapital] = useState(100000);
  const [maxDdPct, setMaxDdPct] = useState(5);
  const [currentLoss, setCurrentLoss] = useState(1500);
  const [riskPerTrade, setRiskPerTrade] = useState(500);

  const maxLossAmount = capital * (maxDdPct / 100);
  const remaining = maxLossAmount - currentLoss;
  const tradesLeft = Math.floor(remaining / riskPerTrade);
  const dangerPct = Math.min((currentLoss / maxLossAmount) * 100, 100);

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-700 to-white/20"></div>
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="w-5 h-5 text-zinc-400" />
        <h3 className="text-lg font-bold tracking-tight">{t.propTitle}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-[10px] text-white/50 uppercase mb-1">{t.propCap}</label>
          <input type="number" value={capital} onChange={e => setCapital(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none text-sm focus:border-white/30" />
        </div>
        <div>
          <label className="block text-[10px] text-white/50 uppercase mb-1">{t.propMaxDD}</label>
          <input type="number" value={maxDdPct} onChange={e => setMaxDdPct(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none text-sm focus:border-white/30" />
        </div>
        <div>
          <label className="block text-[10px] text-white/50 uppercase mb-1">{t.propCurLoss}</label>
          <input type="number" value={currentLoss} onChange={e => setCurrentLoss(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none text-sm focus:border-white/30" />
        </div>
        <div>
          <label className="block text-[10px] text-white/50 uppercase mb-1">{t.propSafe}</label>
          <input type="number" value={riskPerTrade} onChange={e => setRiskPerTrade(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none text-sm focus:border-white/30" />
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-white/50">{t.propRem}</span>
          <span className="font-mono font-bold">${remaining > 0 ? remaining : 0}</span>
        </div>
        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
          <div className={`h-full transition-all ${dangerPct > 80 ? 'bg-red-500' : 'bg-white'}`} style={{ width: `${dangerPct}%` }}></div>
        </div>
      </div>

      <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center mt-2">
        <span className="text-xs uppercase text-white/50 tracking-wider">{t.propTradesLeft}</span>
        <span className={`text-xl font-bold ${tradesLeft <= 2 ? 'text-red-400' : 'text-white'}`}>{remaining > 0 ? tradesLeft : 0}</span>
      </div>
    </div>
  );
}
