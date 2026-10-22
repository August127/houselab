import React, { useState } from 'react';
import {
  POPULAR_AI_AGENTS,
  AIAgentCategory,
  AIAgentType,
  PromptItem,
} from '../data/siteData';
import { AgentIsometricArtwork } from './VisualCardArtwork';
import { PromptPersonalNoteBox } from './PromptPersonalNoteBox';
import { PromptCommunityBenchmarkStrip } from './PromptCommunityBenchmark';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Layers,
  ShieldCheck,
  Terminal,
  Wand2,
} from 'lucide-react';

interface AIAgentCatalogSectionProps {
  prompts: PromptItem[];
  comparePromptIds: string[];
  quickCopiedId: string | null;
  promptNotes?: Record<string, string>;
  onChangePromptNote?: (promptId: string, note: string) => void;
  onOpenPromptModal: (prompt: PromptItem) => void;
  onQuickCopyPrompt: (prompt: PromptItem) => void;
  onToggleComparePrompt: (promptId: string, e?: React.MouseEvent) => void;
  onPromptCardKeyDown: (e: React.KeyboardEvent<HTMLElement>, prompt: PromptItem) => void;
  onFilterLibraryByAgent?: (agentType: AIAgentType) => void;
  onOpenImproveModal?: (prompt: PromptItem) => void;
}

