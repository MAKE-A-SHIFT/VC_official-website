"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function MarketSessions() {
  const { language } = useAppStore();
  const t = translations[language].terminal;
  const [utcHour, setUtcHour] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hour = now.getUTCHours() + now.getUTCMinutes() / 60;
      setUtcHour(hour);
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const sessions = [
    { name: t.sessSydney, start: 22, end: 7, color: "bg-blue-900/50 border-blue-500/50" },
    { name: t.sessTokyo, start: 23, end: 8, color: "bg-purple-900/50 border-purple-500/50" },
    { name: t.sessLondon, start: 8, end: 16.5, color: "bg-green-900/50 border-green-500/50" },
    { name: t.sessNY, start: 13.5, end: 20, color: "bg-red-900/50 border-red-500/50" },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-bold tracking-tight">{t.sessTitle}</h3>
        </div>
        <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-md">
          <span className="text-xs text-white/50 font-mono tracking-widest">UTC {Math.floor(utcHour).toString().padStart(2, '0')}:{Math.floor((utcHour%1)*60).toString().padStart(2, '0')}</span>
        </div>
      </div>
      
      <div className="relative h-28 w-full bg-black/30 rounded-xl border border-white/5 overflow-hidden">
         {/* Grid lines */}
         {[0, 6, 12, 18, 24].map(h => (
           <div key={h} className="absolute top-0 bottom-0 border-l border-white/5" style={{ left: `${(h/24)*100}%` }}>
             <span className="absolute bottom-1 -left-2 text-[8px] text-white/20 font-mono">{h}h</span>
           </div>
         ))}
         
         {/* Sessions */}
         {sessions.map((s, i) => {
           const isWrapped = s.end < s.start;
           const top = i * 20 + 8;
           if (isWrapped) {
             return (
               <div key={i}>
                 <div className={`absolute border-l-2 h-5 flex items-center px-2 text-[9px] font-bold uppercase text-white/70 ${s.color}`} style={{ top: `${top}px`, left: `${(s.start/24)*100}%`, right: 0 }}>{s.name}</div>
                 <div className={`absolute h-5 rounded-r-md ${s.color}`} style={{ top: `${top}px`, left: 0, width: `${(s.end/24)*100}%` }}></div>
               </div>
             );
           }
           return (
             <div key={i} className={`absolute border-l-2 rounded-r-md h-5 flex items-center px-2 text-[9px] font-bold uppercase text-white/70 ${s.color}`} style={{ top: `${top}px`, left: `${(s.start/24)*100}%`, width: `${((s.end-s.start)/24)*100}%` }}>{s.name}</div>
           );
         })}
         
         {/* Current Time Indicator */}
         <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_white] z-10 transition-all duration-1000" style={{ left: `${(utcHour/24)*100}%` }}></div>
      </div>
    </div>
  );
}
