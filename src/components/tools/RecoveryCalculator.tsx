"use client";
import { useState, useEffect, useMemo } from "react";
import { TrendingDown } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function RecoveryCalculator() {
  const { language, trades, activeAccount } = useAppStore();
  const t = translations[language].terminal;
  
  // Default to 20%
  const [dd, setDd] = useState<number>(20);

  // Auto-ajustement si le compte sélectionné est en drawdown
  useEffect(() => {
    if (activeAccount !== 'ALL') {
      const accountTrades = trades.filter(t => t.account === activeAccount);
      let cumulative = 0;
      let peak = 0;
      let maxDD = 0;
      
      accountTrades.forEach(trade => {
        cumulative += trade.pnl;
        if (cumulative > peak) peak = cumulative;
        const currentDD = peak - cumulative;
        if (currentDD > maxDD) maxDD = currentDD;
      });
      
      // On assume un compte standard de 100k$ pour convertir le DD$ en DD%
      const estimatedDDPct = (maxDD / 100000) * 100;
      
      // Si le DD actuel est > 0 (c-a-d on est sous le peak)
      const currentDD = peak - cumulative;
      if (currentDD > 0) {
        setDd(Number(((currentDD / 100000) * 100).toFixed(1)));
      }
    }
  }, [activeAccount, trades]);

  const recovery = dd >= 100 ? 0 : (1 / (1 - dd / 100)) - 1;
  const recoveryPct = recovery * 100;

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 to-white/20"></div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingDown className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold tracking-tight">{t.recTitle}</h3>
        </div>
        {activeAccount !== 'ALL' && (
          <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30 uppercase font-bold">
            Sync: {activeAccount.replace('_', ' ')}
          </span>
        )}
      </div>
      
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <label className="text-xs text-white/50 uppercase tracking-wider">{t.recDD}</label>
          <span className="text-red-400 font-mono font-bold">-{dd}%</span>
        </div>
        <input 
          type="range" min="0.1" max="99" step="0.1" value={dd} 
          onChange={e => setDd(Number(e.target.value))}
          className="w-full accent-red-500 cursor-pointer"
        />
      </div>

      <div className="bg-black/30 p-6 rounded-xl border border-white/5 text-center relative overflow-hidden">
        <span className="block text-xs text-white/50 uppercase tracking-widest mb-2">{t.recReq}</span>
        <span className="text-4xl font-bold text-white">+{recoveryPct.toFixed(1)}%</span>
        <span className="block text-[10px] text-white/30 mt-2 uppercase">{t.recReqSub}</span>
      </div>
    </div>
  );
}
