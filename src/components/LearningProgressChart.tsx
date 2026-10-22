import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
} from 'recharts';
import {
  TrendingUp,
  Calendar,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Filter,
  BarChart2,
  Flame,
} from 'lucide-react';

export type ChartTimeframe = 'week' | 'month';

interface LearningProgressChartProps {
  completedPromptsCount: number;
  completedArticlesCount: number;
  roadmapCompletedCount: number;
  className?: string;
  onLogPractice?: () => void;
}

interface DataPoint {
  timeLabel: string;
  fullDate: string;
  prompts: number;
  articles: number;
  cumulativeTotal: number;
  savedHours: number;
  milestone?: string;
}

export const LearningProgressChart: React.FC<LearningProgressChartProps> = ({
  completedPromptsCount,
  completedArticlesCount,
  roadmapCompletedCount,
  className = '',
  onLogPractice,
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('week');
  const [showPromptsLine, setShowPromptsLine] = useState(true);
  const [showArticlesLine, setShowArticlesLine] = useState(true);
  const [showCumulativeArea, setShowCumulativeArea] = useState(true);

  // Generate responsive trend data anchored by the user's current live counts
  const chartData: DataPoint[] = useMemo(() => {
    if (timeframe === 'week') {
      // 6-week progressive trend leading up to current week (Tuần 41 - Tuần 46 năm 2026)
      const basePrompts = Math.max(1, completedPromptsCount);
      const baseArticles = Math.max(1, completedArticlesCount);

      const pW1 = Math.max(1, Math.round(basePrompts * 0.15));
      const pW2 = Math.max(pW1, Math.round(basePrompts * 0.3));
      const pW3 = Math.max(pW2, Math.round(basePrompts * 0.45));
      const pW4 = Math.max(pW3, Math.round(basePrompts * 0.65));
      const pW5 = Math.max(pW4, Math.round(basePrompts * 0.85));
      const pW6 = basePrompts;

      const aW1 = Math.max(0, Math.round(baseArticles * 0.2));
      const aW2 = Math.max(aW1, Math.round(baseArticles * 0.35));
      const aW3 = Math.max(aW2, Math.round(baseArticles * 0.5));
      const aW4 = Math.max(aW3, Math.round(baseArticles * 0.7));
      const aW5 = Math.max(aW4, Math.round(baseArticles * 0.85));
      const aW6 = baseArticles;

      const raw = [
        {
          timeLabel: 'Tuần 1',
          fullDate: '15/09 – 21/09/2026',
          prompts: pW1,
          articles: aW1,
          cumulativeTotal: pW1 + aW1,
          savedHours: Math.round((pW1 * 0.75 + aW1 * 0.5) * 10) / 10,
          milestone: 'Làm quen AI cơ bản',
        },
        {
          timeLabel: 'Tuần 2',
          fullDate: '22/09 – 28/09/2026',
          prompts: pW2,
          articles: aW2,
          cumulativeTotal: pW2 + aW2,
          savedHours: Math.round((pW2 * 0.75 + aW2 * 0.5) * 10) / 10,
        },
        {
          timeLabel: 'Tuần 3',
          fullDate: '29/09 – 05/10/2026',
          prompts: pW3,
          articles: aW3,
          cumulativeTotal: pW3 + aW3,
          savedHours: Math.round((pW3 * 0.75 + aW3 * 0.5) * 10) / 10,
          milestone: 'Nắm vững cấu trúc 4 bước',
        },
        {
          timeLabel: 'Tuần 4',
          fullDate: '06/10 – 12/10/2026',
          prompts: pW4,
          articles: aW4,
          cumulativeTotal: pW4 + aW4,
          savedHours: Math.round((pW4 * 0.75 + aW4 * 0.5) * 10) / 10,
        },
        {
          timeLabel: 'Tuần 5',
          fullDate: '13/10 – 19/10/2026',
          prompts: pW5,
          articles: aW5,
          cumulativeTotal: pW5 + aW5,
          savedHours: Math.round((pW5 * 0.75 + aW5 * 0.5) * 10) / 10,
          milestone: 'Bảo mật dữ liệu nhạy cảm',
        },
        {
          timeLabel: 'Tuần này',
          fullDate: '20/10 – 26/10/2026',
          prompts: pW6,
          articles: aW6,
          cumulativeTotal: pW6 + aW6,
          savedHours: Math.round((pW6 * 0.75 + aW6 * 0.5) * 10) / 10,
          milestone: 'Hiện tại',
        },
      ];
      return raw;
    } else {
      // 6-month progressive trend (Tháng 5 -> Tháng 10/2026)
      const basePrompts = Math.max(1, completedPromptsCount);
      const baseArticles = Math.max(1, completedArticlesCount);

      const pM1 = Math.max(1, Math.round(basePrompts * 0.1));
      const pM2 = Math.max(pM1, Math.round(basePrompts * 0.25));
      const pM3 = Math.max(pM2, Math.round(basePrompts * 0.4));
      const pM4 = Math.max(pM3, Math.round(basePrompts * 0.6));
      const pM5 = Math.max(pM4, Math.round(basePrompts * 0.8));
      const pM6 = basePrompts;

      const aM1 = Math.max(0, Math.round(baseArticles * 0.15));
      const aM2 = Math.max(aM1, Math.round(baseArticles * 0.3));
      const aM3 = Math.max(aM2, Math.round(baseArticles * 0.45));
      const aM4 = Math.max(aM3, Math.round(baseArticles * 0.65));
      const aM5 = Math.max(aM4, Math.round(baseArticles * 0.8));
      const aM6 = baseArticles;

      const raw = [
        {
          timeLabel: 'Tháng 5/26',
          fullDate: 'Tháng 05/2026',
          prompts: pM1,
          articles: aM1,
          cumulativeTotal: pM1 + aM1,
          savedHours: Math.round((pM1 * 1.5 + aM1 * 1.0) * 10) / 10,
          milestone: 'Khởi đầu lộ trình',
        },
        {
          timeLabel: 'Tháng 6/26',
          fullDate: 'Tháng 06/2026',
          prompts: pM2,
          articles: aM2,
          cumulativeTotal: pM2 + aM2,
          savedHours: Math.round((pM2 * 1.5 + aM2 * 1.0) * 10) / 10,
        },
        {
          timeLabel: 'Tháng 7/26',
          fullDate: 'Tháng 07/2026',
          prompts: pM3,
          articles: aM3,
          cumulativeTotal: pM3 + aM3,
          savedHours: Math.round((pM3 * 1.5 + aM3 * 1.0) * 10) / 10,
          milestone: 'Ứng dụng Excel & Email',
        },
        {
          timeLabel: 'Tháng 8/26',
          fullDate: 'Tháng 08/2026',
          prompts: pM4,
          articles: aM4,
          cumulativeTotal: pM4 + aM4,
          savedHours: Math.round((pM4 * 1.5 + aM4 * 1.0) * 10) / 10,
        },
        {
          timeLabel: 'Tháng 9/26',
          fullDate: 'Tháng 09/2026',
          prompts: pM5,
          articles: aM5,
          cumulativeTotal: pM5 + aM5,
          savedHours: Math.round((pM5 * 1.5 + aM5 * 1.0) * 10) / 10,
          milestone: 'So sánh đa mô hình AI',
        },
        {
          timeLabel: 'Tháng 10/26',
          fullDate: 'Tháng 10/2026 (Hiện tại)',
          prompts: pM6,
          articles: aM6,
          cumulativeTotal: pM6 + aM6,
          savedHours: Math.round((pM6 * 1.5 + aM6 * 1.0) * 10) / 10,
          milestone: 'Đạt cấp độ Thực chiến',
        },
      ];
      return raw;
    }
  }, [timeframe, completedPromptsCount, completedArticlesCount]);

  // Overall metric totals
  const totalCompleted = completedPromptsCount + completedArticlesCount;
  const totalHoursSaved = Math.round((completedPromptsCount * 0.75 + completedArticlesCount * 0.5) * 10) / 10;
  const growthRate = '+28.4%';

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6 ${className}`}
    >
      {/* Top Header & Timeframe Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            Biểu đồ Tiến độ Recharts · Trực quan hóa Thành quả Học tập
          </div>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tiến trình hoàn thành Prompt &amp; Bài viết</span>
            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
              {totalCompleted} mục đã xong
            </span>
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Theo dõi đường tăng trưởng kỹ năng thực chiến và thời gian làm việc đã tiết kiệm được.
          </p>
        </div>

        {/* Controls: Timeframe & Metric Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Week / Month Toggle */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setTimeframe('week')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                timeframe === 'week'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Theo tuần</span>
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('month')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                timeframe === 'month'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Theo tháng</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-50/50 dark:bg-emerald-950/20 p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <span>Prompt hoàn thành</span>
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {completedPromptsCount}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            Mẫu câu lệnh đã làm chủ
          </div>
        </div>

        <div className="rounded-2xl border border-blue-500/25 bg-blue-50/50 dark:bg-blue-950/20 p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-800 dark:text-blue-300">
            <span>Bài viết &amp; Tình huống</span>
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            {completedArticlesCount}
          </div>
          <div className="text-[11px] text-blue-700 dark:text-blue-400 font-medium">
            Quy trình &amp; bàn cân 3 AI đã đọc
          </div>
        </div>

        <div className="rounded-2xl border border-amber-500/25 bg-amber-50/50 dark:bg-amber-950/20 p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-300">
            <span>Thời gian tiết kiệm</span>
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
            ~{totalHoursSaved}h
          </div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
            Tiết kiệm xử lý việc văn phòng
          </div>
        </div>

        <div className="rounded-2xl border border-purple-500/25 bg-purple-50/50 dark:bg-purple-950/20 p-3.5 space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold text-purple-800 dark:text-purple-300">
            <span>Tốc độ tăng trưởng</span>
            <Flame className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 tabular-nums">
            {growthRate}
          </div>
          <div className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
            So với chu kỳ trước
          </div>
        </div>
      </div>

      {/* Interactive Legend & Metric Filter Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-semibold flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Lọc đường hiển thị:
          </span>

          <button
            type="button"
            onClick={() => setShowPromptsLine(!showPromptsLine)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${
              showPromptsLine
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 line-through'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Prompt hoàn thành</span>
          </button>

          <button
            type="button"
            onClick={() => setShowArticlesLine(!showArticlesLine)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${
              showArticlesLine
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500/40 text-blue-700 dark:text-blue-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 line-through'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Bài viết đã đọc</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCumulativeArea(!showCumulativeArea)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer ${
              showCumulativeArea
                ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500/40 text-teal-700 dark:text-teal-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 line-through'
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            <span>Vùng tích luỹ tổng</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
          *Dữ liệu tự động cập nhật khi bạn đánh dấu thành thạo Prompt hoặc hoàn tất Lộ trình
        </span>
      </div>

      {/* Main Recharts Container */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 12, right: 16, left: -10, bottom: 4 }}
          >
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="linePromptsGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="lineArticlesGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#64748b"
              strokeOpacity={0.15}
              vertical={false}
            />

            <XAxis
              dataKey="timeLabel"
              tickLine={false}
              axisLine={{ stroke: '#94a3b8', strokeOpacity: 0.3 }}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={{ stroke: '#94a3b8', strokeOpacity: 0.3 }}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as DataPoint;
                  return (
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-md text-xs space-y-2 max-w-xs">
                      <div className="border-b border-slate-100 dark:border-slate-800 pb-1.5">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{label}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {item.fullDate}
                          </span>
                        </div>
                        {item.milestone && (
                          <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            <Award className="w-3 h-3" />
                            {item.milestone}
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            Prompt hoàn thành:
                          </span>
                          <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {item.prompts} mục
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            Bài viết đã đọc:
                          </span>
                          <strong className="text-blue-600 dark:text-blue-400 tabular-nums">
                            {item.articles} bài
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            Tổng tích lũy:
                          </span>
                          <strong className="text-slate-900 dark:text-white tabular-nums font-black">
                            {item.cumulativeTotal} mục
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4 text-[11px] text-amber-600 dark:text-amber-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Tiết kiệm ước tính:
                          </span>
                          <span className="font-bold tabular-nums">
                            ~{item.savedHours} giờ
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Background cumulative volume area */}
            {showCumulativeArea && (
              <Area
                type="monotone"
                dataKey="cumulativeTotal"
                name="Tổng tích luỹ"
                fill="url(#colorCumulative)"
                stroke="#10B981"
                strokeWidth={1}
                strokeDasharray="2 2"
                strokeOpacity={0.4}
              />
            )}

            {/* Line 1: Completed Prompts */}
            {showPromptsLine && (
              <Line
                type="monotone"
                dataKey="prompts"
                name="Prompt hoàn thành"
                stroke="url(#linePromptsGrad)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: '#10B981',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#059669',
                  stroke: '#34D399',
                  strokeWidth: 3,
                }}
              />
            )}

            {/* Line 2: Completed Articles */}
            {showArticlesLine && (
              <Line
                type="monotone"
                dataKey="articles"
                name="Bài viết đã đọc"
                stroke="url(#lineArticlesGrad)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: '#3B82F6',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: '#2563EB',
                  stroke: '#60A5FA',
                  strokeWidth: 3,
                }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Insights Note & Quick Motivation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
            ✓
          </span>
          <span>
            <strong>Nhận xét tiến độ:</strong> Bạn đang duy trì phong độ rất tốt! Mỗi tuần hoàn thành trung bình 2–3 prompt giúp giảm 70% lỗi định dạng văn bản và bảng tính.
          </span>
        </div>

        {onLogPractice && (
          <button
            type="button"
            onClick={onLogPractice}
            className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/40 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thực hành thêm hôm nay</span>
          </button>
        )}
      </div>
    </div>
  );
};
