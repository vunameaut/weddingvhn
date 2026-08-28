const fs = require('fs');

// Fix OpeningScreen.tsx - the self-closing div issue
let c = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\OpeningScreen.tsx', 'utf8');
c = c.replace("background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.45) 100%)' }} /", "background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.45) 100%)' }} />");
fs.writeFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\OpeningScreen.tsx', c, 'utf8');
console.log('Fixed OpeningScreen');

// Fix ThemeSwitcher.tsx line 55
c2 = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx', 'utf8');
const lines = c2.split('\n');
lines[54] = '      <div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? \'opacity-100 translate-y-0 pointer-events-auto\' : \'opacity-0 translate-y-4 pointer-events-none\'}`}>';
fs.writeFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx', lines.join('\n'), 'utf8');
console.log('Fixed ThemeSwitcher');
