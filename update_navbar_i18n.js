const fs = require('fs');
const path = 'src/i18n/index.ts';
let content = fs.readFileSync(path, 'utf8');

const additions = {
  fr: "navTerminal: 'TERMINAL', navShowcase: 'L\\'ACADÉMIE',",
  en: "navTerminal: 'TERMINAL', navShowcase: 'ACADEMY',",
  es: "navTerminal: 'TERMINAL', navShowcase: 'ACADEMIA',",
  it: "navTerminal: 'TERMINALE', navShowcase: 'ACCADEMIA',",
  de: "navTerminal: 'TERMINAL', navShowcase: 'AKADEMIE',",
  ru: "navTerminal: 'ТЕРМИНАЛ', navShowcase: 'АКАДЕМИЯ',",
  ja: "navTerminal: 'ターミナル', navShowcase: 'アカデミー',"
};

for (const [lang, extraKeys] of Object.entries(additions)) {
  const regex = new RegExp(lang + ':\\s*{');
  content = content.replace(regex, lang + ': {\n    ' + extraKeys);
}

fs.writeFileSync(path, content);
