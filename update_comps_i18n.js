const fs = require('fs');

let comps = fs.readFileSync('src/components/tools/Competitions.tsx', 'utf8');

if (!comps.includes('useAppStore') || !comps.includes('translations')) {
  comps = comps.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { useAppStore } from "@/store/useAppStore";\nimport { translations } from "@/i18n";');
  comps = comps.replace(
    'export function Competitions({ type }: { type: \'TRADING\' | \'CRYPTO\' }) {',
    'export function Competitions({ type }: { type: \'TRADING\' | \'CRYPTO\' }) {\n  const { language } = useAppStore();\n  const t = translations[language];'
  );
}

comps = comps.replace(/Compétitions \{type === 'TRADING' \? 'Trading Pro' : 'Crypto & Web3'\}/, "{type === 'TRADING' ? t.compTitleTrading : t.compTitleCrypto}");
comps = comps.replace(/Rechercher des compétitions/, "{t.compSearch}");
comps = comps.replace(/Recherche en cours\.\.\./, "{t.compSearching}");
comps = comps.replace(/S'inscrire \/ Info/g, "{t.compJoin}");
comps = comps.replace(/Hybride \(Trad\/Crypto\)/g, "{t.compHybrid}");

comps = comps.replace(/<DollarSign className="w-4 h-4"\/> Prize<\/span>/g, '<DollarSign className="w-4 h-4"/> {t.compPrize}</span>');
comps = comps.replace(/<Target className="w-4 h-4"\/> Entry<\/span>/g, '<Target className="w-4 h-4"/> {t.compEntry}</span>');
comps = comps.replace(/<CalendarDays className="w-4 h-4"\/> Date<\/span>/g, '<CalendarDays className="w-4 h-4"/> {t.compDate}</span>');

fs.writeFileSync('src/components/tools/Competitions.tsx', comps);
console.log('Fixed Competitions.tsx i18n!');
