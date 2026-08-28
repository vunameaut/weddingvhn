import fs from 'fs';
const code = `import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Volume2, VolumeX, ChevronDown } from 'lucide-react';

const COUPLE_IMAGE = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop&crop=faces';

const OpeningScreen = ({ onOpen }: { onOpen: () => void }) => {
  const [muted, setMuted] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const target = new Date('2026-03-29T16:00:00+07:00').getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setDays(Math.floor(diff / 86400000));
      setHours(Math.floor((diff % 86400000) / 3600000));
      setMins(Math.floor((diff % 3600000) / 60000));
      setSecs(Math.floor((diff % 60000) / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
      {/* Background Image */
      <div className="absolute inset-0">
        <img src={COUPLE_IMAGE} alt="Couple" className="w-full h-full object-cover" />
      </div>

      {/* Overlay */
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.45) 100%)' }} />

      {/* Content */
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Mute Button */}
        <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/40 bg-transparent flex items-center justify-center cursor-pointer" style={{ color: 'rgba(255,255,255,0.8)' }} onClick={() => setMuted(!muted)}>
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Intro */}
        <p className="text-white/80 text-xs md:text-sm tracking-[0.25em] uppercase mb-6" style={{ fontWeight: 300, letterSpacing: '0.25em' }}>Tran trong kinh moi</p>

        {/* Names */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-2" style={{ fontFamily: 'Dancing Script, cursive', background: 'linear-gradient(135deg, #E5C07B 0%, #D4A574 50%, #F0D48A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))', lineHeight: 1.2 }}>Minh Dong</h1>
        <p className="text-3xl md:text-4xl my-2" style={{ fontFamily: 'Dancing Script, cursive', color: '#E5C07B' }}>&</p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6" style={{ fontFamily: 'Dancing Script, cursive', background: 'linear-gradient(135deg, #E5C07B 0%, #D4A574 50%, #F0D48A 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))', lineHeight: 1.2 }}>Bich Duong</h1>

        {/* Quote */}
        <p className="text-white/70 text-sm md:text-base italic mb-2" style={{ maxWidth: '400px' }}>"Yeu la khi ta muon cung nhau di het cuoc doi"</p>

        {/* Date & Location */}
        <p className="text-white/90 text-sm md:text-base mt-3" style={{ letterSpacing: '0.1em' }}>29 . 03 . 2026</p>
        <p className="text-white/60 text-xs mt-1" style={{ letterSpacing: '0.15em' }}>DAI DINH - PHU THO</p>

        {/* Countdown */}
        <div className="mt-8 px-6 py-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="flex gap-6 md:gap-10">
            {[[days, 'NGAY'], [hours, 'GIO'], [mins, 'PHUT'], [secs, 'GIAY']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-3xl md:text-4xl text-white" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, lineHeight: 1 }}>{String(v).padStart(2, '0')}</p>
                <p className="text-[10px] text-white/50 mt-1 tracking-[0.15em] uppercase">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-8">
          <button onClick={onOpen} className="px-8 py-3 text-xs md:text-sm font-semibold uppercase tracking-[0.15em] cursor-pointer transition-all hover:brightness-110" style={{ background: 'linear-gradient(135deg, #E5C07B, #D4A574)', color: '#3D3530', borderRadius: '6px', border: 'none' }}>Mo thiep</button>
          <a href="#rsvp" onClick={onOpen} className="px-6 py-3 text-xs md:text-sm uppercase tracking-[0.15em] cursor-pointer transition-all hover:bg-white/20" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', textDecoration: 'none' }}>RSVP</a>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown className="w-5 h-5" style={{ color: 'rgba(255,255,255,0.5)' }} />
        </div>
      </div>
    </div>
  );
};

export default OpeningScreen;
`;
fs.writeFileSync(process.argv[2], code, 'utf8');
console.log('Written');
