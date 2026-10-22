import React, { useState } from 'react';
import { PromptItem, AIToolName } from '../data/siteData';
import {
  X,
  Columns2,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { RoleIsometricArtwork } from './VisualCardArtwork';
import { motion, AnimatePresence } from 'motion/react';
import { PromptCommunityBenchmarkStrip } from './PromptCommunityBenchmark';

interface PromptQuickCompareModalProps {
  promptsToCompare: [PromptItem, PromptItem] | null;
  onClose: () => void;
  onClearSelection: () => void;
  onOpenBuilder: (prompt: PromptItem) => void;
  onQuickCopy: (prompt: PromptItem) => void;
}

const ALL_AI_TOOLS: AIToolName[] = ['Claude', 'ChatGPT', 'Gemini', 'Codex'];

function analyzeStructureSections(template: string) {
  const lines = template.split('\n').filter((l) => l.trim().length > 0);
  const hasRole = /đóng vai|bạn là|chuyên gia|trưởng phòng|thư ký/i.test(template);
  const hasContext = /bối cảnh|dưới đây là|tôi đang|cấu trúc|tình huống/i.test(template);
  const hasTask = /yêu cầu|hãy giúp|thực hiện|tổng hợp|rà soát|lập bảng/i.test(template);
  const hasFormat = /định dạng|phiên bản|trình bày|cấu trúc|1\.|2\./i.test(template);
  return {
    lineCount: lines.length,
    charCount: template.length,
    stepsDetected: [
      { label: '1. Định danh Vai trò (Role)', active: hasRole },
      { label: '2. Dữ liệu Bối cảnh (Context)', active: hasContext },
      { label: '3. Nhiệm vụ cụ thể (Task)', active: hasTask },
      { label: '4. Ràng buộc Định dạng (Format)', active: hasFormat },
    ],
  };
}

function renderHighlightedTemplate(template: string) {
  const parts = template.split(/(\[[A-Z0-9_]+\])/g);
  return parts.map((part, idx) => {
    if (/^\[[A-Z0-9_]+\]$/.test(part)) {
      return (
        <span
          key={idx}
          className="inline-block rounded bg-emerald-500/25 px-1.5 py-0.5 font-mono font-bold text-emerald-300 border border-emerald-500/40"
        >
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export const PromptQuickCompareModal: React.FC<PromptQuickCompareModalProps> = ({
  promptsToCompare,
  onClose,
  onClearSelection,
  onOpenBuilder,
  onQuickCopy,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!promptsToCompare) return null;

  const [leftPrompt, rightPrompt] = promptsToCompare;
  const leftStruct = analyzeStructureSections(leftPrompt.template);
  const rightStruct = analyzeStructureSections(rightPrompt.template);

  const sharedTools = leftPrompt.recommendedTools.filter((t) =>
    rightPrompt.recommendedTools.includes(t)
  );
  const isSameRole = leftPrompt.role === rightPrompt.role;
  const isSameLevel = leftPrompt.level === rightPrompt.level;
  const isSameVarCount = leftPrompt.variables.length === rightPrompt.variables.length;

  const handleCopy = (p: PromptItem) => {
    onQuickCopy(p);
    setCopiedId(p.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="So sánh trực tiếp 2 mẫu câu lệnh Prompt"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 px-6 py-4 bg-slate-50/80 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
              <Columns2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span>So sánh nhanh 2 Prompt song song</span>
                <span aria-hidden="true">·</span>
                <span>Phân tích cấu trúc, biến số & công cụ</span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Bảng đối chiếu cấu trúc câu lệnh & biến số
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClearSelection();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Chọn cặp khác
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              aria-label="Đóng bảng so sánh"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Highlight Summary Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-emerald-50/60 dark:bg-emerald-950/25 px-6 py-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-700 dark:text-slate-200">
            <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
            <strong>Điểm khác biệt chính:</strong>
            <span
              className={`rounded-lg px-2 py-0.5 font-semibold ${
                isSameRole
                  ? 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
              }`}
            >
              {isSameRole
                ? `Cùng phòng ban (${leftPrompt.role})`
                : `Khác phòng ban (${leftPrompt.role} vs ${rightPrompt.role})`}
            </span>
            <span
              className={`rounded-lg px-2 py-0.5 font-semibold ${
                isSameLevel
                  ? 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-sky-500/20 text-sky-800 dark:text-sky-300 border border-sky-500/30'
              }`}
            >
              {isSameLevel
                ? `Cùng trình độ (${leftPrompt.level})`
                : `Khác trình độ (${leftPrompt.level} vs ${rightPrompt.level})`}
            </span>
            <span
              className={`rounded-lg px-2 py-0.5 font-semibold ${
                isSameVarCount
                  ? 'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-purple-500/20 text-purple-800 dark:text-purple-300 border border-purple-500/30'
              }`}
            >
              Số biến điền: {leftPrompt.variables.length} biến vs {rightPrompt.variables.length}{' '}
              biến
            </span>
          </div>

          <div className="text-slate-500 dark:text-slate-400">
            Công cụ AI chung:{' '}
            <strong className="text-emerald-700 dark:text-emerald-400">
              {sharedTools.length > 0 ? sharedTools.join(', ') : 'Không trùng'}
            </strong>
          </div>
        </div>

        {/* Scrollable Comparison Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* SECTION 1: TOP OVERVIEW CARDS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[leftPrompt, rightPrompt].map((item, idx) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-4"
              >
                <div className="space-y-3">
                  <div className="relative">
                    <RoleIsometricArtwork role={item.role} className="h-36 w-full rounded-xl" />
                    <span className="absolute top-3 left-3 rounded-lg bg-slate-900/90 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-slate-700">
                      Mẫu #{idx + 1} · {item.role}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {item.pillar}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Trình độ: {item.level}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                      {item.copyCount.toLocaleString('vi-VN')} lượt copy
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {item.situation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-200/80 dark:border-slate-700/70">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenBuilder(item);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Mở trình điền biến mẫu này
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleCopy(item)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      copiedId === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copiedId === item.id ? (
                        <motion.span
                          key="copied"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-1"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Đã sao chép!
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="inline-flex items-center gap-1"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          Copy mẫu #{idx + 1}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {/* SECTION 2: RECOMMENDED AI TOOLS MATRIX + COMMUNITY BENCHMARK */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              1. Đối chiếu Công cụ AI Khuyên dùng & Benchmark Tốc độ / Độ chính xác thực tế
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[leftPrompt, rightPrompt].map((item, idx) => {
                const other = idx === 0 ? rightPrompt : leftPrompt;
                return (
                  <div
                    key={`tools-${item.id}`}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {ALL_AI_TOOLS.map((tool) => {
                        const active = item.recommendedTools.includes(tool);
                        const alsoInOther = other.recommendedTools.includes(tool);
                        const isUnique = active && !alsoInOther;
                        return (
                          <span
                            key={tool}
                            className={`rounded-xl px-3 py-1 text-xs font-bold border ${
                              active
                                ? isUnique
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-900 dark:text-amber-300'
                                  : 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800/50 border-transparent text-slate-400 line-through'
                            }`}
                          >
                            {tool}
                            {isUnique ? ' (Khác biệt)' : ''}
                          </span>
                        );
                      })}
                    </div>
                    <PromptCommunityBenchmarkStrip prompt={item} />
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                      <strong>Ghi chú chọn công cụ:</strong> {item.bestToolNote}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* SECTION 3: VARIABLES COMPARISON */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
              2. So sánh Cấu trúc Biến số cần điền ({leftPrompt.variables.length} biến vs{' '}
              {rightPrompt.variables.length} biến)
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[leftPrompt, rightPrompt].map((item) => (
                <div
                  key={`vars-${item.id}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2.5"
                >
                  {item.variables.map((v, vIdx) => (
                    <div
                      key={v.key}
                      className="rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-3 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Biến {vIdx + 1}: {v.label}
                        </span>
                        <code className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                          [{v.key}]
                        </code>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-2">
                        Giá trị mẫu: “{v.defaultValue}”
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: PROMPT STRUCTURE & FULL TEMPLATE DIFF */}
          <section className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              3. So sánh Cấu trúc Câu lệnh 4 Bước & Lưu ý Bảo mật
            </h3>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {[
                { item: leftPrompt, struct: leftStruct },
                { item: rightPrompt, struct: rightStruct },
              ].map(({ item, struct }) => (
                <div
                  key={`struct-${item.id}`}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4"
                >
                  {/* 4-step checklist */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      Độ dài: <strong>{struct.lineCount} dòng</strong> ({struct.charCount} ký tự)
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {struct.stepsDetected.map((st) => (
                        <span
                          key={st.label}
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                            st.active
                              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          ✓ {st.label.split('(')[0]}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlighted Prompt Template */}
                  <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100 whitespace-pre-wrap border border-slate-800">
                    {renderHighlightedTemplate(item.template)}
                  </div>

                  {/* Security Tip */}
                  <div className="rounded-xl border border-amber-200/70 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-3 text-xs text-slate-700 dark:text-slate-300">
                    <strong className="text-amber-900 dark:text-amber-300">
                      Lưu ý bảo mật riêng:{' '}
                    </strong>
                    {item.securityTip}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
