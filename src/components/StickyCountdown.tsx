import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const StickyCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const weddingDate = new Date('2026-03-29T16:00:00');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = weddingDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0'
      }`}
    >
      <div className="glass-header py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Names */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-script text-xl md:text-2xl text-wedding-pink-dark">Minh Đăng</span>
            <Heart className="w-4 h-4 text-wedding-pink fill-wedding-pink animate-heart-beat" />
            <span className="font-script text-xl md:text-2xl text-wedding-pink-dark">Đỗ Dương</span>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-2 md:gap-4 mx-auto sm:mx-0">
            <TimeUnit value={timeLeft.days} label="Ngày" />
            <span className="text-wedding-gold animate-pulse-soft">:</span>
            <TimeUnit value={timeLeft.hours} label="Giờ" />
            <span className="text-wedding-gold animate-pulse-soft">:</span>
            <TimeUnit value={timeLeft.minutes} label="Phút" />
            <span className="text-wedding-gold animate-pulse-soft">:</span>
            <TimeUnit value={timeLeft.seconds} label="Giây" />
          </div>

          {/* Date */}
          <div className="hidden md:block text-sm text-muted-foreground font-body">
            29.03.2026
          </div>
        </div>
      </div>
    </header>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="text-center min-w-[45px] md:min-w-[55px]">
    <div className="text-lg md:text-2xl font-serif font-bold text-foreground">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
      {label}
    </div>
  </div>
);

export default StickyCountdown;
