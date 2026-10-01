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
import { Activity, ShieldAlert, Target, BookOpen, BrainCircuit } from "lucide-react";

import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function TerminalView() {
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 animate-in fade-in zoom-in-95 duration-500 mt-20">
      <div className="space-y-16 mb-24">
        
        {/* SECTION: PULSE (Contexte de Marché) */}
        <section>
          <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
             <Activity className="w-4 h-4"/> {t.termPulse}
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-12">
              <MarketSessions />
            </div>
            <div className="xl:col-span-6 h-[500px]">
              <EconomicCalendar />
            </div>
            <div className="xl:col-span-6 h-[500px]">
              <MarketHeatmap />
            </div>
          </div>
        </section>

        {/* SECTION: RISK ENGINE (La Défense) */}
        <section>
          <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
             <ShieldAlert className="w-4 h-4"/> {t.termRisk}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            <PositionCalculator />
            <PropFirmManager />
            <RecoveryCalculator />
          </div>
        </section>

        {/* SECTION: EDGE & STRATEGY (L'Offensive) */}
        <section>
          <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
             <Target className="w-4 h-4"/> {t.termEdge}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
            <RiskOfRuin />
            <EdgeCalculator />
            <BacktestJournal />
          </div>
        </section>

        {/* SECTION: WEB3 & CRYPTO INTELLIGENCE */}
        <section>
          <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
             <BrainCircuit className="w-4 h-4"/> Web3 & Crypto Intelligence
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <CryptoAIScanner />
          </div>
        </section>

        {/* SECTION: LOGS (L'Enregistrement) */}
        <section>
          <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
             <BookOpen className="w-4 h-4"/> {t.termJournal}
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <TradingJournal />
          </div>
        </section>

      </div>
    </div>
  );
}
