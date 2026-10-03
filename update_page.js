const fs = require('fs');

const targetPath = 'src/app/page.tsx';
let content = fs.readFileSync(targetPath, 'utf8');

// The new button to toggle terminal mode
const terminalButton = `
            <button 
              onClick={toggleTerminalMode}
              className="px-8 py-4 border border-white/20 text-white font-bold rounded-xl tracking-widest uppercase hover:bg-white/5 transition-all w-full md:w-auto"
            >
              Rejoindre TA Salle des Marchés
            </button>
`;

// Insert the new button after the existing Telegram CTA in the Hero Section
content = content.replace(
  /<a href="https:\/\/t\.me\/valhallacapital"[^>]*>\s*<button[^>]*>\s*\{t\.heroCta\}\s*<\/button>\s*<\/a>/,
  `$&
            {/* Nouveau Bouton Terminal */}
            ${terminalButton}`
);

fs.writeFileSync(targetPath, content);
console.log('Successfully injected Terminal CTA in Landing Page!');
