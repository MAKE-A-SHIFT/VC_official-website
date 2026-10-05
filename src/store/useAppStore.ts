import { create } from 'zustand';

export type Language = 'en' | 'fr' | 'it' | 'es' | 'de' | 'ru' | 'ja';

// Definition of a Trade inside the store so everything can share it
export interface Trade {
  id: string;
  date: string;
  asset: string;
  direction: "LONG" | "SHORT";
  pnl: number;
  playbook: string;
  mistakes: string[];
  mfe: number;
  mae: number;
  account: string;
}

interface AppState {
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeLegalDoc: string | null;
  setActiveLegalDoc: (doc: string | null) => void;
  
  // Global Trading State
  activeAccount: string;
  setActiveAccount: (acc: string) => void;
  trades: Trade[];
  setTrades: (trades: Trade[]) => void;
  
  // Customization State
  accounts: string[];
  addAccount: (acc: string) => void;
  removeAccount: (acc: string) => void;
  playbooks: string[];
  addPlaybook: (pb: string) => void;
  removePlaybook: (pb: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isTerminalMode: false,
  toggleTerminalMode: () => set((state) => ({ isTerminalMode: !state.isTerminalMode })),
  language: 'fr',
  setLanguage: (lang) => set({ language: lang }),
  activeLegalDoc: null,
  setActiveLegalDoc: (doc) => set({ activeLegalDoc: doc }),
  
  // Global Trading State Initialization
  activeAccount: 'ALL',
  setActiveAccount: (acc) => set({ activeAccount: acc }),
  trades: [],
  setTrades: (trades) => set({ trades }),
  
  accounts: ["FUNDED_1", "CHALLENGE", "PERSONAL"],
  addAccount: (acc) => set((state) => ({ accounts: [...state.accounts, acc] })),
  removeAccount: (acc) => set((state) => ({ accounts: state.accounts.filter(a => a !== acc) })),
  
  playbooks: ["Silver Bullet", "London Breakout", "FVG Retracement", "Trend Continuation"],
  addPlaybook: (pb) => set((state) => ({ playbooks: [...state.playbooks, pb] })),
  removePlaybook: (pb) => set((state) => ({ playbooks: state.playbooks.filter(p => p !== pb) })),
}));