export const AIAgentCatalogSection: React.FC<AIAgentCatalogSectionProps> = ({
  prompts,
  comparePromptIds,
  quickCopiedId,
  promptNotes = {},
  onChangePromptNote,
  onOpenPromptModal,
  onQuickCopyPrompt,
  onToggleComparePrompt,
  onPromptCardKeyDown,
  onFilterLibraryByAgent,
  onOpenImproveModal,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(
    POPULAR_AI_AGENTS[0].id
  );
  const [copiedFormulaId, setCopiedFormulaId] = useState<string | null>(null);
  const [focusedCardId, setFocusedCardId] = useState<string | null>(null);

  const activeAgent: AIAgentCategory =
    POPULAR_AI_AGENTS.find((a) => a.id === selectedAgentId) ||
    POPULAR_AI_AGENTS[0];

  const specializedPrompts = prompts.filter(
    (p) =>
      p.agentType === activeAgent.agentType ||
      activeAgent.specializedPromptIds.includes(p.id)
  );

  const handleCopyFormula = (agent: AIAgentCategory) => {
    navigator.clipboard.writeText(agent.goldenStructureFormula);
    setCopiedFormulaId(agent.id);
    setTimeout(() => setCopiedFormulaId(null), 2000);
  };

  return (
    <section
      id="ai-agent-catalog"
      className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-8 shadow-xs"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Layers className="w-4 h-4" />
            Danh mục AI Agent Công sở &amp; Quy tắc Tối ưu Hiệu suất
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            6 loại AI Agent phổ biến nhất &amp; Bộ Prompt chuyên biệt cho từng loại
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            AI Agent không chỉ trò chuyện đơn thuần mà có khả năng <strong>lập kế hoạch đa bước, tra cứu tài liệu, chạy mã tính toán và tự động hóa quy trình</strong>. Chọn từng loại Agent bên dưới để xem cách sử dụng cơ bản, nguyên tắc tối ưu và lấy mẫu Prompt đặc trưng.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            Hỗ trợ phím tắt trên thẻ Prompt:{' '}
            <strong className="text-slate-800 dark:text-slate-200">Ctrl+C</strong> chép ·{' '}
            <strong className="text-slate-800 dark:text-slate-200">Ctrl+S</strong> so sánh
          </span>
        </div>
      </div>

      {/* 6 AI Agent Category Selector Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_AI_AGENTS.map((agent, index) => {
          const isSelected = agent.id === activeAgent.id;
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => setSelectedAgentId(agent.id)}
              className={`group text-left rounded-2xl border p-3 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/25 ring-2 ring-emerald-500/20 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-emerald-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="relative">
                  <AgentIsometricArtwork
                    agentType={agent.agentType}
                    className="h-32 w-full rounded-xl"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-xs ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900/80 text-slate-200'
                    }`}
                  >
                    LOẠI 0{index + 1}
                  </span>
                </div>

                <div className="p-2 pt-3">
                  <div className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                    {agent.shortName}
                  </div>
                  <h3 className="mt-0.5 text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {agent.agentType}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {agent.tagline}
                  </p>
                </div>
              </div>

              <div className="px-2 pt-2 mt-2 border-t border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                  {agent.popularPlatforms[0]}
                </span>
                <span
                  className={`font-bold inline-flex items-center gap-1 ${
                    isSelected
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isSelected ? 'Đang xem chi tiết' : 'Xem cách tối ưu →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Optimization Blueprint & Specialized Prompts for Active Agent */}
      <div className="rounded-3xl border border-emerald-500/30 bg-slate-50/70 dark:bg-slate-950/60 p-5 md:p-7 space-y-7">
        {/* Agent Top Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4">
            <AgentIsometricArtwork
              agentType={activeAgent.agentType}
              className="h-44 w-full rounded-2xl shadow-md"
            />

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2.5">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Nền tảng tiêu biểu &amp; Phòng ban phù hợp:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeAgent.popularPlatforms.map((plat) => (
                  <span
                    key={plat}
                    className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/70 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                  >
                    {plat}
                  </span>
                ))}
              </div>
              <div className="pt-1 text-xs text-slate-500 dark:text-slate-400">
                Ứng dụng mạnh nhất cho:{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {activeAgent.targetRoles.join(' · ')}
                </strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {activeAgent.shortName}
              </div>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeAgent.agentType}: Cơ chế &amp; Cách sử dụng cơ bản
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {activeAgent.whatItDoes}
              </p>
            </div>

            {/* 3 Basic Usage Steps */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Quy trình 3 bước sử dụng cơ bản:
              </div>
              <ol className="space-y-2">
                {activeAgent.basicUsageSteps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-[11px] font-bold text-white mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* 3 Optimization Rules for High Efficiency */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                3 nguyên tắc tối ưu để đạt hiệu quả cao nhất:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeAgent.optimizationRules.map((rule, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{rule.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Golden Prompt Structure & Common Mistake */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 rounded-2xl border border-emerald-500/30 bg-slate-900 text-slate-100 p-4 flex flex-col justify-between gap-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Khung câu lệnh tối ưu đặc trưng (Agent System Structure)
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyFormula(activeAgent)}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-[11px] font-bold text-emerald-300 cursor-pointer"
                >
                  {copiedFormulaId === activeAgent.id ? (
                    <>
                      <Check className="w-3 h-3" />
                      Đã chép khung
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Chép khung công thức
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {activeAgent.goldenStructureFormula}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl border border-amber-300/70 dark:border-amber-800/60 bg-amber-50/70 dark:bg-amber-950/30 p-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Sai lầm phổ biến cần tránh</span>
            </div>
            <p className="text-xs text-amber-950/80 dark:text-amber-200/80 leading-relaxed">
              {activeAgent.commonMistake}
            </p>
          </div>
        </div>

        {/* Specialized Prompts for this AI Agent Category */}
        <div className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Mẫu Prompt chuyên biệt cho {activeAgent.agentType} (
                {specializedPrompts.length})
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click vào thẻ để mở trình điền biến tự động, hoặc dùng phím tắt{' '}
                <strong>Ctrl+C</strong> để sao chép và <strong>Ctrl+S</strong> để đưa vào bàn cân so sánh.
              </p>
            </div>

            {onFilterLibraryByAgent && (
              <button
                type="button"
                onClick={() => onFilterLibraryByAgent(activeAgent.agentType)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                <span>Mở trong Thư viện Prompt</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {specializedPrompts.map((p) => {
              const compareIdx = comparePromptIds.indexOf(p.id);
              const isCompared = compareIdx !== -1;
              const isCopied = quickCopiedId === p.id;
              const isFocused = focusedCardId === p.id;

              return (
                <article
                  key={p.id}
                  tabIndex={0}
                  aria-label={`${p.title} - Nhấn Ctrl+C để sao chép, Ctrl+S để so sánh`}
                  onFocus={() => setFocusedCardId(p.id)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setFocusedCardId((prev) => (prev === p.id ? null : prev));
                    }
                  }}
                  onKeyDown={(e) => onPromptCardKeyDown(e, p)}
                  onClick={() => onOpenPromptModal(p)}
                  className={`group cursor-pointer rounded-2xl border bg-white dark:bg-slate-900 p-5 flex flex-col justify-between gap-4 transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    isCompared
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 font-bold text-emerald-700 dark:text-emerald-300">
                          {p.agentType || activeAgent.agentType}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="font-semibold text-slate-600 dark:text-slate-300">
                          {p.role}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500 tabular-nums">
                          {p.copyCount.toLocaleString('vi-VN')} lượt copy
                        </span>
                      </div>

                      <label
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer select-none ${
                          isCompared
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isCompared}
                          onChange={() => onToggleComparePrompt(p.id)}
                          className="h-3.5 w-3.5 rounded accent-emerald-500 cursor-pointer"
                        />
                        <span>
                          {isCompared ? `So sánh #${compareIdx + 1}` : 'So sánh'}
                        </span>
                      </label>
                    </div>

                    <h5 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {p.title}
                    </h5>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {p.situation}
                    </p>

                    <div className="rounded-xl bg-slate-950 text-slate-200 p-3 font-mono text-[11px] leading-relaxed line-clamp-4 border border-slate-800">
                      {p.template}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{p.bestToolNote}</span>
                    </div>

                    <PromptCommunityBenchmarkStrip
                      prompt={p}
                      onOpenCompareTab={() => onOpenPromptModal(p)}
                    />

                    {onChangePromptNote && (
                      <PromptPersonalNoteBox
                        promptId={p.id}
                        note={promptNotes[p.id] || ''}
                        onChangeNote={onChangePromptNote}
                        compact
                      />
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                      Điền biến &amp; chạy thử
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {isFocused && (
                        <span className="hidden sm:inline-block text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          Ctrl+C / Ctrl+S
                        </span>
                      )}
                      {onOpenImproveModal && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenImproveModal(p);
                          }}
                          className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
                          title="Dùng Gemini AI phân tích và gợi ý cải tiến câu lệnh"
                        >
                          <Wand2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>Gợi ý cải tiến</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickCopyPrompt(p);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer tabular-nums ${
                          isCopied
                            ? 'border-emerald-500 bg-emerald-600 text-white'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã chép ({p.copyCount.toLocaleString('vi-VN')})</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Chép ({p.copyCount.toLocaleString('vi-VN')})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
