const fs = require('fs');

const targetPath = 'src/components/views/TerminalView.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Imports
content = content.replace(
  'Activity, ShieldAlert, Target, BookOpen, BrainCircuit } from "lucide-react";',
  'Activity, ShieldAlert, Target, BookOpen, BrainCircuit, HelpCircle } from "lucide-react";\nimport { driver } from "driver.js";\nimport "driver.js/dist/driver.css";'
);

// 2. Start Tour function
const tourFunc = `
  const startTerminalTour = () => {
    setActiveTab('TRADING');
    setTimeout(() => {
      const d = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: 'Terminer',
        nextBtnText: 'Suivant \u2794',
        prevBtnText: '\u2B05 Précédent',
        steps: [
          {
            element: '#tour-terminal-tabs',
            popover: {
              title: 'Bienvenue dans le Terminal \uD83D\uDE80',
              description: 'Voici ton poste de pilotage professionnel. Tu peux basculer entre tes outils de Trading (Forex, Indices) et l\\'IA Crypto Web3.',
              side: 'bottom', align: 'start'
            }
          },
          {
            element: '#tour-market-sessions',
            popover: {
              title: 'Horaires des Marchés',
              description: 'Aligné automatiquement sur ton fuseau horaire. Suis l\\'ouverture de Londres ou New York pour trouver la volatilité.',
              side: 'bottom', align: 'center'
            }
          },
          {
            element: '#tour-eco-calendar',
            popover: {
              title: 'Calendrier Économique',
              description: 'Filtre les annonces majeures (NFP, CPI) pour ne pas te faire piéger par les manipulations institutionnelles.',
              side: 'top', align: 'start'
            }
          },
          {
            element: '#tour-heatmap',
            popover: {
              title: 'Heatmap des Devises',
              description: 'Identifie instantanément quelles monnaies sont fortes et faibles pour choisir les paires les plus explosives.',
              side: 'top', align: 'start'
            }
          },
          {
            element: '#tour-pos-calc',
            popover: {
              title: 'Le Bouclier Numéro 1',
              description: 'Rentre ton risque (ex: 1%) et ton Stop Loss. L\\'outil calcule la taille de Lot exacte. Ne trade JAMAIS sans lui.',
              side: 'bottom', align: 'center'
            }
          },
          {
            element: '#tour-prop-firm',
            popover: {
              title: 'Track tes Comptes Prop Firm',
              description: 'Surveille ton Daily Drawdown et tes limites pour ne jamais perdre ton compte financé bêtement.',
              side: 'bottom', align: 'center'
            }
          },
          {
            element: '#tour-recovery-calc',
            popover: {
              title: 'Plan de Récupération',
              description: 'En plein Drawdown ? Ce calculateur te dit mathématiquement combien de trades il te faut pour revenir à zéro (Breakeven).',
              side: 'bottom', align: 'center'
            }
          },
          {
            element: '#tour-risk-ruin',
            popover: {
              title: 'Test de Survie (Risk of Ruin)',
              description: 'Si ton risque de ruine est > 0%, tu finiras par cramer ton compte. Ajuste tes % de risque pour survivre à long terme.',
              side: 'top', align: 'center'
            }
          },
          {
            element: '#tour-edge-calc',
            popover: {
              title: 'As-tu un Avantage ?',
              description: 'Combine ton Win Rate et ton Risk/Reward pour savoir si ta stratégie est statistiquement gagnante (Edge > 0).',
              side: 'top', align: 'center'
            }
          },
          {
            element: '#tour-backtest',
            popover: {
              title: 'Le Laboratoire',
              description: 'Backteste tes idées dans le passé. Si la stratégie ne marche pas ici, elle ne marchera pas en réel.',
              side: 'top', align: 'center'
            }
          },
          {
            element: '#tour-trading-journal',
            popover: {
              title: 'Le Coeur du Réacteur',
              description: 'Ton Journal de Trading ultra-avancé. Enregistre tes trades, ajoute tes MFE/MAE et tes erreurs psychologiques. L\\'algorithme analysera tes performances et mettra à jour ton Radar RPG.',
              side: 'top', align: 'center'
            }
          }
        ]
      });
      d.drive();
    }, 100);
  };
`;
content = content.replace(
  'const [activeTab, setActiveTab] = useState<\'TRADING\' | \'CRYPTO\'>(\'TRADING\');',
  'const [activeTab, setActiveTab] = useState<\'TRADING\' | \'CRYPTO\'>(\'TRADING\');\n' + tourFunc
);

