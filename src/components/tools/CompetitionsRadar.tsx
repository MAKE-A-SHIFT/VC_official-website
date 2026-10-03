"use client";
import { Trophy, Calendar, DollarSign, Activity, AlertTriangle, Crosshair } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

type CompType = "TRADING" | "CRYPTO" | "HYBRID";

interface Competition {
  id: string;
  name: string;
  platform: string;
  type: CompType;
  prizePool: string;
  entryFee: string;
  duration: string;
  startDate: string;
  status: "UPCOMING" | "ONGOING";
  tags: string[];
  maxDD?: string;
  target?: string;
}

const competitions: Competition[] = [
  {
    id: "wsot-2024",
    name: "World Series of Trading (WSOT)",
    platform: "Bybit",
    type: "HYBRID",
    prizePool: "$10,000,000",
    entryFee: "$500 (Balance Min)",
    duration: "30 Jours",
    startDate: "Débute dans 14 Jours",
    status: "UPCOMING",
    tags: ["Equipe & Individuel", "KYC Obligatoire", "Volume-based", "VIP Perks"],
    maxDD: "N/A",
    target: "Plus Haut PnL %"
  },
  {
    id: "robbins-cup",
    name: "Robbins World Cup of Trading",
    platform: "Robbins Trading Co.",
    type: "TRADING",
    prizePool: "Prestige + Cash",
    entryFee: "$10,000 (Real Money)",
    duration: "1 An",
    startDate: "Janvier 2027",
    status: "UPCOMING",
    tags: ["Futures & Forex", "Compte Réel", "Audit Officiel", "Légendaire"],
    maxDD: "Pas de limite",
    target: "Net Profit %"
  },
  {
    id: "binance-futures",
    name: "Binance Futures Grand Tournament",
    platform: "Binance",
    type: "CRYPTO",
    prizePool: "$2,000,000",
    entryFee: "$100",
    duration: "21 Jours",
    startDate: "Débute dans 5 Jours",
    status: "UPCOMING",
    tags: ["High Leverage", "ROI Based", "Prizes in BNB", "Daily Draws"],
    maxDD: "Liquidation",
    target: "Top ROI %"
  },
  {
    id: "ftmo-challenge",
    name: "FTMO Monthly Competition",
    platform: "FTMO",
    type: "TRADING",
    prizePool: "1x $100k Challenge",
    entryFee: "Gratuit",
    duration: "1 Mois",
    startDate: "1er du mois",
    status: "UPCOMING",
    tags: ["Débutant Friendly", "Demo Account", "Strict Rules"],
    maxDD: "10% Max / 5% Daily",
    target: "Plus haut PnL"
  },
  {
    id: "darwinex-zero",
    name: "Darwinex Zero Challenge",
    platform: "Darwinex",
    type: "HYBRID",
    prizePool: "Jusqu'à €500k d'allocation",
    entryFee: "€38/mois",
    duration: "Permanent",
    startDate: "Immédiat",
    status: "ONGOING",
    tags: ["Risk-Adjusted", "Algo Friendly", "Darwin Index", "Long-term Edge"],
    maxDD: "Dynamique (VaR)",
    target: "Score DarwinIA"
  },
  {
    id: "kucoin-cup",
    name: "KuCoin Global Trading Cup",
    platform: "KuCoin",
    type: "CRYPTO",
    prizePool: "$1,000,000",
    entryFee: "$50",
    duration: "14 Jours",
    startDate: "En cours",
    status: "ONGOING",
    tags: ["Altcoins & Memes", "Volume Tiered", "P2P Battles"],
    maxDD: "N/A",
    target: "Volume + PnL"
  }
];

export function CompetitionsRadar({ category }: { category: 'TRADING' | 'CRYPTO' }) {
  const displayComps = competitions.filter(c => c.type === category || c.type === 'HYBRID');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayComps.map((comp) => {
        const isHybrid = comp.type === "HYBRID";
        
        return (
          <div key={comp.id} className={\`bg-[#111113] border p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02] \${isHybrid ? 'border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'border-white/5 hover:border-white/20'}\`}>
            {/* Top Border Accent */}
            <div className={\`absolute top-0 left-0 w-full h-1 bg-gradient-to-r \${isHybrid ? 'from-purple-500 to-fuchsia-500' : category === 'CRYPTO' ? 'from-cyan-500 to-blue-500' : 'from-emerald-500 to-teal-500'}\`}></div>
            
            {/* Type Badge & Status */}
            <div className="flex justify-between items-start mb-4">
              <span className={\`text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded border \${isHybrid ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : category === 'CRYPTO' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}\`}>
                {isHybrid ? 'COMPÉTITION HYBRIDE' : \`COMPÉTITION \${comp.type}\`}
              </span>
              <span className={\`text-[10px] font-bold uppercase flex items-center gap-1 \${comp.status === 'ONGOING' ? 'text-green-500' : 'text-orange-500'}\`}>
                {comp.status === 'ONGOING' ? <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> : <Calendar className="w-3 h-3" />}
                {comp.status === 'ONGOING' ? 'EN COURS' : 'À VENIR'}
              </span>
            </div>

            {/* Name & Platform */}
            <h3 className="text-xl font-black text-white leading-tight mb-1">{comp.name}</h3>
            <p className="text-zinc-500 text-sm font-medium mb-6">via {comp.platform}</p>

            {/* Snippets Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#09090b] border border-white/5 rounded-lg p-3">
                <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase mb-1">
                  <Trophy className="w-3 h-3" /> Prize Pool
                </span>
                <span className="text-sm font-bold text-yellow-500">{comp.prizePool}</span>
              </div>
              <div className="bg-[#09090b] border border-white/5 rounded-lg p-3">
                <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase mb-1">
                  <DollarSign className="w-3 h-3" /> Entry Fee
                </span>
                <span className="text-sm font-bold text-white">{comp.entryFee}</span>
              </div>
              <div className="bg-[#09090b] border border-white/5 rounded-lg p-3">
                <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase mb-1">
                  <Crosshair className="w-3 h-3" /> Objectif
                </span>
                <span className="text-sm font-bold text-white">{comp.target}</span>
              </div>
              <div className="bg-[#09090b] border border-white/5 rounded-lg p-3">
                <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase mb-1">
                  <AlertTriangle className="w-3 h-3" /> Max Drawdown
                </span>
                <span className="text-sm font-bold text-red-400">{comp.maxDD}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-between text-xs font-medium text-zinc-400 mb-6 border-y border-white/5 py-3">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-zinc-500" /> {comp.startDate}</span>
              <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-zinc-500" /> {comp.duration}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {comp.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] bg-white/5 text-zinc-300 px-2 py-1 rounded border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
            
            <button className="w-full mt-6 bg-white/5 hover:bg-white text-white hover:text-black font-bold text-sm py-3 rounded-xl transition-all duration-300">
              Voir les Règles Officielles
            </button>
          </div>
        );
      })}
    </div>
  );
}
