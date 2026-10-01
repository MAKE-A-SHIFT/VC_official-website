"use client";
import { useState, useMemo } from "react";
import { BookOpen, Plus, Trash2, TrendingUp, Shield } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";

type JournalEntry = { id: number; date: string; asset: string; direction: "LONG" | "SHORT"; result: number; note: string };

const mockEntries: JournalEntry[] = [
  { id: 1, date: "12/09", asset: "DAX", direction: "LONG", result: 2.5, note: "" },
  { id: 2, date: "13/09", asset: "DAX", direction: "SHORT", result: -1, note: "" },
  { id: 3, date: "14/09", asset: "NASDAQ", direction: "LONG", result: 4.2, note: "" },
  { id: 4, date: "15/09", asset: "DAX", direction: "LONG", result: 1.5, note: "" },
  { id: 5, date: "18/09", asset: "NASDAQ", direction: "SHORT", result: -1, note: "" },
  { id: 6, date: "19/09", asset: "DAX", direction: "LONG", result: 3.1, note: "" },
  { id: 7, date: "20/09", asset: "DAX", direction: "SHORT", result: -1, note: "" },
  { id: 8, date: "21/09", asset: "GOLD", direction: "LONG", result: -1, note: "" },
  { id: 9, date: "22/09", asset: "NASDAQ", direction: "LONG", result: 5.4, note: "" },
];

