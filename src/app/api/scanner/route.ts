import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cache pour 6 heures
export const revalidate = 21600;

export async function GET() {
  try {
    // 1. Fetch DefiLlama (Top protocoles par frais/revenus générés)
    const llamaRes = await fetch('https://api.llama.fi/overview/fees?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyFees');
    const llamaData = await llamaRes.json();
    
    const topProtocols = llamaData.protocols
      .filter((p: any) => p.module !== 'chain') 
      .sort((a: any, b: any) => b.total30d - a.total30d)
      .slice(0, 5);

    const protocolNames = topProtocols.map((p: any) => ({
      name: p.name,
      revenue30d: '$' + (p.total30d / 1000000).toFixed(1) + 'M'
    }));

    // S'il n'y a pas de clé API Gemini ou si elle échoue, on renverra ces données de fallback
    const fallbackData = protocolNames.map((p: any, idx: number) => ({
      id: p.name.toUpperCase(),
      name: p.name,
      ticker: p.name.substring(0, 4).toUpperCase(),
      category: "DeFi Protocol",
      revenue30d: p.revenue30d,
      aiRiskScore: ["A", "B", "C"][idx % 3],
      aiValuation: ["Sous-évalué", "Juste prix", "Surévalué"][idx % 3],
      competitors: ["Competitor A", "Competitor B"],
      aiAnalysis: "L'analyse IA est actuellement hors ligne car la clé API Gemini n'est pas configurée ou le modèle est inaccessible.",
      status: "Fallback"
    }));

    if (!process.env.GEMINI_API_KEY) {
      console.warn("Clé API Gemini manquante. Utilisation du Fallback.");
      return NextResponse.json({ projects: fallbackData });
    }

    try {
      // 2. Google Gemini
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      
      // On teste avec gemini-pro (Gemini 1.0) qui est le plus stable universellement
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = 'Tu es un analyste fondamental expert en cryptomonnaies travaillant pour un fonds institutionnel.\nVoici les 5 applications décentralisées générant le plus de revenus (Real Yield) sur les 30 derniers jours :\n' + JSON.stringify(protocolNames) + '\n\nPour CHAQUE protocole, génère une analyse sous format JSON STRICT. Ton retour doit être un tableau d\'objets avec ces clés exactes :\n- "name": le nom exact du protocole\n- "ticker": le symbole du jeton en MAJUSCULE\n- "category": la catégorie (ex: DEX, Lending, Liquid Staking, Stablecoin, etc.)\n- "aiRiskScore": une note parmi "A+", "A", "B", "C", "D"\n- "aiValuation": une valeur parmi "Sous-évalué", "Juste prix", "Surévalué"\n- "competitors": un tableau de 2 à 3 noms de concurrents directs (ex: ["Aave", "Compound"])\n- "aiAnalysis": Une analyse pointue et institutionnelle (en français, 3 phrases maximum) expliquant l\'avantage concurrentiel, le risque majeur et la thèse de valorisation basée sur les revenus.\n\nNe renvoie RIEN d\'autre que le tableau JSON. Pas de texte introductif, pas de balises markdown. UNIQUEMENT le JSON valide.';

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      
      // Nettoyage Markdown
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const aiAnalysis = JSON.parse(responseText);

      // 3. Fusion
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
      
    } catch (aiError: any) {
      console.error("Erreur Gemini, utilisation du Fallback:", aiError.message);
      return NextResponse.json({ projects: fallbackData });
    }

  } catch (error: any) {
    console.error("Erreur générale Scanner API:", error);
    return NextResponse.json({ error: "Impossible de récupérer les données DefiLlama." }, { status: 500 });
  }
}
