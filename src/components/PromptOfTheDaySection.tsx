import React, { useMemo, useState } from 'react';
import { PromptItem } from '../data/siteData';
import { RoleIsometricArtwork } from './VisualCardArtwork';
import {
  Sparkles,
  Flame,
  Clock,
  Copy,
  Check,
  ArrowRight,
  Bookmark,
  RefreshCw,
  Calendar,
  Wrench,
  Wand2,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PromptCommunityBenchmarkStrip } from './PromptCommunityBenchmark';

export type DailySelectionMode = 'auto' | 'top_copied' | 'newest';

interface PromptOfTheDaySectionProps {
  prompts: PromptItem[];
  favoritePromptIds: string[];
  comparePromptIds: string[];
  quickCopiedId: string | null;
  onOpenPromptModal: (prompt: PromptItem) => void;
  onQuickCopyPrompt: (prompt: PromptItem) => void;
  onToggleFavoritePrompt: (id: string, e?: React.MouseEvent) => void;
  onToggleComparePrompt: (id: string, e?: React.MouseEvent) => void;
  onOpenImproveModal?: (prompt: PromptItem) => void;
}

interface CandidateEntry {
  prompt: PromptItem;
  reasonLabel: string;
  reasonType: 'top_copied' | 'newest';
}

export const PromptOfTheDaySection: React.FC<PromptOfTheDaySectionProps> = ({
  prompts,
  favoritePromptIds,
  comparePromptIds,
  quickCopiedId,
  onOpenPromptModal,
  onQuickCopyPrompt,
  onToggleFavoritePrompt,
  onToggleComparePrompt,
  onOpenImproveModal,
}) => {
  const [mode, setMode] = useState<DailySelectionMode>('auto');
  const [shuffleOffset, setShuffleOffset] = useState<number>(0);

  // Build deterministic daily index from current date (YYYY-MM-DD)
  const todayInfo = useMemo(() => {
    const now = new Date();
    const dayStr = now.toLocaleDateString('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const seed =
      now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    return { dayStr, seed };
  }, []);

  // Build top copied & newest candidate pools
  const { topCopiedPool, newestPool, autoPool } = useMemo(() => {
    if (prompts.length === 0) {
      return {
        topCopiedPool: [] as CandidateEntry[],
        newestPool: [] as CandidateEntry[],
        autoPool: [] as CandidateEntry[],
      };
    }

    const sortedByCopy = [...prompts].sort((a, b) => b.copyCount - a.copyCount);
    const sortedByDate = [...prompts].sort(
      (a, b) =>
        new Date(b.addedAt || b.updatedAt).getTime() -
        new Date(a.addedAt || a.updatedAt).getTime()
    );

    const topCopied: CandidateEntry[] = sortedByCopy.slice(0, 5).map((p, idx) => ({
      prompt: p,
      reasonLabel:
        idx === 0
          ? 'Quán quân lượt sao chép trong thư viện'
          : `Top ${idx + 1} Prompt được sao chép nhiều nhất`,
      reasonType: 'top_copied',
    }));

    const newest: CandidateEntry[] = sortedByDate.slice(0, 5).map((p, idx) => ({
      prompt: p,
      reasonLabel:
        idx === 0
          ? 'Mẫu câu lệnh mới nhất vừa lên kệ'
          : 'Mẫu câu lệnh mới cập nhật gần đây',
      reasonType: 'newest',
    }));

    // Interleave Top Copied & Newest for automatic daily discovery without duplicates
    const combined: CandidateEntry[] = [];
    const seen = new Set<string>();
    const maxLen = Math.max(topCopied.length, newest.length);
    for (let i = 0; i < maxLen; i++) {
      if (topCopied[i] && !seen.has(topCopied[i].prompt.id)) {
        combined.push(topCopied[i]);
        seen.add(topCopied[i].prompt.id);
      }
      if (newest[i] && !seen.has(newest[i].prompt.id)) {
        combined.push(newest[i]);
        seen.add(newest[i].prompt.id);
      }
    }

    return {
      topCopiedPool: topCopied,
      newestPool: newest,
      autoPool: combined,
    };
  }, [prompts]);

  const activeEntry = useMemo<CandidateEntry | null>(() => {
    if (mode === 'top_copied' && topCopiedPool.length > 0) {
      return topCopiedPool[shuffleOffset % topCopiedPool.length];
    }
    if (mode === 'newest' && newestPool.length > 0) {
      return newestPool[shuffleOffset % newestPool.length];
    }
    if (autoPool.length > 0) {
      const index = (todayInfo.seed + shuffleOffset) % autoPool.length;
      return autoPool[index];
    }
    return null;
  }, [mode, shuffleOffset, topCopiedPool, newestPool, autoPool, todayInfo.seed]);

  if (!activeEntry) return null;

  const { prompt, reasonLabel, reasonType } = activeEntry;
  const isFav = favoritePromptIds.includes(prompt.id);
  const compareIdx = comparePromptIds.indexOf(prompt.id);
  const isCompared = compareIdx !== -1;
  const isCopied = quickCopiedId === prompt.id;

  const formattedAddedDate = new Date(
    prompt.addedAt || prompt.updatedAt
  ).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <section
      aria-label="Prompt của ngày"
      className="relative overflow-hidden rounded-3xl border border-emerald-500/30 dark:border-emerald-500/25 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-6 md:p-8 shadow-sm"
    >
      {/* Top Bar: Header & Mode Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Prompt của ngày
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              {todayInfo.dayStr}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
                reasonType === 'top_copied'
                  ? 'bg-amber-500/15 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                  : 'bg-sky-500/15 text-sky-800 dark:bg-sky-500/20 dark:text-sky-300'
              }`}
            >
              {reasonType === 'top_copied' ? (
                <Flame className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
              )}
              {reasonLabel}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Khám phá nhanh mẫu câu lệnh nổi bật hôm nay
          </h2>
        </div>

        {/* Criteria Filter & Next Suggestion */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1"
            role="group"
            aria-label="Tiêu chí chọn Prompt của ngày"
          >
            <button
              type="button"
              onClick={() => {
                setMode('auto');
                setShuffleOffset(0);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                mode === 'auto'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Đề xuất hôm nay
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('top_copied');
                setShuffleOffset(0);
              }}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                mode === 'top_copied'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Copy cao nhất
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('newest');
                setShuffleOffset(0);
              }}
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                mode === 'newest'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              Mới thêm vào
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShuffleOffset((prev) => prev + 1)}
            title="Khám phá mẫu Prompt nổi bật tiếp theo"
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Đổi gợi ý khác
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${prompt.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
        >
          {/* Left Column: 3D Isometric Visual & Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4">
            <div className="relative">
              <RoleIsometricArtwork
                role={prompt.role}
                className="h-48 w-full rounded-xl"
              />
              <button
                type="button"
                onClick={(e) => onToggleFavoritePrompt(prompt.id, e)}
                aria-label="Lưu vào sổ tay yêu thích"
                className={`absolute top-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-900/75 border-slate-700 text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
              </button>

              <label
                onClick={(e) => e.stopPropagation()}
                className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold shadow-md transition-colors cursor-pointer select-none ${
                  isCompared
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isCompared}
                  onChange={() => onToggleComparePrompt(prompt.id)}
                  className="h-3.5 w-3.5 rounded accent-emerald-500 cursor-pointer"
                />
                <span>
                  {isCompared ? `Đã chọn so sánh #${compareIdx + 1}` : 'So sánh'}
                </span>
              </label>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {prompt.role}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Cấp độ: {prompt.level}
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {(prompt.viewCount || 0).toLocaleString('vi-VN')} lượt xem
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                  {prompt.copyCount.toLocaleString('vi-VN')} copy
                </span>
                <span aria-hidden="true">·</span>
                <span>Thêm ngày {formattedAddedDate}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                {prompt.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {prompt.situation}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Wrench className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Công cụ khuyên dùng:
                </span>
                {prompt.recommendedTools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="pt-1">
                <PromptCommunityBenchmarkStrip
                  prompt={prompt}
                  onOpenCompareTab={() => onOpenPromptModal(prompt)}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Template Preview & Quick Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-5 sm:p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Cấu trúc câu lệnh mẫu ({prompt.variables.length} thông số tùy chỉnh)
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {prompt.variables.slice(0, 3).map((v) => (
                    <span
                      key={v.key}
                      className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-300"
                    >
                      [{v.label}]
                    </span>
                  ))}
                  {prompt.variables.length > 3 && (
                    <span className="text-[11px] font-semibold text-slate-400">
                      +{prompt.variables.length - 3} biến khác
                    </span>
                  )}
                </div>
              </div>

              {/* Prompt Template Box */}
              <div className="rounded-2xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-100 max-h-48 overflow-y-auto">
                {prompt.template}
              </div>

              {/* Sample Output Preview */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Kết quả đầu ra tiêu chuẩn:
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {prompt.sampleOutput}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onOpenPromptModal(prompt)}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                <span>Điền thông số &amp; chạy thử ngay</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                {onOpenImproveModal && (
                  <button
                    type="button"
                    onClick={() => onOpenImproveModal(prompt)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
                    title="Dùng Gemini AI phân tích cấu trúc và gợi ý tối ưu câu lệnh"
                  >
                    <Wand2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Gợi ý cải tiến</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onQuickCopyPrompt(prompt)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer tabular-nums ${
                    isCopied
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-emerald-500'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Đã sao chép ({prompt.copyCount.toLocaleString('vi-VN')})</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Sao chép nhanh ({prompt.copyCount.toLocaleString('vi-VN')})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
