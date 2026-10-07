import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useState, useEffect } from 'react';

// Sử dụng trực tiếp ảnh album gốc độ nét cao 2048px sắc nét từng chi tiết
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';
import album4 from '@/assets/album4.jpg';
import album5 from '@/assets/album5.jpg';
import album6 from '@/assets/album6.jpg';
import album7 from '@/assets/album7.jpg';
import album8 from '@/assets/album8.jpg';
import album9 from '@/assets/album9.jpg';

interface PhotoItem {
  src: string;
  alt: string;
}

const originalPhotos: PhotoItem[] = [
  { src: album1, alt: "Ảnh cưới 1" },
  { src: album2, alt: "Ảnh cưới 2" },
  { src: album3, alt: "Ảnh cưới 3" },
  { src: album4, alt: "Ảnh cưới 4" },
  { src: album5, alt: "Ảnh cưới 5" },
  { src: album6, alt: "Ảnh cưới 6" },
  { src: album7, alt: "Ảnh cưới 7" },
  { src: album8, alt: "Ảnh cưới 8" },
  { src: album9, alt: "Ảnh cưới 9" },
];

const PhotoAlbum = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [randomizedPhotos, setRandomizedPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    // Xáo trộn ngẫu nhiên thứ tự ảnh khi tải trang
    const shuffled = [...originalPhotos].sort(() => Math.random() - 0.5);
    setRandomizedPhotos(shuffled);
  }, []);

  if (randomizedPhotos.length === 0) return null;

  // Chia ảnh thành 3 cột chạy song song
  const col1 = randomizedPhotos.slice(0, 3);
  const col2 = randomizedPhotos.slice(3, 6);
  const col3 = randomizedPhotos.slice(6, 9);

  const handleOpenPhoto = (photoSrc: string) => {
    const idx = originalPhotos.findIndex(p => p.src === photoSrc);
    setSelectedPhotoIndex(idx >= 0 ? idx : 0);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + originalPhotos.length) % originalPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % originalPhotos.length);
    }
  };

  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden">
      <style>{`
        @keyframes scroll-up {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes scroll-down {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .animate-scroll-up {
          animation: scroll-up 24s linear infinite;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .animate-scroll-down {
          animation: scroll-down 24s linear infinite;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .pause-on-hover:hover .animate-scroll-up,
        .pause-on-hover:hover .animate-scroll-down {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10 px-3 md:px-4">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-8 md:mb-12">
          <p className="text-wedding-pink font-script text-lg md:text-3xl mb-1 md:mb-3">Gallery</p>
          <h2 className="text-2xl md:text-4xl font-serif text-foreground font-semibold">
            Album Ảnh Cưới
          </h2>
          <div className="mt-3 md:mt-5 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* 3x3 Staggered Scrolling Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 h-[440px] md:h-[650px] overflow-hidden pause-on-hover rounded-xl shadow-lg relative p-2 bg-secondary/50">
          
          {/* Column 1: Scroll Up */}
          <div className="flex flex-col gap-2 md:gap-4 animate-scroll-up will-change-transform transform-gpu">
            <div className="flex flex-col gap-2 md:gap-4">
              {col1.map((photo, index) => (
                <div key={`c1-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
            {/* Duplicate for infinite scroll */}
            <div className="flex flex-col gap-2 md:gap-4">
              {col1.map((photo, index) => (
                <div key={`c1-dup-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Scroll Down */}
          <div className="flex flex-col gap-2 md:gap-4 animate-scroll-down will-change-transform transform-gpu">
            <div className="flex flex-col gap-2 md:gap-4">
              {col2.map((photo, index) => (
                <div key={`c2-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
            {/* Duplicate for infinite scroll */}
            <div className="flex flex-col gap-2 md:gap-4">
              {col2.map((photo, index) => (
                <div key={`c2-dup-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Scroll Up */}
          <div className="flex flex-col gap-2 md:gap-4 animate-scroll-up will-change-transform transform-gpu">
            <div className="flex flex-col gap-2 md:gap-4">
              {col3.map((photo, index) => (
                <div key={`c3-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
            {/* Duplicate for infinite scroll */}
            <div className="flex flex-col gap-2 md:gap-4">
              {col3.map((photo, index) => (
                <div key={`c3-dup-${index}`} className="w-full aspect-square shrink-0 rounded-lg overflow-hidden shadow-sm">
                  <PhotoCard photo={photo} onClick={() => handleOpenPhoto(photo.src)} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient overlays for smooth fading edges */}
          <div className="absolute top-0 left-0 right-0 h-10 md:h-24 bg-gradient-to-b from-secondary/80 to-transparent pointer-events-none z-10 rounded-t-xl" />
          <div className="absolute bottom-0 left-0 right-0 h-10 md:h-24 bg-gradient-to-t from-secondary/80 to-transparent pointer-events-none z-10 rounded-b-xl" />
        </div>
      </div>

      {/* Lightbox Modal HD */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Nút đóng */}
          <button
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nút Prev */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Container hiển thị ảnh Full HD */}
          <div className="relative max-w-4xl max-h-[88vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={originalPhotos[selectedPhotoIndex].src}
              alt={originalPhotos[selectedPhotoIndex].alt}
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl border border-white/20"
              decoding="async"
            />
            <p className="text-white/80 font-serif text-sm mt-3">
              {originalPhotos[selectedPhotoIndex].alt} ({selectedPhotoIndex + 1}/{originalPhotos.length})
            </p>
          </div>

          {/* Nút Next */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-50 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      )}
    </section>
  );
};

interface PhotoCardProps {
  photo: PhotoItem;
  onClick: () => void;
}

const PhotoCard = ({ photo, onClick }: PhotoCardProps) => (
  <div 
    className="relative group cursor-pointer overflow-hidden rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full h-full"
    onClick={onClick}
  >
    <img
      src={photo.src}
      alt={photo.alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 contrast-[1.02] brightness-[1.01]"
      loading="lazy"
      decoding="async"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
      <span className="p-1.5 rounded-full bg-white/90 shadow opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn className="w-4 h-4 text-wedding-gold-dark" />
      </span>
    </div>
    {/* Border glow effect */}
    <div className="absolute inset-0 rounded-lg md:rounded-xl border-2 border-wedding-gold/0 group-hover:border-wedding-gold transition-all duration-300" />
  </div>
);

export default PhotoAlbum;
