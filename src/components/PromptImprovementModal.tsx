import React, { useEffect, useState, useCallback } from 'react';
import { PromptItem } from '../data/siteData';
import {
  Sparkles,
  X,
  Check,
  Copy,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  BookmarkPlus,
  Layers,
  Wand2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface PromptImprovementAnalysis {
  overallScore: number;
  summaryVerdict: string;
  structureAudit: {
    roleClarity: string;
    contextDepth: string;
    taskConstraints: string;
    outputFormat: string;
  };
  strengths: string[];
  improvements: {
    title: string;
    reason: string;
    suggestion: string;
  }[];
  suggestedVariables: string[];
  optimizedPrompt: string;
  proTip: string;
}

interface PromptImprovementModalProps {
  prompt: PromptItem | null;
  onClose: () => void;
  onRecordCopy?: (id: string) => void;
  onSaveToPersonalNote?: (id: string, noteContent: string) => void;
  existingNote?: string;
  onOpenInteractiveBuilder?: (prompt: PromptItem) => void;
}

export const PromptImprovementModal: React.FC<PromptImprovementModalProps> = ({
  prompt,
  onClose,
  onRecordCopy,
  onSaveToPersonalNote,
  existingNote = '',
  onOpenInteractiveBuilder,
}) => {
  const [cache, setCache] = useState<Record<string, PromptImprovementAnalysis>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedOptimized, setCopiedOptimized] = useState<boolean>(false);
  const [savedToNote, setSavedToNote] = useState<boolean>(false);
  const [compareView, setCompareView] = useState<'split' | 'optimized'>('split');

  const analyzePromptWithGemini = useCallback(
    async (targetPrompt: PromptItem, forceRefresh = false) => {
      if (!forceRefresh && cache[targetPrompt.id]) {
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      setCopiedOptimized(false);
      setSavedToNote(false);

      try {
        const response = await fetch('/api/prompts/suggest-improvements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: targetPrompt.title,
            role: targetPrompt.role,
            level: targetPrompt.level,
            situation: targetPrompt.situation,
            template: targetPrompt.template,
            variables: targetPrompt.variables,
            recommendedTools: targetPrompt.recommendedTools,
            agentType: targetPrompt.agentType,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data?.error || 'Không thể kết nối tới dịch vụ phân tích Gemini API.'
          );
        }

        setCache((prev) => ({
          ...prev,
          [targetPrompt.id]: data as PromptImprovementAnalysis,
        }));
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : 'Đã xảy ra lỗi khi phân tích cấu trúc Prompt.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [cache]
  );

  useEffect(() => {
    if (prompt) {
      setCopiedOptimized(false);
      setSavedToNote(false);
      analyzePromptWithGemini(prompt, false);
    }
  }, [prompt, analyzePromptWithGemini]);

  if (!prompt) return null;

  const analysis = cache[prompt.id];

  const handleCopyOptimized = () => {
    if (!analysis?.optimizedPrompt) return;
    navigator.clipboard.writeText(analysis.optimizedPrompt);
    setCopiedOptimized(true);
    if (onRecordCopy) {
      onRecordCopy(prompt.id);
    }
    setTimeout(() => setCopiedOptimized(false), 2200);
  };

  const handleSaveOptimizedToNote = () => {
    if (!analysis?.optimizedPrompt || !onSaveToPersonalNote) return;
    const prefix = existingNote.trim() ? `${existingNote.trim()}\n\n---\n` : '';
    const formatted = `${prefix}[Bản tối ưu Gemini - Điểm ${analysis.overallScore}/100]:\n${analysis.optimizedPrompt}`;
    onSaveToPersonalNote(prompt.id, formatted);
    setSavedToNote(true);
    setTimeout(() => setSavedToNote(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gemini-optimizer-title"
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 p-5 sm:p-6">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                <Wand2 className="h-3.5 w-3.5" />
                Gemini AI · Phân tích &amp; Gợi ý cải tiến Prompt
              </span>
              <span className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                {prompt.role} · {prompt.level}
              </span>
            </div>
            <h2
              id="gemini-optimizer-title"
              className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white"
            >
              {prompt.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!loading && (
              <button
                type="button"
                onClick={() => analyzePromptWithGemini(prompt, true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
                title="Yêu cầu Gemini phân tích lại"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Phân tích lại</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Loading State */}
          {loading && (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <RefreshCw className="h-7 w-7 animate-spin" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Gemini đang mổ xẻ cấu trúc câu lệnh 4 bước...
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Đang kiểm tra mức độ rõ ràng của Vai trò, Bối cảnh, Ràng buộc chống bịa đặt và Định dạng đầu ra cho phòng ban{' '}
                  <strong>{prompt.role}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 p-5 space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                    Không thể hoàn tất phân tích tự động
                  </h3>
                  <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                    {error}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => analyzePromptWithGemini(prompt, true)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Thử lại ngay
              </button>
            </div>
          )}

          {/* Analysis Results */}
          {!loading && !error && analysis && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* 1. Overall Score & Verdict Banner */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-4 sm:p-5">
                  <div className="md:col-span-3 flex items-center gap-3 md:border-r md:border-emerald-500/20 md:pr-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                      <span className="text-lg font-extrabold leading-none tabular-nums">
                        {analysis.overallScore}
                      </span>
                      <span className="text-[10px] font-semibold opacity-90">/100</span>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Điểm cấu trúc gốc
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        Chuẩn 4 bước công sở
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-9 space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                      {analysis.summaryVerdict}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysis.strengths.map((str, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 rounded-lg bg-white dark:bg-slate-900 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. 4-Pillar Structure Diagnostic */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Chẩn đoán 4 thành phần cốt lõi của Prompt hiện tại
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        step: '01. Vai trò (Role)',
                        detail: analysis.structureAudit.roleClarity,
                      },
                      {
                        step: '02. Bối cảnh (Context)',
                        detail: analysis.structureAudit.contextDepth,
                      },
                      {
                        step: '03. Ràng buộc (Constraints)',
                        detail: analysis.structureAudit.taskConstraints,
                      },
                      {
                        step: '04. Định dạng (Format)',
                        detail: analysis.structureAudit.outputFormat,
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 space-y-1.5"
                      >
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                          {item.step}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Specific Improvement Recommendations */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      Đề xuất cải tiến cụ thể từ Gemini ({analysis.improvements.length})
                    </h3>
                    {analysis.suggestedVariables.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          Biến số gợi ý thêm:
                        </span>
                        {analysis.suggestedVariables.map((v, i) => (
                          <span
                            key={i}
                            className="rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 font-mono text-[11px] font-bold text-amber-800 dark:text-amber-300"
                          >
                            {v.startsWith('[') ? v : `[${v}]`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {analysis.improvements.map((imp, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col justify-between space-y-2.5 shadow-2xs"
                      >
                        <div className="space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white">
                              {idx + 1}
                            </span>
                            <span>{imp.title}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {imp.reason}
                          </p>
                        </div>
                        <div className="rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-500/20 p-2.5 text-xs font-medium text-emerald-900 dark:text-emerald-200 leading-relaxed">
                          <strong className="font-bold">Cách nâng cấp:</strong> {imp.suggestion}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Optimized Prompt Comparison & One-Click Copy */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Phiên bản Prompt đã tối ưu hóa bởi Gemini
                      </h3>
                    </div>

                    <div className="inline-flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                      <button
                        type="button"
                        onClick={() => setCompareView('split')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                          compareView === 'split'
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        So sánh Trước / Sau
                      </button>
                      <button
                        type="button"
                        onClick={() => setCompareView('optimized')}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors cursor-pointer ${
                          compareView === 'optimized'
                            ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs'
                            : 'text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Chỉ xem bản tối ưu
                      </button>
                    </div>
                  </div>

                  {compareView === 'split' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-2">
                        <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          Prompt gốc hiện tại:
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 max-h-60 overflow-y-auto">
                          {prompt.template}
                        </pre>
                      </div>

                      <div className="rounded-2xl border border-emerald-500/40 bg-slate-900 text-slate-100 p-4 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-400">
                            Prompt đã nâng cấp (Đầy đủ ràng buộc &amp; biến số):
                          </span>
                        </div>
                        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-emerald-50 max-h-60 overflow-y-auto">
                          {analysis.optimizedPrompt}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-emerald-500/40 bg-slate-900 text-slate-100 p-5 space-y-2">
                      <div className="text-xs font-bold text-emerald-400">
                        Prompt đã nâng cấp hoàn chỉnh:
                      </div>
                      <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-emerald-50">
                        {analysis.optimizedPrompt}
                      </pre>
                    </div>
                  )}

                  {/* Pro Tip */}
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-slate-900 dark:text-white">
                        Mẹo chạy thực tế:
                      </strong>{' '}
                      {analysis.proTip}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {onOpenInteractiveBuilder && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInteractiveBuilder(prompt);
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
              >
                <span>Mở trình điền biến số</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {analysis && onSaveToPersonalNote && (
              <button
                type="button"
                onClick={handleSaveOptimizedToNote}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  savedToNote
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
                }`}
              >
                {savedToNote ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Đã lưu vào Ghi chú cá nhân</span>
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Lưu bản tối ưu vào Ghi chú</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {analysis && (
              <button
                type="button"
                onClick={handleCopyOptimized}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs transition-colors cursor-pointer"
              >
                {copiedOptimized ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Đã sao chép bản tối ưu!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Sao chép Prompt đã tối ưu</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
