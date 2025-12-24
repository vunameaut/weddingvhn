import { ScrollReveal, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop", alt: "Ảnh cưới 1", tall: true },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop", alt: "Ảnh cưới 2", tall: false },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop", alt: "Ảnh cưới 3", tall: false },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop", alt: "Ảnh cưới 4", tall: true },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop", alt: "Ảnh cưới 5", tall: false },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop", alt: "Ảnh cưới 6", tall: false },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop", alt: "Ảnh cưới 7", tall: false },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop", alt: "Ảnh cưới 8", tall: false },
];

const PhotoAlbum = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-wedding-pink font-script text-2xl md:text-3xl mb-3">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
            Album Ảnh Cưới
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Photo Grid - Symmetrical masonry layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {/* Row 1: Tall - Normal - Normal - Tall (symmetric) */}
          <ScrollReveal direction="left" delay={0} className="row-span-2">
            <PhotoCard photo={photos[0]} tall onClick={() => setSelectedPhoto(photos[0].src)} />
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <PhotoCard photo={photos[1]} onClick={() => setSelectedPhoto(photos[1].src)} />
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.1}>
            <PhotoCard photo={photos[2]} onClick={() => setSelectedPhoto(photos[2].src)} />
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0} className="row-span-2">
            <PhotoCard photo={photos[3]} tall onClick={() => setSelectedPhoto(photos[3].src)} />
          </ScrollReveal>

          {/* Row 2: (under tall images) Normal - Normal */}
          <ScrollReveal direction="left" delay={0.2}>
            <PhotoCard photo={photos[4]} onClick={() => setSelectedPhoto(photos[4].src)} />
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.2}>
            <PhotoCard photo={photos[5]} onClick={() => setSelectedPhoto(photos[5].src)} />
          </ScrollReveal>

          {/* Row 3: 4 normal images */}
          <ScrollReveal direction="left" delay={0.3}>
            <PhotoCard photo={photos[6]} onClick={() => setSelectedPhoto(photos[6].src)} />
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.35}>
            <PhotoCard photo={{ ...photos[0], src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=400&fit=crop", alt: "Ảnh cưới 9" }} onClick={() => setSelectedPhoto("https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=600&h=400&fit=crop")} />
          </ScrollReveal>
          
          <ScrollReveal direction="up" delay={0.35}>
            <PhotoCard photo={{ ...photos[0], src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop", alt: "Ảnh cưới 10" }} onClick={() => setSelectedPhoto("https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop")} />
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.3}>
            <PhotoCard photo={photos[7]} onClick={() => setSelectedPhoto(photos[7].src)} />
          </ScrollReveal>
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedPhoto}
              alt="Selected photo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-foreground hover:bg-white transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

interface PhotoCardProps {
  photo: { src: string; alt: string };
  tall?: boolean;
  onClick: () => void;
}

const PhotoCard = ({ photo, tall, onClick }: PhotoCardProps) => (
  <div 
    className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 h-full"
    onClick={onClick}
  >
    <img
      src={photo.src}
      alt={photo.alt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    {/* Border glow effect */}
    <div className="absolute inset-0 rounded-xl border-2 border-wedding-gold/0 group-hover:border-wedding-gold transition-all duration-500" />
    {/* Glow effect on hover */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'inset 0 0 20px hsla(40, 55%, 55%, 0.25)' }} />
  </div>
);

export default PhotoAlbum;
