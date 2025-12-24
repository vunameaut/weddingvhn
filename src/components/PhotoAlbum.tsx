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
];

const PhotoAlbum = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6 md:mb-12">
          <p className="text-wedding-pink font-script text-lg md:text-3xl mb-1 md:mb-3">Gallery</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">
            Album Ảnh Cưới
          </h2>
          <div className="mt-3 md:mt-6 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Photo Grid - 3 columns on mobile */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-4">
          {photos.map((photo, index) => (
            <ScrollReveal 
              key={index} 
              direction="up" 
              delay={getStaggerDelay(index, 0.05)}
            >
              <PhotoCard photo={photo} onClick={() => setSelectedPhoto(photo.src)} />
            </ScrollReveal>
          ))}
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
  onClick: () => void;
}

const PhotoCard = ({ photo, onClick }: PhotoCardProps) => (
  <div 
    className="relative group cursor-pointer overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-500 aspect-square"
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
    <div className="absolute inset-0 rounded-lg md:rounded-xl border-2 border-wedding-gold/0 group-hover:border-wedding-gold transition-all duration-500" />
  </div>
);

export default PhotoAlbum;
