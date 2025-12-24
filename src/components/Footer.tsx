import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-wedding-red text-primary-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Names */}
        <div className="mb-6">
          <p className="font-script text-4xl md:text-5xl text-wedding-gold mb-2">
            Minh & Hương
          </p>
          <p className="text-primary-foreground/80 font-body">15.02.2025</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 md:w-24 bg-wedding-gold/50" />
          <Heart className="w-5 h-5 text-wedding-gold fill-wedding-gold" />
          <div className="h-px w-16 md:w-24 bg-wedding-gold/50" />
        </div>

        {/* Thank you message */}
        <p className="text-primary-foreground/90 font-body text-lg italic mb-8">
          Cảm ơn bạn đã ghé thăm thiệp cưới của chúng tôi
        </p>

        {/* Copyright */}
        <p className="text-primary-foreground/60 text-sm font-body">
          Made with <Heart className="w-4 h-4 inline-block text-wedding-gold fill-wedding-gold" /> for our special day
        </p>
      </div>
    </footer>
  );
};

export default Footer;
