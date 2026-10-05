const fs = require('fs');

let file = fs.readFileSync('src/components/tools/TradingJournal.tsx', 'utf8');

// 1. Destructure renameAccount
file = file.replace(
  'addPlaybook, removePlaybook } = useAppStore();',
  'addPlaybook, removePlaybook, renameAccount } = useAppStore();'
);

// 2. Inject Modal
const modalCode = `
      {/* MODAL GESTION COMPTES */}
      {isAccMgrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#09090b] border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#111113]">
              <h3 className="font-bold text-white flex items-center gap-2"><Edit2 className="w-5 h-5 text-blue-400"/> {tRoot.tjManageAcc || 'Gestion des Comptes'}</h3>
              <button onClick={() => setIsAccMgrOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4 bg-[#0a0a0c]">
              {accounts.length === 0 && <p className="text-zinc-500 text-center text-sm">{tRoot.tjNoAcc || 'Aucun compte'}</p>}
              {accounts.map(acc => (
                <div key={acc} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
                  <span className="text-white font-bold">{acc}</span>
                  <div className="flex gap-2">
                    <button onClick={() => {
                      const newName = window.prompt(tRoot.tjRenAccPrompt || 'Renommer le compte :', acc);
                      if (newName && newName.trim() !== '' && newName !== acc) {
                        renameAccount(acc, newName.trim());
                        if (activeAccount === acc) setActiveAccount(newName.trim());
                      }
                    }} className="p-1.5 text-blue-400 hover:bg-blue-500/20 rounded-md transition-colors" title={tRoot.tjRenameBtn || 'Renommer'}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => {
                      if (window.confirm(tRoot.tjDelAccPrompt || 'Supprimer ce compte et tous ses trades ?')) {
                        removeAccount(acc);
                        setTrades(trades.filter(t => t.account !== acc));
                        if (activeAccount === acc) setActiveAccount('ALL');
                      }
                    }} className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-md transition-colors" title={tRoot.tjDeleteBtn || 'Supprimer'}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={handleNewAccount}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors"
              >
                <Plus className="w-4 h-4" />
                {tRoot.tjAddAccBtn || 'Ajouter un compte'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AJOUT TRADE`;

file = file.replace('{/* MODAL AJOUT TRADE', modalCode);

fs.writeFileSync('src/components/tools/TradingJournal.tsx', file);
console.log('Injected account manager modal');
