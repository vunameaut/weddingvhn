import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, Play } from 'lucide-react';
import { useState, useRef } from 'react';

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Sample wedding video (replace with actual video URL)
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1";
  const thumbnailUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=675&fit=crop";

  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-wedding-pink font-script text-2xl md:text-3xl mb-3">Watch Our Story</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
            Video Cưới
          </h2>
          <div className="section-divider mt-6">
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          </div>
        </ScrollReveal>

        {/* Video Container */}
        <ScrollReveal direction="scale" delay={0.2} className="relative">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated group">
            {!isPlaying ? (
              <>
                {/* Thumbnail */}
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
                  {/* Play button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center text-primary-foreground shadow-xl transition-all duration-500 hover:scale-110 hover:bg-primary group"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
                  </button>
                </div>
                {/* Decorative border */}
                <div className="absolute inset-4 rounded-xl border border-wedding-gold/40" />
              </>
            ) : (
              <iframe
                ref={videoRef}
                src={videoUrl}
                title="Wedding Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          
          {/* Caption */}
          <p className="text-center text-muted-foreground mt-6 italic font-body">
            "Mỗi khoảnh khắc bên nhau là một kỷ niệm đẹp..."
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default VideoSection;
