const fs = require('fs');

const targetPath = 'src/components/views/TerminalView.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// We will use regex to completely replace everything inside <div className="space-y-16 mb-24"> ... </div>
const startMarker = '<div className="space-y-16 mb-24">';
const endMarker = '</div>\n    </div>\n  );\n}';

const newTabsContent = `
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
`;

const startIndex = content.indexOf(startMarker);
const lastDivIndex = content.lastIndexOf('</div>\n    </div>\n  );\n}');

if (startIndex !== -1 && lastDivIndex !== -1) {
  content = content.substring(0, startIndex + startMarker.length) + '\n' + newTabsContent + '\n      ' + content.substring(lastDivIndex);
  fs.writeFileSync(targetPath, content);
  console.log('Fixed TerminalView structure!');
} else {
  console.error('Could not find markers');
}
