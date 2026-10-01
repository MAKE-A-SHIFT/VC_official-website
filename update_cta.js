const fs = require('fs');
const file = 'src/i18n/index.ts';
let code = fs.readFileSync(file, 'utf8');

const replacements = [
  { old: 'heroCta: "Rejoindre la Salle des Marchés"', new: 'heroCta: "Rejoindre notre Salle des Marchés"' },
  { old: 'heroCta: "Unisciti alla Trading Room"', new: 'heroCta: "Unisciti alla nostra Trading Room"' },
  { old: 'heroCta: "Únete a la Sala de Trading"', new: 'heroCta: "Únete a nuestra Sala de Trading"' },
  { old: 'heroCta: "Treten Sie dem Trading Room bei"', new: 'heroCta: "Treten Sie unserem Trading Room bei"' },
  { old: 'heroCta: "Присоединиться к Торговому Залу"', new: 'heroCta: "Присоединиться к нашему Торговому Залу"' },
  { old: 'heroCta: "トレーディングルームに参加"', new: 'heroCta: "私たちのトレーディングルームに参加"' }
];

for (const r of replacements) {
  code = code.replace(r.old, r.new);
}
fs.writeFileSync(file, code);
console.log('Translations updated.');
