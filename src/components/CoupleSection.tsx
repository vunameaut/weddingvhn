import { useState } from 'react';
import { Heart, ZoomIn, X } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import groomImg from '@/assets/groom.png';
import brideImg from '@/assets/bride.jpg';

interface CoupleSectionProps {
  role?: 'groom' | 'bride';
}

const CoupleSection = ({ role = 'groom' }: CoupleSectionProps) => {
  const isBride = role === 'bride';
  const [previewPhoto, setPreviewPhoto] = useState<{ src: string; title: string } | null>(null);

  const groomCard = (direction: 'left' | 'right') => (
    <ScrollReveal direction={direction} delay={0.1} className="text-center flex-1">
      <div 
        className="relative mb-2 md:mb-6 group cursor-pointer"
        onClick={() => setPreviewPhoto({ src: groomImg, title: 'Chú rể - Đỗ Quân' })}
      >
        <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-60 md:h-80 mx-auto rounded-xl md:rounded-2xl overflow-hidden border-2 border-wedding-gold shadow-elevated transition-all duration-300 group-hover:shadow-2xl group-hover:border-wedding-gold-light group-hover:scale-[1.02]">
          <img
            src={groomImg}
            alt="Chú rể"
            className="w-full h-full object-cover object-[center_18%] contrast-[1.02] brightness-[1.01]"
            loading="eager"
            decoding="async"
          />
          {/* Nút phóng to khi hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="p-2 rounded-full bg-white/90 shadow text-xs">
              <ZoomIn className="w-4 h-4 text-wedding-gold-dark" />
            </span>
          </div>
        </div>
        <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold rounded-tl-lg opacity-60" />
        <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-wedding-gold rounded-tr-lg opacity-60" />
        <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-wedding-gold rounded-bl-lg opacity-60" />
        <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold rounded-br-lg opacity-60" />
      </div>
      <h3 className="font-flourish text-3xl sm:text-4xl md:text-6xl text-wedding-pink-dark mb-1 tracking-wide">Đỗ Quân</h3>
      <div className="mt-2 text-xs sm:text-sm text-muted-foreground space-y-0.5">
        <p className="font-serif font-semibold text-foreground/80">Nhà Trai</p>
        <p>Ông: Đỗ Đình Đoàn</p>
        <p>Bà: Nguyễn Thị Hạnh</p>
      </div>
    </ScrollReveal>
  );

  const brideCard = (direction: 'left' | 'right') => (
    <ScrollReveal direction={direction} delay={0.1} className="text-center flex-1">
      <div 
        className="relative mb-2 md:mb-6 group cursor-pointer"
        onClick={() => setPreviewPhoto({ src: brideImg, title: 'Cô dâu - Mai Linh' })}
      >
        <div className="w-32 h-44 sm:w-40 sm:h-52 md:w-60 md:h-80 mx-auto rounded-xl md:rounded-2xl overflow-hidden border-2 border-wedding-gold shadow-elevated transition-all duration-300 group-hover:shadow-2xl group-hover:border-wedding-gold-light group-hover:scale-[1.02]">
          <img
            src={brideImg}
            alt="Cô dâu"
            className="w-full h-full object-cover object-[center_20%] contrast-[1.02] brightness-[1.01]"
            loading="eager"
            decoding="async"
          />
          {/* Nút phóng to khi hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="p-2 rounded-full bg-white/90 shadow text-xs">
              <ZoomIn className="w-4 h-4 text-wedding-gold-dark" />
            </span>
          </div>
        </div>
        <div className="hidden md:block absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-wedding-gold rounded-tl-lg opacity-60" />
        <div className="hidden md:block absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-wedding-gold rounded-tr-lg opacity-60" />
        <div className="hidden md:block absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-wedding-gold rounded-bl-lg opacity-60" />
        <div className="hidden md:block absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-wedding-gold rounded-br-lg opacity-60" />
      </div>
      <h3 className="font-flourish text-3xl sm:text-4xl md:text-6xl text-wedding-pink-dark mb-1 tracking-wide">Mai Linh</h3>
      <div className="mt-2 text-xs sm:text-sm text-muted-foreground space-y-0.5">
        <p className="font-serif font-semibold text-foreground/80">Nhà Gái</p>
        <p>Bà: Nguyễn Thị Tuyết</p>
      </div>
    </ScrollReveal>
  );

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-16">
          <p className="text-wedding-pink font-script text-xl md:text-3xl mb-2">Hân hoan giới thiệu</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">
            {isBride ? 'Cô Dâu & Chú Rể' : 'Cô Dâu & Chú Rể'}
          </h2>
          <div className="mt-3 md:mt-4 flex items-center justify-center gap-3 md:gap-4">
            <div className="h-px w-12 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-xl md:text-2xl">❧</span>
            <div className="h-px w-12 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Couple */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 md:gap-16">
          {/* First person */}
          {isBride ? brideCard('left') : groomCard('left')}

          {/* Heart connector */}
          <ScrollReveal direction="up" delay={0.2} className="flex flex-col items-center py-2 md:py-4 flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 rounded-full bg-wedding-cream border-2 border-wedding-gold flex items-center justify-center shadow-soft animate-heart-beat">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 text-wedding-gold fill-wedding-gold" />
            </div>
          </ScrollReveal>

          {/* Second person */}
          {isBride ? groomCard('right') : brideCard('right')}
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

      {/* Modal phóng to ảnh cô dâu / chú rể */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPreviewPhoto(null)}
        >
          <button
            onClick={() => setPreviewPhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewPhoto.src}
              alt={previewPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
            <p className="text-white/90 font-serif text-base mt-3">{previewPhoto.title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CoupleSection;
