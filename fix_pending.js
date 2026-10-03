const fs = require('fs');

// 1. ShowcaseView (Landing Page CTA)
let showcase = fs.readFileSync('src/components/views/ShowcaseView.tsx', 'utf8');
const terminalBtn = `
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a href="https://t.me/vc_teamparaguay" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors w-full sm:w-auto">
            {t.heroCta} <ArrowRight className="w-5 h-5" />
          </a>
          <button onClick={toggleTerminalMode} className="inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors w-full sm:w-auto">
            Rejoindre TA Salle des Marchés <MonitorPlay className="w-5 h-5" />
          </button>
        </div>
`;
showcase = showcase.replace(
  /<a href="https:\/\/t\.me\/vc_teamparaguay"[^>]*>[\s\S]*?<\/a>\s*<\/section>/,
  terminalBtn + '\n      </section>'
);
fs.writeFileSync('src/components/views/ShowcaseView.tsx', showcase);

// 2. TerminalView (Responsiveness)
let terminal = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');
terminal = terminal.replace(
  '<div className="flex relative justify-center items-center mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">',
  '<div className="flex flex-col md:flex-row relative justify-center items-center gap-6 md:gap-0 mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">'
);
terminal = terminal.replace(
  'className="absolute right-0 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"',
  'className="md:absolute md:right-0 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] w-full md:w-auto justify-center"'
);
fs.writeFileSync('src/components/views/TerminalView.tsx', terminal);

// 3. Competitions (URLs)
let comps = fs.readFileSync('src/components/tools/Competitions.tsx', 'utf8');
// Add url to data
comps = comps.replace('hybrid: false,\n    },', 'hybrid: false, url: "https://www.worldcupchampionships.com/world-cup-trading-championships",\n    },');
comps = comps.replace('hybrid: false,\n    },', 'hybrid: false, url: "https://darwinexzero.com",\n    },');
comps = comps.replace('hybrid: true,\n    },', 'hybrid: true, url: "https://ftmo.com",\n    },');
comps = comps.replace('hybrid: false,\n      }', 'hybrid: false, url: "https://topstep.com",\n      }');
// Crypto array
comps = comps.replace('hybrid: false,\n    },', 'hybrid: false, url: "https://www.bybit.com/en/wsot2024",\n    },');
comps = comps.replace('hybrid: false,\n    },', 'hybrid: false, url: "https://www.binance.com/en/futures-activity/tournament",\n    },');
comps = comps.replace('hybrid: true,\n    },', 'hybrid: true, url: "https://ftmo.com",\n    },');
comps = comps.replace('hybrid: false,\n      }', 'hybrid: false, url: "https://www.okx.com",\n      }');

// Change button
comps = comps.replace(
  /<button className="w-full mt-6 bg-white\/5 hover:bg-white\/10 text-white font-bold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">\s*<Swords className="w-4 h-4" \/> S'inscrire \/ Info\s*<\/button>/g,
  `<button onClick={() => window.open(comp.url || '#', '_blank')} className="w-full mt-6 bg-white/5 hover:bg-white/10 text-white font-bold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
              <Swords className="w-4 h-4" /> S'inscrire / Info
            </button>`
);
fs.writeFileSync('src/components/tools/Competitions.tsx', comps);

console.log('Fixed Showcase, TerminalView, and Competitions!');
