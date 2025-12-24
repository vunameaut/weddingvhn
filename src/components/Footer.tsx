import { Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';

const Footer = () => {
  return (
    <footer className="py-16 px-4 bg-gradient-romantic text-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <ScrollReveal direction="up" className="max-w-4xl mx-auto relative z-10">
        {/* Names */}
        <div className="mb-6">
          <p className="font-script text-4xl md:text-5xl text-wedding-pink-dark mb-2">
            Minh & Hương
          </p>
          <p className="text-muted-foreground">15.02.2025</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink" />
          <div className="h-px w-16 md:w-24 bg-wedding-gold" />
        </div>

        {/* Thank you message */}
        <p className="text-foreground/80 text-lg italic mb-8">
          Cảm ơn bạn đã ghé thăm thiệp cưới của chúng tôi
        </p>

        {/* Copyright */}
        <p className="text-muted-foreground text-sm">
          Made with <Heart className="w-4 h-4 inline-block text-wedding-pink fill-wedding-pink" /> for our special day
        </p>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
