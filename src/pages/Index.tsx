import { useState } from 'react';
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

  if (!isOpened) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-romantic relative overflow-hidden px-4">
        <FloatingParticles />
        <div className="text-center relative z-10">
          <p className="text-wedding-pink font-script text-xl md:text-2xl mb-4 fade-in-up">We're Getting Married</p>
          <h1 className="text-5xl md:text-7xl font-serif text-foreground font-semibold mb-2 fade-in-up-delay-1">
            Minh <span className="text-wedding-pink">&</span> Hương
          </h1>
          <p className="text-2xl md:text-3xl font-script text-wedding-gold mb-8 fade-in-up-delay-2">15.02.2025</p>
          <button onClick={() => setIsOpened(true)} className="btn-wedding fade-in-up-delay-3">
            <Heart className="w-5 h-5 mr-2" /> Mở Thiệp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <FloatingParticles />
      <MusicPlayer />
      
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-romantic relative px-4">
        <div className="text-center relative z-10 invitation-card">
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
        </div>
      </section>

      <CoupleSection />
      <LoveStory />
      <EventDetails />
      <PhotoAlbum />
      <VideoSection />
      <RSVPForm />
      <WishesSection />
      <Footer />
    </div>
  );
};

export default Index;
