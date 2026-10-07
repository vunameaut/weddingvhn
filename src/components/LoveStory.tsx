import React, { useState } from 'react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, Sparkles, MapPin, Calendar, Clock, Quote, X, ZoomIn, Utensils, Compass, ArrowRight } from 'lucide-react';

import fallbackImg1 from '@/assets/album2.jpg';
import fallbackImg2 from '@/assets/album3.jpg';
import fallbackImg3 from '@/assets/album4.jpg';
import fallbackImg4 from '@/assets/album5.jpg';
import fallbackImg5 from '@/assets/album6.jpg';
import fallbackImg6 from '@/assets/album7.jpg';

// Tự động load tất cả ảnh được bỏ vào thư mục src/cauchuyentinhyeu
const storyImagesGlob = import.meta.glob<{ default: string }>(
  '/src/cauchuyentinhyeu/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP,gif,GIF}',
  { eager: true }
);

const userStoryImages: string[] = Object.values(storyImagesGlob).map((mod) => mod.default);

const defaultStoryImages = [
  fallbackImg1,
  fallbackImg2,
  fallbackImg3,
  fallbackImg4,
  fallbackImg5,
  fallbackImg6,
];

// Nếu user đã bỏ ảnh vào thư mục thì dùng ảnh user, nếu chưa thì dùng fallback đẹp mắt
const activeImages = userStoryImages.length > 0 ? userStoryImages : defaultStoryImages;

interface StoryChapter {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  content: string[];
  quote: string;
  imageIndex: number;
  imageCaption: string;
  tagIcon: 'utensils' | 'distance' | 'heart' | 'home';
}

const chapters: StoryChapter[] = [
  {
    id: 1,
    badge: 'Chương 1 · Duyên Khởi',
    title: 'Từ Hai Quán Cơm Đối Diện',
    subtitle: 'Em làm Cơm Niêu — Anh làm Cơm Tấm',
    content: [
      'Chúng mình gặp nhau khi cùng làm việc ở hai quán cơm đối diện nhau. Em làm Cơm Niêu, anh làm Cơm Tấm.',
      'Một lần em sang đổi tiền, rồi từ những tin nhắn đầu tiên, chúng mình dần bước vào cuộc đời nhau.',
      'Những ngày ấy, vì cùng tan ca muộn, chúng mình thường tranh thủ những buổi đi chơi đến 3–4 giờ sáng.',
    ],
    quote: 'Một lần em sang đổi tiền... rồi bước vào cuộc đời nhau lúc nào chẳng hay.',
    imageIndex: 0,
    imageCaption: 'Hai quán cơm đối diện · Những ngày đầu gặp gỡ',
    tagIcon: 'utensils',
  },
  {
    id: 2,
    badge: 'Chương 2 · Thử Thách',
    title: 'Ngày Chia Xa & Lời Hứa Cùng Cố Gắng',
    subtitle: 'Nước mắt và sự kiên định',
    content: [
      'Rồi anh phải trở về quê làm việc. Ngày chia xa, chúng mình đã khóc rất nhiều.',
      'Anh từng muốn dừng lại vì sợ yêu xa khiến em thiệt thòi, nhưng em đã không đồng ý. Chúng mình quyết định cùng nhau cố gắng.',
    ],
    quote: 'Anh từng sợ em thiệt thòi vì yêu xa, nhưng em chọn nắm chặt tay anh.',
    imageIndex: 1,
    imageCaption: 'Ngày chia xa · Giọt nước mắt và lời hứa không buông tay',
    tagIcon: 'distance',
  },
  {
    id: 3,
    badge: 'Chương 3 · Khoảng Cách',
    title: 'Yêu Xa — Chọn Tha Thứ & Ở Lại',
    subtitle: 'Những chuyến xe và niềm tin',
    content: [
      'Yêu xa có những ngày nhớ nhau, có giận hờn, cãi vã và cả những lúc tưởng chừng muốn buông tay.',
      'Nhưng sau tất cả, chúng mình vẫn chọn quay về, chọn tha thứ và chọn ở lại bên nhau.',
      'Anh vẫn tranh thủ lên thăm em, còn chúng mình cứ thế cùng nhau đi qua những tháng ngày xa cách.',
    ],
    quote: 'Sau tất cả giận hờn, chúng mình vẫn chọn tha thứ và ở lại bên nhau.',
    imageIndex: 2,
    imageCaption: 'Những chuyến xe vội vã · Băng qua khoảng cách để bên nhau',
    tagIcon: 'heart',
  },
  {
    id: 4,
    badge: 'Chương 4 · Bến Đỗ',
    title: 'Về Chung Một Mái Nhà',
    subtitle: 'Hành trình mới trọn vẹn',
    content: [
      'Và thật may mắn, sau tất cả, chúng mình đã đi đến ngày hôm nay.',
      'Từ một lần sang đổi tiền, từ hai quán cơm đối diện nhau, chúng mình đã trở thành vợ – chồng và cùng nhau bước vào một hành trình mới — về chung một mái nhà. 🤍',
    ],
    quote: 'Từ hai quán cơm đối diện... nay chúng mình chính thức về chung một mái nhà 🤍',
    imageIndex: 3,
    imageCaption: 'Hôm nay và mãi mãi · Khởi đầu hành trình mới',
    tagIcon: 'home',
  },
];

