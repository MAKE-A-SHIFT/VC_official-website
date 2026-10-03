const fs = require('fs');

const targetPath = 'src/components/tools/TradingJournal.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Remove local Trade interface to avoid clash and import it from useAppStore
content = content.replace(
  'import { useAppStore } from "@/store/useAppStore";',
  'import { useAppStore, Trade } from "@/store/useAppStore";'
);
content = content.replace(
  /\/\/ --- TYPES ---\r?\ninterface Trade \{[\s\S]*?\}\r?\n/,
  ''
);

// 2. Change state to use useAppStore
content = content.replace(
  '  const [activeAccount, setActiveAccount] = useState<string>(\'ALL\');\r\n  \r\n  // Trades State (avec LocalStorage pour la persistance)\r\n  const [trades, setTrades] = useState<Trade[]>([]);',
  '  const { trades, setTrades, activeAccount, setActiveAccount } = useAppStore();'
);

// Wait, the line endings might be \n or \r\n, let's use a more flexible regex
content = content.replace(/const \[activeAccount, setActiveAccount\] = useState<string>\('ALL'\);[\s\S]*?const \[trades, setTrades\] = useState<Trade\[\]>\(\[\]\);/, 'const { trades, setTrades, activeAccount, setActiveAccount } = useAppStore();');

// 3. Update the calculate stats function to return both General and Account specific stats
content = content.replace(
  /const stats = useMemo\(\(\) => \{[\s\S]*?\}, \[filteredTrades\]\);/,
  `
  // Stats Account Specifique
  const stats = useMemo(() => {
    const totalPnL = filteredTrades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = filteredTrades.filter(t => t.pnl > 0);
    const losses = filteredTrades.filter(t => t.pnl < 0);
    const winRate = filteredTrades.length ? (wins.length / filteredTrades.length) * 100 : 0;
    
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? 99 : 0) : (grossProfit / grossLoss);
    
    const avgWin = wins.length ? grossProfit / wins.length : 0;
    const avgLoss = losses.length ? grossLoss / losses.length : 0;
    const edge = (winRate/100 * avgWin) - ((1 - winRate/100) * avgLoss);

    let cumulative = 0;
    const xpData = [...filteredTrades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(t => {
      cumulative += t.pnl;
      return { date: t.date, pnl: cumulative };
    });

    const mistakesCost: Record<string, number> = {};
    losses.forEach(t => {
      t.mistakes.forEach(m => {
        mistakesCost[m] = (mistakesCost[m] || 0) + Math.abs(t.pnl);
      });
    });
    const mistakesData = Object.keys(mistakesCost).map(k => ({ name: k, lost: mistakesCost[k] })).sort((a, b) => b.lost - a.lost);

    const playbooks: Record<string, { wins: number, total: number, pnl: number }> = {};
    filteredTrades.forEach(t => {
      if (!playbooks[t.playbook]) playbooks[t.playbook] = { wins: 0, total: 0, pnl: 0 };
      playbooks[t.playbook].total += 1;
      if (t.pnl > 0) playbooks[t.playbook].wins += 1;
      playbooks[t.playbook].pnl += t.pnl;
    });

    return { totalPnL, winRate, profitFactor, edge, xpData, mistakesData, playbooks, winCount: wins.length, lossCount: losses.length };
  }, [filteredTrades]);

  // Stats Globales (GENERAL)
  const generalStats = useMemo(() => {
    const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = trades.filter(t => t.pnl > 0);
    const losses = trades.filter(t => t.pnl < 0);
    const winRate = trades.length ? (wins.length / trades.length) * 100 : 0;
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? 99 : 0) : (grossProfit / grossLoss);
    const avgWin = wins.length ? grossProfit / wins.length : 0;
    const avgLoss = losses.length ? grossLoss / losses.length : 0;
    const edge = (winRate/100 * avgWin) - ((1 - winRate/100) * avgLoss);
    return { totalPnL, winRate, profitFactor, edge, winCount: wins.length, lossCount: losses.length };
  }, [trades]);
  `
);

