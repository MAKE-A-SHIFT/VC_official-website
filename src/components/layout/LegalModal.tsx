"use client";
import { useAppStore } from "@/store/useAppStore";
import { X } from "lucide-react";
import { translations } from "@/i18n";

export function LegalModal() {
  const { activeLegalDoc, setActiveLegalDoc, language } = useAppStore();
  const t = translations[language];

  if (!activeLegalDoc) return null;

  let title = "";
  let content = null;

  if (activeLegalDoc === "mentions") {
    title = t.legalMentions;
    content = <div className="space-y-4 text-sm text-zinc-400">
      <p><strong>Éditeur du site :</strong> VALHALLA CAPITAL LLC</p>
      <p><strong>Siège social :</strong> Asunción, Paraguay (Régulation et juridiction applicable).</p>
      <p><strong>Contact :</strong> legal@valhallacapital.com</p>
      <p><strong>Hébergement :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.</p>
      <p>Valhalla Capital fournit des outils d'analyse et du contenu éducatif. Nous ne sommes pas des conseillers financiers régis par l'AMF (France) et nos services respectent les cadres législatifs internationaux depuis le Paraguay.</p>
    </div>;
  } else if (activeLegalDoc === "privacy") {
    title = t.legalPrivacy;
    content = <div className="space-y-4 text-sm text-zinc-400">
      <p>Conformément au RGPD (pour nos utilisateurs européens) et aux lois internationales de protection des données.</p>
      <p>Les données collectées (ex. langue du navigateur) sont utilisées uniquement à des fins d'optimisation de l'affichage local.</p>
      <p>Aucune donnée financière ou d'identité personnelle n'est stockée sur nos serveurs web. L'accès à nos groupes et à la communauté est géré de manière cryptée et externe via Telegram.</p>
    </div>;
  } else if (activeLegalDoc === "terms") {
    title = t.legalTerms;
    content = <div className="space-y-4 text-sm text-zinc-400">
      <p>Les informations, calculateurs et outils de données fournis par Valhalla Capital sont strictement à but éducatif et informatif.</p>
      <p>L'utilisateur reconnaît que l'utilisation de nos outils (Calculateurs de Risque, Edge, Calendrier) ne constitue pas une incitation à investir, ni un conseil financier ou fiscal.</p>
      <p>En naviguant sur ce site et en rejoignant notre canal Telegram, vous acceptez que l'entreprise décline toute responsabilité quant à vos résultats sur les marchés financiers. Tout litige sera soumis à la juridiction exclusive des tribunaux d'Asunción, Paraguay.</p>
    </div>;
  } else if (activeLegalDoc === "risk") {
    title = t.legalRisk;
    content = <div className="space-y-4 text-sm text-zinc-400">
      <p><strong>Avertissement sur les risques :</strong> Le trading sur instruments financiers (CFD, Forex, Futures, Options) comporte un niveau de risque exceptionnellement élevé et peut ne pas convenir à tous les investisseurs. Vous pouvez subir une perte de la totalité ou de plus de votre capital initial.</p>
      <p>Historiquement, une vaste majorité (entre 74% et 89%) des comptes d'investisseurs de détail perdent de l'argent lors de la négociation de CFD.</p>
      <p>Vous devez vous assurer que vous comprenez le fonctionnement des marchés, le traitement du flux d'ordres (Orderflow), et que vous pouvez vous permettre de prendre le risque élevé de perdre votre argent. Ne tradez qu'avec du capital de risque que vous pouvez vous permettre de perdre sans que cela n'affecte votre style de vie.</p>
    </div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl relative">
        
        {/* Glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-green-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex items-center justify-between p-6 border-b border-white/5 relative z-10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={() => setActiveLegalDoc(null)} className="text-zinc-500 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto relative z-10">
          {content}
        </div>
      </div>
    </div>
  );
}
