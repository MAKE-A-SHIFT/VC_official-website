const fs = require('fs');

let tj = fs.readFileSync('src/components/tools/TradingJournal.tsx', 'utf8');

// The language state is already extracted in TradingJournal:
// const { language } = useAppStore();
// const t = translations[language].terminal; 
// WAIT! I injected translations into the ROOT of the language object, not terminal. 
// So I should use translations[language].tjNewPbPrompt, NOT t.tjNewPbPrompt (because t = terminal).
// Let's create a local const tRoot = translations[language];

if (!tj.includes('tRoot')) {
  tj = tj.replace('const t = translations[language].terminal;', 'const t = translations[language].terminal;\n  const tRoot = translations[language];');
}

tj = tj.replace(/window\.prompt\("Nom de la nouvelle méthode \(Playbook\) :"\)/, 'window.prompt(tRoot.tjNewPbPrompt)');
tj = tj.replace(/window\.prompt\("Nom du nouveau compte :"\)/, 'window.prompt(tRoot.tjNewAccPrompt)');
tj = tj.replace(/window\.prompt\('Renommer le compte :', activeAccount\)/, "window.prompt(tRoot.tjRenAccPrompt, activeAccount)");
tj = tj.replace(/window\.confirm\('Supprimer ce compte et tous ses trades \?'\)/, "window.confirm(tRoot.tjDelAccPrompt)");
tj = tj.replace(/Comparaison des Performances/, "{tRoot.tjCompPerf}");

fs.writeFileSync('src/components/tools/TradingJournal.tsx', tj);
console.log('Fixed TradingJournal.tsx i18n!');
