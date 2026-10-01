"use client";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function MarketSessions() {
  const { language } = useAppStore();
  const t = (translations[language].terminal as any) || translations['fr'].terminal;
  
  const [localTime, setLocalTime] = useState<Date | null>(null);

  useEffect(() => {
    setLocalTime(new Date());
    const interval = setInterval(() => setLocalTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  // Avoid hydration mismatch by waiting for client side
  if (!localTime) {
    return <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 h-[230px] animate-pulse bg-white/5"></div>;
  }

  const localHourDecimal = localTime.getHours() + localTime.getMinutes() / 60;
  const offsetHours = -localTime.getTimezoneOffset() / 60;
  
  // Format local timezone name nicely (e.g., "Europe/Paris" -> "CET")
  const tzName = Intl.DateTimeFormat(language, { timeZoneName: 'short' }).format(localTime).split(' ')[1] || `UTC${offsetHours >= 0 ? '+' : ''}${offsetHours}`;

  const sessionsUTC = [
    { name: t.sessSydney, startUTC: 22, endUTC: 7, color: "bg-blue-900/50 border-blue-500/50" },
    { name: t.sessTokyo, startUTC: 23, endUTC: 8, color: "bg-purple-900/50 border-purple-500/50" },
    { name: t.sessLondon, startUTC: 8, endUTC: 16.5, color: "bg-green-900/50 border-green-500/50" },
    { name: t.sessNY, startUTC: 13.5, endUTC: 20, color: "bg-red-900/50 border-red-500/50" },
  ];

  const sessions = sessionsUTC.map(s => {
    let localStart = (s.startUTC + offsetHours) % 24;
    let localEnd = (s.endUTC + offsetHours) % 24;
    if (localStart < 0) localStart += 24;
    if (localEnd < 0) localEnd += 24;
    return { ...s, localStart, localEnd };
  });

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-5 h-5 text-zinc-400" />
          <h3 className="text-lg font-bold tracking-tight">{t.sessTitle}</h3>
        </div>
        <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-md flex items-center gap-2">
          <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">AUTO</span>
          <span className="text-xs text-white font-mono tracking-widest">
            {tzName} {Math.floor(localHourDecimal).toString().padStart(2, '0')}:{localTime.getMinutes().toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      
      <div className="relative h-28 w-full bg-black/30 rounded-xl border border-white/5 overflow-hidden">
         {/* Grid lines */}
         {[0, 6, 12, 18, 24].map(h => (
           <div key={h} className="absolute top-0 bottom-0 border-l border-white/5" style={{ left: `${(h/24)*100}%` }}>
             <span className="absolute bottom-1 -left-2 text-[8px] text-white/20 font-mono">{h}h</span>
           </div>
         ))}
         
         {/* Sessions in Local Time */}
         {sessions.map((s, i) => {
           const isWrapped = s.localEnd < s.localStart;
           const top = i * 20 + 8;
           if (isWrapped) {
             return (
               <div key={i}>
                 <div className={`absolute border-l-2 h-5 flex items-center px-2 text-[9px] font-bold uppercase text-white/70 ${s.color}`} style={{ top: `${top}px`, left: `${(s.localStart/24)*100}%`, right: 0 }}>{s.name}</div>
                 <div className={`absolute h-5 rounded-r-md ${s.color}`} style={{ top: `${top}px`, left: 0, width: `${(s.localEnd/24)*100}%` }}></div>
               </div>
             );
           }
           return (
             <div key={i} className={`absolute border-l-2 rounded-r-md h-5 flex items-center px-2 text-[9px] font-bold uppercase text-white/70 ${s.color}`} style={{ top: `${top}px`, left: `${(s.localStart/24)*100}%`, width: `${((s.localEnd-s.localStart)/24)*100}%` }}>{s.name}</div>
           );
         })}
         
         {/* Current Local Time Indicator */}
         <div className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_white] z-10 transition-all duration-1000" style={{ left: `${(localHourDecimal/24)*100}%` }}></div>
      </div>
    </div>
  );
}
