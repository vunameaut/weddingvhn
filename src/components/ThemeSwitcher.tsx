import { useState, useEffect } from 'react';
import { Palette, X, Check, Sliders, SwatchBook } from 'lucide-react';

const parseHSL = (s) => { const p = s.trim().split(/\s+/); return [parseFloat(p[0])||0, parseFloat(p[1])||0, parseFloat(p[2])||0]; };
const hslToHex = (h,s,l) => { s/=100; l/=100; const a=s*Math.min(l,1-l); const f=n=>{const k=(n+h/30)%12;const c=l-a*Math.max(Math.min(k-3,9-k,1),-1);return Math.round(255*c).toString(16).padStart(2,'0');};return '#'+f(0)+f(8)+f(4); };
const hexToHSL = (hex) => { const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255; const max=Math.max(r,g,b),min=Math.min(r,g,b); let h=0,s=0,l=(max+min)/2; if(max!==min){const d=max-min;s=l>0.5?d/(2-max-min):d/(max+min);if(max===r)h=((g-b)/d+(g<b?6:0))*60;else if(max===g)h=((b-r)/d+2)*60;else h=((r-g)/d+4)*60;}return [Math.round(h),Math.round(s*100),Math.round(l*100)]; };

const presets = [
  {id:'pink-gold',name:'Hong Vang',colors:{pink:'210 65% 55%','pink-light':'210 60% 95%','pink-dark':'210 60% 35%',rose:'210 50% 60%',gold:'210 40% 45%','gold-light':'210 45% 70%','cream':'210 25% 97%','cream-dark':'210 15% 92%'}},
  {id:'mint',name:'Xanh Mint',colors:{pink:'160 50% 45%','pink-light':'160 40% 94%','pink-dark':'160 45% 30%',rose:'170 40% 50%',gold:'38 55% 50%','gold-light':'38 50% 72%','cream':'160 15% 97%','cream-dark':'160 10% 93%'}},
  {id:'burgundy',name:'Burgundy',colors:{pink:'345 55% 42%','pink-light':'345 40% 94%','pink-dark':'345 50% 28%',rose:'350 45% 48%',gold:'43 70% 50%','gold-light':'43 60% 72%','cream':'30 20% 97%','cream-dark':'30 15% 93%'}},
  {id:'lavender',name:'Lavender',colors:{pink:'270 40% 60%','pink-light':'270 30% 95%','pink-dark':'270 35% 42%',rose:'280 30% 65%',gold:'0 0% 65%','gold-light':'0 0% 80%','cream':'270 10% 97%','cream-dark':'270 8% 93%'}},
  {id:'terra',name:'Ho Tra',colors:{pink:'15 60% 55%','pink-light':'15 50% 94%','pink-dark':'15 55% 38%',rose:'20 50% 58%',gold:'30 50% 50%','gold-light':'30 45% 70%','cream':'25 25% 96%','cream-dark':'25 18% 92%'}},
  {id:'navy',name:'Navy',colors:{pink:'215 60% 45%','pink-light':'215 40% 94%','pink-dark':'215 55% 30%',rose:'220 50% 50%',gold:'45 65% 55%','gold-light':'45 55% 75%','cream':'215 15% 97%','cream-dark':'215 10% 93%'}},
];

const entries = [
  {key:'pink',label:'Mau chinh'},{key:'pink-light',label:'Mau chinh nhat'},{key:'pink-dark',label:'Mau chinh dam'},
  {key:'rose',label:'Mau hong'},{key:'gold',label:'Mau diem nhan'},{key:'gold-light',label:'Diem nhan nhat'},
  {key:'cream',label:'Nen thep'},{key:'cream-dark',label:'Nen phu'},
];

const getCSS = (k) => getComputedStyle(document.documentElement).getPropertyValue('--wedding-'+k).trim();
const setCSS = (k,v) => document.documentElement.style.setProperty('--wedding-'+k,v);

