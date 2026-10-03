const fs = require('fs');

let show = fs.readFileSync('src/components/views/ShowcaseView.tsx', 'utf8');

show = show.replace(/Rejoindre TA Salle des Marchés/g, "{t.heroCtaTerminal}");

fs.writeFileSync('src/components/views/ShowcaseView.tsx', show);
console.log('Fixed ShowcaseView.tsx i18n!');
