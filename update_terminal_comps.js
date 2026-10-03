const fs = require('fs');

const targetPath = 'src/components/views/TerminalView.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Add Import
content = content.replace(
  'import { CryptoAIScanner } from "../tools/CryptoAIScanner";',
  'import { CryptoAIScanner } from "../tools/CryptoAIScanner";\nimport { CompetitionsRadar } from "../tools/CompetitionsRadar";\nimport { Trophy } from "lucide-react";'
);

// 2. Add TRADING section
content = content.replace(
  '{/* SECTION: LOGS (L\'Enregistrement) */}',
  `{/* SECTION: COMPETITIONS TRADING */}
            <section className="animate-in fade-in duration-500 delay-200">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> Global Trading Competitions
              </h2>
              <div className="mb-16">
                <CompetitionsRadar category="TRADING" />
              </div>
            </section>

            {/* SECTION: LOGS (L\'Enregistrement) */}`
);

// 3. Add CRYPTO section
content = content.replace(
  '        {activeTab === \'CRYPTO\' && (\n          <>\n            {/* SECTION: WEB3 & CRYPTO INTELLIGENCE */}',
  `        {activeTab === 'CRYPTO' && (
          <>
            {/* SECTION: WEB3 & CRYPTO INTELLIGENCE */}`
);

// The exact string to replace in CRYPTO tab is tricky. Let's find the closing tag of the Web3 section.
// A simpler way is to replace the closing `</section>` of CryptoAIScanner.
const cryptoEndStr = `</section>\n          </>\n        )}`;
const newCryptoContent = `</section>

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
        )}`;

content = content.replace(cryptoEndStr, newCryptoContent);

fs.writeFileSync(targetPath, content);
console.log('Successfully injected CompetitionsRadar into TerminalView!');
