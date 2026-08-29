import { Calendar, MapPin, Navigation, CalendarPlus, Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import StickyCountdown from './StickyCountdown';

const EventDetails = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/gwrBkaQsfHD9yqEv9?g_st=ac";
  
  const weddingDate = new Date(2026, 10, 8, 16, 0); // November 8, 2026, 16:00
  
  // Generate calendar grid for November 2026
  const generateCalendar = () => {
    const year = 2026;
    const month = 10; // November (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const weddingDay = 8;
    
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
    const title = encodeURIComponent('Tiệc Cưới - Đỗ Quân & Mai Linh');
    const location = encodeURIComponent('Địa điểm tổ chức');
    const details = encodeURIComponent('Trân trọng kính mời quý khách đến dự tiệc cưới của chúng tôi');
    
    // Format: YYYYMMDDTHHmmss
    const startDate = '20261108T160000';
    const endDate = '20261108T200000';
    
    // Try Google Calendar first (works on most devices)
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-wedding-pink-light relative overflow-hidden">
      <StickyCountdown />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-30" />
      
      {/* Decorative corners - hidden on mobile */}
      <div className="hidden md:block absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="hidden md:block absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-wedding-gold opacity-40" />
      <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="hidden md:block absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-wedding-gold opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6 md:mb-12">
          <p className="text-wedding-gold font-script text-lg md:text-3xl mb-1 md:mb-2">Save the Date</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">Thông Tin Lễ Cưới</h2>
          <div className="mt-2 md:mt-4 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-lg md:text-2xl">❧</span>
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Event cards - horizontal on mobile */}
        <div className="flex flex-row gap-2 md:gap-6">
          {/* Location Card */}
          <ScrollReveal direction="left" delay={0.1} className="flex-1">
            <div className="card-wedding text-center h-full flex flex-col p-3 md:p-6">
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-full bg-wedding-pink flex items-center justify-center">
                <MapPin className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-base md:text-2xl font-serif text-foreground font-semibold mb-2 md:mb-4">Địa Điểm</h3>
              
              <div className="flex-1 text-foreground">
                <div className="p-2 md:p-4 bg-wedding-cream/50 rounded-lg md:rounded-xl">
                  <p className="font-semibold text-sm md:text-lg mb-0.5 md:mb-1">Tư Gia</p>
                  <p className="text-muted-foreground text-[10px] md:text-sm hidden sm:block">Đại Đình</p>
                  <p className="text-muted-foreground text-[10px] md:text-sm mt-1 md:mt-2 line-clamp-2">Phú Thọ</p>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding inline-flex items-center justify-center gap-1 md:gap-3 mt-3 md:mt-6 w-full text-xs md:text-base py-2 md:py-3 px-2 md:px-4"
              >
                <Navigation className="w-3 h-3 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Xem Chỉ Đường</span>
                <span className="sm:hidden">Chỉ Đường</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Date Card with Calendar */}
          <ScrollReveal direction="right" delay={0.1} className="flex-1">
            <div className="card-wedding text-center h-full flex flex-col p-3 md:p-6">
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-full bg-wedding-gold-light flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-7 md:h-7 text-wedding-gold" />
              </div>
              <h3 className="text-base md:text-2xl font-serif text-foreground font-semibold mb-2 md:mb-4">Ngày Tổ Chức</h3>
              
              {/* Mini Calendar */}
              <div className="flex-1">
                <div className="bg-wedding-cream/50 rounded-lg md:rounded-xl p-2 md:p-4">
                  <p className="font-semibold text-xs md:text-lg mb-1 md:mb-3 text-wedding-gold">Tháng 11, 2026</p>
                  
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1 md:mb-2">
                    {weekDays.map((day) => (
                      <div key={day} className="text-[8px] md:text-xs font-medium text-muted-foreground py-0.5 md:py-1">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-0.5 md:gap-1">
                    {days.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          aspect-square flex items-center justify-center text-[8px] md:text-sm relative
                          ${day === null ? '' : 'text-foreground'}
                          ${day === weddingDay ? 'font-bold' : ''}
                        `}
                      >
                        {day === weddingDay ? (
                          <div className="relative">
                            <Heart className="w-4 h-4 md:w-8 md:h-8 text-wedding-pink fill-wedding-pink animate-pulse" />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-[6px] md:text-xs font-bold">
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

                <p className="text-muted-foreground mt-1 md:mt-3 text-[10px] md:text-sm">
                  Chủ nhật • 16:00
                </p>
                <p className="text-muted-foreground text-[9px] md:text-xs italic">
                  (Âm lịch: 30/09/2026)
                </p>
              </div>

              <button
                onClick={handleAddToCalendar}
                className="btn-wedding inline-flex items-center justify-center gap-1 md:gap-3 mt-3 md:mt-6 w-full text-xs md:text-base py-2 md:py-3 px-2 md:px-4"
              >
                <CalendarPlus className="w-3 h-3 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Thêm Vào Lịch</span>
                <span className="sm:hidden">Lưu Lịch</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Note */}
        <ScrollReveal direction="up" delay={0.4} className="mt-6 md:mt-10 text-center">
          <p className="text-foreground/80 text-sm md:text-lg italic">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventDetails;

