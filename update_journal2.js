const fs = require('fs');
const targetPath = 'src/components/tools/TradingJournal.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Hook up the new store methods and fields
content = content.replace(
  'const { trades, setTrades, activeAccount, setActiveAccount } = useAppStore();',
  'const { trades, setTrades, activeAccount, setActiveAccount, accounts, addAccount, removeAccount, playbooks, addPlaybook, removePlaybook } = useAppStore();'
);

content = content.replace(/const AVAILABLE_ACCOUNTS = \[.*?\];\r?\n/, '');
content = content.replace(/const DEFAULT_PLAYBOOKS = \[.*?\];\r?\n/, '');

content = content.replace(/AVAILABLE_ACCOUNTS/g, 'accounts');
content = content.replace(/DEFAULT_PLAYBOOKS/g, 'playbooks');

const promptNewPlaybook = `
  const handleNewPlaybook = () => {
    const name = window.prompt("Nom de la nouvelle méthode (Playbook) :");
    if (name && name.trim()) {
      addPlaybook(name.trim());
    }
  };
  const handleNewAccount = () => {
    const name = window.prompt("Nom du nouveau compte :");
    if (name && name.trim()) {
      addAccount(name.trim());
    }
  };
`;

content = content.replace(
  'const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);',
  'const [isAddTradeOpen, setIsAddTradeOpen] = useState(false);\n' + promptNewPlaybook + '\n' +
  'const [dashLeftFilter, setDashLeftFilter] = useState("ALL");\n' +
  'const [dashRightFilter, setDashRightFilter] = useState("ALL");\n' + 
  'useEffect(() => { setDashRightFilter(activeAccount === "ALL" ? "ALL" : "ACC_" + activeAccount); }, [activeAccount]);\n'
);

content = content.replace(
  /<button[^>]*>\s*\+\s*New playbook\s*<\/button>/gi,
  '<button onClick={handleNewPlaybook} className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors text-sm border-dashed">+ New playbook</button>'
);
content = content.replace(
  /<button[^>]*>\s*\+\s*New Playbook\s*<\/button>/gi,
  '<button type="button" onClick={handleNewPlaybook} className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:bg-white/10 hover:text-white transition-colors text-sm border-dashed">+ New playbook</button>'
);

content = content.replace(
  /const generalStats = useMemo\(\(\) => \{[\s\S]*?\}, \[trades\]\);/,
  `
  const calculateDashboardStats = (filter: string) => {
    let targetTrades = trades;
    if (filter !== "ALL") {
      if (filter.startsWith("ACC_")) {
        const acc = filter.replace("ACC_", "");
        targetTrades = trades.filter(t => t.account === acc);
      } else if (filter.startsWith("PB_")) {
        const pb = filter.replace("PB_", "");
        targetTrades = trades.filter(t => t.playbook === pb);
      }
    }
    const totalPnL = targetTrades.reduce((sum, t) => sum + t.pnl, 0);
    const wins = targetTrades.filter(t => t.pnl > 0);
    const losses = targetTrades.filter(t => t.pnl < 0);
    const winRate = targetTrades.length ? (wins.length / targetTrades.length) * 100 : 0;
    const grossProfit = wins.reduce((sum, t) => sum + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((sum, t) => sum + t.pnl, 0));
    const profitFactor = grossLoss === 0 ? (grossProfit > 0 ? 99 : 0) : (grossProfit / grossLoss);
    const avgWin = wins.length ? grossProfit / wins.length : 0;
    const avgLoss = losses.length ? grossLoss / losses.length : 0;
    const edge = (winRate/100 * avgWin) - ((1 - winRate/100) * avgLoss);
    return { totalPnL, winRate, profitFactor, edge, winCount: wins.length, lossCount: losses.length, targetTrades };
  };

  const leftStats = useMemo(() => calculateDashboardStats(dashLeftFilter), [trades, dashLeftFilter]);
  const rightStats = useMemo(() => calculateDashboardStats(dashRightFilter), [trades, dashRightFilter]);
  `
);

