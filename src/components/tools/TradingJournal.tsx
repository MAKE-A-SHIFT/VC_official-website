"use client";
import React, { useState } from "react";
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";
import { Crosshair, AlertCircle, BookOpen, TrendingUp, TrendingDown, Target, Filter, ChevronDown, Award, Calendar, ChevronRight, Activity } from "lucide-react";

// --- TYPES ---
interface TradeEntry {
  id: string;
  date: string;
  asset: string;
  direction: "LONG" | "SHORT";
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  playbook: string;
  mistakes: string[];
  mfe: number; // Max Favorable Excursion (en %)
  mae: number; // Max Adverse Excursion (en %)
  pnlPercent: number; // PnL rAcel en % par rapport au compte
  status: "WIN" | "LOSS" | "BE";
  account: string;
}

export function TradingJournal() {
  const { language } = useAppStore();
  const t = translations[language].terminal as any;

  // --- ÉTATS ---
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'LOGBOOK' | 'PLAYBOOKS' | 'REPORTS'>('DASHBOARD');
  const [activeAccount, setActiveAccount] = useState<'ALL' | 'FUNDED_1' | 'CHALLENGE'>('ALL');

  // --- MOCK DATA TYPE TRADEZELLA ---
  const [entries] = useState<TradeEntry[]>([
    { id: "1", date: "2026-10-01", asset: "NQ100", direction: "LONG", entryPrice: 19500, exitPrice: 19550, pnl: 1200, playbook: "Silver Bullet", mistakes: [], mfe: 1500, mae: -200, pnlPercent: 1.2, status: "WIN", account: "FUNDED_1" },
    { id: "2", date: "2026-10-02", asset: "EURUSD", direction: "SHORT", entryPrice: 1.1050, exitPrice: 1.1080, pnl: -800, playbook: "London Breakout", mistakes: ["FOMO", "Revenge Trading"], mfe: 100, mae: -800, pnlPercent: -0.8, status: "LOSS", account: "CHALLENGE" },
    { id: "3", date: "2026-10-03", asset: "XAUUSD", direction: "LONG", entryPrice: 2500, exitPrice: 2515, pnl: 2100, playbook: "FVG Retracement", mistakes: ["Hesitation"], mfe: 2500, mae: -150, pnlPercent: 2.1, status: "WIN", account: "FUNDED_1" },
    { id: "4", date: "2026-10-04", asset: "BTCUSD", direction: "SHORT", entryPrice: 65000, exitPrice: 65000, pnl: 0, playbook: "Silver Bullet", mistakes: ["Moved Stop Loss"], mfe: 500, mae: -500, pnlPercent: 0, status: "BE", account: "FUNDED_1" },
    { id: "5", date: "2026-10-05", asset: "NQ100", direction: "LONG", entryPrice: 19600, exitPrice: 19550, pnl: -1500, playbook: "Trend Continuation", mistakes: ["Overleveraged", "FOMO"], mfe: 0, mae: -1500, pnlPercent: -1.5, status: "LOSS", account: "CHALLENGE" },
    { id: "6", date: "2026-10-06", asset: "XAUUSD", direction: "SHORT", entryPrice: 2520, exitPrice: 2500, pnl: 3500, playbook: "London Breakout", mistakes: [], mfe: 4000, mae: 0, pnlPercent: 3.5, status: "WIN", account: "FUNDED_1" },
  ]);

  // Filtrage par compte
  const filteredEntries = activeAccount === 'ALL' ? entries : entries.filter(e => e.account === activeAccount);

  // --- STATISTIQUES GLOBAL ---
  const totalPnL = filteredEntries.reduce((sum, e) => sum + e.pnl, 0);
  const winCount = filteredEntries.filter(e => e.pnl > 0).length;
  const lossCount = filteredEntries.filter(e => e.pnl < 0).length;
  const winRate = ((winCount / (winCount + lossCount || 1)) * 100).toFixed(1);
  
  const grossProfit = filteredEntries.filter(e => e.pnl > 0).reduce((sum, e) => sum + e.pnl, 0);
  const grossLoss = Math.abs(filteredEntries.filter(e => e.pnl < 0).reduce((sum, e) => sum + e.pnl, 0));
  const profitFactor = grossLoss === 0 ? grossProfit : (grossProfit / grossLoss).toFixed(2);

  // --- DATA POUR COURBE XP ---
  let cumulative = 0;
  const xpData = filteredEntries.map(e => {
    cumulative += e.pnl;
    return { date: new Date(e.date).toLocaleDateString(language, { day: '2-digit', month: 'short' }), pnl: cumulative };
  });

  // --- DATA POUR ARBRE RPG ---
  const radarData = [
    { subject: "Risk Management", A: 85, fullMark: 100 },
    { subject: "Emotional Control", A: lossCount > 0 ? 60 : 90, fullMark: 100 },
    { subject: "Playbook Accuracy", A: 75, fullMark: 100 },
    { subject: "Patience (MFE/MAE)", A: 80, fullMark: 100 },
    { subject: "Execution", A: 95, fullMark: 100 },
    { subject: "Win Rate", A: parseFloat(winRate), fullMark: 100 },
  ];

  // --- DATA POUR RAPPORTS (MISTAKES COST) ---
  const mistakesCost: Record<string, number> = {};
  filteredEntries.forEach(e => {
    if (e.pnl < 0) {
      e.mistakes.forEach(m => {
        mistakesCost[m] = (mistakesCost[m] || 0) + Math.abs(e.pnl);
      });
    }
  });
  const mistakesData = Object.keys(mistakesCost).map(key => ({ name: key, lost: mistakesCost[key] })).sort((a, b) => b.lost - a.lost);

  // --- DATA POUR PLAYBOOKS ---
  const playbookStats: Record<string, { wins: number, total: number, pnl: number }> = {};
  filteredEntries.forEach(e => {
    if (!playbookStats[e.playbook]) playbookStats[e.playbook] = { wins: 0, total: 0, pnl: 0 };
    playbookStats[e.playbook].total += 1;
    if (e.pnl > 0) playbookStats[e.playbook].wins += 1;
    playbookStats[e.playbook].pnl += e.pnl;
  });

  // -------------------------------------------------------------
  // SOUS-COMPOSANTS DE RENDU
  // -------------------------------------------------------------

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Net PnL</p>
          <p className={`text-2xl font-black ${totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
          </p>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Win Rate</p>
          <p className="text-2xl font-black text-white">{winRate}%</p>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-5">
          <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Profit Factor</p>
          <p className="text-2xl font-black text-white">{profitFactor}</p>
        </div>
        <div className="bg-black/40 border border-white/5 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-violet-500/20">
            <Award className="w-24 h-24" />
          </div>
          <p className="text-xs text-zinc-500 font-bold uppercase mb-1">Rang XP</p>
          <p className="text-2xl font-black text-violet-400">Elite IV</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* XP Curve */}
        <div className="xl:col-span-2 bg-black/40 border border-white/5 rounded-xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" /> Progression PnL
          </h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={xpData}>
                <defs>
                  <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#3f3f46" fontSize={10} tickMargin={10} />
                <YAxis stroke="#3f3f46" fontSize={10} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="pnl" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorPnL)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RPG Skill Tree */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-6">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Target className="w-4 h-4 text-violet-500" /> Profil Psychologique
          </h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                <Radar name="Trader" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogbook = () => (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-white">Journal des Trades</h3>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-colors">
          + Sync Broker
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-white/30">
              <th className="pb-4 font-semibold pl-4">Date / Actif</th>
              <th className="pb-4 font-semibold">Playbook</th>
              <th className="pb-4 font-semibold">MFE / MAE (Excursion)</th>
              <th className="pb-4 font-semibold">Erreurs</th>
              <th className="pb-4 font-semibold text-right pr-4">Net PnL</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredEntries.map((e) => (
              <tr key={e.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                <td className="py-4 pl-4">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${e.direction === 'LONG' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {e.asset}
                  </div>
                  <div className="text-xs text-zinc-500">{new Date(e.date).toLocaleDateString()}</div>
                </td>
                <td className="py-4">
                  <span className="text-xs px-2 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-md font-bold">
                    {e.playbook}
                  </span>
                </td>
                <td className="py-4 w-48">
                  {/* Visual MFE/MAE Bar type Tradezella */}
                  <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden flex items-center mt-1">
                    {/* MAE (Drawdown pendant le trade) */}
                    <div className="absolute left-0 h-full bg-red-500/50" style={{ width: `${Math.min(100, Math.abs(e.mae) / 50 * 100)}%` }}></div>
                    {/* Entry Point (Zero) */}
                    <div className="absolute left-[30%] h-3 w-0.5 bg-white z-10"></div>
                    {/* MFE (Profit max atteint) */}
                    <div className="absolute left-[30%] h-full bg-green-500/50" style={{ width: `${Math.min(70, (e.mfe / 5000) * 100)}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] font-mono text-zinc-500">
                    <span className="text-red-400">MAE: {e.mae}$</span>
                    <span className="text-green-400">MFE: {e.mfe}$</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-1">
                    {e.mistakes.length === 0 ? <span className="text-xs text-zinc-600">-</span> : e.mistakes.map(m => (
                      <span key={m} className="text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 text-right pr-4">
                  <span className={`font-mono font-bold ${e.pnl > 0 ? 'text-green-500' : e.pnl < 0 ? 'text-red-500' : 'text-zinc-500'}`}>
                    {e.pnl > 0 ? '+' : ''}{e.pnl}$
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlaybooks = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="font-bold text-lg text-white mb-6">Stratégies & Playbooks</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(playbookStats).map(([name, stats]) => (
          <div key={name} className="bg-black/40 border border-white/5 p-6 rounded-xl relative overflow-hidden group hover:border-violet-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 blur-3xl pointer-events-none group-hover:bg-violet-500/10 transition-all"></div>
            <h4 className="text-xl font-bold text-white mb-4">{name}</h4>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Win Rate</p>
                <p className="text-lg font-bold text-white">{((stats.wins / stats.total) * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Trades</p>
                <p className="text-lg font-bold text-white">{stats.total}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold">Net PnL</p>
                <p className={`text-lg font-bold ${stats.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stats.pnl > 0 ? '+' : ''}{stats.pnl}$
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs text-zinc-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Règles strictement définies : Actives
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="font-bold text-lg text-white mb-6">Rapports d'Analyse Avancés</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistakes Cost */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Impact Financier des Erreurs
          </h4>
          <div className="h-[250px] w-full">
            {mistakesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mistakesData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#3f3f46" fontSize={10} tickFormatter={(val) => `$${val}`} />
                  <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} width={80} />
                  <Tooltip cursor={{ fill: '#18181b' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                  <Bar dataKey="lost" fill="#ef4444" radius={[0, 4, 4, 0]}>
                    {mistakesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#ef4444" fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-zinc-500 text-sm">Aucune erreur financière détectée.</div>
            )}
          </div>
        </div>

        {/* PnL by Playbook */}
        <div className="bg-black/40 border border-white/5 rounded-xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-500" /> PnL par Stratégie
          </h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Object.keys(playbookStats).map(k => ({ name: k, pnl: playbookStats[k].pnl }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#3f3f46" fontSize={10} />
                <YAxis stroke="#3f3f46" fontSize={10} />
                <Tooltip cursor={{ fill: '#18181b' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
                  {Object.keys(playbookStats).map((k, index) => {
                    const p = playbookStats[k].pnl;
                    return <Cell key={`cell-${index}`} fill={p >= 0 ? '#22c55e' : '#ef4444'} fillOpacity={0.8} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="glass-panel rounded-2xl w-full border border-white/5 overflow-hidden">
      {/* HEADER / ACCOUNT SELECTOR */}
      <div className="border-b border-white/5 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center border border-violet-500/30">
            <Crosshair className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">Journal Automatisé</h3>
            <p className="text-xs text-zinc-500">Propulsé par la data analytique</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-black/50 p-1 rounded-lg border border-white/5">
          <button onClick={() => setActiveAccount('ALL')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeAccount === 'ALL' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>All Accounts</button>
          <button onClick={() => setActiveAccount('FUNDED_1')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeAccount === 'FUNDED_1' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>Funded 100k</button>
          <button onClick={() => setActiveAccount('CHALLENGE')} className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeAccount === 'CHALLENGE' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white'}`}>Challenge</button>
        </div>
      </div>

      {/* TABS MENU */}
      <div className="flex px-4 border-b border-white/5 bg-black/20 overflow-x-auto hide-scrollbar">
        {[
          { id: 'DASHBOARD', icon: Activity, label: 'Overview' },
          { id: 'LOGBOOK', icon: Calendar, label: 'Logbook' },
          { id: 'PLAYBOOKS', icon: BookOpen, label: 'Playbooks' },
          { id: 'REPORTS', icon: Filter, label: 'Reports' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-violet-400' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500 shadow-[0_0_10px_#8b5cf6]" />
            )}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="p-6 md:p-8 min-h-[500px]">
        {activeTab === 'DASHBOARD' && renderDashboard()}
        {activeTab === 'LOGBOOK' && renderLogbook()}
        {activeTab === 'PLAYBOOKS' && renderPlaybooks()}
        {activeTab === 'REPORTS' && renderReports()}
      </div>
    </div>
  );
}
