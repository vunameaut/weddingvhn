import { Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import groomImg from '@/assets/groom.png';

const CoupleSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-16">
          <p className="text-wedding-pink font-script text-xl md:text-3xl mb-2">Trân trọng kính mời</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">Cô Dâu & Chú Rể</h2>
          <div className="mt-3 md:mt-4 flex items-center justify-center gap-3 md:gap-4">
            <div className="h-px w-12 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-xl md:text-2xl">❧</span>
            <div className="h-px w-12 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Couple */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-16">
          {/* Groom - slides from left */}
          <ScrollReveal direction="left" delay={0.1} className="text-center flex-1">
            <div className="relative mb-2 md:mb-6 group">
              {/* Rectangular frame with gold border */}
              <div className="w-28 h-36 sm:w-36 sm:h-44 md:w-60 md:h-80 mx-auto rounded-lg md:rounded-2xl overflow-hidden border-2 border-wedding-gold shadow-elevated transition-all duration-500 group-hover:shadow-2xl group-hover:border-wedding-gold-light group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face"
                  alt="Chú rể"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px hsla(43, 50%, 65%, 0.3)' }} />
              </div>
              {/* Decorative corners - hidden on mobile for cleaner look */}
              <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold rounded-tl-lg opacity-60" />
              <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-wedding-gold rounded-tr-lg opacity-60" />
              <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-wedding-gold rounded-bl-lg opacity-60" />
              <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold rounded-br-lg opacity-60" />
            </div>
            <h3 className="font-script text-xl sm:text-2xl md:text-5xl text-wedding-pink-dark mb-0.5 md:mb-2">Minh Đăng</h3>
          </ScrollReveal>

          {/* Heart connector */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col items-center py-2 md:py-4 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 rounded-full bg-wedding-cream border-2 border-wedding-gold flex items-center justify-center shadow-soft animate-heart-beat">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-wedding-gold fill-wedding-gold" />
            </div>
          </ScrollReveal>

          {/* Bride - slides from right */}
          <ScrollReveal direction="right" delay={0.1} className="text-center flex-1">
            <div className="relative mb-2 md:mb-6 group">
              {/* Rectangular frame with gold border */}
              <div className="w-28 h-36 sm:w-36 sm:h-44 md:w-60 md:h-80 mx-auto rounded-lg md:rounded-2xl overflow-hidden border-2 border-wedding-gold shadow-elevated transition-all duration-500 group-hover:shadow-2xl group-hover:border-wedding-gold-light group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face"
                  alt="Cô dâu"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg md:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 30px hsla(43, 50%, 65%, 0.3)' }} />
              </div>
              {/* Decorative corners - hidden on mobile for cleaner look */}
              <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold rounded-tl-lg opacity-60" />
              <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-wedding-gold rounded-tr-lg opacity-60" />
              <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-wedding-gold rounded-bl-lg opacity-60" />
              <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold rounded-br-lg opacity-60" />
            </div>
            <h3 className="font-script text-xl sm:text-2xl md:text-5xl text-wedding-pink-dark mb-0.5 md:mb-2">Đỗ Dương</h3>
          </ScrollReveal>
        </div>

        {/* Love quote */}
        <ScrollReveal direction="up" delay={0.3} className="mt-8 md:mt-16 text-center">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-sm md:text-xl text-muted-foreground italic leading-relaxed">
              "Hạnh phúc không phải là đích đến, mà là hành trình chúng ta cùng nhau đi qua."
            </p>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CoupleSection;
