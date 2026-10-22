import React, { useState } from 'react';
import { ArticleItem, AIToolName } from '../data/siteData';
import { Check, Copy, X, Bookmark, ShieldCheck } from 'lucide-react';
import { RoleIsometricArtwork } from './VisualCardArtwork';

interface ArticleReaderModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (articleId: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  isFavorite = false,
  onToggleFavorite,
}) => {
  const [selectedTool, setSelectedTool] = useState<AIToolName>('Claude');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!article) return null;

  const activeComparison =
    article.toolComparisons.find((t) => t.tool === selectedTool) ||
    article.toolComparisons[0];

  const handleCopyGoodPrompt = () => {
    navigator.clipboard.writeText(article.goodPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{article.pillar}</span>
              <span aria-hidden="true">·</span>
              <span>Trình độ: {article.level}</span>
              <span aria-hidden="true">·</span>
              <span>{article.updatedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTimeMinutes} phút đọc</span>
            </div>
            <h2 className="mt-1.5 text-xl font-bold text-slate-900 dark:text-white md:text-2xl text-balance">
              {article.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => onToggleFavorite(article.id)}
                className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isFavorite
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Đã lưu bài viết' : 'Lưu yêu thích'}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Đóng bài viết"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-6 md:px-8">
          {/* Visual 3D Banner + Real Office Scenario */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5">
            <div className="md:col-span-5 rounded-xl overflow-hidden shadow-md">
              <RoleIsometricArtwork role={article.role} className="h-44 w-full" />
            </div>
            <div className="md:col-span-7 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                01. Bối cảnh công việc thực tế
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
                {article.situationContext}
              </p>
            </div>
          </div>

          {/* 2. So sánh Prompt Dở vs Prompt Tốt */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              02. Trực quan hóa: Câu lệnh chưa chuẩn vs Câu lệnh chuẩn 4 bước
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 p-5">
                <div className="text-xs font-bold text-rose-800 dark:text-rose-300">
                  Cách hỏi thiếu bối cảnh (Không nên dùng)
                </div>
                <p className="mt-2 font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-200">
                  “{article.badPrompt}”
                </p>
                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400">
                  Hệ quả: AI trả lời chung chung, phải tốn thời gian biên tập lại từ đầu.
                </p>
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/25 p-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      Câu lệnh chuẩn 4 bước (Sao chép dùng ngay)
                    </span>
                    <button
                      onClick={handleCopyGoodPrompt}
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedPrompt ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Đã chép
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Copy mẫu này
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-slate-900 dark:text-slate-100">
                    “{article.goodPrompt}”
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Điểm cốt lõi giúp câu lệnh hoạt động chính xác:
              </div>
              <ul className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {article.whyItWorks.map((reason, idx) => (
                  <li
                    key={idx}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 border border-slate-100 dark:border-slate-800"
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 3. Hướng dẫn từng bước */}
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              03. Quy trình 3 bước áp dụng thực tế
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {article.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h4>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Một tình huống, nhiều công cụ */}
          {article.toolComparisons.length > 0 && (
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    04. Đối chiếu kết quả thực tế: Claude · ChatGPT · Gemini
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Chọn từng mô hình AI để xem tốc độ và văn phong phản hồi cho tình huống này.
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                  {article.toolComparisons.map((tc) => (
                    <button
                      key={tc.tool}
                      onClick={() => setSelectedTool(tc.tool)}
                      className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedTool === tc.tool
                          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {tc.tool}
                    </button>
                  ))}
                </div>
              </div>

              {activeComparison && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-3">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Thử nghiệm trên <strong className="text-slate-900 dark:text-white">{activeComparison.tool}</strong> · {article.updatedAt}
                  </div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    Thế mạnh: {activeComparison.strengths}
                  </p>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 font-mono text-xs text-slate-700 dark:text-slate-200">
                    {activeComparison.sampleResponse}
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Khuyến nghị: {activeComparison.verdict}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* 5. Bảo mật & Kiểm chứng */}
          <section className="rounded-2xl border border-emerald-200/70 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              05. Nguyên tắc Bảo mật Dữ liệu Doanh nghiệp
            </h3>
            <ul className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {article.securityChecklist.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
