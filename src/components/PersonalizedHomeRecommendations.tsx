import React, { useMemo, useState } from 'react';
import {
  Sparkles,
  Eye,
  Copy,
  Check,
  Bookmark,
  ArrowRight,
  Flame,
  Compass,
  RefreshCw,
  Zap,
  BookOpen,
  UserCheck,
  Share2,
} from 'lucide-react';
import {
  PromptItem,
  ArticleItem,
  OfficeRole,
} from '../data/siteData';
import {
  RoleIsometricArtwork,
  AgentIsometricArtwork,
} from './VisualCardArtwork';

interface PersonalizedHomeRecommendationsProps {
  prompts: PromptItem[];
  articles: ArticleItem[];
  copiedPromptIds: string[];
  viewedArticleIds: string[];
  viewedPromptIds: string[];
  favoritePromptIds: string[];
  onOpenPromptModal: (prompt: PromptItem) => void;
  onQuickCopyPrompt: (prompt: PromptItem) => void;
  onToggleFavoritePrompt: (promptId: string, e?: React.MouseEvent) => void;
  onSharePrompt?: (prompt: PromptItem) => void;
  onNavigateToPrompts: () => void;
  onNavigateToArticles?: () => void;
  selectedRole?: OfficeRole | 'Tất cả';
  quickCopiedId?: string | null;
}

interface ScoredPrompt {
  prompt: PromptItem;
  score: number;
  reason: string;
}

export const PersonalizedHomeRecommendations: React.FC<
  PersonalizedHomeRecommendationsProps
