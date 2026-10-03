const fs = require('fs');

let term = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');

if (!term.includes('tRoot')) {
  term = term.replace('const t = translations[language].terminal;', 'const t = translations[language].terminal;\n  const tRoot = translations[language];');
}

term = term.replace(/Tutoriel du Terminal/g, "{tRoot.termTour}");
term = term.replace(/Tournaments & Proving Grounds/, "{tRoot.termCompTrading}");
term = term.replace(/Crypto Tournaments/, "{tRoot.termCompCrypto}");
term = term.replace(/Web3 & Crypto Intelligence/, "{tRoot.termWeb3}");

fs.writeFileSync('src/components/views/TerminalView.tsx', term);
console.log('Fixed TerminalView.tsx i18n!');
