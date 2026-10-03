const fs = require('fs');

const fixBackticks = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(filePath, content);
};

fixBackticks('src/components/tools/RiskOfRuin.tsx');
console.log('Fixed backticks!');
