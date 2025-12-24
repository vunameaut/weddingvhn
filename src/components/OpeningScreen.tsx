import { useState, useEffect } from 'react';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen = ({ onOpen }: OpeningScreenProps) => {
  const [isOpening, setIsOpening] = useState(false);

  // Tự động mở sau 2.5 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Gọi onOpen sau khi animation hoàn thành
  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => {
        onOpen();
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [isOpening, onOpen]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-gradient-to-b from-wedding-pink-light to-wedding-cream">
      {/* Left door */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, hsl(350, 55%, 75%) 0%, hsl(350, 50%, 65%) 100%)',
          boxShadow: isOpening ? 'none' : '4px 0 30px rgba(0,0,0,0.15)',
        }}
      >
        {/* Left door decorations */}
        <div className="absolute inset-0 flex items-center justify-end">
          {/* Decorative border */}
          <div className="absolute top-6 left-6 right-0 bottom-6 border-l border-t border-b border-white/30 rounded-l-lg" />
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-white/50 rounded-full" />
            <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-white/50 rounded-full" />
          </div>
        </div>
        
        {/* Left decorative elements */}
        <div className="absolute top-8 left-8 text-white/40 text-3xl">✿</div>
        <div className="absolute bottom-8 left-8 text-white/40 text-3xl">❀</div>
      </div>

      {/* Right door */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-[1.5s] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(225deg, hsl(350, 55%, 75%) 0%, hsl(350, 50%, 65%) 100%)',
          boxShadow: isOpening ? 'none' : '-4px 0 30px rgba(0,0,0,0.15)',
        }}
      >
        {/* Right door decorations */}
        <div className="absolute inset-0 flex items-center justify-start">
          {/* Decorative border */}
          <div className="absolute top-6 left-0 right-6 bottom-6 border-r border-t border-b border-white/30 rounded-r-lg" />
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-white/50 rounded-full" />
            <div className="absolute bottom-1/4 right-1/3 w-12 h-12 border-2 border-white/50 rounded-full" />
          </div>
        </div>
        
        {/* Right decorative elements */}
        <div className="absolute top-8 right-8 text-white/40 text-3xl">❀</div>
        <div className="absolute bottom-8 right-8 text-white/40 text-3xl">✿</div>
      </div>

      {/* Center - Chữ Hỷ hoàn chỉnh */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-20 transition-all duration-700 ${
          isOpening ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      >
        <div className="text-center">
          <div 
            className="relative inline-block"
            style={{
              animation: 'gentle-pulse 2s ease-in-out infinite',
            }}
          >
            <span 
              className="text-[120px] md:text-[180px] font-bold select-none block"
              style={{ 
                background: 'linear-gradient(180deg, hsl(40, 60%, 55%) 0%, hsl(40, 55%, 45%) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 20px rgba(180, 140, 60, 0.4))',
              }}
            >
              囍
            </span>
          </div>
          <p 
            className="font-script text-xl md:text-2xl mt-6"
            style={{
              color: 'hsl(40, 50%, 45%)',
              animation: 'fade-pulse 2s ease-in-out infinite',
            }}
          >
            Đang mở thiệp...
          </p>
        </div>
      </div>

      {/* Subtle floating hearts */}
      <div className={`absolute top-16 left-8 text-3xl transition-all duration-700 ${isOpening ? 'opacity-0 -translate-y-4' : 'opacity-60'}`}>
        <span className="text-wedding-gold">♥</span>
      </div>
      <div className={`absolute top-24 right-12 text-2xl transition-all duration-700 delay-100 ${isOpening ? 'opacity-0 -translate-y-4' : 'opacity-50'}`}>
        <span className="text-wedding-gold">♥</span>
      </div>
      <div className={`absolute bottom-24 left-12 text-2xl transition-all duration-700 delay-200 ${isOpening ? 'opacity-0 translate-y-4' : 'opacity-50'}`}>
        <span className="text-wedding-gold">♥</span>
      </div>
      <div className={`absolute bottom-16 right-8 text-3xl transition-all duration-700 delay-300 ${isOpening ? 'opacity-0 translate-y-4' : 'opacity-60'}`}>
        <span className="text-wedding-gold">♥</span>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
        }
        @keyframes fade-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default OpeningScreen;
