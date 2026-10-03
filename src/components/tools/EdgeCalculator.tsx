"use client";
import { useState, useEffect } from "react";
import { Sigma, Plus, Trash2 } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

type EdgeTrade = { id: number | string; result: "win" | "loss"; rr: number; isImported?: boolean };

export function EdgeCalculator() {
  const { language, trades: globalTrades, activeAccount } = useAppStore();
  const t = translations[language].terminal;

  const [trades, setTrades] = useState<EdgeTrade[]>([]);
  const [nextRR, setNextRR] = useState<number>(2);
  const [nextResult, setNextResult] = useState<"win" | "loss">("win");

  // Synchronisation avec le journal de trading
  useEffect(() => {
    if (activeAccount !== 'ALL') {
      const accountTrades = globalTrades.filter(t => t.account === activeAccount);
      if (accountTrades.length === 0) return;

      const losses = accountTrades.filter(t => t.pnl < 0);
      const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((acc, tr) => acc + tr.pnl, 0) / losses.length) : 1;

      const syncedTrades: EdgeTrade[] = accountTrades.map(tr => ({
        id: tr.id,
        result: tr.pnl > 0 ? "win" : "loss",
        rr: tr.pnl > 0 ? Number((tr.pnl / (avgLoss || 1)).toFixed(2)) : 1,
        isImported: true
      }));

      setTrades(syncedTrades);
    }
  }, [activeAccount, globalTrades]);

  const addTrade = () => {
    setTrades([...trades, { id: Date.now(), result: nextResult, rr: nextResult === "win" ? nextRR : 1 }]);
  };

  const removeTrade = (id: number | string) => setTrades(trades.filter(tr => tr.id !== id));

  const wins = trades.filter(tr => tr.result === "win").length;
  const losses = trades.filter(tr => tr.result === "loss").length;
  const winRate = trades.length > 0 ? (wins / trades.length) * 100 : 0;
  
  const totalRRGained = trades.filter(tr => tr.result === "win").reduce((acc, tr) => acc + tr.rr, 0);
  const totalRRLost = losses;
  const expectancy = trades.length > 0 ? (totalRRGained - totalRRLost) / trades.length : 0;

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-white/20"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Sigma className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-bold tracking-tight">{t.edgeTitle}</h3>
        </div>
        {activeAccount !== 'ALL' && (
          <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30 uppercase font-bold">
            Sync: {activeAccount.replace('_', ' ')}
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <select 
          value={nextResult} 
          onChange={e => setNextResult(e.target.value as "win"|"loss")}
          className="bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none flex-1 focus:border-emerald-500/50"
        >
          <option value="win">{t.win}</option>
          <option value="loss">{t.loss}</option>
        </select>
        {nextResult === "win" && (
          <input 
            type="number" step="0.1" placeholder="R:R" 
            value={nextRR} onChange={e => setNextRR(Number(e.target.value))} 
            className="w-24 bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-emerald-500/50" 
          />
        )}
        <button onClick={addTrade} className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-4 rounded-lg flex items-center justify-center transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
          <span className="block text-xs text-white/50 uppercase">{t.trades}</span>
          <span className="text-xl font-bold">{trades.length}</span>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
          <span className="block text-xs text-white/50 uppercase">{t.winRate}</span>
          <span className="text-xl font-bold text-white">{winRate.toFixed(1)}%</span>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
          <span className="block text-xs text-white/50 uppercase">{t.trueEdge}</span>
          <span className={`text-xl font-bold ${expectancy > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {expectancy.toFixed(2)} R
          </span>
        </div>
      </div>

      {trades.length > 0 && (
        <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {trades.slice().reverse().map(trade => (
            <div key={trade.id} className="flex justify-between items-center p-2 bg-white/5 rounded-lg border border-white/5 text-sm">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${trade.result === "win" ? "bg-emerald-500" : "bg-red-500"}`}></span>
                <span className="uppercase text-white/70">{trade.result === "win" ? "WIN" : "LOSS"}</span>
                {trade.isImported && <span className="text-[9px] text-zinc-500">(Journal)</span>}
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono">{trade.result === "win" ? `+${trade.rr}R` : `-1R`}</span>
                <button onClick={() => removeTrade(trade.id)} className="text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
