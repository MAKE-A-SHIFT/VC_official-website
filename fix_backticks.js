const fs = require('fs');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\\\`/g, '\`');
  content = content.replace(/\\\$/g, '$');
  fs.writeFileSync(filePath, content);
}

fixFile('src/components/tools/CryptoAIScanner.tsx');
fixFile('src/app/api/scanner/route.ts');
console.log('Fixed files');
