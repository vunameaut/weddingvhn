import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

const EventDetails = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Hội+nghị+Tiệc+cưới+White+Palace,+Ho+Chi+Minh+City";

  return (
    <section className="py-16 md:py-24 px-4 bg-wedding-red relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-wedding-gold opacity-30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-wedding-gold opacity-30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-wedding-gold opacity-30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-wedding-gold opacity-30" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-2">Save the Date</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-foreground font-bold">Thông Tin Tiệc Cưới</h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-2xl">❧</span>
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          </div>
        </div>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Wedding Ceremony - Groom's Side */}
          <div className="card-wedding border-ornament fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wedding-red flex items-center justify-center">
                <span className="text-2xl text-wedding-gold">囍</span>
              </div>
              <h3 className="text-2xl font-serif text-primary font-bold mb-4">Lễ Thành Hôn</h3>
              <p className="text-muted-foreground mb-6 font-medium">Tại gia đình nhà trai</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body">Chủ nhật, 15/02/2025</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body">08:00 - 11:00</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body text-sm">123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Reception */}
          <div className="card-wedding border-ornament fade-in-up-delay-1">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-wedding-red flex items-center justify-center">
                <span className="text-2xl text-wedding-gold">🥂</span>
              </div>
              <h3 className="text-2xl font-serif text-primary font-bold mb-4">Tiệc Cưới</h3>
              <p className="text-muted-foreground mb-6 font-medium">Trân trọng kính mời</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Calendar className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body">Chủ nhật, 15/02/2025</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <Clock className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body">17:30 - 21:00</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-wedding-gold" />
                  <span className="font-body text-sm">White Palace, Phạm Văn Đồng, TP.HCM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map button */}
        <div className="text-center mt-10 fade-in-up-delay-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wedding inline-flex items-center gap-3"
          >
            <Navigation className="w-5 h-5" />
            <span>Xem Chỉ Đường</span>
          </a>
        </div>

        {/* Countdown or note */}
        <div className="mt-12 text-center">
          <p className="text-primary-foreground font-body text-lg italic">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
