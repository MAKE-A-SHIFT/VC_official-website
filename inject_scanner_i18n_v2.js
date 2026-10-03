const fs = require('fs');

const i18nPath = 'src/i18n/index.ts';
let i18n = fs.readFileSync(i18nPath, 'utf8');

const scanTrans = {
  fr: { scanTitle: "Scanner Fondamental IA", scanDesc: "Évaluation P/S, Risque & Avantage Concurrentiel", scanActive: "RÉSEAU NEURAL ACTIF...", scanDone: "DONNÉES À JOUR", scanProj: "Projet Web3", scanRev: "Revenus (30j)", scanRisk: "Score Risque IA", scanVal: "Valorisation", scanAnal: "Analyse", scanGrade: "Grade", scanRep: "Rapport d'Intelligence Artificielle", scanGen: "GÉNÉRÉ", scanComp: "Concurrents analysés :", scanErr: "Scanner Hors Ligne", scanUnder: "Sous-évalué", scanFair: "Juste prix", scanOver: "Surévalué", scanFall: "Ajoute une clé GEMINI_API_KEY dans ton fichier .env.local." },
  it: { scanTitle: "Scanner Fondamentale IA", scanDesc: "Valutazione P/S, Rischio & Vantaggio Competitivo", scanActive: "RETE NEURALE ATTIVA...", scanDone: "DATI AGGIORNATI", scanProj: "Progetto Web3", scanRev: "Entrate (30g)", scanRisk: "Punteggio Rischio IA", scanVal: "Valutazione", scanAnal: "Analisi", scanGrade: "Grado", scanRep: "Rapporto di Intelligenza Artificiale", scanGen: "GENERATO", scanComp: "Concorrenti analizzati:", scanErr: "Scanner Offline", scanUnder: "Sottovalutato", scanFair: "Prezzo giusto", scanOver: "Sopravvalutato", scanFall: "Aggiungi una chiave GEMINI_API_KEY nel tuo file .env.local." },
  es: { scanTitle: "Escáner Fundamental IA", scanDesc: "Evaluación P/S, Riesgo y Ventaja Competitiva", scanActive: "RED NEURONAL ACTIVA...", scanDone: "DATOS ACTUALIZADOS", scanProj: "Proyecto Web3", scanRev: "Ingresos (30d)", scanRisk: "Puntuación de Riesgo IA", scanVal: "Valoración", scanAnal: "Análisis", scanGrade: "Grado", scanRep: "Informe de Inteligencia Artificial", scanGen: "GENERADO", scanComp: "Competidores analizados:", scanErr: "Escáner Fuera de Línea", scanUnder: "Infravalorado", scanFair: "Valor justo", scanOver: "Sobrevalorado", scanFall: "Añade una clave GEMINI_API_KEY en tu archivo .env.local." },
  de: { scanTitle: "KI-Fundamental-Scanner", scanDesc: "P/S-Bewertung, Risiko & Wettbewerbsvorteil", scanActive: "NEURONALES NETZWERK AKTIV...", scanDone: "DATEN AKTUELL", scanProj: "Web3-Projekt", scanRev: "Umsatz (30T)", scanRisk: "KI-Risiko-Score", scanVal: "Bewertung", scanAnal: "Analyse", scanGrade: "Grad", scanRep: "Künstliche Intelligenz Bericht", scanGen: "GENERIERT", scanComp: "Analysierte Wettbewerber:", scanErr: "Scanner Offline", scanUnder: "Unterbewertet", scanFair: "Faire Bewertung", scanOver: "Überbewertet", scanFall: "Füge einen GEMINI_API_KEY in deiner .env.local Datei hinzu." },
  ru: { scanTitle: "Фундаментальный Сканер ИИ", scanDesc: "Оценка P/S, Риск и Конкурентное преимущество", scanActive: "НЕЙРОСЕТЬ АКТИВНА...", scanDone: "ДАННЫЕ ОБНОВЛЕНЫ", scanProj: "Web3 Проект", scanRev: "Доход (30д)", scanRisk: "Оценка Риска ИИ", scanVal: "Оценка", scanAnal: "Анализ", scanGrade: "Класс", scanRep: "Отчет Искусственного Интеллекта", scanGen: "СГЕНЕРИРОВАНО", scanComp: "Проанализированные конкуренты:", scanErr: "Сканер не в сети", scanUnder: "Недооценен", scanFair: "Справедливая цена", scanOver: "Переоценен", scanFall: "Добавьте ключ GEMINI_API_KEY в файл .env.local." },
  ja: { scanTitle: "AIファンダメンタルスキャナー", scanDesc: "P/S評価、リスク＆競争優位性", scanActive: "ニューラルネットワークアクティブ...", scanDone: "最新データ", scanProj: "Web3プロジェクト", scanRev: "収益（30日）", scanRisk: "AIリスクスコア", scanVal: "評価", scanAnal: "分析", scanGrade: "グレード", scanRep: "人工知能レポート", scanGen: "生成済み", scanComp: "分析された競合他社:", scanErr: "スキャナーオフライン", scanUnder: "過小評価", scanFair: "適正価格", scanOver: "過大評価", scanFall: ".env.local ファイルに GEMINI_API_KEY を追加してください。" }
};

for (const lang in scanTrans) {
  const transKeys = Object.entries(scanTrans[lang]).map(([k, v]) => `${k}: "${v}"`).join(', ');
  const langRegex = new RegExp(`(${lang}: \\{)`);
  if (i18n.match(langRegex)) {
    i18n = i18n.replace(langRegex, `$1\n    ${transKeys},`);
  }
}

fs.writeFileSync(i18nPath, i18n);
console.log('Injected scanTrans keys');
