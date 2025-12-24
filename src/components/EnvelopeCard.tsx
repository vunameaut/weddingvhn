import { useState } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeCardProps {
  onOpen: () => void;
}

const EnvelopeCard = ({ onOpen }: EnvelopeCardProps) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream bg-pattern-traditional p-4">
      <div className="relative">
        {/* Envelope */}
        <div 
          className={`relative w-80 h-56 md:w-96 md:h-64 transition-all duration-1000 ${isOpening ? 'scale-110 opacity-0' : ''}`}
          style={{ perspective: '1000px' }}
        >
          {/* Envelope body */}
          <div className="absolute inset-0 bg-wedding-red rounded-lg shadow-2xl overflow-hidden">
            {/* Gold border decoration */}
            <div className="absolute inset-2 border-2 border-wedding-gold rounded-lg opacity-50" />
            
            {/* Traditional pattern overlay */}
            <div className="absolute inset-0 bg-pattern-traditional opacity-20" />
            
            {/* Center decoration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 rounded-full bg-wedding-gold flex items-center justify-center shadow-lg">
                  <span className="text-3xl md:text-4xl">囍</span>
                </div>
                <p className="text-wedding-gold font-script text-xl md:text-2xl">Thiệp Cưới</p>
              </div>
            </div>
          </div>

          {/* Envelope flap */}
          <div 
            className={`absolute -top-0 left-0 right-0 h-32 md:h-40 origin-bottom transition-transform duration-700 ${isOpening ? 'envelope-flap' : ''}`}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isOpening ? 'rotateX(-180deg)' : 'rotateX(0deg)'
            }}
          >
            <svg viewBox="0 0 400 160" className="w-full h-full">
              <path 
                d="M0,160 L200,40 L400,160 Z" 
                fill="hsl(0, 72%, 38%)"
                stroke="hsl(43, 74%, 52%)"
                strokeWidth="2"
              />
              {/* Decorative seal */}
              <circle cx="200" cy="100" r="25" fill="hsl(43, 74%, 52%)" />
              <text x="200" y="108" textAnchor="middle" fontSize="24" fill="hsl(0, 72%, 32%)">❤</text>
            </svg>
          </div>
        </div>

        {/* Open button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className={`mt-8 btn-wedding flex items-center gap-3 mx-auto transition-all duration-500 ${isOpening ? 'opacity-0 translate-y-4' : 'animate-pulse-soft'}`}
        >
          <Heart className="w-5 h-5" />
          <span className="font-serif">Xem Thiệp</span>
          <Heart className="w-5 h-5" />
        </button>

        {/* Decorative elements */}
        <div className="absolute -top-8 -left-8 text-4xl text-wedding-gold animate-float opacity-60">✿</div>
        <div className="absolute -top-4 -right-6 text-3xl text-wedding-gold animate-float-delayed opacity-60">❀</div>
        <div className="absolute -bottom-6 -left-4 text-3xl text-wedding-gold animate-float-delayed opacity-60">✿</div>
        <div className="absolute -bottom-8 -right-8 text-4xl text-wedding-gold animate-float opacity-60">❀</div>
      </div>
    </div>
  );
};

export default EnvelopeCard;
