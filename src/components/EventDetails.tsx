import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import StickyCountdown from './StickyCountdown';

const EventDetails = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Hội+nghị+Tiệc+cưới+White+Palace,+Ho+Chi+Minh+City";

  return (
    <section className="py-20 md:py-28 px-4 bg-wedding-pink-light relative overflow-hidden">
      <StickyCountdown />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-30" />
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-wedding-gold opacity-40" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-wedding-gold opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-2">Save the Date</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">Thông Tin Lễ Cưới</h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-2xl">❧</span>
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Wedding Ceremony */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="card-wedding text-center h-full">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-wedding-pink flex items-center justify-center">
                <span className="text-2xl">💒</span>
              </div>
              <h3 className="text-2xl font-serif text-foreground font-semibold mb-4">Lễ Thành Hôn</h3>
              <p className="text-muted-foreground mb-6">Tại gia đình nhà trai</p>
              
              <div className="space-y-3 text-foreground">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="w-4 h-4 text-wedding-pink" />
                  <span>Chủ nhật, 15/02/2025</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-4 h-4 text-wedding-pink" />
                  <span>08:00 - 11:00</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-4 h-4 text-wedding-pink" />
                  <span className="text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Wedding Reception */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="card-wedding text-center h-full">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-wedding-gold-light flex items-center justify-center">
                <span className="text-2xl">🥂</span>
              </div>
              <h3 className="text-2xl font-serif text-foreground font-semibold mb-4">Tiệc Cưới</h3>
              <p className="text-muted-foreground mb-6">Trân trọng kính mời</p>
              
              <div className="space-y-3 text-foreground">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="w-4 h-4 text-wedding-gold" />
                  <span>Chủ nhật, 15/02/2025</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Clock className="w-4 h-4 text-wedding-gold" />
                  <span>17:30 - 21:00</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-4 h-4 text-wedding-gold" />
                  <span className="text-sm">White Palace, Phạm Văn Đồng</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Map button */}
        <ScrollReveal direction="up" delay={0.3} className="text-center mt-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wedding inline-flex items-center gap-3"
          >
            <Navigation className="w-5 h-5" />
            <span>Xem Chỉ Đường</span>
          </a>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal direction="up" delay={0.4} className="mt-10 text-center">
          <p className="text-foreground/80 text-lg italic">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventDetails;