export function TradingJournal() {
  const { language } = useAppStore();
  const t = translations[language].terminal as any;

  // Reste du code...

  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [asset, setAsset] = useState("DAX");
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [result, setResult] = useState<number>(0);

  const addEntry = () => {
    setEntries([...entries, { id: Date.now(), date: new Date().toLocaleDateString('fr-FR', {day: '2-digit', month: '2-digit'}), asset, direction, result, note: "" }]);
  };
  const removeEntry = (id: number) => setEntries(entries.filter(e => e.id !== id));

  // Compute XP Curve Data
  const xpData = useMemo(() => {
    let currentXP = 0;
    return entries.map(e => {
      currentXP += e.result;
      return {
        date: e.date,
        xp: Number(currentXP.toFixed(1))
      };
    });
  }, [entries]);

  // Compute Radar Stats dynamically based on entries
  const radarData = useMemo(() => {
    const total = entries.length;
    if (total === 0) return [];
    
    const wins = entries.filter(e => e.result > 0);
    const losses = entries.filter(e => e.result < 0);
    const winRate = (wins.length / total) * 100;
    
    // Risk Management: penalize big losses (result <= -1.5)
    const bigLosses = losses.filter(e => e.result <= -1.5).length;
    const riskMgmt = Math.max(100 - (bigLosses * 15), 10);
    
    // Money Management: rewards high average wins
    const avgWin = wins.reduce((acc, e) => acc + e.result, 0) / (wins.length || 1);
    const moneyMgmt = Math.min((avgWin / 2) * 100, 100);
    
    // Emotional Control: derived from consistency and risk management
    const emotional = Math.round((riskMgmt + winRate) / 2);
    
    // Psychology: Combine of Money Mgmt, Risk Mgmt, and Emotional Control
    const psychology = Math.round((moneyMgmt + riskMgmt + emotional) / 3);

    // Trading Styles (Simulated for RPG effect but reactive)
    const scalping = Math.min(80 + (total % 10), 100);
    const dayTrading = Math.min(85 + (wins.length % 5), 100);
    const swingTrading = 35; // Fixed lower for Day/Scalp profile

    // Analysis (Opposed: Technical vs Fundamental)
    const technical = Math.min(85 + (avgWin * 3), 100);
    const fundamental = 100 - technical;

    // Trading: The ultimate combined stat
    const trading = Math.round((psychology + winRate + dayTrading + technical) / 4);

    return [
      { subject: "Money Mgmt", A: Math.round(moneyMgmt), fullMark: 100 },
      { subject: "Risk Mgmt", A: Math.round(riskMgmt), fullMark: 100 },
      { subject: "Emotional", A: Math.round(emotional), fullMark: 100 },
      { subject: "Psychology", A: Math.round(psychology), fullMark: 100 },
      { subject: "Win Rate", A: Math.round(winRate), fullMark: 100 },
      { subject: "Scalping", A: Math.round(scalping), fullMark: 100 },
      { subject: "Swing", A: Math.round(swingTrading), fullMark: 100 },
      { subject: "Day Trading", A: Math.round(dayTrading), fullMark: 100 },
      { subject: "Fundamental", A: Math.round(fundamental), fullMark: 100 },
      { subject: "Technical", A: Math.round(technical), fullMark: 100 },
      { subject: "Trading", A: Math.round(trading), fullMark: 100 },
    ];
  }, [entries]);

  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* HEADER */}
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-blue-400" />
        <h3 className="text-2xl font-bold tracking-tight">{t.tjTitle}</h3>
      </div>

      {/* GAMIFICATION CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* XP CURVE (Equity) */}
        <div className="xl:col-span-2 glass-panel p-6 rounded-2xl border border-white/5 bg-[#050f05] shadow-[0_0_30px_rgba(34,197,94,0.03)] relative overflow-hidden flex flex-col h-[350px]">
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.xpCurve}</h4>
          </div>
          <div className="flex-1 w-full min-h-0 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={xpData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="xp" 
                  stroke="#22c55e" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0a0a0a', stroke: '#22c55e', strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: '#22c55e' }}
                  style={{ filter: 'drop-shadow(0px 0px 8px rgba(34,197,94,0.4))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* SKILL TREE (Radar) */}
        <div className="xl:col-span-1 glass-panel p-6 rounded-2xl border border-white/5 bg-[#0a0510] shadow-[0_0_30px_rgba(139,92,246,0.03)] relative overflow-hidden flex flex-col h-[350px]">
          <div className="flex items-center gap-2 mb-2 relative z-10">
            <Shield className="w-4 h-4 text-violet-500" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.skillTree}</h4>
          </div>
          <div className="flex-1 w-full min-h-0 -mt-2 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff90', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Stats"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.4}
                  style={{ filter: 'drop-shadow(0px 0px 10px rgba(139,92,246,0.5))' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        </div>
        
      </div>

      {/* TABLE & INPUTS */}
      <div className="glass-panel p-6 rounded-2xl w-full border border-white/5 bg-[#0a0a0a] flex flex-col h-[400px]">
        <div className="flex flex-wrap gap-3 mb-6 items-center bg-black/30 p-3 rounded-xl border border-white/5">
          <input type="text" value={asset} onChange={e => setAsset(e.target.value.toUpperCase())} className="w-24 bg-black/50 border border-white/10 rounded-lg p-2.5 text-white outline-none text-xs focus:border-blue-500/50 uppercase font-bold transition-colors" placeholder={t.asset} />
          <select value={direction} onChange={e => setDirection(e.target.value as "LONG"|"SHORT")} className="w-28 bg-black/50 border border-white/10 rounded-lg p-2.5 text-white outline-none text-xs focus:border-blue-500/50 font-bold transition-colors">
            <option value="LONG">LONG</option>
            <option value="SHORT">SHORT</option>
          </select>
          <input type="number" step="0.1" value={result} onChange={e => setResult(Number(e.target.value))} className="w-24 bg-black/50 border border-white/10 rounded-lg p-2.5 text-white outline-none text-xs focus:border-blue-500/50 font-bold transition-colors" placeholder="R:R" />
          <button onClick={addEntry} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 ml-auto text-xs shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Plus className="w-4 h-4" /> {t.btnAdd}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar rounded-lg border border-white/5">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111] sticky top-0 z-10 shadow-md">
              <tr>
                <th className="p-3 text-white/50 font-medium tracking-wider">{t.date}</th>
                <th className="p-3 text-white/50 font-medium tracking-wider">{t.asset}</th>
                <th className="p-3 text-white/50 font-medium tracking-wider">{t.dir}</th>
                <th className="p-3 text-white/50 font-medium tracking-wider">{t.res}</th>
                <th className="p-3 text-white/50 font-medium text-right tracking-wider">{t.action}</th>
              </tr>
            </thead>
            <tbody>
              {entries.slice().reverse().map(e => (
                <tr key={e.id} className="border-t border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="p-3 text-zinc-500">{e.date}</td>
                  <td className="p-3 font-bold text-white">{e.asset}</td>
                  <td className={`p-3 font-bold ${e.direction === "LONG" ? "text-blue-400" : "text-red-400"}`}>{e.direction}</td>
                  <td className={`p-3 font-mono font-bold ${e.result >= 0 ? "text-green-500" : "text-red-500"}`}>{e.result > 0 ? `+${e.result}R` : `${e.result}R`}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => removeEntry(e.id)} className="text-white/20 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4 inline" /></button>
                  </td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-white/30 italic">{t.noTrades}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
