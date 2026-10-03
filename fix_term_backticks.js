const fs = require('fs');

const fixBackticks = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(filePath, content);
};

fixBackticks('src/components/views/TerminalView.tsx');
console.log('Fixed backticks!');
