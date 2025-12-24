import { useState } from 'react';
import { Send, CheckCircle, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RSVPForm = () => {
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

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Cảm ơn bạn đã gửi lời chúc! 💕",
      description: "Chúng tôi rất vui khi nhận được phản hồi từ bạn.",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-16 md:py-24 px-4 bg-gradient-cream relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
        <div className="max-w-2xl mx-auto relative z-10 text-center">
          <div className="card-wedding">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-wedding-gold flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-wedding-red-dark" />
            </div>
            <h3 className="text-3xl font-serif text-primary font-bold mb-4">
              Cảm ơn bạn!
            </h3>
            <p className="text-muted-foreground font-body text-lg mb-6">
              Chúng tôi đã nhận được lời chúc của bạn. Hẹn gặp bạn tại tiệc cưới!
            </p>
            <div className="flex justify-center gap-2 text-wedding-red">
              <Heart className="w-6 h-6 fill-current animate-heart-beat" />
              <Heart className="w-6 h-6 fill-current animate-heart-beat" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-6 h-6 fill-current animate-heart-beat" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-cream relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-traditional opacity-10" />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="text-wedding-gold font-script text-2xl md:text-3xl mb-2">Xác Nhận Tham Dự</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold">RSVP</h2>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
            <span className="text-wedding-gold text-2xl">❧</span>
            <div className="h-px w-16 md:w-24 bg-wedding-gold" />
          </div>
          <p className="mt-4 text-muted-foreground font-body">
            Vui lòng xác nhận sự tham dự của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card-wedding space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 font-body">
              Họ và Tên <span className="text-wedding-red">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ và tên của bạn"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body"
              required
            />
          </div>

          {/* Guest of */}
          <div>
            <label htmlFor="guestOf" className="block text-sm font-medium text-foreground mb-2 font-body">
              Bạn của ai?
            </label>
            <select
              id="guestOf"
              name="guestOf"
              value={formData.guestOf}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body"
            >
              <option value="">-- Chọn --</option>
              <option value="groom">Bạn của Chú Rể</option>
              <option value="bride">Bạn của Cô Dâu</option>
              <option value="family">Gia đình</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Number of guests */}
          <div>
            <label htmlFor="numberOfGuests" className="block text-sm font-medium text-foreground mb-2 font-body">
              Số người đi cùng
            </label>
            <select
              id="numberOfGuests"
              name="numberOfGuests"
              value={formData.numberOfGuests}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all font-body"
            >
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
              <option value="4">4 người</option>
              <option value="5">5 người trở lên</option>
            </select>
          </div>

          {/* Wishes */}
          <div>
            <label htmlFor="wishes" className="block text-sm font-medium text-foreground mb-2 font-body">
              Lời chúc đến Cô Dâu & Chú Rể
            </label>
            <textarea
              id="wishes"
              name="wishes"
              value={formData.wishes}
              onChange={handleChange}
              placeholder="Gửi lời chúc tốt đẹp nhất đến cặp đôi..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wedding-gold focus:border-transparent transition-all resize-none font-body"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-wedding flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-wedding-red-dark border-t-transparent rounded-full animate-spin" />
                <span>Đang gửi...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
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
