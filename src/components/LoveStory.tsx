import { ScrollReveal, useAlternatingDirection, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Tháng 9, 2020",
    title: "Lần đầu gặp gỡ",
    description: "Chúng tôi gặp nhau lần đầu tại một buổi tiệc của bạn chung. Ánh mắt đầu tiên đã khiến cả hai không thể quên.",
    image: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&h=300&fit=crop"
  },
  {
    date: "Tháng 12, 2020",
    title: "Hẹn hò đầu tiên",
    description: "Buổi hẹn hò đầu tiên tại quán cà phê nhỏ. Chúng tôi nói chuyện đến khi quán đóng cửa mà vẫn chưa muốn về.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop"
  },
  {
    date: "Tháng 2, 2021",
    title: "Chính thức yêu nhau",
    description: "Anh ấy đã tỏ tình vào một đêm Valentine đầy lãng mạn. Và cô ấy đã nói 'Có'.",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop"
  },
  {
    date: "Tháng 8, 2023",
    title: "Du lịch cùng nhau",
    description: "Chuyến du lịch Đà Lạt đáng nhớ, nơi chúng tôi có những kỷ niệm đẹp nhất.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop"
  },
  {
    date: "Tháng 10, 2024",
    title: "Cầu hôn",
    description: "Anh ấy đã quỳ gối cầu hôn tại nơi chúng tôi gặp nhau lần đầu. Một vòng tròn hoàn hảo cho câu chuyện tình yêu.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=300&fit=crop"
  },
];

const LoveStory = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-gradient-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-floral opacity-30" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-16">
          <p className="text-wedding-pink font-script text-2xl md:text-3xl mb-3">Our Journey</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
            Chuyện Tình Yêu
          </h2>
          <div className="section-divider mt-6">
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-wedding-pink/20 via-wedding-pink/40 to-wedding-pink/20 hidden md:block" />
          
          {timelineEvents.map((event, index) => {
            const direction = useAlternatingDirection(index);
            const isEven = index % 2 === 0;
            
            return (
              <div key={index} className="relative mb-12 md:mb-16">
                {/* Timeline dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-wedding-pink border-4 border-background shadow-lg hidden md:block z-10" />
                
                <div className={`md:flex items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Image */}
                  <ScrollReveal 
                    direction={direction} 
                    delay={getStaggerDelay(index, 0.1)}
                    className={`md:w-1/2 mb-4 md:mb-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    {event.image && (
                      <div className="relative group">
                        <div className="overflow-hidden rounded-2xl shadow-lg">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-wedding-gold flex items-center justify-center text-primary-foreground text-sm font-medium shadow-md">
                          {index + 1}
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                  
                  {/* Content */}
                  <ScrollReveal 
                    direction={isEven ? 'right' : 'left'} 
                    delay={getStaggerDelay(index, 0.1) + 0.15}
                    className={`md:w-1/2 ${isEven ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'}`}
                  >
                    <span className="inline-block px-4 py-1 rounded-full bg-wedding-pink-light text-wedding-pink-dark text-sm font-medium mb-3">
                      {event.date}
                    </span>
                    <h3 className="text-2xl font-serif text-foreground font-semibold mb-2">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