// 3. Add Tour Button in Header
content = content.replace(
  '{/* TABS SELECTOR */}',
  `{/* HEADER & TOUR BUTTON */}
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('TRADING')}
            className={\`text-sm font-bold tracking-widest uppercase transition-colors relative \${
              activeTab === 'TRADING' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }\`}
          >
            TRADING
            {activeTab === 'TRADING' && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('CRYPTO')}
            className={\`text-sm font-bold tracking-widest uppercase transition-colors relative \${
              activeTab === 'CRYPTO' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }\`}
          >
            CRYPTO
            {activeTab === 'CRYPTO' && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
            )}
          </button>
        </div>
        <button 
          onClick={startTerminalTour}
          className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <HelpCircle className="w-4 h-4" /> Tutoriel du Terminal
        </button>
      </div>`
);

// Remove the old TABS SELECTOR since we replaced it with the wrapper
content = content.replace(
  `<div className="flex items-center gap-8 mb-12 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveTab('TRADING')}
          className={\`text-sm font-bold tracking-widest uppercase transition-colors relative \${
            activeTab === 'TRADING' ? 'text-white' : 'text-white/30 hover:text-white/60'
          }\`}
        >
          TRADING
          {activeTab === 'TRADING' && (
            <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('CRYPTO')}
          className={\`text-sm font-bold tracking-widest uppercase transition-colors relative \${
            activeTab === 'CRYPTO' ? 'text-white' : 'text-white/30 hover:text-white/60'
          }\`}
        >
          CRYPTO
          {activeTab === 'CRYPTO' && (
            <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
          )}
        </button>
      </div>`,
  ``
);

// 4. Add IDs to tools
content = content.replace(
  '<div className="xl:col-span-12">\n                  <MarketSessions />',
  '<div className="xl:col-span-12" id="tour-market-sessions">\n                  <MarketSessions />'
);
content = content.replace(
  '<div className="xl:col-span-6 h-[500px]">\n                  <EconomicCalendar />',
  '<div className="xl:col-span-6 h-[500px]" id="tour-eco-calendar">\n                  <EconomicCalendar />'
);
content = content.replace(
  '<div className="xl:col-span-6 h-[500px]">\n                  <MarketHeatmap />',
  '<div className="xl:col-span-6 h-[500px]" id="tour-heatmap">\n                  <MarketHeatmap />'
);

content = content.replace(
  '<PositionCalculator />',
  '<div id="tour-pos-calc"><PositionCalculator /></div>'
);
content = content.replace(
  '<PropFirmManager />',
  '<div id="tour-prop-firm"><PropFirmManager /></div>'
);
content = content.replace(
  '<RecoveryCalculator />',
  '<div id="tour-recovery-calc"><RecoveryCalculator /></div>'
);

content = content.replace(
  '<RiskOfRuin />',
  '<div id="tour-risk-ruin"><RiskOfRuin /></div>'
);
content = content.replace(
  '<EdgeCalculator />',
  '<div id="tour-edge-calc"><EdgeCalculator /></div>'
);
content = content.replace(
  '<BacktestJournal />',
  '<div id="tour-backtest"><BacktestJournal /></div>'
);

content = content.replace(
  '<div className="grid grid-cols-1 gap-6">\n                <TradingJournal />',
  '<div className="grid grid-cols-1 gap-6" id="tour-trading-journal">\n                <TradingJournal />'
);


fs.writeFileSync(targetPath, content);
console.log('Successfully injected terminal tour!');
