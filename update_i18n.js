const fs = require('fs');

const i18nPath = 'src/i18n/index.ts';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

const newTranslations = {
  fr: {
    compTitleTrading: "Compétitions Trading Pro",
    compTitleCrypto: "Compétitions Crypto & Web3",
    compSearch: "Rechercher des compétitions",
    compSearching: "Recherche en cours...",
    compJoin: "S'inscrire / Info",
    compHybrid: "Hybride (Trad/Crypto)",
    compPrize: "Prix",
    compEntry: "Entrée",
    compDate: "Date",
    tjNewPbPrompt: "Nom de la nouvelle méthode (Playbook) :",
    tjNewAccPrompt: "Nom du nouveau compte :",
    tjRenAccPrompt: "Renommer le compte :",
    tjDelAccPrompt: "Supprimer ce compte et tous ses trades ?",
    tjCompPerf: "Comparaison des Performances",
    termTour: "Tutoriel du Terminal",
    termCompTrading: "Compétitions Trading Globales",
    termCompCrypto: "Tournois Crypto",
    termWeb3: "Intelligence Web3 & Crypto",
    heroCtaTerminal: "Rejoindre TA Salle des Marchés"
  },
  it: {
    compTitleTrading: "Competizioni Trading Pro",
    compTitleCrypto: "Competizioni Crypto & Web3",
    compSearch: "Cerca competizioni",
    compSearching: "Ricerca in corso...",
    compJoin: "Iscriviti / Info",
    compHybrid: "Ibrido (Trad/Crypto)",
    compPrize: "Premio",
    compEntry: "Ingresso",
    compDate: "Data",
    tjNewPbPrompt: "Nome del nuovo metodo (Playbook) :",
    tjNewAccPrompt: "Nome del nuovo conto :",
    tjRenAccPrompt: "Rinomina il conto :",
    tjDelAccPrompt: "Eliminare questo conto e tutti i suoi trade ?",
    tjCompPerf: "Confronto delle Performance",
    termTour: "Tutorial del Terminale",
    termCompTrading: "Competizioni Trading Globali",
    termCompCrypto: "Tornei Crypto",
    termWeb3: "Intelligenza Web3 & Crypto",
    heroCtaTerminal: "Unisciti alla TUA Sala Operativa"
  },
  es: {
    compTitleTrading: "Competiciones Trading Pro",
    compTitleCrypto: "Competiciones Crypto y Web3",
    compSearch: "Buscar competiciones",
    compSearching: "Búsqueda en curso...",
    compJoin: "Inscribirse / Info",
    compHybrid: "Híbrido (Trad/Crypto)",
    compPrize: "Premio",
    compEntry: "Entrada",
    compDate: "Fecha",
    tjNewPbPrompt: "Nombre del nuevo método (Playbook) :",
    tjNewAccPrompt: "Nombre de la nueva cuenta :",
    tjRenAccPrompt: "Renombrar la cuenta :",
    tjDelAccPrompt: "¿Eliminar esta cuenta y todos sus trades?",
    tjCompPerf: "Comparación de Rendimiento",
    termTour: "Tutorial del Terminal",
    termCompTrading: "Competiciones Globales de Trading",
    termCompCrypto: "Torneos Crypto",
    termWeb3: "Inteligencia Web3 y Crypto",
    heroCtaTerminal: "Únete a TU Sala de Trading"
  },
  de: {
    compTitleTrading: "Pro-Trading-Wettbewerbe",
    compTitleCrypto: "Krypto- & Web3-Wettbewerbe",
    compSearch: "Wettbewerbe suchen",
    compSearching: "Suche läuft...",
    compJoin: "Teilnehmen / Info",
    compHybrid: "Hybrid (Trad/Krypto)",
    compPrize: "Preis",
    compEntry: "Eintritt",
    compDate: "Datum",
    tjNewPbPrompt: "Name der neuen Methode (Playbook):",
    tjNewAccPrompt: "Name des neuen Kontos:",
    tjRenAccPrompt: "Konto umbenennen:",
    tjDelAccPrompt: "Dieses Konto und alle seine Trades löschen?",
    tjCompPerf: "Leistungsvergleich",
    termTour: "Terminal-Tutorial",
    termCompTrading: "Globale Trading-Wettbewerbe",
    termCompCrypto: "Krypto-Turniere",
    termWeb3: "Web3 & Krypto-Intelligenz",
    heroCtaTerminal: "Tritt DEINEM Trading-Raum bei"
  },
  ru: {
    compTitleTrading: "Турниры Pro Trading",
    compTitleCrypto: "Турниры Crypto & Web3",
    compSearch: "Поиск турниров",
    compSearching: "Поиск...",
    compJoin: "Участвовать / Инфо",
    compHybrid: "Гибрид (Трад/Крипто)",
    compPrize: "Приз",
    compEntry: "Вход",
    compDate: "Дата",
    tjNewPbPrompt: "Название нового метода (Playbook):",
    tjNewAccPrompt: "Название нового счета:",
    tjRenAccPrompt: "Переименовать счет:",
    tjDelAccPrompt: "Удалить этот счет и все его сделки?",
    tjCompPerf: "Сравнение производительности",
    termTour: "Учебник по Терминалу",
    termCompTrading: "Глобальные Торговые Турниры",
    termCompCrypto: "Крипто Турниры",
    termWeb3: "Web3 & Крипто Интеллект",
    heroCtaTerminal: "Присоединяйтесь к ТВОЕМУ торговому залу"
  },
  ja: {
    compTitleTrading: "プロトレーディングコンペティション",
    compTitleCrypto: "暗号通貨＆Web3コンペティション",
    compSearch: "コンペティションを検索",
    compSearching: "検索中...",
    compJoin: "参加する / 情報",
    compHybrid: "ハイブリッド (伝統/暗号)",
    compPrize: "賞",
    compEntry: "参加",
    compDate: "日付",
    tjNewPbPrompt: "新しいメソッド（Playbook）の名前:",
    tjNewAccPrompt: "新しい口座の名前:",
    tjRenAccPrompt: "口座の名前を変更:",
    tjDelAccPrompt: "この口座とすべてのトレードを削除しますか？",
    tjCompPerf: "パフォーマンス比較",
    termTour: "ターミナルチュートリアル",
    termCompTrading: "グローバルトレーディングコンペティション",
    termCompCrypto: "暗号通貨トーナメント",
    termWeb3: "Web3 ＆ 暗号通貨インテリジェンス",
    heroCtaTerminal: "あなたのトレーディングルームに参加"
  }
};

for (const lang in newTranslations) {
  const transKeys = Object.entries(newTranslations[lang]).map(([k, v]) => `${k}: "${v}"`).join(', ');
  // Insert before 'termPulse' in each language object. 
  // Wait, it's safer to just inject at the beginning of each language object.
  const langRegex = new RegExp(`(${lang}: \\{)`);
  if (i18nContent.match(langRegex)) {
    i18nContent = i18nContent.replace(langRegex, `$1\n    ${transKeys},`);
  }
}

fs.writeFileSync(i18nPath, i18nContent);
console.log('Updated i18n/index.ts with new keys.');
