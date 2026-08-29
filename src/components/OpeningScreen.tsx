import { useState, useEffect } from 'react';
import album1 from '../assets/album1.jpg';

interface OpeningScreenProps {
  onOpen: () => void;
}

const OpeningScreen = ({ onOpen }: OpeningScreenProps) => {
  const [step, setStep] = useState<'idle' | 'opening' | 'flying' | 'hiding'>('idle');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenClick = () => {
    if (step !== 'idle') return;
    
    setStep('opening');
    
    // Đợi nắp phong bì mở
    setTimeout(() => {
      setStep('flying');
    }, 800);

    // Thời gian bay ra
    setTimeout(() => {
      setStep('hiding');
    }, 1600);

    // Thời gian phóng to -> Mở trang
    setTimeout(() => {
      onOpen();
    }, 2800);
  };

  const getPhotoStyles = () => {
    const baseW = isMobile ? '280px' : '360px';
    const baseH = isMobile ? '220px' : '260px';

    if (step === 'hiding') {
      return {
        width: '100vw',
        height: '100vh',
        transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
      };
    }
    if (step === 'flying') {
      return {
        width: baseW,
        height: baseH,
        transform: 'translate(-50%, calc(-50% - 150px)) scale(1.6) rotate(-2deg)',
      };
    }
    if (step === 'opening') {
      return {
        width: baseW,
        height: baseH,
        transform: 'translate(-50%, -50%) scale(0.95) rotate(0deg)',
      };
    }
    return {
      width: baseW,
      height: baseH,
      transform: 'translate(-50%, -50%) scale(0.9) rotate(0deg)',
    };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#181514] overflow-hidden font-sans">
      
      {/* Custom Keyframes for Animations */}
      <style>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: gentle-float 4s ease-in-out infinite;
        }
        @keyframes seal-pulse {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }
        .animate-seal-pulse {
          animation: seal-pulse 2.5s infinite;
        }
        .luxury-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
        }
        @keyframes float-ember {
          0% { transform: translateY(20vh) translateX(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-80vh) translateX(60px) scale(0.3); opacity: 0; }
        }
        @keyframes float-ember-alt {
          0% { transform: translateY(20vh) translateX(0) scale(1); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 0.9; }
          100% { transform: translateY(-80vh) translateX(-60px) scale(0.5); opacity: 0; }
        }
      `}</style>

      {/* Cinematic Background */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out" 
        style={{ opacity: step === 'hiding' ? 0 : 1 }}
      >
        {/* Deep rich lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,20,30,0.3)_0%,rgba(24,21,20,1)_100%)]"></div>
        
        {/* Floating embers/lights - Increased quantity and intense glow */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${step !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-[80%] left-[10%] w-2 h-2 rounded-full bg-[#FFF] blur-[1px] shadow-[0_0_10px_3px_#FFF] animate-[float-ember_6s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[90%] left-[25%] w-3 h-3 rounded-full bg-[#F2D780] blur-[1px] shadow-[0_0_12px_4px_#F2D780] animate-[float-ember-alt_8s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute top-[70%] left-[40%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_2px_#D4AF37] animate-[float-ember_5s_ease-in-out_infinite]" style={{ animationDelay: '2.5s' }}></div>
          <div className="absolute top-[85%] left-[55%] w-2.5 h-2.5 rounded-full bg-[#FFF] blur-[1px] shadow-[0_0_12px_4px_#FFF] animate-[float-ember-alt_7s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }}></div>
          <div className="absolute top-[95%] left-[70%] w-2 h-2 rounded-full bg-[#F2D780] shadow-[0_0_8px_3px_#F2D780] animate-[float-ember_9s_ease-in-out_infinite]" style={{ animationDelay: '3.1s' }}></div>
          <div className="absolute top-[60%] left-[85%] w-3 h-3 rounded-full bg-[#D4AF37] blur-[2px] shadow-[0_0_15px_5px_#D4AF37] animate-[float-ember-alt_6.5s_ease-in-out_infinite]" style={{ animationDelay: '1.7s' }}></div>
          
          <div className="absolute top-[75%] left-[15%] w-1 h-1 rounded-full bg-[#FFF] shadow-[0_0_5px_2px_#FFF] animate-[float-ember-alt_5.5s_ease-in-out_infinite]" style={{ animationDelay: '4.2s' }}></div>
          <div className="absolute top-[88%] left-[35%] w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_3px_#D4AF37] animate-[float-ember_7.5s_ease-in-out_infinite]" style={{ animationDelay: '2.1s' }}></div>
          <div className="absolute top-[65%] left-[65%] w-2.5 h-2.5 rounded-full bg-[#F2D780] blur-[1px] shadow-[0_0_12px_4px_#F2D780] animate-[float-ember-alt_8.5s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-[92%] left-[80%] w-1.5 h-1.5 rounded-full bg-[#FFF] shadow-[0_0_6px_2px_#FFF] animate-[float-ember_6.2s_ease-in-out_infinite]" style={{ animationDelay: '3.8s' }}></div>
          
          <div className="absolute top-[82%] left-[5%] w-3 h-3 rounded-full bg-[#F2D780] blur-[1.5px] shadow-[0_0_15px_5px_#F2D780] animate-[float-ember_9.5s_ease-in-out_infinite]" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-[72%] left-[50%] w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_3px_#D4AF37] animate-[float-ember-alt_6.8s_ease-in-out_infinite]" style={{ animationDelay: '4.7s' }}></div>
          <div className="absolute top-[86%] left-[90%] w-2 h-2 rounded-full bg-[#FFF] blur-[1px] shadow-[0_0_10px_4px_#FFF] animate-[float-ember_7.2s_ease-in-out_infinite]" style={{ animationDelay: '2.9s' }}></div>
          <div className="absolute top-[98%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_2px_#D4AF37] animate-[float-ember-alt_5.8s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute top-[68%] left-[75%] w-2.5 h-2.5 rounded-full bg-[#F2D780] shadow-[0_0_10px_3px_#F2D780] animate-[float-ember_8.2s_ease-in-out_infinite]" style={{ animationDelay: '3.4s' }}></div>
        </div>

        <div className={`absolute top-[10%] left-0 right-0 text-center transition-all duration-1000 ${step !== 'idle' ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <h2 className="font-serif tracking-[0.6em] text-[#D4AF37] text-xs md:text-sm uppercase mb-4 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Wedding Invitation</h2>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto opacity-70"></div>
        </div>
      </div>

      {/* ENVELOPE WRAPPER (for floating animation) */}
      <div className={`relative transition-transform duration-1000 ${step === 'idle' ? 'animate-float-slow' : ''}`}>
        
        {/* ENVELOPE BACK (Inside view) */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[230px] md:w-[480px] md:h-[320px] bg-[#3B0E14] rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            opacity: step === 'hiding' ? 0 : 1, 
            transform: step === 'hiding' ? 'translate(-50%, -50%) scale(1.1) translateY(80px)' : 'translate(-50%, -50%) scale(1)' 
          }}
        >
          <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
          {/* Inner depth shadow */}
          <div className="absolute inset-0 shadow-[inset_0_20px_50px_rgba(0,0,0,0.6)]"></div>
        </div>

        {/* THE PHOTO GROUP */}
        <div 
          className={`fixed top-1/2 left-1/2 z-[60] transition-all ease-[cubic-bezier(0.4,0,0.2,1)] ${
            step === 'hiding' ? 'duration-[1200ms]' : 'duration-[800ms]'
          }`}
          style={{
            ...getPhotoStyles(),
            opacity: step === 'idle' ? 0 : 1,
          }}
        >
          <img src={album1} className="absolute inset-0 w-full h-full object-cover shadow-[0_20px_50px_rgba(0,0,0,0.7)] rounded-[2px]" alt="Couple" />

          {/* Luxury Frame */}
          <div 
            className="absolute inset-0 border-[10px] md:border-[14px] border-[#FCFBF8] bg-transparent transition-opacity duration-700 rounded-[2px]"
            style={{ opacity: step === 'hiding' ? 0 : 1 }}
          >
            <div className="absolute inset-1 border border-[#D4AF37] pointer-events-none opacity-60"></div>
            
            <div className="absolute left-[-10px] right-[-10px] bottom-[-60px] md:bottom-[-70px] h-[60px] md:h-[70px] bg-[#FCFBF8] flex flex-col items-center justify-center rounded-b-[2px] shadow-[0_15px_30px_rgba(0,0,0,0.2)]">
              <span className="font-script text-[#4A3B32] text-2xl md:text-3xl tracking-wide">Đỗ Quân & Mai Linh</span>
              <span className="font-serif text-[#D4AF37] text-[9px] md:text-[10px] tracking-[0.4em] uppercase mt-1 font-medium">Our Wedding Day</span>
            </div>
          </div>
          
          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity ${
              step === 'hiding' ? 'duration-[1200ms]' : 'duration-[800ms]'
            }`}
            style={{ 
              opacity: step === 'hiding' ? 1 : 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.9) 100%)'
            }}
          ></div>
        </div>

        {/* ENVELOPE FRONT FLAPS */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[230px] md:w-[480px] md:h-[320px] pointer-events-none z-[10] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ 
            opacity: step === 'hiding' ? 0 : 1, 
            transform: step === 'hiding' ? 'translate(-50%, -50%) scale(1.1) translateY(80px)' : 'translate(-50%, -50%) scale(1)' 
          }}
        >
          {/* Side flaps */}
          <div className="absolute left-0 top-0 bottom-0 w-[55%] bg-[#5E1720] shadow-[5px_0_25px_rgba(0,0,0,0.4)]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}>
            <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
            {/* Subtle edge light */}
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)', borderRight: '1px solid rgba(255, 255, 255, 0.1)' }}></div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#5A151D] shadow-[-5px_0_25px_rgba(0,0,0,0.4)]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}>
            <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}></div>
          </div>
          
          {/* Bottom flap */}
          <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-[#641822] shadow-[0_-5px_30px_rgba(0,0,0,0.5)] z-[5]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}>
            <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)', borderTop: '1px solid rgba(255, 255, 255, 0.15)' }}></div>
          </div>
          
          {/* Top flap (animates open) */}
          <div 
            className="absolute top-0 left-0 right-0 h-[65%] bg-[#701A25] origin-top transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] z-[20] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]" 
            style={{ 
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transform: step !== 'idle' ? 'rotateX(180deg)' : 'rotateX(0deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
            {/* Elegant thick gold foil border on the flap edge */}
            <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)', background: 'linear-gradient(to bottom, transparent 94%, #F2D780 94%, #D4AF37 97%, #AA7B22 100%)' }}></div>
          </div>
          
          {/* Top flap inner (visible when open) */}
          <div 
            className="absolute top-0 left-0 right-0 h-[65%] bg-[#300B10] origin-top transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] z-[15]" 
            style={{ 
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transform: step !== 'idle' ? 'rotateX(0deg)' : 'rotateX(-180deg)',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="absolute inset-0 luxury-texture mix-blend-color-burn"></div>
            {/* Extremely rich gold foil full inner lining */}
            <div className="absolute inset-0 opacity-80" style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)', backgroundImage: 'linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)' }}></div>
          </div>

          {/* Gold Wax Seal with glowing animation */}
          <div 
            className={`absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 z-[25] transition-all duration-700 ease-in-out flex items-center justify-center pointer-events-none
              ${step === 'idle' ? 'animate-seal-pulse opacity-100 scale-100' : 'opacity-0 scale-150'}`}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_-3px_10px_rgba(170,119,28,0.8)] flex items-center justify-center relative overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #FBF5B7 0%, #D4AF37 40%, #AA771C 100%)' }}>
              <div className="absolute inset-[3px] rounded-full border-2 border-[#8C6216] opacity-40"></div>
              <div className="absolute inset-[6px] rounded-full border border-[#FFF] opacity-30"></div>
              <span className="font-script text-[#4A1117] text-2xl md:text-3xl mt-1 font-bold opacity-90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">Q&L</span>
            </div>
          </div>
        </div>

      </div>

      {/* BUTTON */}
      <div className={`absolute bottom-[8%] md:bottom-[12%] transition-all duration-1000 ease-out delay-500 ${step !== 'idle' ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <button 
          onClick={handleOpenClick}
          className="group relative px-10 py-3 md:px-14 md:py-4 bg-[#181514]/60 backdrop-blur-md border border-[#D4AF37]/50 text-[#F2D780] font-serif text-sm md:text-base tracking-[0.4em] transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:bg-[#D4AF37]/10 hover:-translate-y-1 overflow-hidden rounded-sm"
        >
          {/* Inner classic border */}
          <div className="absolute inset-[4px] border border-[#D4AF37]/30 pointer-events-none transition-all duration-700 group-hover:border-[#D4AF37]/60 group-hover:inset-[6px]"></div>
          
          <span className="relative z-10 flex items-center justify-center gap-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-[#D4AF37] text-[10px] opacity-70">✦</span>
            <span className="mt-[2px]">MỞ THIỆP</span>
            <span className="text-[#D4AF37] text-[10px] opacity-70">✦</span>
          </span>
          
          {/* Shine effect */}
          <div className="absolute top-0 bottom-0 left-[-100%] w-[150%] bg-gradient-to-r from-transparent via-[#F2D780]/20 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] pointer-events-none"></div>
        </button>
      </div>

    </div>
  );
};

export default OpeningScreen;

