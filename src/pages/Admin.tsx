import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Copy, Users, MessageCircleHeart, ListChecks, FileSpreadsheet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { encodeRecipientName } from '@/lib/invite';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type RsvpRow = {
  id: number;
  name: string;
  number_of_guests: number;
  wishes: string | null;
  created_at: string;
};

const Admin = () => {
  const { toast } = useToast();
  const [namesInput, setNamesInput] = useState('');

  const { data: rows = [], isLoading } = useQuery({
    queryKey: ['admin-rsvp-stats'],
    queryFn: async () => {
      if (!isSupabaseConfigured || !supabase) {
        return [] as RsvpRow[];
      }

      const { data, error } = await supabase
        .from('rsvp_submissions')
        .select('id, name, number_of_guests, wishes, created_at')
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

    return { totalResponses, totalGuests, totalWishes };
  }, [rows]);

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

    return uniqueNames.map((name) => ({
      name,
      code: encodeRecipientName(name),
      url: `${origin}/${encodeRecipientName(name)}`,
    }));
  }, [namesInput]);

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

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-wedding-pink font-script text-2xl">Wedding Admin</p>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold text-foreground">Thống kê & Link mời</h1>
          </div>
          <Link to="/" className="text-sm text-wedding-pink-dark hover:underline">
            Quay về thiệp cưới
          </Link>
        </header>

        {!isSupabaseConfigured && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
            Chưa cấu hình Supabase. Hãy thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY vào môi trường deploy.
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-wedding p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-wedding-pink/15 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-wedding-pink-dark" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Lượt xác nhận</p>
              <p className="text-2xl font-semibold text-foreground">{stats.totalResponses}</p>
            </div>
          </div>

          <div className="card-wedding p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-wedding-pink/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-wedding-pink-dark" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tổng khách dự kiến</p>
              <p className="text-2xl font-semibold text-foreground">{stats.totalGuests}</p>
            </div>
          </div>

          <div className="card-wedding p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-wedding-pink/15 flex items-center justify-center">
              <MessageCircleHeart className="w-5 h-5 text-wedding-pink-dark" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số lời chúc</p>
              <p className="text-2xl font-semibold text-foreground">{stats.totalWishes}</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card-wedding p-5 md:p-6 space-y-4">
            <h2 className="text-2xl font-serif text-foreground font-semibold">Tạo link mời riêng</h2>
            <p className="text-sm text-muted-foreground">
              Nhập mỗi tên trên một dòng. Hệ thống sẽ tạo link dạng domain/tên-đã-mã-hóa để gửi riêng cho từng người.
            </p>

            <textarea
              value={namesInput}
              onChange={(event) => setNamesInput(event.target.value)}
              rows={9}
              placeholder={'Ví dụ:\nNam\nLinh\nHải'}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-wedding-pink/40"
            />

            <button
              onClick={handleExportLinks}
              className="inline-flex items-center gap-2 rounded-lg bg-wedding-pink/10 hover:bg-wedding-pink/20 px-3 py-2 text-sm text-wedding-pink-dark transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Xuất danh sách link (Excel)
            </button>

            <div className="space-y-2 max-h-72 overflow-auto pr-1">
              {generatedLinks.map((item) => (
                <div key={item.code} className="rounded-lg bg-muted p-3">
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground break-all mt-1">{item.url}</p>
                  <button
                    onClick={() => copyText(item.url, `Đã sao chép link mời của ${item.name}`)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-wedding-pink-dark hover:underline"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Sao chép link
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="card-wedding p-5 md:p-6 space-y-4">
            <h2 className="text-2xl font-serif text-foreground font-semibold">Lời chúc gần đây</h2>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Đang tải dữ liệu...</p>
            ) : (
              <div className="space-y-3 max-h-[28rem] overflow-auto pr-1">
                {rows
                  .filter((row) => row.wishes && row.wishes.trim())
                  .slice(0, 30)
                  .map((row) => (
                    <article key={row.id} className="rounded-lg bg-muted p-3">
                      <p className="font-semibold text-foreground text-sm">{row.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{row.wishes}</p>
                      <p className="text-xs text-muted-foreground/80 mt-2">
                        {new Date(row.created_at).toLocaleString('vi-VN')}
                      </p>
                    </article>
                  ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Admin;
