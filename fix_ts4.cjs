const fs = require('fs');
const f = 'D:\\hoc tap\\web\\weddingvhn\\src\\components\\ThemeSwitcher.tsx';
let c = fs.readFileSync(f, 'utf8');
const lines = c.split('\n');

// Fix L55
if (lines[54] && lines[54].includes('"fixed bottom-24')) {
  lines[54] = '<div className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? \'opacity-100 translate-y-0 pointer-events-auto\' : \'opacity-0 translate-y-4 pointer-events-none\'}`}>';
  console.log('Fixed L55');
}

let code = lines.join('\n');

// Replace literal backslash-n in CSS strings with actual newline
// The file bytes contain: \n (backslash + n)
// We want: actual newline character
const bs = String.fromCharCode(92); // backslash
const nl = String.fromCharCode(10); // newline

// In the pre tag: {':root {\n'+cssOutput+'\n}'}
// We want the \n to become real newlines so the pre tag shows formatted CSS
code = code.split("':root {" + bs + "n'").join(":root {" + nl + "'");
code = code.split(bs + "n}'}").join(nl + "}'}");

// In clipboard: ':root {\n'+cssOutput+'\n}'
// Same replacement
code = code.split(":root {" + bs + "n'+cssOutput+'" + bs + "n").join(":root {" + nl + "+cssOutput+" + nl);

fs.writeFileSync(f, code, 'utf8');
console.log('Done');