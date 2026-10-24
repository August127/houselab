/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  INITIAL_ARTICLES,
  INITIAL_PROMPTS,
  INITIAL_ROADMAP,
  INITIAL_PRODUCTS,
  INITIAL_AFFILIATES,
  INITIAL_SITE_CONFIG,
  POPULAR_AI_AGENTS,
  ArticleItem,
  PromptItem,
  OfficeRole,
  Pillar,
  SkillLevel,
  AIToolName,
  AIAgentType,
  SiteConfig,
  StoreProduct,
} from './data/siteData';
import { PromptInteractiveModal } from './components/PromptInteractiveModal';
import { PromptQuickCompareModal } from './components/PromptQuickCompareModal';
import { ArticleReaderModal } from './components/ArticleReaderModal';
import { NonTechAdminView } from './components/NonTechAdminView';
import { Interactive3DOfficeScene } from './components/Interactive3DOfficeScene';
import { AIAgentCatalogSection } from './components/AIAgentCatalogSection';
import { PromptPersonalNoteBox } from './components/PromptPersonalNoteBox';
import { UserProfileLearningPathView } from './components/UserProfileLearningPathView';
import { PromptOfTheDaySection } from './components/PromptOfTheDaySection';
import { PromptImprovementModal } from './components/PromptImprovementModal';
import { PromptCommunityBenchmarkStrip } from './components/PromptCommunityBenchmark';
import { INITIAL_AI_NEWS, AINewsItem } from './data/aiNewsData';
import { AINewsView, HomeAINewsPreviewSection } from './components/AINewsView';
import { ClosedLoopCycleBanner } from './components/ClosedLoopCycleBanner';
import { AICongSoLogo } from './components/AICongSoLogo';
import { HomeBentoGrid } from './components/HomeBentoGrid';
import { AboutMeView } from './components/AboutMeView';
import {
  RoleIsometricArtwork,
  PillarIsometricArtwork,
  AgentIsometricArtwork,
} from './components/VisualCardArtwork';
import { scanSensitiveText, anonymizeSensitiveText } from './utils/privacyScanner';
import {
  Check,
  Copy,
  Search,
  ArrowRight,
  Download,
  ShieldCheck,
  ExternalLink,
  X,
  Sun,
  Moon,
  Bookmark,
  Sparkles,
  Box,
  Layers,
  CheckCircle2,
  Settings,
  Columns2,
  RotateCcw,
  User,
  Wand2,
  Newspaper,
  Keyboard,
  Command,
  CornerDownLeft,
  Menu,
  Eye,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AnimatedCopyButtonProps {
  isCopied: boolean;
  copyCount?: number;
  promptTitle?: string;
  onClick: (e: React.MouseEvent) => void;
  onCopiedToast?: (title?: string) => void;
}

const AnimatedCopyButton: React.FC<AnimatedCopyButtonProps> = ({
  isCopied,
  copyCount,
  promptTitle,
  onClick,
  onCopiedToast,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(e);
    if (onCopiedToast) {
      onCopiedToast(promptTitle);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('aicongso:prompt-copied', {
          detail: { title: promptTitle },
        })
      );
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <AnimatePresence>
        {isCopied && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.85 }}
            animate={{ opacity: 1, y: -30, scale: 1 }}
            exit={{ opacity: 0, y: -38, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="pointer-events-none absolute right-0 whitespace-nowrap rounded-lg bg-emerald-900 px-2 py-0.5 text-[10px] font-bold text-emerald-200 shadow-md z-20 tabular-nums"
          >
            ✓ +1 lượt sao chép!
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        animate={isCopied ? { scale: [1, 1.12, 1] } : { scale: 1 }}
        transition={{ duration: 0.28 }}
        className={`relative overflow-hidden inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer tabular-nums ${
          isCopied
            ? 'border-emerald-500 bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-800'
        }`}
      >
        <AnimatePresence>
          {isCopied && (
            <motion.span
              key="burst"
              initial={{ scale: 0.3, opacity: 0.6 }}
              animate={{ scale: 2.3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 rounded-xl bg-white"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.4, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 520, damping: 20 }}
              className="inline-flex items-center gap-1"
            >
              <Check className="h-3.5 w-3.5 stroke-[2.75]" />
              <span>
                Đã chép{typeof copyCount === 'number' ? ` (${copyCount.toLocaleString('vi-VN')})` : ''}
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.14 }}
              className="inline-flex items-center gap-1"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>
                Copy{typeof copyCount === 'number' ? ` · ${copyCount.toLocaleString('vi-VN')}` : ''}
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

type ActivePage =
  | 'home'
  | 'news'
  | 'roadmap'
  | 'articles'
  | 'prompts'
  | 'resources'
  | 'gift'
  | 'profile'
  | 'admin'
  | 'about';

const ALL_ROLES: OfficeRole[] = [
  'Kế toán',
  'Nhân sự',
  'Hành chính',
  'Sales',
  'Marketing',
  'Trợ lý & Quản lý',
];

const ALL_PILLARS: Pillar[] = [
  'Nhập môn',
  'Kỹ năng nền',
  'Công thức theo vị trí',
  'Công cụ và so sánh',
];

const ALL_LEVELS: SkillLevel[] = ['Cơ bản', 'Trung cấp', 'Nâng cao'];
const ALL_TOOLS: AIToolName[] = ['Claude', 'ChatGPT', 'Gemini', 'Codex'];

const PAGE_SEO_META: Record<ActivePage, { title: string; description: string; breadcrumb: string }> = {
  home: {
    title: 'AI Công Sở — Chu Trình Học Tập & Ứng Dụng AI Khép Kín Cho Dân Văn Phòng',
    description:
      'Chu trình 4 bước làm chủ AI công sở: Cập nhật tin tức AI mới nhất, phân tích tình huống mẫu, thực hành thư viện Prompt 3D và lưu lộ trình cá nhân hóa.',
    breadcrumb: 'Trang chủ & Chu trình 4 bước',
  },
  news: {
    title: 'Tin Tức & Xu Hướng AI Công Sở Mới Nhất — AI Công Sở',
    description:
      'Cập nhật tính năng mới nhất của Claude, ChatGPT, Gemini, AI Agent và cách chuyển hóa trực tiếp thành câu lệnh thực hành cho Kế toán, HR, Sales, Hành chính.',
    breadcrumb: 'Bước 1: Tin tức & Xu hướng AI',
  },
  roadmap: {
    title: 'Lộ Trình 30 Ngày Làm Chủ AI Văn Phòng — AI Công Sở',
    description:
      'Lộ trình 30 ngày thực hành AI từng bước từ cơ bản đến tự động hóa quy trình báo cáo, email, Excel dành cho người không chuyên công nghệ.',
    breadcrumb: 'Bước 2: Lộ trình 30 ngày',
  },
  articles: {
    title: 'Tình Huống Mẫu & Đồ Họa Ứng Dụng AI Thực Chiến — AI Công Sở',
    description:
      'So sánh trực quan kết quả thực tế giữa Claude, ChatGPT và Gemini trong các bài toán văn phòng tại Việt Nam.',
    breadcrumb: 'Bước 2: Tình huống mẫu',
  },
  prompts: {
    title: 'Thư Viện Prompt 3D Trực Quan Theo Phòng Ban — AI Công Sở',
    description:
      'Bộ câu lệnh AI chuẩn 4 bước kèm công cụ điền biến tự động và quét ẩn danh dữ liệu nhạy cảm cho Kế toán, Nhân sự, Sales, Marketing.',
    breadcrumb: 'Bước 3: Thư viện Prompt',
  },
  resources: {
    title: 'Biểu Mẫu, Sách Cẩm Nang & Công Cụ AI Khuyên Dùng — AI Công Sở',
    description:
      'Tải bộ biểu mẫu Excel kết hợp AI, sổ tay câu lệnh theo ngành và bảng phân vai công cụ AI tiết kiệm chi phí.',
    breadcrumb: 'Biểu mẫu & Công cụ',
  },
  gift: {
    title: 'Tải Miễn Phí Bộ 50 Prompt Thực Chiến Cho Dân Văn Phòng — AI Công Sở',
    description:
      'Nhận ngay bộ 50 câu lệnh AI tiếng Việt chọn lọc giúp tiết kiệm 5 giờ làm việc mỗi tuần.',
    breadcrumb: 'Tải 50 Prompt miễn phí',
  },
  profile: {
    title: 'Hồ Sơ Cá Nhân & Lộ Trình Học Tập (My Learning Path) — AI Công Sở',
    description:
      'Bảng điều khiển cá nhân tổng hợp các mẫu Prompt yêu thích, bài viết đã lưu, ghi chú riêng và tiến độ thực hành AI hàng ngày.',
    breadcrumb: 'Bước 4: Hồ sơ & My Learning Path',
  },
  about: {
    title: 'Về Tôi & Sứ Mệnh AI Công Sở — Dùng AI Xong Việc Sớm Hơn',
    description:
      'Câu chuyện thực tế và 3 nguyên tắc làm việc cốt lõi của dự án AI Công Sở: Xong việc thật trước, bảo mật dữ liệu và chuẩn hóa tiếng Việt thực dụng.',
    breadcrumb: 'Về tôi',
  },
  admin: {
    title: 'Quản Trị Nội Dung Non-Tech — AI Công Sở',
    description: 'Giao diện quản lý bài viết, câu lệnh mẫu và cấu hình dành cho quản trị viên.',
    breadcrumb: 'Quản trị hệ thống',
  },
};

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Theme state ('light' | 'dark') persisted in localStorage
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('aicongso_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('aicongso_theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // Dynamic SEO Title & Meta Description per active page
  useEffect(() => {
    const meta = PAGE_SEO_META[activePage] || PAGE_SEO_META.home;
    document.title = meta.title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', meta.description);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Persistent state for Non-Tech CMS
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('aicongso_config');
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONFIG;
    } catch {
      return INITIAL_SITE_CONFIG;
    }
  });

  const [prompts, setPrompts] = useState<PromptItem[]>(() => {
    try {
      const saved = localStorage.getItem('aicongso_prompts');
      if (!saved) return INITIAL_PROMPTS;
      const parsed: PromptItem[] = JSON.parse(saved);
      const initialMap = new Map(INITIAL_PROMPTS.map((item) => [item.id, item]));
      const merged = parsed.map((p) => {
        const ref = initialMap.get(p.id);
        if (ref) {
          return {
            ...p,
            updatedAt: p.updatedAt === '10/2026' ? ref.updatedAt : p.updatedAt,
            agentType: p.agentType || ref.agentType,
            viewCount: p.viewCount !== undefined ? p.viewCount : (ref.viewCount || 0),
          };
        }
        return p;
      });
      const existingIds = new Set(merged.map((p) => p.id));
      const newDefaults = INITIAL_PROMPTS.filter((p) => !existingIds.has(p.id));
      return [...newDefaults, ...merged];
    } catch {
      return INITIAL_PROMPTS;
    }
  });

  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    try {
      const saved = localStorage.getItem('aicongso_articles');
      if (!saved) return INITIAL_ARTICLES;
      const parsed: ArticleItem[] = JSON.parse(saved);
      const initialMap = new Map(INITIAL_ARTICLES.map((item) => [item.id, item]));
      const merged = parsed.map((a) => {
        const ref = initialMap.get(a.id);
        if (ref) {
          return {
            ...a,
            viewCount: a.viewCount !== undefined ? a.viewCount : (ref.viewCount || 0),
          };
        }
        return a;
      });
      const existingIds = new Set(merged.map((a) => a.id));
      const newDefaults = INITIAL_ARTICLES.filter((a) => !existingIds.has(a.id));
      return [...newDefaults, ...merged];
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [completedRoadmapDays, setCompletedRoadmapDays] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aicongso_roadmap_done');
      return saved ? JSON.parse(saved) : { 'Ngày 1 – 3': true };
    } catch {
      return { 'Ngày 1 – 3': true };
    }
  });

  const [subscribers, setSubscribers] = useState<
    { email: string; role: string; createdAt: string }[]
  >(() => {
    try {
      const saved = localStorage.getItem('aicongso_subscribers');
      return saved
        ? JSON.parse(saved)
        : [
            { email: 'lan.hcns@minhphat.vn', role: 'Nhân sự', createdAt: '2026-10-18' },
            { email: 'hoang.ketoan@tinthanh.com.vn', role: 'Kế toán', createdAt: '2026-10-19' },
          ];
    } catch {
      return [];
    }
  });

  // Persistent Favorites ('Đánh dấu yêu thích') in localStorage
  const [favoritePromptIds, setFavoritePromptIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aicongso_fav_prompts');
      return saved ? JSON.parse(saved) : ['prompt-01', 'prompt-02'];
    } catch {
      return ['prompt-01', 'prompt-02'];
    }
  });

  const [favoriteArticleIds, setFavoriteArticleIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aicongso_fav_articles');
      return saved ? JSON.parse(saved) : ['art-01'];
    } catch {
      return ['art-01'];
    }
  });

  // Persistent Personal Notes ('Ghi chú cá nhân') for each Prompt card in localStorage
  const [promptNotes, setPromptNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('aicongso_prompt_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const handleUpdatePromptNote = (promptId: string, nextNote: string) => {
    setPromptNotes((prev) => {
      const updated = { ...prev };
      if (!nextNote) {
        delete updated[promptId];
      } else {
        updated[promptId] = nextNote;
      }
      return updated;
    });
  };

  const [savedHomeTab, setSavedHomeTab] = useState<'all' | 'prompts' | 'articles'>('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Sync state with localStorage
  useEffect(() => {
    localStorage.setItem('aicongso_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('aicongso_prompts', JSON.stringify(prompts));
  }, [prompts]);

  useEffect(() => {
    localStorage.setItem('aicongso_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('aicongso_roadmap_done', JSON.stringify(completedRoadmapDays));
  }, [completedRoadmapDays]);

  useEffect(() => {
    localStorage.setItem('aicongso_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('aicongso_fav_prompts', JSON.stringify(favoritePromptIds));
  }, [favoritePromptIds]);

  useEffect(() => {
    localStorage.setItem('aicongso_fav_articles', JSON.stringify(favoriteArticleIds));
  }, [favoriteArticleIds]);

  useEffect(() => {
    localStorage.setItem('aicongso_prompt_notes', JSON.stringify(promptNotes));
  }, [promptNotes]);

  const toggleFavoritePrompt = (promptId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoritePromptIds((prev) =>
      prev.includes(promptId) ? prev.filter((id) => id !== promptId) : [promptId, ...prev]
    );
  };

  const toggleFavoriteArticle = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavoriteArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [articleId, ...prev]
    );
  };

  const [bookmarkedNewsIds, setBookmarkedNewsIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aicongso_bookmarked_news');
      return saved ? JSON.parse(saved) : ['news-01'];
    } catch {
      return ['news-01'];
    }
  });

  useEffect(() => {
    localStorage.setItem('aicongso_bookmarked_news', JSON.stringify(bookmarkedNewsIds));
  }, [bookmarkedNewsIds]);

  const toggleBookmarkNews = (newsId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedNewsIds((prev) =>
      prev.includes(newsId) ? prev.filter((id) => id !== newsId) : [newsId, ...prev]
    );
  };

  const savedPromptsList = useMemo(
    () => prompts.filter((p) => favoritePromptIds.includes(p.id)),
    [prompts, favoritePromptIds]
  );

  const savedArticlesList = useMemo(
    () => articles.filter((a) => favoriteArticleIds.includes(a.id)),
    [articles, favoriteArticleIds]
  );

  const totalSavedCount =
    savedPromptsList.length + savedArticlesList.length + bookmarkedNewsIds.length;

  // Non-intrusive Toast state for Copy Confirmation in the screen corner
  const [copyToast, setCopyToast] = useState<{ id: string; title?: string } | null>(null);

  const triggerCopyToast = (promptTitle?: string) => {
    const toastId = Math.random().toString(36).substring(2, 9);
    setCopyToast({
      id: toastId,
      title: promptTitle,
    });
  };

  useEffect(() => {
    if (!copyToast) return;
    const timer = setTimeout(() => {
      setCopyToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [copyToast]);

  useEffect(() => {
    const handleCopiedEvent = (e: Event) => {
      const detail = (e as CustomEvent<{ title?: string }>).detail;
      triggerCopyToast(detail?.title);
    };
    window.addEventListener('aicongso:prompt-copied', handleCopiedEvent);
    return () => {
      window.removeEventListener('aicongso:prompt-copied', handleCopiedEvent);
    };
  }, []);

  // Celebratory Milestone Confetti overlay state for 30-day Roadmap
  const [milestoneCelebration, setMilestoneCelebration] = useState<{
    dayRange: string;
    title: string;
  } | null>(null);

  const triggerRoadmapCelebration = (dayRange: string, milestoneTitle?: string) => {
    try {
      // Subtle, elegant celebratory confetti bursts from both sides towards center
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 60,
        origin: { x: 0.08, y: 0.72 },
        colors: ['#059669', '#10B981', '#34D399', '#F59E0B', '#38BDF8', '#6EE7B7'],
        ticks: 220,
        gravity: 1.15,
        scalar: 0.95,
        disableForReducedMotion: true,
        zIndex: 9999,
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 60,
        origin: { x: 0.92, y: 0.72 },
        colors: ['#059669', '#10B981', '#34D399', '#F59E0B', '#38BDF8', '#6EE7B7'],
        ticks: 220,
        gravity: 1.15,
        scalar: 0.95,
        disableForReducedMotion: true,
        zIndex: 9999,
      });
    } catch {
      // gracefully ignore if canvas not supported
    }

    setMilestoneCelebration({
      dayRange,
      title: milestoneTitle || 'Cột mốc thực hành AI',
    });
  };

  useEffect(() => {
    if (!milestoneCelebration) return;
    const timer = setTimeout(() => {
      setMilestoneCelebration(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [milestoneCelebration]);

  const handleToggleRoadmapDay = (dayRange: string, title?: string) => {
    setCompletedRoadmapDays((prev) => {
      const isCurrentlyDone = !!prev[dayRange];
      const willBeDone = !isCurrentlyDone;
      if (willBeDone) {
        const step = INITIAL_ROADMAP.find((s) => s.dayRange === dayRange);
        triggerRoadmapCelebration(dayRange, title || step?.title);
      }
      return {
        ...prev,
        [dayRange]: willBeDone,
      };
    });
  };

  // Filter states for Prompt Library & Articles & 3D Scene
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<OfficeRole | 'Tất cả'>('Kế toán');
  const [selectedPillar, setSelectedPillar] = useState<Pillar | 'Tất cả'>('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | 'Tất cả'>('Tất cả');
  const [selectedTool, setSelectedTool] = useState<AIToolName | 'Tất cả'>('Tất cả');
  const [selectedAgentType, setSelectedAgentType] = useState<AIAgentType | 'Tất cả'>('Tất cả');

  // Interactive Comparison Studio State
  const [heroScenario, setHeroScenario] = useState<'email' | 'meeting' | 'excel'>('email');
  const [heroTool, setHeroTool] = useState<'Claude' | 'ChatGPT' | 'Gemini'>('Claude');

  // Modals & Quick Copy states
  const [activePromptModal, setActivePromptModal] = useState<PromptItem | null>(null);
  const [activePromptModalTab, setActivePromptModalTab] = useState<'builder' | 'sample' | 'compare'>('builder');
  const [activeImprovePromptModal, setActiveImprovePromptModal] = useState<PromptItem | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<ArticleItem | null>(null);
  const [selectedStoreProduct, setSelectedStoreProduct] = useState<StoreProduct | null>(null);
  const [quickCopiedId, setQuickCopiedId] = useState<string | null>(null);

  // Lead magnet form state ("50 Prompt cho dân văn phòng")
  const [leadEmail, setLeadEmail] = useState('');
  const [leadRole, setLeadRole] = useState<OfficeRole>('Kế toán');
  const [leadError, setLeadError] = useState('');
  const [leadSuccess, setLeadSuccess] = useState(false);

  // Standalone Privacy Scrubber state in Prompt Library
  const [scrubberInput, setScrubberInput] = useState(
    'Anh Nguyễn Văn Hùng (CCCD 079088012345, SĐT 0909123456, email hung.nv@congtyabc.vn) đề nghị giảm 15% hợp đồng.'
  );

  // Order / Waitlist Modal state
  const [buyerEmail, setBuyerEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Footer Newsletter state
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubscribed, setFooterSubscribed] = useState(false);

  const [promptLibraryTab, setPromptLibraryTab] = useState<
    'all' | 'newest' | 'popular' | 'agents' | 'saved'
  >('all');

  const parsePromptTimestamp = (updatedAt: string, fallbackIndex: number): number => {
    const clean = updatedAt.replace(/Cập nhật\s*/i, '').trim();
    // Match DD/MM/YYYY
    const dmy = clean.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmy) {
      const day = parseInt(dmy[1], 10);
      const month = parseInt(dmy[2], 10) - 1;
      const year = parseInt(dmy[3], 10);
      return new Date(year, month, day).getTime() + (1000 - fallbackIndex);
    }
    // Match YYYY-MM-DD
    const ymd = clean.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (ymd) {
      return (
        new Date(
          parseInt(ymd[1], 10),
          parseInt(ymd[2], 10) - 1,
          parseInt(ymd[3], 10)
        ).getTime() +
        (1000 - fallbackIndex)
      );
    }
    // Match MM/YYYY
    const my = clean.match(/^(\d{1,2})\/(\d{4})$/);
    if (my) {
      return (
        new Date(parseInt(my[2], 10), parseInt(my[1], 10) - 1, 1).getTime() +
        (1000 - fallbackIndex)
      );
    }
    return Date.now() - fallbackIndex * 1000;
  };

  const isRecentPrompt = (p: PromptItem, idx = 0): boolean => {
    const ts = parsePromptTimestamp(p.updatedAt, idx);
    const cutoff = new Date(2026, 9, 18).getTime(); // 18/10/2026 onwards
    return ts >= cutoff || !p.id.startsWith('prompt-0');
  };

  const recentPromptsCount = useMemo(
    () => prompts.filter((p, idx) => isRecentPrompt(p, idx)).length,
    [prompts]
  );

  const totalPromptCopies = useMemo(
    () => prompts.reduce((sum, item) => sum + item.copyCount, 0),
    [prompts]
  );

  const topPopularPromptIds = useMemo(() => {
    const sorted = [...prompts].sort((a, b) => b.copyCount - a.copyCount);
    return new Set(sorted.slice(0, 3).map((p) => p.id));
  }, [prompts]);

  const agentPromptsCount = useMemo(
    () => prompts.filter((p) => !!p.agentType).length,
    [prompts]
  );

  const filteredPrompts = useMemo(() => {
    const indexed = prompts.map((p, idx) => ({ p, idx }));
    const matched = indexed.filter(({ p, idx }) => {
      const userNote = promptNotes[p.id] || '';
      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.situation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.template.toLowerCase().includes(searchQuery.toLowerCase()) ||
        userNote.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.agentType && p.agentType.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchRole = selectedRole === 'Tất cả' || p.role === selectedRole;
      const matchPillar = selectedPillar === 'Tất cả' || p.pillar === selectedPillar;
      const matchLevel = selectedLevel === 'Tất cả' || p.level === selectedLevel;
      const matchTool =
        selectedTool === 'Tất cả' || p.recommendedTools.includes(selectedTool);
      const matchAgent =
        selectedAgentType === 'Tất cả'
          ? promptLibraryTab !== 'agents' || !!p.agentType
          : p.agentType === selectedAgentType;
      const matchFav =
        (!showOnlyFavorites && promptLibraryTab !== 'saved') ||
        favoritePromptIds.includes(p.id);
      const matchNewestTab =
        promptLibraryTab !== 'newest' || isRecentPrompt(p, idx);

      return (
        matchQuery &&
        matchRole &&
        matchPillar &&
        matchLevel &&
        matchTool &&
        matchAgent &&
        matchFav &&
        matchNewestTab
      );
    });

    if (promptLibraryTab === 'newest') {
      matched.sort(
        (a, b) =>
          parsePromptTimestamp(b.p.updatedAt, b.idx) -
          parsePromptTimestamp(a.p.updatedAt, a.idx)
      );
    } else if (promptLibraryTab === 'popular') {
      matched.sort((a, b) => b.p.copyCount - a.p.copyCount);
    }

    return matched.map((item) => item.p);
  }, [
    prompts,
    searchQuery,
    selectedRole,
    selectedPillar,
    selectedLevel,
    selectedTool,
    selectedAgentType,
    showOnlyFavorites,
    promptLibraryTab,
    favoritePromptIds,
    promptNotes,
  ]);

  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchQuery =
        !searchQuery.trim() ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.situationContext.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = selectedRole === 'Tất cả' || a.role === selectedRole;
      const matchPillar = selectedPillar === 'Tất cả' || a.pillar === selectedPillar;
      const matchLevel = selectedLevel === 'Tất cả' || a.level === selectedLevel;
      const matchTool = selectedTool === 'Tất cả' || a.tools.includes(selectedTool);
      const matchFav = !showOnlyFavorites || favoriteArticleIds.includes(a.id);
      return (
        matchQuery &&
        matchRole &&
        matchPillar &&
        matchLevel &&
        matchTool &&
        matchFav
      );
    });
  }, [
    articles,
    searchQuery,
    selectedRole,
    selectedPillar,
    selectedLevel,
    selectedTool,
    showOnlyFavorites,
    favoriteArticleIds,
  ]);

  const [comparePromptIds, setComparePromptIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [focusedPromptId, setFocusedPromptId] = useState<string | null>(null);
  const [shortcutFeedback, setShortcutFeedback] = useState<string | null>(null);

  const triggerShortcutFeedback = (message: string) => {
    setShortcutFeedback(message);
    setTimeout(() => {
      setShortcutFeedback((prev) => (prev === message ? null : prev));
    }, 2200);
  };

  const handleToggleComparePrompt = (promptId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setComparePromptIds((prev) => {
      if (prev.includes(promptId)) {
        const next = prev.filter((id) => id !== promptId);
        if (next.length < 2) {
          setIsCompareModalOpen(false);
        }
        return next;
      }
      const next = prev.length >= 2 ? [prev[1], promptId] : [...prev, promptId];
      if (next.length === 2) {
        setIsCompareModalOpen(true);
      }
      return next;
    });
  };

  const selectedComparePrompts = useMemo((): [PromptItem, PromptItem] | null => {
    if (comparePromptIds.length !== 2) return null;
    const first = prompts.find((p) => p.id === comparePromptIds[0]);
    const second = prompts.find((p) => p.id === comparePromptIds[1]);
    if (!first || !second) return null;
    return [first, second];
  }, [comparePromptIds, prompts]);

  const handleQuickCopyPrompt = (p: PromptItem) => {
    let compiled = p.template;
    p.variables.forEach((v) => {
      compiled = compiled.split(`[${v.key}]`).join(v.defaultValue);
    });
    navigator.clipboard.writeText(compiled);
    setQuickCopiedId(p.id);
    handleRecordCopy(p.id);
    triggerCopyToast(p.title);
    setTimeout(() => setQuickCopiedId(null), 2000);
  };

  const handlePromptCardKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    p: PromptItem
  ) => {
    const key = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && key === 'c') {
      const selectedText = window.getSelection()?.toString();
      if (!selectedText) {
        e.preventDefault();
        e.stopPropagation();
        handleQuickCopyPrompt(p);
        triggerShortcutFeedback(`Đã sao chép "${p.title}" (Ctrl+C)`);
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      const willSelect = !comparePromptIds.includes(p.id);
      handleToggleComparePrompt(p.id);
      triggerShortcutFeedback(
        willSelect
          ? `Đã thêm "${p.title}" vào chế độ so sánh (Ctrl+S)`
          : `Đã bỏ "${p.title}" khỏi chế độ so sánh (Ctrl+S)`
      );
      return;
    }

    if (
      (e.key === 'Enter' || e.key === ' ') &&
      e.target === e.currentTarget
    ) {
      e.preventDefault();
      setActivePromptModal(p);
    }
  };

  // Global Keyboard Shortcuts (Escape to close modals, '/' to focus search, '?' for shortcuts sheet)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // 1. ESC to close modals
      if (e.key === 'Escape') {
        if (activePromptModal) setActivePromptModal(null);
        if (isCompareModalOpen) setIsCompareModalOpen(false);
        if (activeImprovePromptModal) setActiveImprovePromptModal(null);
        if (activeArticleModal) setActiveArticleModal(null);
        if (selectedStoreProduct) setSelectedStoreProduct(null);
        return;
      }

      // Check if user is typing in an input, textarea or contentEditable
      const target = e.target as HTMLElement | null;
      const isInput =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      // 2. '/' to quickly jump to and focus prompt search
      if (e.key === '/' && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setActivePage('prompts');
        setTimeout(() => {
          const searchInput = document.getElementById('prompt-library-search-input');
          if (searchInput) {
            searchInput.focus();
            triggerShortcutFeedback('Đã chuyển con trỏ vào ô tìm kiếm Prompt (/)');
          }
        }, 60);
        return;
      }

      // 3. '?' to scroll to Keyboard Shortcuts reference table in footer
      if (e.key === '?' && !isInput && !e.ctrlKey && !e.metaKey) {
        const shortcutsEl = document.getElementById('keyboard-shortcuts');
        if (shortcutsEl) {
          shortcutsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          triggerShortcutFeedback('Bảng chú giải phím tắt (?)');
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [
    activePromptModal,
    isCompareModalOpen,
    activeImprovePromptModal,
    activeArticleModal,
    selectedStoreProduct,
  ]);

  const handleRecordCopy = (promptId: string) => {
    setPrompts((prev) =>
      prev.map((item) =>
        item.id === promptId ? { ...item, copyCount: item.copyCount + 1 } : item
      )
    );
  };

  const handleRecordPromptView = (promptId: string) => {
    setPrompts((prev) =>
      prev.map((item) =>
        item.id === promptId
          ? { ...item, viewCount: (item.viewCount || 0) + 1 }
          : item
      )
    );
  };

  const handleRecordArticleView = (articleId: string) => {
    setArticles((prev) =>
      prev.map((item) =>
        item.id === articleId
          ? { ...item, viewCount: (item.viewCount || 0) + 1 }
          : item
      )
    );
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(leadEmail.trim())) {
      setLeadError('Vui lòng nhập địa chỉ email hợp lệ (ví dụ: ten@congty.vn).');
      return;
    }
    setLeadError('');
    setLeadSuccess(true);
    setSubscribers((prev) => [
      {
        email: leadEmail.trim(),
        role: leadRole,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
  };

  const handleDownload50PromptsTxt = () => {
    const content = [
      'CẨM NANG 50 PROMPT THỰC CHIẾN CHO NHÂN VIÊN VĂN PHÒNG VIỆT NAM',
      'Phiên bản cập nhật: Tháng 10/2026 — Biên soạn bởi AI Công Sở',
      '====================================================================',
      '',
      'NGUYÊN TẮC CỐT LÕI (CÔNG THỨC 4 BƯỚC):',
      '1. Vai trò (Role) -> 2. Bối cảnh (Context) -> 3. Yêu cầu (Task) -> 4. Định dạng (Format)',
      '',
      ...prompts.map(
        (p, idx) =>
          `--- MẪU SỐ ${idx + 1}: ${p.title.toUpperCase()} (${p.role} · ${p.level}) ---\n` +
          `Tình huống: ${p.situation}\n` +
          `Công cụ khuyên dùng: ${p.recommendedTools.join(', ')}\n` +
          `Câu lệnh mẫu:\n${p.template}\n` +
          `Lưu ý bảo mật: ${p.securityTip}\n`
      ),
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Bo-50-Prompt-AI-Cong-So-Viet-Nam.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetAllData = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setPrompts(INITIAL_PROMPTS);
    setArticles(INITIAL_ARTICLES);
    localStorage.removeItem('aicongso_config');
    localStorage.removeItem('aicongso_prompts');
    localStorage.removeItem('aicongso_articles');
  };

  const roadmapProgressCount = Object.values(completedRoadmapDays).filter(Boolean).length;
  const roadmapProgressPct = Math.round(
    (roadmapProgressCount / INITIAL_ROADMAP.length) * 100
  );

  const scrubberFindings = useMemo(
    () => scanSensitiveText(scrubberInput),
    [scrubberInput]
  );

  const heroDemoData = {
    email: {
      role: 'Sales' as OfficeRole,
      label: 'Tình huống 1: Từ chối giảm giá 15% nhưng giữ được hợp đồng',
      prompt:
        'Đóng vai Trưởng nhóm Sales B2B. Khách quen Minh Phát xin giảm thêm 15% gói bảo trì nhưng công ty đã sát giá gốc. Hãy soạn phản hồi giữ nguyên giá nhưng tặng thêm 1 đợt bảo dưỡng định kỳ, giọng lịch sự kiểu công sở Việt Nam.',
      outputs: {
        Claude:
          '“Chào anh Tuấn, Cảm ơn anh luôn tin tưởng bên em. Do định mức linh kiện chính hãng quý này đã sát giá gốc để đảm bảo cam kết xử lý trong 2 giờ, bên em chưa thể giảm trực tiếp trên đơn giá. Để hỗ trợ tối đa cho Minh Phát, em xin đề xuất tặng thêm 01 đợt bảo dưỡng toàn diện miễn phí...”',
        ChatGPT:
          '“Chủ đề: Phản hồi đề xuất ngân sách & Phương án ưu đãi bổ sung cho Minh Phát. Chúng tôi đưa ra 2 lựa chọn: (1) Giữ nguyên đơn giá + Tặng 1 kỳ bảo dưỡng; (2) Chia tiến độ thanh toán làm 2 đợt 50%-50%...”',
        Gemini:
          '“Kính gửi Anh Tuấn, Sau khi rà soát định mức kỹ thuật, phương án tối ưu nhất để đảm bảo chất lượng vật tư cho Minh Phát là giữ nguyên biểu phí chuẩn và bổ sung gói kiểm tra định kỳ mở rộng...”',
      },
    },
    meeting: {
      role: 'Hành chính' as OfficeRole,
      label: 'Tình huống 2: Biến ghi chú họp 2 tiếng thành bảng phân công 30 giây',
      prompt:
        'Bạn là Thư ký Ban Giám đốc. Từ ghi chú thô bên dưới, hãy xuất Biên bản họp gồm: 3 quyết định đã chốt, Bảng phân công (Đầu việc | Người phụ trách | Hạn chót) và đánh dấu [Cần xác nhận lại] ở thông tin chưa rõ.',
      outputs: {
        Claude:
          'Xuất bảng phân công mạch lạc, tự động phát hiện khoản "Ngân sách quà Tết 50 triệu" chưa có ngày duyệt cụ thể và gắn nhãn [Cần xác nhận lại với Giám đốc].',
        ChatGPT:
          'Kẻ bảng Markdown 4 cột cực chuẩn (STT | Đầu việc | Phụ trách | Deadline) để copy dán thẳng sang Excel hoặc Notion trong 5 giây.',
        Gemini:
          'Tóm tắt súc tích các ý chính theo từng phòng ban (Sales, Marketing, Kế toán) và cho phép xuất trực tiếp thành file Google Docs.',
      },
    },
    excel: {
      role: 'Kế toán' as OfficeRole,
      label: 'Tình huống 3: Phân tích bảng số liệu Excel & viết nhận xét báo cáo Sếp',
      prompt:
        'Đóng vai Kế toán quản trị. Doanh thu T10 tăng 12,5% nhưng chi phí quảng cáo tăng 44% và công nợ quá hạn tăng 61%. Hãy viết đoạn nhận xét 150 chữ báo cáo Sếp và dự đoán 2 câu hỏi Sếp sẽ hỏi.',
      outputs: {
        Claude:
          '“Điểm sáng là doanh thu đạt 1.350 triệu (+12,5%), tuy nhiên đi kèm 2 rủi ro cần xử lý ngay: tỷ suất chi phí Marketing/Doanh thu tăng từ 15% lên 19,2% và dòng tiền thực thu bị nghẽn ở nhóm nợ quá hạn 340 triệu...”',
        ChatGPT:
          'Tính toán chính xác từng tỷ lệ % biến động, lập bảng so sánh Tháng 9 vs Tháng 10 và gợi ý công thức Excel theo dõi tuổi nợ tự động.',
        Gemini:
          'Tổng hợp nhanh 3 gạch đầu dòng tóm tắt điều hành (Executive Summary) ngắn gọn để dán vào đầu email trình Sếp trước 5 giờ chiều.',
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 transition-colors">
      {/* COMPACT STANDARD PRODUCTION HEADER (5-ITEM MENU + BENTO LOGO + ORANGE CTA) */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-3">
          {/* Zone 1: Brand Identity with Chat Bubble Checkmark & Orange Spark Dot */}
          <button
            onClick={() => {
              setActivePage('home');
              setMobileMenuOpen(false);
            }}
            className="cursor-pointer group flex items-center shrink-0"
            aria-label="Về trang chủ AI Công Sở"
          >
            <AICongSoLogo size="md" />
          </button>

          {/* Zone 2: 5 Menu Items per Design Specification */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300"
          >
            {/* 1. Bắt đầu */}
            <button
              onClick={() => setActivePage('home')}
              className={`rounded-xl px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'home'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bắt đầu
            </button>

            {/* 2. Bài viết */}
            <button
              onClick={() => setActivePage('articles')}
              className={`rounded-xl px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'articles'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bài viết
            </button>

            {/* 3. Prompt */}
            <button
              onClick={() => setActivePage('prompts')}
              className={`rounded-xl px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'prompts'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prompt
            </button>

            {/* 4. Công cụ */}
            <button
              onClick={() => setActivePage('resources')}
              className={`rounded-xl px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'resources'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Công cụ
            </button>

            {/* 5. Cửa hàng (Sắp mở) */}
            <button
              onClick={() => setActivePage('resources')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'resources'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Cửa hàng</span>
              <span className="rounded-md bg-amber-500/15 border border-amber-500/25 px-1.5 py-0.2 text-[10px] font-bold text-amber-700 dark:text-amber-400 italic">
                Sắp mở
              </span>
            </button>

            {/* Satellite link: Về tôi */}
            <button
              onClick={() => setActivePage('about')}
              className={`rounded-xl px-3 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'about'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Về tôi
            </button>
          </nav>

          {/* Zone 3: Quick Search + Learning Path + Orange Action Button + Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Search Trigger with '/' Key badge */}
            <button
              type="button"
              onClick={() => {
                setActivePage('prompts');
                setTimeout(() => {
                  const el = document.getElementById('prompt-library-search-input');
                  if (el) {
                    el.focus();
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 60);
              }}
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-2.5 py-1.5 text-xs text-slate-500 hover:border-emerald-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Tìm kiếm Prompt nhanh (Phím tắt: /)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden xl:inline text-[11px] font-medium">Tìm kiếm...</span>
              <kbd className="font-mono text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400 font-bold shadow-2xs">
                /
              </kbd>
            </button>

            <button
              onClick={() => setActivePage('profile')}
              className={`hidden sm:inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                activePage === 'profile'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500'
              }`}
              title="Mở Hồ sơ cá nhân & Bảng điều khiển My Learning Path"
            >
              <User className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">Lộ trình của tôi</span>
              <span className="rounded-md bg-emerald-600/15 dark:bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300">
                {totalSavedCount}
              </span>
            </button>

            {/* Vibrant Orange Action Button matching "Chấm cam là tia sáng ý tưởng, cũng là màu của nút hành động" */}
            <button
              onClick={() => setActivePage('gift')}
              className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold px-3.5 py-1.5 text-xs shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <span>Nhận 50 prompt</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label="Chuyển đổi giao diện Sáng / Tối"
              title={theme === 'light' ? 'Chuyển sang chế độ Tối' : 'Chuyển sang chế độ Sáng'}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 transition-colors cursor-pointer shrink-0"
            >
              {theme === 'light' ? (
                <Moon className="h-3.5 w-3.5" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              )}
            </button>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer shrink-0"
              aria-label="Mở danh sách menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Expandable Touch Menu per Specification */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-4 space-y-2 overflow-hidden shadow-lg"
            >
              <div className="grid grid-cols-1 gap-1 text-sm font-semibold">
                <button
                  onClick={() => {
                    setActivePage('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'home'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Bắt đầu
                </button>

                <button
                  onClick={() => {
                    setActivePage('articles');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'articles'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Bài viết
                </button>

                <button
                  onClick={() => {
                    setActivePage('prompts');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'prompts'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Thư viện prompt
                </button>

                <button
                  onClick={() => {
                    setActivePage('resources');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'resources'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Công cụ AI
                </button>

                <button
                  onClick={() => {
                    setActivePage('resources');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between text-left rounded-xl px-3.5 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>Cửa hàng</span>
                  <span className="rounded-md bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    Sắp mở
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActivePage('roadmap');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'roadmap'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Lộ trình 30 ngày
                </button>

                <button
                  onClick={() => {
                    setActivePage('about');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'about'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Về tôi
                </button>

                <button
                  onClick={() => {
                    setActivePage('profile');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left rounded-xl px-3.5 py-2.5 transition-colors cursor-pointer ${
                    activePage === 'profile'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 font-bold text-emerald-700 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  Lộ trình của tôi ({totalSavedCount})
                </button>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('gift');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 text-xs text-center shadow-xs transition-colors cursor-pointer"
                >
                  Nhận 50 prompt miễn phí
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-5 py-5">
        {/* COMPACT CLOSED-LOOP NAVIGATION STRIP FOR INTERNAL PAGES */}
        {activePage !== 'home' && (
          <ClosedLoopCycleBanner
            activePage={activePage}
            onNavigate={(page) => setActivePage(page)}
            newsCount={INITIAL_AI_NEWS.length}
            articlesCount={articles.length}
            promptsCount={prompts.length}
            savedCount={totalSavedCount}
            roadmapProgressPct={roadmapProgressPct}
            variant="compact-strip"
          />
        )}

        {/* ========================================================= */}
        {/* PAGE 1: HOME — COMPACT CLOSED-LOOP WORKSPACE              */}
        {/* ========================================================= */}
        {activePage === 'home' && (
          <div className="space-y-10">
            {/* 2026 BENTO GRID: 6 CORE BLOCKS FROM DESIGN SPECIFICATION */}
            <HomeBentoGrid
              onNavigate={(page) => setActivePage(page as any)}
              onSelectRole={(role) => setSelectedRole(role)}
              selectedRole={selectedRole}
              roadmapCompletedCount={roadmapProgressCount}
              totalRoadmapSteps={INITIAL_ROADMAP.length}
              onCopyText={(text, title) => {
                triggerCopyToast(title || 'Tóm tắt biên bản họp hành chính');
              }}
            />

            {/* 1. CLOSED-LOOP 4-STEP LEARNING ARCHITECTURE HUB */}
            <ClosedLoopCycleBanner
              activePage={activePage}
              onNavigate={(page) => setActivePage(page)}
              newsCount={INITIAL_AI_NEWS.length}
              articlesCount={articles.length}
              promptsCount={prompts.length}
              savedCount={totalSavedCount}
              roadmapProgressPct={roadmapProgressPct}
              variant="home-hub"
            />

            {/* 2. INTERACTIVE 3D WEBGL SMART OFFICE SHOWCASE */}
            <section className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Không gian 3D trực quan · Khám phá theo 8 phòng ban cốt lõi
                  </div>
                  <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                    Chọn phòng ban của bạn để khám phá công thức AI thực chiến
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setActivePage('news')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
                  >
                    <Newspaper className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Tin tức AI mới nhất
                  </button>
                  <button
                    onClick={() => setActivePage('prompts')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                  >
                    Mở toàn bộ {prompts.length} Prompt
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <Interactive3DOfficeScene
                selectedRole={selectedRole}
                onSelectRole={(role) => setSelectedRole(role)}
                onExploreRolePrompts={(role) => {
                  setSelectedRole(role);
                  setActivePage('prompts');
                }}
                isDark={theme === 'dark'}
              />
            </section>

            {/* 3. LATEST AI NEWS & WORKPLACE TRENDS PREVIEW (STEP 1 OF LOOP) */}
            <HomeAINewsPreviewSection
              newsList={INITIAL_AI_NEWS}
              prompts={prompts}
              bookmarkedNewsIds={bookmarkedNewsIds}
              onToggleBookmarkNews={toggleBookmarkNews}
              onOpenNewsPage={() => setActivePage('news')}
              onOpenPromptModal={setActivePromptModal}
            />

            {/* 4. PROMPT OF THE DAY ('PROMPT CỦA NGÀY' - AUTO TOP COPIED OR NEWEST) */}
            <PromptOfTheDaySection
              prompts={prompts}
              favoritePromptIds={favoritePromptIds}
              comparePromptIds={comparePromptIds}
              quickCopiedId={quickCopiedId}
              onOpenPromptModal={setActivePromptModal}
              onQuickCopyPrompt={handleQuickCopyPrompt}
              onToggleFavoritePrompt={toggleFavoritePrompt}
              onToggleComparePrompt={handleToggleComparePrompt}
              onOpenImproveModal={setActiveImprovePromptModal}
            />

            {/* 5. COMPACT DEPARTMENT PROMPT SHOWCASE (3 FEATURED CARDS) */}
            <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 space-y-5">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Thực hành nhanh theo vị trí · Đang xem:{' '}
                    <span className="font-bold text-slate-900 dark:text-white">{selectedRole === 'Tất cả' ? 'Tất cả phòng ban' : selectedRole}</span>
                  </div>
                  <h2 className="mt-1 text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Top câu lệnh mẫu sát thực tế nhất cho công việc của bạn
                  </h2>
                </div>

                {/* Role Filter Switcher */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setSelectedRole('Tất cả')}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                      selectedRole === 'Tất cả'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Tất cả
                  </button>
                  {ALL_ROLES.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                        selectedRole === role
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact 3-Column Prompt Gallery */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {prompts
                  .filter((p) => selectedRole === 'Tất cả' || p.role === selectedRole)
                  .slice(0, 3)
                  .map((p) => {
                    const isFav = favoritePromptIds.includes(p.id);
                    const compareIdx = comparePromptIds.indexOf(p.id);
                    const isCompared = compareIdx !== -1;
                    const isFocused = focusedPromptId === p.id;
                    return (
                      <article
                        key={p.id}
                        tabIndex={0}
                        aria-label={`${p.title} - Nhấn Ctrl+C để sao chép, Ctrl+S để so sánh`}
                        onFocus={() => setFocusedPromptId(p.id)}
                        onBlur={(e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                            setFocusedPromptId((prev) => (prev === p.id ? null : prev));
                          }
                        }}
                        onKeyDown={(e) => handlePromptCardKeyDown(e, p)}
                        onClick={() => {
                          handleRecordPromptView(p.id);
                          setActivePromptModal(p);
                        }}
                        className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-2xl border bg-slate-50/50 dark:bg-slate-800/30 p-3.5 hover:border-emerald-500 hover:bg-white dark:hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                          isCompared
                            ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'border-slate-200 dark:border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="relative">
                            <RoleIsometricArtwork role={p.role} className="h-36 w-full rounded-xl" />
                            {isFocused && (
                              <div className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-lg bg-slate-950/90 border border-emerald-500/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300 shadow-md">
                                <span>Ctrl+C chép · Ctrl+S so sánh</span>
                              </div>
                            )}
                            <label
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-bold shadow-md transition-colors cursor-pointer select-none ${
                                isCompared
                                  ? 'bg-emerald-600 border-emerald-500 text-white'
                                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isCompared}
                                onChange={() => handleToggleComparePrompt(p.id)}
                                className="h-3 w-3 rounded accent-emerald-500 cursor-pointer"
                              />
                              <span>{isCompared ? `#${compareIdx + 1}` : 'So sánh'}</span>
                            </label>
                            <button
                              type="button"
                              onClick={(e) => toggleFavoritePrompt(p.id, e)}
                              aria-label="Lưu yêu thích"
                              className={`absolute top-2.5 right-2.5 h-8 w-8 rounded-lg flex items-center justify-center border transition-colors cursor-pointer ${
                                isFav
                                  ? 'bg-emerald-600 border-emerald-500 text-white'
                                  : 'bg-slate-900/75 border-slate-700 text-slate-200 hover:bg-slate-900'
                              }`}
                            >
                              <Bookmark className={`h-3.5 w-3.5 ${isFav ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          <div className="pt-3.5 space-y-2">
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                                {p.role}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{p.level}</span>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                {(p.viewCount || 0).toLocaleString('vi-VN')} xem
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                                {p.copyCount.toLocaleString('vi-VN')} copy
                              </span>
                            </div>

                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                              {p.title}
                            </h3>

                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {p.situation}
                            </p>

                            <PromptCommunityBenchmarkStrip
                              prompt={p}
                              onOpenCompareTab={(item) => {
                                setActivePromptModalTab('compare');
                                setActivePromptModal(item);
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImprovePromptModal(p);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
                          >
                            <Wand2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span>Gợi ý cải tiến</span>
                          </button>

                          <AnimatedCopyButton
                            isCopied={quickCopiedId === p.id}
                            copyCount={p.copyCount}
                            promptTitle={p.title}
                            onCopiedToast={triggerCopyToast}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickCopyPrompt(p);
                            }}
                          />
                        </div>
                      </article>
                    );
                  })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <span>Muốn tìm thêm công thức nâng cao hoặc System Prompt cho AI Agent?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setPromptLibraryTab('agents');
                      setActivePage('prompts');
                    }}
                    className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    Mở danh mục 6 loại AI Agent phổ biến →
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePage('prompts')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  <span>Xem toàn bộ {prompts.length} Prompt trong Thư viện</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* 6. VISUAL COMPARISON STUDIO: MỘT TÌNH HUỐNG - BA CÔNG CỤ */}
            <section className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-7 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      Bàn cân trực quan · So sánh Claude 3.7 vs ChatGPT-4o vs Gemini 2.0
                    </div>
                    <h2 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      Một bài toán văn phòng — 3 mô hình AI phản hồi khác nhau thế nào?
                    </h2>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Quan sát sự khác biệt về văn phong, cấu trúc bảng biểu và mức độ thực chiến giữa 3 mô hình trước khi ứng dụng vào công việc hàng ngày.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40 p-2">
                    <RoleIsometricArtwork
                      role={heroDemoData[heroScenario].role}
                      className="h-40 w-full rounded-xl"
                    />
                    <div className="px-2 pt-2 pb-1 text-center text-xs text-slate-500 dark:text-slate-400">
                      Mô phỏng bàn làm việc phòng ban: <strong className="text-slate-700 dark:text-slate-200">{heroDemoData[heroScenario].role}</strong>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  {/* Scenario selection pills */}
                  <div>
                    <div className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      Chọn bài toán thực tế:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {(
                        [
                          { id: 'email', label: 'Sales & Đàm phán', desc: 'Từ chối giảm giá' },
                          { id: 'meeting', label: 'Hành chính & Thư ký', desc: 'Biên bản họp 30s' },
                          { id: 'excel', label: 'Kế toán & Tài chính', desc: 'Nhận xét báo cáo Sếp' },
                        ] as const
                      ).map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setHeroScenario(tab.id)}
                          className={`rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                            heroScenario === tab.id
                              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200 shadow-xs ring-1 ring-emerald-500/30'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold">{tab.label}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{tab.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prompt box */}
                  <div className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-800/60 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {heroDemoData[heroScenario].label}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(heroDemoData[heroScenario].prompt);
                          triggerCopyToast(heroDemoData[heroScenario].label);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        Chép Prompt
                      </button>
                    </div>
                    <p className="font-mono text-xs leading-relaxed text-slate-700 dark:text-slate-300 select-all">
                      “{heroDemoData[heroScenario].prompt}”
                    </p>
                  </div>

                  {/* Multi-Model Benchmark Switcher */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Chọn mô hình khảo sát:
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
                        Thử nghiệm đối chiếu độc lập · 10/2026
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          {
                            tool: 'Claude' as const,
                            name: 'Claude 3.7',
                            maker: 'Anthropic',
                            style: 'Tự nhiên & Thấu cảm',
                            activeClass:
                              'border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200 ring-1 ring-amber-500/40',
                          },
                          {
                            tool: 'ChatGPT' as const,
                            name: 'ChatGPT-4o',
                            maker: 'OpenAI',
                            style: 'Bảng biểu & Thực dụng',
                            activeClass:
                              'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500/40',
                          },
                          {
                            tool: 'Gemini' as const,
                            name: 'Gemini 2.0',
                            maker: 'Google',
                            style: 'Súc tích & Trực quan',
                            activeClass:
                              'border-sky-500 bg-sky-500/10 text-sky-900 dark:text-sky-200 ring-1 ring-sky-500/40',
                          },
                        ] as const
                      ).map((item) => (
                        <button
                          key={item.tool}
                          type="button"
                          onClick={() => setHeroTool(item.tool)}
                          className={`rounded-xl border p-2.5 text-center transition-all cursor-pointer ${
                            heroTool === item.tool
                              ? item.activeClass
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.maker}</div>
                          <div className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5 truncate hidden sm:block">
                            {item.style}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Output View Box */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-md">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              heroTool === 'Claude'
                                ? 'bg-amber-400'
                                : heroTool === 'ChatGPT'
                                ? 'bg-emerald-400'
                                : 'bg-sky-400'
                            }`}
                          />
                          <span className="font-bold text-slate-200">
                            Phản hồi của {heroTool === 'Claude' ? 'Claude 3.7 Sonnet' : heroTool === 'ChatGPT' ? 'ChatGPT-4o' : 'Gemini 2.0 Flash'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(heroDemoData[heroScenario].outputs[heroTool]);
                            triggerCopyToast(`Kết quả ${heroTool}`);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép kết quả</span>
                        </button>
                      </div>

                      <div className="font-sans whitespace-pre-line text-slate-200 text-xs sm:text-sm leading-relaxed min-h-[80px]">
                        {heroDemoData[heroScenario].outputs[heroTool]}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span>
                          Gợi ý: Dùng <strong className="text-slate-200">Claude</strong> cho văn bản tế nhị, <strong className="text-slate-200">ChatGPT</strong> cho bảng Markdown, <strong className="text-slate-200">Gemini</strong> cho báo cáo súc tích.
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRole(heroDemoData[heroScenario].role);
                            setActivePage('prompts');
                          }}
                          className="text-emerald-400 hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                        >
                          Tìm Prompt {heroDemoData[heroScenario].role} tương tự →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 1B: AI NEWS & WORKPLACE TRENDS (TIN TỨC AI MỚI NHẤT) */}
        {/* ========================================================= */}
        {activePage === 'news' && (
          <AINewsView
            newsList={INITIAL_AI_NEWS}
            prompts={prompts}
            articles={articles}
            bookmarkedNewsIds={bookmarkedNewsIds}
            onToggleBookmarkNews={toggleBookmarkNews}
            onOpenPromptModal={setActivePromptModal}
            onOpenArticleModal={setActiveArticleModal}
            onNavigateToPrompts={() => setActivePage('prompts')}
            onNavigateToProfile={() => setActivePage('profile')}
          />
        )}

        {/* ========================================================= */}
        {/* PAGE 2: ROADMAP 30 DAYS (LỘ TRÌNH 30 NGÀY TRỰC QUAN)      */}
        {/* ========================================================= */}
        {activePage === 'roadmap' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xs">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lộ trình 30 ngày thực hành · 15 phút mỗi ngày làm chủ AI văn phòng
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Từ người mới hoàn toàn đến thành thạo AI công sở sau 4 tuần
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Đánh dấu từng chặng bên dưới để theo dõi tiến độ cá nhân. Mỗi bài học đều đi kèm mẫu câu lệnh thực hành ngay trên công việc thật.
                </p>
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700 dark:text-slate-300">Tiến độ hoàn thành của bạn</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                      {roadmapProgressCount}/{INITIAL_ROADMAP.length} chặng ({roadmapProgressPct}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-300 rounded-full"
                      style={{ width: `${roadmapProgressPct}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <PillarIsometricArtwork
                  pillar="Kỹ năng nền"
                  className="h-48 w-full rounded-2xl shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {INITIAL_ROADMAP.map((step, idx) => {
                const isDone = !!completedRoadmapDays[step.dayRange];
                const linkedPrompt = prompts.find((p) => p.id === step.linkedPromptId);
                const linkedArticle = articles.find((a) => a.id === step.linkedArticleId);
                const roleArt: OfficeRole = ALL_ROLES[idx % ALL_ROLES.length];
                const weekDisplay = step.weekLabel || (step as unknown as { weekTitle?: string }).weekTitle || `Tuần ${Math.floor(idx / 2) + 1}`;
                const taskDisplay = step.practiceTask || (step as unknown as { actionTask?: string }).actionTask || 'Áp dụng mẫu prompt tương ứng vào công việc hôm nay.';

                return (
                  <article
                    key={step.dayRange}
                    className={`overflow-hidden rounded-3xl border transition-all p-4 sm:p-5 flex flex-col justify-between ${
                      isDone
                        ? 'border-emerald-500/70 bg-emerald-50/25 dark:bg-emerald-950/20 shadow-xs'
                        : 'border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    <div>
                      <RoleIsometricArtwork role={roleArt} className="h-40 w-full rounded-2xl" />
                      <div className="p-2 sm:p-3 pt-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {step.dayRange} · {weekDisplay}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleRoadmapDay(step.dayRange, step.title)}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                              isDone
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isDone ? 'Đã hoàn thành' : 'Đánh dấu xong'}
                          </button>
                        </div>

                        <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.objective}
                        </p>
                        <div className="mt-3.5 rounded-xl border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-800/50 p-3 text-xs text-slate-700 dark:text-slate-300">
                          <strong className="text-slate-900 dark:text-white font-semibold">Bài tập 15 phút:</strong> {taskDisplay}
                        </div>
                      </div>
                    </div>

                    <div className="px-2 sm:px-3 pt-3 pb-1 flex flex-wrap items-center gap-3 border-t border-slate-100 dark:border-slate-800 mt-3">
                      {linkedArticle && (
                        <button
                          type="button"
                          onClick={() => {
                            handleRecordArticleView(linkedArticle.id);
                            setActiveArticleModal(linkedArticle);
                          }}
                          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
                        >
                          Xem minh họa tình huống →
                        </button>
                      )}
                      {linkedPrompt && (
                        <button
                          type="button"
                          onClick={() => {
                            handleRecordPromptView(linkedPrompt.id);
                            setActivePromptModal(linkedPrompt);
                          }}
                          className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline cursor-pointer"
                        >
                          Mở mẫu Prompt thực hành →
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 3: ARTICLES / VISUAL CASE STUDIES (TÌNH HUỐNG MẪU)   */}
        {/* ========================================================= */}
        {activePage === 'articles' && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 space-y-5 shadow-xs">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Thư viện tình huống thực chiến · Phân tích đối chiếu 3 công cụ AI
                  </div>
                  <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Tình huống công sở mẫu & Bàn cân 3 công cụ AI
                  </h1>
                </div>

                {/* Search Box */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tình huống (Excel, HR, họp...)"
                    className="w-full rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedRole('Tất cả')}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                    selectedRole === 'Tất cả'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Tất cả phòng ban
                </button>
                {ALL_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      selectedRole === r
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((art) => {
                const isFav = favoriteArticleIds.includes(art.id);
                return (
                  <article
                    key={art.id}
                    onClick={() => {
                      handleRecordArticleView(art.id);
                      setActiveArticleModal(art);
                    }}
                    className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div>
                      <div className="relative">
                        <RoleIsometricArtwork role={art.role} className="h-44 w-full rounded-2xl" />
                        <button
                          type="button"
                          onClick={(e) => toggleFavoriteArticle(art.id, e)}
                          className={`absolute top-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
                            isFav
                              ? 'bg-emerald-600 border-emerald-500 text-white'
                              : 'bg-slate-900/75 border-slate-700 text-slate-200'
                          }`}
                        >
                          <Bookmark className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <div className="p-3 pt-4">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                            {art.role}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{art.level}</span>
                          <span aria-hidden="true">·</span>
                          <span>{art.readTimeMinutes} phút đọc</span>
                          <span aria-hidden="true">·</span>
                          <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            {(art.viewCount || 0).toLocaleString('vi-VN')} lượt xem
                          </span>
                        </div>

                        <h2 className="mt-2 text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                          {art.title}
                        </h2>

                        <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {art.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="px-3 pb-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        Đối chiếu: {art.tools.join(' · ')}
                      </span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                        Xem sơ đồ
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 4: PROMPT LIBRARY (THƯ VIỆN PROMPT 3D TRỰC QUAN)     */}
        {/* ========================================================= */}
        {activePage === 'prompts' && (
          <div className="space-y-6">
            {/* COMPACT 2-ROW FILTER HEADER (STANDARD PRODUCTION SAAS LAYOUT) */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 md:p-6 space-y-4 shadow-xs">
              {/* Row 1: Title + Search Input */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    Công thức chuẩn 4 bước · Điền biến tự động & Quét bảo mật văn phòng
                  </div>
                  <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Thư viện Prompt 3D trực quan theo Phòng ban
                  </h1>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="prompt-library-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm mẫu câu lệnh, tác vụ, công cụ... (Bấm '/' để tìm)"
                      className="w-full rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/90 pl-9 pr-14 py-2 text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
                    />
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {searchQuery ? (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                          aria-label="Xóa từ khóa tìm kiếm"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <kbd className="hidden sm:inline-flex items-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                          /
                        </kbd>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Unified View Tabs + Compact Filter Selects */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {/* Primary View Tabs */}
                <div
                  className="inline-flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-800/90 p-1"
                  role="tablist"
                  aria-label="Chế độ xem Thư viện Prompt"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={promptLibraryTab === 'all' && !showOnlyFavorites}
                    onClick={() => {
                      setPromptLibraryTab('all');
                      setShowOnlyFavorites(false);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      promptLibraryTab === 'all' && !showOnlyFavorites
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Tất cả ({prompts.length})
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={promptLibraryTab === 'newest'}
                    onClick={() => {
                      setPromptLibraryTab('newest');
                      setShowOnlyFavorites(false);
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      promptLibraryTab === 'newest'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Mới nhất ({recentPromptsCount})
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={promptLibraryTab === 'popular'}
                    onClick={() => {
                      setPromptLibraryTab('popular');
                      setShowOnlyFavorites(false);
                    }}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      promptLibraryTab === 'popular'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Ưa chuộng ({totalPromptCopies.toLocaleString('vi-VN')} copy)
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={promptLibraryTab === 'agents'}
                    onClick={() => {
                      setPromptLibraryTab('agents');
                      setShowOnlyFavorites(false);
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      promptLibraryTab === 'agents'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    AI Agent ({agentPromptsCount})
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={promptLibraryTab === 'saved' || showOnlyFavorites}
                    onClick={() => {
                      setPromptLibraryTab('saved');
                      setShowOnlyFavorites(false);
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer tabular-nums ${
                      promptLibraryTab === 'saved' || showOnlyFavorites
                        ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Đã lưu ({favoritePromptIds.length})
                  </button>
                </div>

                {/* Compact Filter Dropdowns + Keyboard Shortcut Hint */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Department / Role Select */}
                  <select
                    aria-label="Lọc theo phòng ban"
                    value={selectedRole}
                    onChange={(e) =>
                      setSelectedRole(e.target.value as OfficeRole | 'Tất cả')
                    }
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Tất cả">Phòng ban: Tất cả</option>
                    {ALL_ROLES.map((r) => (
                      <option key={r} value={r}>
                        Phòng ban: {r}
                      </option>
                    ))}
                  </select>

                  {/* AI Agent Type Select */}
                  <select
                    aria-label="Lọc theo loại AI Agent"
                    value={selectedAgentType}
                    onChange={(e) =>
                      setSelectedAgentType(e.target.value as AIAgentType | 'Tất cả')
                    }
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Tất cả">Loại AI Agent: Tất cả</option>
                    {POPULAR_AI_AGENTS.map((agent) => (
                      <option key={agent.id} value={agent.agentType}>
                        {agent.agentType}
                      </option>
                    ))}
                  </select>

                  {/* Skill Level Select */}
                  <select
                    aria-label="Lọc theo cấp độ"
                    value={selectedLevel}
                    onChange={(e) =>
                      setSelectedLevel(e.target.value as SkillLevel | 'Tất cả')
                    }
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Tất cả">Cấp độ: Tất cả</option>
                    {ALL_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        Cấp độ: {lvl}
                      </option>
                    ))}
                  </select>

                  {(selectedRole !== 'Tất cả' ||
                    selectedAgentType !== 'Tất cả' ||
                    selectedLevel !== 'Tất cả' ||
                    searchQuery.trim() !== '') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole('Tất cả');
                        setSelectedAgentType('Tất cả');
                        setSelectedLevel('Tất cả');
                        setSearchQuery('');
                      }}
                      className="inline-flex items-center gap-1 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-100 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Đặt lại
                    </button>
                  )}

                  <div className="hidden 2xl:inline-flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-2.5 py-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    <kbd className="rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                      Ctrl+C
                    </kbd>
                    <span>copy</span>
                    <span aria-hidden="true">·</span>
                    <kbd className="rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-1 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-200">
                      Ctrl+S
                    </kbd>
                    <span>so sánh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcut Action Feedback Toast */}
            <AnimatePresence>
              {shortcutFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-slate-900 text-white px-4 py-2.5 text-xs font-semibold shadow-lg"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{shortcutFeedback}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>Tab chuyển thẻ · Ctrl+C copy · Ctrl+S so sánh</span>
                    <a
                      href="#keyboard-shortcuts"
                      className="text-emerald-400 hover:underline cursor-pointer inline-flex items-center gap-0.5 font-medium"
                    >
                      <Keyboard className="w-3 h-3" />
                      <span>Xem bảng phím tắt ↓</span>
                    </a>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State if no prompts match filter */}
            {filteredPrompts.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center space-y-3">
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  Không tìm thấy mẫu Prompt phù hợp với bộ lọc hiện tại.
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Hãy thử chuyển về chế độ xem Tất cả hoặc đặt lại bộ lọc tìm kiếm.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPromptLibraryTab('all');
                    setSelectedRole('Tất cả');
                    setSelectedAgentType('Tất cả');
                    setSelectedLevel('Tất cả');
                    setSearchQuery('');
                    setShowOnlyFavorites(false);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Xem toàn bộ {prompts.length} Prompt
                </button>
              </div>
            ) : (
              /* Prompt Cards Grid */
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrompts.map((p, idx) => {
                  const isFav = favoritePromptIds.includes(p.id);
                  const isNew = isRecentPrompt(p, idx);
                  const isPopular = topPopularPromptIds.has(p.id);
                  const compareIdx = comparePromptIds.indexOf(p.id);
                  const isCompared = compareIdx !== -1;
                  const isFocused = focusedPromptId === p.id;
                  return (
                    <article
                      key={p.id}
                      tabIndex={0}
                      aria-label={`${p.title} - Nhấn Ctrl+C để sao chép, Ctrl+S để chọn so sánh`}
                      onFocus={() => setFocusedPromptId(p.id)}
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                          setFocusedPromptId((prev) => (prev === p.id ? null : prev));
                        }
                      }}
                      onKeyDown={(e) => handlePromptCardKeyDown(e, p)}
                      onClick={() => {
                        handleRecordPromptView(p.id);
                        setActivePromptModalTab('builder');
                        setActivePromptModal(p);
                      }}
                      className={`group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        isCompared
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="relative">
                          {p.agentType ? (
                            <AgentIsometricArtwork
                              agentType={p.agentType}
                              className="h-44 w-full rounded-2xl"
                            />
                          ) : (
                            <RoleIsometricArtwork role={p.role} className="h-44 w-full rounded-2xl" />
                          )}
                          {/* Clean Single Primary Badge in Top-Left (No Badge Stacking Clutter) */}
                          <div className="absolute top-3 left-3 pr-12">
                            {p.agentType ? (
                              <span className="inline-flex items-center gap-1 rounded-xl bg-slate-950/90 border border-emerald-500/60 px-2.5 py-1 text-[10px] font-bold text-emerald-300 shadow-md">
                                <Layers className="w-3 h-3" />
                                {p.agentType}
                              </span>
                            ) : isNew ? (
                              <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-600/95 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
                                <Sparkles className="w-3 h-3" />
                                MỚI · {p.updatedAt}
                              </span>
                            ) : isPopular ? (
                              <span className="inline-flex items-center gap-1 rounded-xl bg-amber-500/95 px-2.5 py-1 text-[10px] font-bold text-slate-950 shadow-md">
                                ★ Ưa chuộng
                              </span>
                            ) : null}
                          </div>

                          {isFocused && (
                            <div className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-slate-950/90 border border-emerald-500/50 px-2 py-0.5 text-[10px] font-bold text-emerald-300 shadow-md">
                              <span>Ctrl+C copy · Ctrl+S so sánh</span>
                            </div>
                          )}

                          <label
                            onClick={(e) => e.stopPropagation()}
                            className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-[11px] font-bold shadow-md transition-colors cursor-pointer select-none ${
                              isCompared
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                            }`}
                            title="Chọn 2 mẫu Prompt để so sánh song song cấu trúc, biến số và công cụ AI"
                          >
                            <input
                              type="checkbox"
                              checked={isCompared}
                              onChange={() => handleToggleComparePrompt(p.id)}
                              className="h-3.5 w-3.5 rounded accent-emerald-500 cursor-pointer"
                            />
                            <span>
                              {isCompared ? `So sánh #${compareIdx + 1}` : 'So sánh'}
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={(e) => toggleFavoritePrompt(p.id, e)}
                            aria-label="Lưu yêu thích"
                            className={`absolute top-3 right-3 h-9 w-9 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
                              isFav
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'bg-slate-900/75 border-slate-700 text-slate-200 hover:bg-slate-900'
                            }`}
                          >
                            <Bookmark className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                          </button>
                        </div>

                        <div className="p-3 pt-4">
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                              {p.role}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{p.level}</span>
                            <span aria-hidden="true">·</span>
                            <span className="inline-flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300 tabular-nums">
                              <Eye className="w-3.5 h-3.5 text-slate-400" />
                              {(p.viewCount || 0).toLocaleString('vi-VN')} xem
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                              {p.copyCount.toLocaleString('vi-VN')} copy
                            </span>
                          </div>

                          <h2 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                            {p.title}
                          </h2>

                          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {p.situation}
                          </p>

                          <div className="mt-2.5">
                            <PromptCommunityBenchmarkStrip
                              prompt={p}
                              onOpenCompareTab={(item) => {
                                setActivePromptModalTab('compare');
                                setActivePromptModal(item);
                              }}
                            />
                          </div>

                          <PromptPersonalNoteBox
                            promptId={p.id}
                            note={promptNotes[p.id] || ''}
                            onChangeNote={handleUpdatePromptNote}
                            compact
                          />
                        </div>
                      </div>

                      <div className="px-3 pb-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1">
                          Điền biến & chạy thử
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImprovePromptModal(p);
                            }}
                            className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 transition-colors cursor-pointer"
                            title="Dùng Gemini AI phân tích cấu trúc và gợi ý tối ưu câu lệnh"
                          >
                            <Wand2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span>Gợi ý cải tiến</span>
                          </button>
                          <AnimatedCopyButton
                            isCopied={quickCopiedId === p.id}
                            copyCount={p.copyCount}
                            promptTitle={p.title}
                            onCopiedToast={triggerCopyToast}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickCopyPrompt(p);
                            }}
                          />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Show Full AI Agent Catalog when in 'agents' tab or filtered by agent; otherwise show a sleek banner */}
            {promptLibraryTab === 'agents' || selectedAgentType !== 'Tất cả' ? (
              <AIAgentCatalogSection
                prompts={prompts}
                comparePromptIds={comparePromptIds}
                quickCopiedId={quickCopiedId}
                promptNotes={promptNotes}
                onChangePromptNote={handleUpdatePromptNote}
                onOpenPromptModal={setActivePromptModal}
                onQuickCopyPrompt={handleQuickCopyPrompt}
                onToggleComparePrompt={handleToggleComparePrompt}
                onPromptCardKeyDown={handlePromptCardKeyDown}
                onOpenImproveModal={setActiveImprovePromptModal}
              />
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <Layers className="w-4 h-4" />
                    Danh mục 6 loại AI Agent phổ biến & Mẹo tối ưu
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Tìm hiểu cách thiết lập Research Agent, Data Analyst Agent, Workflow Agent và các mẫu System Prompt chuyên sâu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPromptLibraryTab('agents')}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 dark:bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  Mở Cẩm nang 6 AI Agent
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Interactive Privacy Scrubber Tool */}
            <section className="rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-6 md:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Bộ lọc bảo mật dữ liệu công sở · Quét tự động
                  </div>
                  <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    Kiểm tra & Ẩn danh SĐT, CCCD, Email trước khi dán vào AI
                  </h2>
                </div>
                <button
                  onClick={() => setScrubberInput(anonymizeSensitiveText(scrubberInput))}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                >
                  Ẩn danh tự động ngay
                </button>
              </div>

              <textarea
                rows={3}
                value={scrubberInput}
                onChange={(e) => setScrubberInput(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono"
              />

              <div className="text-xs text-slate-600 dark:text-slate-400">
                {scrubberFindings.length === 0 ? (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    ✓ Văn bản an toàn — Không phát hiện SĐT, CCCD 12 số hoặc Email cá nhân.
                  </span>
                ) : (
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    Phát hiện {scrubberFindings.length} thông tin nhạy cảm ({scrubberFindings.map((f) => f.type).join(', ')}). Nhấn “Ẩn danh tự động ngay” để thay thế bằng mã giả định.
                  </span>
                )}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 5: RESOURCES / STORE & TOOLS (BIỂU MẪU & SÁCH)       */}
        {/* ========================================================= */}
        {activePage === 'resources' && (
          <div className="space-y-12">
            <section className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tài nguyên ứng dụng ngay · Thiết kế cho người không chuyên kỹ thuật
                </div>
                <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Bộ Biểu mẫu Excel AI, Sổ tay Prompt & Công cụ Khuyên dùng
                </h1>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {INITIAL_PRODUCTS.map((prod, idx) => {
                  const artRole = ALL_ROLES[idx % ALL_ROLES.length];
                  return (
                    <article
                      key={prod.id}
                      className="flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xs hover:shadow-xl transition-all"
                    >
                      <div>
                        <RoleIsometricArtwork role={artRole} className="h-36 w-full rounded-2xl" />
                        <div className="p-3 pt-4">
                          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                            {prod.category} · {prod.priceVnd}
                          </div>
                          <h2 className="mt-1.5 text-base font-bold text-slate-900 dark:text-white">
                            {prod.title}
                          </h2>
                          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-3 pt-2">
                        <button
                          onClick={() => {
                            setSelectedStoreProduct(prod);
                            setOrderSubmitted(false);
                          }}
                          className="w-full rounded-xl bg-slate-900 dark:bg-emerald-600 py-2.5 text-xs font-bold text-white hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          Xem chi tiết & Nhận bản mẫu
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* Recommended AI Tools */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Bảng phân vai các công cụ AI phổ biến cho dân văn phòng
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {INITIAL_AFFILIATES.map((tool) => (
                  <div
                    key={tool.id}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {tool.name}
                        </h3>
                        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          {tool.pricingNote}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Phù hợp nhất: {tool.bestFor}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tool.vietnameseSupport}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Đánh giá thực tế độc lập</span>
                      <a
                        href={tool.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        Trang chủ công cụ
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6: LEAD MAGNET GIFT (TẢI 50 PROMPT MIỄN PHÍ)         */}
        {/* ========================================================= */}
        {activePage === 'gift' && (
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-10 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-5">
                <PillarIsometricArtwork
                  pillar="Công thức theo vị trí"
                  className="h-64 w-full rounded-2xl shadow-lg"
                />
              </div>
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Quà tặng miễn phí · Tải về áp dụng ngay
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Cẩm nang 50 Prompt Thực chiến cho Nhân viên Văn phòng Việt Nam
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Trọn bộ câu lệnh 4 bước cho Kế toán, Nhân sự, Hành chính, Sales, Marketing kèm danh sách kiểm tra bảo mật thông tin nội bộ.
                </p>

                <form onSubmit={handleLeadSubmit} className="space-y-3 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="Email nhận tài liệu (vd: ban@congty.vn)"
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                    />
                    <select
                      value={leadRole}
                      onChange={(e) => setLeadRole(e.target.value as OfficeRole)}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-xs text-slate-900 dark:text-white"
                    >
                      {ALL_ROLES.map((r) => (
                        <option key={r} value={r}>
                          Phòng ban: {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  {leadError && <p className="text-xs text-rose-600">{leadError}</p>}
                  {leadSuccess && (
                    <p className="text-xs font-semibold text-emerald-600">
                      ✓ Đã đăng ký thành công! Bạn có thể bấm nút tải trực tiếp bên dưới.
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={handleDownload50PromptsTxt}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Tải trọn bộ 50 Prompt (.TXT)
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      Nhận bản cập nhật hàng tuần
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PAGE 6B: USER PROFILE & 'MY LEARNING PATH' DASHBOARD      */}
        {/* ========================================================= */}
        {activePage === 'profile' && (
          <UserProfileLearningPathView
            savedPrompts={savedPromptsList}
            savedArticles={savedArticlesList}
            allPrompts={prompts}
            allArticles={articles}
            roadmap={INITIAL_ROADMAP}
            completedRoadmapDays={completedRoadmapDays}
            onToggleRoadmapDay={(dayRange, title) => handleToggleRoadmapDay(dayRange, title)}
            promptNotes={promptNotes}
            onChangePromptNote={handleUpdatePromptNote}
            onToggleFavoritePrompt={toggleFavoritePrompt}
            onToggleFavoriteArticle={toggleFavoriteArticle}
            onOpenPromptModal={(p) => {
              handleRecordPromptView(p.id);
              setActivePromptModal(p);
            }}
            onOpenArticleModal={(art) => {
              handleRecordArticleView(art.id);
              setActiveArticleModal(art);
            }}
            onQuickCopyPrompt={handleQuickCopyPrompt}
            quickCopiedId={quickCopiedId}
            comparePromptIds={comparePromptIds}
            onToggleComparePrompt={handleToggleComparePrompt}
            onNavigateToPrompts={() => setActivePage('prompts')}
            onNavigateToArticles={() => setActivePage('articles')}
            onNavigateToRoadmap={() => setActivePage('roadmap')}
          />
        )}

        {/* ========================================================= */}
        {/* SATELLITE PAGE: VỀ TÔI (ABOUT ME)                         */}
        {/* ========================================================= */}
        {activePage === 'about' && (
          <AboutMeView
            onNavigateToPrompts={() => setActivePage('prompts')}
            onNavigateToRoadmap={() => setActivePage('roadmap')}
            onNavigateToGift={() => setActivePage('gift')}
          />
        )}

        {/* ========================================================= */}
        {/* PAGE 7: NON-TECH ADMIN CMS (HIDDEN FROM PUBLIC HEADER)    */}
        {/* ========================================================= */}
        {activePage === 'admin' && (
          <NonTechAdminView
            siteConfig={siteConfig}
            onUpdateConfig={setSiteConfig}
            prompts={prompts}
            onAddPrompt={(newP) => setPrompts((prev) => [newP, ...prev])}
            onDeletePrompt={(id) => setPrompts((prev) => prev.filter((p) => p.id !== id))}
            articles={articles}
            onAddArticle={(newA) => setArticles((prev) => [newA, ...prev])}
            onDeleteArticle={(id) => setArticles((prev) => prev.filter((a) => a.id !== id))}
            subscribers={subscribers}
            onResetAllData={handleResetAllData}
          />
        )}
      </main>

      {/* FLOATING QUICK COMPARE BOTTOM DOCK (VISIBLE ON ANY PAGE WHEN PROMPTS ARE SELECTED) */}
      <AnimatePresence>
        {comparePromptIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-2xl rounded-2xl border border-emerald-500/50 bg-slate-900/95 text-white px-4 py-3 shadow-2xl backdrop-blur-md flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white">
                <Columns2 className="h-4 w-4" />
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span>
                    So sánh nhanh:{' '}
                    <strong className="text-emerald-400 tabular-nums">
                      {comparePromptIds.length}/2
                    </strong>{' '}
                    Prompt
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-300">
                  {comparePromptIds.map((id, i) => {
                    const item = prompts.find((p) => p.id === id);
                    if (!item) return null;
                    return (
                      <span key={id} className="truncate max-w-[180px]">
                        #{i + 1} {item.title}
                        {i === 0 && comparePromptIds.length === 2 ? ' vs ' : ''}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {comparePromptIds.length === 2 ? (
                <button
                  type="button"
                  onClick={() => setIsCompareModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                  Mở bảng so sánh ngay
                </button>
              ) : (
                <span className="text-[11px] font-medium text-emerald-300">
                  Chọn thêm 1 thẻ Prompt nữa để đối chiếu
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  setComparePromptIds([]);
                  setIsCompareModalOpen(false);
                }}
                className="rounded-xl border border-slate-700 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-rose-400 cursor-pointer"
              >
                Bỏ chọn
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2026 DEEP NAVY FOOTER PER DESIGN SPECIFICATION */}
      <footer className="mt-20 border-t border-[#1E293B] bg-[#0B1329] text-slate-200 pt-14 pb-10">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-800/80">
            {/* Column 1: Brand, Slogan, Social & Security (col-span-4) */}
            <div className="lg:col-span-4 space-y-4">
              <div
                onClick={() => setActivePage('home')}
                className="cursor-pointer inline-block"
              >
                <AICongSoLogo variant="dark" size="md" />
              </div>

              <p className="text-sm leading-relaxed text-slate-300 font-medium max-w-sm">
                Dùng AI để xong việc văn phòng sớm hơn, bằng tiếng Việt.
              </p>

              {/* Social icons: f, T, Y, Z per specification */}
              <div className="flex items-center gap-2.5 pt-1">
                <a
                  href="#social-facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://facebook.com', '_blank', 'noopener,noreferrer');
                  }}
                  className="h-8 w-8 rounded-xl bg-slate-800/90 hover:bg-emerald-600 border border-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all shadow-xs"
                  title="Facebook AI Công Sở"
                >
                  f
                </a>
                <a
                  href="#social-tiktok"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://tiktok.com', '_blank', 'noopener,noreferrer');
                  }}
                  className="h-8 w-8 rounded-xl bg-slate-800/90 hover:bg-emerald-600 border border-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all shadow-xs"
                  title="TikTok AI Công Sở"
                >
                  T
                </a>
                <a
                  href="#social-youtube"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://youtube.com', '_blank', 'noopener,noreferrer');
                  }}
                  className="h-8 w-8 rounded-xl bg-slate-800/90 hover:bg-emerald-600 border border-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all shadow-xs"
                  title="YouTube AI Công Sở"
                >
                  Y
                </a>
                <a
                  href="#social-zalo"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://zalo.me', '_blank', 'noopener,noreferrer');
                  }}
                  className="h-8 w-8 rounded-xl bg-slate-800/90 hover:bg-emerald-600 border border-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300 hover:text-white transition-all shadow-xs"
                  title="Cộng đồng Zalo AI Công Sở"
                >
                  Z
                </a>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 text-[11px] font-semibold text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Bảo mật SĐT, CCCD &amp; Email dữ liệu nội bộ</span>
              </div>
            </div>

            {/* Column 2: Học (col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Học
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button
                    onClick={() => setActivePage('roadmap')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    Lộ trình 30 ngày
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('articles')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    Bài viết
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('prompts')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    Thư viện prompt
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('resources')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    So sánh công cụ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Trang (col-span-2) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Trang
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <button
                    onClick={() => setActivePage('resources')}
                    className="inline-flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    <span>Cửa hàng</span>
                    <span className="rounded bg-amber-500/20 border border-amber-500/30 px-1 py-0.2 text-[9px] font-bold text-amber-300 italic">
                      Sắp mở
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('resources')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    Sách nên đọc
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('about')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium text-emerald-400 hover:underline"
                  >
                    Về tôi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePage('about')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                  >
                    Liên hệ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Nhận 50 prompt (col-span-4) */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Nhận 50 prompt
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nhận qua email, kèm mẹo ứng dụng AI công sở chọn lọc mỗi tuần. Hoàn toàn miễn phí.
              </p>

              {footerSubscribed ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-3 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Đã gửi bộ prompt! Vui lòng kiểm tra hòm thư của bạn.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (footerEmail.trim() && footerEmail.includes('@')) {
                      setFooterSubscribed(true);
                      setSubscribers((prev) => [
                        { email: footerEmail.trim(), role: 'Văn phòng', createdAt: new Date().toISOString().slice(0, 10) },
                        ...prev,
                      ]);
                      setTimeout(() => {
                        setActivePage('gift');
                      }, 1200);
                    }
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Email của bạn..."
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-900/90 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 text-xs shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1"
                  >
                    <span>Gửi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Định dạng .TXT &amp; Word 1-click copy tiện lợi</span>
              </div>
            </div>
          </div>

          {/* DEDICATED KEYBOARD SHORTCUTS REFERENCE SECTION (BẢNG CHÚ GIẢI PHÍM TẮT) */}
          <div
            id="keyboard-shortcuts"
            className="my-10 rounded-3xl border border-slate-800 bg-[#0F172A] p-6 sm:p-7 shadow-xs space-y-5"
          >
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <Keyboard className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-sm sm:text-base font-extrabold text-white">
                      Bảng chú giải Phím tắt Thao tác Nhanh
                    </h3>
                    <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                      Keyboard Shortcuts Cheat Sheet
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">
                    Tối ưu tốc độ làm việc: Tra cứu, sao chép prompt và kích hoạt so sánh AI trực tiếp từ bàn phím mà không cần rê chuột.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-2xs">
                  <Command className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Hỗ trợ cả Windows (Ctrl) &amp; macOS (⌘)</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActivePage('prompts');
                    setTimeout(() => {
                      const el = document.getElementById('prompt-library-search-input');
                      if (el) {
                        el.focus();
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 80);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white transition-colors cursor-pointer shadow-xs"
                >
                  <span>Thử ngay trong Thư viện</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Shortcuts Grid - 6 Key Combinations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Shortcut 1: Ctrl+C */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-emerald-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Ctrl
                    </kbd>
                    <span className="text-slate-500 text-xs font-bold">+</span>
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      C
                    </kbd>
                    <span className="text-[10px] text-slate-400 font-medium ml-0.5">(hoặc ⌘C)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded-md">
                    Sao chép nhanh
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Copy mẫu Prompt ngay lập tức</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Tự động điền giá trị mẫu, copy thẳng vào Clipboard và kích hoạt Toast góc màn hình khi thẻ Prompt đang được chọn.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Thẻ Prompt trong Thư viện</span>
                  <span className="font-semibold text-emerald-400">Không cần click chuột</span>
                </div>
              </div>

              {/* Shortcut 2: Ctrl+S */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-blue-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Ctrl
                    </kbd>
                    <span className="text-slate-500 text-xs font-bold">+</span>
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      S
                    </kbd>
                    <span className="text-[10px] text-slate-400 font-medium ml-0.5">(hoặc ⌘S)</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-300 bg-blue-500/15 px-2 py-0.5 rounded-md">
                    So sánh 3 AI
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Thêm / Bỏ chọn So sánh Đa năng</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Chọn 2 câu lệnh để đối chiếu song song cấu trúc, biến số và phân tích tốc độ/độ chuẩn xác giữa Claude, ChatGPT và Gemini.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Thẻ Prompt trong Thư viện</span>
                  <span className="font-semibold text-blue-400">Mở khay so sánh</span>
                </div>
              </div>

              {/* Shortcut 3: Enter / Space */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-amber-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Enter
                    </kbd>
                    <span className="text-slate-500 text-xs font-bold">/</span>
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Space
                    </kbd>
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded-md">
                    Prompt Builder
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Mở Trình điền biến &amp; Chạy thử</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Mở modal tùy biến tham số, quét bảo mật dữ liệu nhạy cảm (SĐT/CCCD/Email) và xem kết quả mẫu thực tế.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Thẻ Prompt đang chọn</span>
                  <span className="font-semibold text-amber-400">Bật hộp thoại</span>
                </div>
              </div>

              {/* Shortcut 4: Tab / Shift + Tab */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-purple-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Tab
                    </kbd>
                    <span className="text-slate-500 text-xs font-bold">·</span>
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Shift+Tab
                    </kbd>
                  </div>
                  <span className="text-[10px] font-bold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-md">
                    Điều hướng
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Duyệt chuyển giữa các thẻ Prompt</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Di chuyển nhanh tiêu điểm qua từng thẻ câu lệnh trong danh sách; thẻ đang chọn sẽ hiển thị viền ngọc nổi bật.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Toàn bộ danh sách Prompt</span>
                  <span className="font-semibold text-purple-400">Tiếp theo / Quay lại</span>
                </div>
              </div>

              {/* Shortcut 5: / (Slash) */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-emerald-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-3 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      /
                    </kbd>
                    <span className="text-[10px] text-slate-400 font-medium ml-0.5">(Dấu gạch chéo)</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-300 bg-teal-500/15 px-2 py-0.5 rounded-md">
                    Tra cứu nhanh
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Nhảy con trỏ vào ô Tìm kiếm Prompt</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Bấm phím '/' từ bất kỳ trang nào để chuyển ngay đến Thư viện và đặt tiêu điểm nhập từ khóa cần tìm.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Toàn trang (khi không gõ chữ)</span>
                  <span className="font-semibold text-teal-400">Focus tức thì</span>
                </div>
              </div>

              {/* Shortcut 6: Esc */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 hover:border-rose-500/50 hover:shadow-xs transition-all">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <kbd className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs font-bold text-slate-100 shadow-2xs">
                      Esc
                    </kbd>
                    <span className="text-[10px] text-slate-400 font-medium ml-0.5">(Escape)</span>
                  </div>
                  <span className="text-[10px] font-bold text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded-md">
                    Thoát cửa sổ
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Đóng nhanh Modal &amp; Hộp thoại</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400 leading-relaxed">
                    Thoát tức thì khỏi Modal Prompt Builder, phân tích tối ưu Gemini, so sánh 3 mô hình hoặc form tải 50 Prompt.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Phạm vi: Mọi cửa sổ bật lên</span>
                  <span className="font-semibold text-slate-300">Đóng an toàn</span>
                </div>
              </div>
            </div>

            {/* Bottom Tip Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                  💡
                </span>
                <span>
                  <strong>Mẹo thực hành:</strong> Bấm <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Tab</kbd> để đưa tiêu điểm vào thẻ Prompt, sau đó nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl+C</kbd> để sao chép hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">Ctrl+S</kbd> để so sánh.
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
                <span>Nhấn <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">/</kbd> để tìm kiếm hoặc <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px] font-bold">?</kbd> để mở bảng này</span>
              </div>
            </div>
          </div>

          {/* Mandatory Disclosure & Update Notice per Design Spec */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-400">
            <p className="max-w-2xl leading-relaxed">
              Cập nhật lần cuối 22/10/2026. Một số liên kết là liên kết giới thiệu, chúng tôi có thể nhận hoa hồng mà bạn không trả thêm phí. Trang không phải đối tác chính thức của hãng AI nào.
            </p>
            <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400">
              <button
                onClick={() => setActivePage('about')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Quyền riêng tư
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePage('about')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Điều khoản
              </button>
              <span>·</span>
              <button
                onClick={() => setActivePage('about')}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Tiết lộ liên kết
              </button>
              <span>·</span>
              <a
                href="#keyboard-shortcuts"
                className="inline-flex items-center gap-1 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
                <span>Phím tắt</span>
              </a>
              <span>·</span>
              <button
                onClick={() => setActivePage('admin')}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                title="Quản trị viên (CMS)"
              >
                <Settings className="w-3 h-3" />
                <span>CMS</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* INTERACTIVE MODALS */}
      <PromptQuickCompareModal
        promptsToCompare={isCompareModalOpen ? selectedComparePrompts : null}
        onClose={() => setIsCompareModalOpen(false)}
        onClearSelection={() => {
          setComparePromptIds([]);
          setIsCompareModalOpen(false);
        }}
        onOpenBuilder={(prompt) => {
          setIsCompareModalOpen(false);
          setActivePromptModal(prompt);
        }}
        onQuickCopy={handleQuickCopyPrompt}
      />

      <PromptImprovementModal
        prompt={activeImprovePromptModal}
        onClose={() => setActiveImprovePromptModal(null)}
        onRecordCopy={handleRecordCopy}
        existingNote={
          activeImprovePromptModal ? promptNotes[activeImprovePromptModal.id] || '' : ''
        }
        onSaveToPersonalNote={handleUpdatePromptNote}
        onOpenInteractiveBuilder={(p) => setActivePromptModal(p)}
      />

      <PromptInteractiveModal
        prompt={activePromptModal}
        initialTab={activePromptModalTab}
        allPrompts={prompts}
        onSelectPrompt={(nextPrompt) => {
          setActivePromptModalTab('builder');
          setActivePromptModal(nextPrompt);
        }}
        onClose={() => {
          setActivePromptModal(null);
          setActivePromptModalTab('builder');
        }}
        onRecordCopy={handleRecordCopy}
        isFavorite={
          activePromptModal ? favoritePromptIds.includes(activePromptModal.id) : false
        }
        onToggleFavorite={(id) => toggleFavoritePrompt(id)}
        personalNote={activePromptModal ? promptNotes[activePromptModal.id] || '' : ''}
        onChangePersonalNote={handleUpdatePromptNote}
      />

      <ArticleReaderModal
        article={activeArticleModal}
        onClose={() => setActiveArticleModal(null)}
        isFavorite={
          activeArticleModal ? favoriteArticleIds.includes(activeArticleModal.id) : false
        }
        onToggleFavorite={(id) => toggleFavoriteArticle(id)}
      />

      {/* CORNER TOAST NOTIFICATION FOR COPY CONFIRMATION */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            key={copyToast.id}
            initial={{ opacity: 0, y: 20, scale: 0.92, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 16, scale: 0.94, filter: 'blur(3px)' }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm rounded-2xl border border-emerald-500/50 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-2xl backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-500/30">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Đã sao chép vào bộ nhớ tạm!
                  </span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                {copyToast.title ? (
                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 truncate">
                    {copyToast.title}
                  </p>
                ) : null}
                <p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                  Sẵn sàng dán (Ctrl+V) vào Claude, ChatGPT hoặc Gemini.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCopyToast(null)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                aria-label="Đóng thông báo"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            {/* Subtle animated auto-dismiss progress bar */}
            <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 2.8, ease: 'linear' }}
                className="h-full bg-emerald-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CELEBRATORY MILESTONE CONFETTI OVERLAY TOAST */}
      <AnimatePresence>
        {milestoneCelebration && (
          <motion.div
            key={`milestone-${milestoneCelebration.dayRange}`}
            initial={{ opacity: 0, y: -25, scale: 0.9, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.92, filter: 'blur(3px)' }}
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-md rounded-2xl border-2 border-emerald-500 bg-white/95 dark:bg-slate-900/95 p-4 shadow-2xl backdrop-blur-md"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/35">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Hoàn thành cột mốc · {milestoneCelebration.dayRange}
                  </span>
                  <span className="rounded-md bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold text-amber-700 dark:text-amber-300">
                    +1 Cột mốc 🎯
                  </span>
                </div>
                <h4 className="mt-0.5 text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                  {milestoneCelebration.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Tiến độ 30 ngày vừa được cập nhật vào hồ sơ cá nhân của bạn!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMilestoneCelebration(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Product Preview Modal */}
      {selectedStoreProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-emerald-600">
                  {selectedStoreProduct.category} · {selectedStoreProduct.priceVnd}
                </div>
                <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {selectedStoreProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStoreProduct(null)}
                className="h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedStoreProduct.description}
            </p>

            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
              {(selectedStoreProduct.highlights || selectedStoreProduct.includes || []).map((h, i) => (
                <li key={i}>✓ {h}</li>
              ))}
            </ul>

            {orderSubmitted ? (
              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                ✓ Đã ghi nhận email! Bản đọc thử và hướng dẫn sử dụng đã được gửi tới hộp thư của bạn.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (buyerEmail.trim()) setOrderSubmitted(true);
                }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  required
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="Nhập email nhận bản mẫu..."
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 cursor-pointer"
                >
                  Nhận ngay
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
