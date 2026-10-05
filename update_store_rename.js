const fs = require('fs');
let store = fs.readFileSync('src/store/useAppStore.ts', 'utf8');

if (!store.includes('renameAccount:')) {
  store = store.replace(
    'removeAccount: (acc: string) => void;',
    'removeAccount: (acc: string) => void;\n  renameAccount: (oldName: string, newName: string) => void;'
  );
  
  store = store.replace(
    'removeAccount: (acc) => set((state) => ({ accounts: state.accounts.filter(a => a !== acc) })),',
    'removeAccount: (acc) => set((state) => ({ accounts: state.accounts.filter(a => a !== acc) })),\n  renameAccount: (oldName, newName) => set((state) => ({\n    accounts: state.accounts.map(a => a === oldName ? newName : a),\n    trades: state.trades.map(t => t.account === oldName ? { ...t, account: newName } : t)\n  })),'
  );
  
  fs.writeFileSync('src/store/useAppStore.ts', store);
  console.log('Added renameAccount to store');
} else {
  console.log('renameAccount already exists');
}
