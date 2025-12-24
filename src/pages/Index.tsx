import { useState } from 'react';
import EnvelopeCard from '@/components/EnvelopeCard';
import CoupleSection from '@/components/CoupleSection';
import EventDetails from '@/components/EventDetails';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';
import HeartParticles from '@/components/HeartParticles';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [isOpened, setIsOpened] = useState(false);

  if (!isOpened) {
    return (
      <>
        <HeartParticles />
        <EnvelopeCard onOpen={() => setIsOpened(true)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeartParticles />
      <MusicPlayer />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-cream bg-pattern-traditional relative overflow-hidden px-4">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-5xl md:text-7xl text-wedding-gold/30 animate-float">✿</div>
        <div className="absolute top-20 right-16 text-4xl md:text-6xl text-wedding-gold/30 animate-float-delayed">❀</div>
        <div className="absolute bottom-20 left-20 text-4xl md:text-6xl text-wedding-gold/30 animate-float-delayed">✿</div>
        <div className="absolute bottom-10 right-10 text-5xl md:text-7xl text-wedding-gold/30 animate-float">❀</div>
        
        <div className="text-center relative z-10 invitation-card">
          {/* Double happiness symbol */}
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-wedding-red flex items-center justify-center shadow-2xl">
            <span className="text-4xl md:text-5xl text-wedding-gold font-bold">囍</span>
          </div>
          
          {/* Wedding announcement */}
          <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-4 fade-in-up">
            Trân trọng thông báo
          </p>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary font-bold mb-4 fade-in-up-delay-1">
            <span className="block">Văn Minh</span>
            <span className="text-wedding-gold text-3xl md:text-4xl font-script my-2 block">&</span>
            <span className="block">Thu Hương</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 my-6 fade-in-up-delay-2">
            <div className="h-px w-12 md:w-20 bg-wedding-gold" />
            <span className="text-wedding-gold text-xl">❤</span>
            <div className="h-px w-12 md:w-20 bg-wedding-gold" />
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-body fade-in-up-delay-2">
            Chúng tôi sắp kết hôn!
          </p>
          
          <p className="text-2xl md:text-3xl font-serif text-primary mt-4 fade-in-up-delay-3">
            15 . 02 . 2025
          </p>
          
          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce fade-in-up-delay-3">
            <div className="w-6 h-10 border-2 border-wedding-gold rounded-full mx-auto flex items-start justify-center p-1">
              <div className="w-1.5 h-3 bg-wedding-gold rounded-full animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground mt-2 font-body">Cuộn xuống</p>
          </div>
        </div>
      </section>

      {/* Couple Section */}
      <CoupleSection />

      {/* Event Details */}
      <EventDetails />

      {/* RSVP Form */}
      <RSVPForm />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
