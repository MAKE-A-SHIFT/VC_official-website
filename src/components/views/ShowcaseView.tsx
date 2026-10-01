"use client";
import { ArrowRight, MonitorPlay } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { translations } from "@/i18n";

export function ShowcaseView() {
  const { toggleTerminalMode, language, setActiveLegalDoc } = useAppStore();
  const t = translations[language];

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 mb-24 mt-12 px-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest text-zinc-400 mb-4 uppercase">
          {t.heroBadge}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
          {t.heroTitle1} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">{t.heroTitle2}</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.heroSub}
        </p>
        <a href="https://t.me/vc_teamparaguay" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors mt-8">
          {t.heroCta} <ArrowRight className="w-5 h-5" />
        </a>
      </section>

      {/* Ton Chemin Avec Notre Académie */}
      <section className="max-w-[1400px] mx-auto px-6 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.pathTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">{t.pathAcademy}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-zinc-900 w-full relative">
              <img src="/images/live-trading.jpg" alt={t.card1Title1} className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold mb-4 text-white">{t.card1Title1} <span className="text-green-500">{t.card1Title2}</span></h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.card1Desc}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-zinc-900 w-full relative">
              <img src="/images/communaute.jpg" alt={t.card2Title1} className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold mb-4 text-white">{t.card2Title1} <span className="text-violet-500">{t.card2Title2}</span> {t.card2Title3}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.card2Desc}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-zinc-900 w-full relative">
              <img src="/images/modules.jpg" alt={t.card3Title1} className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold mb-4 text-white">{t.card3Title1} <span className="text-green-500">{t.card3Title2}</span></h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.card3Desc}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-zinc-900 w-full relative">
              <img src="/images/trades.jpg" alt={t.card4Title2} className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold mb-4 text-white">{t.card4Title1} <span className="text-violet-500">{t.card4Title2}</span></h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.card4Desc}</p>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col">
            <div className="h-40 bg-zinc-900 w-full relative">
              <img src="/images/capital.jpg" alt={t.card5Title2} className="w-full h-full object-cover opacity-50 grayscale" />
            </div>
            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold mb-4 text-white">{t.card5Title1} <span className="text-green-500">{t.card5Title2}</span> {t.card5Title3}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{t.card5Desc}</p>
            </div>
          </div>

        </div>
      </section>

      {/* Vos Étapes Suivantes */}
      <section className="max-w-[1200px] mx-auto px-6 py-24 border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-16 relative">
          <h2 className="text-3xl font-bold whitespace-nowrap lg:w-[300px]">{t.stepsTitle}</h2>
          
          <div className="flex-1 flex justify-between relative w-full mt-8 lg:mt-0">
            <div className="absolute left-4 right-4 top-5 h-[1px] bg-white/10 -z-10"></div>
            <div className="absolute left-1/2 right-4 top-5 h-[1px] bg-violet-500/50 -z-10 hidden md:block"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white/50 font-bold mb-8 z-10">1</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black border border-violet-500 flex items-center justify-center text-white font-bold mb-8 z-10 shadow-[0_0_15px_rgba(139,92,246,0.3)]">2</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center text-white/50 font-bold mb-8 z-10">3</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="md:pr-8">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xl font-bold">{t.step1Title}</h3>
              <span className="text-violet-500 text-xs font-bold tracking-widest">{t.step1Badge}</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{t.step1Desc}</p>
          </div>
          <div className="border border-green-500/50 rounded-lg p-6 bg-[#050f05] shadow-[0_0_30px_rgba(34,197,94,0.05)] relative md:-mt-6">
            <h3 className="text-xl font-bold mb-4 text-white">{t.step2Title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{t.step2Desc}</p>
          </div>
          <div className="md:pl-8">
            <h3 className="text-xl font-bold mb-4">{t.step3Title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{t.step3Desc}</p>
          </div>
        </div>
      </section>

      {/* Nos Outils */}
      <section className="max-w-[1400px] mx-auto px-6 py-24 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold mb-16">{t.toolsTitle1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">{t.toolsTitle2}</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: t.tool1Name, img: '/images/tool-position.jpg' },
            { title: t.tool2Name, img: '/images/tool-calendar.jpg' },
            { title: t.tool3Name, img: '/images/tool-risk.jpg' },
            { title: t.tool4Name, img: '/images/tool-edge.jpg' }
          ].map((tool, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden flex flex-col hover:border-white/20 transition-all group shadow-none">
              <div className="h-40 bg-zinc-900 w-full relative">
                <img src={tool.img} alt={tool.title} className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-70 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col flex-1 items-center text-center justify-between gap-6">
                <h4 className="font-bold text-lg text-white">{tool.title}</h4>
                <button onClick={toggleTerminalMode} className="w-full bg-white/5 hover:bg-white text-white hover:text-black py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 border border-white/10 hover:border-transparent">
                  {t.btnOpen} <MonitorPlay className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI JE FAIS CELA ? */}
      <section className="max-w-4xl mx-auto px-6 py-24 border-t border-white/10">
        <h2 className="text-3xl font-bold mb-12 text-center tracking-tight"><span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700">{t.storyTitle1}</span>{t.storyTitle2}</h2>
        <div className="text-zinc-300 text-lg leading-relaxed space-y-6 font-light whitespace-pre-wrap">
          {t.storyText}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
        <div className="border border-green-500/30 bg-[#050f05] rounded-2xl p-12 relative overflow-hidden shadow-[0_0_50px_rgba(34,197,94,0.05)]">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <h2 className="text-4xl font-extrabold text-white mb-6 relative z-10">{t.manifestoTitle}</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto relative z-10">{t.manifestoText}</p>
          <a href="https://t.me/vc_teamparaguay" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-zinc-200 transition-colors relative z-10">
            {t.manifestoCta} <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

    </div>
  );
}
