const fs = require('fs');
const f = 'D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx';
let c = fs.readFileSync(f, 'utf8');
const NL = String.fromCharCode(10);

// Fix line 55 (template literal)
const lines = c.split('\n');
if (lines[54] && lines[54].includes('"fixed bottom-24')) {
  lines[54] = '<div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? \'opacity-100 translate-y-0 pointer-events-auto\' : \'opacity-0 translate-y-4 pointer-events-none\'}`}>';
  console.log('Fixed L55');
}

// Fix Copy CSS - replace literal \n with actual newline
let code = lines.join('\n');
code = code.replace(/{':root \\n'+cssOutput+'\\n\}'/g, ":root {" + NL + cssOutput + NL + "}");
code = code.replace(/navigator\.clipboard\.writeText\(':root \\n'\+cssOutput\+'\\n'\)/g, 'navigator.clipboard.writeText(":root {" + NL + cssOutput + NL + "}")');

fs.writeFileSync(f, code, 'utf8');
console.log('Done');
