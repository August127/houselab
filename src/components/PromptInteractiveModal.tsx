import React, { useState, useMemo, useRef } from 'react';
import { PromptItem, SkillLevel, INITIAL_PROMPTS } from '../data/siteData';
import { scanSensitiveText, anonymizeSensitiveText } from '../utils/privacyScanner';
import {
  RoleIsometricArtwork,
  AgentIsometricArtwork,
} from './VisualCardArtwork';
import {
  Check,
  Copy,
  ShieldAlert,
  Sparkles,
  X,
  RotateCcw,
  Bookmark,
  StickyNote,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PromptCommunityBenchmarkPanel,
  PromptCommunityBenchmarkStrip,
} from './PromptCommunityBenchmark';

interface PromptInteractiveModalProps {
  prompt: PromptItem | null;
  initialTab?: 'builder' | 'sample' | 'compare';
  allPrompts?: PromptItem[];
  onSelectPrompt?: (nextPrompt: PromptItem) => void;
  onClose: () => void;
  onRecordCopy: (promptId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (promptId: string) => void;
  personalNote?: string;
  onChangePersonalNote?: (promptId: string, note: string) => void;
}

const SKILL_LEVEL_ORDER: Record<SkillLevel, number> = {
  'Cơ bản': 1,
  'Trung cấp': 2,
  'Nâng cao': 3,
};

interface RecommendedPromptResult {
  item: PromptItem;
  score: number;
  matchBadge: string;
  matchDetails: string[];
  isExactRoleAndLevel: boolean;
}

/**
 * Simple, deterministic recommendation algorithm based on:
 * 1. Department / Role (`role`) — primary weight (+50 pts)
 * 2. Skill Level (`level`) — exact match (+35 pts) or adjacent progression step (+18 pts)
 * 3. Shared AI Agent category or recommended AI tools — contextual tie-breaker
 */
function getRecommendedPrompts(
  current: PromptItem,
  pool: PromptItem[],
  limit = 3
): RecommendedPromptResult[] {
  const currentLevelRank = SKILL_LEVEL_ORDER[current.level] ?? 1;

  const scored = pool
    .filter((candidate) => candidate.id !== current.id)
    .map((candidate): RecommendedPromptResult => {
      let score = 0;
      const matchDetails: string[] = [];

      const sameRole = candidate.role === current.role;
      const sameLevel = candidate.level === current.level;
      const candidateLevelRank = SKILL_LEVEL_ORDER[candidate.level] ?? 1;
      const levelDiff = Math.abs(candidateLevelRank - currentLevelRank);

      if (sameRole) {
        score += 50;
        matchDetails.push(`Cùng phòng ban ${candidate.role}`);
      }

      if (sameLevel) {
        score += 35;
        matchDetails.push(`Cùng kỹ năng ${candidate.level}`);
      } else if (levelDiff === 1) {
        score += 18;
        matchDetails.push(
          candidateLevelRank > currentLevelRank
            ? `Bước tiến ${candidate.level}`
            : `Nền tảng ${candidate.level}`
        );
      }

      if (current.agentType && candidate.agentType === current.agentType) {
        score += 12;
      }

      const sharedTools = candidate.recommendedTools.filter((t) =>
        current.recommendedTools.includes(t)
      );
      if (sharedTools.length > 0) {
        score += sharedTools.length * 4;
      }

      // Popularity tie-breaker (0 - 5 pts)
      score += Math.min(candidate.copyCount / 1000, 5);

      let matchBadge = 'Gợi ý liên quan';
      if (sameRole && sameLevel) {
        matchBadge = `Cùng phòng ban & cấp độ (${candidate.role} · ${candidate.level})`;
      } else if (sameRole) {
        matchBadge = `Cùng phòng ban ${candidate.role} · Mức ${candidate.level}`;
      } else if (sameLevel) {
        matchBadge = `Cùng cấp độ ${candidate.level} · ${candidate.role}`;
      }

      return {
        item: candidate,
        score,
        matchBadge,
        matchDetails,
        isExactRoleAndLevel: sameRole && sameLevel,
      };
    });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

export const PromptInteractiveModal: React.FC<PromptInteractiveModalProps> = ({
  prompt,
  initialTab = 'builder',
  allPrompts = INITIAL_PROMPTS,
  onSelectPrompt,
  onClose,
  onRecordCopy,
  isFavorite = false,
  onToggleFavorite,
  personalNote = '',
  onChangePersonalNote,
}) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [copiedRecId, setCopiedRecId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'builder' | 'sample' | 'compare'>(initialTab);
  const modalBodyRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (prompt) {
      const initial: Record<string, string> = {};
      prompt.variables.forEach((v) => {
        initial[v.key] = v.defaultValue;
      });
      setValues(initial);
      setCopied(false);
      setActiveTab(initialTab);
      modalBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [prompt, initialTab]);

  const compiledPrompt = useMemo(() => {
    if (!prompt) return '';
    let result = prompt.template;
    prompt.variables.forEach((v) => {
      const val = values[v.key]?.trim() || `[${v.label}]`;
      result = result.split(`[${v.key}]`).join(val);
    });
    return result;
  }, [prompt, values]);

  const privacyFindings = useMemo(() => {
    return scanSensitiveText(compiledPrompt);
  }, [compiledPrompt]);

  const recommendedPrompts = useMemo(() => {
    if (!prompt) return [];
    return getRecommendedPrompts(prompt, allPrompts, 3);
  }, [prompt, allPrompts]);

  if (!prompt) return null;

  const handleQuickCopyRecommended = (recPrompt: PromptItem, e: React.MouseEvent) => {
    e.stopPropagation();
    let compiled = recPrompt.template;
    recPrompt.variables.forEach((v) => {
      compiled = compiled.split(`[${v.key}]`).join(v.defaultValue);
    });
    navigator.clipboard.writeText(compiled);
    setCopiedRecId(recPrompt.id);
    onRecordCopy(recPrompt.id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('aicongso:prompt-copied', {
          detail: { title: recPrompt.title },
        })
      );
    }
    setTimeout(() => setCopiedRecId(null), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(compiledPrompt);
    setCopied(true);
    onRecordCopy(prompt.id);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('aicongso:prompt-copied', {
          detail: { title: prompt.title },
        })
      );
    }
    setTimeout(() => setCopied(false), 2200);
  };

