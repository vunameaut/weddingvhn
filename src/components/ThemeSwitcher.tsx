import { useState } from 'react';
import { Palette, X, Check } from 'lucide-react';

type ThemeColors = {
  pink: string;
  'pink-light': string;
  'pink-dark': string;
  rose: string;
  gold: string;
  'gold-light': string;
  cream: string;
  'cream-dark': string;
};

type Theme = {
  id: string;
  name: string;
  colors: ThemeColors;
  gradientStart: string;
  gradientEnd: string;
};

const themes: Theme[] = [
  { id: 'pink-gold', name: 'H\u1ED3ng V\u00e0ng', gradientStart: '350,70%,95%', gradientEnd: '30,40%,98%',
    colors: { pink: '210 65% 55%', 'pink-light': '210 60% 95%', 'pink-dark': '210 60% 35%', rose: '210 50% 60%', gold: '210 40% 45%', 'gold-light': '210 45% 70%', cream: '210 25% 97%', 'cream-dark': '210 15% 92%' } },
  { id: 'mint-copper', name: 'Xanh Mint', gradientStart: '160,40%,95%', gradientEnd: '38,35%,97%',
    colors: { pink: '160 50% 45%', 'pink-light': '160 40% 94%', 'pink-dark': '160 45% 30%', rose: '170 40% 50%', gold: '38 55% 50%', 'gold-light': '38 50% 72%', cream: '160 15% 97%', 'cream-dark': '160 10% 93%' } },
  { id: 'burgundy-royal', name: 'Burgundy', gradientStart: '345,40%,95%', gradientEnd: '43,40%,96%',
    colors: { pink: '345 55% 42%', 'pink-light': '345 40% 94%', 'pink-dark': '345 50% 28%', rose: '350 45% 48%', gold: '43 70% 50%', 'gold-light': '43 60% 72%', cream: '30 20% 97%', 'cream-dark': '30 15% 93%' } },
  { id: 'lavender-silver', name: 'Lavender', gradientStart: '270,30%,96%', gradientEnd: '0,0%,98%',
    colors: { pink: '270 40% 60%', 'pink-light': '270 30% 95%', 'pink-dark': '270 35% 42%', rose: '280 30% 65%', gold: '0 0% 65%', 'gold-light': '0 0% 80%', cream: '270 10% 97%', 'cream-dark': '270 8% 93%' } },
  { id: 'terracotta-cream', name: 'H\u1ED3 Tr\u00e0', gradientStart: '15,45%,95%', gradientEnd: '25,30%,97%',
    colors: { pink: '15 60% 55%', 'pink-light': '15 50% 94%', 'pink-dark': '15 55% 38%', rose: '20 50% 58%', gold: '30 50% 50%', 'gold-light': '30 45% 70%', cream: '25 25% 96%', 'cream-dark': '25 18% 92%' } },
  { id: 'navy-gold', name: 'Navy', gradientStart: '215,40%,95%', gradientEnd: '45,35%,97%',
    colors: { pink: '215 60% 45%', 'pink-light': '215 40% 94%', 'pink-dark': '215 55% 30%', rose: '220 50% 50%', gold: '45 65% 55%', 'gold-light': '45 55% 75%', cream: '215 15% 97%', 'cream-dark': '215 10% 93%' } },
];

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  (Object.entries(theme.colors) as [string, string][]).forEach(([key, val]) => {
    root.style.setProperty(`--wedding-${key}`, val);
  });
  root.style.background = `linear-gradient(135deg, hsl(${theme.gradientStart}) 0%, hsl(${theme.gradientEnd}) 50%, hsl(${theme.gradientStart}) 100%)`;
};

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('pink-gold');

  const handleSelect = (theme: Theme) => {
    setActiveTheme(theme.id);
    applyTheme(theme);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: 'hsl(var(--wedding-pink))', color: '#fff', border: '3px solid hsl(var(--wedding-gold))' }}
        title="Ch\u1ECDn ph\u00f4ng m\u00e0u"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Palette className="w-6 h-6" />}
      </button>

      {/* Panel */}
      <div
        className={`fixed bottom-24 right-6 z-[9999] transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <div className="rounded-2xl shadow-2xl p-4 min-w-[220px] max-w-[280px]"
          style={{ background: 'hsl(var(--wedding-cream))', border: '2px solid hsl(var(--wedding-gold))' }}
        >
          <p className="text-sm font-semibold mb-3 text-center" style={{ color: 'hsl(var(--wedding-pink-dark))' }}>
            \uD83C\uDFA8 Ch\u1ECDn ph\u00f4ng m\u00e0u
          </p>
          <div className="flex flex-col gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleSelect(theme)}
                className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 text-left"
                style={{
                  background: activeTheme === theme.id ? 'hsl(var(--wedding-pink-light))' : 'transparent',
                  border: activeTheme === theme.id ? '2px solid hsl(var(--wedding-gold))' : '2px solid transparent',
                }}
              >
                {/* Swatches */}
                <div className="flex gap-1 flex-shrink-0">
                  <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${theme.colors.pink})` }} />
                  <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${theme.colors.gold})` }} />
                  <div className="w-5 h-5 rounded-full" style={{ background: `hsl(${theme.colors.cream})`, border: '1px solid hsl(var(--wedding-gold-light))' }} />
                </div>

                <span className="text-xs font-medium flex-1" style={{ color: 'hsl(var(--wedding-pink-dark))' }}>
                  {theme.name}
                </span>

                {activeTheme === theme.id && (
                  <Check className="w-4 h-4 flex-shrink-0" style={{ color: 'hsl(var(--wedding-gold))' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeSwitcher;
