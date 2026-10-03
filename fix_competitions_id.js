const fs = require('fs');
let tv = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');

if (!tv.includes('id="tour-competitions"')) {
  tv = tv.replace(
    '<div className="grid grid-cols-1 gap-6">\n                <Competitions type="TRADING" />',
    '<div id="tour-competitions" className="grid grid-cols-1 gap-6">\n                <Competitions type="TRADING" />'
  );
  
  if (!tv.includes('id="tour-competitions"')) {
    console.log('Failed to replace TRADING competitions div with exact match, trying regex...');
    tv = tv.replace(
      /<div className="grid grid-cols-1 gap-6">\s*<Competitions type="TRADING" \/>/g,
      '<div id="tour-competitions" className="grid grid-cols-1 gap-6">\n                <Competitions type="TRADING" />'
    );
  }
}

fs.writeFileSync('src/components/views/TerminalView.tsx', tv);
console.log('Injected tour-competitions ID into JSX');
