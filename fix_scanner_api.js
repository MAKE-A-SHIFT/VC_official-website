const fs = require('fs');

let route = fs.readFileSync('src/app/api/scanner/route.ts', 'utf8');

route = route.replace("const model = genAI.getGenerativeModel({ model: 'gemini-pro' });", "const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });");

// Add lang param extraction
if (!route.includes("searchParams")) {
  route = route.replace(
    'export async function GET() {',
    'export async function GET(req: Request) {\n  const { searchParams } = new URL(req.url);\n  const lang = searchParams.get("lang") || "en";'
  );
}

// Update the prompt
route = route.replace(
  "Une analyse pointue et institutionnelle (en franÃ§ais, 3 phrases maximum)",
  "Une analyse pointue et institutionnelle (STRICTLY IN THIS LANGUAGE CODE: ${lang}, 3 phrases maximum)"
);

// We need to use template literals for the prompt if we inject ${lang}
route = route.replace(
  "const prompt = 'Tu es un analyste fondamental expert en cryptomonnaies travaillant pour un fonds institutionnel.\\nVoici les 5 applications dÃ©centralisÃ©es gÃ©nÃ©rant le plus de revenus (Real Yield) sur les 30 derniers jours :\\n' + JSON.stringify(protocolNames) + '\\n\\nPour CHAQUE protocole, gÃ©nÃ¨re une analyse sous format JSON STRICT. Ton retour doit Ãªtre un tableau d\\'objets avec ces clÃ©s exactes :\\n- \"name\": le nom exact du protocole\\n- \"ticker\": le symbole du jeton en MAJUSCULE\\n- \"category\": la catÃ©gorie (ex: DEX, Lending, Liquid Staking, Stablecoin, etc.)\\n- \"aiRiskScore\": une note parmi \"A+\", \"A\", \"B\", \"C\", \"D\"\\n- \"aiValuation\": une valeur parmi \"Sous-Ã©valuÃ©\", \"Juste prix\", \"SurÃ©valuÃ©\"\\n- \"competitors\": un tableau de 2 Ã  3 noms de concurrents directs (ex: [\"Aave\", \"Compound\"])\\n- \"aiAnalysis\": Une analyse pointue et institutionnelle (en franÃ§ais, 3 phrases maximum) expliquant l\\'avantage concurrentiel, le risque majeur et la thÃ¨se de valorisation basÃ©e sur les revenus.\\n\\nNe renvoie RIEN d\\'autre que le tableau JSON. Pas de texte introductif, pas de balises markdown. UNIQUEMENT le JSON valide.';",
  `const prompt = 'Tu es un analyste fondamental expert en cryptomonnaies travaillant pour un fonds institutionnel.\\nVoici les 5 applications dÃ©centralisÃ©es gÃ©nÃ©rant le plus de revenus (Real Yield) sur les 30 derniers jours :\\n' + JSON.stringify(protocolNames) + '\\n\\nPour CHAQUE protocole, gÃ©nÃ¨re une analyse sous format JSON STRICT. Ton retour doit Ãªtre un tableau d\\'objets avec ces clÃ©s exactes :\\n- "name": le nom exact du protocole\\n- "ticker": le symbole du jeton en MAJUSCULE\\n- "category": la catÃ©gorie (ex: DEX, Lending, Liquid Staking, Stablecoin, etc.)\\n- "aiRiskScore": une note parmi "A+", "A", "B", "C", "D"\\n- "aiValuation": STRICTLY USE ONE OF THESE EXACT STRINGS: "UNDERVALUED", "FAIR_VALUE", "OVERVALUED"\\n- "competitors": un tableau de 2 Ã  3 noms de concurrents directs (ex: ["Aave", "Compound"])\\n- "aiAnalysis": Une analyse pointue et institutionnelle (STRICTLY TRANSLATED TO THIS LANGUAGE CODE: ' + lang + ', 3 phrases maximum) expliquant l\\'avantage concurrentiel, le risque majeur et la thÃ¨se de valorisation basÃ©e sur les revenus.\\n\\nNe renvoie RIEN d\\'autre que le tableau JSON. Pas de texte introductif, pas de balises markdown. UNIQUEMENT le JSON valide.';`
);

// Also fix fallbackData aiValuation
route = route.replace(
  'aiValuation: ["Sous-Ã©valuÃ©", "Juste prix", "SurÃ©valuÃ©"][idx % 3],',
  'aiValuation: ["UNDERVALUED", "FAIR_VALUE", "OVERVALUED"][idx % 3],'
);

fs.writeFileSync('src/app/api/scanner/route.ts', route);
console.log('Fixed api/scanner/route.ts');