content = content.replace(/generalStats\.totalPnL/g, 'leftStats.totalPnL');
content = content.replace(/generalStats\.winRate/g, 'leftStats.winRate');
content = content.replace(/generalStats\.winCount/g, 'leftStats.winCount');
content = content.replace(/generalStats\.lossCount/g, 'leftStats.lossCount');
content = content.replace(/generalStats\.profitFactor/g, 'leftStats.profitFactor');
content = content.replace(/generalStats\.edge/g, 'leftStats.edge');

content = content.replace(/stats\.totalPnL( >= 0 \? '\+' : '')\}/g, 'rightStats.totalPnL$1}');
content = content.replace(/stats\.totalPnL\.toLocaleString\(\)/g, 'rightStats.totalPnL.toLocaleString()');
content = content.replace(/stats\.totalPnL >= 0/g, 'rightStats.totalPnL >= 0');
content = content.replace(/stats\.winRate/g, 'rightStats.winRate');
content = content.replace(/stats\.winCount/g, 'rightStats.winCount');
content = content.replace(/stats\.lossCount/g, 'rightStats.lossCount');
content = content.replace(/stats\.profitFactor/g, 'rightStats.profitFactor');
content = content.replace(/stats\.edge/g, 'rightStats.edge');

const renderFilterSelect = (valName, setFuncName, bgClass) => `
  <select value={${valName}} onChange={e => ${setFuncName}(e.target.value)} className="absolute -top-3 right-4 ${bgClass} text-white text-[10px] font-bold px-2 py-1 rounded outline-none cursor-pointer">
    <option value="ALL">GENERAL (ALL)</option>
    <optgroup label="Comptes">
      {accounts.map(acc => <option key={acc} value={"ACC_"+acc}>COMPTE: {acc}</option>)}
    </optgroup>
    <optgroup label="Méthodes">
      {playbooks.map(pb => <option key={pb} value={"PB_"+pb}>METHODE: {pb}</option>)}
    </optgroup>
  </select>
`;

content = content.replace(
  /<div className="absolute -top-3 right-4 bg-zinc-800 text-white text-\[10px\] font-bold px-2 py-1 rounded">GENERAL \(Tous les comptes\)<\/div>/,
  renderFilterSelect('dashLeftFilter', 'setDashLeftFilter', 'bg-zinc-800')
);

content = content.replace(
  /<div className="absolute -top-3 right-4 bg-violet-600 text-white text-\[10px\] font-bold px-2 py-1 rounded">\{activeAccount === 'ALL' \? 'TOUS' : activeAccount\.replace\('_', ' '\)\}<\/div>/,
  renderFilterSelect('dashRightFilter', 'setDashRightFilter', 'bg-violet-600')
);

const accountManagerUI = `
  <div className="flex items-center gap-2">
    <select 
      value={activeAccount} 
      onChange={e => setActiveAccount(e.target.value)}
      className="bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-violet-500/50 text-sm"
    >
      <option value="ALL">All accounts</option>
      {accounts.map(acc => (
        <option key={acc} value={acc}>{acc}</option>
      ))}
    </select>
    <button onClick={handleNewAccount} className="p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors" title="Ajouter un compte">
      <Plus className="w-4 h-4" />
    </button>
    {activeAccount !== 'ALL' && (
      <button onClick={() => {
        if (window.confirm('Supprimer ce compte et tous ses trades ?')) {
          setTrades(trades.filter(t => t.account !== activeAccount));
          removeAccount(activeAccount);
          setActiveAccount('ALL');
        }
      }} className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 text-red-500 transition-colors" title="Supprimer ce compte">
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  </div>
`;

content = content.replace(
  /<select\s+value=\{activeAccount\}[\s\S]*?<\/select>/,
  accountManagerUI
);

fs.writeFileSync(targetPath, content);
console.log('Successfully applied journaling updates (Accounts, Playbooks, Dashboards)!');
