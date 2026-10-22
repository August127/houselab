import React, { useState, useEffect, useMemo } from 'react';
import {
  PromptItem,
  ArticleItem,
  OfficeRole,
  AIToolName,
  RoadmapDay,
} from '../data/siteData';
import {
  RoleIsometricArtwork,
  AgentIsometricArtwork,
} from './VisualCardArtwork';
import { PromptPersonalNoteBox } from './PromptPersonalNoteBox';
import { LearningProgressChart } from './LearningProgressChart';
import {
  Bookmark,
  Check,
  CheckCircle2,
  Copy,
  Sparkles,
  Search,
  User,
  Briefcase,
  Target,
  BookOpen,
  Layers,
  ArrowRight,
  Trash2,
  StickyNote,
  Award,
  Columns2,
  Plus,
  Pencil,
  X,
  LayoutGrid,
  ListChecks,
} from 'lucide-react';

export interface UserProfileData {
  displayName: string;
  role: OfficeRole;
  preferredTool: AIToolName;
  dailyGoal: string;
}

interface UserProfileLearningPathViewProps {
  savedPrompts: PromptItem[];
  savedArticles: ArticleItem[];
  allPrompts: PromptItem[];
  allArticles: ArticleItem[];
  roadmap: RoadmapDay[];
  completedRoadmapDays: Record<string, boolean>;
  onToggleRoadmapDay: (dayRange: string, title?: string) => void;
  promptNotes: Record<string, string>;
  onChangePromptNote: (promptId: string, note: string) => void;
  onToggleFavoritePrompt: (promptId: string, e?: React.MouseEvent) => void;
  onToggleFavoriteArticle: (articleId: string, e?: React.MouseEvent) => void;
  onOpenPromptModal: (prompt: PromptItem) => void;
  onOpenArticleModal: (article: ArticleItem) => void;
  onQuickCopyPrompt: (prompt: PromptItem) => void;
  quickCopiedId: string | null;
  comparePromptIds: string[];
  onToggleComparePrompt: (promptId: string, e?: React.MouseEvent) => void;
  onNavigateToPrompts: () => void;
  onNavigateToArticles: () => void;
  onNavigateToRoadmap: () => void;
}

const ALL_ROLES: OfficeRole[] = [
  'Kế toán',
  'Nhân sự',
  'Hành chính',
  'Sales',
  'Marketing',
  'Trợ lý & Quản lý',
];

const DEFAULT_PROFILE: UserProfileData = {
  displayName: 'Chuyên viên Văn phòng AI',
  role: 'Kế toán',
  preferredTool: 'Claude',
  dailyGoal: 'Tiết kiệm 60 phút xử lý báo cáo, email & số liệu mỗi ngày',
};

export const UserProfileLearningPathView: React.FC<
  UserProfileLearningPathViewProps
