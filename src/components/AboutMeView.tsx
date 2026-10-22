import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  Mail,
  Share2,
} from 'lucide-react';

interface AboutMeViewProps {
  onNavigateToPrompts: () => void;
  onNavigateToRoadmap: () => void;
  onNavigateToGift: () => void;
}

export const AboutMeView: React.FC<AboutMeViewProps> = ({
  onNavigateToPrompts,
  onNavigateToRoadmap,
  onNavigateToGift,
}) => {
  return (
    <div className="space-y-10 max-w-4xl mx-auto py-2">
      {/* Hero Section */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
          <Sparkles className="w-3.5 h-3.5" />
          Về tác giả & Dự án AI Công Sở · Thực chiến bằng tiếng Việt
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Author Avatar with Glow & Badge */}
          <div className="relative shrink-0">
            <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 p-1 shadow-lg shadow-emerald-500/15">
              <div className="h-full w-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden p-2 text-center">
                <span className="font-display font-black text-2xl text-emerald-400">AI</span>
                <span className="text-[11px] font-semibold text-slate-300">Công Sở</span>
                <span className="text-[9px] text-emerald-400 font-mono mt-1">Founder</span>
              </div>
            </div>
            {/* Idea dot badge */}
            <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-orange-500 border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              “Dùng AI để xong việc văn phòng sớm hơn, bằng tiếng Việt”
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Xin chào, tôi là một người làm việc văn phòng tại Việt Nam. AI Công Sở ra đời từ chính những áp lực hàng ngày: báo cáo tuần, biên bản họp dài dòng, hàng chục bảng tính Excel rối rắm và nỗi sợ bị tụt lại trước làn sóng trí tuệ nhân tạo.
            </p>
          </div>
        </div>

        {/* Short Story */}
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 p-5 space-y-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
            Câu chuyện ngắn
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Hầu hết các tài liệu AI trên mạng đều bằng tiếng Anh, viết cho kỹ sư lập trình hoặc mang tính lý thuyết xa vời. Khi áp dụng vào môi trường doanh nghiệp Việt Nam (soạn thảo công văn, từ chối giảm giá khéo léo, xử lý bảng chấm công, biên bản nghiệm thu...), các công thức ấy lập tức gặp trục trặc về văn phong và văn hóa công sở.
          </p>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            AI Công Sở được tạo ra với một mục tiêu duy nhất: <strong>Đóng gói những câu lệnh và quy trình AI thực tế nhất</strong> để bất kỳ nhân viên hành chính, kế toán, nhân sự hay kinh doanh nào cũng có thể tiết kiệm 5 - 10 giờ làm việc mỗi tuần.
          </p>
        </div>
      </div>

      {/* 3 Core Working Principles */}
      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Ba nguyên tắc làm việc bất di bất dịch
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mọi bài viết, câu lệnh và biểu mẫu trên AI Công Sở đều tuân thủ 3 chuẩn mực này:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              1. Xong việc thật trước
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Không học AI hàn lâm, không nhồi nhét thuật ngữ máy học. Chỉ tập trung vào những gì giúp bạn về nhà đúng giờ và giải quyết đầu việc trong 15 phút.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              2. Bảo mật là số 1
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tuyệt đối không đưa số CCCD, tài khoản ngân hàng hay danh sách khách hàng thật lên AI. Luôn có bộ lọc ẩn danh trước khi nhấn gửi.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 shadow-xs">
            <div className="h-10 w-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              3. Tiếng Việt tự nhiên
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Câu lệnh được tinh chỉnh sát văn phong công sở Việt Nam: kính ngữ chuẩn mực, từ chối nhã nhặn, báo cáo súc tích trình Sếp duyệt ngay.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-white to-teal-500/10 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Bắt đầu nâng cấp kỹ năng ngay hôm nay
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Khám phá hơn 20 mẫu câu lệnh chuẩn hoặc nhận cẩm nang 50 prompt hoàn toàn miễn phí.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onNavigateToGift}
            className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 text-xs transition-colors shadow-xs cursor-pointer"
          >
            Nhận 50 Prompt
          </button>
          <button
            type="button"
            onClick={onNavigateToRoadmap}
            className="rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-4 py-2 text-xs transition-colors cursor-pointer"
          >
            Lộ trình 30 ngày
          </button>
        </div>
      </div>
    </div>
  );
};
