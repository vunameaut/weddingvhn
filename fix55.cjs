const fs = require('fs');
const f = 'D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx';
let c = fs.readFileSync(f, 'utf8');

// Fix the broken className line
c = c.replace(
  /className=\{"fixed bottom-24 right-6 z-\[9999\] transition-all duration-300 "\s*\+\s*\(isOpen \? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-auto'\)}/,
  "className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}"
);

fs.writeFileSync(f, c, 'utf8');
console.log('Fixed. Line 55 now has: ', c.split('\n').find(l => l.includes('fixed bottom-24')));
