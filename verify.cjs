const fs = require('fs');
const c = fs.readFileSync('D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx', 'utf8');
const l = c.split('\n');
console.log('L55 OK:' + !l[54].includes('fixed bottom-24'));
[94, 95, 96].forEach(i => console.log(i + 1 + ': ' + JSON.stringify(l[i]).substring(0, 120)));
