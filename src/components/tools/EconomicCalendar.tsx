"use client";
import { useEffect, useRef } from "react";
import { Calendar } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function EconomicCalendar() {
  const { language } = useAppStore();
  const t = translations[language].terminal;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = ''; // clear widget
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-events.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "colorTheme": "dark",
      "isTransparent": true,
      "width": "100%",
      "height": "100%",
      "locale": language,
      "importanceFilter": "-1,0,1",
      "currencyFilter": "USD,EUR,GBP,JPY,AUD,CAD,CHF,NZD"
    });
    container.current.appendChild(script);
  }, [language]); // re-run if language changes

  return (
    <div className="glass-panel rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col h-[500px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-white/20 z-10"></div>
      
      <div className="flex items-center gap-3 p-6 pb-2 border-b border-white/5">
        <Calendar className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold tracking-tight">{t.ecoTitle}</h3>
      </div>
      
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0" ref={container}></div>
      </div>
    </div>
  );
}
