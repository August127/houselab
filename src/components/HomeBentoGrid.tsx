import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  Layers,
  BookOpen,
  Briefcase,
  Store,
  Mail,
  Zap,
} from 'lucide-react';
import { OfficeRole } from '../data/siteData';

interface HomeBentoGridProps {
  onNavigate: (page: string) => void;
  onSelectRole: (role: OfficeRole | 'Tất cả') => void;
  selectedRole: OfficeRole | 'Tất cả';
  roadmapCompletedCount: number;
  totalRoadmapSteps: number;
  onCopyText?: (text: string, title?: string) => void;
}

export const HomeBentoGrid: React.FC<HomeBentoGridProps> = ({
  onNavigate,
  onSelectRole,
  selectedRole,
  roadmapCompletedCount,
  totalRoadmapSteps,
  onCopyText,
}) => {
  const [bentoCopied, setBentoCopied] = useState(false);
  const [bentoEmail, setBentoEmail] = useState('');
  const [bentoEmailSuccess, setBentoEmailSuccess] = useState(false);
  const [bentoModelTab, setBentoModelTab] = useState<'claude' | 'chatgpt' | 'gemini'>('claude');

  const samplePromptText =
    'Bạn là trợ lý hành chính chuyên nghiệp. Hãy đọc ghi chú thô cuộc họp sau đây và tóm tắt thành 3 phần: (1) Các quyết định quan trọng đã chốt, (2) Bảng phân công công việc (Ai làm | Làm gì | Hạn chót), (3) Các vấn đề còn bỏ ngỏ cần xác nhận lại với Giám đốc.';

  const handleCopySamplePrompt = () => {
    navigator.clipboard.writeText(samplePromptText);
    setBentoCopied(true);
    if (onCopyText) {
      onCopyText(samplePromptText, 'Tóm tắt biên bản họp hành chính');
    }
    setTimeout(() => setBentoCopied(false), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bentoEmail.trim() && bentoEmail.includes('@')) {
      setBentoEmailSuccess(true);
      setTimeout(() => {
        onNavigate('gift');
      }, 1000);
    }
  };

  const roles: OfficeRole[] = [
    'Kế toán',
    'Nhân sự',
    'Sales',
    'Marketing',
    'Hành chính',
    'Trợ lý & Quản lý',
  ];

  return (
    <section className="space-y-4">
      {/* Bento Header Kicker */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            Bố cục Bento Grid 2026 · Trực quan & Thu gọn đa chiều
          </div>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Tất cả những gì bạn cần để ứng dụng AI công sở trong 1 màn hình
          </h2>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          Cập nhật xu hướng & công thức mới nhất
        </div>
      </div>

      {/* 2026 BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
        {/* ========================================================= */}
        {/* BLOCK 1: LỘ TRÌNH 30 NGÀY (KHỐI LỚN NHẤT / HERO BENTO - 8 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-8 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900/90 dark:to-emerald-950/20 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all group">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Khóa học trọng tâm
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                Tiến độ: {roadmapCompletedCount}/{totalRoadmapSteps} chặng
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Lộ trình 30 ngày
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Từ lần trò chuyện đầu tiên đến tự động hóa việc lặp lại. Thiết kế thực dụng 15 phút mỗi ngày dành riêng cho người không chuyên công nghệ.
            </p>

            {/* 4 Roadmap Pillars preview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
              {[
                { step: '01', title: 'Làm quen', desc: 'Tư duy & công cụ' },
                { step: '02', title: 'Viết prompt', desc: 'Chuẩn 4 bước' },
                { step: '03', title: 'Việc thực tế', desc: 'Báo cáo & họp' },
                { step: '04', title: 'Chọn công cụ', desc: 'Phối hợp đa AI' },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 p-3 space-y-1 transition-all group-hover:border-emerald-500/30"
                >
                  <div className="font-mono text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    {p.step}
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Mỗi chặng đều có câu lệnh điền biến & bài tập 15 phút
            </span>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-xs font-bold text-white transition-all shadow-xs cursor-pointer"
            >
              <span>Xem lộ trình chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 2: 50 PROMPT MIỄN PHÍ (KHỐI VÀNG / CAM NỔI BẬT - 4 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 rounded-3xl border border-amber-300/80 dark:border-amber-700/50 bg-gradient-to-br from-amber-50 via-amber-100/40 to-orange-100/30 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/20 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                Quà tặng email
              </span>
              <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400 fill-amber-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-black text-amber-600 dark:text-amber-400 tracking-tight">
                50
              </span>
              <span className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                Prompt miễn phí
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Nhận qua email trọn bộ câu lệnh thực chiến cho 6 vị trí công sở, kèm mẹo tối ưu mỗi tuần không spam.
            </p>

            <form onSubmit={handleEmailSubmit} className="mt-4 space-y-2">
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={bentoEmail}
                  onChange={(e) => setBentoEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className="w-full rounded-xl border border-amber-200 dark:border-slate-700 bg-white dark:bg-slate-800 pl-8.5 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                {bentoEmailSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đang chuyển đến trang tải...</span>
                  </>
                ) : (
                  <>
                    <span>Nhận 50 Prompt ngay</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-3 border-t border-amber-200/60 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            ✓ Định dạng .TXT tiện sao chép · Tích hợp sẵn biến số
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 3: THƯ VIỆN PROMPT (SAO CHÉP MỘT CHẠM - 5 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <Layers className="w-3.5 h-3.5" />
                Thư viện prompt
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Chuẩn 4 bước
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Sao chép một chạm, dùng được với mọi AI
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Mẫu câu lệnh hành chính được dùng nhiều nhất tuần này:
            </p>

            {/* Micro Prompt Preview Card */}
            <div className="mt-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 p-3.5 space-y-2">
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Trợ lý Hành chính · Biên bản họp 30s</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">Cơ bản</span>
              </div>
              <p className="font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 line-clamp-3 select-all">
                “{samplePromptText}”
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleCopySamplePrompt}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                bentoCopied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              {bentoCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép prompt</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onNavigate('prompts')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Vào thư viện Prompt →</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 4: SO SÁNH CÔNG CỤ (MỘT ĐỀ BÀI - BA AI - 4 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <BookOpen className="w-3.5 h-3.5" />
                So sánh công cụ
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Benchmark 2026
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Một đề bài, ba AI, kết quả đặt cạnh nhau
            </h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Chọn mô hình để xem nét đặc trưng phản hồi:
            </p>

            {/* Model Mini Selector */}
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              {[
                { id: 'claude' as const, label: 'Claude', color: 'text-amber-700 dark:text-amber-400' },
                { id: 'chatgpt' as const, label: 'ChatGPT', color: 'text-emerald-700 dark:text-emerald-400' },
                { id: 'gemini' as const, label: 'Gemini', color: 'text-sky-700 dark:text-sky-400' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setBentoModelTab(m.id)}
                  className={`rounded-lg py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    bentoModelTab === m.id
                      ? 'bg-slate-900 text-white dark:bg-slate-800'
                      : 'bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-2.5 rounded-xl bg-slate-950 p-3 text-slate-200 text-xs font-sans leading-relaxed min-h-[72px]">
              {bentoModelTab === 'claude' && (
                <span className="text-amber-200">
                  <strong>Claude 3.7:</strong> Diễn giải tự nhiên, lịch thiệp, cực tốt cho email từ chối giảm giá hoặc văn bản nội bộ nhạy cảm.
                </span>
              )}
              {bentoModelTab === 'chatgpt' && (
                <span className="text-emerald-200">
                  <strong>ChatGPT-4o:</strong> Tự động xuất bảng Markdown 4 cột chuẩn xác, copy dán thẳng sang Excel không bị nhảy hàng.
                </span>
              )}
              {bentoModelTab === 'gemini' && (
                <span className="text-sky-200">
                  <strong>Gemini 2.0:</strong> Tóm tắt súc tích 3 gạch đầu dòng điều hành, đồng bộ nhanh vào Google Docs/Sheets.
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Định kỳ đo lường tháng 10/2026
            </span>
            <button
              type="button"
              onClick={() => onNavigate('articles')}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Xem bàn cân đầy đủ →
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 5: CỬA HÀNG TEMPLATE & SÁCH (SẮP MỞ - 3 COLS) */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-500/40 transition-all">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                Cửa hàng
              </span>
              <span className="rounded-md bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                Sắp mở
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Template & Sách chọn lọc
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Mẫu Word, Excel, PowerPoint kết hợp AI và sách nên đọc cho dân văn phòng.
            </p>

            <div className="mt-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Bảng tính Excel tự động hóa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Sổ tay Prompt theo ngành</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>Sách AI ứng dụng thực tế</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => onNavigate('resources')}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
            >
              Xem trước danh mục
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLOCK 6: AI THEO VỊ TRÍ (CHỌN VAI TRÒ - 12 COLS FULL WIDTH) */}
        {/* ========================================================= */}
        <div className="lg:col-span-12 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-xs">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <Briefcase className="w-3.5 h-3.5" />
              AI theo vị trí công việc
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Chọn vai trò, nhận công thức riêng
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mỗi vị trí có bài toán đặc thù — bấm chọn phòng ban để lọc ngay bộ câu lệnh tối ưu:
            </p>
          </div>

          {/* Interactive Role Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectRole('Tất cả')}
              className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedRole === 'Tất cả'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Tất cả vị trí
            </button>
            {roles.map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  onSelectRole(role);
                  onNavigate('prompts');
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
