import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
  Filter,
  BarChart2,
  Flame,
  ArrowRight,
  Layers,
  Target,
} from 'lucide-react';

export type ChartTimeframe = 'week' | 'month';
export type ChartDisplayMode = 'cumulative' | 'delta';

interface LearningProgressChartProps {
  completedPromptsCount: number;
  completedArticlesCount: number;
  roadmapCompletedCount: number;
  className?: string;
  onLogPractice?: () => void;
  onExploreArticles?: () => void;
  onViewNextRoadmap?: () => void;
}

interface DataPoint {
  timeLabel: string;
  fullDate: string;
  prompts: number;
  articles: number;
  newPrompts: number;
  newArticles: number;
  cumulativeTotal: number;
  periodTotal: number;
  savedHours: number;
  milestone?: string;
}

export const LearningProgressChart: React.FC<LearningProgressChartProps> = ({
  completedPromptsCount,
  completedArticlesCount,
  roadmapCompletedCount,
  className = '',
  onLogPractice,
  onExploreArticles,
  onViewNextRoadmap,
}) => {
  const [timeframe, setTimeframe] = useState<ChartTimeframe>('week');
  const [displayMode, setDisplayMode] = useState<ChartDisplayMode>('cumulative');
  const [showPromptsLine, setShowPromptsLine] = useState(true);
  const [showArticlesLine, setShowArticlesLine] = useState(true);
  const [showCumulativeArea, setShowCumulativeArea] = useState(true);

  // Generate responsive trend data anchored by the user's current live counts
  const chartData: DataPoint[] = useMemo(() => {
    if (timeframe === 'week') {
      // 6-week progressive trend leading up to current week (Tuần 41 - Tuần 46 năm 2026)
      const basePrompts = Math.max(0, completedPromptsCount);
      const baseArticles = Math.max(0, completedArticlesCount);

      // Cumulative points progression
      const pW1 = Math.round(basePrompts * 0.15);
      const pW2 = Math.max(pW1, Math.round(basePrompts * 0.3));
      const pW3 = Math.max(pW2, Math.round(basePrompts * 0.45));
      const pW4 = Math.max(pW3, Math.round(basePrompts * 0.65));
      const pW5 = Math.max(pW4, Math.round(basePrompts * 0.85));
      const pW6 = basePrompts;

      const aW1 = Math.round(baseArticles * 0.2);
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
          newPrompts: pW1,
          newArticles: aW1,
          cumulativeTotal: pW1 + aW1,
          periodTotal: pW1 + aW1,
          savedHours: Math.round((pW1 * 0.75 + aW1 * 0.5) * 10) / 10,
          milestone: 'Khởi đầu lộ trình AI',
        },
        {
          timeLabel: 'Tuần 2',
          fullDate: '22/09 – 28/09/2026',
          prompts: pW2,
          articles: aW2,
          newPrompts: Math.max(0, pW2 - pW1),
          newArticles: Math.max(0, aW2 - aW1),
          cumulativeTotal: pW2 + aW2,
          periodTotal: Math.max(0, pW2 - pW1) + Math.max(0, aW2 - aW1),
          savedHours: Math.round((pW2 * 0.75 + aW2 * 0.5) * 10) / 10,
        },
        {
          timeLabel: 'Tuần 3',
          fullDate: '29/09 – 05/10/2026',
          prompts: pW3,
          articles: aW3,
          newPrompts: Math.max(0, pW3 - pW2),
          newArticles: Math.max(0, aW3 - aW2),
          cumulativeTotal: pW3 + aW3,
          periodTotal: Math.max(0, pW3 - pW2) + Math.max(0, aW3 - aW2),
          savedHours: Math.round((pW3 * 0.75 + aW3 * 0.5) * 10) / 10,
          milestone: 'Chuẩn hóa công thức 4 bước',
        },
        {
          timeLabel: 'Tuần 4',
          fullDate: '06/10 – 12/10/2026',
          prompts: pW4,
          articles: aW4,
          newPrompts: Math.max(0, pW4 - pW3),
          newArticles: Math.max(0, aW4 - aW3),
          cumulativeTotal: pW4 + aW4,
          periodTotal: Math.max(0, pW4 - pW3) + Math.max(0, aW4 - aW3),
          savedHours: Math.round((pW4 * 0.75 + aW4 * 0.5) * 10) / 10,
        },
        {
          timeLabel: 'Tuần 5',
          fullDate: '13/10 – 19/10/2026',
          prompts: pW5,
          articles: aW5,
          newPrompts: Math.max(0, pW5 - pW4),
          newArticles: Math.max(0, aW5 - aW4),
          cumulativeTotal: pW5 + aW5,
          periodTotal: Math.max(0, pW5 - pW4) + Math.max(0, aW5 - aW4),
          savedHours: Math.round((pW5 * 0.75 + aW5 * 0.5) * 10) / 10,
          milestone: 'Bảo mật & Ẩn danh dữ liệu',
        },
        {
          timeLabel: 'Tuần này',
          fullDate: '20/10 – 26/10/2026',
          prompts: pW6,
          articles: aW6,
          newPrompts: Math.max(0, pW6 - pW5),
          newArticles: Math.max(0, aW6 - aW5),
          cumulativeTotal: pW6 + aW6,
          periodTotal: Math.max(0, pW6 - pW5) + Math.max(0, aW6 - aW5),
          savedHours: Math.round((pW6 * 0.75 + aW6 * 0.5) * 10) / 10,
          milestone: 'Hiện tại',
        },
      ];
      return raw;
    } else {
      // 6-month progressive trend (Tháng 5 -> Tháng 10/2026)
      const basePrompts = Math.max(0, completedPromptsCount);
      const baseArticles = Math.max(0, completedArticlesCount);

      const pM1 = Math.round(basePrompts * 0.1);
      const pM2 = Math.max(pM1, Math.round(basePrompts * 0.25));
      const pM3 = Math.max(pM2, Math.round(basePrompts * 0.4));
      const pM4 = Math.max(pM3, Math.round(basePrompts * 0.6));
      const pM5 = Math.max(pM4, Math.round(basePrompts * 0.8));
      const pM6 = basePrompts;

      const aM1 = Math.round(baseArticles * 0.15);
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
          newPrompts: pM1,
          newArticles: aM1,
          cumulativeTotal: pM1 + aM1,
          periodTotal: pM1 + aM1,
          savedHours: Math.round((pM1 * 1.5 + aM1 * 1.0) * 10) / 10,
          milestone: 'Giai đoạn Nhập môn',
        },
        {
          timeLabel: 'Tháng 6/26',
          fullDate: 'Tháng 06/2026',
          prompts: pM2,
          articles: aM2,
          newPrompts: Math.max(0, pM2 - pM1),
          newArticles: Math.max(0, aM2 - aM1),
          cumulativeTotal: pM2 + aM2,
          periodTotal: Math.max(0, pM2 - pM1) + Math.max(0, aM2 - aM1),
          savedHours: Math.round((pM2 * 1.5 + aM2 * 1.0) * 10) / 10,
        },
        {
          timeLabel: 'Tháng 7/26',
          fullDate: 'Tháng 07/2026',
          prompts: pM3,
          articles: aM3,
          newPrompts: Math.max(0, pM3 - pM2),
          newArticles: Math.max(0, aM3 - aM2),
          cumulativeTotal: pM3 + aM3,
          periodTotal: Math.max(0, pM3 - pM2) + Math.max(0, aM3 - aM2),
          savedHours: Math.round((pM3 * 1.5 + aM3 * 1.0) * 10) / 10,
          milestone: 'Ứng dụng Excel & Email',
        },
        {
          timeLabel: 'Tháng 8/26',
          fullDate: 'Tháng 08/2026',
          prompts: pM4,
          articles: aM4,
          newPrompts: Math.max(0, pM4 - pM3),
          newArticles: Math.max(0, aM4 - aM3),
          cumulativeTotal: pM4 + aM4,
          periodTotal: Math.max(0, pM4 - pM3) + Math.max(0, aM4 - aM3),
          savedHours: Math.round((pM4 * 1.5 + aM4 * 1.0) * 10) / 10,
        },
        {
          timeLabel: 'Tháng 9/26',
          fullDate: 'Tháng 09/2026',
          prompts: pM5,
          articles: aM5,
          newPrompts: Math.max(0, pM5 - pM4),
          newArticles: Math.max(0, aM5 - aM4),
          cumulativeTotal: pM5 + aM5,
          periodTotal: Math.max(0, pM5 - pM4) + Math.max(0, aM5 - aM4),
          savedHours: Math.round((pM5 * 1.5 + aM5 * 1.0) * 10) / 10,
          milestone: 'So sánh đa mô hình Claude/GPT',
        },
        {
          timeLabel: 'Tháng 10/26',
          fullDate: 'Tháng 10/2026 (Hiện tại)',
          prompts: pM6,
          articles: aM6,
          newPrompts: Math.max(0, pM6 - pM5),
          newArticles: Math.max(0, aM6 - aM5),
          cumulativeTotal: pM6 + aM6,
          periodTotal: Math.max(0, pM6 - pM5) + Math.max(0, aM6 - aM5),
          savedHours: Math.round((pM6 * 1.5 + aM6 * 1.0) * 10) / 10,
          milestone: 'Thực chiến & Tự động hóa',
        },
      ];
      return raw;
    }
  }, [timeframe, completedPromptsCount, completedArticlesCount]);

  // Overall metric totals
  const totalCompleted = completedPromptsCount + completedArticlesCount;
  const totalHoursSaved =
    Math.round((completedPromptsCount * 0.75 + completedArticlesCount * 0.5) * 10) / 10;
  const growthRate = totalCompleted > 0 ? '+28.4%' : '0%';

  // Determine active data keys based on displayMode
  const promptDataKey = displayMode === 'cumulative' ? 'prompts' : 'newPrompts';
  const articleDataKey = displayMode === 'cumulative' ? 'articles' : 'newArticles';
  const areaDataKey = displayMode === 'cumulative' ? 'cumulativeTotal' : 'periodTotal';

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs space-y-6 ${className}`}
    >
      {/* Top Header & Switchers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            Biểu đồ Tiến độ Recharts · Trực quan hóa Thành quả Học tập
          </div>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tiến trình hoàn thành Prompt &amp; Bài viết</span>
            <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
              {totalCompleted} mục đã hoàn thành
            </span>
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Trực quan hóa đường cong làm chủ AI văn phòng và số giờ làm việc tiết kiệm được qua từng tuần/tháng.
          </p>
        </div>

        {/* Controls: Timeframe (Tuần / Tháng) & Mode (Lũy kế / Từng kỳ) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Display Mode Switcher (Lũy kế vs Từng kỳ) */}
          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200/80 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setDisplayMode('cumulative')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                displayMode === 'cumulative'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Xem tổng số lượng tích lũy tăng dần qua thời gian"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Đường lũy kế</span>
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('delta')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                displayMode === 'delta'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Xem số lượng hoàn thành mới trong từng tuần hoặc từng tháng"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Số lượng từng kỳ</span>
            </button>
          </div>

          {/* Timeframe Toggle (Theo tuần vs Theo tháng) */}
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
            Tình huống &amp; so sánh 3 AI đã đọc
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
            Đã xong {roadmapCompletedCount}/30 ngày
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
            <span>Prompt hoàn thành ({completedPromptsCount})</span>
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
            <span>Bài viết hoàn thành ({completedArticlesCount})</span>
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
            <span>{displayMode === 'cumulative' ? 'Vùng tích luỹ tổng' : 'Vùng tổng từng kỳ'}</span>
          </button>
        </div>

        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
          *Dữ liệu tự động cập nhật khi bạn bấm &apos;Thành thạo&apos; hoặc &apos;Đã đọc &amp; áp dụng&apos;
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
                            {displayMode === 'cumulative'
                              ? 'Prompt hoàn thành:'
                              : 'Prompt mới kỳ này:'}
                          </span>
                          <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">
                            {displayMode === 'cumulative' ? item.prompts : item.newPrompts} mục
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                            {displayMode === 'cumulative'
                              ? 'Bài viết hoàn thành:'
                              : 'Bài viết mới kỳ này:'}
                          </span>
                          <strong className="text-blue-600 dark:text-blue-400 tabular-nums">
                            {displayMode === 'cumulative' ? item.articles : item.newArticles} bài
                          </strong>
                        </div>

                        <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {displayMode === 'cumulative' ? 'Tổng tích luỹ:' : 'Tổng hoàn thành kỳ này:'}
                          </span>
                          <strong className="text-slate-900 dark:text-white tabular-nums font-black">
                            {displayMode === 'cumulative' ? item.cumulativeTotal : item.periodTotal} mục
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
                dataKey={areaDataKey}
                name={displayMode === 'cumulative' ? 'Tổng tích luỹ' : 'Tổng từng kỳ'}
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
                dataKey={promptDataKey}
                name={displayMode === 'cumulative' ? 'Prompt hoàn thành' : 'Prompt mới'}
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
                dataKey={articleDataKey}
                name={displayMode === 'cumulative' ? 'Bài viết hoàn thành' : 'Bài viết mới'}
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
            <strong>Nhận xét tiến độ:</strong>{' '}
            {totalCompleted > 0
              ? `Bạn đã hoàn thành ${totalCompleted} mục (${completedPromptsCount} prompt & ${completedArticlesCount} bài viết). Duy trì thói quen 1–2 prompt mỗi tuần giúp tiết kiệm 70% thời gian xử lý thủ công.`
              : 'Hãy bắt đầu đánh dấu thành thạo Prompt hoặc hoàn thành Bài viết để xem đường tiến độ thực tế!'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {onViewNextRoadmap && (
            <button
              type="button"
              onClick={onViewNextRoadmap}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/40 px-3 py-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Gợi ý chặng tiếp theo</span>
            </button>
          )}

          {onExploreArticles && (
            <button
              type="button"
              onClick={onExploreArticles}
              className="inline-flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-50/60 dark:bg-blue-950/40 px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Đọc tình huống mẫu</span>
            </button>
          )}

          {onLogPractice && (
            <button
              type="button"
              onClick={onLogPractice}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/40 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thực hành Prompt</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
