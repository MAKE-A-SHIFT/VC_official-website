const fs = require('fs');

let tj = fs.readFileSync('src/components/tools/TradingJournal.tsx', 'utf8');

// 1. Add isAccMgrOpen state
if (!tj.includes('const [isAccMgrOpen')) {
  tj = tj.replace(
    'const [isAddModalOpen, setIsAddModalOpen] = useState(false);',
    'const [isAddModalOpen, setIsAddModalOpen] = useState(false);\n  const [isAccMgrOpen, setIsAccMgrOpen] = useState(false);'
  );
}

// 2. Wrap the account switcher and inject the Edit icon
const newAccSwitcher = `
      {activeTab !== 'PLAYBOOKS' && activeTab !== 'REPORTS' && (
        <div className="flex items-center gap-3 mb-8">
          <div id="tour-account-switcher" className="flex items-center gap-2 bg-[#111113] border border-white/5 p-1.5 rounded-xl w-fit">
            {['ALL', ...accounts].map(acc => (
              <button 
                key={acc}
                onClick={() => setActiveAccount(acc)} 
                className={\`px-4 py-1.5 text-xs font-bold rounded-lg transition-all \${activeAccount === acc ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}\`}
              >
                {acc === 'ALL' ? 'All Accounts' : acc.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsAccMgrOpen(true)} 
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-zinc-400 hover:text-white transition-colors flex items-center justify-center" 
            title="Gérer les comptes"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      )}
`;

tj = tj.replace(
  /\{activeTab !== 'PLAYBOOKS' && activeTab !== 'REPORTS' && \([\s\S]*?<div id="tour-account-switcher"[\s\S]*?<\/div>\s*\)\}/,
  newAccSwitcher
);

// 3. Fix the New Playbook button
tj = tj.replace(
  /<button className="text-sm font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1">\s*<Plus className="w-4 h-4"\/> New Playbook\s*<\/button>/g,
  '<button onClick={handleNewPlaybook} className="text-sm font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1"><Plus className="w-4 h-4"/> New Playbook</button>'
);

// 4. Inject AccountManagerModal at the end before </div>
const accountManagerModal = `
      {/* MODAL GESTION DES COMPTES */}
      {isAccMgrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#09090b] border border-white/10 w-full max-w-md rounded-3xl p-6 relative shadow-2xl">
            <button onClick={() => setIsAccMgrOpen(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-amber-500" /> Gestion des Comptes
            </h3>
            
            <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {accounts.map(acc => (
                <div key={acc} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <span className="font-bold text-sm text-white">{acc.replace(/_/g, ' ')}</span>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      const newName = window.prompt(tRoot.tjRenAccPrompt, acc.replace(/_/g, ' '));
                      if (newName && newName.trim() && newName.trim() !== acc.replace(/_/g, ' ')) {
                        const finalName = newName.trim().replace(/\\s+/g, '_').toUpperCase();
                        addAccount(finalName);
                        setTrades(trades.map(t => t.account === acc ? { ...t, account: finalName } : t));
                        removeAccount(acc);
                        if(activeAccount === acc) setActiveAccount(finalName);
                      }
                    }} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Renommer">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => {
                      if (window.confirm(tRoot.tjDelAccPrompt)) {
                        removeAccount(acc);
                        setTrades(trades.filter(t => t.account !== acc));
                        if(activeAccount === acc) setActiveAccount('ALL');
                      }
                    }} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Supprimer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <p className="text-sm text-zinc-500 text-center py-4">Aucun compte créé.</p>
              )}
            </div>
            
            <button onClick={() => {
              const name = window.prompt(tRoot.tjNewAccPrompt);
              if (name && name.trim()) addAccount(name.trim().replace(/\\s+/g, '_').toUpperCase());
            }} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors text-sm text-white">
              <Plus className="w-4 h-4"/> Ajouter un compte
            </button>
          </div>
        </div>
      )}
`;

tj = tj.replace('    </div>\n  );\n}', accountManagerModal + '    </div>\n  );\n}');

fs.writeFileSync('src/components/tools/TradingJournal.tsx', tj);
console.log('Fixed buttons in TradingJournal!');
