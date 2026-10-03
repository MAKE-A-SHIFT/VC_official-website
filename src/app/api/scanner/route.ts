import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Cache pour 6 heures
export const revalidate = 21600;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en';

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

    // Fallback data if Gemini fails
    const fallbackData = protocolNames.map((p: any, idx: number) => ({
      id: p.name.toUpperCase(),
      name: p.name,
      ticker: p.name.substring(0, 4).toUpperCase(),
      category: "DeFi Protocol",
      revenue30d: p.revenue30d,
      aiRiskScore: ["A", "B", "C"][idx % 3],
      aiValuation: ["UNDERVALUED", "FAIR_VALUE", "OVERVALUED"][idx % 3],
      competitors: ["Competitor A", "Competitor B"],
      aiAnalysis: "AI Analysis offline. Please set your GEMINI_API_KEY in .env.local or check the API quota.",
      status: "Fallback"
    }));

    if (!process.env.GEMINI_API_KEY) {
      console.warn("Missing Gemini API Key. Using Fallback.");
      return NextResponse.json({ projects: fallbackData });
    }

    try {
      // 2. Google Gemini
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      
      // Upgrade to gemini-1.5-flash for reliability and speed
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are an expert fundamental crypto analyst for an institutional fund.
Here are the top 5 dApps by revenue (Real Yield) over the last 30 days:
${JSON.stringify(protocolNames)}

For EACH protocol, generate an analysis in STRICT JSON format. Your output must be an array of objects with exactly these keys:
- "name": exact protocol name
- "ticker": token ticker in UPPERCASE
- "category": category (e.g., DEX, Lending, Liquid Staking, Stablecoin)
- "aiRiskScore": one grade among "A+", "A", "B", "C", "D"
- "aiValuation": STRICTLY USE ONE OF THESE EXACT STRINGS: "UNDERVALUED", "FAIR_VALUE", "OVERVALUED"
- "competitors": an array of 2 to 3 direct competitor names (e.g., ["Aave", "Compound"])
- "aiAnalysis": A sharp, institutional fundamental analysis (STRICTLY TRANSLATED TO THIS LANGUAGE CODE: ${lang}, maximum 3 sentences) explaining the competitive advantage, major risk, and valuation thesis based on revenue.

Do not output any introductory text or markdown tags. ONLY valid JSON.`;

      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      
      // Markdown cleanup
      responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      const aiAnalysis = JSON.parse(responseText);

      // 3. Merge
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
      console.error("Gemini Error, using Fallback:", aiError.message);
      return NextResponse.json({ projects: fallbackData });
    }

  } catch (error: any) {
    console.error("Scanner API general error:", error);
    return NextResponse.json({ error: "Cannot fetch DefiLlama data at the moment." }, { status: 500 });
  }
}
