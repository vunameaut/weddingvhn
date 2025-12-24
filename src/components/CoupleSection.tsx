import { Heart } from 'lucide-react';

const CoupleSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-cream relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 fade-in-up">
          <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-2">Trân trọng kính mời</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold">Cô Dâu & Chú Rể</h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-2xl">❧</span>
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          </div>
        </div>

        {/* Couple */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Groom */}
          <div className="text-center fade-in-up-delay-1">
            <div className="relative mb-6">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-wedding-gold shadow-2xl mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Chú rể"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-wedding-gold border-dashed opacity-50 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
            <h3 className="font-script text-4xl md:text-5xl text-primary mb-2">Văn Minh</h3>
            <p className="text-muted-foreground font-body">Con trai ông <span className="font-semibold">Nguyễn Văn A</span></p>
            <p className="text-muted-foreground font-body">và bà <span className="font-semibold">Trần Thị B</span></p>
          </div>

          {/* Heart connector */}
          <div className="flex flex-col items-center gap-4 fade-in-up-delay-2">
            <div className="hidden md:block h-24 w-px bg-gradient-to-b from-transparent via-wedding-gold to-transparent" />
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-wedding-red flex items-center justify-center shadow-lg animate-heart-beat">
              <Heart className="w-8 h-8 md:w-10 md:h-10 text-wedding-gold fill-wedding-gold" />
            </div>
            <div className="hidden md:block h-24 w-px bg-gradient-to-b from-wedding-gold via-wedding-gold to-transparent" />
          </div>

          {/* Bride */}
          <div className="text-center fade-in-up-delay-3">
            <div className="relative mb-6">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-wedding-gold shadow-2xl mx-auto">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"
                  alt="Cô dâu"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-wedding-gold border-dashed opacity-50 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            </div>
            <h3 className="font-script text-4xl md:text-5xl text-primary mb-2">Thu Hương</h3>
            <p className="text-muted-foreground font-body">Con gái ông <span className="font-semibold">Lê Văn C</span></p>
            <p className="text-muted-foreground font-body">và bà <span className="font-semibold">Phạm Thị D</span></p>
          </div>
        </div>

        {/* Love quote */}
        <div className="mt-12 md:mt-16 text-center fade-in-up">
          <blockquote className="max-w-2xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground italic font-body leading-relaxed">
              "Hạnh phúc không phải là đích đến, mà là hành trình chúng ta cùng nhau đi qua."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
