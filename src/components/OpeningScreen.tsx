import { useState } from 'react';
import { Heart } from 'lucide-react';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen = ({ onOpen }: OpeningScreenProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

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

      {/* Center content - appears behind the doors */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-romantic -z-10">
        <div className="text-center px-4">
          <p className="text-wedding-pink font-script text-xl md:text-2xl mb-4 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.3s_forwards]">
            We are Getting Married
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground font-semibold mb-2 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.5s_forwards]">
            Minh <span className="text-wedding-pink">&</span> Hương
          </h1>
          <p className="text-2xl md:text-3xl font-script text-wedding-gold mb-8 opacity-0 animate-[fade-in-up_0.8s_ease-out_0.7s_forwards]">
            15.02.2025
          </p>
        </div>
      </div>

      {/* Open button - centered on the door split */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 ${
          isOpening ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        }`}
      >
        <button
          onClick={handleOpen}
          className="px-8 py-4 bg-[#D4AF37] text-[#7C2D12] font-semibold rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
        >
          <Heart className="w-5 h-5" />
          <span>Mở Thiệp</span>
        </button>
        
        {/* Decorative ring around button */}
        <div className="absolute -inset-4 border-2 border-[#D4AF37]/50 rounded-full animate-pulse" />
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
