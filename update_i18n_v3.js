const fs = require('fs');
const path = 'src/i18n/index.ts';
let content = fs.readFileSync(path, 'utf8');

const additions = {
  fr: `
    card1Title1: "Live Trading", card1Title2: "Tous Les Jours", card1Desc: "Sur la session européenne, américaine et asiatique, retrouve des sessions en live pour voir en direct comment trade des professionnels.",
    card2Title1: "Communauté Privée", card2Title2: "+", card2Title3: "Coaching 1-to-1 avec Luck", card2Desc: "Chaque dimanche : un live pour poser tes questions, apprendre, revoir les erreurs, comprendre les setups clés.",
    card3Title1: "Formation Aux Bases Du Trading", card3Title2: "Gratuite", card3Desc: "Accessible 100% gratuitement directement depuis le groupe Telegram de l'Académie pour maîtriser les fondations.",
    card4Title1: "Accès Aux", card4Title2: "Meilleurs Trades", card4Desc: "Des setups Gold, BTC et Forex clairs, expliqués, basés sur ma propre stratégie, avec 95% de taux de réussite documenté.",
    card5Title1: "Accès À Du", card5Title2: "Capital", card5Title3: "Pour Trader", card5Desc: "Nos membres accèdent à des opportunités de traders grâce à des comptes financés allant jusqu'à 1M$.",
    step1Title: "Rejoignez Le Groupe Gratuit", step1Badge: "APPLY", step1Desc: "Rejoignez notre groupe gratuit, où nous partageons nos idées de trading.",
    step2Title: "Tradez Avec Nous", step2Desc: "Gagnez de l'argent avec nous grâce à nos idées de trading, chaque jour et entièrement gratuitement.",
    step3Title: "Développez-Vous En Tant Que Trader", step3Desc: "Augmentez votre potentiel financier, créez une véritable liberté dans votre vie et profitez de notre communauté pour continuer à grandir.",
    tool1Name: "Calculateur de Position", tool2Name: "Calendrier Économique", tool3Name: "Simulateur Risk of Ruin", tool4Name: "Edge Calculator", btnOpen: "Ouvrir",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Courbe d'Expérience (PnL)", skillTree: "Arbre de Compétences", btnAdd: "Ajouter",
  `,
  en: `
    card1Title1: "Live Trading", card1Title2: "Every Day", card1Desc: "During the European, American and Asian sessions, join live sessions to see exactly how professionals trade in real-time.",
    card2Title1: "Private Community", card2Title2: "+", card2Title3: "1-on-1 Coaching with Luck", card2Desc: "Every Sunday: a live session to ask your questions, learn, review mistakes, and understand key setups.",
    card3Title1: "Trading Basics Training", card3Title2: "Free", card3Desc: "Accessible 100% for free directly from the Academy's Telegram group to master the foundations.",
    card4Title1: "Access To", card4Title2: "Best Trades", card4Desc: "Clear Gold, BTC and Forex setups, explained and based on my own strategy, with a documented 95% win rate.",
    card5Title1: "Access To", card5Title2: "Capital", card5Title3: "For Trading", card5Desc: "Our members gain access to trading opportunities through funded accounts up to $1M.",
    step1Title: "Join The Free Group", step1Badge: "APPLY", step1Desc: "Join our free group where we share our trading ideas.",
    step2Title: "Trade With Us", step2Desc: "Make money with us through our trading ideas, every day and completely for free.",
    step3Title: "Grow As A Trader", step3Desc: "Increase your financial potential, create true freedom in your life and leverage our community to keep growing.",
    tool1Name: "Position Calculator", tool2Name: "Economic Calendar", tool3Name: "Risk of Ruin Simulator", tool4Name: "Edge Calculator", btnOpen: "Open",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Experience Curve (PnL)", skillTree: "Skill Tree", btnAdd: "Add",
  `,
  es: `
    card1Title1: "Live Trading", card1Title2: "Todos Los Días", card1Desc: "Durante las sesiones europea, americana y asiática, únete a sesiones en vivo para ver exactamente cómo operan los profesionales en tiempo real.",
    card2Title1: "Comunidad Privada", card2Title2: "+", card2Title3: "Coaching 1-a-1 con Luck", card2Desc: "Cada domingo: una sesión en vivo para hacer tus preguntas, aprender, revisar errores y entender configuraciones clave.",
    card3Title1: "Formación Básica de Trading", card3Title2: "Gratis", card3Desc: "Accesible 100% gratis directamente desde el grupo de Telegram de la Academia para dominar las bases.",
    card4Title1: "Acceso A", card4Title2: "Mejores Operaciones", card4Desc: "Configuraciones claras de Oro, BTC y Forex, explicadas y basadas en mi propia estrategia, con un 95% de tasa de éxito documentada.",
    card5Title1: "Acceso A", card5Title2: "Capital", card5Title3: "Para Operar", card5Desc: "Nuestros miembros acceden a oportunidades de trading a través de cuentas financiadas de hasta $1M.",
    step1Title: "Únete Al Grupo Gratis", step1Badge: "APLICAR", step1Desc: "Únete a nuestro grupo gratuito donde compartimos nuestras ideas de trading.",
    step2Title: "Opera Con Nosotros", step2Desc: "Gana dinero con nosotros a través de nuestras ideas de trading, todos los días y completamente gratis.",
    step3Title: "Crece Como Trader", step3Desc: "Aumenta tu potencial financiero, crea verdadera libertad en tu vida y aprovecha nuestra comunidad para seguir creciendo.",
    tool1Name: "Calculadora de Posición", tool2Name: "Calendario Económico", tool3Name: "Simulador Risk of Ruin", tool4Name: "Calculadora de Edge", btnOpen: "Abrir",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Curva de Experiencia (PnL)", skillTree: "Árbol de Habilidades", btnAdd: "Añadir",
  `,
  it: `
    card1Title1: "Live Trading", card1Title2: "Tutti I Giorni", card1Desc: "Durante le sessioni europea, americana e asiatica, unisciti alle sessioni dal vivo per vedere esattamente come operano i professionisti in tempo reale.",
    card2Title1: "Comunità Privata", card2Title2: "+", card2Title3: "Coaching 1-a-1 con Luck", card2Desc: "Ogni domenica: una sessione live per fare domande, imparare, rivedere gli errori e capire i setup chiave.",
    card3Title1: "Formazione Base di Trading", card3Title2: "Gratuita", card3Desc: "Accessibile gratuitamente al 100% direttamente dal gruppo Telegram dell'Accademia per padroneggiare le basi.",
    card4Title1: "Accesso Ai", card4Title2: "Migliori Trade", card4Desc: "Setup chiari su Oro, BTC e Forex, spiegati e basati sulla mia strategia personale, con una percentuale di successo documentata del 95%.",
    card5Title1: "Accesso A", card5Title2: "Capitale", card5Title3: "Per Fare Trading", card5Desc: "I nostri membri accedono a opportunità di trading tramite conti finanziati fino a $1M.",
    step1Title: "Unisciti Al Gruppo Gratuito", step1Badge: "APPLICA", step1Desc: "Unisciti al nostro gruppo gratuito, dove condividiamo le nostre idee di trading.",
    step2Title: "Fai Trading Con Noi", step2Desc: "Guadagna con noi grazie alle nostre idee di trading, ogni giorno e completamente gratis.",
    step3Title: "Cresci Come Trader", step3Desc: "Aumenta il tuo potenziale finanziario, crea vera libertà nella tua vita e sfrutta la nostra comunità per continuare a crescere.",
    tool1Name: "Calcolatore di Posizione", tool2Name: "Calendario Economico", tool3Name: "Simulatore Risk of Ruin", tool4Name: "Calcolatore di Edge", btnOpen: "Apri",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Curva di Esperienza (PnL)", skillTree: "Albero delle Abilità", btnAdd: "Aggiungi",
  `,
  de: `
    card1Title1: "Live Trading", card1Title2: "Jeden Tag", card1Desc: "Nehmen Sie während der europäischen, amerikanischen und asiatischen Sitzungen an Live-Sitzungen teil, um zu sehen, wie Profis in Echtzeit handeln.",
    card2Title1: "Private Community", card2Title2: "+", card2Title3: "1-zu-1 Coaching mit Luck", card2Desc: "Jeden Sonntag: Eine Live-Session, um Fragen zu stellen, zu lernen, Fehler zu überprüfen und wichtige Setups zu verstehen.",
    card3Title1: "Trading-Grundausbildung", card3Title2: "Kostenlos", card3Desc: "100% kostenlos direkt über die Telegram-Gruppe der Akademie zugänglich, um die Grundlagen zu meistern.",
    card4Title1: "Zugang Zu Den", card4Title2: "Besten Trades", card4Desc: "Klare Gold-, BTC- und Forex-Setups, basierend auf meiner eigenen Strategie erklärt, mit einer dokumentierten Gewinnrate von 95%.",
    card5Title1: "Zugang Zu", card5Title2: "Kapital", card5Title3: "Fürs Trading", card5Desc: "Unsere Mitglieder erhalten Zugang zu Trading-Möglichkeiten durch finanzierte Konten bis zu 1M$.",
    step1Title: "Kostenlose Gruppe beitreten", step1Badge: "BEWERBEN", step1Desc: "Treten Sie unserer kostenlosen Gruppe bei, in der wir unsere Trading-Ideen teilen.",
    step2Title: "Handeln Sie mit uns", step2Desc: "Verdienen Sie Geld mit uns durch unsere Trading-Ideen, jeden Tag und völlig kostenlos.",
    step3Title: "Wachsen Sie als Trader", step3Desc: "Steigern Sie Ihr finanzielles Potenzial, schaffen Sie wahre Freiheit in Ihrem Leben und nutzen Sie unsere Community, um weiter zu wachsen.",
    tool1Name: "Positionsrechner", tool2Name: "Wirtschaftskalender", tool3Name: "Risk of Ruin Simulator", tool4Name: "Edge-Rechner", btnOpen: "Öffnen",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Erfahrungskurve (PnL)", skillTree: "Fähigkeitsbaum", btnAdd: "Hinzufügen",
  `,
  ru: `
    card1Title1: "Трейдинг в реальном времени", card1Title2: "Каждый День", card1Desc: "Во время европейской, американской и азиатской сессий присоединяйтесь к лайв-сессиям, чтобы увидеть, как торгуют профессионалы в реальном времени.",
    card2Title1: "Закрытое сообщество", card2Title2: "+", card2Title3: "Коучинг 1 на 1 с Luck", card2Desc: "Каждое воскресенье: лайв-сессия для вопросов, обучения, разбора ошибок и ключевых сетапов.",
    card3Title1: "Обучение основам трейдинга", card3Title2: "Бесплатно", card3Desc: "Доступно на 100% бесплатно напрямую из Telegram-группы Академии для освоения основ.",
    card4Title1: "Доступ к", card4Title2: "Лучшим Сделкам", card4Desc: "Четкие сетапы по Золоту, BTC и Форексу, с объяснением на основе моей стратегии и винрейтом 95%.",
    card5Title1: "Доступ к", card5Title2: "Капиталу", card5Title3: "Для Трейдинга", card5Desc: "Наши участники получают доступ к торговым возможностям через финансируемые счета до $1M.",
    step1Title: "Присоединяйтесь к группе", step1Badge: "ПОДАТЬ ЗАЯВКУ", step1Desc: "Присоединяйтесь к нашей бесплатной группе, где мы делимся нашими торговыми идеями.",
    step2Title: "Торгуйте с нами", step2Desc: "Зарабатывайте деньги вместе с нами с помощью наших торговых идей, каждый день и абсолютно бесплатно.",
    step3Title: "Растите как трейдер", step3Desc: "Увеличьте свой финансовый потенциал, создайте истинную свободу в своей жизни и используйте наше сообщество для роста.",
    tool1Name: "Калькулятор позиции", tool2Name: "Экономический календарь", tool3Name: "Симулятор Риска", tool4Name: "Калькулятор Преимущества", btnOpen: "Открыть",
    termPulse: "Market Pulse", termRisk: "Risk Engine", termEdge: "Edge & Strategy", termJournal: "Journaling",
    xpCurve: "Кривая Опыта (PnL)", skillTree: "Дерево Навыков", btnAdd: "Добавить",
  `,
  ja: `
    card1Title1: "ライブトレーディング", card1Title2: "毎日", card1Desc: "ヨーロッパ、アメリカ、アジアのセッション中にライブセッションに参加し、プロのトレードを確認できます。",
    card2Title1: "プライベートコミュニティ", card2Title2: "+", card2Title3: "Luckとの1対1コーチング", card2Desc: "毎週日曜日：質問をしたり、間違いを見直したり、セットアップを理解するためのライブセッション。",
    card3Title1: "トレーディングの基礎トレーニング", card3Title2: "無料", card3Desc: "基礎をマスターするために、アカデミーのTelegramグループから100％無料で直接アクセス可能。",
    card4Title1: "アクセス：", card4Title2: "最高のトレード", card4Desc: "記録された95％の勝率を誇る明確なゴールド、BTC、FXのセットアップ。",
    card5Title1: "アクセス：", card5Title2: "資金", card5Title3: "トレード用", card5Desc: "メンバーは最大100万ドルの資金提供アカウントを通じてトレードの機会にアクセスできます。",
    step1Title: "無料グループに参加する", step1Badge: "申し込む", step1Desc: "私たちがトレードのアイデアを共有している無料グループに参加してください。",
    step2Title: "私たちとトレードする", step2Desc: "私たちのトレードアイデアを通じて、毎日完全に無料で一緒にお金を稼ぎましょう。",
    step3Title: "トレーダーとして成長する", step3Desc: "あなたの経済的ポテンシャルを高め、人生に真の自由を築き、コミュニティを活用して成長し続けましょう。",
    tool1Name: "ポジション計算機", tool2Name: "経済カレンダー", tool3Name: "破産確率シミュレーター", tool4Name: "エッジ計算機", btnOpen: "開く",
    termPulse: "マーケットパルス", termRisk: "リスクエンジン", termEdge: "エッジ＆戦略", termJournal: "ジャーナリング",
    xpCurve: "経験曲線（PnL）", skillTree: "スキルツリー", btnAdd: "追加",
  `
};

for (const [lang, extraKeys] of Object.entries(additions)) {
  const regex = new RegExp(lang + ':\\s*{');
  content = content.replace(regex, lang + ': {\n' + extraKeys);
}

fs.writeFileSync(path, content);
console.log('Translations deeply updated.');
