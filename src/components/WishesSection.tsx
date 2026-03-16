import { ScrollReveal, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart, MessageCircleHeart, Copy, CreditCard } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';


const wishes = [
  {
    name: "Nguyễn Văn An",
    message: "Chúc hai bạn trăm năm hạnh phúc!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Trần Thị Bình",
    message: "Hạnh phúc mãi bên nhau nhé!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Lê Minh Châu",
    message: "Chúc hai bạn luôn yêu thương nhau!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Phạm Thị Dung",
    message: "Tình yêu bền vững như kim cương!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
];

type BankAccount = {
  name: string;
  bank: string;
  bankCode: string;
  accountNumber: string;
  label: string;
};

// Bank account info (co the them nhieu tai khoan neu can)
const bankAccounts: BankAccount[] = [
  {
    name: 'DO THI DUONG',
    bank: 'MB Bank',
    bankCode: 'mb',
    accountNumber: '0399159618',
    label: 'Cô dâu',
  },
];

const WishesSection = () => {
  const { toast } = useToast();
  

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Đã sao chép!",
        description: "Số tài khoản đã được sao chép",
      });
    } catch (err) {
      toast({
        title: "Không thể sao chép",
        description: "Vui lòng sao chép thủ công",
        variant: "destructive",
      });
    }
  };

  const copyTransferInfo = async (account: BankAccount) => {
    const transferInfo = [
      `Ngân hàng: ${account.bank}`,
      `Chủ tài khoản: ${account.name}`,
      `Số tài khoản: ${account.accountNumber}`,
      'Nội dung: Mừng cưới Minh Đăng - Do Duong',
    ].join('\n');

    await copyToClipboard(transferInfo);
  };

  const handleOpenBankApp = (account: BankAccount) => {
    const transferNote = encodeURIComponent('Mung cuoi Minh Dang - Do Duong');
    const accountName = encodeURIComponent(account.name);
    const qrUrl = `https://img.vietqr.io/image/${account.bankCode}-${account.accountNumber}-compact2.png?addInfo=${transferNote}&accountName=${accountName}`;

    window.open(qrUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal direction="up" className="text-center mb-6 md:mb-12">
          <p className="text-wedding-pink font-script text-lg md:text-3xl mb-1 md:mb-3">Best Wishes</p>
          <h2 className="text-2xl md:text-5xl font-serif text-foreground font-semibold">
            Lời Chúc & Mừng Cưới
          </h2>
          <div className="mt-3 md:mt-6 flex items-center justify-center gap-2 md:gap-4">
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
            <MessageCircleHeart className="w-4 h-4 md:w-5 md:h-5 text-wedding-pink" />
            <div className="h-px w-10 md:w-24 bg-wedding-gold" />
          </div>
        </ScrollReveal>

        {/* Wishes Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-6">
          {wishes.map((wish, index) => (
            <ScrollReveal key={index} direction="up" delay={getStaggerDelay(index, 0.08)}>
              <div className="card-wedding p-2.5 md:p-6 flex flex-col md:flex-row gap-2 md:gap-4 items-start hover:shadow-lg transition-shadow duration-500">
                <img src={wish.avatar} alt={wish.name} className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-wedding-pink/30 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-xs md:text-base mb-0.5 md:mb-1 truncate">{wish.name}</h4>
                  <p className="text-muted-foreground text-[10px] md:text-sm leading-tight line-clamp-2">{wish.message}</p>
                </div>
                <Heart className="hidden md:block w-4 h-4 text-wedding-pink fill-wedding-pink flex-shrink-0 mt-1" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bank transfer info - single account */}
        <ScrollReveal direction="up" delay={0.5} className="mt-6 md:mt-12">
          <div className="card-wedding text-center p-4 md:p-8 max-w-lg mx-auto">
            <h3 className="text-base md:text-xl font-serif text-foreground font-semibold mb-2 md:mb-4">
              Mừng Cưới
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-6 text-xs md:text-sm">
              Bấm vào tài khoản để mở mã QR chuyển khoản (dùng được với mọi app ngân hàng):
            </p>

            <div className="space-y-3">
              {bankAccounts.map((account) => (
                <div key={`${account.bank}-${account.accountNumber}`} className="rounded-lg md:rounded-xl bg-muted p-3 md:p-5 text-center">
                  <button
                    onClick={() => handleOpenBankApp(account)}
                    className="w-full hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center justify-center gap-1.5 mb-2">
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-wedding-gold" />
                      <p className="text-xs md:text-sm text-muted-foreground">{account.label}</p>
                    </div>
                    <p className="font-semibold text-foreground text-sm md:text-lg">{account.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{account.bank}</p>
                    <p className="font-medium text-wedding-pink-dark text-sm md:text-lg mt-1">{account.accountNumber}</p>
                  </button>

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    <button
                      onClick={() => copyTransferInfo(account)}
                      className="w-full p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-2 text-sm text-wedding-pink-dark"
                    >
                      <Copy className="w-4 h-4" />
                      Sao chép đầy đủ thông tin
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

    </section>
  );
};

export default WishesSection;
