import { Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';

interface FooterProps {
  role?: 'groom' | 'bride';
}

const Footer = ({ role = 'groom' }: FooterProps) => {
  return (
    <footer className="py-12 md:py-20 px-4 md:px-6 bg-gradient-romantic text-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20 pointer-events-none" />
      
      <ScrollReveal direction="up" className="max-w-2xl mx-auto relative z-10">
        {/* Divider icon */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-5 md:mb-7">
          <div className="h-px w-12 md:w-24 bg-wedding-gold/60" />
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          <div className="h-px w-12 md:w-24 bg-wedding-gold/60" />
        </div>

        {/* Lời cảm ơn chân thành */}
        <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed md:leading-loose px-2">
          Không điều gì quý giá hơn sự hiện diện, yêu thương và những lời chúc tốt đẹp của mọi người trong ngày đặc biệt này. Chúng mình chân thành cảm ơn và trân trọng tất cả những tình cảm ấy. 🤍
        </p>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
