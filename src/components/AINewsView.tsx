import React, { useState, useMemo } from 'react';
import {
  AINewsItem,
  AINewsCategory,
  AI_TREND_PULSES,
} from '../data/aiNewsData';
import {
  PromptItem,
  ArticleItem,
  OfficeRole,
  AIToolName,
} from '../data/siteData';
import { RoleIsometricArtwork } from './VisualCardArtwork';
import {
  Newspaper,
  Sparkles,
  Search,
  Bookmark,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  X,
  Zap,
  Layers,
  RotateCcw,
} from 'lucide-react';

const ALL_CATEGORIES: ('Tất cả' | AINewsCategory)[] = [
  'Tất cả',
  'Mô hình & Tính năng mới',
  'Xu hướng Công sở VN',
  'Ứng dụng theo Phòng ban',
  'Bảo mật & Quản trị AI',
];

const ALL_ROLES: OfficeRole[] = [
  'Kế toán',
  'Nhân sự',
  'Hành chính',
  'Sales',
  'Marketing',
  'Trợ lý & Quản lý',
];

const ALL_TOOLS: AIToolName[] = ['Claude', 'ChatGPT', 'Gemini', 'Codex'];

interface AINewsViewProps {
  newsList: AINewsItem[];
  prompts: PromptItem[];
  articles: ArticleItem[];
  bookmarkedNewsIds: string[];
  onToggleBookmarkNews: (newsId: string, e?: React.MouseEvent) => void;
  onOpenPromptModal: (prompt: PromptItem) => void;
  onOpenArticleModal: (article: ArticleItem) => void;
  onNavigateToPrompts: () => void;
  onNavigateToProfile: () => void;
}

