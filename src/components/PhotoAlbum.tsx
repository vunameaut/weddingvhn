import { ScrollReveal, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop", alt: "Ảnh cưới 1" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop", alt: "Ảnh cưới 2" },
  { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop", alt: "Ảnh cưới 3" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop", alt: "Ảnh cưới 4" },
  { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&h=400&fit=crop", alt: "Ảnh cưới 5" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop", alt: "Ảnh cưới 6" },
  { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop", alt: "Ảnh cưới 7" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop", alt: "Ảnh cưới 8" },
];

const PhotoAlbum = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28 px-4 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-wedding-pink font-script text-2xl md:text-3xl mb-3">Gallery</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
            Album Ảnh Cưới
          </h2>
          <div className="section-divider mt-6">
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          </div>
        </ScrollReveal>

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {photos.map((photo, index) => {
            // Determine direction based on column position
            const colPosition = index % 4;
            const direction = colPosition < 2 ? 'left' : 'right';
            
            return (
              <ScrollReveal
                key={index}
                direction={direction}
                delay={getStaggerDelay(index, 0.08)}
                className={`${index === 0 || index === 3 || index === 7 ? 'row-span-2' : ''}`}
              >
                <div 
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-500"
                  onClick={() => setSelectedPhoto(photo.src)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ aspectRatio: index === 0 || index === 3 || index === 7 ? '3/4' : '4/3' }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-wedding-gold/0 group-hover:border-wedding-gold/60 transition-all duration-500" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedPhoto}
              alt="Selected photo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/90 flex items-center justify-center text-foreground hover:bg-background transition-colors"
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

export default PhotoAlbum;
