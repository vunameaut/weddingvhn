import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Shirt, Palette, Heart } from 'lucide-react';

const dressColors = [
  { color: '#F8E8E0', label: 'Hồng nhạt' },
  { color: '#F5F0EB', label: 'Be' },
  { color: '#E8D5C4', label: 'Nâu nhạt' },
  { color: '#FFF5EE', label: 'Kem' },
  { color: '#F0E6D3', label: 'Vàng nhạt' },
];

const DressCode = () => {
  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-wedding-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6 md:mb-12">
          <p className="text-wedding-pink font-script text-lg md:text-3xl mb-1 md:mb-3">Dress Code</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">
            Trang phục tham dự
          </h2>
          <div className="mt-3 md:mt-6 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink fill-wedding-pink" />
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Color palette */}
        <ScrollReveal direction="up" delay={0.1} className="mb-6 md:mb-10">
          <div className="card-wedding p-4 md:p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4 md:mb-6 justify-center">
              <Palette className="w-5 h-5 md:w-6 md:h-6 text-wedding-gold" />
              <h3 className="text-base md:text-xl font-serif text-foreground font-semibold">
                Tông màu chủ đạo
              </h3>
            </div>

            <p className="text-center text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
              Quý khách vui lòng mặc trang phục tone màu nhạt, thanh lịch để cùng tạo nên một không gian ấm áp.
            </p>

            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
              {dressColors.map((item) => (
                <div key={item.label} className="text-center">
                  <div
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-wedding-gold shadow-md mx-auto"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs md:text-sm text-muted-foreground mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Suggestions */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-3xl mx-auto">
            {/* Nam */}
            <div className="card-wedding p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-full bg-wedding-pink flex items-center justify-center">
                <Shirt className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <h4 className="text-sm md:text-lg font-serif text-foreground font-semibold mb-1 md:mb-2">Nam</h4>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1 text-left inline-block">
                <li>✦ Áo sơ mi / Veston tone pastel</li>
                <li>✦ Quần tây âu</li>
                <li>✦ Tránh áo thun, quần đùi</li>
              </ul>
            </div>

            {/* Nữ */}
            <div className="card-wedding p-4 md:p-6 text-center">
              <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-full bg-wedding-gold-light flex items-center justify-center">
                <Heart className="w-5 h-5 md:w-7 md:h-7 text-wedding-gold" />
              </div>
              <h4 className="text-sm md:text-lg font-serif text-foreground font-semibold mb-1 md:mb-2">Nữ</h4>
              <ul className="text-xs md:text-sm text-muted-foreground space-y-1 text-left inline-block">
                <li>✦ Váy dài tone nhạt / pastel</li>
                <li>✦ Áo dài truyền thống</li>
                <li>✦ Tránh trắng tinh (màu cô dâu)</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Note */}
        <ScrollReveal direction="up" delay={0.4} className="mt-6 md:mt-10 text-center">
          <p className="text-foreground/80 text-xs md:text-base italic">
            Sự hiện diện của quý khách là niềm vinh hạnh lớn nhất cho chúng tôi. ❤️
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DressCode;