const LoveStory = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Lấy ảnh an toàn theo index xoay vòng
  const getImage = (index: number) => {
    return activeImages[index % activeImages.length];
  };

  return (
    <section id="love-story" className="py-16 md:py-28 px-4 bg-gradient-to-b from-background via-wedding-rose/10 to-background relative overflow-hidden">
      {/* Nền hoa văn trang nhã */}
      <div className="absolute inset-0 bg-pattern-floral opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-wedding-rose/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-wedding-gold/15 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header câu chuyện */}
        <ScrollReveal direction="up" className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-wedding-gold/15 border border-wedding-gold/30 text-wedding-gold-dark text-xs md:text-sm font-medium tracking-wide mb-3">
            <Sparkles className="w-3.5 h-3.5 text-wedding-gold animate-spin-slow" />
            <span>Kỷ Niệm Tình Yêu</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-foreground font-bold tracking-tight">
            TỪ HAI QUÁN CƠM ĐẾN MỘT MÁI NHÀ
          </h2>

          <p className="text-wedding-pink-dark font-script text-xl sm:text-2xl md:text-3xl mt-2">
            Hành trình của chúng mình 🤍
          </p>

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-wedding-gold/50" />
            <Heart className="w-5 h-5 text-wedding-pink fill-wedding-pink animate-heart-beat" />
            <span className="h-px w-12 bg-wedding-gold/50" />
          </div>
        </ScrollReveal>

        {/* Khung tâm thư đặc biệt: Bức thư kỷ niệm viết tay */}
        <ScrollReveal direction="scale" className="mb-14 md:mb-20">
          <div className="relative max-w-3xl mx-auto bg-card/90 backdrop-blur-md border-2 border-wedding-gold/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-wedding-rose/10">
            {/* Họa tiết góc thiệp cổ điển */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-wedding-gold" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-wedding-gold" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-wedding-gold" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-wedding-gold" />

            <div className="flex justify-center mb-4 text-wedding-gold">
              <Quote className="w-8 h-8 md:w-10 md:h-10 opacity-70 rotate-180" />
            </div>

            <div className="space-y-4 text-center">
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal">
                "Chúng mình gặp nhau khi cùng làm việc ở hai quán cơm đối diện nhau. Em làm Cơm Niêu, anh làm Cơm Tấm. Một lần em sang đổi tiền, rồi từ những tin nhắn đầu tiên, chúng mình dần bước vào cuộc đời nhau."
              </p>

              <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal">
                "Những ngày ấy, vì cùng tan ca muộn, chúng mình thường tranh thủ những buổi đi chơi đến 3–4 giờ sáng. Rồi anh phải trở về quê làm việc. Ngày chia xa, chúng mình đã khóc rất nhiều. Anh từng muốn dừng lại vì sợ yêu xa khiến em thiệt thòi, nhưng em đã không đồng ý. Chúng mình quyết định cùng nhau cố gắng."
              </p>

              <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed font-normal">
                "Yêu xa có những ngày nhớ nhau, có giận hờn, cãi vã và cả những lúc tưởng chừng muốn buông tay. Nhưng sau tất cả, chúng mình vẫn chọn quay về, chọn tha thứ và chọn ở lại bên nhau. Anh vẫn tranh thủ lên thăm em, còn chúng mình cứ thế cùng nhau đi qua những tháng ngày xa cách."
              </p>

              <div className="pt-2">
                <p className="font-serif font-semibold text-lg sm:text-xl md:text-2xl text-wedding-pink-dark leading-relaxed">
                  "Và thật may mắn, sau tất cả, chúng mình đã đi đến ngày hôm nay."
                </p>
                <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground mt-2 font-medium">
                  "Từ một lần sang đổi tiền, từ hai quán cơm đối diện nhau, chúng mình đã trở thành vợ – chồng và cùng nhau bước vào một hành trình mới — về chung một mái nhà. 🤍"
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-2">
                <span className="font-script text-2xl md:text-3xl text-wedding-gold-dark">
                  Đỗ Quân & Mai Linh
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline chi tiết 4 chương với phong cách Album Kỷ Niệm Polaroid */}
        <div className="space-y-12 md:space-y-20 relative">
          {/* Trục dọc nối các mốc (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-wedding-gold/20 via-wedding-pink/40 to-wedding-gold/20 pointer-events-none" />

          {chapters.map((chap, idx) => {
            const isEven = idx % 2 === 0;
            const photoSrc = getImage(chap.imageIndex);

            return (
              <div
                key={chap.id}
                className={`relative flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-12`}
              >
                {/* Điểm mốc trung tâm ở giữa (Desktop) */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 z-20 w-10 h-10 rounded-full bg-white border-2 border-wedding-gold items-center justify-center shadow-lg">
                  <span className="font-serif font-bold text-xs text-wedding-gold-dark">
                    0{chap.id}
                  </span>
                </div>

                {/* Cột Nội Dung */}
                <div className="w-full md:w-1/2">
                  <ScrollReveal
                    direction={isEven ? 'right' : 'left'}
                    className={`bg-card/95 border border-wedding-rose/30 rounded-2xl p-6 sm:p-7 shadow-lg shadow-wedding-rose/5 relative hover:border-wedding-gold/50 transition-all duration-300 ${
                      isEven ? 'md:mr-4' : 'md:ml-4'
                    }`}
                  >
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-wedding-pink/15 text-wedding-pink-dark">
                        {chap.badge}
                      </span>
                      <span className="text-xs text-muted-foreground font-serif">· 0{chap.id}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mb-1">
                      {chap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-wedding-gold-dark font-medium mb-4">
                      {chap.subtitle}
                    </p>

                    <div className="space-y-2.5 text-sm sm:text-base text-foreground/80 leading-relaxed font-body">
                      {chap.content.map((p, pIdx) => (
                        <p key={pIdx}>{p}</p>
                      ))}
                    </div>

                    {/* Câu trích dẫn nổi bật */}
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-start gap-2 text-wedding-pink-dark italic text-xs sm:text-sm font-serif">
                      <Heart className="w-3.5 h-3.5 fill-wedding-pink text-wedding-pink shrink-0 mt-0.5" />
                      <span>{chap.quote}</span>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Cột Ảnh Kỷ Niệm Polaroid */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <ScrollReveal
                    direction={isEven ? 'left' : 'right'}
                    delay={0.15}
                    className="w-full max-w-sm"
                  >
                    <div
                      onClick={() => setSelectedPhoto(photoSrc)}
                      className={`cursor-pointer group relative bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-wedding-gold/25 transition-transform duration-500 hover:scale-[1.02] ${
                        isEven ? 'rotate-1 hover:rotate-0' : '-rotate-1 hover:rotate-0'
                      }`}
                    >
                      {/* Băng dính Washi Tape trang trí */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-wedding-gold/30 backdrop-blur-sm -rotate-2 rounded-sm shadow-sm pointer-events-none" />

                      {/* Khung ảnh */}
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                        <img
                          src={photoSrc}
                          alt={chap.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="p-2 rounded-full bg-white/90 text-foreground shadow-md">
                            <ZoomIn className="w-5 h-5 text-wedding-gold-dark" />
                          </span>
                        </div>
                      </div>

                      {/* Chú thích ảnh viết tay */}
                      <div className="pt-3 text-center">
                        <p className="font-serif italic text-xs sm:text-sm text-foreground/80">
                          {chap.imageCaption}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Kỷ Niệm nếu có nhiều ảnh từ thư mục hoặc album */}
        {activeImages.length > 4 && (
          <ScrollReveal direction="up" className="mt-16 md:mt-24">
            <div className="text-center mb-8">
              <p className="font-script text-wedding-pink text-xl md:text-2xl">Khoảnh Khắc Đẹp</p>
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Góc Kỷ Niệm Của Chúng Mình
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Từng nụ cười, từng ánh mắt — tất cả đều là những kỷ niệm vô giá
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {activeImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(img)}
                  className="cursor-pointer group relative bg-white p-2 sm:p-2.5 rounded-xl shadow-md border border-wedding-gold/20 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={img}
                      alt={`Kỷ niệm ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="p-1.5 rounded-full bg-white/90 shadow text-xs">
                      <ZoomIn className="w-3.5 h-3.5 text-wedding-gold-dark" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Lời kết ngọt ngào */}
        <ScrollReveal direction="up" className="mt-16 md:mt-20 text-center">
          <div className="inline-block p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-wedding-rose/20 via-wedding-gold/15 to-wedding-rose/20 border border-wedding-gold/30">
            <Heart className="w-8 h-8 text-wedding-pink fill-wedding-pink mx-auto mb-3 animate-heart-beat" />
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-foreground font-medium">
              "Cảm ơn vì đã luôn ở lại, cảm ơn vì đã cùng nhau cố gắng."
            </p>
            <p className="font-script text-2xl sm:text-3xl text-wedding-pink-dark mt-2">
              Và hôm nay, chúng mình về chung một nhà 🤍
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox xem ảnh to khi click */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Kỷ niệm to"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default LoveStory;
