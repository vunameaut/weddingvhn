import { useState } from 'react';
import { ScrollReveal, getStaggerDelay } from '@/hooks/useScrollAnimation';
import { Heart, MessageCircleHeart, Copy, QrCode, ExternalLink } from 'lucide-react';
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
  transferNote: string;
};

type BankApp = {
  label: string;
  appCode: string;
};

const bankAccounts: BankAccount[] = [
  {
    name: 'DO THI DUONG',
    bank: 'MB Bank',
    bankCode: '970422',
    accountNumber: '0399159618',
    label: 'Cô dâu',
    transferNote: 'Mừng cưới Minh Đăng - Đỗ Dương',
  },
];

const bankApps: BankApp[] = [
  { label: 'MB Bank', appCode: 'mb' },
  { label: 'Vietcombank', appCode: 'vcb' },
  { label: 'Techcombank', appCode: 'tcb' },
  { label: 'BIDV', appCode: 'bidv' },
  { label: 'VietinBank', appCode: 'icb' },
  { label: 'VPBank', appCode: 'vpb' },
  { label: 'ACB', appCode: 'acb' },
  { label: 'TPBank', appCode: 'tpb' },
];

const getVietQRUrl = (account: BankAccount) => {
  const note = encodeURIComponent(account.transferNote);
  const name = encodeURIComponent(account.name);
  return `https://img.vietqr.io/image/${account.bankCode}-${account.accountNumber}-compact2.jpg?addInfo=${note}&accountName=${name}`;
};

const WishesSection = () => {
  const { toast } = useToast();
  const [selectedBankApp, setSelectedBankApp] = useState<string>('mb');
  const [showQR, setShowQR] = useState<Record<string, boolean>>({});

  const toggleQR = (key: string) => {
    setShowQR(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyTransferInfo = async (account: BankAccount) => {
    const text = [
      `Ngân hàng: ${account.bank}`,
      `Chủ tài khoản: ${account.name}`,
      `Số tài khoản: ${account.accountNumber}`,
      `Nội dung: ${account.transferNote}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(text);
      toast({ title: "Đã sao chép!", description: "Thông tin chuyển khoản đã được sao chép" });
    } catch {
      toast({ title: "Không thể sao chép", description: "Vui lòng sao chép thủ công", variant: "destructive" });
    }
  };

  const openBankDeepLink = (account: BankAccount, appCode: string) => {
    const note = encodeURIComponent(account.transferNote);
    const name = encodeURIComponent(account.name);
    const beneficiary = `${account.accountNumber}@${account.bankCode}`;
    const url = `https://dl.vietqr.io/pay?app=${appCode}&ba=${beneficiary}&bn=${name}&tn=${note}`;
    window.open(url, '_blank');
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
                <img
                  src={wish.avatar}
                  alt={wish.name}
                  className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-wedding-pink/30 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-xs md:text-base mb-0.5 md:mb-1 truncate">{wish.name}</h4>
                  <p className="text-muted-foreground text-[10px] md:text-sm leading-tight line-clamp-2">{wish.message}</p>
                </div>
                <Heart className="hidden md:block w-4 h-4 text-wedding-pink fill-wedding-pink flex-shrink-0 mt-1" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bank Transfer */}
        <ScrollReveal direction="up" delay={0.5} className="mt-6 md:mt-12">
          <div className="card-wedding text-center p-4 md:p-8 max-w-lg mx-auto">
            <h3 className="text-base md:text-xl font-serif text-foreground font-semibold mb-2 md:mb-3">
              Mừng Cưới
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-6 text-xs md:text-sm">
              Chọn app ngân hàng bạn dùng, bấm <strong>Mở app</strong> để chuyển khoản,
              hoặc <strong>Quét QR</strong> trong mục chuyển khoản của app.
            </p>

            {/* Dropdown chọn app — dùng chung cho tất cả tài khoản */}
            <div className="mb-4 text-left">
              <label className="block text-xs md:text-sm text-muted-foreground mb-1.5">
                App ngân hàng của bạn
              </label>
              <select
                value={selectedBankApp}
                onChange={(e) => setSelectedBankApp(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-pink/40"
              >
                {bankApps.map((app) => (
                  <option key={app.appCode} value={app.appCode}>
                    {app.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {bankAccounts.map((account) => {
                const key = `${account.bank}-${account.accountNumber}`;
                const isQRVisible = showQR[key];

                return (
                  <div key={key} className="rounded-xl bg-muted p-4 md:p-5 space-y-3">

                    {/* Account info */}
                    <div className="text-center">
                      <p className="font-semibold text-foreground text-sm md:text-lg">{account.name}</p>
                      <p className="text-xs md:text-sm text-muted-foreground">{account.bank} · {account.label}</p>
                      <p className="font-medium text-wedding-pink-dark text-sm md:text-lg mt-1 tracking-widest">
                        {account.accountNumber}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted-foreground mt-1 italic">
                        Nội dung: {account.transferNote}
                      </p>
                    </div>

                    {/* QR toggle */}
                    <button
                      onClick={() => toggleQR(key)}
                      className="w-full p-2.5 rounded-lg bg-wedding-gold/15 hover:bg-wedding-gold/25 transition-colors inline-flex items-center justify-center gap-2 text-sm font-medium text-wedding-gold-dark"
                    >
                      <QrCode className="w-4 h-4" />
                      {isQRVisible ? 'Ẩn mã QR' : 'Hiện mã QR để quét'}
                    </button>

                    {/* QR Image */}
                    {isQRVisible && (
                      <div className="flex flex-col items-center gap-2 pt-1">
                        <img
                          src={getVietQRUrl(account)}
                          alt={`QR chuyển khoản ${account.name}`}
                          className="w-52 h-52 md:w-64 md:h-64 rounded-xl border border-border object-cover"
                          loading="lazy"
                        />
                        <p className="text-[10px] text-muted-foreground">
                          Mở app → Chuyển khoản → Quét QR này
                        </p>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => copyTransferInfo(account)}
                        className="p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-wedding-pink-dark"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Sao chép
                      </button>

                      <button
                        onClick={() => openBankDeepLink(account, selectedBankApp)}
                        className="p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-wedding-pink-dark"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Mở app
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WishesSection;