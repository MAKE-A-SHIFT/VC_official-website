const fs = require('fs');

// 1. Update useAppStore.ts
let store = fs.readFileSync('src/store/useAppStore.ts', 'utf8');
store = store.replace(
  "export type Language = 'fr' | 'it' | 'es' | 'de' | 'ru' | 'ja';",
  "export type Language = 'en' | 'fr' | 'it' | 'es' | 'de' | 'ru' | 'ja';"
);
fs.writeFileSync('src/store/useAppStore.ts', store);
console.log('Updated useAppStore.ts');

// 2. Update Navbar.tsx
let navbar = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');
navbar = navbar.replace(
  "const supported: Language[] = ['fr', 'it', 'es', 'de', 'ru', 'ja'];",
  "const supported: Language[] = ['en', 'fr', 'it', 'es', 'de', 'ru', 'ja'];"
);
if (!navbar.includes('<option value="en"')) {
  navbar = navbar.replace(
    '<option value="fr" className="bg-black text-white">FR</option>',
    '<option value="en" className="bg-black text-white">EN</option>\n              <option value="fr" className="bg-black text-white">FR</option>'
  );
}
fs.writeFileSync('src/components/layout/Navbar.tsx', navbar);
console.log('Updated Navbar.tsx');

// 3. Inject en into i18n/index.ts
let i18n = fs.readFileSync('src/i18n/index.ts', 'utf8');

