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
import { Competitions } from "../tools/Competitions";
import { Trophy } from "lucide-react";
import { Activity, ShieldAlert, Target, BookOpen, BrainCircuit, HelpCircle } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function TerminalView() {
  const { language } = useAppStore();
  const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');
  const t = translations[language].terminal;

  const tourTranslations = {
    en: [
      { element: '#tour-terminal-tabs', popover: { title: 'Terminal Navigation', description: 'Switch between Traditional Trading and Crypto/Web3 tools here.', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Market Sessions', description: 'Track the overlapping global sessions. Volatility spikes when London and New York overlap.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Economic Calendar', description: 'Monitor high-impact news (NFP, CPI, FOMC). Avoid trading during these volatile spikes.', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Currency Strength', description: 'Identify the strongest and weakest currencies to trade with the momentum.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'The Ultimate Shield', description: 'Enter your risk (e.g., 1%) and Stop Loss. The tool calculates exact lot size. NEVER trade without it.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Prop Firm Tracker', description: 'Monitor your Daily Drawdown and limits so you never lose a funded account stupidly.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Recovery Plan', description: 'In a Drawdown? This calculator mathematically tells you how many trades to breakeven. Synced with your Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Survival Test (Risk of Ruin)', description: 'If your risk of ruin is > 0%, you will eventually blow your account. Adjust risk % to survive long-term.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Do you have an Edge?', description: 'Combine Win Rate and Risk/Reward to know if your strategy is statistically profitable.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'The Laboratory', description: 'Backtest ideas in the past. If it doesn\'t work here, it won\'t work in live trading.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'The Core Engine', description: 'Your advanced Trading Journal. Log trades, MFE/MAE, and psychological mistakes. All terminal tools will sync from this data.', side: 'top', align: 'center' } }
    ],
    fr: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navigation', description: 'Alterne entre le Trading Traditionnel et le Web3/Crypto.', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Sessions de Marché', description: 'Surveille le chevauchement des sessions. La volatilité explose quand Londres et New York sont ouverts en même temps.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendrier Économique', description: 'Garde un œil sur les annonces majeures (NFP, CPI, FOMC). Ne trade pas à l\'aveugle.', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Heatmap des Devises', description: 'Identifie les devises les plus fortes et les plus faibles pour trader dans le sens du flux.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'Le Bouclier Ultime', description: 'Définis ton risque (ex: 1%) et ton Stop Loss. L\'outil calcule la taille de lot exacte. Ne trade JAMAIS sans lui.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Tracker Prop Firm', description: 'Surveille ton Drawdown Journalier pour ne jamais perdre un compte financé bêtement.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Plan de Recovery', description: 'En Drawdown ? Cet outil te donne la roadmap mathématique pour revenir à zéro. Synchronisé avec ton Journal.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Test de Survie', description: 'Si ton risque de ruine est > 0%, tu finiras par cramer ton compte. Ajuste ton risque pour survivre.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'As-tu un Edge ?', description: 'Combine ton Win Rate et ton Risk/Reward pour savoir si ta stratégie a une espérance mathématique positive.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Le Laboratoire', description: 'Backteste tes idées. Si ça ne marche pas dans le passé, ça ne marchera pas en live.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Le Cœur du Réacteur', description: 'Ton Journal de Trading. Analyse ton exécution, tes erreurs psychologiques et ton Edge en temps réel.', side: 'top', align: 'center' } }
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
        nextBtnText: language === 'fr' ? 'Suivant \u2192' : 'Next \u2192',
        prevBtnText: language === 'fr' ? '\u2190 Précédent' : '\u2190 Prev',
        steps: steps as any
      });
      d.drive();
    }, 100);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 animate-in fade-in zoom-in-95 duration-500 mt-24">
      
      {/* HEADER & TOUR BUTTON */}
      <div className="flex flex-col md:flex-row relative justify-center items-center gap-6 md:gap-0 mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">
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
          className="md:absolute md:right-0 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] w-full md:w-auto justify-center"
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
                 <Activity className="w-4 h-4"/> Market Pulse
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
                 <ShieldAlert className="w-4 h-4"/> Risk Engine
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
                 <Target className="w-4 h-4"/> Edge & Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                <div id="tour-risk-ruin"><RiskOfRuin /></div>
                <div id="tour-edge-calc"><EdgeCalculator /></div>
                <div id="tour-backtest"><BacktestJournal /></div>
              </div>
            </section>

            {/* SECTION: LOGS (L'Enregistrement) */}
            <section className="animate-in fade-in duration-500 delay-150">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BookOpen className="w-4 h-4"/> Trading Journal
              </h2>
              <div className="grid grid-cols-1 gap-6" id="tour-trading-journal">
                <TradingJournal />
              </div>
            </section>
            
            {/* SECTION: COMPETITIONS TRADING */}
            <section className="animate-in fade-in duration-500 delay-200">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Tournaments & Proving Grounds
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Competitions type="TRADING" />
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

            {/* SECTION: COMPETITIONS CRYPTO */}
            <section className="animate-in fade-in duration-500 delay-100">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Crypto Tournaments
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Competitions type="CRYPTO" />
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
