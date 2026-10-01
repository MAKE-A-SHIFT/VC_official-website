"use client";
import { useState } from "react";
import { FlaskConical, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

type BacktestEvent = { id: number; result: "WIN" | "LOSS"; rr: number };

export function BacktestJournal() {
  const { language } = useAppStore();
  const t = translations[language].terminal;

  const [events, setEvents] = useState<BacktestEvent[]>([]);
  const [rr, setRr] = useState(2);
  const [strategy, setStrategy] = useState("Orderflow Scalp");
  
  const logEvent = (res: "WIN" | "LOSS") => {
    setEvents([...events, { id: Date.now(), result: res, rr }]);
  };
  const clear = () => setEvents([]);

  const wins = events.filter(e => e.result === "WIN").length;
  const winRate = events.length > 0 ? (wins / events.length) * 100 : 0;
  const expectancy = events.length > 0 ? (winRate / 100) * rr - ((100 - winRate) / 100) * 1 : 0;

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col h-[400px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-white/20"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FlaskConical className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-bold tracking-tight">{t.bjTitle}</h3>
        </div>
        <input 
          type="text" 
          value={strategy} 
          onChange={e => setStrategy(e.target.value)} 
          className="bg-transparent border-b border-white/20 text-white outline-none text-right font-bold w-40 text-sm focus:border-emerald-500 transition-colors"
          placeholder={t.strat}
        />
      </div>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-center">
          <span className="block text-[10px] text-white/50 uppercase">{t.sample}</span>
          <span className="text-xl font-bold">{events.length}</span>
        </div>
        <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-center">
          <span className="block text-[10px] text-white/50 uppercase">{t.winRate}</span>
          <span className="text-xl font-bold">{winRate.toFixed(1)}%</span>
        </div>
        <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-center">
          <span className="block text-[10px] text-white/50 uppercase">{t.rrFix}</span>
          <span className="text-xl font-bold">{rr}</span>
        </div>
        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
          <span className="block text-[10px] text-emerald-500 uppercase">{t.edge}</span>
          <span className="text-xl font-bold text-emerald-400">{expectancy > 0 ? "+" : ""}{expectancy.toFixed(2)}</span>
        </div>
      </div>

      {/* 1-Click Execution */}
      <div className="flex gap-4 flex-1">
         <div className="flex flex-col gap-2 w-24">
           <label className="text-xs text-white/50 uppercase text-center mt-2">{t.targetRr}</label>
           <input type="number" step="0.1" value={rr} onChange={e => setRr(Number(e.target.value))} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white outline-none w-full text-center text-lg font-bold focus:border-emerald-500/50" />
           <button onClick={clear} className="mt-auto mb-2 text-white/30 hover:text-white transition-colors flex justify-center text-xs items-center gap-1"><RotateCcw className="w-3 h-3" /> {t.reset}</button>
         </div>
         <button onClick={() => logEvent("WIN")} className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl flex flex-col items-center justify-center transition-all group">
           <CheckCircle className="w-8 h-8 mb-2 group-active:scale-90 transition-transform" /> <span className="font-bold tracking-widest">WIN</span>
         </button>
         <button onClick={() => logEvent("LOSS")} className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl flex flex-col items-center justify-center transition-all group">
           <XCircle className="w-8 h-8 mb-2 group-active:scale-90 transition-transform" /> <span className="font-bold tracking-widest">LOSS</span>
         </button>
      </div>
    </div>
  );
}