const ThemeSwitcher = () => {
  const [open,setOpen] = useState(false);
  const [tab,setTab] = useState('presets');
  const [cols,setCols] = useState({});
  const [active,setActive] = useState('pink-gold');
  const [showExp,setShowExp] = useState(false);

  useEffect(() => { if(!open)return; const m={}; entries.forEach(e=>{m[e.key]=getCSS(e.key)}); setCols(m); },[open]);

  const pick = (p) => { setActive(p.id); Object.entries(p.colors).forEach(([k,v])=>setCSS(k,v)); const m={}; entries.forEach(e=>{m[e.key]=p.colors[e.key]}); setCols(m); };
  const pickColor = (k,hex) => { const[h,s,l]=hexToHSL(hex); const v=h+' '+s+'% '+l+'%'; setCSS(k,v); setCols(prev=>({...prev,[k]:v})); setActive(''); };
  const reset = () => pick(presets[0]);
  const NL = String.fromCharCode(10);
  const cssOut = Object.entries(cols).map(([k,v])=>'  --wedding-'+k+': '+v+';').join(NL);

  const handleCopyCSS = () => {
    const text = ':root {' + NL + cssOut + NL + '}';
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Đã copy CSS thành công!");
      }).catch(err => {
        console.error("Clipboard copy failed", err);
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      
      document.body.appendChild(textArea);
      
      if (navigator.userAgent.match(/ipad|iphone/i)) {
        const range = document.createRange();
        range.selectNodeContents(textArea);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        textArea.setSelectionRange(0, 999999);
      } else {
        textArea.select();
      }

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          alert("Đã copy CSS thành công!");
        } else {
          throw new Error("execCommand returned false");
        }
      } catch (error) {
        console.error("Fallback copy failed", error);
        window.prompt("Trình duyệt của bạn chặn copy tự động trên kết nối HTTP. Vui lòng copy đoạn mã dưới đây:", text);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  const cls = (base,cond,extra) => base + (cond ? ' ' + extra : '');

  return (
    <>
      <button onClick={()=>setOpen(!open)} className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110" style={{background:'hsl(var(--wedding-pink))',color:'#fff',border:'3px solid hsl(var(--wedding-gold))'}} title="Chon mau">
        {open ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </button>
      <div className={cls('fixed bottom-24 right-6 z-[9999] transition-all duration-300', open, 'opacity-100 translate-y-0 pointer-events-auto') + (!open ? ' opacity-0 translate-y-4 pointer-events-none' : '')}>
        <div className="rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{width:'320px',maxHeight:'80vh',background:'hsl(var(--wedding-cream))',border:'2px solid hsl(var(--wedding-gold))'}}>
          <div className="p-3 text-center shrink-0" style={{borderBottom:'1px solid hsl(var(--wedding-gold-light))'}}><p className="text-sm font-semibold" style={{color:'hsl(var(--wedding-pink-dark))'}}>🎨 Chon giao dien</p></div>
          <div className="flex shrink-0" style={{borderBottom:'1px solid hsl(var(--wedding-gold-light))'}}>
            <button onClick={()=>setTab('presets')} className="flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1" style={{color:tab==='presets'?'hsl(var(--wedding-pink))':'hsl(var(--wedding-pink-dark)/0.5)',borderBottom:tab==='presets'?'2px solid hsl(var(--wedding-pink))':'2px solid transparent'}}><SwatchBook className="w-3.5 h-3.5" /> Mau co san</button>
            <button onClick={()=>setTab('custom')} className="flex-1 py-2 text-xs font-medium flex items-center justify-center gap-1" style={{color:tab==='custom'?'hsl(var(--wedding-pink))':'hsl(var(--wedding-pink-dark)/0.5)',borderBottom:tab==='custom'?'2px solid hsl(var(--wedding-pink))':'2px solid transparent'}}><Sliders className="w-3.5 h-3.5" /> Tuy chinh</button>
          </div>
          <div className="overflow-y-auto flex-1 min-h-[100px]">
            {tab==='presets' ? (
              <div className="p-3 flex flex-col gap-2">
                {presets.map(p=>(
                  <button key={p.id} onClick={()=>pick(p)} className="flex items-center gap-3 p-2 rounded-xl transition-all text-left" style={{background:active===p.id?'hsl(var(--wedding-pink-light))':'transparent',border:active===p.id?'2px solid hsl(var(--wedding-gold))':'2px solid transparent'}}>
                    <div className="flex gap-1"><div className="w-5 h-5 rounded-full" style={{background:'hsl('+p.colors.pink+')'}} /><div className="w-5 h-5 rounded-full" style={{background:'hsl('+p.colors.gold+')'}} /><div className="w-5 h-5 rounded-full" style={{background:'hsl('+p.colors.cream+')',border:'1px solid hsl(var(--wedding-gold-light))'}} /></div>
                    <span className="text-xs font-medium" style={{color:'hsl(var(--wedding-pink-dark))'}}>{p.name}</span>
                    {active===p.id && <Check className="w-4 h-4 ml-auto" style={{color:'hsl(var(--wedding-gold))'}} />}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 flex flex-col gap-3">
                {entries.map(e=>{const[h,s,l]=parseHSL(cols[e.key]||'0 0% 50%');const hex=hslToHex(h,s,l);return(<div key={e.key} className="flex items-center gap-3"><input type="color" value={hex} onChange={ev=>pickColor(e.key,ev.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-0 p-0" /><div className="flex-1"><p className="text-[11px] font-medium" style={{color:'hsl(var(--wedding-pink-dark))'}}>{e.label}</p><p className="text-[10px]" style={{color:'hsl(var(--wedding-pink-dark)/0.5)'}}>HSL: {h} {s}% {l}%</p></div></div>);})}
                <div className="flex gap-2 mt-1">
                  <button onClick={reset} className="flex-1 py-2 rounded-lg text-xs font-medium" style={{border:'1.5px solid hsl(var(--wedding-gold))',color:'hsl(var(--wedding-pink-dark))'}}>Reset mac dinh</button>
                  <button onClick={()=>setShowExp(true)} className="flex-1 py-2 rounded-lg text-xs font-medium text-white" style={{background:'hsl(var(--wedding-pink))'}}>Copy CSS</button>
                </div>
              </div>
            )}
          </div>
          {showExp && (
            <div className="p-3 shrink-0" style={{borderTop:'1px solid hsl(var(--wedding-gold-light))'}}>
              <div className="flex items-center justify-between mb-2"><p className="text-xs font-semibold" style={{color:'hsl(var(--wedding-pink-dark))'}}>CSS Variables</p><button onClick={()=>setShowExp(false)} className="text-xs" style={{color:'hsl(var(--wedding-pink))'}}>Dong</button></div>
              <pre className="text-[10px] p-2 rounded-lg overflow-y-auto max-h-[120px]" style={{background:'hsl(var(--wedding-pink-dark)/0.05)',color:'hsl(var(--wedding-pink-dark))'}}>{':root {'+NL+cssOut+NL+'}'}</pre>
              <button onClick={handleCopyCSS} className="w-full mt-2 py-2 rounded-lg text-xs font-bold text-white shadow-md active:scale-95 transition-transform" style={{background:'hsl(var(--wedding-gold))'}}>📋 Sao chep code CSS</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ThemeSwitcher;

