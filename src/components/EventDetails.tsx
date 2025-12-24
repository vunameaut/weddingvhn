import { Calendar, MapPin, Navigation, CalendarPlus, Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import StickyCountdown from './StickyCountdown';

const EventDetails = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Hội+nghị+Tiệc+cưới+White+Palace,+Ho+Chi+Minh+City";
  
  const weddingDate = new Date(2025, 1, 15, 17, 30); // February 15, 2025, 17:30
  
  // Generate calendar grid for February 2025
  const generateCalendar = () => {
    const year = 2025;
    const month = 1; // February (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weddingDay = 15;
    
    const days = [];
    
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return { days, weddingDay };
  };

  const { days, weddingDay } = generateCalendar();
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  // Add to Calendar function - works for both iOS and Android
  const handleAddToCalendar = () => {
    const title = encodeURIComponent('Tiệc Cưới - Văn Minh & Thu Hương');
    const location = encodeURIComponent('White Palace, Phạm Văn Đồng, TP.HCM');
    const details = encodeURIComponent('Trân trọng kính mời quý khách đến dự tiệc cưới của chúng tôi');
    
    // Format: YYYYMMDDTHHmmss
    const startDate = '20250215T173000';
    const endDate = '20250215T210000';
    
    // Try Google Calendar first (works on most devices)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

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
          {/* Location Card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="card-wedding text-center h-full flex flex-col">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-wedding-pink flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-serif text-foreground font-semibold mb-4">Địa Điểm</h3>
              
              <div className="flex-1 space-y-4 text-foreground">
                <div className="p-4 bg-wedding-cream/50 rounded-xl">
                  <p className="font-semibold text-lg mb-1">White Palace</p>
                  <p className="text-muted-foreground text-sm">Trung tâm Hội nghị & Tiệc cưới</p>
                  <p className="text-muted-foreground text-sm mt-2">194 Hoàng Văn Thụ, Phú Nhuận, TP.HCM</p>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding inline-flex items-center justify-center gap-3 mt-6 w-full"
              >
                <Navigation className="w-5 h-5" />
                <span>Xem Chỉ Đường</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Date Card with Calendar */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="card-wedding text-center h-full flex flex-col">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-wedding-gold-light flex items-center justify-center">
                <Calendar className="w-7 h-7 text-wedding-gold" />
              </div>
              <h3 className="text-2xl font-serif text-foreground font-semibold mb-4">Ngày Tổ Chức</h3>
              
              {/* Mini Calendar */}
              <div className="flex-1">
                <div className="bg-wedding-cream/50 rounded-xl p-4">
                  <p className="font-semibold text-lg mb-3 text-wedding-gold">Tháng 2, 2025</p>
                  
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-xs font-medium text-muted-foreground py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          aspect-square flex items-center justify-center text-sm relative
                          ${day === null ? '' : 'text-foreground'}
                          ${day === weddingDay ? 'font-bold' : ''}
                        `}
                      >
                        {day === weddingDay ? (
                          <div className="relative">
                            <Heart className="w-8 h-8 text-wedding-pink fill-wedding-pink animate-pulse" />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                              {day}
                            </span>
                          </div>
                        ) : (
                          day
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground mt-3 text-sm">
                  Chủ nhật • 17:30 - 21:00
                </p>
              </div>

              <button
                onClick={handleAddToCalendar}
                className="btn-wedding inline-flex items-center justify-center gap-3 mt-6 w-full"
              >
                <CalendarPlus className="w-5 h-5" />
                <span>Thêm Vào Lịch</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

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
