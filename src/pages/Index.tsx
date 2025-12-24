import { useState } from 'react';
import OpeningScreen from '@/components/OpeningScreen';
import FloatingParticles from '@/components/FloatingParticles';
import CoupleSection from '@/components/CoupleSection';
import LoveStory from '@/components/LoveStory';
import EventDetails from '@/components/EventDetails';
import PhotoAlbum from '@/components/PhotoAlbum';
import VideoSection from '@/components/VideoSection';
import RSVPForm from '@/components/RSVPForm';
import WishesSection from '@/components/WishesSection';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, ChevronDown } from 'lucide-react';

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    // Delay showing content slightly after doors open
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  return (
    <>
      {/* Opening doors */}
      {!isOpened && <OpeningScreen onOpen={handleOpen} />}

      {/* Main content - visible behind doors, interactive after open */}
      <div className={`min-h-screen bg-background ${!showContent ? 'overflow-hidden' : ''}`}>
        <FloatingParticles />
        {showContent && <MusicPlayer />}
        
        {/* Hero / Cover of invitation */}
        <section className="min-h-screen flex items-center justify-center bg-gradient-romantic relative px-4 py-12">
          <div className="text-center relative z-10 max-w-2xl mx-auto">
            {showContent ? (
              <>
                {/* Decorative header ornament */}
                <ScrollReveal direction="up">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px w-16 bg-wedding-gold/50" />
                    <span className="text-wedding-gold text-2xl">❧</span>
                    <div className="h-px w-16 bg-wedding-gold/50" />
                  </div>
                </ScrollReveal>

                {/* Main invitation title */}
                <ScrollReveal direction="up" delay={0.1}>
                  <h2 className="font-script text-3xl md:text-4xl text-wedding-gold mb-8">
                    Trân Trọng Kính Mời
                  </h2>
                </ScrollReveal>

                {/* Couple photos layout */}
                <ScrollReveal direction="up" delay={0.2}>
                  <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
                    {/* Groom photo placeholder */}
                    <div className="w-28 h-36 md:w-36 md:h-48 bg-wedding-cream rounded-lg border-2 border-wedding-gold/30 flex items-center justify-center overflow-hidden shadow-lg">
                      <div className="text-center p-2">
                        <div className="w-16 h-20 md:w-20 md:h-28 bg-wedding-pink/20 rounded mx-auto mb-1 flex items-center justify-center">
                          <span className="text-3xl">🤵</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Chú rể</p>
                      </div>
                    </div>

                    {/* Heart connector */}
                    <div className="text-wedding-pink text-3xl animate-heart-beat">
                      <Heart className="w-8 h-8 fill-wedding-pink" />
                    </div>

                    {/* Bride photo placeholder */}
                    <div className="w-28 h-36 md:w-36 md:h-48 bg-wedding-cream rounded-lg border-2 border-wedding-gold/30 flex items-center justify-center overflow-hidden shadow-lg">
                      <div className="text-center p-2">
                        <div className="w-16 h-20 md:w-20 md:h-28 bg-wedding-pink/20 rounded mx-auto mb-1 flex items-center justify-center">
                          <span className="text-3xl">👰</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Cô dâu</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Event text */}
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="text-sm md:text-base text-muted-foreground tracking-wider mb-4">
                    THAM DỰ TIỆC MỪNG LỄ THÀNH HÔN
                  </p>
                </ScrollReveal>

                {/* Couple names */}
                <ScrollReveal direction="left" delay={0.4}>
                  <h1 className="text-4xl md:text-6xl font-serif text-foreground font-semibold">Văn Minh</h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.45}>
                  <p className="text-3xl font-script text-wedding-gold my-3">&</p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.4}>
                  <h1 className="text-4xl md:text-6xl font-serif text-foreground font-semibold">Thu Hương</h1>
                </ScrollReveal>

                {/* Date */}
                <ScrollReveal direction="up" delay={0.5}>
                  <div className="mt-8 mb-6">
                    <p className="text-xl md:text-2xl font-serif text-primary">15 . 02 . 2025</p>
                  </div>
                </ScrollReveal>

                {/* Scroll indicator */}
                <ScrollReveal direction="up" delay={0.7} className="mt-8 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-wedding-pink mx-auto" />
                  <p className="text-sm text-muted-foreground">Cuộn xuống</p>
                </ScrollReveal>
              </>
            ) : (
              // Placeholder content shown behind doors
              <div className="opacity-50">
                <p className="text-wedding-pink font-script text-xl md:text-2xl mb-4">We are Getting Married</p>
                <h1 className="text-5xl md:text-7xl font-serif text-foreground font-semibold mb-2">
                  Minh <span className="text-wedding-pink">&</span> Hương
                </h1>
                <p className="text-2xl md:text-3xl font-script text-wedding-gold">15.02.2025</p>
              </div>
            )}
          </div>
        </section>

        {showContent && (
          <>
            <CoupleSection />
            <LoveStory />
            <EventDetails />
            <PhotoAlbum />
            <VideoSection />
            <RSVPForm />
            <WishesSection />
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Index;