  const handleAutoAnonymize = () => {
    const nextValues: Record<string, string> = {};
    Object.keys(values).forEach((k) => {
      nextValues[k] = anonymizeSensitiveText(values[k]);
    });
    setValues(nextValues);
  };

  const handleResetDefaults = () => {
    const initial: Record<string, string> = {};
    prompt.variables.forEach((v) => {
      initial[v.key] = v.defaultValue;
    });
    setValues(initial);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">{prompt.role}</span>
              <span aria-hidden="true">·</span>
              <span>{prompt.pillar}</span>
              <span aria-hidden="true">·</span>
              <span>Trình độ: {prompt.level}</span>
              <span aria-hidden="true">·</span>
              <span>Cập nhật {prompt.updatedAt}</span>
            </div>
            <h2 className="mt-1.5 text-xl font-bold text-slate-900 dark:text-white">{prompt.title}</h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => onToggleFavorite(prompt.id)}
                className={`inline-flex h-10 items-center gap-1.5 rounded-xl border px-3.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isFavorite
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                {isFavorite ? 'Đã lưu' : 'Lưu yêu thích'}
              </button>
            )}
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Interactive Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-6 py-3">
          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-200/75 dark:bg-slate-800 p-1">
            <button
              onClick={() => setActiveTab('builder')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'builder'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              1. Điền thông tin & Copy Prompt
            </button>
            <button
              onClick={() => setActiveTab('sample')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'sample'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2. Xem kết quả mẫu thực tế
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'compare'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              3. So sánh Tốc độ & Độ chính xác (Claude · ChatGPT · Gemini)
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Công cụ phù hợp:{' '}
            <strong className="font-semibold text-emerald-700 dark:text-emerald-400">
              {prompt.recommendedTools.join(', ')}
            </strong>
          </div>
        </div>

        {/* Modal Body */}
        <div ref={modalBodyRef} className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'builder' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left Column: Variables Form */}
              <div className="space-y-4 lg:col-span-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Điền tình huống của bạn
                  </h3>
                  <button
                    onClick={handleResetDefaults}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Khôi phục ví dụ mẫu
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Thay đổi các ô bên dưới, câu lệnh bên phải sẽ tự động ghép sẵn cho bạn.
                </p>

                <div className="space-y-3.5">
                  {prompt.variables.map((v) => (
                    <div key={v.key}>
                      <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {v.label}
                      </label>
                      {v.defaultValue.length > 75 ? (
                        <textarea
                          rows={3}
                          value={values[v.key] ?? ''}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
                          }
                          placeholder={v.placeholder}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-hidden"
                        />
                      ) : (
                        <input
                          type="text"
                          value={values[v.key] ?? ''}
                          onChange={(e) =>
                            setValues((prev) => ({ ...prev, [v.key]: e.target.value }))
                          }
                          placeholder={v.placeholder}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white focus:border-emerald-600 focus:outline-hidden"
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Personal Notes Field inside Modal */}
                {onChangePersonalNote && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <label className="mb-1.5 flex items-center justify-between text-xs font-semibold text-amber-900 dark:text-amber-300">
                      <span className="inline-flex items-center gap-1.5">
                        <StickyNote className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                        Ghi chú cá nhân / Biến thể riêng
                      </span>
                      <span className="text-[10px] font-normal text-slate-400">
                        Tự động lưu trên trình duyệt
                      </span>
                    </label>
                    <textarea
                      rows={2}
                      value={personalNote}
                      onChange={(e) => onChangePersonalNote(prompt.id, e.target.value)}
                      placeholder="Lưu ghi chú riêng, ngữ cảnh phòng ban hoặc biến thể câu lệnh cho lần dùng sau..."
                      className="w-full rounded-xl border border-amber-300 dark:border-amber-700/70 bg-amber-50/50 dark:bg-amber-950/20 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:border-emerald-600 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* Right Column: Live Compiled Prompt + Security Check */}
              <div className="flex flex-col justify-between space-y-4 lg:col-span-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Câu lệnh hoàn chỉnh (Sẵn sàng dán vào AI)
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      Đã dùng {prompt.copyCount.toLocaleString('vi-VN')} lần
                    </span>
                  </div>

                  <div className="mt-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-4 text-slate-100">
                    <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed">
                      {compiledPrompt}
                    </pre>
                  </div>
                </div>

                {/* Sensitive Data Detection Box */}
                {privacyFindings.length > 0 ? (
                  <div className="rounded-xl border border-amber-300 dark:border-amber-700/60 bg-amber-50 dark:bg-amber-950/30 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-400" />
                        <div>
                          <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                            Cảnh báo bảo mật: Phát hiện {privacyFindings.length} dữ liệu nhạy cảm!
                          </p>
                          <p className="mt-1 text-xs text-amber-800 dark:text-amber-200">
                            Bạn vừa nhập:{' '}
                            {privacyFindings.map((f) => `${f.type} (${f.match})`).join(', ')}.
                            Không nên dán thông tin định danh thật lên AI công cộng.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleAutoAnonymize}
                        className="rounded-lg bg-amber-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-900 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Ẩn tự động ngay
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3.5 text-xs text-slate-600 dark:text-slate-300">
                    <strong className="font-semibold text-slate-900 dark:text-white">
                      Lưu ý bảo mật dữ liệu:{' '}
                    </strong>
                    {prompt.securityTip}
                  </div>
                )}

                {/* Quick Community Speed & Accuracy Strip inside Builder */}
                <PromptCommunityBenchmarkStrip
                  prompt={prompt}
                  onOpenCompareTab={() => setActiveTab('compare')}
                />

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Mẹo: Bấm bảng Benchmark phía trên để xem chi tiết tốc độ & độ chính xác từng AI.
                  </div>
                  <div className="relative inline-flex items-center">
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, y: 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: -38, scale: 1 }}
                          exit={{ opacity: 0, y: -46, scale: 0.92 }}
                          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                          className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-emerald-900 px-2.5 py-1 text-[11px] font-bold text-emerald-200 shadow-lg"
                        >
                          ✓ Đã lưu vào Clipboard!
                        </motion.span>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="button"
                      onClick={handleCopy}
                      whileTap={{ scale: 0.94 }}
                      animate={
                        copied
                          ? { scale: [1, 1.06, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.28 }}
                      className={`relative overflow-hidden inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm ${
                        copied
                          ? 'bg-emerald-600 shadow-emerald-500/30 shadow-lg'
                          : 'bg-emerald-600 hover:bg-emerald-500'
                      }`}
                    >
                      <AnimatePresence>
                        {copied && (
                          <motion.span
                            key="pulse-ring"
                            initial={{ scale: 0.4, opacity: 0.55 }}
                            animate={{ scale: 2.4, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55, ease: 'easeOut' }}
                            className="pointer-events-none absolute inset-0 rounded-xl bg-white"
                          />
                        )}
                      </AnimatePresence>

                      <AnimatePresence mode="wait" initial={false}>
                        {copied ? (
                          <motion.span
                            key="copied-state"
                            initial={{ opacity: 0, scale: 0.6, rotate: -35 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                            className="inline-flex items-center gap-2"
                          >
                            <Check className="h-4 w-4 stroke-[2.75]" />
                            <span>Đã sao chép vào bộ nhớ tạm!</span>
                          </motion.span>
                        ) : (
                          <motion.span
                            key="default-state"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.15 }}
                            className="inline-flex items-center gap-2"
                          >
                            <Copy className="h-4 w-4" />
                            <span>Sao chép câu lệnh này</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sample' && (
            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Tình huống áp dụng thực tế · Vị trí {prompt.role}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-white">{prompt.situation}</p>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Kết quả mẫu AI trả về khi dùng câu lệnh chuẩn 4 bước:
                </h3>
                <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 font-sans text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {prompt.sampleOutput}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'compare' && (
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  Lời khuyên thực tế từ AI Công Sở:
                </div>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{prompt.bestToolNote}</p>
              </div>

              <PromptCommunityBenchmarkPanel prompt={prompt} />
            </div>
          )}

          {/* ================================================================= */}
          {/* 'CÓ THỂ BẠN QUAN TÂM' — ROLE & SKILL LEVEL RECOMMENDATION ENGINE */}
          {/* ================================================================= */}
          {recommendedPrompts.length > 0 && (
            <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="h-3.5 w-3.5" />
                    Có thể bạn quan tâm · Đề xuất thông minh
                  </div>
                  <h3 className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">
                    Các mẫu Prompt tương đồng theo phòng ban{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {prompt.role}
                    </span>{' '}
                    &amp; kỹ năng{' '}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {prompt.level}
                    </span>
                  </h3>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Bấm chọn thẻ để chuyển nhanh sang câu lệnh đó
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {recommendedPrompts.map(({ item, matchBadge, isExactRoleAndLevel }) => {
                  const isRecCopied = copiedRecId === item.id;
                  return (
                    <article
                      key={`rec-${item.id}`}
                      onClick={() => {
                        if (onSelectPrompt) {
                          onSelectPrompt(item);
                        }
                      }}
                      className={`group cursor-pointer flex flex-col justify-between rounded-2xl border p-3 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        isExactRoleAndLevel
                          ? 'border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-emerald-500/60'
                      }`}
                    >
                      <div>
                        <div className="relative overflow-hidden rounded-xl">
                          {item.agentType ? (
                            <AgentIsometricArtwork
                              agentType={item.agentType}
                              className="h-28 w-full"
                            />
                          ) : (
                            <RoleIsometricArtwork
                              role={item.role}
                              className="h-28 w-full"
                            />
                          )}
                          <span
                            className={`absolute top-2 left-2 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-sm ${
                              isExactRoleAndLevel
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900/85 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {item.agentType && <Layers className="w-2.5 h-2.5" />}
                            {matchBadge}
                          </span>
                        </div>

                        <div className="pt-3 space-y-1">
                          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {item.role} · {item.level}
                            </span>
                            <span className="tabular-nums">
                              {item.copyCount.toLocaleString('vi-VN')} copy
                            </span>
                          </div>

                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                            {item.title}
                          </h4>

                          <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {item.situation}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 group-hover:underline">
                          Mở câu lệnh
                          <ArrowRight className="w-3 h-3" />
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleQuickCopyRecommended(item, e)}
                          className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold transition-colors cursor-pointer ${
                            isRecCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
                          }`}
                        >
                          {isRecCopied ? (
                            <>
                              <Check className="w-2.5 h-2.5" />
                              <span>Đã chép</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-2.5 h-2.5" />
                              <span>Copy nhanh</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
