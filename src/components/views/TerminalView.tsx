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
import { Activity, ShieldAlert, Target, BookOpen, BrainCircuit, HelpCircle } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function TerminalView() {
  const { language } = useAppStore();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');

  const startTerminalTour = () => {
    setActiveTab('TRADING');
    setTimeout(() => {
      const d = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: 'Terminer',
        nextBtnText: 'Suivant ➔',
        prevBtnText: '⬅ Précédent',
        steps: [
          {
            element: '#tour-terminal-tabs',
            popover: {
              title: 'Bienvenue dans le Terminal 🚀',
              description: 'Voici ton poste de pilotage professionnel. Tu peux basculer entre tes outils de Trading (Forex, Indices) et l\'IA Crypto Web3.',
              side: 'bottom', align: 'start'
            }
          },
          {
            element: '#tour-market-sessions',
            popover: {
              title: 'Horaires des Marchés',
              description: 'Aligné automatiquement sur ton fuseau horaire. Suis l\'ouverture de Londres ou New York pour trouver la volatilité.',
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
              description: 'Rentre ton risque (ex: 1%) et ton Stop Loss. L\'outil calcule la taille de Lot exacte. Ne trade JAMAIS sans lui.',
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
              description: 'Ton Journal de Trading ultra-avancé. Enregistre tes trades, ajoute tes MFE/MAE et tes erreurs psychologiques. L\'algorithme analysera tes performances et mettra à jour ton Radar RPG.',
              side: 'top', align: 'center'
            }
          }
        ]
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

            {/* SECTION: LOGS (L'Enregistrement) */}
            <section className="animate-in fade-in duration-500 delay-150">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BookOpen className="w-4 h-4"/> {t.termJournal}
              </h2>
              <div className="grid grid-cols-1 gap-6" id="tour-trading-journal">
                <TradingJournal />
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
