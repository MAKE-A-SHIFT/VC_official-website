const fs = require('fs');

const targetPath = 'src/components/tools/TradingJournal.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Imports
content = content.replace(
  'Trash2, LayoutDashboard, Target } from "lucide-react";',
  'Trash2, LayoutDashboard, Target, HelpCircle } from "lucide-react";\nimport { driver } from "driver.js";\nimport "driver.js/dist/driver.css";'
);

// 2. Start Tour function
const tourFunc = `
  const startTour = () => {
    const d = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: 'Commencer !',
      nextBtnText: 'Suivant \u2794',
      prevBtnText: '\u2B05 Précédent',
      steps: [
        {
          element: '#tour-header',
          popover: {
            title: 'Bienvenue dans ton Journal Pro \uD83D\uDE80',
            description: 'Cet outil remplace les vieux journaux Excel. Il calcule automatiquement tes stats et repère tes mauvaises habitudes.',
            side: 'bottom', align: 'start'
          }
        },
        {
          element: '#tour-account-switcher',
          popover: {
            title: 'Filtre par Compte',
            description: 'Sépare tes trades Funded, Challenge ou Perso pour analyser tes performances sans les mélanger.',
            side: 'bottom', align: 'center'
          }
        },
        {
          element: '#tour-kpis',
          popover: {
            title: 'KPIs en Temps Réel',
            description: 'Ton PnL Net, Win Rate et Profit Factor s\\'actualisent instantanément à chaque nouveau trade.',
            side: 'bottom', align: 'start'
          }
        },
        {
          element: '#tour-rpg-stats',
          popover: {
            title: 'Ton Profil Psychologique',
            description: 'C\\'est ici qu\\'on gamifie. Fais une erreur (ex: FOMO), et tes statistiques de discipline baisseront. Gère bien ton risque, et ton niveau montera.',
            side: 'left', align: 'start'
          }
        },
        {
          element: '#tour-tabs',
          popover: {
            title: 'Navigue dans tes Données',
            description: 'Explore tes Rapports, évalue tes Stratégies (Playbooks) et consulte ton registre complet de trades.',
            side: 'top', align: 'center'
          }
        },
        {
          element: '#tour-tab-LOGBOOK',
          popover: {
            title: 'Ajoute ton Premier Trade !',
            description: 'Clique sur cet onglet, puis sur "Add Trade" pour démarrer. Déclare tes profits, tes Drawdowns (MFE/MAE) et laisse la magie opérer.',
            side: 'bottom', align: 'center'
          }
        }
      ]
    });
    
    setActiveTab('DASHBOARD');
    setTimeout(() => d.drive(), 300);
  };
`;
content = content.replace(
  'const { language } = useAppStore();\n  const t = (translations[language].terminal as any) || {};',
  'const { language } = useAppStore();\n  const t = (translations[language].terminal as any) || {};\n' + tourFunc
);

// 3. Header
content = content.replace(
  `<div>
            <h3 className="font-bold text-white">Journal Automatisé</h3>`,
  `<div id="tour-header">
            <h3 className="font-bold text-white flex items-center gap-2">
              Journal Automatisé
              <button onClick={startTour} className="bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 px-2 py-1 rounded flex items-center gap-1 text-[10px] uppercase font-bold border border-violet-500/20 transition-colors">
                <HelpCircle className="w-3 h-3" /> Comment ça marche ?
              </button>
            </h3>`
);

// 4. Account Switcher
content = content.replace(
  `<div className="flex items-center gap-2 mb-8 bg-[#111113] border border-white/5 p-1.5 rounded-xl w-fit">`,
  `<div id="tour-account-switcher" className="flex items-center gap-2 mb-8 bg-[#111113] border border-white/5 p-1.5 rounded-xl w-fit">`
);

// 5. KPIs
content = content.replace(
  `<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">`,
  `<div id="tour-kpis" className="grid grid-cols-2 lg:grid-cols-4 gap-6">`
);

// 6. RPG
content = content.replace(
  `<div className="bg-[#111113] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" /> RPG Stats`,
  `<div id="tour-rpg-stats" className="bg-[#111113] border border-white/5 rounded-2xl p-6">
          <h4 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" /> RPG Stats`
);

// 7. Tabs Container
content = content.replace(
  `<div className="flex border-b border-white/5 mb-8 overflow-x-auto hide-scrollbar gap-2">`,
  `<div id="tour-tabs" className="flex border-b border-white/5 mb-8 overflow-x-auto hide-scrollbar gap-2">`
);

// 8. Individual Tabs
content = content.replace(
  `onClick={() => setActiveTab(tab.id as any)}`,
  `id={"tour-tab-" + tab.id}\n            onClick={() => setActiveTab(tab.id as any)}`
);

fs.writeFileSync(targetPath, content);
console.log('Successfully injected driver.js tour!');