> = ({
  savedPrompts,
  savedArticles,
  allPrompts,
  allArticles,
  roadmap,
  completedRoadmapDays,
  onToggleRoadmapDay,
  promptNotes,
  onChangePromptNote,
  onToggleFavoritePrompt,
  onToggleFavoriteArticle,
  onOpenPromptModal,
  onOpenArticleModal,
  onQuickCopyPrompt,
  quickCopiedId,
  comparePromptIds,
  onToggleComparePrompt,
  onNavigateToPrompts,
  onNavigateToArticles,
  onNavigateToRoadmap,
}) => {
  // User Profile persisted in localStorage
  const [profile, setProfile] = useState<UserProfileData>(() => {
    try {
      const raw = localStorage.getItem('aicongso_user_profile');
      return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [draftProfile, setDraftProfile] = useState<UserProfileData>(profile);

  // Mastered items in 'My Learning Path' persisted in localStorage
  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('aicongso_learning_mastered');
      return raw ? JSON.parse(raw) : ['prompt-01'];
    } catch {
      return ['prompt-01'];
    }
  });

  const [activeTab, setActiveTab] = useState<
    'all' | 'prompts' | 'articles' | 'notes' | 'recommended'
  >('all');
  const [roleFilter, setRoleFilter] = useState<OfficeRole | 'Tất cả'>('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('aicongso_user_profile', JSON.stringify(profile));
    } catch {
      // ignore storage errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'aicongso_learning_mastered',
        JSON.stringify(masteredIds)
      );
    } catch {
      // ignore storage errors
    }
  }, [masteredIds]);

  const toggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyArticleGoodPrompt = (article: ArticleItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(article.goodPrompt);
    setCopiedArticleId(article.id);
    setTimeout(() => setCopiedArticleId(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      displayName: draftProfile.displayName.trim() || DEFAULT_PROFILE.displayName,
      role: draftProfile.role,
      preferredTool: draftProfile.preferredTool,
      dailyGoal: draftProfile.dailyGoal.trim() || DEFAULT_PROFILE.dailyGoal,
    });
    setIsEditingProfile(false);
  };

  // Filtered favorite prompts
  const filteredSavedPrompts = useMemo(() => {
    return savedPrompts.filter((p) => {
      const note = promptNotes[p.id] || '';
      const matchesRole = roleFilter === 'Tất cả' || p.role === roleFilter;
      const matchesNotesTab = activeTab !== 'notes' || note.trim().length > 0;
      const matchesSearch =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesNotesTab && matchesSearch;
    });
  }, [savedPrompts, promptNotes, roleFilter, activeTab, searchQuery]);

  // Filtered bookmarked articles
  const filteredSavedArticles = useMemo(() => {
    return savedArticles.filter((a) => {
      const matchesRole = roleFilter === 'Tất cả' || a.role === roleFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [savedArticles, roleFilter, searchQuery]);

  // Stats
  const totalSavedItems = savedPrompts.length + savedArticles.length;
  const savedItemIds = useMemo(
    () => new Set([...savedPrompts.map((p) => p.id), ...savedArticles.map((a) => a.id)]),
    [savedPrompts, savedArticles]
  );
  const masteredSavedCount = useMemo(
    () => masteredIds.filter((id) => savedItemIds.has(id)).length,
    [masteredIds, savedItemIds]
  );
  const learningPathMasteryPct =
    totalSavedItems > 0 ? Math.round((masteredSavedCount / totalSavedItems) * 100) : 0;

  const roadmapCompletedCount = Object.values(completedRoadmapDays).filter(Boolean).length;
  const roadmapPct = Math.round((roadmapCompletedCount / roadmap.length) * 100);

  const notesCount = useMemo(
    () =>
      Object.values(promptNotes).filter((n) => typeof n === 'string' && n.trim().length > 0)
        .length,
    [promptNotes]
  );

  // Recommended un-saved items for the user's profile role
  const recommendedRolePrompts = useMemo(() => {
    return allPrompts
      .filter((p) => p.role === profile.role && !savedItemIds.has(p.id))
      .slice(0, 3);
  }, [allPrompts, profile.role, savedItemIds]);

  const recommendedRoleArticles = useMemo(() => {
    return allArticles
      .filter((a) => a.role === profile.role && !savedItemIds.has(a.id))
      .slice(0, 2);
  }, [allArticles, profile.role, savedItemIds]);

  const nextRoadmapStep = useMemo(() => {
    return roadmap.find((step) => !completedRoadmapDays[step.dayRange]) || roadmap[0];
  }, [roadmap, completedRoadmapDays]);

  return (
    <div className="space-y-8">
      {/* ================================================================= */}
      {/* 1. USER PROFILE AREA HEADER & PERSONALIZED KPI METRICS            */}
      {/* ================================================================= */}
      <section className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* 3D Role Avatar Badge */}
            <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl border border-emerald-500/40 shadow-md">
              <RoleIsometricArtwork role={profile.role} className="h-full w-full" />
              <span className="absolute bottom-1 right-1 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
                <User className="h-3.5 w-3.5" />
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <Sparkles className="w-3 h-3" />
                  Khu vực Cá nhân · My Learning Path
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <Briefcase className="w-3 h-3 text-emerald-600" />
                  Phòng ban: {profile.role}
                </span>
                <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  AI ưu tiên: {profile.preferredTool}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {profile.displayName}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <Target className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mục tiêu hàng ngày: {profile.dailyGoal}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setDraftProfile(profile);
                setIsEditingProfile((prev) => !prev);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              {isEditingProfile ? 'Đóng chỉnh sửa' : 'Tùy chỉnh hồ sơ'}
            </button>
            <button
              type="button"
              onClick={onNavigateToPrompts}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Thêm Prompt vào Lộ trình
            </button>
          </div>
        </div>

        {/* Inline Profile Editor */}
        {isEditingProfile && (
          <form
            onSubmit={handleSaveProfile}
            className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Cập nhật Hồ sơ & Mục tiêu ứng dụng AI hàng ngày
              </h2>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Tên hiển thị của bạn
                </label>
                <input
                  type="text"
                  value={draftProfile.displayName}
                  onChange={(e) =>
                    setDraftProfile((prev) => ({ ...prev, displayName: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phòng ban chuyên môn
                </label>
                <select
                  value={draftProfile.role}
                  onChange={(e) =>
                    setDraftProfile((prev) => ({
                      ...prev,
                      role: e.target.value as OfficeRole,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                >
                  {ALL_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Công cụ AI dùng chính
                </label>
                <select
                  value={draftProfile.preferredTool}
                  onChange={(e) =>
                    setDraftProfile((prev) => ({
                      ...prev,
                      preferredTool: e.target.value as AIToolName,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                >
                  {(['Claude', 'ChatGPT', 'Gemini', 'Codex'] as const).map((tool) => (
                    <option key={tool} value={tool}>
                      {tool}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Mục tiêu công việc hàng ngày
                </label>
                <input
                  type="text"
                  value={draftProfile.dailyGoal}
                  onChange={(e) =>
                    setDraftProfile((prev) => ({ ...prev, dailyGoal: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Lưu hồ sơ cá nhân
              </button>
            </div>
          </form>
        )}

        {/* 4 Personalized Learning & Workspace KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Prompt Yêu thích</span>
              <Bookmark className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {savedPrompts.length}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Mẫu câu lệnh truy cập nhanh
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Bài viết Đã ghim</span>
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {savedArticles.length}
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Tình huống mẫu & quy trình
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Mức độ Thành thạo</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-1.5 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              {masteredSavedCount}/{totalSavedItems}{' '}
              <span className="text-xs font-bold text-slate-500">
                ({learningPathMasteryPct}%)
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${learningPathMasteryPct}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Ghi chú & Lộ trình 30 ngày</span>
              <StickyNote className="w-4 h-4 text-amber-500" />
            </div>
            <div className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {notesCount} ghi chú · {roadmapPct}%
            </div>
            <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
              Đã xong {roadmapCompletedCount}/{roadmap.length} chặng 30 ngày
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. RECHARTS INTERACTIVE PROGRESS VISUALIZATION (WEEK / MONTH)     */}
      {/* ================================================================= */}
      <section>
        <LearningProgressChart
          completedPromptsCount={Math.max(savedPrompts.length, masteredSavedCount)}
          completedArticlesCount={savedArticles.length}
          roadmapCompletedCount={roadmapCompletedCount}
          onLogPractice={onNavigateToPrompts}
        />
      </section>

      {/* ================================================================= */}
      {/* 3. 'MY LEARNING PATH' AGGREGATED PERSONALIZED DASHBOARD           */}
      {/* ================================================================= */}
      <section className="space-y-6">
        {/* Dashboard Toolbar */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 space-y-4 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                My Learning Path · Lộ trình Học tập & Bàn làm việc Hàng ngày
              </div>
              <h2 className="mt-0.5 font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Tổng hợp Prompt Yêu thích & Bài viết Đã lưu của bạn ({totalSavedItems})
              </h2>
            </div>

            {/* Search & View Switcher */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm trong lộ trình đã lưu..."
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-8 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
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

              <div
                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-1"
                role="group"
                aria-label="Chế độ hiển thị"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Thẻ 3D
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    viewMode === 'compact'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ListChecks className="w-3.5 h-3.5" />
                  Bàn làm việc gọn
                </button>
              </div>
            </div>
          </div>

          {/* Filter Tabs + Role Select */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="inline-flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Tất cả đã lưu ({totalSavedItems})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('prompts')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                  activeTab === 'prompts'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Prompt Yêu thích ({savedPrompts.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('articles')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                  activeTab === 'articles'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Bài viết Đã ghim ({savedArticles.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('notes')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                  activeTab === 'notes'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <StickyNote className="w-3.5 h-3.5" />
                Có ghi chú riêng ({notesCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('recommended')}
                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                  activeTab === 'recommended'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Gợi ý cho {profile.role}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                aria-label="Lọc lộ trình theo phòng ban"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as OfficeRole | 'Tất cả')}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
              >
                <option value="Tất cả">Phòng ban: Tất cả ({totalSavedItems})</option>
                {ALL_ROLES.map((r) => (
                  <option key={r} value={r}>
                    Phòng ban: {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Empty State when nothing is saved */}
        {totalSavedItems === 0 && activeTab !== 'recommended' && (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <Bookmark className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Lộ trình Học tập Cá nhân (My Learning Path) của bạn đang trống
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Hãy đánh dấu yêu thích các mẫu Prompt hoặc bài viết tình huống để gom về bảng điều khiển làm việc hàng ngày tại đây.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onNavigateToPrompts}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
              >
                Khám phá Thư viện Prompt
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onNavigateToArticles}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                Xem Tình huống mẫu
              </button>
            </div>
          </div>
        )}

        {/* =============================================================== */}
        {/* SECTION A: FAVORITE PROMPTS IN MY LEARNING PATH                 */}
        {/* =============================================================== */}
        {(activeTab === 'all' || activeTab === 'prompts' || activeTab === 'notes') &&
          filteredSavedPrompts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white">
                    1
                  </span>
                  <span>
                    Prompt Yêu thích Dùng Hàng Ngày ({filteredSavedPrompts.length})
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToPrompts}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  + Thêm từ Thư viện Prompt →
                </button>
              </div>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredSavedPrompts.map((p) => {
                    const isMastered = masteredIds.includes(p.id);
                    const compareIdx = comparePromptIds.indexOf(p.id);
                    const isCompared = compareIdx !== -1;
                    const isCopied = quickCopiedId === p.id;

                    return (
                      <article
                        key={`lp-prompt-${p.id}`}
                        onClick={() => onOpenPromptModal(p)}
                        className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-xl transition-all ${
                          isMastered
                            ? 'border-emerald-500/60 bg-emerald-50/10 dark:bg-emerald-950/10'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="relative">
                            {p.agentType ? (
                              <AgentIsometricArtwork
                                agentType={p.agentType}
                                className="h-40 w-full rounded-2xl"
                              />
                            ) : (
                              <RoleIsometricArtwork
                                role={p.role}
                                className="h-40 w-full rounded-2xl"
                              />
                            )}

                            {/* Top-left Mastery Toggle */}
                            <button
                              type="button"
                              onClick={(e) => toggleMastered(p.id, e)}
                              className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-xl border px-2.5 py-1 text-[10px] font-bold shadow-md transition-colors cursor-pointer ${
                                isMastered
                                  ? 'bg-emerald-600 border-emerald-500 text-white'
                                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                              }`}
                              title="Đánh dấu đã áp dụng thành thạo trong công việc"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isMastered ? 'Đã thành thạo' : 'Đánh dấu thành thạo'}</span>
                            </button>

                            {/* Top-right Remove from Favorites */}
                            <button
                              type="button"
                              onClick={(e) => onToggleFavoritePrompt(p.id, e)}
                              title="Bỏ khỏi Lộ trình yêu thích"
                              className="absolute top-3 right-3 h-8 w-8 rounded-xl flex items-center justify-center bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Bottom-left Quick Compare Checkbox */}
                            <label
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[10px] font-bold shadow-md transition-colors cursor-pointer select-none ${
                                isCompared
                                  ? 'bg-emerald-600 border-emerald-500 text-white'
                                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isCompared}
                                onChange={() => onToggleComparePrompt(p.id)}
                                className="h-3 w-3 rounded accent-emerald-500 cursor-pointer"
                              />
                              <span>
                                {isCompared ? `So sánh #${compareIdx + 1}` : 'So sánh'}
                              </span>
                            </label>
                          </div>

                          <div className="p-3 pt-4">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                {p.role}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{p.level}</span>
                              <span aria-hidden="true">·</span>
                              <span>Công cụ: {p.recommendedTools.join(', ')}</span>
                            </div>

                            <h4 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                              {p.title}
                            </h4>

                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {p.situation}
                            </p>

                            <PromptPersonalNoteBox
                              promptId={p.id}
                              note={promptNotes[p.id] || ''}
                              onChangeNote={onChangePromptNote}
                              compact
                            />
                          </div>
                        </div>

                        <div className="px-3 pb-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                            Điền biến & chạy
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickCopyPrompt(p);
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-emerald-600'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Đã chép!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy nhanh</span>
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                /* Compact Daily Workspace Table/List View */
                <div className="space-y-2.5">
                  {filteredSavedPrompts.map((p) => {
                    const isMastered = masteredIds.includes(p.id);
                    const isCopied = quickCopiedId === p.id;
                    const note = promptNotes[p.id] || '';

                    return (
                      <div
                        key={`lp-compact-prompt-${p.id}`}
                        onClick={() => onOpenPromptModal(p)}
                        className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs">
                            <span className="rounded-lg bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 font-bold text-emerald-700 dark:text-emerald-300">
                              {p.role}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400">
                              {p.level} · Khuyên dùng: {p.recommendedTools.join(', ')}
                            </span>
                            {isMastered && (
                              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Đã thành thạo
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600">
                            {p.title}
                          </h4>
                          {note && (
                            <p className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-lg px-2.5 py-1 inline-block">
                              <strong>Ghi chú riêng:</strong> {note}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => toggleMastered(p.id, e)}
                            className={`rounded-xl border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                              isMastered
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {isMastered ? '✓ Thành thạo' : 'Đánh dấu xong'}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onQuickCopyPrompt(p);
                            }}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold text-white cursor-pointer ${
                              isCopied
                                ? 'bg-emerald-600'
                                : 'bg-slate-900 dark:bg-emerald-600 hover:opacity-90'
                            }`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                Đã chép
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                Copy mẫu
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={(e) => onToggleFavoritePrompt(p.id, e)}
                            className="rounded-xl border border-slate-200 dark:border-slate-700 p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                            title="Bỏ lưu"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        {/* =============================================================== */}
        {/* SECTION B: BOOKMARKED ARTICLES & VISUAL CASE STUDIES            */}
        {/* =============================================================== */}
        {(activeTab === 'all' || activeTab === 'articles') &&
          filteredSavedArticles.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                    2
                  </span>
                  <span>
                    Bài viết & Tình huống Mẫu Đã Ghim ({filteredSavedArticles.length})
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToArticles}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  + Khám phá thêm Tình huống mẫu →
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredSavedArticles.map((art) => {
                  const isMastered = masteredIds.includes(art.id);
                  const isCopied = copiedArticleId === art.id;

                  return (
                    <article
                      key={`lp-art-${art.id}`}
                      onClick={() => onOpenArticleModal(art)}
                      className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-xl transition-all ${
                        isMastered
                          ? 'border-emerald-500/60 bg-emerald-50/10 dark:bg-emerald-950/10'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="relative">
                          <RoleIsometricArtwork
                            role={art.role}
                            className="h-40 w-full rounded-2xl"
                          />
                          <button
                            type="button"
                            onClick={(e) => toggleMastered(art.id, e)}
                            className={`absolute top-3 left-3 inline-flex items-center gap-1 rounded-xl border px-2.5 py-1 text-[10px] font-bold shadow-md transition-colors cursor-pointer ${
                              isMastered
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isMastered ? 'Đã đọc & áp dụng' : 'Đánh dấu đã học'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => onToggleFavoriteArticle(art.id, e)}
                            title="Bỏ ghim bài viết"
                            className="absolute top-3 right-3 h-8 w-8 rounded-xl flex items-center justify-center bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="p-3 pt-4">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {art.role}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{art.level}</span>
                            <span aria-hidden="true">·</span>
                            <span>{art.readTimeMinutes} phút đọc</span>
                          </div>

                          <h4 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                            {art.title}
                          </h4>

                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {art.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="px-3 pb-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                          Mở bài hướng dẫn
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleCopyArticleGoodPrompt(art, e)}
                          className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold transition-colors cursor-pointer ${
                            isCopied
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white'
                          }`}
                          title="Sao chép nhanh câu lệnh chuẩn 4 bước trong tình huống này"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Đã chép Prompt</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Prompt mẫu</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

        {/* =============================================================== */}
        {/* SECTION C: PERSONALIZED NEXT STEPS & ROLE RECOMMENDATIONS       */}
        {/* =============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
          {/* Next Step in 30-Day Roadmap */}
          {nextRoadmapStep && (
            <div className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Chặng tiếp theo trong Lộ trình 30 ngày
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {nextRoadmapStep.dayRange}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {nextRoadmapStep.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {nextRoadmapStep.objective}
                </p>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs text-slate-700 dark:text-slate-300">
                  <strong>Bài tập 15 phút hôm nay:</strong> {nextRoadmapStep.practiceTask}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() =>
                    onToggleRoadmapDay(
                      nextRoadmapStep.dayRange,
                      nextRoadmapStep.title
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {completedRoadmapDays[nextRoadmapStep.dayRange]
                    ? 'Đã hoàn thành chặng này'
                    : 'Đánh dấu hoàn thành'}
                </button>
                <button
                  type="button"
                  onClick={onNavigateToRoadmap}
                  className="text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer"
                >
                  Xem toàn bộ 30 ngày →
                </button>
              </div>
            </div>
          )}

          {/* Role-Based Suggestions to Add to Learning Path */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Gợi ý cá nhân hóa cho phòng ban {profile.role}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Bổ sung nhanh vào My Learning Path của bạn
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Bấm “+ Lưu” để ghim thẳng lên lộ trình
              </span>
            </div>

            {recommendedRolePrompts.length === 0 && recommendedRoleArticles.length === 0 ? (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                ✓ Tuyệt vời! Bạn đã lưu toàn bộ Prompt và Tình huống mẫu của phòng ban{' '}
                {profile.role} vào Lộ trình cá nhân.
              </p>
            ) : (
              <div className="space-y-2.5">
                {recommendedRolePrompts.map((p) => (
                  <div
                    key={`rec-p-${p.id}`}
                    onClick={() => onOpenPromptModal(p)}
                    className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 flex items-center justify-between gap-3 hover:border-emerald-500 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        Prompt gợi ý · {p.role} · {p.level}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {p.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => onToggleFavoritePrompt(p.id, e)}
                      className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Lưu vào Lộ trình
                    </button>
                  </div>
                ))}

                {recommendedRoleArticles.map((a) => (
                  <div
                    key={`rec-a-${a.id}`}
                    onClick={() => onOpenArticleModal(a)}
                    className="cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3.5 flex items-center justify-between gap-3 hover:border-emerald-500 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                        Tình huống mẫu · {a.role} · {a.readTimeMinutes} phút đọc
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                        {a.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => onToggleFavoriteArticle(a.id, e)}
                      className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-500 shrink-0 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Ghim bài viết
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
