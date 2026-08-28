const fs = require('fs');

// Remove ThemeSwitcher import and usage from Index.tsx
const idx = 'D:\\hoc tap\\web\\weddingvhn\\src\\pages\\Index.tsx';
let c = fs.readFileSync(idx, 'utf8');

// Remove import line
const importLine = c.split('\n').find(l => l.includes("import ThemeSwitcher"));
if (importLine) {
  c = c.replace(importLine, '');
  console.log('Removed import:', importLine.trim().substring(0, 60));
}

// Remove <ThemeSwitcher /> JSX
c = c.replace(/<ThemeSwitcher \/>/, '');

fs.writeFileSync(idx, c, 'utf8');
console.log('ThemeSwitcher removed from Index.tsx');
console.log('Index.tsx lines:', c.split('\n').length);