// 4. Twin Dashboard rendering and RPG stats change
const newDashboardRender = `
  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Jumeaux: GENERAL vs SELECTED ACCOUNT */}
      <div className="flex items-center gap-4 mb-2">
        <h3 className="font-bold text-white text-lg">Comparaison des Performances</h3>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* DASHBOARD GENERAL */}
        <div className="bg-[#111113]/50 border border-white/5 rounded-2xl p-6 relative">
          <div className="absolute -top-3 right-4 bg-zinc-800 text-white text-[10px] font-bold px-2 py-1 rounded">GENERAL (Tous les comptes)</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Net PnL</p>
              <p className={\`text-2xl font-black tracking-tighter \${generalStats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}\`}>
                {generalStats.totalPnL >= 0 ? '+' : ''}\${generalStats.totalPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Win Rate</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-white tracking-tighter">{generalStats.winRate.toFixed(1)}%</p>
                <p className="text-[10px] text-zinc-500 mb-1">{generalStats.winCount}W - {generalStats.lossCount}L</p>
              </div>
            </div>
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Profit Factor</p>
              <p className="text-2xl font-black text-white tracking-tighter">{generalStats.profitFactor.toFixed(2)}</p>
            </div>
            <div className="bg-blue-900/10 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-blue-500/20 blur-2xl rounded-full"></div>
              <p className="text-[10px] text-blue-300/50 font-bold tracking-widest uppercase">Trading Edge</p>
              <p className={\`text-xl font-black \${generalStats.edge >= 0 ? 'text-blue-400' : 'text-red-400'}\`}>
                {generalStats.edge >= 0 ? '+' : ''}\${generalStats.edge.toFixed(2)}/trade
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD SELECTED ACCOUNT */}
        <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 relative shadow-[0_0_20px_rgba(139,92,246,0.05)]">
          <div className="absolute -top-3 right-4 bg-violet-600 text-white text-[10px] font-bold px-2 py-1 rounded">{activeAccount === 'ALL' ? 'TOUS' : activeAccount.replace('_', ' ')}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Net PnL</p>
              <p className={\`text-2xl font-black tracking-tighter \${stats.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}\`}>
                {stats.totalPnL >= 0 ? '+' : ''}\${stats.totalPnL.toLocaleString()}
              </p>
            </div>
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Win Rate</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-black text-white tracking-tighter">{stats.winRate.toFixed(1)}%</p>
                <p className="text-[10px] text-zinc-500 mb-1">{stats.winCount}W - {stats.lossCount}L</p>
              </div>
            </div>
            <div className="bg-[#09090b] border border-white/5 rounded-xl p-4 flex flex-col justify-between">
              <p className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">Profit Factor</p>
              <p className="text-2xl font-black text-white tracking-tighter">{stats.profitFactor.toFixed(2)}</p>
            </div>
            <div className="bg-violet-900/10 border border-violet-500/20 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-violet-500/20 blur-2xl rounded-full"></div>
              <p className="text-[10px] text-violet-300/50 font-bold tracking-widest uppercase">Trading Edge</p>
              <p className={\`text-xl font-black \${stats.edge >= 0 ? 'text-violet-400' : 'text-red-400'}\`}>
                {stats.edge >= 0 ? '+' : ''}\${stats.edge.toFixed(2)}/trade
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Charts: Equity Curve & Radar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div id="tour-xp-curve" className="xl:col-span-2 bg-[#111113] border border-white/5 rounded-2xl p-6">
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
                  <YAxis stroke="#3f3f46" fontSize={10} tickFormatter={(val) => \`$\${val}\`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#22c55e', fontWeight: 'bold' }}
                  />
                  <Area type="step" dataKey="pnl" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorPnL)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-600 text-sm">Pas assez de données.</div>
            )}
          </div>
        </div>

        <div id="tour-rpg-stats" className="bg-[#111113] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" /> Your Traders Stats
          </h4>
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={[
                { subject: "Psychologie", A: stats.mistakesData.some(m => m.name === "FOMO" || m.name === "Revenge Trading") ? 50 : 90 },
                { subject: "Risk Mgmt", A: stats.mistakesData.some(m => m.name === "Overleveraged") ? 40 : 100 },
                { subject: "Patience", A: stats.mistakesData.some(m => m.name === "Hesitation") ? 60 : 85 },
                { subject: "Exécution", A: 90 },
                { subject: "Analyse", A: stats.winRate },
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
`;
content = content.replace(
  /const renderDashboard = \(\) => \([\s\S]*?\);\r?\n\r?\n  const renderLogbook/m,
  newDashboardRender + '\n\n  const renderLogbook'
);

fs.writeFileSync(targetPath, content);
console.log('Successfully injected twin dashboard, RPG stats, and Zustand store interconnection in TradingJournal!');
