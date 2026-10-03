const fs = require('fs');

let tv = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');

const cryptoSteps = {
  fr: ", { element: '#tour-crypto-scanner', popover: { title: 'Scanner Crypto IA', description: 'Une IA (Gemini) analyse en temps réel les revenus et valorisations des dApps Web3.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Tournois Crypto', description: 'Affronte d\\'autres traders sur les marchés cryptos.', side: 'top', align: 'center' } }",
  en: ", { element: '#tour-crypto-scanner', popover: { title: 'Crypto AI Scanner', description: 'An AI (Gemini) analyzes real-time Web3 dApps revenues and valuations.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Crypto Tournaments', description: 'Compete against other traders in crypto markets.', side: 'top', align: 'center' } }",
  it: ", { element: '#tour-crypto-scanner', popover: { title: 'Scanner Crypto IA', description: 'Un\\'IA analizza in tempo reale le entrate e le valutazioni delle dApp Web3.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Tornei Crypto', description: 'Gareggia contro altri trader nei mercati crypto.', side: 'top', align: 'center' } }",
  es: ", { element: '#tour-crypto-scanner', popover: { title: 'Escáner Crypto IA', description: 'Una IA analiza en tiempo real los ingresos y valoraciones de las dApps Web3.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Torneos Crypto', description: 'Compite contra otros traders en mercados crypto.', side: 'top', align: 'center' } }",
  de: ", { element: '#tour-crypto-scanner', popover: { title: 'Krypto-KI-Scanner', description: 'Eine KI analysiert Echtzeit-Einnahmen und Bewertungen von Web3-dApps.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Krypto-Turniere', description: 'Treten Sie auf Kryptomärkten gegen andere Trader an.', side: 'top', align: 'center' } }",
  ru: ", { element: '#tour-crypto-scanner', popover: { title: 'Крипто Сканер ИИ', description: 'ИИ анализирует доходы и оценки Web3 dApps в реальном времени.', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: 'Крипто Турниры', description: 'Соревнуйтесь с другими трейдерами на крипторынках.', side: 'top', align: 'center' } }",
  ja: ", { element: '#tour-crypto-scanner', popover: { title: '暗号資産AIスキャナー', description: 'AIがWeb3 dAppsの収益と評価をリアルタイムで分析します。', side: 'top', align: 'center' } }, { element: '#tour-crypto-competitions', popover: { title: '暗号資産トーナメント', description: '暗号資産市場で他のトレーダーと競い合います。', side: 'top', align: 'center' } }"
};

for (const lang in cryptoSteps) {
  const pattern = new RegExp(`(tour-competitions.*?'top', align: 'center' \\} \\})\\n\\s*\\](,|\\n)`, 'g');
  tv = tv.replace(pattern, `$1${cryptoSteps[lang]}\n    ]$2`);
}

fs.writeFileSync('src/components/views/TerminalView.tsx', tv);
console.log('Injected Crypto steps into Tour');
