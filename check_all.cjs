const fs = require('fs');

// Check OpeningScreen
const os = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\OpeningScreen.tsx', 'utf8');
console.log('=== OpeningScreen.tsx ===');
console.log('Lines:', os.split('\n').length);
console.log('Has COUPLE_IMAGE:', os.includes('COUPLE_IMAGE'));
console.log('Has HỶ:', os.includes('H') || os.includes('xi'));
console.log('First 3 lines:');
os.split('\n').slice(0, 3).forEach((l, i) => console.log(i + 1 + ':', l.substring(0, 80)));

// Check Index.tsx hero section
const idx = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\pages\\Index.tsx', 'utf8');
console.log('\n=== Index.tsx Hero (L341-346) ===');
idx.split('\n').slice(340, 350).forEach((l, i) => console.log(341 + i + ':', l.substring(0, 100)));

// Check ThemeSwitcher
const ts = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx', 'utf8');
console.log('\n=== ThemeSwitcher.tsx ===');
console.log('Lines:', ts.split('\n').length);
console.log('L55 OK (template literal):', ts.split('\n')[54].includes('${isOpen'));
console.log('Has Copy CSS:', ts.includes('copyText') || ts.includes('clipboard'));
