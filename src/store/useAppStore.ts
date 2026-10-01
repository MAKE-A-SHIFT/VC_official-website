import { create } from 'zustand';

export type Language = 'fr' | 'it' | 'es' | 'de' | 'ru' | 'ja';

interface AppState {
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeLegalDoc: string | null;
  setActiveLegalDoc: (doc: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isTerminalMode: false,
  toggleTerminalMode: () => set((state) => ({ isTerminalMode: !state.isTerminalMode })),
  language: 'fr',
  setLanguage: (lang) => set({ language: lang }),
  activeLegalDoc: null,
  setActiveLegalDoc: (doc) => set({ activeLegalDoc: doc }),
}));
