const fs = require('fs');

let journal = fs.readFileSync('src/components/tools/TradingJournal.tsx', 'utf8');

// We need to add the Edit2 icon import
if (!journal.includes('Edit2')) {
  journal = journal.replace('import { Crosshair, ', 'import { Crosshair, Edit2, ');
}

// We need to inject the Edit button next to the Trash2 button in accountManagerUI
const editButton = `
    {activeAccount !== 'ALL' && (
      <button onClick={() => {
        const newName = window.prompt('Renommer le compte :', activeAccount);
        if (newName && newName.trim() && newName.trim() !== activeAccount) {
          const finalName = newName.trim();
          addAccount(finalName);
          setTrades(trades.map(t => t.account === activeAccount ? { ...t, account: finalName } : t));
          removeAccount(activeAccount);
          setActiveAccount(finalName);
        }
      }} className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 transition-colors" title="Renommer ce compte">
        <Edit2 className="w-4 h-4" />
      </button>
    )}
`;

// Insert the editButton before the Trash2 button
journal = journal.replace(
  /{activeAccount !== 'ALL' && \(\s*<button onClick=\{\(\) => \{\s*if \(window\.confirm\('Supprimer ce compte et tous ses trades \?'\)\)/g,
  editButton + `\n    {activeAccount !== 'ALL' && (\n      <button onClick={() => {\n        if (window.confirm('Supprimer ce compte et tous ses trades ?'))`
);

fs.writeFileSync('src/components/tools/TradingJournal.tsx', journal);
console.log('Fixed TradingJournal (Edit Account)!');
