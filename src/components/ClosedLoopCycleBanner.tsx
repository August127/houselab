import React from 'react';
import { CLOSED_LOOP_STAGES } from '../data/aiNewsData';
import {
  Newspaper,
  BookOpen,
  Sparkles,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export type ClosedLoopActivePage =
  | 'home'
  | 'news'
  | 'roadmap'
  | 'articles'
  | 'prompts'
  | 'resources'
  | 'gift'
  | 'profile'
  | 'about'
  | 'admin';

interface ClosedLoopCycleBannerProps {
  activePage: ClosedLoopActivePage;
  onNavigate: (page: ClosedLoopActivePage) => void;
  newsCount: number;
  articlesCount: number;
  promptsCount: number;
  savedCount: number;
  roadmapProgressPct: number;
  variant?: 'compact-strip' | 'home-hub';
}

export const ClosedLoopCycleBanner: React.FC<ClosedLoopCycleBannerProps> = ({
  activePage,
  onNavigate,
  newsCount,
  articlesCount,
  promptsCount,
  savedCount,
  roadmapProgressPct,
  variant = 'home-hub',
}) => {
  const getActiveStepIndex = (): number => {
    if (activePage === 'news') return 0;
    if (activePage === 'articles' || activePage === 'roadmap') return 1;
    if (activePage === 'prompts' || activePage === 'resources') return 2;
    if (activePage === 'profile') return 3;
    return -1;
  };

  const activeIdx = getActiveStepIndex();

  const getStepMetric = (id: 'news' | 'articles' | 'prompts' | 'profile') => {
    switch (id) {
      case 'news':
        return `${newsCount} bản tin & xu hướng mới`;
      case 'articles':
        return `${articlesCount} tình huống · ${roadmapProgressPct}% lộ trình`;
      case 'prompts':
        return `${promptsCount} mẫu Prompt & 6 Agent`;
      case 'profile':
        return `${savedCount} mục đã lưu vào Sổ tay`;
    }
  };

  const getStepIcon = (id: 'news' | 'articles' | 'prompts' | 'profile') => {
    switch (id) {
      case 'news':
        return <Newspaper className="w-4 h-4" />;
      case 'articles':
        return <BookOpen className="w-4 h-4" />;
      case 'prompts':
        return <Sparkles className="w-4 h-4" />;
      case 'profile':
        return <UserCheck className="w-4 h-4" />;
    }
  };

  if (variant === 'compact-strip') {
    return (
      <div className="mb-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-md bg-emerald-600/10 dark:bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Chu trình học tập khép kín
            </span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
              Đi từng bước từ cập nhật xu hướng đến đóng gói quy trình riêng:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {CLOSED_LOOP_STAGES.map((stage, idx) => {
              const isCurrent = activeIdx === idx;
              return (
                <React.Fragment key={stage.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(stage.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-800/70 text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isCurrent
                          ? 'text-emerald-100'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {stage.stepNumber}
                    </span>
                    <span>{stage.shortTitle}</span>
                  </button>
                  {idx < CLOSED_LOOP_STAGES.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-slate-300 dark:text-slate-600 hidden sm:inline shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Chu trình 4 bước làm chủ AI công sở khép kín"
      className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 space-y-5 shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Kiến trúc Học tập & Ứng dụng Khép kín (Closed-Loop Learning)
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            4 Bước biến kiến thức AI mới nhất thành quy trình làm việc mỗi sáng
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Lộ trình 30 ngày:</span>
          <strong className="font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {roadmapProgressPct}% hoàn thành
          </strong>
          <span>·</span>
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="font-bold text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 underline underline-offset-4 cursor-pointer"
          >
            Xem chi tiết 30 ngày
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CLOSED_LOOP_STAGES.map((stage) => (
          <div
            key={stage.id}
            onClick={() => onNavigate(stage.id)}
            className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 hover:border-emerald-500 hover:bg-white dark:hover:bg-slate-800 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600/10 dark:bg-emerald-500/20 px-2.5 py-1 text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                  {getStepIcon(stage.id)}
                  <span>BƯỚC {stage.stepNumber}</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                  {getStepMetric(stage.id)}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {stage.fullTitle}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {stage.subtitle}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-slate-700/70 space-y-2">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                <strong className="text-slate-700 dark:text-slate-200">Kết quả:</strong>{' '}
                {stage.outcomeText}
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span>{stage.ctaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
