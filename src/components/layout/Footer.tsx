"use client";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";
import { TerminalTicker } from "../tools/TerminalTicker";

export function Footer() {
  const { language, setActiveLegalDoc } = useAppStore();
  const t = translations[language];

  return (
    <footer className="border-t border-white/5 py-12 w-full mt-auto">
      <div className="max-w-[1600px] mx-auto px-6 mb-12">
        <TerminalTicker />
      </div>
      <div className="max-w-[1400px] mx-auto text-center space-y-8 px-6">
        <p className="text-[10px] text-zinc-600 max-w-4xl mx-auto leading-relaxed uppercase tracking-widest font-semibold">
          {t.footerRisk}
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
          <button onClick={() => setActiveLegalDoc("mentions")} className="hover:text-white transition-colors">{t.legalMentions}</button>
          <button onClick={() => setActiveLegalDoc("privacy")} className="hover:text-white transition-colors">{t.legalPrivacy}</button>
          <button onClick={() => setActiveLegalDoc("terms")} className="hover:text-white transition-colors">{t.legalTerms}</button>
          <button onClick={() => setActiveLegalDoc("risk")} className="hover:text-white transition-colors">{t.legalRisk}</button>
        </div>
        <div className="text-[10px] text-zinc-700 font-bold tracking-widest mt-8">
          © {new Date().getFullYear()} VALHALLA CAPITAL LLC.
        </div>
      </div>
    </footer>
  );
}
