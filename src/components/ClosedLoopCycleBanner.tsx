import React, { useState, useMemo } from 'react';
import { CLOSED_LOOP_STAGES } from '../data/aiNewsData';
import {
  PromptItem,
  RoadmapDay,
  OfficeRole,
  INITIAL_ROADMAP,
} from '../data/siteData';
import {
  Newspaper,
  BookOpen,
  Sparkles,
  UserCheck,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Target,
  ChevronDown,
  ChevronUp,
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
  prompts?: PromptItem[];
  roadmap?: RoadmapDay[];
  completedRoadmapDays?: Record<string, boolean>;
  selectedRole?: OfficeRole | 'Tất cả';
  onOpenPromptModal?: (prompt: PromptItem) => void;
  onQuickCopyPrompt?: (prompt: PromptItem) => void;
  quickCopiedId?: string | null;
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
  prompts = [],
  roadmap = INITIAL_ROADMAP,
  completedRoadmapDays = {},
  selectedRole,
  onOpenPromptModal,
  onQuickCopyPrompt,
  quickCopiedId,
}) => {
  const [showPromptDetail, setShowPromptDetail] = useState(false);

  const getActiveStepIndex = (): number => {
    if (activePage === 'news') return 0;
    if (activePage === 'articles' || activePage === 'roadmap') return 1;
    if (activePage === 'prompts' || activePage === 'resources') return 2;
    if (activePage === 'profile') return 3;
    return -1;
  };

  const activeIdx = getActiveStepIndex();

  // Determine current active milestone in the 30-day roadmap
  const currentRoadmapStep = useMemo((): RoadmapDay => {
    const steps = roadmap && roadmap.length > 0 ? roadmap : INITIAL_ROADMAP;
    const firstUnfinished = steps.find((step) => !completedRoadmapDays[step.dayRange]);
    return firstUnfinished || steps[steps.length - 1];
  }, [roadmap, completedRoadmapDays]);

  // Determine 1 matching prompt tailored to current roadmap milestone
  const suggestedPromptToday = useMemo((): PromptItem | null => {
    if (!prompts || prompts.length === 0) return null;

    // 1. Direct linked prompt from roadmap step
    if (currentRoadmapStep?.linkedPromptId) {
      const linked = prompts.find((p) => p.id === currentRoadmapStep.linkedPromptId);
      if (linked) return linked;
    }

    // 2. Match current roadmap skill level and user's selected role
    if (currentRoadmapStep?.level) {
      if (selectedRole && selectedRole !== 'Tất cả') {
        const roleLevelMatch = prompts.find(
          (p) => p.role === selectedRole && p.level === currentRoadmapStep.level
        );
        if (roleLevelMatch) return roleLevelMatch;
      }

      const levelMatch = prompts.find((p) => p.level === currentRoadmapStep.level);
      if (levelMatch) return levelMatch;
    }

    // 3. Match role alone
    if (selectedRole && selectedRole !== 'Tất cả') {
      const roleMatch = prompts.find((p) => p.role === selectedRole);
      if (roleMatch) return roleMatch;
    }

    // 4. Default fallback
    return prompts[0] || null;
  }, [prompts, currentRoadmapStep, selectedRole]);

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

            {/* NÚT GỢI Ý PROMPT HÔM NAY (ĐẶC BIỆT KHI Ở TRANG CÁ NHÂN HOẶC KHI CÓ PROMPT GỢI Ý) */}
            {activePage === 'profile' && suggestedPromptToday && (
              <>
                <span className="hidden md:inline-block h-4 w-px bg-slate-200 dark:bg-slate-700 mx-0.5" />
                <div className="relative inline-flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenPromptModal) {
                        onOpenPromptModal(suggestedPromptToday);
                      } else {
                        setShowPromptDetail((prev) => !prev);
                      }
                    }}
                    className="group inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white px-3 py-1.5 text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    title={`Gợi ý hôm nay theo tiến độ ${currentRoadmapStep?.dayRange}: ${suggestedPromptToday.title}`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                    <span>Gợi ý Prompt hôm nay</span>
                    <span className="rounded-md bg-white/20 px-1.5 py-0.2 text-[10px] font-mono font-medium">
                      {currentRoadmapStep?.dayRange}
                    </span>
                  </button>

                  {/* Toggle small accordion preview on demand */}
                  <button
                    type="button"
                    onClick={() => setShowPromptDetail((prev) => !prev)}
                    className="h-7 w-7 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
                    title={showPromptDetail ? 'Thu gọn chi tiết' : 'Xem nhanh lý do gợi ý'}
                    aria-label="Xem chi tiết gợi ý hôm nay"
                  >
                    {showPromptDetail ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* EXPANDABLE CONTEXTUAL PREVIEW FOR TODAY'S SUGGESTION IN PROFILE BANNER */}
        {activePage === 'profile' && showPromptDetail && suggestedPromptToday && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400">
                  <Target className="w-3.5 h-3.5" />
                  Tiến độ hiện tại: {currentRoadmapStep.dayRange}
                </span>
                <span>·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {currentRoadmapStep.title}
                </span>
                <span>·</span>
                <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.2 text-[10px] font-bold text-slate-600 dark:text-slate-300">
                  Cấp độ {currentRoadmapStep.level}
                </span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white truncate">
                {suggestedPromptToday.title}
                <span className="ml-2 font-normal text-slate-500 dark:text-slate-400">
                  — {suggestedPromptToday.situation}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {onQuickCopyPrompt && (
                <button
                  type="button"
                  onClick={() => onQuickCopyPrompt(suggestedPromptToday)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
                >
                  {quickCopiedId === suggestedPromptToday.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>Đã copy</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
              )}

              {onOpenPromptModal && (
                <button
                  type="button"
                  onClick={() => onOpenPromptModal(suggestedPromptToday)}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Mở điền biến &amp; Chạy thử</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
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
            Kiến trúc Học tập &amp; Ứng dụng Khép kín (Closed-Loop Learning)
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
