import { Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';

const Footer = () => {
  return (
    <footer className="py-10 md:py-16 px-3 md:px-4 bg-gradient-romantic text-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <ScrollReveal direction="up" className="max-w-4xl mx-auto relative z-10">
        {/* Names */}
        <div className="mb-4 md:mb-6">
          <p className="font-flourish text-4xl md:text-6xl text-wedding-pink-dark mb-1 md:mb-2 tracking-wide">
            Đỗ Quân & Mai Linh
          </p>
          <p className="text-muted-foreground text-sm md:text-base">08.11.2026</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink" />
          <div className="h-px w-10 md:w-24 bg-wedding-gold" />
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;