const enBlock = `en: {
    scanTitle: "AI Fundamental Scanner", scanDesc: "P/S Valuation, Risk & Moat Assessment", scanActive: "NEURAL NETWORK ACTIVE...", scanDone: "DATA UP TO DATE", scanProj: "Web3 Project", scanRev: "Revenue (30d)", scanRisk: "AI Risk Score", scanVal: "Valuation", scanAnal: "Analysis", scanGrade: "Grade", scanRep: "Artificial Intelligence Report", scanGen: "GENERATED", scanComp: "Analyzed Competitors:", scanErr: "Scanner Offline", scanUnder: "Undervalued", scanFair: "Fair Value", scanOver: "Overvalued", scanFall: "Add a GEMINI_API_KEY to your .env.local file.",
    tjManageAcc: "Account Management", tjNoAcc: "No accounts created.", tjAddAccBtn: "Add an account", tjRenameBtn: "Rename", tjDeleteBtn: "Delete",
    compTitleTrading: "Pro Trading Competitions", compTitleCrypto: "Crypto & Web3 Competitions", compSearch: "Search competitions", compSearching: "Search in progress...", compJoin: "Join / Info", compHybrid: "Hybrid (Trad/Crypto)", compPrize: "Prize", compEntry: "Entry", compDate: "Date", tjNewPbPrompt: "Name of the new method (Playbook):", tjNewAccPrompt: "Name of the new account:", tjRenAccPrompt: "Rename account:", tjDelAccPrompt: "Delete this account and all its trades?", tjCompPerf: "Performance Comparison", termTour: "Terminal Tutorial", termCompTrading: "Global Trading Competitions", termCompCrypto: "Crypto Tournaments", termWeb3: "Web3 & Crypto Intelligence", heroCtaTerminal: "Join YOUR Trading Room",
    navTerminal: 'TERMINAL', navShowcase: 'ACADEMY',

    card1Title1: "Live Trading", card1Title2: "Every Day", card1Desc: "Join live sessions during the European, American, and Asian sessions to see how professionals trade live.",
    card2Title1: "Private Community", card2Title2: "+", card2Title3: "1-to-1 Coaching with Luck", card2Desc: "Every Sunday: a live stream to ask your questions, learn, review mistakes, and understand key setups.",
    card3Title1: "Trading Basics Training", card3Title2: "Free", card3Desc: "Accessible 100% for free directly from the Academy's Telegram group to master the foundations.",
    card4Title1: "Access To", card4Title2: "Best Trades", card4Desc: "Clear Gold, BTC, and Forex setups, explained, based on my own strategy, with a documented 95% win rate.",
    card5Title1: "Access To", card5Title2: "Capital", card5Title3: "To Trade", card5Desc: "Our members access funding opportunities through funded accounts up to $1M.",
    step1Title: "Join The Free Group", step1Badge: "APPLY", step1Desc: "Join our free group where we share our trading ideas.",
    step2Title: "Trade With Us", step2Desc: "Make money with us through our trading ideas, every day and completely for free.",
    step3Title: "Develop As A Trader", step3Desc: "Increase your financial potential, create true freedom in your life and leverage our community to keep growing.",
    tool1Name: "Position Calculator", tool2Name: "Economic Calendar", tool3Name: "Risk of Ruin Simulator", tool4Name: "Edge Calculator", btnOpen: "Open",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Experience Curve (PnL)", skillTree: "Skill Tree", btnAdd: "Add",
  
    heroBadge: "Prop Trading & Education",
    heroTitle1: "THE RETAIL ILLUSION",
    heroTitle2: "IS OVER.",
    heroDesc: "Retail trading is designed for you to fail. Join the elite who trade with order flow and raw data.",
    heroCta: "JOIN THE ACADEMY",
    manifestoBadge: "A New Vision",
    manifestoTitle: "MY STORY",
    manifestoDesc: "Retail trading is designed for you to fail. Join the elite who trade with raw data and orderflow.",
    manifestoCta: "JOIN VALHALLA CAPITAL",
    legalMentions: "Legal Mentions", legalPrivacy: "Privacy Policy", legalTerms: "Terms of Use", legalRisk: "Risk Disclosure",
    footerRisk: "Risk Warning: Trading CFDs and Forex involves high risk. Valhalla Capital LLC operates under the jurisdiction of Paraguay.",
    storyText: "2019. Like many of us, I took my first steps in trading drawn by the illusion of easy money with an MLM structure. Fortunately, I had the presence of mind to get out before it collapsed, narrowly recovering my capital. This was my first real lesson.\\n\\nAfter that, I jumped into crypto. I made my first tens of thousands of euros in 'Degen' mode, taking highly risky but calculated all-ins. Surviving the dips, I thought I had figured the game out.\\n\\nThen, the classic mistake happened: I blindly trusted a YouTube 'trader'. He convinced me to deviate from my plan, and in the process, burned 50% of everything I had struggled to build. Instead of stubbornly holding on, I withdrew everything. I realized my only way out was to invest that money in real, professional education abroad.\\n\\nReturning to traditional markets out of a passion for technical analysis, I tried everything: Forex, indicators, trendlines, support and resistance... everything you can find on the internet.\\n\\nThe real turning point came with stock indices. Specifically, the DAX (GER40), which I trade at 4 AM during the European session. Then, I met Fabio Valentini (Winner of the Robin Trading World Cup) and his partner Andrea Cimi, two Italian traders. They taught me 'Order Flow', which today constitutes 80% of my edge. Since then, I apply that exact same rigor on the Nasdaq.\\n\\nI want to be 100% transparent with you. I have always been profitable, but it was often borderline. I spent long periods hovering at breakeven, doubting, and stagnating. If I am here today, it is thanks to the brutal truth of the Order Flow and the support of these four professional traders who changed my perspective. VALHALLA CAPITAL is the place where I honestly share every part of this journey.",
    terminal: {
      posCalcTitle: "Position Calculator", cap: "Capital", riskPct: "Risk (%)", sl: "Stop Loss", ptVal: "Point Value", lot: "Lot Size", riskAmt: "Financial Risk",
      ecoTitle: "Economic Calendar",
      riskTitle: "Risk of Ruin Simulator", winRate: "Win Rate (%)", rrAvg: "Avg R:R", exp: "Expectancy",
      riskWarn: "Warning: Negative expectancy.",
      riskSafe: "Positive expectancy.",
      edgeTitle: "Edge Calculator", win: "Wins", loss: "Losses", trades: "Trades", trueEdge: "True Edge",
      tjTitle: "Trading Journal", asset: "Asset", dir: "Direction", res: "Result (R)", date: "Date", action: "Action", noTrades: "No recorded trades.",
      bjTitle: "Backtest Console", strat: "Strategy", sample: "Sample", rrFix: "Fixed RR", edge: "Edge", targetRr: "Target RR", reset: "Reset",
      heatmapTitle: "Heatmap",
      propTitle: "Prop Firm Tracker", propCap: "Capital", propMaxDD: "Max Daily DD", propCurLoss: "Current Loss", propRem: "Remaining", propSafe: "Risk per Trade", propTradesLeft: "Trades Left",
      recTitle: "Drawdown Recovery", recDD: "Current Drawdown", recReq: "Required Performance", recReqSub: "for breakeven",
      sessTitle: "Market Sessions", sessLondon: "London", sessNY: "New York", sessTokyo: "Tokyo", sessSydney: "Sydney"
    }
  },
`;

if (!i18n.includes('en: {')) {
  i18n = i18n.replace('export const translations = {\n', `export const translations: any = {\n  ${enBlock}`);
  fs.writeFileSync('src/i18n/index.ts', i18n);
  console.log('Injected English translations');
} else {
  console.log('English translations already exist');
}
