import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Copy, Users, MessageCircleHeart, ListChecks, FileSpreadsheet, Search, CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { encodeRecipientName } from '@/lib/invite';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type RsvpRow = {
  id: number;
  name: string;
  guest_of: string | null;
  number_of_guests: number;
  wishes: string | null;
  created_at: string;
};

const Admin = () => {
  const { toast } = useToast();
  const [namesInput, setNamesInput] = useState('');
  const [inviteSide, setInviteSide] = useState<'groom' | 'bride'>('groom');
  const [activeTab, setActiveTab] = useState<'all' | 'groom' | 'bride'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ['admin-rsvp-stats'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) {
        return [] as RsvpRow[];
      }

      const { data, error } = await supabase
        .from('rsvp_submissions')
        .select('id, name, guest_of, number_of_guests, wishes, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as RsvpRow[];
    },
  });

  const stats = useMemo(() => {
    const totalResponses = rows.length;
    const totalGuests = rows.reduce((sum, row) => sum + (row.number_of_guests || 0), 0);
    const totalWishes = rows.filter((row) => row.wishes && row.wishes.trim()).length;

    const groomRows = rows.filter((row) => row.guest_of === 'groom' || !row.guest_of);
    const groomResponses = groomRows.length;
    const groomGuests = groomRows.reduce((sum, row) => sum + (row.number_of_guests || 0), 0);
    const groomWishes = groomRows.filter((row) => row.wishes && row.wishes.trim()).length;

    const brideRows = rows.filter((row) => row.guest_of === 'bride');
    const brideResponses = brideRows.length;
    const brideGuests = brideRows.reduce((sum, row) => sum + (row.number_of_guests || 0), 0);
    const brideWishes = brideRows.filter((row) => row.wishes && row.wishes.trim()).length;

    return {
      all: { responses: totalResponses, guests: totalGuests, wishes: totalWishes },
      groom: { responses: groomResponses, guests: groomGuests, wishes: groomWishes },
      bride: { responses: brideResponses, guests: brideGuests, wishes: brideWishes },
    };
  }, [rows]);

  const filteredRows = useMemo(() => {
    let result = rows;
    if (activeTab === 'groom') {
      result = result.filter((r) => r.guest_of === 'groom' || !r.guest_of);
    } else if (activeTab === 'bride') {
      result = result.filter((r) => r.guest_of === 'bride');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.wishes && r.wishes.toLowerCase().includes(q))
      );
    }

    return result;
  }, [rows, activeTab, searchQuery]);

  const generatedLinks = useMemo(() => {
    const uniqueNames = Array.from(
      new Set(
        namesInput
            .split('\n')
            .map((name) => name.trim())
            .filter(Boolean),
      ),
    );

    const origin = window.location.origin;

    return uniqueNames.map((name) => {
      const code = encodeRecipientName(name);
      const url = inviteSide === 'bride' 
        ? `${origin}/MaiLinh/${code}` 
        : `${origin}/DoQuan/${code}`;
      return {
        name,
        code,
        url,
      };
    });
  }, [namesInput, inviteSide]);

  const copyText = async (text: string, successMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Đã sao chép!', description: successMessage });
    } catch {
      toast({ title: 'Không thể sao chép', description: 'Vui lòng sao chép thủ công', variant: 'destructive' });
    }
  };

  const handleExportLinks = () => {
    if (generatedLinks.length === 0) {
      toast({
        title: 'Chưa có dữ liệu',
        description: 'Vui lòng nhập danh sách tên để tạo link trước khi xuất.',
        variant: 'destructive',
      });
      return;
    }

    const escapeCsv = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const header = ['Tên người nhận', 'Mã lời mời', 'Link mời'];
    const lines = generatedLinks.map((item) => [item.name, item.code, item.url].map(escapeCsv).join(','));
    const csv = ['\uFEFF' + header.join(','), ...lines].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date();
    const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

    link.href = url;
    link.download = `danh-sach-link-moi-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Đã xuất file',
      description: 'File CSV mở được trực tiếp bằng Excel.',
    });
  };

  const handleExportRsvpList = () => {
    if (filteredRows.length === 0) {
      toast({
        title: 'Không có dữ liệu',
        description: 'Danh sách khách hiện tại đang trống.',
        variant: 'destructive',
      });
      return;
    }

    const escapeCsv = (value: string) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const header = ['Tên khách', 'Bên khách mời', 'Số khách tham dự', 'Lời chúc', 'Thời gian gửi'];
    const lines = filteredRows.map((r) => [
      r.name,
      r.guest_of === 'bride' ? 'Nhà Gái (Cô dâu)' : 'Nhà Trai (Chú rể)',
      r.number_of_guests > 0 ? `${r.number_of_guests} người` : 'Không tham dự',
      r.wishes || '',
      new Date(r.created_at).toLocaleString('vi-VN'),
    ].map(escapeCsv).join(','));

    const csv = ['\uFEFF' + header.join(','), ...lines].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date();
    const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const sideName = activeTab === 'all' ? 'tat-ca' : activeTab === 'groom' ? 'nha-trai' : 'nha-gai';

    link.href = url;
    link.download = `danh-sach-khach-rsvp-${sideName}-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: 'Đã xuất danh sách khách',
      description: 'File CSV mở được trực tiếp bằng Excel.',
    });
  };

  const currentStats = stats[activeTab];

  return (
    <main className="min-h-screen bg-background py-8 md:py-10 px-3 md:px-4">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-wedding-pink font-script text-2xl">Wedding Admin</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold text-foreground">Quản lý Khách & Lời chúc</h1>
          </div>
          <Link to="/" className="text-sm text-wedding-pink-dark hover:underline font-medium">
            Quay về thiệp cưới
          </Link>
        </header>

        {!isSupabaseConfigured && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
            Chưa cấu hình Supabase. Hãy thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào môi trường deploy.
          </div>
        )}

        {/* Tab chuyển đổi Nhà Trai / Nhà Gái / Tất cả */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-wedding-pink text-white shadow-sm ring-2 ring-wedding-pink/30'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            ✨ Tất cả ({stats.all.responses})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'groom'
                ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>🤵</span>
            <span>Nhà Trai - Chú rể ({stats.groom.responses})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'bride'
                ? 'bg-rose-500 text-white shadow-sm ring-2 ring-rose-500/30'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>👰</span>
            <span>Nhà Gái - Cô dâu ({stats.bride.responses})</span>
          </button>
        </div>

        {/* Thống kê Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div className="card-wedding p-4 md:p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-wedding-pink/15 flex items-center justify-center shrink-0">
              <ListChecks className="w-5 h-5 text-wedding-pink-dark" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Lượt xác nhận ({activeTab === 'all' ? 'Tất cả' : activeTab === 'groom' ? 'Nhà Trai' : 'Nhà Gái'})</p>
              <p className="text-2xl font-bold text-foreground">{currentStats.responses}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Nhà Trai: {stats.groom.responses} · Nhà Gái: {stats.bride.responses}
              </p>
            </div>
          </div>

          <div className="card-wedding p-4 md:p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-blue-500/15 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Khách dự kiến ({activeTab === 'all' ? 'Tất cả' : activeTab === 'groom' ? 'Nhà Trai' : 'Nhà Gái'})</p>
              <p className="text-2xl font-bold text-foreground">{currentStats.guests} <span className="text-xs font-normal text-muted-foreground">khách</span></p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Nhà Trai: {stats.groom.guests} · Nhà Gái: {stats.bride.guests}
              </p>
            </div>
          </div>

          <div className="card-wedding p-4 md:p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-rose-500/15 flex items-center justify-center shrink-0">
              <MessageCircleHeart className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-muted-foreground">Số lời chúc ({activeTab === 'all' ? 'Tất cả' : activeTab === 'groom' ? 'Nhà Trai' : 'Nhà Gái'})</p>
              <p className="text-2xl font-bold text-foreground">{currentStats.wishes}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Nhà Trai: {stats.groom.wishes} · Nhà Gái: {stats.bride.wishes}
              </p>
            </div>
          </div>
        </section>

        {/* Nội dung chính: Danh sách khách RSVP & Tạo link mời */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Cột danh sách khách xác nhận tham dự & Lời chúc */}
          <div className="lg:col-span-7 card-wedding p-4 md:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl md:text-2xl font-serif text-foreground font-semibold">
                  Danh sách phản hồi {activeTab === 'all' ? '' : activeTab === 'groom' ? '(Nhà Trai)' : '(Nhà Gái)'}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hiển thị {filteredRows.length} lượt phản hồi
                </p>
              </div>

              <button
                onClick={handleExportRsvpList}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-green-600/10 hover:bg-green-600/20 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-400 transition-colors self-start sm:self-auto"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Xuất Excel danh sách
              </button>
            </div>

            {/* Ô tìm kiếm khách */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm theo tên khách hoặc lời chúc..."
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-wedding-pink/40"
              />
            </div>

            {isLoading ? (
              <p className="text-sm text-muted-foreground py-6 text-center">Đang tải dữ liệu...</p>
            ) : filteredRows.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs md:text-sm">
                Không tìm thấy phản hồi nào {searchQuery ? 'phù hợp với tìm kiếm.' : 'cho tab này.'}
              </div>
            ) : (
              <div className="space-y-3 max-h-[36rem] overflow-auto pr-1">
                {filteredRows.map((row) => {
                  const isBrideSide = row.guest_of === 'bride';
                  const isAttending = row.number_of_guests > 0;

                  return (
                    <article key={row.id} className="rounded-xl border border-border/60 bg-muted/50 p-3.5 md:p-4 space-y-2 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-foreground text-sm md:text-base">{row.name}</span>
                            <span
                              className={`text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                                isBrideSide
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                              }`}
                            >
                              {isBrideSide ? '👰 Nhà Gái' : '🤵 Nhà Trai'}
                            </span>
                          </div>
                        </div>

                        {/* Badge tham dự */}
                        <div>
                          {isAttending ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                              Đi {row.number_of_guests} người
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                              <XCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                              Không đến được
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Lời chúc */}
                      {row.wishes && row.wishes.trim() && (
                        <p className="text-xs md:text-sm text-muted-foreground bg-background/80 p-2.5 rounded-lg border border-border/40 italic">
                          "{row.wishes}"
                        </p>
                      )}

                      <p className="text-[10px] text-muted-foreground/70 text-right">
                        {new Date(row.created_at).toLocaleString('vi-VN')}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cột tạo link mời riêng */}
          <div className="lg:col-span-5 card-wedding p-4 md:p-6 space-y-4">
            <h2 className="text-xl md:text-2xl font-serif text-foreground font-semibold">Tạo link mời riêng</h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Nhập mỗi tên trên một dòng để sinh link mời cá nhân hóa cho từng khách.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-medium text-foreground">Bản thiệp:</span>
              <button
                type="button"
                onClick={() => setInviteSide('groom')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  inviteSide === 'groom'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                🤵 Nhà Trai (Chú rể)
              </button>
              <button
                type="button"
                onClick={() => setInviteSide('bride')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  inviteSide === 'bride'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                👰 Nhà Gái (Cô dâu)
              </button>
            </div>

            <textarea
              value={namesInput}
              onChange={(event) => setNamesInput(event.target.value)}
              rows={7}
              placeholder={'Ví dụ:\nNam\nLinh\nHải'}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-pink/40"
            />

            <button
              onClick={handleExportLinks}
              className="inline-flex items-center gap-2 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 px-3 py-2 text-xs md:text-sm text-wedding-pink-dark transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Xuất link mời (Excel)
            </button>

            <div className="space-y-2 max-h-64 overflow-auto pr-1">
              {generatedLinks.map((item) => (
                <div key={item.code} className="rounded-lg bg-muted p-2.5">
                  <p className="font-medium text-foreground text-xs md:text-sm">{item.name}</p>
                  <p className="text-[11px] text-muted-foreground break-all mt-0.5">{item.url}</p>
                  <button
                    onClick={() => copyText(item.url, `Đã sao chép link mời của ${item.name}`)}
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-wedding-pink-dark hover:underline font-medium"
                  >
                    <Copy className="w-3 h-3" />
                    Sao chép link
                  </button>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </main>
  );
};

export default Admin;
