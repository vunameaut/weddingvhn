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
    }, 600);

    // Đợi ảnh bay lên -> chuyển sang hiding (phóng to)
    setTimeout(() => {
      setStep('hiding');
    }, 1800);

    // Chuyển sang màn hình chính
    // Vì kích thước sẽ khớp 100% pixel-for-pixel, việc unmount OpeningScreen sẽ không gây giật.
    setTimeout(() => {
      onOpen();
    }, 3000);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfaf6] overflow-hidden">
      
      {/* Background patterns */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-in-out" 
        style={{ opacity: step === 'hiding' ? 0 : 1 }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#a3876a 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        
        <div className={`absolute inset-0 transition-opacity duration-500 ${step !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>
          <div className="absolute top-[10%] left-[15%] text-2xl text-[#cba889] opacity-50 animate-[float_4s_ease-in-out_infinite]">✨</div>
          <div className="absolute top-[20%] right-[20%] text-3xl text-[#cba889] opacity-40 animate-[float_5s_ease-in-out_infinite_reverse]">❀</div>
          <div className="absolute bottom-[25%] left-[25%] text-xl text-[#cba889] opacity-60 animate-[float_3s_ease-in-out_infinite]">♡</div>
          <div className="absolute bottom-[15%] right-[15%] text-2xl text-[#cba889] opacity-50 animate-[float_4.5s_ease-in-out_infinite]">✧</div>
        </div>

        <div className={`absolute top-[12%] left-0 right-0 text-center transition-all duration-700 ease-in-out ${step !== 'idle' ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <p className="font-sans tracking-[0.2em] text-[#a3876a] text-sm uppercase mb-3">Save The Date</p>
          <h1 className="font-script text-4xl md:text-5xl text-[#8b6f52] drop-shadow-sm">Minh Đăng & Đỗ Dương</h1>
        </div>
      </div>

      {/* ENVELOPE BACK */}
      <div 
        className="absolute w-[320px] h-[220px] md:w-[420px] md:h-[280px] bg-[#ebd9c8] rounded-md shadow-xl border border-[#d5bda5] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          opacity: step === 'hiding' ? 0 : 1, 
          transform: step === 'hiding' ? 'scale(1.2) translateY(50px)' : 'scale(1) translateY(0)' 
        }}
      ></div>

      {/* THE PHOTO GROUP (Cố định fixed, thay đổi kích thước thành 100vw/100vh để khớp đúng với trang bìa) */}
      <div 
        className="fixed top-1/2 left-1/2 z-[60] transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          ...getPhotoStyles(),
          opacity: step === 'idle' ? 0 : 1,
        }}
      >
        <img src={album1} className="absolute inset-0 w-full h-full object-cover shadow-xl" alt="Couple" />

        {/* Lớp khung viền Polaroid */}
        <div 
          className="absolute inset-0 border-[8px] md:border-[10px] border-white bg-transparent transition-opacity duration-700"
          style={{ opacity: step === 'hiding' ? 0 : 1 }}
        >
          <div className="absolute left-[-8px] right-[-8px] bottom-[-40px] md:bottom-[-48px] h-[40px] md:h-[48px] bg-white flex items-center justify-center">
            <span className="font-script text-[#8b6f52] text-lg md:text-xl">Our Reminiscence</span>
          </div>
        </div>
        
        {/* Lớp filter đen giống với màn hình Hero của Index.tsx để khỏi bị giật màu */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms]"
          style={{ 
            opacity: step === 'hiding' ? 1 : 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)'
          }}
        ></div>
      </div>

      {/* ENVELOPE FRONT FLAPS */}
      <div 
        className="absolute w-[320px] h-[220px] md:w-[420px] md:h-[280px] pointer-events-none z-[10] transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ 
          opacity: step === 'hiding' ? 0 : 1, 
          transform: step === 'hiding' ? 'scale(1.2) translateY(50px)' : 'scale(1) translateY(0)' 
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[55%] bg-[#e3cdb9] border-r border-[#d5bda5]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}></div>
        <div className="absolute right-0 top-0 bottom-0 w-[55%] bg-[#e3cdb9] border-l border-[#d5bda5]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}></div>
        <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-[#dfc5af]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}></div>
        
        <div 
          className="absolute top-0 left-0 right-0 h-[60%] bg-[#d5bda5] origin-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-[20] shadow-sm" 
          style={{ 
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transform: step !== 'idle' ? 'rotateX(180deg)' : 'rotateX(0deg)',
            backfaceVisibility: 'hidden'
          }}
        ></div>
        <div 
          className="absolute top-0 left-0 right-0 h-[60%] bg-[#cba889] origin-top transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] z-[15]" 
          style={{ 
            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
            transform: step !== 'idle' ? 'rotateX(0deg)' : 'rotateX(-180deg)',
            backfaceVisibility: 'hidden'
          }}
        ></div>
      </div>

      {/* BUTTON */}
      <div className={`absolute bottom-[15%] transition-all duration-700 ease-in-out ${step !== 'idle' ? 'opacity-0 translate-y-8 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <button 
          onClick={handleOpenClick}
          className="group relative px-10 py-3.5 bg-[#a3876a] hover:bg-[#8b6f52] text-white rounded-full font-serif text-lg tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span>MỞ THIỆP</span>
            <span className="text-xl transition-transform duration-300 group-hover:rotate-12">💌</span>
          </span>
        </button>
      </div>

    </div>
  );
};

export default OpeningScreen;
