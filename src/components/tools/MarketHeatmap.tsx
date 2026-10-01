"use client";
import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function MarketHeatmap() {
  const { language } = useAppStore();
  const t = translations[language].terminal;
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.innerHTML = '';
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "width": "100%",
      "height": "100%",
      "currencies": ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      "isTransparent": true,
      "colorTheme": "dark",
      "locale": language
    });
    container.current.appendChild(script);
  }, [language]);

  return (
    <div className="glass-panel rounded-2xl w-full border border-white/5 relative overflow-hidden flex flex-col h-[500px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-700 to-white/20 z-10"></div>
      <div className="flex items-center gap-3 p-6 pb-2 border-b border-white/5">
        <Activity className="w-5 h-5 text-zinc-400" />
        <h3 className="text-lg font-bold tracking-tight">{t.heatmapTitle}</h3>
      </div>
      <div className="flex-1 w-full relative">
        <div className="absolute inset-0" ref={container}></div>
      </div>
    </div>
  );
}