> = ({
  prompts,
  articles,
  copiedPromptIds,
  viewedArticleIds,
  viewedPromptIds,
  favoritePromptIds,
  onOpenPromptModal,
  onQuickCopyPrompt,
  onToggleFavoritePrompt,
  onSharePrompt,
  onNavigateToPrompts,
  onNavigateToArticles,
  selectedRole,
  quickCopiedId,
}) => {
  const [shuffleKey, setShuffleKey] = useState(0);

  // Set of all interacted prompt IDs (copied, opened in modal, or favorited)
  const interactedPromptIdSet = useMemo(() => {
    return new Set([
      ...copiedPromptIds,
      ...viewedPromptIds,
      ...favoritePromptIds,
    ]);
  }, [copiedPromptIds, viewedPromptIds, favoritePromptIds]);

  // Compute user interest signals from copied prompts and viewed articles
  const recommendations: ScoredPrompt[] = useMemo(() => {
    // 1. Filter out all prompts the user has already interacted with
    const uninteracted = prompts.filter((p) => !interactedPromptIdSet.has(p.id));

    if (uninteracted.length === 0) {
      return [];
    }

    // 2. Count role, pillar, and tool affinities from copied prompts
    const roleWeights: Record<string, number> = {};
    const pillarWeights: Record<string, number> = {};
    const toolWeights: Record<string, number> = {};

    // Signals from copied prompts (Weight: 4 for role, 2 for pillar)
    copiedPromptIds.forEach((id) => {
      const p = prompts.find((item) => item.id === id);
      if (p) {
        roleWeights[p.role] = (roleWeights[p.role] || 0) + 4;
        pillarWeights[p.pillar] = (pillarWeights[p.pillar] || 0) + 2;
        p.recommendedTools.forEach((t) => {
          toolWeights[t] = (toolWeights[t] || 0) + 1;
        });
      }
    });

    // Signals from viewed articles (Weight: 3 for role, 2 for pillar)
    viewedArticleIds.forEach((id) => {
      const a = articles.find((item) => item.id === id);
      if (a) {
        roleWeights[a.role] = (roleWeights[a.role] || 0) + 3;
        pillarWeights[a.pillar] = (pillarWeights[a.pillar] || 0) + 2;
        a.tools.forEach((t) => {
          toolWeights[t] = (toolWeights[t] || 0) + 1;
        });
      }
    });

    // If user has a selected role on Home, boost that role
    if (selectedRole && selectedRole !== 'Tất cả') {
      roleWeights[selectedRole] = (roleWeights[selectedRole] || 0) + 3;
    }

    const hasSignals =
      copiedPromptIds.length > 0 ||
      viewedArticleIds.length > 0 ||
      (selectedRole && selectedRole !== 'Tất cả');

    // Find the most prominent role or article to craft contextual reasons
    let topAffinityRole = '';
    let maxRoleWeight = 0;
    Object.entries(roleWeights).forEach(([r, w]) => {
      if (w > maxRoleWeight) {
        maxRoleWeight = w;
        topAffinityRole = r;
      }
    });

    const lastViewedArticle = viewedArticleIds.length > 0
      ? articles.find((a) => a.id === viewedArticleIds[0])
      : undefined;

    // 3. Score each uninteracted candidate prompt
    const scoredList: ScoredPrompt[] = uninteracted.map((p, idx) => {
      let score = 0;

      // Affinity score
      score += (roleWeights[p.role] || 0) * 5;
      score += (pillarWeights[p.pillar] || 0) * 3;
      p.recommendedTools.forEach((t) => {
        score += (toolWeights[t] || 0) * 1.5;
      });

      // Popularity & view count factor
      score += Math.log10(p.viewCount || 100) * 2;
      score += (p.copyCount / 1000) * 1.5;

      // Slight pseudo-shuffle offset to allow refresh
      if (shuffleKey > 0) {
        score += ((idx * 7 + shuffleKey * 13) % 11) * 0.3;
      }

      // 4. Construct human-friendly, transparent recommendation reason
      let reason = 'Được cộng đồng văn phòng đánh giá cao';

      if (hasSignals) {
        if (roleWeights[p.role] && roleWeights[p.role] >= 4) {
          reason = `Phù hợp với chuyên môn ${p.role} bạn vừa sao chép`;
        } else if (lastViewedArticle && lastViewedArticle.role === p.role) {
          reason = `Bổ trợ trực tiếp cho bài viết ${lastViewedArticle.role} bạn vừa đọc`;
        } else if (pillarWeights[p.pillar] && pillarWeights[p.pillar] >= 2) {
          reason = `Cùng trụ cột ${p.pillar} bạn đang tìm hiểu`;
        } else if (p.agentType) {
          reason = `Mẫu Agent tự động hóa nâng cao cho ${p.role}`;
        } else if (topAffinityRole) {
          reason = `Gợi ý theo thói quen quan tâm phòng ban ${topAffinityRole}`;
        }
      } else {
        // Cold-start fallback reasons
        if (p.copyCount > 1800) {
          reason = `🔥 Top 3 mẫu câu lệnh có lượt sao chép cao nhất (${p.copyCount.toLocaleString('vi-VN')} copy)`;
        } else if (p.role === 'Kế toán' || p.role === 'Hành chính') {
          reason = `Tiết kiệm 60 phút xử lý Excel & văn bản hàng ngày`;
        } else {
          reason = `Công thức chuẩn 4 bước dành cho ${p.role}`;
        }
      }

      return {
        prompt: p,
        score,
        reason,
      };
    });

    // 5. Sort descending by score and pick top 3
    scoredList.sort((a, b) => b.score - a.score);
    return scoredList.slice(0, 3);
  }, [
    prompts,
    articles,
    copiedPromptIds,
    viewedArticleIds,
    interactedPromptIdSet,
    selectedRole,
    shuffleKey,
  ]);

  const hasInteractions =
    copiedPromptIds.length > 0 || viewedArticleIds.length > 0;

  return (
    <section className="space-y-4">
      {/* Header Container */}
      <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-r from-emerald-50/60 via-teal-50/30 to-blue-50/40 dark:from-emerald-950/20 dark:via-slate-900 dark:to-slate-900 p-6 md:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Cá nhân hóa theo hành vi · Dành riêng cho bạn
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex flex-wrap items-center gap-2.5">
              <span>Gợi ý cho bạn — 3 Prompt liên quan nhất chưa khám phá</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 tabular-nums">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                3 mẫu mới
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {hasInteractions ? (
                <>
                  Dựa trên <strong>{copiedPromptIds.length}</strong> Prompt bạn đã sao chép và{' '}
                  <strong>{viewedArticleIds.length}</strong> bài viết bạn đã đọc, hệ thống tự động lọc ra 3 mẫu câu lệnh có độ tương đồng cao nhất mà bạn <em>chưa từng tương tác</em>.
                </>
              ) : (
                <>
                  Chưa ghi nhận lượt chép hoặc xem bài viết nào. Đây là 3 mẫu câu lệnh có tỷ lệ áp dụng thành công cao nhất được đề xuất cho bạn khởi đầu:
                </>
              )}
            </p>
          </div>

          {/* Action pills: Activity status & Refresh */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-xl shadow-xs">
              <span className="flex items-center gap-1">
                <Copy className="w-3.5 h-3.5 text-emerald-600" />
                <strong>{copiedPromptIds.length}</strong> đã chép
              </span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                <strong>{viewedArticleIds.length}</strong> đã xem
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShuffleKey((prev) => prev + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer shadow-xs"
              title="Đổi nhóm gợi ý khác phù hợp"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đổi gợi ý</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToPrompts}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer shadow-xs"
            >
              <span>Xem Thư viện</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Recommended Cards Grid */}
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-5">
            {recommendations.map(({ prompt: p, reason }) => {
              const isCopied = quickCopiedId === p.id;
              const isFav = favoritePromptIds.includes(p.id);

              return (
                <article
                  key={`home-rec-${p.id}`}
                  onClick={() => onOpenPromptModal(p)}
                  className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:shadow-xl hover:border-emerald-500/60 transition-all"
                >
                  <div className="space-y-3.5">
                    {/* Artwork with Quick Favorite */}
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

                      {/* Top-Right Favorite Bookmark */}
                      <button
                        type="button"
                        onClick={(e) => onToggleFavoritePrompt(p.id, e)}
                        className={`absolute top-2.5 right-2.5 h-8 w-8 rounded-xl flex items-center justify-center border shadow-sm transition-colors cursor-pointer ${
                          isFav
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:bg-slate-900'
                        }`}
                        title={isFav ? 'Bỏ lưu yêu thích' : 'Lưu vào Lộ trình của tôi'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      {onSharePrompt && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSharePrompt(p);
                          }}
                          className="absolute top-2.5 right-11 h-8 w-8 rounded-xl flex items-center justify-center border border-slate-700 bg-slate-900/80 text-slate-200 hover:bg-slate-900 hover:text-emerald-400 transition-colors cursor-pointer"
                          title="Chia sẻ Prompt: Tạo ảnh PNG hoặc sao chép link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Top-Left 'Chưa tương tác' Indicator */}
                      <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-xl bg-slate-900/85 backdrop-blur-xs border border-slate-700/80 px-2.5 py-1 text-[10px] font-bold text-amber-300 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Chưa mở</span>
                      </div>
                    </div>

                    {/* Transparent AI Reason Badge */}
                    <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                      <Compass className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{reason}</span>
                    </div>

                    {/* Metadata Strip */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        {p.role}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{p.level}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-medium text-slate-600 dark:text-slate-300 tabular-nums">
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        {(p.viewCount || 0).toLocaleString('vi-VN')} xem
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-600 dark:text-slate-300 tabular-nums">
                        {p.copyCount.toLocaleString('vi-VN')} copy
                      </span>
                    </div>

                    {/* Title & Situation */}
                    <div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {p.situation}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickCopyPrompt(p);
                        }}
                        className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer shadow-xs ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 dark:bg-emerald-600 text-white hover:opacity-90'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>

                      {onSharePrompt && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSharePrompt(p);
                          }}
                          className="h-8 w-8 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-500 transition-colors cursor-pointer"
                          title="Chia sẻ Prompt: Tạo ảnh PNG hoặc sao chép link"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenPromptModal(p)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 hover:underline cursor-pointer"
                    >
                      <span>Xem &amp; Điền mẫu</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* All prompts interacted with */
          <div className="rounded-2xl border border-dashed border-emerald-300 dark:border-emerald-800 bg-white/60 dark:bg-slate-900/60 p-6 text-center space-y-2 mt-4">
            <UserCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Bạn đã tương tác và khám phá toàn bộ các Prompt trong Thư viện!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Tuyệt vời! Bạn có thể xem lại các mẫu đã lưu trong &apos;Lộ trình của tôi&apos; hoặc truy cập kho AI Agent nâng cao.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
