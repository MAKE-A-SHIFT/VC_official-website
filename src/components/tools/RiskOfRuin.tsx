"use client";
import { useState, useEffect } from "react";
import { Skull } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function RiskOfRuin() {
  const { language, trades, activeAccount } = useAppStore();
  const t = translations[language].terminal;

  const [winRate, setWinRate] = useState<number>(40);
  const [rr, setRr] = useState<number>(1.5);
  
  // Synchronisation avec le journal
  useEffect(() => {
    if (activeAccount !== 'ALL') {
      const accountTrades = trades.filter(t => t.account === activeAccount);
      if (accountTrades.length > 0) {
        const wins = accountTrades.filter(t => t.pnl > 0);
        const losses = accountTrades.filter(t => t.pnl < 0);
        
        const currentWinRate = (wins.length / accountTrades.length) * 100;
        setWinRate(Number(currentWinRate.toFixed(1)));
        
        if (wins.length > 0 && losses.length > 0) {
          const avgWin = wins.reduce((acc, tr) => acc + tr.pnl, 0) / wins.length;
          const avgLoss = Math.abs(losses.reduce((acc, tr) => acc + tr.pnl, 0) / losses.length);
          const currentRR = avgWin / (avgLoss || 1);
          setRr(Number(currentRR.toFixed(2)));
        }
      }
    }
  }, [activeAccount, trades]);

  const expectancy = (winRate / 100) * rr - ((100 - winRate) / 100) * 1;
  const isRetailTrap = expectancy <= 0;

  return (
    <div className={`glass-panel p-6 rounded-2xl w-full border transition-colors duration-500 relative overflow-hidden ${isRetailTrap ? 'border-red-900/50' : 'border-white/5'}`}>
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isRetailTrap ? 'from-red-600 to-red-900' : 'from-green-600 to-white/20'}`}></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Skull className={`w-5 h-5 ${isRetailTrap ? 'text-red-500' : 'text-zinc-500'}`} />
          <h3 className="text-xl font-bold tracking-tight">{t.riskTitle}</h3>
        </div>
        {activeAccount !== 'ALL' && (
          <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/30 uppercase font-bold">
            Sync: {activeAccount.replace('_', ' ')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.winRate}</label>
          <input type="number" value={winRate} onChange={e => setWinRate(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-green-500/50" />
        </div>
        <div>
          <label className="block text-xs text-white/50 mb-1 uppercase tracking-wider">{t.rrAvg}</label>
          <input type="number" step="0.1" value={rr} onChange={e => setRr(Number(e.target.value))} className="w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-green-500/50" />
        </div>
      </div>

      <div className={`p-4 rounded-xl border flex flex-col gap-2 ${isRetailTrap ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium uppercase tracking-wider">{t.exp}</span>
          <span className={`text-xl font-bold ${isRetailTrap ? 'text-red-400' : 'text-green-400'}`}>
            {expectancy.toFixed(3)} R
          </span>
        </div>
        <p className="text-xs text-white/60">
          {isRetailTrap ? t.riskWarn : t.riskSafe}
        </p>
      </div>
    </div>
  );
}
