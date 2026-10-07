import React, { useState } from 'react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, Sparkles, Quote, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

// Chỉ lấy ảnh duy nhất trong thư mục src/cauchuyentinhyeu
const storyImagesGlob = import.meta.glob<{ default: string }>(
  '../cauchuyentinhyeu/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP,jfif,JFIF}',
  { eager: true }
);

const storyImages: string[] = Object.values(storyImagesGlob).map((mod) => mod.default);

const LoveStory = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const paragraphs = [
    'Chúng mình gặp nhau khi cùng làm việc ở hai quán cơm đối diện nhau. Em làm Cơm Niêu, anh làm Cơm Tấm. Một lần em sang đổi tiền, rồi từ những tin nhắn đầu tiên, chúng mình dần bước vào cuộc đời nhau.',
    'Những ngày ấy, vì cùng tan ca muộn, chúng mình thường tranh thủ những buổi đi chơi đến 3–4 giờ sáng. Rồi anh phải trở về quê làm việc. Ngày chia xa, chúng mình đã khóc rất nhiều. Anh từng muốn dừng lại vì sợ yêu xa khiến em thiệt thòi, nhưng em đã không đồng ý. Chúng mình quyết định cùng nhau cố gắng.',
    'Yêu xa có những ngày nhớ nhau, có giận hờn, cãi vã và cả những lúc tưởng chừng muốn buông tay. Nhưng sau tất cả, chúng mình vẫn chọn quay về, chọn tha thứ và chọn ở lại bên nhau. Anh vẫn tranh thủ lên thăm em, còn chúng mình cứ thế cùng nhau đi qua những tháng ngày xa cách.',
    'Và thật may mắn, sau tất cả, chúng mình đã đi đến ngày hôm nay.',
    'Từ một lần sang đổi tiền, từ hai quán cơm đối diện nhau, chúng mình đã trở thành vợ – chồng và cùng nhau bước vào một hành trình mới — về chung một mái nhà. 🤍',
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + storyImages.length) % storyImages.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % storyImages.length);
    }
  };

  // Các góc nghiêng nhẹ cho hiệu ứng ảnh kỷ niệm Polaroid
  const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];

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
          <ScrollReveal direction="up" className="mt-14 md:mt-20">
            <div className="text-center mb-8">
              <p className="font-script text-wedding-pink text-2xl md:text-3xl">Góc Kỷ Niệm</p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mt-1">
                Những Khoảnh Khắc Của Chúng Mình 🤍
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-muted-foreground mt-1">
                Từng ngày đi qua, từng kỷ niệm lưu giữ
              </p>
            </div>

            {/* Lưới ảnh phong cách Polaroid kỷ niệm cân đối & căn giữa */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-4xl mx-auto">
              {storyImages.map((imgSrc, idx) => {
                const rot = rotations[idx % rotations.length];
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`w-[calc(50%-10px)] sm:w-[calc(33.333%-18px)] md:w-[calc(25%-20px)] min-w-[150px] max-w-[215px] cursor-pointer group relative bg-white p-2.5 sm:p-3 rounded-xl shadow-lg border border-wedding-gold/30 hover:shadow-2xl hover:scale-105 hover:rotate-0 transition-all duration-300 ${rot}`}
                  >
                    {/* Băng keo dán giấy washi tape giả lập */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-wedding-gold/25 backdrop-blur-sm -rotate-2 rounded-sm shadow-sm pointer-events-none" />

                    <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
                      <img
                        src={imgSrc}
                        alt={`Ảnh kỷ niệm ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute inset-2.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/25 rounded-lg pointer-events-none">
                      <span className="p-2 rounded-full bg-white/95 shadow text-xs">
                        <ZoomIn className="w-4 h-4 text-wedding-gold-dark" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox xem ảnh to với phím chuyển ảnh */}
      {selectedPhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Nút đóng */}
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
            title="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nút lùi */}
          {storyImages.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 md:left-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              title="Ảnh trước"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Nút tiến */}
          {storyImages.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 md:right-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
              title="Ảnh sau"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Khung ảnh to */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={storyImages[selectedPhotoIndex]}
              alt={`Ảnh kỷ niệm ${selectedPhotoIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
            />
            <p className="text-white/80 font-serif text-sm mt-3">
              {selectedPhotoIndex + 1} / {storyImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default LoveStory;
