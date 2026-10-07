import React, { useState } from 'react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, Sparkles, Quote, X, ZoomIn } from 'lucide-react';

// Chỉ lấy ảnh duy nhất trong thư mục src/cauchuyentinhyeu
const storyImagesGlob = import.meta.glob<{ default: string }>(
  '/src/cauchuyentinhyeu/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true }
);

const storyImages: string[] = Object.values(storyImagesGlob).map((mod) => mod.default);

const LoveStory = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const paragraphs = [
    'Chúng mình gặp nhau khi cùng làm việc ở hai quán cơm đối diện nhau. Em làm Cơm Niêu, anh làm Cơm Tấm. Một lần em sang đổi tiền, rồi từ những tin nhắn đầu tiên, chúng mình dần bước vào cuộc đời nhau.',
    'Những ngày ấy, vì cùng tan ca muộn, chúng mình thường tranh thủ những buổi đi chơi đến 3–4 giờ sáng. Rồi anh phải trở về quê làm việc. Ngày chia xa, chúng mình đã khóc rất nhiều. Anh từng muốn dừng lại vì sợ yêu xa khiến em thiệt thòi, nhưng em đã không đồng ý. Chúng mình quyết định cùng nhau cố gắng.',
    'Yêu xa có những ngày nhớ nhau, có giận hờn, cãi vã và cả những lúc tưởng chừng muốn buông tay. Nhưng sau tất cả, chúng mình vẫn chọn quay về, chọn tha thứ và chọn ở lại bên nhau. Anh vẫn tranh thủ lên thăm em, còn chúng mình cứ thế cùng nhau đi qua những tháng ngày xa cách.',
    'Và thật may mắn, sau tất cả, chúng mình đã đi đến ngày hôm nay.',
    'Từ một lần sang đổi tiền, từ hai quán cơm đối diện nhau, chúng mình đã trở thành vợ – chồng và cùng nhau bước vào một hành trình mới — về chung một mái nhà. 🤍',
  ];

  return (
    <section id="love-story" className="py-16 md:py-24 px-4 bg-gradient-soft relative overflow-hidden">
      {/* Nền hoa văn trang nhã */}
      <div className="absolute inset-0 bg-pattern-floral opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Tiêu đề phần Câu Chuyện Tình Yêu */}
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-wedding-gold/15 border border-wedding-gold/30 text-wedding-gold-dark text-xs md:text-sm font-medium tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold" />
            <span>Chuyện Tình Yêu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-foreground font-bold tracking-tight">
            TỪ HAI QUÁN CƠM ĐẾN MỘT MÁI NHÀ
          </h2>

          <div className="section-divider mt-4">
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
          </div>
        </ScrollReveal>

        {/* Khung nội dung câu chuyện tình yêu */}
        <ScrollReveal direction="scale" className="relative">
          <div className="bg-card/95 backdrop-blur-md border-2 border-wedding-gold/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl shadow-wedding-rose/10 relative">
            {/* Họa tiết 4 góc cổ điển sang trọng */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-wedding-gold" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-wedding-gold" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-wedding-gold" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-wedding-gold" />

            <div className="flex justify-center mb-6 text-wedding-gold">
              <Quote className="w-8 h-8 md:w-10 md:h-10 opacity-70 rotate-180" />
            </div>

            {/* Đoạn văn câu chuyện */}
            <div className="space-y-5 text-center text-foreground/90 font-serif leading-relaxed text-base sm:text-lg md:text-xl">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    idx === paragraphs.length - 1
                      ? 'font-medium text-wedding-pink-dark text-lg sm:text-xl md:text-2xl pt-2'
                      : idx === paragraphs.length - 2
                      ? 'font-semibold text-foreground pt-1'
                      : 'italic'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Chữ ký Đỗ Quân & Mai Linh */}
            <div className="mt-8 pt-6 border-t border-border/50 text-center">
              <p className="font-script text-3xl sm:text-4xl text-wedding-gold-dark">
                Đỗ Quân & Mai Linh
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Hiển thị ảnh kỷ niệm lấy từ thư mục src/cauchuyentinhyeu */}
        {storyImages.length > 0 && (
          <ScrollReveal direction="up" className="mt-12 md:mt-16">
            <div className="text-center mb-6">
              <p className="font-serif italic text-sm md:text-base text-muted-foreground">
                Những khoảnh khắc kỷ niệm của chúng mình 🤍
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {storyImages.map((imgSrc, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(imgSrc)}
                  className="cursor-pointer group relative bg-white p-2 sm:p-2.5 rounded-xl shadow-md border border-wedding-gold/25 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                    <img
                      src={imgSrc}
                      alt={`Kỷ niệm ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-lg pointer-events-none">
                    <span className="p-1.5 rounded-full bg-white/90 shadow text-xs">
                      <ZoomIn className="w-4 h-4 text-wedding-gold-dark" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox xem ảnh to */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedImage}
            alt="Ảnh kỷ niệm"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default LoveStory;
