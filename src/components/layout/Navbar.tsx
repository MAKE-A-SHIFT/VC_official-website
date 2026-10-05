"use client";

import { useEffect, useRef } from "react";
import { useAppStore, Language } from "@/store/useAppStore";
import { translations } from "@/i18n";
import { Terminal, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const { isTerminalMode, toggleTerminalMode, language, setLanguage } = useAppStore();
  const t = translations[language];
  const isFirstLoad = useRef(true);

  // Auto-détection de la langue du navigateur
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      const supported: Language[] = ['en', 'fr', 'it', 'es', 'de', 'ru', 'ja'];
      if (supported.includes(browserLang as Language)) {
        setLanguage(browserLang as Language);
      }
    }
  }, [setLanguage]);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel px-6 py-4 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-xl font-bold tracking-tighter text-white">
            VALHALLA<span className="text-zinc-500">CAPITAL</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <div className="relative flex items-center">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-white/70 text-sm font-bold tracking-wider outline-none cursor-pointer hover:text-white transition-colors border-none appearance-none pr-4 uppercase"
            >
              <option value="en" className="bg-black text-white">EN</option>
              <option value="fr" className="bg-black text-white">FR</option>
              <option value="it" className="bg-black text-white">IT</option>
              <option value="es" className="bg-black text-white">ES</option>
              <option value="de" className="bg-black text-white">DE</option>
              <option value="ru" className="bg-black text-white">RU</option>
              <option value="ja" className="bg-black text-white">JA</option>
            </select>
            <div className="absolute right-0 pointer-events-none">
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          <button
            onClick={toggleTerminalMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
              isTerminalMode 
                ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-green-400" 
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
            }`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isTerminalMode ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isTerminalMode ? (
                <Terminal className="w-4 h-4" />
              ) : (
                <LayoutDashboard className="w-4 h-4" />
              )}
            </motion.div>
            <span className="text-sm font-medium tracking-wide hidden sm:block">
              {isTerminalMode ? t.navTerminal : t.navShowcase}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
