"use client";
import React, { useState, useEffect, useMemo } from "react";
import { AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";
import { Crosshair, AlertCircle, BookOpen, TrendingUp, Filter, Activity, Plus, X, Calendar, ArrowRight, Tag, Trash2, LayoutDashboard, Target } from "lucide-react";

// --- TYPES ---
interface Trade {
  id: string;
  date: string;
  asset: string;
  direction: "LONG" | "SHORT";
  pnl: number;
  playbook: string;
  mistakes: string[];
  mfe: number; // en $
  mae: number; // en $ (valeur absolue ou nAcgative)
  account: string;
}

// --- CONSTANTES ---
const AVAILABLE_MISTAKES = ["FOMO", "Revenge Trading", "Overleveraged", "Hesitation", "Moved Stop Loss", "Traded outside Killzone"];
const AVAILABLE_ACCOUNTS = ["FUNDED_1", "CHALLENGE", "PERSONAL"];
const DEFAULT_PLAYBOOKS = ["Silver Bullet", "London Breakout", "FVG Retracement", "Trend Continuation"];

export function TradingJournal() {
  const { language } = useAppStore();
  const t = (translations[language].terminal as any) || {};

  // --- ÉTATS ---
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'LOGBOOK' | 'PLAYBOOKS' | 'REPORTS'>('DASHBOARD');
  const [activeAccount, setActiveAccount] = useState<string>('ALL');
  
  // Trades State (avec LocalStorage pour la persistance)
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulaire d'ajout
  const [formData, setFormData] = useState<Partial<Trade>>({
    direction: "LONG",
    asset: "NQ100",
    date: new Date().toISOString().split('T')[0],
    account: "FUNDED_1",
    playbook: "Silver Bullet",
    mistakes: [],
    pnl: 0,
    mfe: 0,
    mae: 0
  });

  // Hydratation au montage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("valhalla_trades");
    if (saved) {
      setTrades(JSON.parse(saved));
    } else {
      // Demo Data si vide
      setTrades([
        { id: "1", date: "2026-10-01", asset: "NQ100", direction: "LONG", pnl: 1200, playbook: "Silver Bullet", mistakes: [], mfe: 1500, mae: -200, account: "FUNDED_1" },
        { id: "2", date: "2026-10-02", asset: "EURUSD", direction: "SHORT", pnl: -800, playbook: "London Breakout", mistakes: ["FOMO", "Revenge Trading"], mfe: 100, mae: -800, account: "CHALLENGE" },
        { id: "3", date: "2026-10-03", asset: "XAUUSD", direction: "LONG", pnl: 2100, playbook: "FVG Retracement", mistakes: ["Hesitation"], mfe: 2500, mae: -150, account: "FUNDED_1" },
      ]);
    }
  }, []);

  // Sauvegarde auto
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("valhalla_trades", JSON.stringify(trades));
    }
  }, [trades, isMounted]);

  // --- LOGIQUE DE CALCUL DYNAMIQUE ---
  const filteredTrades = useMemo(() => {
    return activeAccount === 'ALL' ? trades : trades.filter(t => t.account === activeAccount);
  }, [trades, activeAccount]);

  const stats = useMemo(() => {
    const totalPnL = filteredTrades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = filteredTrades.filter(t => t.pnl > 0);
    const losses = filteredTrades.filter(t => t.pnl < 0);
    const winRate = filteredTrades.length ? (wins.length / filteredTrades.length) * 100 : 0;
    
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? 99 : 0) : (grossProfit / grossLoss);

    // XP Curve Data
    let cumulative = 0;
    const xpData = [...filteredTrades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(t => {
      cumulative += t.pnl;
      return { date: t.date, pnl: cumulative };
    });

    // Mistakes Cost
    const mistakesCost: Record<string, number> = {};
    losses.forEach(t => {
      t.mistakes.forEach(m => {
        mistakesCost[m] = (mistakesCost[m] || 0) + Math.abs(t.pnl);
      });
    });
    const mistakesData = Object.keys(mistakesCost).map(k => ({ name: k, lost: mistakesCost[k] })).sort((a, b) => b.lost - a.lost);

    // Playbook Stats
    const playbooks: Record<string, { wins: number, total: number, pnl: number }> = {};
    filteredTrades.forEach(t => {
      if (!playbooks[t.playbook]) playbooks[t.playbook] = { wins: 0, total: 0, pnl: 0 };
      playbooks[t.playbook].total += 1;
      if (t.pnl > 0) playbooks[t.playbook].wins += 1;
      playbooks[t.playbook].pnl += t.pnl;
    });

    return { totalPnL, winRate, profitFactor, xpData, mistakesData, playbooks, winCount: wins.length, lossCount: losses.length };
  }, [filteredTrades]);

  // --- ACTIONS ---
  const handleAddTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const newTrade: Trade = {
      id: Date.now().toString(),
      date: formData.date || new Date().toISOString().split('T')[0],
      asset: formData.asset || 'UNKNOWN',
      direction: formData.direction as "LONG" | "SHORT",
      pnl: Number(formData.pnl) || 0,
      playbook: formData.playbook || 'Uncategorized',
      mistakes: formData.mistakes || [],
      mfe: Number(formData.mfe) || 0,
      mae: -Math.abs(Number(formData.mae) || 0),
      account: formData.account || 'FUNDED_1'
    };
    setTrades([newTrade, ...trades]);
    setIsAddModalOpen(false);
    // Reset Form
    setFormData({ ...formData, pnl: 0, mfe: 0, mae: 0, mistakes: [] });
  };

  const deleteTrade = (id: string) => {
    if(confirm("Supprimer ce trade ?")) {
      setTrades(trades.filter(t => t.id !== id));
    }
  };

  const toggleMistake = (m: string) => {
    const current = formData.mistakes || [];
    if (current.includes(m)) setFormData({ ...formData, mistakes: current.filter(x => x !== m) });
    else setFormData({ ...formData, mistakes: [...current, m] });
  };

  if (!isMounted) return null;

  // -------------------------------------------------------------
  // RENDERS
  // -------------------------------------------------------------

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* KPIs Minimalistes type Tradezella */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Net PnL</p>
          <p className={`text-3xl font-black tracking-tighter ${stats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats.totalPnL >= 0 ? '+' : ''}${stats.totalPnL.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Win Rate</p>
          <div className="flex items-end gap-2">
            <p className="text-3xl font-black text-white tracking-tighter">{stats.winRate.toFixed(1)}%</p>
            <p className="text-sm text-zinc-500 mb-1">{stats.winCount}W - {stats.lossCount}L</p>
          </div>
        </div>
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-6 flex flex-col justify-between h-32">
          <p className="text-xs text-zinc-500 font-bold tracking-widest uppercase">Profit Factor</p>
          <p className="text-3xl font-black text-white tracking-tighter">{stats.profitFactor.toFixed(2)}</p>
        </div>
        <div className="bg-violet-900/10 border border-violet-500/20 rounded-2xl p-6 flex flex-col justify-between h-32 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-500/20 blur-2xl rounded-full"></div>
          <p className="text-xs text-violet-300/50 font-bold tracking-widest uppercase">Trading Edge</p>
          <p className="text-2xl font-black text-violet-400">
            {stats.profitFactor > 2 ? 'Elite' : stats.profitFactor > 1.2 ? 'Profitable' : 'Needs Work'}
          </p>
        </div>
      </div>

      {/* Charts: Equity Curve & Radar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-[#111113] border border-white/5 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-zinc-400" /> Equity Curve
            </h4>
          </div>
          <div className="h-[300px] w-full">
            {stats.xpData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.xpData}>
                  <defs>
                    <linearGradient id="colorPnL" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" stroke="#3f3f46" fontSize={10} tickMargin={10} minTickGap={30} />
                  <YAxis stroke="#3f3f46" fontSize={10} tickFormatter={(val) => `$${val}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                  />
                  <Area type="step" dataKey="pnl" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPnL)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">Pas assez de donnAces.</div>
            )}
          </div>
        </div>

        <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" /> RPG Stats
          </h4>
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={[
                { subject: "Risk", A: stats.lossCount > 0 ? 80 : 100 },
                { subject: "Discipline", A: stats.mistakesData.length > 0 ? 60 : 95 },
                { subject: "Playbook", A: 85 },
                { subject: "Execution", A: 90 },
                { subject: "Win Rate", A: stats.winRate },
              ]}>
                <PolarGrid stroke="#27272a" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
                <Radar name="Trader" dataKey="A" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogbook = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-xl text-white">Trades</h3>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Plus className="w-4 h-4" /> Add Trade
        </button>
      </div>

      <div className="bg-[#111113] border border-white/5 rounded-2xl overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-zinc-500 bg-white/[0.02]">
                <th className="py-4 pl-6 font-bold w-40">Date / Asset</th>
                <th className="py-4 font-bold w-32">Setup</th>
                <th className="py-4 font-bold w-48">MFE / MAE (Drawdown)</th>
                <th className="py-4 font-bold">Mistakes</th>
                <th className="py-4 font-bold text-right pr-6 w-32">Net PnL</th>
                <th className="py-4 font-bold w-12 text-center"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTrades.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-zinc-500">Aucun trade enregistrAc.</td></tr>
              )}
              {filteredTrades.map((t) => (
                <tr key={t.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                  <td className="py-4 pl-6">
                    <div className="font-bold text-white flex items-center gap-2 text-sm">
                      <span className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${t.direction === 'LONG' ? 'bg-green-500 shadow-green-500/50' : 'bg-red-500 shadow-red-500/50'}`}></span>
                      {t.asset}
                    </div>
                    <div className="text-xs text-zinc-500 mt-1">{t.date}</div>
                  </td>
                  <td className="py-4">
                    <span className="text-[10px] px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md font-bold uppercase tracking-wider">
                      {t.playbook}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    {/* Tradezella style MFE/MAE */}
                    <div className="relative h-1.5 w-full bg-black rounded-full overflow-hidden flex items-center">
                      <div className="absolute left-0 h-full bg-red-500/50" style={{ width: `${Math.min(100, Math.abs(t.mae) / (Math.max(t.mfe, Math.abs(t.mae)) || 1) * 100)}%` }}></div>
                      <div className="absolute left-[50%] h-3 w-0.5 bg-zinc-400 z-10"></div>
                      <div className="absolute left-[50%] h-full bg-green-500/50" style={{ width: `${Math.min(50, (t.mfe / (Math.max(t.mfe, Math.abs(t.mae)) || 1)) * 50)}%` }}></div>
                    </div>
                    <div className="flex justify-between mt-1 text-[9px] font-mono font-bold">
                      <span className="text-red-500/70">MAE: {t.mae}$</span>
                      <span className="text-green-500/70">MFE: {t.mfe}$</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {t.mistakes.length === 0 ? <span className="text-xs text-zinc-700">-</span> : t.mistakes.map(m => (
                        <span key={m} className="text-[9px] px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded uppercase font-bold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 text-right pr-6">
                    <span className={`font-mono text-base font-black tracking-tighter ${t.pnl > 0 ? 'text-green-500' : t.pnl < 0 ? 'text-red-500' : 'text-zinc-500'}`}>
                      {t.pnl > 0 ? '+' : ''}{t.pnl}$
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button onClick={() => deleteTrade(t.id)} className="text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlaybooks = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xl text-white">Playbooks Performance</h3>
        <button className="text-sm font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1">
          <Plus className="w-4 h-4"/> New Playbook
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stats.playbooks).map(([name, p]) => (
          <div key={name} className="bg-[#111113] border border-white/5 p-6 rounded-2xl relative overflow-hidden group hover:border-violet-500/30 transition-all cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="w-5 h-5 text-violet-400" />
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-5 h-5 text-zinc-300" />
            </div>
            <h4 className="text-lg font-bold text-white mb-6">{name}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Win Rate</p>
                <p className="text-xl font-black text-white">{((p.wins / p.total) * 100).toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Net PnL</p>
                <p className={`text-xl font-black ${p.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {p.pnl > 0 ? '+' : ''}{p.pnl}$
                </p>
              </div>
              <div className="col-span-2 mt-2">
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-2">Volume</p>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500/50" style={{ width: `${(p.total / filteredTrades.length) * 100}%` }}></div>
                </div>
                <p className="text-[10px] text-zinc-600 mt-1 font-bold">{p.total} trades enregistrAcs</p>
              </div>
            </div>
          </div>
        ))}
        {Object.keys(stats.playbooks).length === 0 && (
          <div className="col-span-full text-center py-12 text-zinc-500">Ajoutez des trades avec un Setup pour voir les performances.</div>
        )}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="font-bold text-xl text-white mb-2">Data-Driven Insights</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mistakes Cost */}
        <div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-8 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" /> Combien te coAtent tes erreurs ?
          </h4>
          <div className="h-[300px] w-full">
            {stats.mistakesData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.mistakesData} layout="vertical" margin={{ left: 60, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={false} />
                  <XAxis type="number" stroke="#3f3f46" fontSize={10} tickFormatter={(val) => `-$${val}`} />
                  <YAxis dataKey="name" type="category" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#18181b' }} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Bar dataKey="lost" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20}>
                    {stats.mistakesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#ef4444" fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-sm font-bold text-white">ZAcro erreur !</p>
                <p className="text-xs">Ton mental est d'acier.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full relative">
      
      {/* HEADER TABS - Clean & Intuitive */}
      <div className="flex border-b border-white/5 mb-8 overflow-x-auto hide-scrollbar gap-2">
        {[
          { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'LOGBOOK', icon: BookOpen, label: 'Logbook' },
          { id: 'PLAYBOOKS', icon: Target, label: 'Playbooks' },
          { id: 'REPORTS', icon: Activity, label: 'Reports' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all rounded-t-xl relative ${
              activeTab === tab.id ? 'text-white bg-[#111113] border-t border-l border-r border-white/5' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-violet-400' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACCOUNT SWITCHER - Flottant pour un "low cognitive load" */}
      {activeTab !== 'PLAYBOOKS' && activeTab !== 'REPORTS' && (
        <div className="flex items-center gap-2 mb-8 bg-[#111113] border border-white/5 p-1.5 rounded-xl w-fit">
          {['ALL', 'FUNDED_1', 'CHALLENGE'].map(acc => (
            <button 
              key={acc}
              onClick={() => setActiveAccount(acc)} 
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeAccount === acc ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              {acc === 'ALL' ? 'All Accounts' : acc.replace('_', ' ')}
            </button>
          ))}
        </div>
      )}

      {/* RENDER ACTIVE TAB */}
      <div className="min-h-[500px]">
        {activeTab === 'DASHBOARD' && renderDashboard()}
        {activeTab === 'LOGBOOK' && renderLogbook()}
        {activeTab === 'PLAYBOOKS' && renderPlaybooks()}
        {activeTab === 'REPORTS' && renderReports()}
      </div>

      {/* MODAL AJOUT TRADE - Operational & Low Cognitive Load */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#09090b] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#111113]">
              <h3 className="font-bold text-white flex items-center gap-2"><Plus className="w-5 h-5 text-violet-400"/> Log a Trade</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddTrade} className="p-6 overflow-y-auto space-y-8 flex-1">
              
              {/* SECTION 1: Base */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">The Basics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5">Asset / Ticker</label>
                    <input required type="text" placeholder="ex: NQ100" value={formData.asset} onChange={e => setFormData({...formData, asset: e.target.value.toUpperCase()})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-bold focus:border-violet-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5">Direction</label>
                    <select value={formData.direction} onChange={e => setFormData({...formData, direction: e.target.value as any})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white outline-none">
                      <option value="LONG">LONG</option>
                      <option value="SHORT">SHORT</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5">Date</label>
                    <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white outline-none" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: Execution & Strategy */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Execution & Setup</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5">Playbook / Setup</label>
                    <select value={formData.playbook} onChange={e => setFormData({...formData, playbook: e.target.value})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm font-bold text-white outline-none">
                      {DEFAULT_PLAYBOOKS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5 flex items-center gap-1"><span className="text-green-500">●</span> MFE (Max Profit $)</label>
                    <input type="number" placeholder="ex: 500" value={formData.mfe || ''} onChange={e => setFormData({...formData, mfe: Number(e.target.value)})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-green-500" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5 flex items-center gap-1"><span className="text-red-500">●</span> MAE (Max Drawdown $)</label>
                    <input type="number" placeholder="ex: 150" value={formData.mae ? Math.abs(formData.mae) : ''} onChange={e => setFormData({...formData, mae: -Math.abs(Number(e.target.value))})} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-red-500" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Mistakes (Low Cognitive Load multi-select) */}
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Mistakes Made</h4>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_MISTAKES.map(m => {
                    const isSelected = formData.mistakes?.includes(m);
                    return (
                      <button 
                        key={m} 
                        type="button"
                        onClick={() => toggleMistake(m)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isSelected ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-black text-zinc-500 border-white/5 hover:border-white/20'}`}
                      >
                        {m}
                      </button>
                    )
                  })}
                </div>
              </div>

            </form>
            
            {/* BOTTOM BAR: NET PnL & SAVE */}
            <div className="p-6 border-t border-white/5 bg-[#111113] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="w-full md:w-1/2">
                <label className="text-[10px] uppercase text-zinc-500 font-bold block mb-1.5">Net PnL ($)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">$</span>
                  <input required type="number" value={formData.pnl || ''} onChange={e => setFormData({...formData, pnl: Number(e.target.value)})} className={`w-full bg-black border-2 rounded-xl pl-8 pr-4 py-3 text-xl font-black outline-none transition-colors ${Number(formData.pnl) > 0 ? 'border-green-500/50 text-green-500' : Number(formData.pnl) < 0 ? 'border-red-500/50 text-red-500' : 'border-white/10 text-white'}`} />
                </div>
              </div>
              <button onClick={handleAddTrade} className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-xl font-black tracking-tight hover:scale-105 transition-transform flex items-center justify-center gap-2">
                SAVE TRADE <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
