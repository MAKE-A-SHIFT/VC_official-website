import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cache cette API pendant 6 heures (21600 secondes)
export const revalidate = 21600;

export async function GET() {
  try {
    // 1. Check de la clé API
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Clé API Gemini manquante" }, { status: 500 });
    }

    // 2. Fetch DefiLlama (Top protocoles par frais/revenus générés)
    const llamaRes = await fetch('https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees');
    const llamaData = await llamaRes.json();
    
    // On garde uniquement les dApps (pas les blockchains L1/L2) et on prend le top 5 en revenus 30j
    const topProtocols = llamaData.protocols
      .filter((p: any) => p.module !== 'chain') 
      .sort((a: any, b: any) => b.total30d - a.total30d)
      .slice(0, 5);

    const protocolNames = topProtocols.map((p: any) => ({
      name: p.name,
      revenue30d: \`$\${(p.total30d / 1000000).toFixed(1)}M\`
    }));

    // 3. Analyse via Gemini 1.5
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = \`
    Tu es un analyste fondamental expert en cryptomonnaies travaillant pour un fonds institutionnel.
    Voici les 5 applications décentralisées générant le plus de revenus (Real Yield) sur les 30 derniers jours :
    \${JSON.stringify(protocolNames)}
    
    Pour CHAQUE protocole, génère une analyse sous format JSON STRICT. Ton retour doit être un tableau d'objets avec ces clés exactes :
    - "name": le nom exact du protocole
    - "ticker": le symbole du jeton en MAJUSCULE
    - "category": la catégorie (ex: DEX, Lending, Liquid Staking, Stablecoin, etc.)
    - "aiRiskScore": une note parmi "A+", "A", "B", "C", "D"
    - "aiValuation": une valeur parmi "Sous-évalué", "Juste prix", "Surévalué"
    - "competitors": un tableau de 2 à 3 noms de concurrents directs (ex: ["Aave", "Compound"])
    - "aiAnalysis": Une analyse pointue et institutionnelle (en français, 3 phrases maximum) expliquant l'avantage concurrentiel, le risque majeur et la thèse de valorisation basée sur les revenus.
    
    Ne renvoie RIEN d'autre que le tableau JSON. Pas de texte introductif, pas de balises markdown \`\`\`json. UNIQUEMENT le JSON valide.
    \`;

    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    
    // Nettoyage au cas où Gemini ajoute quand même des balises
    responseText = responseText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
    
    const aiAnalysis = JSON.parse(responseText);

    // 4. Fusion des données DefiLlama et Gemini
    const finalData = aiAnalysis.map((ai: any) => {
      const llamaProto = protocolNames.find((p: any) => p.name.toLowerCase().includes(ai.name.toLowerCase()) || ai.name.toLowerCase().includes(p.name.toLowerCase()));
      return {
        id: ai.ticker,
        name: ai.name,
        ticker: ai.ticker,
        category: ai.category,
        revenue30d: llamaProto ? llamaProto.revenue30d : "N/A",
        aiRiskScore: ai.aiRiskScore,
        aiValuation: ai.aiValuation,
        competitors: ai.competitors,
        aiAnalysis: ai.aiAnalysis,
        status: "Completed"
      };
    });

    return NextResponse.json({ projects: finalData });

  } catch (error) {
    console.error("Erreur Scanner API:", error);
    return NextResponse.json({ error: "Erreur lors de la génération de l'analyse" }, { status: 500 });
  }
}
