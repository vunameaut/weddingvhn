import { useRef, useEffect, useState } from 'react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, Volume2, VolumeX } from 'lucide-react';
import videoFile from '@/assets/damcuoi.mp4';

const LoveStory = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Khi lướt đến thì tự động phát video
            video
              .play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((err) => {
                console.log('Video autoplay error or blocked:', err);
              });
          } else {
            // Lướt ra ngoài thì dừng lại
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.35, // Khi video hiện từ 35% trên màn hình
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      videoRef.current.muted = nextMute;
      setIsMuted(nextMute);
      if (!nextMute) {
        // Tạm dừng nhạc nền nếu bật tiếng video
        window.dispatchEvent(new CustomEvent('pause-music'));
      }
    }
  };

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-floral opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6 md:mb-12">
          <p className="text-wedding-pink font-script text-lg md:text-3xl mb-1 md:mb-3">Our Journey</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">
            Chuyện Tình Yêu
          </h2>
          <div className="section-divider mt-3 md:mt-6">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          </div>
        </ScrollReveal>

        {/* Video Auto-play Container */}
        <ScrollReveal direction="scale" delay={0.2} className="relative">
          <div
            ref={containerRef}
            className="relative aspect-video rounded-2xl overflow-hidden shadow-elevated bg-black border-2 border-wedding-gold/30 group"
          >
            <video
              ref={videoRef}
              src={videoFile}
              playsInline
              muted={isMuted}
              loop
              controls
              onPlay={() => {
                setIsPlaying(true);
                if (!isMuted) {
                  window.dispatchEvent(new CustomEvent('pause-music'));
                }
              }}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
            />

            {/* Quick sound toggle button on top-right */}
            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-transform active:scale-95 shadow-md flex items-center gap-1.5 text-xs"
              title={isMuted ? 'Bật âm thanh video' : 'Tắt âm thanh video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-wedding-gold-light" />
                  <span className="hidden sm:inline">Bật tiếng</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-wedding-pink" />
                  <span className="hidden sm:inline">Tắt tiếng</span>
                </>
              )}
            </button>

            {/* Decorative frame overlay */}
            <div className="absolute inset-3 md:inset-4 rounded-xl border border-wedding-gold/20 pointer-events-none" />
          </div>

          <p className="text-center text-muted-foreground mt-4 md:mt-6 italic font-body text-xs md:text-sm">
            "Mỗi khoảnh khắc bên nhau là một kỷ niệm đẹp..."
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LoveStory;
