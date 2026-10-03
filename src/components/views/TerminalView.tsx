"use client";
import { useState } from "react";
import { PositionCalculator } from "../tools/PositionCalculator";
import { EconomicCalendar } from "../tools/EconomicCalendar";
import { RiskOfRuin } from "../tools/RiskOfRuin";
import { EdgeCalculator } from "../tools/EdgeCalculator";
import { TradingJournal } from "../tools/TradingJournal";
import { BacktestJournal } from "../tools/BacktestJournal";
import { PropFirmManager } from "../tools/PropFirmManager";
import { RecoveryCalculator } from "../tools/RecoveryCalculator";
import { MarketSessions } from "../tools/MarketSessions";
import { MarketHeatmap } from "../tools/MarketHeatmap";
import { CryptoAIScanner } from "../tools/CryptoAIScanner";
import { CompetitionsRadar } from "../tools/CompetitionsRadar";
import { Trophy } from "lucide-react";
import { Activity, ShieldAlert, Target, BookOpen, BrainCircuit, HelpCircle } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function TerminalView() {
  const { language } = useAppStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');

  
  const tourTranslations: Record<string, any[]> = {
    fr: [
      { element: '#tour-terminal-tabs', popover: { title: 'Bienvenue dans le Terminal 🚀', description: 'Voici ton poste de pilotage professionnel. Tu peux basculer entre tes outils de Trading (Forex, Indices) et l\'IA Crypto Web3.', side: 'bottom', align: 'start' } },
      { element: '#tour-market-sessions', popover: { title: 'Horaires des Marchés', description: 'Aligné automatiquement sur ton fuseau horaire. Suis l\'ouverture de Londres ou New York pour trouver la volatilité.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendrier Économique', description: 'Filtre les annonces majeures (NFP, CPI) pour ne pas te faire piéger par les manipulations institutionnelles.', side: 'top', align: 'start' } },
      { element: '#tour-heatmap', popover: { title: 'Heatmap des Devises', description: 'Identifie instantanément quelles monnaies sont fortes et faibles pour choisir les paires les plus explosives.', side: 'top', align: 'start' } },
      { element: '#tour-pos-calc', popover: { title: 'Le Bouclier Numéro 1', description: 'Rentre ton risque (ex: 1%) et ton Stop Loss. L\'outil calcule la taille de Lot exacte. Ne trade JAMAIS sans lui.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Track tes Comptes Prop Firm', description: 'Surveille ton Daily Drawdown et tes limites pour ne jamais perdre ton compte financé bêtement.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Plan de Récupération', description: 'En plein Drawdown ? Ce calculateur te dit mathématiquement combien de trades il te faut pour revenir à zéro (Breakeven). Synchronisé avec ton Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Test de Survie (Risk of Ruin)', description: 'Si ton risque de ruine est > 0%, tu finiras par cramer ton compte. Ajuste tes % de risque pour survivre à long terme.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'As-tu un Avantage ?', description: 'Combine ton Win Rate et ton Risk/Reward pour savoir si ta stratégie est statistiquement gagnante (Edge > 0).', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Le Laboratoire', description: 'Backteste tes idées dans le passé. Si la stratégie ne marche pas ici, elle ne marchera pas en réel.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Le Coeur du Réacteur', description: 'Ton Journal de Trading ultra-avancé. Enregistre tes trades, ajoute tes MFE/MAE et tes erreurs psychologiques. Tous les outils du terminal puiseront dans ces données.', side: 'top', align: 'center' } }
    ],
    en: [
      { element: '#tour-terminal-tabs', popover: { title: 'Welcome to the Terminal 🚀', description: 'Your professional trading cockpit. Switch between Trading tools and Web3 Crypto AI.', side: 'bottom', align: 'start' } },
      { element: '#tour-market-sessions', popover: { title: 'Market Sessions', description: 'Automatically aligned to your local timezone. Track London or New York opens for volatility.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Economic Calendar', description: 'Filter major news (NFP, CPI) to avoid institutional manipulation traps.', side: 'top', align: 'start' } },
      { element: '#tour-heatmap', popover: { title: 'Currency Heatmap', description: 'Instantly identify which currencies are strong and weak for explosive setups.', side: 'top', align: 'start' } },
      { element: '#tour-pos-calc', popover: { title: 'The Ultimate Shield', description: 'Enter your risk (e.g., 1%) and Stop Loss. The tool calculates exact lot size. NEVER trade without it.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Prop Firm Tracker', description: 'Monitor your Daily Drawdown and limits so you never lose a funded account stupidly.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Recovery Plan', description: 'In a Drawdown? This calculator mathematically tells you how many trades to breakeven. Synced with your Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Survival Test (Risk of Ruin)', description: 'If your risk of ruin is > 0%, you will eventually blow your account. Adjust risk % to survive long-term.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Do you have an Edge?', description: 'Combine Win Rate and Risk/Reward to know if your strategy is statistically profitable.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'The Laboratory', description: 'Backtest ideas in the past. If it doesn\'t work here, it won\'t work in live trading.', side: 'top', align: 'center' } },
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
        nextBtnText: language === 'fr' ? 'Suivant ➔' : 'Next ➔',
        prevBtnText: language === 'fr' ? '⬅ Précédent' : '⬅ Prev',
        steps: steps
      });
      d.drive();
    }, 100);
  };



  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 animate-in fade-in zoom-in-95 duration-500 mt-24">
      
      {/* HEADER & TOUR BUTTON */}
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('TRADING')}
            className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'TRADING' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            TRADING
            {activeTab === 'TRADING' && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('CRYPTO')}
            className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'CRYPTO' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
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
      </div>
      

      <div className="space-y-16 mb-24">
        
        {activeTab === 'TRADING' && (
          <>
            {/* SECTION: PULSE (Contexte de Marché) */}
            <section className="animate-in fade-in duration-500">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Activity className="w-4 h-4"/> {t.termPulse}
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-12" id="tour-market-sessions">
                  <MarketSessions />
                </div>
                <div className="xl:col-span-6 h-[500px]" id="tour-eco-calendar">
                  <EconomicCalendar />
                </div>
                <div className="xl:col-span-6 h-[500px]" id="tour-heatmap">
                  <MarketHeatmap />
                </div>
              </div>
            </section>

            {/* SECTION: RISK ENGINE (La Défense) */}
            <section className="animate-in fade-in duration-500 delay-75">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4"/> {t.termRisk}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                <div id="tour-pos-calc"><PositionCalculator /></div>
                <div id="tour-prop-firm"><PropFirmManager /></div>
                <div id="tour-recovery-calc"><RecoveryCalculator /></div>
              </div>
            </section>

            {/* SECTION: EDGE & STRATEGY (L'Offensive) */}
            <section className="animate-in fade-in duration-500 delay-100">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Target className="w-4 h-4"/> {t.termEdge}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                <div id="tour-risk-ruin"><RiskOfRuin /></div>
                <div id="tour-edge-calc"><EdgeCalculator /></div>
                <div id="tour-backtest"><BacktestJournal /></div>
              </div>
            </section>

            {/* SECTION: COMPETITIONS TRADING */}
            <section className="animate-in fade-in duration-500 delay-200">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Global Trading Competitions
              </h2>
              <div className="mb-16">
                <CompetitionsRadar category="TRADING" />
              </div>
            </section>

            {/* SECTION: LOGS (L'Enregistrement) */}
            <section className="animate-in fade-in duration-500 delay-150">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BookOpen className="w-4 h-4"/> {t.termJournal}
              </h2>
              <div className="grid grid-cols-1 gap-6" id="tour-trading-journal">
                <TradingJournal />
              </div>
            </section>

            {/* SECTION: COMPETITIONS CRYPTO */}
            <section className="animate-in fade-in duration-500 delay-100 mt-16">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Crypto Tournaments
              </h2>
              <div>
                <CompetitionsRadar category="CRYPTO" />
              </div>
            </section>
          </>
        )}

        {activeTab === 'CRYPTO' && (
          <>
            {/* SECTION: WEB3 & CRYPTO INTELLIGENCE */}
            <section className="animate-in fade-in duration-500">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BrainCircuit className="w-4 h-4"/> Web3 & Crypto Intelligence
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <CryptoAIScanner />
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
