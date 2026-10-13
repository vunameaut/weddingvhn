import { Calendar, MapPin, Navigation, Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import StickyCountdown from './StickyCountdown';

interface EventDetailsProps {
  role?: 'groom' | 'bride';
}

const EventDetails = ({ role = 'groom' }: EventDetailsProps) => {
  const isBride = role === 'bride';

  const googleMapsUrl = isBride
    ? "https://maps.app.goo.gl/H6WSppqjgH49kEmF8"
    : "https://maps.app.goo.gl/CeXaMgXNS2f3VAoRA?g_st=ic";
  
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

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-wedding-pink-light relative overflow-hidden">
      <StickyCountdown role={role} />
      
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

        {/* Khung Thông Tin Lễ Cưới: Phần Lịch to ra & Nút Xem Bản Đồ */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="card-wedding max-w-xl mx-auto p-4 sm:p-6 md:p-8 text-center shadow-xl">
            {/* Địa Điểm */}
            <div className="mb-4 md:mb-6">
              <div className="w-11 h-11 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-full bg-wedding-pink flex items-center justify-center shadow-soft">
                <MapPin className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h3 className="text-xs md:text-sm font-serif text-wedding-gold-dark font-semibold tracking-wider uppercase">
                Địa Điểm Tổ Chức
              </h3>
              <p className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-foreground mt-1">
                {isBride ? 'Tư Gia Nhà Gái' : 'Tư Gia Nhà Trai'}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base mt-1">
                {isBride ? 'Xóm Phố Giá - Xã Phú Lương, Tỉnh Thái Nguyên' : 'Đại Đình, Phú Thọ'}
              </p>
            </div>

            {/* Phần Lịch to ra */}
            <div className="bg-wedding-cream/60 rounded-xl md:rounded-2xl p-3 sm:p-5 md:p-6 border border-wedding-gold/25 shadow-inner">
              <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-wedding-gold" />
                <span className="font-serif font-bold text-base sm:text-lg md:text-xl text-wedding-gold">
                  Tháng 11, 2026
                </span>
              </div>
              
              {/* Week days header */}
              <div className="grid grid-cols-7 gap-1 md:gap-2 mb-1.5 md:mb-2">
                {weekDays.map((day) => (
                  <div key={day} className="text-[11px] sm:text-xs md:text-sm font-semibold text-muted-foreground py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square flex items-center justify-center text-xs sm:text-sm md:text-base relative rounded-lg
                      ${day === null ? '' : 'text-foreground font-medium'}
                      ${day === weddingDay ? 'font-bold' : ''}
                    `}
                  >
                    {day === weddingDay ? (
                      <div className="relative flex items-center justify-center w-full h-full">
                        <Heart className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 text-wedding-pink fill-wedding-pink animate-pulse drop-shadow-sm" />
                        <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] sm:text-xs md:text-sm font-bold">
                          {day}
                        </span>
                      </div>
                    ) : (
                      day
                    )}
                  </div>
                ))}
              </div>

              {/* Time & Lunar Date */}
              <div className="mt-4 pt-3 border-t border-wedding-gold/25">
                <p className="font-serif font-semibold text-foreground text-sm sm:text-base md:text-lg">
                  Chủ nhật • 16:00
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm italic mt-0.5">
                  (Âm lịch: 30/09/2026)
                </p>
              </div>
            </div>

            {/* Bên dưới để mỗi nút Xem Bản Đồ */}
            <div className="mt-5 md:mt-7 flex justify-center">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px] py-3 md:py-3.5 px-6 md:px-8 text-sm md:text-base font-serif shadow-md hover:shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                <span>Xem Bản Đồ</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal direction="up" delay={0.3} className="mt-6 md:mt-10 text-center">
          <p className="text-foreground/80 text-sm md:text-lg italic">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventDetails;

