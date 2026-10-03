const fs = require('fs');
let tv = fs.readFileSync('src/components/views/TerminalView.tsx', 'utf8');

const newDriverConfig = `
      const getVoiceLang = (l: string) => {
        const map: Record<string, string> = { fr: 'fr-FR', en: 'en-US', it: 'it-IT', es: 'es-ES', de: 'de-DE', ru: 'ru-RU', ja: 'ja-JP' };
        return map[l] || 'en-US';
      };

      const d = driver({
        showProgress: true,
        animate: true,
        allowClose: true,
        doneBtnText: loc.d,
        nextBtnText: loc.n,
        prevBtnText: loc.p,
        steps: steps as any,
        onHighlightStarted: (element, step: any) => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const textToSpeak = step.popover?.title + ". " + step.popover?.description;
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = getVoiceLang(language);
            utterance.rate = 1.05; // Léger boost de vitesse pour le dynamisme
            window.speechSynthesis.speak(utterance);
          }
        },
        onDestroyed: () => {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
          }
        }
      });
`;

tv = tv.replace(/const d = driver\(\{[\s\S]*?steps: steps as any\s*\}\);/, newDriverConfig.trim());

fs.writeFileSync('src/components/views/TerminalView.tsx', tv);
console.log('Injected TTS into driver.js');