export const AINewsView: React.FC<AINewsViewProps> = ({
  newsList,
  prompts,
  articles,
  bookmarkedNewsIds,
  onToggleBookmarkNews,
  onOpenPromptModal,
  onOpenArticleModal,
  onNavigateToPrompts,
  onNavigateToProfile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Tất cả' | AINewsCategory>('Tất cả');
  const [selectedRole, setSelectedRole] = useState<'Tất cả' | OfficeRole>('Tất cả');
  const [selectedTool, setSelectedTool] = useState<'Tất cả' | AIToolName>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [activeNewsModal, setActiveNewsModal] = useState<AINewsItem | null>(null);

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchCat =
        selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const matchRole =
        selectedRole === 'Tất cả' || item.impactRoles.includes(selectedRole);
      const matchTool =
        selectedTool === 'Tất cả' || item.featuredTools.includes(selectedTool);
      const matchSaved = !showOnlySaved || bookmarkedNewsIds.includes(item.id);
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.keyTakeaways.some((t) => t.toLowerCase().includes(q));

      return matchCat && matchRole && matchTool && matchSaved && matchSearch;
    });
  }, [
    newsList,
    selectedCategory,
    selectedRole,
    selectedTool,
    showOnlySaved,
    bookmarkedNewsIds,
    searchQuery,
  ]);

  const featuredNews = useMemo(
    () => newsList.find((n) => n.isBreaking) || newsList[0],
    [newsList]
  );

  const findLinkedPrompt = (promptId: string) =>
    prompts.find((p) => p.id === promptId);

  const findLinkedArticle = (articleId?: string) =>
    articleId ? articles.find((a) => a.id === articleId) : undefined;

  return (
    <div className="space-y-8">
      {/* 1. COMPACT PAGE HEADER + CLOSED-LOOP STEP 1 INDICATOR */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <span className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
                BƯỚC 01 / 04 · CHU TRÌNH KHÉP KÍN
              </span>
              <span>Tin tức & Xu hướng AI Công sở</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Cập nhật công nghệ AI mới nhất & Chuyển hóa thành câu lệnh thực chiến
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
              Mỗi bản tin không dừng ở việc thông báo tính năng mới mà kết nối trực tiếp với mẫu Prompt thực hành và Tình huống công sở để bạn áp dụng ngay trong 5 phút.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowOnlySaved((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer tabular-nums ${
                showOnlySaved
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlySaved ? 'fill-current' : ''}`} />
              <span>Tin đã lưu ({bookmarkedNewsIds.length})</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToPrompts}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>Sang Bước 3: Thư viện Prompt</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. 4 MACRO WORKPLACE AI TREND PULSES */}
        <div className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Chỉ số Xu hướng Ứng dụng AI Văn phòng Việt Nam (Q4/2026)
            </span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Bấm vào từng xu hướng để đọc bản tin phân tích
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {AI_TREND_PULSES.map((pulse) => {
              const targetNews = newsList.find((n) => n.id === pulse.linkedNewsId);
              return (
                <div
                  key={pulse.id}
                  onClick={() => targetNews && setActiveNewsModal(targetNews)}
                  className="group cursor-pointer rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 hover:border-emerald-500 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                        {pulse.recommendedRole}
                      </span>
                      <span className="rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                        {pulse.changeLabel}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-mono text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                        {pulse.metric}
                      </span>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                        {pulse.label}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {pulse.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. FEATURED SPOTLIGHT STORY (WHEN NO ACTIVE SEARCH/FILTER) */}
      {featuredNews &&
        selectedCategory === 'Tất cả' &&
        selectedRole === 'Tất cả' &&
        selectedTool === 'Tất cả' &&
        !showOnlySaved &&
        !searchQuery.trim() && (
          <section className="rounded-2xl border border-emerald-500/35 bg-white dark:bg-slate-900 p-5 md:p-6 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4">
                <div className="relative">
                  <RoleIsometricArtwork
                    role={featuredNews.impactRoles[0] || 'Kế toán'}
                    className="h-52 w-full rounded-xl"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    Tiêu điểm tuần này
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {featuredNews.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Cập nhật {featuredNews.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredNews.readTimeMinutes} phút đọc
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {featuredNews.trendMetric}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => onToggleBookmarkNews(featuredNews.id, e)}
                    className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                      bookmarkedNewsIds.includes(featuredNews.id)
                        ? 'border-emerald-500 bg-emerald-600 text-white'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        bookmarkedNewsIds.includes(featuredNews.id) ? 'fill-current' : ''
                      }`}
                    />
                    <span>
                      {bookmarkedNewsIds.includes(featuredNews.id) ? 'Đã lưu' : 'Lưu tin'}
                    </span>
                  </button>
                </div>

                <h2
                  onClick={() => setActiveNewsModal(featuredNews)}
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer leading-snug"
                >
                  {featuredNews.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {featuredNews.summary}
                </p>

                {/* Before vs After Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-3">
                    <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      Cách làm cũ trước bản cập nhật:
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {featuredNews.beforeUpdateWorkflow}
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 p-3">
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                      Quy trình mới áp dụng ngay:
                    </div>
                    <p className="mt-1 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {featuredNews.afterUpdateWorkflow}
                    </p>
                  </div>
                </div>

                {/* Action Bar Closing the Learning Loop */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Áp dụng cho:</span>
                    {featuredNews.impactRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveNewsModal(featuredNews)}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-100 hover:border-emerald-500 transition-colors cursor-pointer"
                    >
                      Đọc toàn bộ phân tích
                    </button>

                    {findLinkedPrompt(featuredNews.linkedPromptId) && (
                      <button
                        type="button"
                        onClick={() => {
                          const p = findLinkedPrompt(featuredNews.linkedPromptId);
                          if (p) onOpenPromptModal(p);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Thực hành ngay Prompt liên quan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      {/* 4. COMPACT FILTER & SEARCH BAR */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 p-1">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Role & Tool Selects */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tin tức, mô hình, kỹ năng..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-7 py-1.5 text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <select
              aria-label="Lọc tin tức theo phòng ban"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as 'Tất cả' | OfficeRole)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="Tất cả">Phòng ban: Tất cả</option>
              {ALL_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              aria-label="Lọc tin tức theo công cụ AI"
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value as 'Tất cả' | AIToolName)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              <option value="Tất cả">Mô hình: Tất cả</option>
              {ALL_TOOLS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            {(selectedCategory !== 'Tất cả' ||
              selectedRole !== 'Tất cả' ||
              selectedTool !== 'Tất cả' ||
              showOnlySaved ||
              searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('Tất cả');
                  setSelectedRole('Tất cả');
                  setSelectedTool('Tất cả');
                  setShowOnlySaved(false);
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Đặt lại
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 5. NEWS GRID */}
      {filteredNews.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-3">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Không tìm thấy bản tin AI phù hợp với bộ lọc hiện tại.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('Tất cả');
              setSelectedRole('Tất cả');
              setSelectedTool('Tất cả');
              setShowOnlySaved(false);
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
          >
            Xem tất cả bản tin
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => {
            const isSaved = bookmarkedNewsIds.includes(item.id);
            const linkedPrompt = findLinkedPrompt(item.linkedPromptId);
            return (
              <article
                key={item.id}
                onClick={() => setActiveNewsModal(item)}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative mb-3.5">
                    <RoleIsometricArtwork
                      role={item.impactRoles[0] || 'Kế toán'}
                      className="h-36 w-full rounded-xl"
                    />
                    <span className="absolute top-2.5 left-2.5 rounded-lg bg-slate-950/85 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                      {item.category}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => onToggleBookmarkNews(item.id, e)}
                      aria-label="Lưu bản tin"
                      className={`absolute top-2.5 right-2.5 h-8 w-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'bg-slate-900/75 border-slate-700 text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                    <span>
                      {item.publishedDate} · {item.readTimeMinutes} phút đọc
                    </span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.featuredTools.join(' · ')}
                    </span>
                  </div>

                  <h3 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key takeaway box */}
                  <div className="mt-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5 text-[11px] text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      Điểm mấu chốt:{' '}
                    </span>
                    <span className="line-clamp-2">{item.keyTakeaways[0]}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 inline-flex items-center gap-1">
                    Đọc chi tiết
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>

                  {linkedPrompt && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPromptModal(linkedPrompt);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3 h-3" />
                      <span>Thực hành Prompt</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 6. FULL NEWS READER & CLOSED-LOOP PRACTICE MODAL */}
      {activeNewsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 p-4 backdrop-blur-xs overflow-y-auto"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveNewsModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative my-8 w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5"
          >
            {/* Modal Top Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                  <span className="rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                    {activeNewsModal.category}
                  </span>
                  <span>Ngày đăng: {activeNewsModal.publishedDate}</span>
                  <span>·</span>
                  <span>{activeNewsModal.readTimeMinutes} phút đọc</span>
                  <span>·</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {activeNewsModal.trendMetric}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug pt-1">
                  {activeNewsModal.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => onToggleBookmarkNews(activeNewsModal.id, e)}
                  className={`inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-bold cursor-pointer ${
                    bookmarkedNewsIds.includes(activeNewsModal.id)
                      ? 'border-emerald-500 bg-emerald-600 text-white'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      bookmarkedNewsIds.includes(activeNewsModal.id) ? 'fill-current' : ''
                    }`}
                  />
                  <span>
                    {bookmarkedNewsIds.includes(activeNewsModal.id) ? 'Đã lưu' : 'Lưu'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNewsModal(null)}
                  className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
              {activeNewsModal.summary}
            </p>

            {/* Key Takeaways for Office Workers */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3 Điểm mấu chốt cho dân văn phòng
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                {activeNewsModal.keyTakeaways.map((tk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      0{i + 1}.
                    </span>
                    <span>{tk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deep Analysis Sections */}
            <div className="space-y-4">
              {activeNewsModal.fullAnalysis.map((sec, idx) => (
                <div key={idx} className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {sec.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Closed-Loop Bridge: Actionable Practice Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                  <Layers className="w-4 h-4" />
                  Khép kín chu trình học tập · Chuyển từ Đọc tin sang Thực hành
                </span>
                <span className="text-[11px] text-slate-400">
                  Áp dụng ngay trong 5 phút
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200">
                {activeNewsModal.closedLoopNote}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {activeNewsModal.actionSteps.map((st, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-slate-800 bg-slate-800/70 p-3 text-slate-200"
                  >
                    <div className="font-bold text-emerald-400 mb-1">Bước {i + 1}</div>
                    <div>{st}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  {findLinkedPrompt(activeNewsModal.linkedPromptId) && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetPrompt = findLinkedPrompt(
                          activeNewsModal.linkedPromptId
                        );
                        setActiveNewsModal(null);
                        if (targetPrompt) onOpenPromptModal(targetPrompt);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>
                        Thực hành ngay:{' '}
                        {findLinkedPrompt(activeNewsModal.linkedPromptId)?.title}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {findLinkedArticle(activeNewsModal.linkedArticleId) && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetArt = findLinkedArticle(
                          activeNewsModal.linkedArticleId
                        );
                        setActiveNewsModal(null);
                        if (targetArt) onOpenArticleModal(targetArt);
                      }}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:border-emerald-500 cursor-pointer"
                    >
                      Xem Tình huống mẫu liên quan
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveNewsModal(null);
                    onNavigateToProfile();
                  }}
                  className="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
                >
                  Mở My Learning Path →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface HomeAINewsPreviewSectionProps {
  newsList: AINewsItem[];
  prompts: PromptItem[];
  bookmarkedNewsIds: string[];
  onToggleBookmarkNews: (newsId: string, e?: React.MouseEvent) => void;
  onOpenNewsPage: () => void;
  onOpenPromptModal: (prompt: PromptItem) => void;
}

export const HomeAINewsPreviewSection: React.FC<HomeAINewsPreviewSectionProps> = ({
  newsList,
  prompts,
  bookmarkedNewsIds,
  onToggleBookmarkNews,
  onOpenNewsPage,
  onOpenPromptModal,
}) => {
  const topNews = newsList.slice(0, 3);

  return (
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <Newspaper className="w-3.5 h-3.5" />
            Điểm tin & Xu hướng AI Công sở mới nhất
          </div>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Cập nhật tính năng AI mới — Áp dụng thẳng vào câu lệnh hàng ngày
          </h2>
        </div>

        <button
          type="button"
          onClick={onOpenNewsPage}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span>Xem tất cả {newsList.length} bản tin AI</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {topNews.map((item) => {
          const isSaved = bookmarkedNewsIds.includes(item.id);
          const linkedPrompt = prompts.find((p) => p.id === item.linkedPromptId);
          return (
            <article
              key={item.id}
              onClick={onOpenNewsPage}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4 hover:border-emerald-500 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span>{item.publishedDate}</span>
                    <button
                      type="button"
                      onClick={(e) => onToggleBookmarkNews(item.id, e)}
                      aria-label="Lưu bản tin"
                      className={`p-1 rounded-md border transition-colors cursor-pointer ${
                        isSaved
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  {item.trendMetric}
                </span>

                {linkedPrompt && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPromptModal(linkedPrompt);
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Thử Prompt</span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
