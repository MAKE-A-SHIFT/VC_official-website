"use client";

import { useAppStore } from "@/store/useAppStore";
import { ShowcaseView } from "@/components/views/ShowcaseView";
import { TerminalView } from "@/components/views/TerminalView";
import { LegalModal } from "@/components/layout/LegalModal";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const { isTerminalMode } = useAppStore();

  return (
    <div className="w-full min-h-screen transition-all duration-500 flex flex-col">
      <div className="flex-1">
        {isTerminalMode ? <TerminalView /> : <ShowcaseView />}
      </div>
      <Footer />
      <LegalModal />
    </div>
  );
}
