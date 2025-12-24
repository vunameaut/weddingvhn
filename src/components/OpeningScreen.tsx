import { useState, useEffect } from 'react';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen = ({ onOpen }: OpeningScreenProps) => {
  const [isOpening, setIsOpening] = useState(false);

  // Tự động mở sau 2 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpening(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Gọi onOpen sau khi animation hoàn thành
  useEffect(() => {
    if (isOpening) {
      const timer = setTimeout(() => {
        onOpen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpening, onOpen]);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Left door */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-[#B91C1C] transition-transform duration-[1.2s] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpening ? 'none' : '4px 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Left door decorations */}
        <div className="absolute inset-0 flex items-center justify-end pr-4">
          {/* Gold border */}
          <div className="absolute top-4 left-4 right-0 bottom-4 border-l-2 border-t-2 border-b-2 border-[#D4AF37]/50 rounded-l-lg" />
          
          {/* Half of the Hỷ character */}
          <span 
            className="text-[120px] md:text-[200px] font-bold text-[#D4AF37] select-none"
            style={{ 
              clipPath: 'inset(0 0 0 50%)',
              marginRight: '-0.5em',
              textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            囍
          </span>
        </div>
        
        {/* Left decorative elements */}
        <div className="absolute top-8 left-8 text-[#D4AF37]/40 text-4xl">✿</div>
        <div className="absolute bottom-8 left-8 text-[#D4AF37]/40 text-4xl">❀</div>
      </div>

      {/* Right door */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-[#B91C1C] transition-transform duration-[1.2s] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: isOpening ? 'none' : '-4px 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Right door decorations */}
        <div className="absolute inset-0 flex items-center justify-start pl-4">
          {/* Gold border */}
          <div className="absolute top-4 left-0 right-4 bottom-4 border-r-2 border-t-2 border-b-2 border-[#D4AF37]/50 rounded-r-lg" />
          
          {/* Half of the Hỷ character */}
          <span 
            className="text-[120px] md:text-[200px] font-bold text-[#D4AF37] select-none"
            style={{ 
              clipPath: 'inset(0 50% 0 0)',
              marginLeft: '-0.5em',
              textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            囍
          </span>
        </div>
        
        {/* Right decorative elements */}
        <div className="absolute top-8 right-8 text-[#D4AF37]/40 text-4xl">❀</div>
        <div className="absolute bottom-8 right-8 text-[#D4AF37]/40 text-4xl">✿</div>
      </div>

      {/* Center - Chữ Hỷ hoàn chỉnh xuất hiện khi đang đóng */}
      <div 
        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${
          isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center">
          <span 
            className="text-[150px] md:text-[250px] font-bold text-[#D4AF37] select-none animate-pulse-soft"
            style={{ 
              textShadow: '0 0 30px rgba(212, 175, 55, 0.5), 2px 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            囍
          </span>
          <p className="text-[#D4AF37] font-script text-2xl md:text-3xl mt-4 animate-pulse-soft">
            Đang mở thiệp...
          </p>
        </div>
      </div>

      {/* Floating lantern decorations */}
      <div className={`absolute top-20 left-10 text-5xl transition-opacity duration-500 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        🏮
      </div>
      <div className={`absolute top-32 right-12 text-4xl transition-opacity duration-500 delay-100 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        🏮
      </div>
      <div className={`absolute bottom-20 left-16 text-4xl transition-opacity duration-500 delay-200 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        🏮
      </div>
      <div className={`absolute bottom-28 right-10 text-5xl transition-opacity duration-500 delay-300 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
        🏮
      </div>
    </div>
  );
};

export default OpeningScreen;
