const fs = require('fs');

const targetPath = 'src/components/views/TerminalView.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// The new tour function with i18n
const multiLangTour = `
  const tourTranslations: Record<string, any[]> = {
    fr: [
      { element: '#tour-terminal-tabs', popover: { title: 'Bienvenue dans le Terminal \uD83D\uDE80', description: 'Voici ton poste de pilotage professionnel. Tu peux basculer entre tes outils de Trading (Forex, Indices) et l\\'IA Crypto Web3.', side: 'bottom', align: 'start' } },
      { element: '#tour-market-sessions', popover: { title: 'Horaires des Marchés', description: 'Aligné automatiquement sur ton fuseau horaire. Suis l\\'ouverture de Londres ou New York pour trouver la volatilité.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendrier Économique', description: 'Filtre les annonces majeures (NFP, CPI) pour ne pas te faire piéger par les manipulations institutionnelles.', side: 'top', align: 'start' } },
      { element: '#tour-heatmap', popover: { title: 'Heatmap des Devises', description: 'Identifie instantanément quelles monnaies sont fortes et faibles pour choisir les paires les plus explosives.', side: 'top', align: 'start' } },
      { element: '#tour-pos-calc', popover: { title: 'Le Bouclier Numéro 1', description: 'Rentre ton risque (ex: 1%) et ton Stop Loss. L\\'outil calcule la taille de Lot exacte. Ne trade JAMAIS sans lui.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Track tes Comptes Prop Firm', description: 'Surveille ton Daily Drawdown et tes limites pour ne jamais perdre ton compte financé bêtement.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Plan de Récupération', description: 'En plein Drawdown ? Ce calculateur te dit mathématiquement combien de trades il te faut pour revenir à zéro (Breakeven). Synchronisé avec ton Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Test de Survie (Risk of Ruin)', description: 'Si ton risque de ruine est > 0%, tu finiras par cramer ton compte. Ajuste tes % de risque pour survivre à long terme.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'As-tu un Avantage ?', description: 'Combine ton Win Rate et ton Risk/Reward pour savoir si ta stratégie est statistiquement gagnante (Edge > 0).', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Le Laboratoire', description: 'Backteste tes idées dans le passé. Si la stratégie ne marche pas ici, elle ne marchera pas en réel.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Le Coeur du Réacteur', description: 'Ton Journal de Trading ultra-avancé. Enregistre tes trades, ajoute tes MFE/MAE et tes erreurs psychologiques. Tous les outils du terminal puiseront dans ces données.', side: 'top', align: 'center' } }
    ],
    en: [
      { element: '#tour-terminal-tabs', popover: { title: 'Welcome to the Terminal \uD83D\uDE80', description: 'Your professional trading cockpit. Switch between Trading tools and Web3 Crypto AI.', side: 'bottom', align: 'start' } },
      { element: '#tour-market-sessions', popover: { title: 'Market Sessions', description: 'Automatically aligned to your local timezone. Track London or New York opens for volatility.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Economic Calendar', description: 'Filter major news (NFP, CPI) to avoid institutional manipulation traps.', side: 'top', align: 'start' } },
      { element: '#tour-heatmap', popover: { title: 'Currency Heatmap', description: 'Instantly identify which currencies are strong and weak for explosive setups.', side: 'top', align: 'start' } },
      { element: '#tour-pos-calc', popover: { title: 'The Ultimate Shield', description: 'Enter your risk (e.g., 1%) and Stop Loss. The tool calculates exact lot size. NEVER trade without it.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Prop Firm Tracker', description: 'Monitor your Daily Drawdown and limits so you never lose a funded account stupidly.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Recovery Plan', description: 'In a Drawdown? This calculator mathematically tells you how many trades to breakeven. Synced with your Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Survival Test (Risk of Ruin)', description: 'If your risk of ruin is > 0%, you will eventually blow your account. Adjust risk % to survive long-term.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Do you have an Edge?', description: 'Combine Win Rate and Risk/Reward to know if your strategy is statistically profitable.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'The Laboratory', description: 'Backtest ideas in the past. If it doesn\\'t work here, it won\\'t work in live trading.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'The Core Engine', description: 'Your advanced Trading Journal. Log trades, MFE/MAE, and psychological mistakes. All terminal tools will sync from this data.', side: 'top', align: 'center' } }
    ]
  };

  const startTerminalTour = () => {
    setActiveTab('TRADING');
    const steps = tourTranslations[language === 'fr' ? 'fr' : 'en'];
    setTimeout(() => {
      const d = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: language === 'fr' ? 'Terminer' : 'Finish',
        nextBtnText: language === 'fr' ? 'Suivant \u2794' : 'Next \u2794',
        prevBtnText: language === 'fr' ? '\u2B05 Précédent' : '\u2B05 Prev',
        steps: steps
      });
      d.drive();
    }, 100);
  };
`;

// Replace old startTerminalTour completely
content = content.replace(
  /const startTerminalTour = \(\) => \{[\s\S]*?\}, 100\);\r?\n  \};\r?\n/,
  multiLangTour + '\n'
);

fs.writeFileSync(targetPath, content);
console.log('Successfully injected multi-language terminal tour!');
