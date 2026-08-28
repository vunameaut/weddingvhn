const fs = require('fs');

// 1. Patch Index.tsx hero - add background image
const idx = 'D:\\hoc tap\\web\\weddingvhn\\src\\pages\\Index.tsx';
let c = fs.readFileSync(idx, 'utf8');
const old = '<section className="min-h-screen flex items-center justify-center bg-gradient-romantic relative px-4">';
const nw = '<section className="min-h-screen flex items-center justify-center relative px-4">\n        <div className="absolute inset-0">\n          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=faces" alt="Couple" className="w-full h-full object-cover" />\n        </div>\n        <div className="absolute inset-0" style={{ background: \'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)\' }} />';
if (c.includes(old)) {
  c = c.replace(old, nw);
  fs.writeFileSync(idx, c, 'utf8');
  console.log('1. Hero patched OK');
} else {
  console.log('1. Hero: old pattern not found');
}

// 2. Fix ThemeSwitcher L55
const ts = 'D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx';
let t = fs.readFileSync(ts, 'utf8');
const tl = t.split('\n');
if (tl[54] && tl[54].includes('"fixed bottom-24')) {
  tl[54] = '<div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? \'opacity-100 translate-y-0 pointer-events-auto\' : \'opacity-0 translate-y-4 pointer-events-none\'}`}>';
  fs.writeFileSync(ts, tl.join('\n'), 'utf8');
  console.log('2. ThemeSwitcher L55 fixed');
} else {
  console.log('2. ThemeSwitcher L55: pattern not found or already fixed');
  console.log('   L55:', JSON.stringify(tl[54]).substring(0, 80));
}