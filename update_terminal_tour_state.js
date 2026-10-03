const fs = require('fs');

let tv = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');

// 1. Add isTourActive state
if (!tv.includes('const [isTourActive')) {
  tv = tv.replace(
    "const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');",
    "const [activeTab, setActiveTab] = useState<'TRADING' | 'CRYPTO'>('TRADING');\n  const [isTourActive, setIsTourActive] = useState(false);"
  );
}

// 2. Set isTourActive to true when tour starts
tv = tv.replace(
  "setActiveTab('TRADING');\n      const steps =",
  "setActiveTab('TRADING');\n      setIsTourActive(true);\n      const steps ="
);

// 3. Set isTourActive to false when tour ends
tv = tv.replace(
  "onDestroyed: () => {\n          if ('speechSynthesis' in window)",
  "onDestroyed: () => {\n          setIsTourActive(false);\n          if ('speechSynthesis' in window)"
);

// 4. Update the render logic so both are visible during tour
tv = tv.replace(
  "{activeTab === 'TRADING' && (",
  "{(activeTab === 'TRADING' || isTourActive) && ("
);
tv = tv.replace(
  "{activeTab === 'CRYPTO' && (",
  "{(activeTab === 'CRYPTO' || isTourActive) && ("
);

// 5. Add id to Crypto Competitions wrapper
tv = tv.replace(
  /<div className="grid grid-cols-1 gap-6">\s*<Competitions type="CRYPTO" \/>/g,
  '<div id="tour-crypto-competitions" className="grid grid-cols-1 gap-6">\n                <Competitions type="CRYPTO" />'
);

fs.writeFileSync('src/components/views/TerminalView.tsx', tv);
console.log('Modified TerminalView logic for tour');
