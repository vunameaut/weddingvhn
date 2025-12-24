import { ScrollReveal, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart, MessageCircleHeart } from 'lucide-react';

const wishes = [
  {
    name: "Nguyễn Văn An",
    message: "Chúc hai bạn trăm năm hạnh phúc, sớm có thiên thần nhỏ!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Trần Thị Bình",
    message: "Hạnh phúc mãi bên nhau nhé! Chúc mừng đám cưới hai bạn!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Lê Minh Châu",
    message: "Thật vui vì được chứng kiến ngày hạnh phúc của hai bạn. Chúc hai bạn luôn yêu thương nhau!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Phạm Thị Dung",
    message: "Chúc cô dâu chú rể hạnh phúc viên mãn, tình yêu bền vững như kim cương!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
];

const WishesSection = () => {
  return (
    <section className="py-20 md:py-28 px-4 bg-wedding-pink-light/30 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-12">
          <p className="text-wedding-pink font-script text-2xl md:text-3xl mb-3">Best Wishes</p>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground font-semibold">
            Lời Chúc & Mừng Cưới
          </h2>
          <div className="section-divider mt-6">
            <MessageCircleHeart className="w-5 h-5 text-wedding-pink" />
          </div>
        </ScrollReveal>

        {/* Wishes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {wishes.map((wish, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? 'left' : 'right'}
              delay={getStaggerDelay(index, 0.12)}
            >
              <div className="glass-card flex gap-4 items-start hover:shadow-lg transition-shadow duration-500">
                <img
                  src={wish.avatar}
                  alt={wish.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-wedding-pink/30 flex-shrink-0"
                />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{wish.name}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{wish.message}</p>
                </div>
                <Heart className="w-4 h-4 text-wedding-pink fill-wedding-pink flex-shrink-0 mt-1" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bank transfer info */}
        <ScrollReveal direction="up" delay={0.5} className="mt-12">
          <div className="card-wedding text-center max-w-lg mx-auto">
            <h3 className="text-xl font-serif text-foreground font-semibold mb-4">
              Mừng Cưới
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Thay cho những món quà, bạn có thể gửi lời chúc phúc qua:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-wedding-pink-light/50">
                <p className="text-xs text-muted-foreground mb-1">Chú rể</p>
                <p className="font-semibold text-foreground">Nguyễn Văn Minh</p>
                <p className="text-sm text-muted-foreground">Vietcombank</p>
                <p className="font-medium text-primary">1234567890</p>
              </div>
              <div className="p-4 rounded-xl bg-wedding-pink-light/50">
                <p className="text-xs text-muted-foreground mb-1">Cô dâu</p>
                <p className="font-semibold text-foreground">Lê Thu Hương</p>
                <p className="text-sm text-muted-foreground">Techcombank</p>
                <p className="font-medium text-primary">0987654321</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WishesSection;
