"use client";
import { useState } from "react";
import { PositionCalculator } from "../tools/PositionCalculator";
import { EconomicCalendar } from "../tools/EconomicCalendar";
import { RiskOfRuin } from "../tools/RiskOfRuin";
import { EdgeCalculator } from "../tools/EdgeCalculator";
import { TradingJournal } from "../tools/TradingJournal";
import { BacktestJournal } from "../tools/BacktestJournal";
import { PropFirmManager } from "../tools/PropFirmManager";
import { RecoveryCalculator } from "../tools/RecoveryCalculator";
import { MarketSessions } from "../tools/MarketSessions";
import { MarketHeatmap } from "../tools/MarketHeatmap";
import { CryptoAIScanner } from "../tools/CryptoAIScanner";
import { Competitions } from "../tools/Competitions";
import { Trophy } from "lucide-react";
import { Activity, ShieldAlert, Target, BookOpen, BrainCircuit, HelpCircle } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function TerminalView() {
  const { language } = useAppStore();
  const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');
  const t = translations[language].terminal;
  const tRoot = translations[language];

  const tourTranslations = {
    fr: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navigation', description: 'Alterne entre le Trading Traditionnel et le Web3/Crypto (Scanner IA, Tournois).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Sessions de Marché', description: 'Surveille le chevauchement des sessions (Londres/NY) pour la volatilité.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendrier Économique', description: 'Ne trade pas à l\'aveugle pendant les annonces majeures (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Heatmap des Devises', description: 'Identifie les devises les plus fortes et les plus faibles.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'Le Bouclier Ultime', description: 'Définis ton risque et SL. L\'outil calcule la taille de lot exacte.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Tracker Prop Firm', description: 'Surveille ton Drawdown pour ne jamais perdre un compte financé.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Plan de Recovery', description: 'La roadmap mathématique pour revenir à zéro après un drawdown.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Test de Survie', description: 'Vérifie si ton risque de ruine est > 0%.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'As-tu un Edge ?', description: 'Ton espérance mathématique en temps réel.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Le Laboratoire', description: 'Backteste tes idées avant de les appliquer en live.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Le Cœur du Réacteur', description: 'Ton Journal de Trading. Toutes les données du terminal proviennent d\'ici.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Gestion Multi-Comptes', description: 'Ajoute, modifie, supprime et navigue entre tes différents comptes de trading.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Compétitions', description: 'Accède aux plus grands tournois mondiaux (Robbins, Darwinex, etc.).', side: 'top', align: 'center' } }
    ],
    en: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navigation', description: 'Switch between Traditional Trading and Web3/Crypto (AI Scanner, Tournaments).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Market Sessions', description: 'Track overlapping sessions (London/NY) for maximum volatility.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Economic Calendar', description: 'Don\'t trade blind during high-impact news (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Currency Heatmap', description: 'Identify the strongest and weakest currencies.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'The Ultimate Shield', description: 'Set your risk and SL. Gets exact lot sizes.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Prop Firm Tracker', description: 'Monitor your Drawdown limits for funded accounts.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Recovery Plan', description: 'Mathematical roadmap to recover from a drawdown.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Survival Test', description: 'Check if your Risk of Ruin is > 0%.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Do you have an Edge?', description: 'Your mathematical expectancy in real-time.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'The Laboratory', description: 'Backtest ideas before trading them live.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'The Core Engine', description: 'Your Trading Journal. All terminal data syncs from here.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Multi-Account Manager', description: 'Add, edit, delete, and switch between multiple trading accounts.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Competitions', description: 'Access global tournaments (Robbins, Darwinex, etc.).', side: 'top', align: 'center' } }
    ],
    it: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navigazione', description: 'Passa dal Trading Tradizionale al Web3/Crypto (Scanner IA, Tornei).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Sessioni di Mercato', description: 'Monitora le sovrapposizioni delle sessioni (Londra/NY) per la volatilità.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendario Economico', description: 'Non fare trading alla cieca durante le notizie (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Mappa Termica Valute', description: 'Identifica le valute più forti e più deboli.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'Lo Scudo Supremo', description: 'Imposta rischio e SL per avere l\'esatta dimensione del lotto.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Tracker Prop Firm', description: 'Monitora i limiti di Drawdown per i conti finanziati.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Piano di Recupero', description: 'La roadmap matematica per recuperare dal drawdown.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Test di Sopravvivenza', description: 'Controlla se il tuo Rischio di Rovina è > 0%.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Hai un Vantaggio?', description: 'La tua aspettativa matematica in tempo reale.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Il Laboratorio', description: 'Esegui backtest prima di fare trading dal vivo.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Il Cuore del Sistema', description: 'Il tuo Diario di Trading. Tutti i dati del terminale si sincronizzano da qui.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Gestione Multi-Conto', description: 'Aggiungi, modifica, elimina e passa da un conto di trading all\'altro.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Competizioni', description: 'Accedi ai tornei globali (Robbins, Darwinex, ecc.).', side: 'top', align: 'center' } }
    ],
    es: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navegación', description: 'Alterna entre Trading Tradicional y Web3/Crypto (Escáner IA, Torneos).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Sesiones de Mercado', description: 'Controla las superposiciones de sesiones (Londres/NY) para mayor volatilidad.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Calendario Económico', description: 'No operes a ciegas durante las noticias importantes (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Mapa de Calor de Divisas', description: 'Identifica las divisas más fuertes y débiles.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'El Escudo Definitivo', description: 'Establece tu riesgo y SL. Obtiene el tamaño de lote exacto.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Rastreador Prop Firm', description: 'Supervisa tus límites de Drawdown para cuentas fondeadas.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Plan de Recuperación', description: 'Ruta matemática para recuperarse del drawdown.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Prueba de Supervivencia', description: 'Comprueba si tu Riesgo de Ruina es > 0%.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: '¿Tienes una Ventaja?', description: 'Tu esperanza matemática en tiempo real.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'El Laboratorio', description: 'Haz backtest antes de operar en vivo.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'El Motor Principal', description: 'Tu Diario de Trading. Todos los datos del terminal provienen de aquí.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Gestión Multicuenta', description: 'Añade, edita, elimina y alterna entre múltiples cuentas de trading.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Competiciones', description: 'Accede a torneos globales (Robbins, Darwinex, etc.).', side: 'top', align: 'center' } }
    ],
    de: [
      { element: '#tour-terminal-tabs', popover: { title: 'Navigation', description: 'Wechsle zwischen Traditionellem Trading und Web3/Krypto (KI-Scanner, Turniere).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Markt-Sessionen', description: 'Verfolge Überschneidungen der Sessionen (London/NY) für Volatilität.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Wirtschaftskalender', description: 'Trade nicht blind während wichtiger Nachrichten (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Währungs-Heatmap', description: 'Identifiziere die stärksten und schwächsten Währungen.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'Der Ultimative Schild', description: 'Lege Risiko und SL fest. Berechnet genaue Lot-Größen.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Prop Firm Tracker', description: 'Überwache Drawdown-Limits für finanzierte Konten.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'Recovery-Plan', description: 'Mathematischer Fahrplan, um sich vom Drawdown zu erholen.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Überlebenstest', description: 'Prüfe, ob dein Ruinrisiko > 0% ist.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Hast du einen Edge?', description: 'Deine mathematische Erwartung in Echtzeit.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Das Labor', description: 'Führe Backtests durch, bevor du live tradest.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Der Hauptmotor', description: 'Dein Trading-Journal. Alle Terminal-Daten synchronisieren sich von hier.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Multi-Konto-Manager', description: 'Füge hinzu, bearbeite, lösche und wechsle zwischen Trading-Konten.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Wettbewerbe', description: 'Zugang zu globalen Turnieren (Robbins, Darwinex, etc.).', side: 'top', align: 'center' } }
    ],
    ru: [
      { element: '#tour-terminal-tabs', popover: { title: 'Навигация', description: 'Переключайтесь между традиционным трейдингом и Web3/Крипто (ИИ Сканер, Турниры).', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: 'Торговые Сессии', description: 'Отслеживайте пересечение сессий (Лондон/НЙ) для волатильности.', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: 'Экономический Календарь', description: 'Не торгуйте вслепую во время важных новостей (NFP, FOMC).', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: 'Тепловая Карта Валют', description: 'Определяйте самые сильные и слабые валюты.', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: 'Абсолютный Щит', description: 'Установите риск и SL для точного расчета лотов.', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'Трекер Проп-Компаний', description: 'Контролируйте лимиты просадки профинансированных счетов.', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'План Восстановления', description: 'Математический план для выхода из просадки.', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'Тест на Выживание', description: 'Проверьте, превышает ли риск разорения 0%.', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: 'Есть ли у вас преимущество?', description: 'Ваше математическое ожидание в реальном времени.', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: 'Лаборатория', description: 'Проводите бэктестинг перед реальной торговлей.', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'Главный Двигатель', description: 'Ваш торговый журнал. Все данные синхронизируются отсюда.', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'Управление Счетами', description: 'Добавляйте, удаляйте, редактируйте и переключайте торговые счета.', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'Турниры', description: 'Глобальные турниры (Robbins, Darwinex и т.д.).', side: 'top', align: 'center' } }
    ],
    ja: [
      { element: '#tour-terminal-tabs', popover: { title: 'ナビゲーション', description: '伝統的な取引とWeb3/暗号通貨（AIスキャナー、トーナメント）を切り替えます。', side: 'bottom', align: 'center' } },
      { element: '#tour-market-sessions', popover: { title: '市場セッション', description: 'ボラティリティのためのセッション重複（ロンドン/NY）を追跡します。', side: 'bottom', align: 'center' } },
      { element: '#tour-eco-calendar', popover: { title: '経済カレンダー', description: '重要なニュース（NFP、FOMC）中は盲目的に取引しないでください。', side: 'top', align: 'center' } },
      { element: '#tour-heatmap', popover: { title: '通貨ヒートマップ', description: '最も強い通貨と弱い通貨を特定します。', side: 'top', align: 'center' } },
      { element: '#tour-pos-calc', popover: { title: '究極の盾', description: 'リスクとSLを設定し、正確なロットサイズを計算します。', side: 'bottom', align: 'center' } },
      { element: '#tour-prop-firm', popover: { title: 'プロップファームトラッカー', description: '資金提供された口座のドローダウン制限を監視します。', side: 'bottom', align: 'center' } },
      { element: '#tour-recovery-calc', popover: { title: 'リカバリープラン', description: 'ドローダウンから回復するための数学的ロードマップ。', side: 'bottom', align: 'center' } },
      { element: '#tour-risk-ruin', popover: { title: 'サバイバルテスト', description: '破産リスクが0％を超えているか確認します。', side: 'top', align: 'center' } },
      { element: '#tour-edge-calc', popover: { title: '優位性はありますか？', description: 'リアルタイムの数学的期待値。', side: 'top', align: 'center' } },
      { element: '#tour-backtest', popover: { title: '研究所', description: 'ライブ取引の前にアイデアをバックテストします。', side: 'top', align: 'center' } },
      { element: '#tour-trading-journal', popover: { title: 'コアエンジン', description: 'あなたの取引ジャーナル。すべてのターミナルデータはここから同期されます。', side: 'top', align: 'center' } },
      { element: '#tour-account-switcher', popover: { title: 'マルチ口座管理', description: '取引口座の追加、編集、削除、切り替えを行います。', side: 'top', align: 'center' } },
      { element: '#tour-competitions', popover: { title: 'コンペティション', description: 'グローバルトーナメント（Robbins、Darwinexなど）にアクセスします。', side: 'top', align: 'center' } }
    ]
  };
  const startTerminalTour = () => {
    setActiveTab('TRADING');
    const steps = tourTranslations[language as keyof typeof tourTranslations] || tourTranslations['en'];
    setTimeout(() => {
      
      const loc = {
        fr: { d: 'Terminer', n: 'Suivant →', p: '← Précédent' },
        en: { d: 'Finish', n: 'Next →', p: '← Prev' },
        it: { d: 'Finito', n: 'Avanti →', p: '← Prec' },
        es: { d: 'Terminar', n: 'Siguiente →', p: '← Ant' },
        de: { d: 'Fertig', n: 'Weiter →', p: '← Zurück' },
        ru: { d: 'Завершить', n: 'Вперед →', p: '← Назад' },
        ja: { d: '終了', n: '次へ →', p: '← 前へ' }
      }[language] || { d: 'Finish', n: 'Next →', p: '← Prev' };

      const getVoiceLang = (l: string) => {
        const map: Record<string, string> = { fr: 'fr-FR', en: 'en-US', it: 'it-IT', es: 'es-ES', de: 'de-DE', ru: 'ru-RU', ja: 'ja-JP' };
        return map[l] || 'en-US';
      };

      const d = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: loc.d,
        nextBtnText: loc.n,
        prevBtnText: loc.p,
        steps: steps as any,
        onHighlightStarted: (element, step: any) => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToSpeak = step.popover?.title + ". " + step.popover?.description;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = getVoiceLang(language);
            utterance.rate = 1.05; // Léger boost de vitesse pour le dynamisme
            window.speechSynthesis.speak(utterance);
          }
        },
        onDestroyed: () => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
        }
      });

      d.drive();
    }, 100);
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 animate-in fade-in zoom-in-95 duration-500 mt-24">
      
      {/* HEADER & TOUR BUTTON */}
      <div className="flex flex-col md:flex-row relative justify-center items-center gap-6 md:gap-0 mb-8 border-b border-white/5 pb-4" id="tour-terminal-tabs">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('TRADING')}
            className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'TRADING' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            TRADING
            {activeTab === 'TRADING' && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('CRYPTO')}
            className={`text-sm font-bold tracking-widest uppercase transition-colors relative ${
              activeTab === 'CRYPTO' ? 'text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            CRYPTO
            {activeTab === 'CRYPTO' && (
              <div className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-white shadow-[0_0_10px_white]" />
            )}
          </button>
        </div>
        <button 
          onClick={startTerminalTour}
          className="md:absolute md:right-0 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)] w-full md:w-auto justify-center"
        >
          <HelpCircle className="w-4 h-4" /> {tRoot.termTour}
        </button>
      </div>

      <div className="space-y-16 mb-24">
        
        {activeTab === 'TRADING' && (
          <>
            {/* SECTION: PULSE (Contexte de Marché) */}
            <section className="animate-in fade-in duration-500">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Activity className="w-4 h-4"/> Market Pulse
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-12" id="tour-market-sessions">
                  <MarketSessions />
                </div>
                <div className="xl:col-span-6 h-[500px]" id="tour-eco-calendar">
                  <EconomicCalendar />
                </div>
                <div className="xl:col-span-6 h-[500px]" id="tour-heatmap">
                  <MarketHeatmap />
                </div>
              </div>
            </section>

            {/* SECTION: RISK ENGINE (La Défense) */}
            <section className="animate-in fade-in duration-500 delay-75">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <ShieldAlert className="w-4 h-4"/> Risk Engine
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                <div id="tour-pos-calc"><PositionCalculator /></div>
                <div id="tour-prop-firm"><PropFirmManager /></div>
                <div id="tour-recovery-calc"><RecoveryCalculator /></div>
              </div>
            </section>

            {/* SECTION: EDGE & STRATEGY (L'Offensive) */}
            <section className="animate-in fade-in duration-500 delay-100">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Target className="w-4 h-4"/> Edge & Strategy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
                <div id="tour-risk-ruin"><RiskOfRuin /></div>
                <div id="tour-edge-calc"><EdgeCalculator /></div>
                <div id="tour-backtest"><BacktestJournal /></div>
              </div>
            </section>

            {/* SECTION: LOGS (L'Enregistrement) */}
            <section className="animate-in fade-in duration-500 delay-150">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BookOpen className="w-4 h-4"/> Trading Journal
              </h2>
              <div className="grid grid-cols-1 gap-6" id="tour-trading-journal">
                <TradingJournal />
              </div>
            </section>
            
            {/* SECTION: COMPETITIONS TRADING */}
            <section className="animate-in fade-in duration-500 delay-200">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> {tRoot.termCompTrading}
              </h2>
              <div id="tour-competitions" className="grid grid-cols-1 gap-6">
                <Competitions type="TRADING" />
              </div>
            </section>
          </>
        )}

        {activeTab === 'CRYPTO' && (
          <>
            {/* SECTION: WEB3 & CRYPTO INTELLIGENCE */}
            <section className="animate-in fade-in duration-500">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <BrainCircuit className="w-4 h-4"/> {tRoot.termWeb3}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <CryptoAIScanner />
              </div>
            </section>

            {/* SECTION: COMPETITIONS CRYPTO */}
            <section className="animate-in fade-in duration-500 delay-100">
              <h2 className="text-white/30 font-bold tracking-widest text-xs mb-6 uppercase flex items-center gap-2">
                 <Trophy className="w-4 h-4"/> {tRoot.termCompCrypto}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                <Competitions type="CRYPTO" />
              </div>
            </section>
          </>
        )}

      </div>
    </div>
  );
}
