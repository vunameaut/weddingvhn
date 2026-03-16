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
          <p className="font-script text-3xl md:text-5xl text-wedding-pink-dark mb-1 md:mb-2">
            Minh Đăng & Đỗ Dương
          </p>
          <p className="text-muted-foreground text-sm md:text-base">29.03.2026</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
          <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink" />
          <div className="h-px w-10 md:w-24 bg-wedding-gold" />
        </div>

        {/* Thank you message */}
        <p className="text-foreground/80 text-sm md:text-lg italic mb-4 md:mb-8">
          Cảm ơn bạn đã ghé thăm thiệp cưới của chúng tôi
        </p>

        {/* Copyright */}
        <p className="text-muted-foreground text-xs md:text-sm">
          Made with <Heart className="w-3 h-3 md:w-4 md:h-4 inline-block text-wedding-pink fill-wedding-pink" /> for our special day
        </p>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
