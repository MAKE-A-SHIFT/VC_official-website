const fs = require('fs');

const targetPath = 'src/components/views/TerminalView.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Import Competitions
if (!content.includes('import { Competitions }')) {
  content = content.replace(
    'import { CryptoAIScanner } from "../tools/CryptoAIScanner";',
    'import { CryptoAIScanner } from "../tools/CryptoAIScanner";\nimport { Competitions } from "../tools/Competitions";'
  );
}

// 2. Center Tabs
content = content.replace(
  '<div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">',
  '<div className="flex relative justify-center items-center mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">'
);
content = content.replace(
  '<button \n            onClick={startTerminalTour}\n            className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"\n          >',
  '<button \n            onClick={startTerminalTour}\n            className="absolute right-0 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"\n          >'
);

// 3. Add TRADING competitions
const tradingCompetitionsSection = `
            {/* SECTION: COMPETITIONS */}
            <section className="animate-in fade-in duration-500 delay-200">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Tournaments & Proving Grounds
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Competitions type="TRADING" />
              </div>
            </section>
          </>
`;
content = content.replace(
  '</section>\n          </>\n        )}',
  '</section>\n' + tradingCompetitionsSection + '\n        )}'
);

// 4. Add CRYPTO competitions
const cryptoCompetitionsSection = `
            {/* SECTION: COMPETITIONS CRYPTO */}
            <section className="animate-in fade-in duration-500 delay-100 mt-16">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Crypto Tournaments
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Competitions type="CRYPTO" />
              </div>
            </section>
          </>
`;
content = content.replace(
  '</section>\n          </>\n        )}\n\n      </div>',
  '</section>\n' + cryptoCompetitionsSection + '\n        )}\n\n      </div>'
);

// Also need Trophy icon
if (!content.includes('Trophy')) {
  content = content.replace('HelpCircle } from "lucide-react";', 'HelpCircle, Trophy } from "lucide-react";');
}

fs.writeFileSync(targetPath, content);
console.log('Successfully injected Competitions and centered tabs!');
