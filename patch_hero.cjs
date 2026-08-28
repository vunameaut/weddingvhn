const fs = require('fs');
const f = 'D:\\hoc tap\\web\\weddingvhn\\src\\pages\\Index.tsx';
let c = fs.readFileSync(f, 'utf8');

const oldSection = `      <section className="min-h-screen flex items-center justify-center bg-gradient-romantic relative px-4">
        <div className="text-center relative z-10">`;

const newSection = `      <section className="min-h-screen flex items-center justify-center relative px-4">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=faces" alt="Couple" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.5) 100%)' }} />
        <div className="text-center relative z-10">`;

c = c.replace(oldSection, newSection);
fs.writeFileSync(f, c, 'utf8');
console.log('hero replaced');