import { useState } from 'react';
import OpeningScreen from '@/components/OpeningScreen';
import FloatingParticles from '@/components/FloatingParticles';
import CoupleSection from '@/components/CoupleSection';
import EventDetails from '@/components/EventDetails';
import PhotoAlbum from '@/components/PhotoAlbum';
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
        <section className="min-h-screen flex items-center justify-center bg-gradient-romantic relative px-4">
          <div className="text-center relative z-10">
            {showContent ? (
              <>
                <ScrollReveal direction="up">
                  <p className="text-wedding-pink font-script text-xl md:text-2xl mb-4">Trân trọng thông báo</p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.2}>
                  <h1 className="text-5xl md:text-7xl font-serif text-foreground font-semibold">Văn Minh</h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="text-3xl font-script text-wedding-gold my-4">&</p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.2}>
                  <h1 className="text-5xl md:text-7xl font-serif text-foreground font-semibold">Thu Hương</h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.5}>
                  <p className="text-xl text-muted-foreground mt-6 italic">"Yêu là khi ta muốn cùng nhau đi hết cuộc đời"</p>
                  <p className="text-2xl font-serif text-primary mt-4">15 . 02 . 2025</p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.7} className="mt-12 animate-bounce">
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
            <EventDetails />
            <PhotoAlbum />
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
