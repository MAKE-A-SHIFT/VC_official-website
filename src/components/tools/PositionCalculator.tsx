"use client";
import { useState } from "react";
import { Calculator } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function PositionCalculator() {
  const { language } = useAppStore();
  const t = translations[language].terminal;

  const [capital, setCapital] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1);
  const [stopLoss, setStopLoss] = useState<number>(20);
  const [pointValue, setPointValue] = useState<number>(1);

  const riskAmount = capital * (riskPercent / 100);
  const positionSize = stopLoss > 0 && pointValue > 0 ? riskAmount / (stopLoss * pointValue) : 0;

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-800 to-white/20"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-5 h-5 text-zinc-300" />
        <h3 className="text-xl font-bold tracking-tight">{t.posCalcTitle}</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.cap}</label>
          <input type="number" value={capital} onChange={e => setCapital(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.riskPct}</label>
          <input type="number" value={riskPercent} onChange={e => setRiskPercent(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.sl}</label>
          <input type="number" value={stopLoss} onChange={e => setStopLoss(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.ptVal}</label>
          <input type="number" value={pointValue} onChange={e => setPointValue(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-white/30 transition-all" />
        </div>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
        <div>
          <span className="block text-xs text-white/40 uppercase tracking-wider">{t.lot}</span>
          <span className="text-3xl font-bold">{positionSize.toFixed(2)}</span>
        </div>
        <div className="text-right">
          <span className="block text-xs text-white/40 uppercase tracking-wider">{t.riskAmt}</span>
          <span className="text-xl font-medium text-red-400">-{riskAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
