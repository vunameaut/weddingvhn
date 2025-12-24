import { Calendar, MapPin, Navigation, CalendarPlus, Heart } from 'lucide-react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import StickyCountdown from './StickyCountdown';

const EventDetails = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Hội+nghị+Tiệc+cưới+White+Palace,+Ho+Chi+Minh+City";
  
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
    
    const startDate = '20250215T173000';
    const endDate = '20250215T210000';
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="py-16 md:py-24 px-4 bg-wedding-pink-light relative overflow-hidden">
      <StickyCountdown />
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-floral opacity-30" />
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-wedding-gold opacity-40" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-wedding-gold opacity-40" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-wedding-gold opacity-40" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Summary Card with Photo */}
        <ScrollReveal direction="up" className="mb-10">
          <div className="card-wedding text-center py-8">
            <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-2">Trân Trọng Kính Mời</p>
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-6">
              Tham dự tiệc mừng lễ thành hôn
            </p>
            
            {/* Couple Photo */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-wedding-gold/30" />
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&crop=faces"
                alt="Cô dâu và Chú rể"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Heart className="w-8 h-8 text-wedding-pink fill-wedding-pink" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif text-foreground font-semibold">
              Văn Minh <span className="text-wedding-pink mx-2">&</span> Thu Hương
            </h3>
            
            {/* Date Display */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Chủ nhật</p>
              </div>
              <div className="w-16 h-16 rounded-lg bg-wedding-pink flex flex-col items-center justify-center text-white">
                <span className="text-2xl font-bold leading-none">15</span>
                <span className="text-xs">Tháng 2</span>
              </div>
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase">Năm 2025</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Event cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Location Card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="card-wedding text-center h-full flex flex-col p-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-wedding-pink flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-serif text-foreground font-semibold mb-3">Địa Điểm</h3>
              
              <div className="flex-1 text-foreground">
                <p className="font-semibold mb-1">White Palace</p>
                <p className="text-muted-foreground text-sm">194 Hoàng Văn Thụ, Phú Nhuận</p>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wedding inline-flex items-center justify-center gap-2 mt-4 w-full text-sm py-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Xem Chỉ Đường</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Date Card with Calendar */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="card-wedding text-center h-full flex flex-col p-5">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-wedding-gold-light flex items-center justify-center">
                <Calendar className="w-6 h-6 text-wedding-gold" />
              </div>
              <h3 className="text-xl font-serif text-foreground font-semibold mb-3">Thời Gian</h3>
              
              {/* Mini Calendar */}
              <div className="flex-1">
                <div className="bg-wedding-cream/50 rounded-lg p-3">
                  <p className="font-semibold text-sm mb-2 text-wedding-gold">Tháng 2, 2025</p>
                  
                  {/* Week days header */}
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {weekDays.map((day) => (
                      <div key={day} className="text-[10px] font-medium text-muted-foreground py-0.5">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-0.5">
                    {days.map((day, index) => (
                      <div
                        key={index}
                        className={`
                          aspect-square flex items-center justify-center text-xs relative
                          ${day === null ? '' : 'text-foreground'}
                          ${day === weddingDay ? 'font-bold' : ''}
                        `}
                      >
                        {day === weddingDay ? (
                          <div className="relative">
                            <Heart className="w-6 h-6 text-wedding-pink fill-wedding-pink animate-pulse" />
                            <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
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

                <p className="text-muted-foreground mt-2 text-xs">
                  17:30 - 21:00
                </p>
              </div>

              <button
                onClick={handleAddToCalendar}
                className="btn-wedding inline-flex items-center justify-center gap-2 mt-4 w-full text-sm py-2"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Thêm Vào Lịch</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Note */}
        <ScrollReveal direction="up" delay={0.3} className="mt-8 text-center">
          <p className="text-foreground/80 text-base italic">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default EventDetails;
