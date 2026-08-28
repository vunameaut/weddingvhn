const fs = require('fs');
const f = 'D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');
lines[54] = '      <div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? \'opacity-100 translate-y-0 pointer-events-auto\' : \'opacity-0 translate-y-4 pointer-events-none\'}`}>';
fs.writeFileSync(f, lines.join('\n'), 'utf8');
console.log('Fixed L55');
