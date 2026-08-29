import { useEffect, useState } from 'react';
import { ScrollReveal } from '@/hooks/useScrollAnimation';
import { Heart, MessageCircleHeart, Copy, QrCode, ExternalLink, Download, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import OpeningScreen from '@/components/OpeningScreen';
import FloatingParticles from '@/components/FloatingParticles';
import MusicPlayer from '@/components/MusicPlayer';
import CoupleSection from '@/components/CoupleSection';
import EventDetails from '@/components/EventDetails';
import PhotoAlbum from '@/components/PhotoAlbum';
import RSVPForm from '@/components/RSVPForm';
import LoveStory from '@/components/LoveStory';
import VideoSection from '@/components/VideoSection';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import DressCode from '@/components/DressCode';

import Footer from '@/components/Footer';
import { isSupabaseConfigured, supabase, type WishItem } from '@/lib/supabase';
import { decodeRecipientName } from '@/lib/invite';

import heroBg from '@/assets/album1.jpg'; // Dùng album1 làm nền trang đầu

const initialWishes: WishItem[] = [
  {
    name: "Nguyễn Văn An",
    message: "Chúc hai bạn trăm năm hạnh phúc!"
  },
  {
    name: "Trần Thị Bình",
    message: "Hạnh phúc mãi bên nhau nhé!"
  },
  {
    name: "Lê Minh Châu",
    message: "Chúc hai bạn luôn yêu thương nhau!"
  },
  {
    name: "Phạm Thị Dung",
    message: "Tình yêu bền vững như kim cương!"
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
    transferNote: 'Mừng cưới Đỗ Quân - Mai Linh',
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

interface WishesSectionProps {
  wishes: WishItem[];
}

const WishesSection = ({ wishes }: WishesSectionProps) => {
  const { toast } = useToast();
  const [selectedBankApp, setSelectedBankApp] = useState<string>('mb');
  const [showQR, setShowQR] = useState<Record<string, boolean>>({});
  const marqueeWishes = [...wishes, ...wishes];

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
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast({ title: "Đã sao chép!", description: "Thông tin chuyển khoản đã được sao chép" });
      } else {
        // Fallback robust cho HTTP / Mobile
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        
        document.body.appendChild(textArea);
        
        if (navigator.userAgent.match(/ipad|iphone/i)) {
          const range = document.createRange();
          range.selectNodeContents(textArea);
          const selection = window.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(range);
          }
          textArea.setSelectionRange(0, 999999);
        } else {
          textArea.select();
        }

        try {
          const successful = document.execCommand('copy');
          if (successful) {
            toast({ title: "Đã sao chép!", description: "Thông tin chuyển khoản đã được sao chép" });
          } else {
            throw new Error("execCommand returned false");
          }
        } catch (error) {
          console.error("Fallback copy failed", error);
          window.prompt("Trình duyệt chặn copy tự động. Vui lòng copy thông tin dưới đây:", text);
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (error) {
      console.error(error);
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

  const handleSaveQr = async (account: BankAccount) => {
    const qrUrl = getVietQRUrl(account);

    try {
      const response = await fetch(qrUrl);
      if (!response.ok) throw new Error('download failed');

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = `qr-mung-cuoi-${account.accountNumber}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);

      toast({ title: 'Đã lưu QR!', description: 'Mã QR chuyển khoản đã được tải xuống' });
    } catch {
      window.open(qrUrl, '_blank', 'noopener,noreferrer');
      toast({ title: 'Không thể tự động tải', description: 'Đã mở ảnh QR để bạn lưu thủ công' });
    }
  };

  return (
    <section className="py-12 md:py-28 px-3 md:px-4 bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-pattern-floral opacity-20" />

      <div className="max-w-5xl mx-auto relative z-10">
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

        <ScrollReveal direction="up">
          <div className="wish-marquee-shell">
            <div className="wish-marquee-track">
              {marqueeWishes.map((wish, index) => (
                <article key={`${wish.name}-${index}`} className="wish-marquee-item">
                  <h4 className="font-semibold text-foreground text-sm md:text-base">{wish.name}</h4>
                  <p className="text-muted-foreground text-xs md:text-sm mt-1">{wish.message}</p>
                  <Heart className="w-3.5 h-3.5 mt-2 text-wedding-pink fill-wedding-pink/50" />
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.5} className="mt-6 md:mt-12">
          <div className="card-wedding text-center p-4 md:p-8 max-w-lg mx-auto">
            <h3 className="text-base md:text-xl font-serif text-foreground font-semibold mb-2 md:mb-3">
              Mừng Cưới
            </h3>
            <p className="text-muted-foreground mb-4 md:mb-6 text-xs md:text-sm">
              Chọn app ngân hàng bạn dùng, bấm <strong>Mở app</strong> để chuyển khoản,
              hoặc <strong>Quét QR</strong> trong mục chuyển khoản của app.
            </p>

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

                    <button
                      onClick={() => toggleQR(key)}
                      className="w-full p-2.5 rounded-lg bg-wedding-gold/15 hover:bg-wedding-gold/25 transition-colors inline-flex items-center justify-center gap-2 text-sm font-medium text-wedding-gold-dark"
                    >
                      <QrCode className="w-4 h-4" />
                      {isQRVisible ? 'Ẩn mã QR' : 'Hiện mã QR để quét'}
                    </button>

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

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => copyTransferInfo(account)}
                        className="p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-wedding-pink-dark"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        Sao chép
                      </button>

                      <button
                        onClick={() => handleSaveQr(account)}
                        className="p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-wedding-pink-dark"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Lưu QR
                      </button>

                      <button
                        onClick={() => openBankDeepLink(account, selectedBankApp)}
                        className="col-span-2 p-2.5 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 transition-colors inline-flex items-center justify-center gap-1.5 text-xs md:text-sm text-wedding-pink-dark"
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

const Index = () => {
  const { recipientCode } = useParams();
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [wishes, setWishes] = useState<WishItem[]>(initialWishes);
  const recipientName = decodeRecipientName(recipientCode ?? '');
  const invitationLine = recipientName ? `Kính mời ${recipientName}` : 'Trân trọng kính mời';

  useEffect(() => {
    // Ngăn trình duyệt tự động khôi phục vị trí cuộn cũ khi reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Luôn đưa thanh cuộn về trên cùng
    window.scrollTo(0, 0);

    // Ngăn cuộn trang khi đang ở màn hình mở thiệp
    if (!isInvitationOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Đảm bảo lần nữa về trên cùng ngay lúc mở thiệp xong
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isInvitationOpen]);

  useEffect(() => {
    const loadWishes = async () => {
      if (!isSupabaseConfigured || !supabase) {
        return;
      }

      const { data, error } = await supabase
        .from('rsvp_submissions')
        .select('name, wishes')
        .not('wishes', 'is', null)
        .order('created_at', { ascending: false })
        .limit(30);

      if (error || !data) {
        console.error('Load wishes failed:', error);
        return;
      }

      const dbWishes: WishItem[] = data
        .filter((row) => row.wishes && String(row.wishes).trim())
        .map((row) => ({
          name: row.name,
          message: String(row.wishes),
        }));

      if (dbWishes.length > 0) {
        setWishes(dbWishes);
      }
    };

    void loadWishes();
  }, []);

  const handleNewWish = (wish: WishItem) => {
    setWishes((prev) => [wish, ...prev].slice(0, 30));
  };

  return (
    <>
      <main className="relative min-h-screen bg-background">
        <FloatingParticles />
        <MusicPlayer />

        <section className="min-h-screen flex items-center justify-center relative px-4">
          <div className="absolute inset-0">
            <img src={heroBg} alt="Couple" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)' }} />
          
          <div className="text-center relative z-10 pt-20">
            {isInvitationOpen && (
              <>
                <ScrollReveal direction="up">
                  <p className="text-wedding-pink font-script text-xl md:text-2xl mb-4 drop-shadow-md">Trân trọng thông báo</p>
                  <p className="font-elegant text-white text-xl md:text-4xl leading-tight tracking-wide drop-shadow-md">{invitationLine}</p>
                </ScrollReveal>
                <ScrollReveal direction="left" delay={0.2}>
                  <h1 className="font-script text-6xl md:text-8xl leading-none text-white drop-shadow-lg mt-8">Đỗ Quân</h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                  <p className="text-4xl md:text-5xl font-script text-wedding-gold my-3 md:my-4 drop-shadow-md">&</p>
                </ScrollReveal>
                <ScrollReveal direction="right" delay={0.2}>
                  <h1 className="font-script text-6xl md:text-8xl leading-none text-white drop-shadow-lg">Mai Linh</h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.5}>
                  <p className="text-xl text-gray-200 mt-8 italic drop-shadow-md">"Yêu là khi ta muốn cùng nhau đi hết cuộc đời"</p>
                  <p className="text-2xl font-serif text-white mt-4 drop-shadow-md">29 . 03 . 2026</p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.7} className="mt-12 animate-bounce">
                  <ChevronDown className="w-8 h-8 text-white mx-auto drop-shadow-md" />
                  <p className="text-sm text-white drop-shadow-md">Cuộn xuống</p>
                </ScrollReveal>
              </>
            )}
          </div>
        </section>

        <CoupleSection />
        <EventDetails />
        <PhotoAlbum />
        <LoveStory />
        <VideoSection />
        <DressCode />
        <WishesSection wishes={wishes} />
        <RSVPForm onSubmitSuccess={handleNewWish} />
        <Footer />
        
        <ThemeSwitcher />
      </main>

      {!isInvitationOpen && (
        <OpeningScreen onOpen={() => setIsInvitationOpen(true)} />
      )}
    </>
  );
};

export default Index;

