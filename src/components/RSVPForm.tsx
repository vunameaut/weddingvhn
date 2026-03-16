import { useState } from 'react';
import { Send, CheckCircle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { isSupabaseConfigured, supabase, type WishItem } from '@/lib/supabase';

interface RSVPFormProps {
  onSubmitSuccess?: (wish: WishItem) => void;
}

const RSVPForm = ({ onSubmitSuccess }: RSVPFormProps) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guestOf: '',
    numberOfGuests: '1',
    wishes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Vui lòng nhập tên của bạn",
        variant: "destructive",
      });
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      toast({
        title: 'Chưa cấu hình Supabase',
        description: 'Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào file .env',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('rsvp_submissions').insert({
        name: formData.name.trim(),
        guest_of: formData.guestOf || null,
        number_of_guests: Number(formData.numberOfGuests),
        wishes: formData.wishes.trim() || null,
      });

      if (error) {
        throw error;
      }

      if (formData.wishes.trim()) {
        onSubmitSuccess?.({
          name: formData.name.trim(),
          message: formData.wishes.trim(),
        });
      }

      setIsSubmitted(true);

      toast({
        title: 'Cảm ơn bạn đã gửi lời chúc! 💕',
        description: 'Chúng tôi rất vui khi nhận được phản hồi từ bạn.',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error('RSVP submit failed:', error);
      toast({
        title: 'Không thể gửi RSVP',
        description: `Vui lòng kiểm tra cấu hình Supabase (${message}).`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-12 md:py-24 px-3 md:px-4 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="card-wedding p-6 md:p-8">
            <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-wedding-gold flex items-center justify-center">
              <CheckCircle className="w-7 h-7 md:w-10 md:h-10 text-wedding-red-dark" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-primary font-bold mb-2 md:mb-4">
              Cảm ơn bạn!
            </h3>
            <p className="text-muted-foreground font-body text-sm md:text-lg mb-4 md:mb-6">
              Chúng tôi đã nhận được lời chúc của bạn. Hẹn gặp bạn tại tiệc cưới!
            </p>
            <div className="flex justify-center gap-2 text-wedding-red">
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current animate-heart-beat" />
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current animate-heart-beat" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-5 h-5 md:w-6 md:h-6 fill-current animate-heart-beat" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-24 px-3 md:px-4 bg-gradient-cream relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <p className="text-wedding-gold font-script text-lg md:text-3xl mb-1 md:mb-2">Xác Nhận Tham Dự</p>
          <h2 className="text-2xl md:text-5xl font-serif text-primary font-bold">RSVP</h2>
          <div className="mt-2 md:mt-4 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-lg md:text-2xl">❧</span>
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
          <p className="mt-2 md:mt-4 text-muted-foreground font-body text-sm md:text-base">
            Vui lòng xác nhận sự tham dự của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-wedding space-y-4 md:space-y-6 p-4 md:p-8">
          {/* Name and Guest of - side by side on mobile */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2 font-body">
                Họ và Tên <span className="text-wedding-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tên của bạn"
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body text-sm md:text-base"
                required
              />
            </div>

            <div>
              <label htmlFor="guestOf" className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2 font-body">
                Bạn của ai?
              </label>
              <select
                id="guestOf"
                name="guestOf"
                value={formData.guestOf}
                onChange={handleChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body text-sm md:text-base"
              >
                <option value="">-- Chọn --</option>
                <option value="groom">Chú Rể</option>
                <option value="bride">Cô Dâu</option>
                <option value="family">Gia đình</option>
              </select>
            </div>
          </div>

          {/* Number of guests */}
          <div>
            <label htmlFor="numberOfGuests" className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2 font-body">
              Số người đi cùng
            </label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body text-sm md:text-base"
            >
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
              <option value="4">4 người</option>
              <option value="5">5+ người</option>
            </select>
          </div>

          {/* Wishes */}
          <div>
            <label htmlFor="wishes" className="block text-xs md:text-sm font-medium text-foreground mb-1 md:mb-2 font-body">
              Lời chúc đến Cô Dâu & Chú Rể
            </label>
            <textarea
              id="wishes"
              name="wishes"
              value={formData.wishes}
              onChange={handleChange}
              placeholder="Gửi lời chúc tốt đẹp nhất..."
              rows={3}
              className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all resize-none font-body text-sm md:text-base"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-wedding flex items-center justify-center gap-2 md:gap-3 disabled:opacity-70 disabled:cursor-not-allowed py-2.5 md:py-3 text-sm md:text-base"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-wedding-red-dark border-t-transparent rounded-full animate-spin" />
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                <span>Gửi Lời Chúc</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RSVPForm;
