"use client";
import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";
import { Trophy, Swords, CalendarDays, DollarSign, ShieldAlert, Target, Search, Loader2 } from "lucide-react";

export function Competitions({ type }: { type: 'TRADING' | 'CRYPTO' }) {
  const { language } = useAppStore();
  const t = translations[language];
  const [isSearching, setIsSearching] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowMore(true);
    }, 1500);
  };

  const comps = type === 'TRADING' ? [
    {
      name: "Robbins World Cup of Trading",
      type: "Proprietary",
      assets: "Futures / Forex",
      prize: "Trophée + Capitaux",
      fee: "$10K (Real Account)",
      dd: "N/A (Compétition Réelle)",
      date: "Jan 2027",
      hybrid: false, url: "https://www.worldcupchampionships.com/world-cup-trading-championships",
    },
    {
      name: "Darwinex Zero - DarwinIA",
      type: "Allocation",
      assets: "CFD / Forex / Commodities",
      prize: "Jusqu'à €500K allocation",
      fee: "€38/mois",
      dd: "10% Trailing",
      date: "Fin du mois en cours",
      hybrid: false, url: "https://darwinexzero.com",
    },
    {
      name: "FTMO Trading Competition",
      type: "Prop Firm (Hybride)",
      assets: "Crypto / Forex / Indices",
      prize: "Compte 100K Gratuit",
      fee: "Gratuit",
      dd: "10% Max / 5% Daily",
      date: "Mensuelle",
      hybrid: true, url: "https://ftmo.com",
    },
    ...(showMore ? [
      {
        name: "Topstep Combine Challenge",
        type: "Futures Prop",
        assets: "Futures",
        prize: "Funded Account",
        fee: "$49/mois",
        dd: "Trailing Max Drawdown",
        date: "En cours",
        hybrid: false, url: "https://topstep.com",
      }
    ] : [])
  ] : [
    {
      name: "Bybit WSOT (World Series of Trading)",
      type: "Exchange",
      assets: "Crypto (Derivatives)",
      prize: "$10,000,000 Pool",
      fee: "500 USDT min balance",
      dd: "N/A",
      date: "Août 2027",
      hybrid: false, url: "https://www.bybit.com/en/wsot2024",
    },
    {
      name: "Binance Futures Grand Tournament",
      type: "Exchange",
      assets: "Crypto (Futures)",
      prize: "$2,000,000 Pool",
      fee: "Wallet > 200 USDT",
      dd: "N/A",
      date: "Novembre 2026",
      hybrid: false, url: "https://www.binance.com/en/futures-activity/tournament",
    },
    {
      name: "FTMO Trading Competition",
      type: "Prop Firm (Hybride)",
      assets: "Crypto / Forex / Indices",
      prize: "Compte 100K Gratuit",
      fee: "Gratuit",
      dd: "10% Max / 5% Daily",
      date: "Mensuelle",
      hybrid: true, url: "https://ftmo.com",
    },
    ...(showMore ? [
      {
        name: "OKX Trading League",
        type: "Exchange",
        assets: "Crypto (Spot & Futures)",
        prize: "$1,500,000 Pool",
        fee: "Volume Based",
        dd: "N/A",
        date: "Octobre 2026",
        hybrid: false, url: "https://www.okx.com",
      }
    ] : [])
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-900"></div>
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-500" />
          <h3 className="text-xl font-bold tracking-tight">{type === 'TRADING' ? t.compTitleTrading : t.compTitleCrypto}</h3>
        </div>
        
        <button 
          onClick={handleSearch}
          disabled={isSearching}
          className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
        >
          {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {isSearching ? "{t.compSearching}" : "{t.compSearch}"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comps.map((comp, idx) => (
          <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-xl hover:bg-white/[0.02] transition-colors relative">
            {comp.hybrid && (
              <span className="absolute -top-3 right-4 bg-violet-600/20 border border-violet-500/30 text-violet-400 text-[9px] font-bold px-2 py-1 rounded uppercase">
                {t.compHybrid}
              </span>
            )}
            
            <h4 className="text-lg font-bold text-white mb-1">{comp.name}</h4>
            <p className="text-xs text-white/50 mb-4">{comp.type} • {comp.assets}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-white/40"><DollarSign className="w-4 h-4"/> {t.compPrize}</span>
                <span className="font-bold text-amber-400">{comp.prize}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-white/40"><Target className="w-4 h-4"/> {t.compEntry}</span>
                <span className="font-mono text-white/80">{comp.fee}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-white/40"><ShieldAlert className="w-4 h-4"/> Drawdown</span>
                <span className="font-mono text-red-400">{comp.dd}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-white/40"><CalendarDays className="w-4 h-4"/> {t.compDate}</span>
                <span className="text-white/80">{comp.date}</span>
              </div>
            </div>
            
            <button onClick={() => window.open(comp.url || '#', '_blank')} className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              <Swords className="w-4 h-4" /> {t.compJoin}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
