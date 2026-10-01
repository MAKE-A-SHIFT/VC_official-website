"use client";
import { useEffect, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";

export function TerminalTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useAppStore();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear previous widget
    containerRef.current.innerHTML = "";
    
    // Create new script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Ticker config
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "CAPITALCOM:DE40", title: "DAX 40" },
        { proName: "CAPITALCOM:US100", title: "NASDAQ 100" },
        { proName: "CAPITALCOM:US500", title: "S&P 500" },
        { proName: "OANDA:EURUSD", title: "EUR/USD" },
        { proName: "OANDA:GBPUSD", title: "GBP/USD" },
        { proName: "CAPITALCOM:DXY", title: "US Dollar Index" },
        { proName: "OANDA:XAUUSD", title: "GOLD" },
        { proName: "BINANCE:BTCUSDT", title: "Bitcoin" }
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: "regular",
      colorTheme: "dark",
      locale: language
    });
    
    containerRef.current.appendChild(script);
  }, [language]);

  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex items-center h-[72px] w-full p-2 relative z-0">
      <div className="tradingview-widget-container" ref={containerRef} style={{ width: '100%', height: '100%' }}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
}
