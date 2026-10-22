import React, { useState } from 'react';
import {
  ArticleItem,
  OfficeRole,
  Pillar,
  PromptItem,
  SiteConfig,
  SkillLevel,
  AIToolName,
  TEN_VIDEO_SCRIPTS,
  WEEKLY_SOLO_WORKFLOW,
} from '../data/siteData';
import { Check, Copy, Download, Plus, Trash2, RotateCcw } from 'lucide-react';

interface SubscriberRecord {
  email: string;
  role: string;
  createdAt: string;
}

interface NonTechAdminViewProps {
  siteConfig: SiteConfig;
  onUpdateConfig: (next: SiteConfig) => void;
  prompts: PromptItem[];
  onAddPrompt: (p: PromptItem) => void;
  onDeletePrompt: (id: string) => void;
  articles: ArticleItem[];
  onAddArticle: (a: ArticleItem) => void;
  onDeleteArticle: (id: string) => void;
  subscribers: SubscriberRecord[];
  onResetAllData: () => void;
}

const SEVEN_DAY_LAUNCH_TASKS = [
  '1. Chốt tên thương hiệu & kiểm tra tên kênh TikTok / Facebook đồng nhất',
  '2. Cấu hình 5 trang lõi: Trang chủ, Lộ trình 30 ngày, Thư viện Prompt, Quà 50 Prompt, Chính sách',
  '3. Soạn và kiểm duyệt 30 prompt thực tế đầu tiên cho bộ quà tặng "50 Prompt Công Sở"',
  '4. Đăng 6–8 bài viết nền tảng (Nhập môn & Kỹ năng nền) kèm ngày cập nhật rõ ràng',
  '5. Tạo kênh TikTok, Facebook Page và quay gộp 3 video ngắn đầu tiên (35–45 giây)',
  '6. Bật thu thập Email nhận quà, kiểm tra hiển thị trên màn hình điện thoại di động',
  '7. Thiết lập lịch sao lưu dữ liệu JSON định kỳ mỗi tuần 1 lần',
];

export const NonTechAdminView: React.FC<NonTechAdminViewProps> = ({
  siteConfig,
  onUpdateConfig,
  prompts,
  onAddPrompt,
  onDeletePrompt,
  articles,
  onAddArticle,
  onDeleteArticle,
  subscribers,
  onResetAllData,
}) => {
  const [adminTab, setAdminTab] = useState<'workflow' | 'prompts' | 'articles' | 'settings'>('workflow');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>(() => {
    try {
      const saved = localStorage.getItem('aicongso_7day_tasks');
      return saved ? JSON.parse(saved) : { 0: true, 1: true, 2: true };
    } catch {
      return { 0: true, 1: true, 2: true };
    }
  });

  // New Prompt Form State
  const [pTitle, setPTitle] = useState('');
  const [pSituation, setPSituation] = useState('');
  const [pPillar, setPPillar] = useState<Pillar>('Công thức theo vị trí');
  const [pRole, setPRole] = useState<OfficeRole>('Hành chính');
  const [pLevel, setPLevel] = useState<SkillLevel>('Cơ bản');
  const [pTemplate, setPTemplate] = useState('');
  const [pSample, setPSample] = useState('');
  const [pSecurity, setPSecurity] = useState('Ẩn tên công ty và thông tin cá nhân trước khi gửi AI.');
  const [promptSavedMsg, setPromptSavedMsg] = useState(false);

  // New Article Form State
  const [aTitle, setATitle] = useState('');
  const [aSubtitle, setASubtitle] = useState('');
  const [aPillar, setAPillar] = useState<Pillar>('Kỹ năng nền');
  const [aRole, setARole] = useState<OfficeRole>('Hành chính');
  const [aLevel, setALevel] = useState<SkillLevel>('Cơ bản');
  const [aContext, setAContext] = useState('');
  const [aBadPrompt, setABadPrompt] = useState('');
  const [aGoodPrompt, setAGoodPrompt] = useState('');
  const [articleSavedMsg, setArticleSavedMsg] = useState(false);

  const toggleSevenDayTask = (idx: number) => {
    const next = { ...checkedTasks, [idx]: !checkedTasks[idx] };
    setCheckedTasks(next);
    localStorage.setItem('aicongso_7day_tasks', JSON.stringify(next));
  };

  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle.trim() || !pTemplate.trim()) return;

    const newPrompt: PromptItem = {
      id: `prompt-${Date.now()}`,
      title: pTitle.trim(),
      situation: pSituation.trim() || 'Tình huống công sở thực tế tại Việt Nam.',
      pillar: pPillar,
      role: pRole,
      level: pLevel,
      recommendedTools: ['Claude', 'ChatGPT', 'Gemini'] as AIToolName[],
      bestToolNote: 'Claude mạnh về văn phong tiếng Việt; ChatGPT mạnh về cấu trúc bảng biểu.',
      template: pTemplate.trim(),
      variables: [
        {
          key: 'BOI_CANH_RIENG',
          label: 'Thông tin chi tiết của bạn',
          placeholder: 'Nhập bối cảnh cụ thể...',
          defaultValue: 'Thông tin mẫu đã ẩn danh',
        },
      ],
      sampleOutput: pSample.trim() || 'Kết quả mẫu chuẩn văn phong công sở Việt Nam.',
      securityTip: pSecurity.trim(),
      updatedAt: '10/2026',
      copyCount: 1,
    };

    onAddPrompt(newPrompt);
    setPTitle('');
    setPSituation('');
    setPTemplate('');
    setPSample('');
    setPromptSavedMsg(true);
    setTimeout(() => setPromptSavedMsg(false), 2500);
  };

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aTitle.trim() || !aGoodPrompt.trim()) return;

    const newArticle: ArticleItem = {
      id: `art-${Date.now()}`,
      title: aTitle.trim(),
      subtitle: aSubtitle.trim() || 'Hướng dẫn thực tế áp dụng ngay vào sáng mai.',
      pillar: aPillar,
      role: aRole,
      level: aLevel,
      tools: ['Claude', 'ChatGPT', 'Gemini'],
      updatedAt: 'Cập nhật 10/2026',
      readTimeMinutes: 5,
      situationContext: aContext.trim() || 'Tình huống công việc thực tế tại văn phòng.',
      badPrompt: aBadPrompt.trim() || 'Câu lệnh ngắn thiếu bối cảnh công việc.',
      goodPrompt: aGoodPrompt.trim(),
      whyItWorks: [
        'Cung cấp đầy đủ 4 bước: Vai trò -> Bối cảnh -> Yêu cầu -> Định dạng.',
        'Ngôn ngữ tự nhiên, sát thực tế công sở Việt Nam.',
      ],
      steps: [
        {
          title: 'Bước 1: Chuẩn bị dữ liệu đã ẩn danh',
          content: 'Xóa thông tin nhạy cảm như SĐT, CCCD, tên khách hàng thật trước khi đưa vào câu lệnh.',
        },
        {
          title: 'Bước 2: Dán câu lệnh chuẩn vào Claude hoặc ChatGPT',
          content: 'Chọn công cụ phù hợp và yêu cầu xuất 2 phương án để đối chiếu.',
        },
        {
          title: 'Bước 3: Kiểm chứng lại số liệu trước khi gửi',
          content: 'Đọc lướt lại các mốc ngày tháng, con số trước khi sử dụng chính thức.',
        },
      ],
      toolComparisons: [
        {
          tool: 'Claude',
          strengths: 'Văn phong tiếng Việt tự nhiên, lịch sự.',
          sampleResponse: 'Bản nháp mượt mà, dùng được ngay.',
          verdict: 'Ưu tiên số 1 cho soạn thảo văn bản.',
        },
        {
          tool: 'ChatGPT',
          strengths: 'Trình bày bảng biểu và công thức rõ ràng.',
          sampleResponse: 'Chia mục trực quan, có cấu trúc.',
          verdict: 'Ưu tiên khi cần xử lý logic & Excel.',
        },
      ],
      securityChecklist: [
        'Đã ẩn thông tin nhạy cảm của công ty và khách hàng.',
        'Đã kiểm tra lại các con số và ngày tháng.',
      ],
      repurposeKit: {
        tiktokScripts: [
          {
            hook: `Bạn vẫn đang mất hàng giờ cho việc "${aTitle.trim()}"?`,
            body: 'Quay màn hình so sánh câu lệnh cũ vs câu lệnh 4 bước mới.',
            cta: 'Copy câu lệnh mẫu tại link trong bio nhé!',
          },
        ],
        facebookPost: `Chia sẻ nhanh công thức xử lý "${aTitle.trim()}" trong 3 phút cho anh chị em văn phòng...`,
        newsletterSnippet: `Mẹo tuần này: Áp dụng ngay mẫu câu lệnh "${aTitle.trim()}" để tiết kiệm 1 giờ làm việc sáng mai.`,
      },
    };

    onAddArticle(newArticle);
    setATitle('');
    setASubtitle('');
    setAContext('');
    setABadPrompt('');
    setAGoodPrompt('');
    setArticleSavedMsg(true);
    setTimeout(() => setArticleSavedMsg(false), 2500);
  };

  const handleExportBackupJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      siteConfig,
      prompts,
      articles,
      subscribers,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aicongso-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSubscribersCsv = () => {
    const header = 'Email,ViTriCongViec,NgayDangKy\n';
    const rows = subscribers
      .map((s) => `"${s.email}","${s.role}","${s.createdAt}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'danh-sach-email-nhan-50-prompt.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <div className="text-xs text-slate-500">
             Trung tâm Quản trị Dành cho Người Non-Tech · Không cần biết lập trình
          </div>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Quản lý Nội dung & Quy trình Vận hành Hàng tuần (10–15 giờ/tuần)
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Mọi thay đổi được lưu trực tiếp trên trình duyệt và có thể xuất file sao lưu 1 chạm bất kỳ lúc nào.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportBackupJson}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
          >
            <Download className="h-4 w-4" />
            Sao lưu toàn bộ Web (JSON)
          </button>
          <button
            onClick={onResetAllData}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Khôi phục dữ liệu gốc
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1.5">
        <button
          onClick={() => setAdminTab('workflow')}
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            adminTab === 'workflow'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          01. Lịch vận hành cùng Claude & 10 Kịch bản Video
        </button>
        <button
          onClick={() => setAdminTab('prompts')}
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            adminTab === 'prompts'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          02. Quản lý Thư viện Prompt ({prompts.length})
        </button>
        <button
          onClick={() => setAdminTab('articles')}
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            adminTab === 'articles'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          03. Quản lý Bài viết ({articles.length})
        </button>
        <button
          onClick={() => setAdminTab('settings')}
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
            adminTab === 'settings'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          04. Bật/Tắt Giai đoạn Kiếm tiền & Danh sách Email ({subscribers.length})
        </button>
      </div>

      {/* TAB 1: WORKFLOW & 10 VIDEO SCRIPTS & 7-DAY CHECKLIST */}
      {adminTab === 'workflow' && (
        <div className="space-y-8">
          {/* 7-day Checklist + 90-day overview */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-6">
              <div className="text-xs text-slate-500">Mục 12 Kế hoạch · Theo dõi tiến độ</div>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Việc cần làm trong 7 ngày đầu tiên
              </h2>
              <div className="mt-4 space-y-2.5">
                {SEVEN_DAY_LAUNCH_TASKS.map((task, idx) => (
                  <label
                    key={idx}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={!!checkedTasks[idx]}
                      onChange={() => toggleSevenDayTask(idx)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700"
                    />
                    <span
                      className={`text-sm ${
                        checkedTasks[idx] ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {task}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-6 space-y-4">
              <div className="text-xs text-slate-500">Mục 4 & Mục 10 Kế hoạch · Lộ trình 90 ngày</div>
              <h2 className="text-lg font-bold text-slate-900">
                3 Quy tắc cho người làm một mình & Mục tiêu 3 tháng
              </h2>
              <div className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 space-y-1.5">
                <p><strong>Quy tắc 1 (Làm theo lô):</strong> 1 buổi quay gộp 3 video TikTok, 1 buổi viết 2 bài web.</p>
                <p><strong>Quy tắc 2 (Làm 1 lần dùng nhiều lần):</strong> 1 bài web → 3 kịch bản TikTok → 1 bài Facebook → 1 Email.</p>
                <p><strong>Quy tắc 3 (Tập trung):</strong> Chưa làm YouTube dài, Zalo, LinkedIn trước tháng thứ 4.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-slate-200 p-3.5">
                  <div className="font-bold text-slate-900">Tháng 1: Xây nền (Chưa bán hàng)</div>
                  <p className="mt-1 text-slate-600">
                    Mục tiêu: Web chạy mượt, 6–8 bài viết, 20–30 prompt trên thư viện, 10 video ngắn, 50+ email nhận quà.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3.5">
                  <div className="font-bold text-slate-900">Tháng 2: Đều tay & Học từ số liệu</div>
                  <p className="mt-1 text-slate-600">
                    Mục tiêu: Thêm 6–8 bài theo vị trí công việc, nâng thư viện lên 60–80 prompt, gửi bản tin Email hàng tuần.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-3.5">
                  <div className="font-bold text-slate-900">Tháng 3: Dò nhu cầu & Mở Cửa hàng Template</div>
                  <p className="mt-1 text-slate-600">
                    Mục tiêu: 25–30 bài viết, 100+ prompt, 300–500 email, mở bán gói Prompt Pack / Mẫu biểu cho vị trí được hỏi nhiều nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Solo Workflow with Claude */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-xs text-slate-500">
              Mục 7 Kế hoạch · Claude là biên tập viên, bạn là người duyệt đăng
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Quy trình vận hành hàng tuần cùng Claude (3–4 giờ/tuần)
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Bấm nút "Copy Prompt cho Claude" ở từng ngày để sản xuất nội dung tuần nhanh chóng và an toàn.
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-5">
              {WEEKLY_SOLO_WORKFLOW.map((item) => (
                <div
                  key={item.day}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-slate-900">{item.day}</span>
                      <span>{item.duration}</span>
                    </div>
                    <p className="mt-2 text-xs font-semibold text-slate-800">{item.task}</p>
                    <p className="mt-2 font-mono text-[11px] leading-relaxed text-slate-600">
                      “{item.claudePrompt}”
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyText(item.day, item.claudePrompt)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
                  >
                    {copiedKey === item.day ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" />
                        Đã chép
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 10 First Video Scripts */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-xs text-slate-500">
              Mục 11 Kế hoạch · Công thức: Hook 3 giây → Demo quay màn hình → Kết quả → CTA
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900">
              10 Kịch bản Video ngắn đầu tiên (TikTok / Reels / Shorts 30–45 giây)
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {TEN_VIDEO_SCRIPTS.map((script) => (
                <div
                  key={script.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 p-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Video #{script.id}</span>
                      <span>Thời lượng: {script.durationSec}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{script.title}</h3>
                    <p className="text-xs text-slate-800">
                      <strong>Hook 3 giây:</strong> {script.hook}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Quay màn hình:</strong> {script.demoAction}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Kết quả & CTA:</strong> {script.outcome} — <em>{script.cta}</em>
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() =>
                        handleCopyText(
                          `vid-${script.id}`,
                          `Kịch bản Video #${script.id}: ${script.title}\n- Hook (0-3s): ${script.hook}\n- Demo: ${script.demoAction}\n- Kết quả: ${script.outcome}\n- CTA: ${script.cta}`
                        )
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 whitespace-nowrap shrink-0"
                    >
                      {copiedKey === `vid-${script.id}` ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          Đã sao chép kịch bản
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          Sao chép kịch bản này
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAGE PROMPTS */}
      {adminTab === 'prompts' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <form
            onSubmit={handleCreatePrompt}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Thêm Prompt mới vào Thư viện
            </h2>
            <p className="text-xs text-slate-500">
              Điền các ô bên dưới và bấm Lưu. Không cần chỉnh sửa code hay file JSON.
            </p>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Tiêu đề Prompt (Nêu rõ việc cần làm) *
              </label>
              <input
                type="text"
                required
                value={pTitle}
                onChange={(e) => setPTitle(e.target.value)}
                placeholder="VD: Viết email nhắc thanh toán công nợ lần 2"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Trụ cột</label>
                <select
                  value={pPillar}
                  onChange={(e) => setPPillar(e.target.value as Pillar)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Nhập môn">Nhập môn</option>
                  <option value="Kỹ năng nền">Kỹ năng nền</option>
                  <option value="Công thức theo vị trí">Công thức theo vị trí</option>
                  <option value="Công cụ và so sánh">Công cụ và so sánh</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Vị trí</label>
                <select
                  value={pRole}
                  onChange={(e) => setPRole(e.target.value as OfficeRole)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Hành chính">Hành chính</option>
                  <option value="Nhân sự">Nhân sự</option>
                  <option value="Kế toán">Kế toán</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Trợ lý & Quản lý">Trợ lý & Quản lý</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Trình độ</label>
                <select
                  value={pLevel}
                  onChange={(e) => setPLevel(e.target.value as SkillLevel)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Cơ bản">Cơ bản</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Nâng cao">Nâng cao</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Tình huống công việc thực tế
              </label>
              <input
                type="text"
                value={pSituation}
                onChange={(e) => setPSituation(e.target.value)}
                placeholder="VD: Khách quá hạn thanh toán 10 ngày nhưng vẫn đang đặt đơn mới..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Nội dung câu lệnh mẫu (Prompt Template) *
              </label>
              <textarea
                rows={4}
                required
                value={pTemplate}
                onChange={(e) => setPTemplate(e.target.value)}
                placeholder="Đóng vai... Bối cảnh: [BOI_CANH_RIENG]... Yêu cầu:... Định dạng:..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Lưu ý bảo mật dữ liệu
              </label>
              <input
                type="text"
                value={pSecurity}
                onChange={(e) => setPSecurity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
            >
              <Plus className="h-4 w-4" />
              Lưu Prompt mới vào Thư viện
            </button>

            {promptSavedMsg && (
              <p className="text-xs font-semibold text-emerald-700">
                Đã thêm Prompt mới thành công! Bạn có thể xem ngay ngoài trang Thư viện.
              </p>
            )}
          </form>

          <div className="space-y-3 lg:col-span-7">
            <h2 className="text-lg font-bold text-slate-900">
              Danh sách Prompt hiện có ({prompts.length})
            </h2>
            <div className="space-y-3">
              {prompts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div>
                    <div className="text-xs text-slate-500">
                      {p.pillar} · {p.role} · {p.level} · Cập nhật {p.updatedAt}
                    </div>
                    <h3 className="mt-1 text-sm font-bold text-slate-900">{p.title}</h3>
                    <p className="mt-1 text-xs text-slate-600">{p.situation}</p>
                  </div>
                  <button
                    onClick={() => onDeletePrompt(p.id)}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-700 shrink-0"
                    title="Xóa prompt này"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE ARTICLES */}
      {adminTab === 'articles' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <form
            onSubmit={handleCreateArticle}
            className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-5"
          >
            <h2 className="text-lg font-bold text-slate-900">
              Đăng Bài viết hướng dẫn mới
            </h2>
            <p className="text-xs text-slate-500">
              Hệ thống tự động gắn ngày cập nhật tháng 10/2026 và tạo sẵn kịch bản TikTok/Facebook đi kèm.
            </p>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Tiêu đề bài viết *
              </label>
              <input
                type="text"
                required
                value={aTitle}
                onChange={(e) => setATitle(e.target.value)}
                placeholder="VD: Cách dùng AI rà soát hợp đồng lao động trong 5 phút"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Trụ cột</label>
                <select
                  value={aPillar}
                  onChange={(e) => setAPillar(e.target.value as Pillar)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Nhập môn">Nhập môn</option>
                  <option value="Kỹ năng nền">Kỹ năng nền</option>
                  <option value="Công thức theo vị trí">Công thức theo vị trí</option>
                  <option value="Công cụ và so sánh">Công cụ và so sánh</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Vị trí</label>
                <select
                  value={aRole}
                  onChange={(e) => setARole(e.target.value as OfficeRole)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Hành chính">Hành chính</option>
                  <option value="Nhân sự">Nhân sự</option>
                  <option value="Kế toán">Kế toán</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Trợ lý & Quản lý">Trợ lý & Quản lý</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">Trình độ</label>
                <select
                  value={aLevel}
                  onChange={(e) => setALevel(e.target.value as SkillLevel)}
                  className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs"
                >
                  <option value="Cơ bản">Cơ bản</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Nâng cao">Nâng cao</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Mô tả tình huống công sở
              </label>
              <textarea
                rows={2}
                value={aContext}
                onChange={(e) => setAContext(e.target.value)}
                placeholder="Nêu nỗi đau thực tế người đi làm hay gặp..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Ví dụ Prompt Dở (Để người đọc tránh)
              </label>
              <input
                type="text"
                value={aBadPrompt}
                onChange={(e) => setABadPrompt(e.target.value)}
                placeholder="VD: Kiểm tra hợp đồng này giúp tôi."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Ví dụ Prompt Tốt chuẩn 4 bước *
              </label>
              <textarea
                rows={3}
                required
                value={aGoodPrompt}
                onChange={(e) => setAGoodPrompt(e.target.value)}
                placeholder="Đóng vai... Bối cảnh... Yêu cầu... Định dạng..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 whitespace-nowrap shrink-0"
            >
              <Plus className="h-4 w-4" />
              Xuất bản Bài viết mới
            </button>

            {articleSavedMsg && (
              <p className="text-xs font-semibold text-emerald-700">
                Đã xuất bản bài viết mới thành công!
              </p>
            )}
          </form>

          <div className="space-y-3 lg:col-span-7">
            <h2 className="text-lg font-bold text-slate-900">
              Danh sách Bài viết hướng dẫn ({articles.length})
            </h2>
            {articles.map((art) => (
              <div
                key={art.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div>
                  <div className="text-xs text-slate-500">
                    {art.pillar} · {art.role} · {art.level} · {art.updatedAt}
                  </div>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">{art.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{art.subtitle}</p>
                </div>
                <button
                  onClick={() => onDeleteArticle(art.id)}
                  className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-700 shrink-0"
                  title="Xóa bài viết"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MONETIZATION PHASE TOGGLES & EMAIL SUBSCRIBERS */}
      {adminTab === 'settings' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-6">
            <div>
              <div className="text-xs text-slate-500">Mục 8 Kế hoạch · Bật/tắt không cần sửa code</div>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                Cấu hình Giai đoạn Kiếm tiền & Thương hiệu
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Hiển thị Cửa hàng Template (Giai đoạn 2)
                  </div>
                  <div className="text-xs text-slate-500">
                    Mở khi có ≥ 500 email hoặc có người đọc chủ động hỏi mua mẫu biểu.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={siteConfig.enableStore}
                  onChange={(e) =>
                    onUpdateConfig({ ...siteConfig, enableStore: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-slate-300 text-blue-700"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Hiển thị mục Sách & Công cụ nên dùng (Affiliate minh bạch)
                  </div>
                  <div className="text-xs text-slate-500">
                    Kèm nhãn công khai liên kết giới thiệu theo đúng quy chuẩn uy tín.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={siteConfig.enableAffiliate}
                  onChange={(e) =>
                    onUpdateConfig({ ...siteConfig, enableAffiliate: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-slate-300 text-blue-700"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4">
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    Hiển thị Khóa học & Đào tạo Doanh nghiệp (Giai đoạn 3)
                  </div>
                  <div className="text-xs text-slate-500">
                    Mở khi đã có doanh thu từ Template và câu hỏi lặp lại về khóa học.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={siteConfig.enableCourses}
                  onChange={(e) =>
                    onUpdateConfig({ ...siteConfig, enableCourses: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-slate-300 text-blue-700"
                />
              </label>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-200">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Tên thương hiệu hiển thị trên Header
                </label>
                <input
                  type="text"
                  value={siteConfig.brandName}
                  onChange={(e) =>
                    onUpdateConfig({ ...siteConfig, brandName: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700">
                  Câu định vị trên Trang chủ
                </label>
                <textarea
                  rows={2}
                  value={siteConfig.positioningStatement}
                  onChange={(e) =>
                    onUpdateConfig({ ...siteConfig, positioningStatement: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs text-slate-500">Tài sản quan trọng nhất của kênh</div>
                <h2 className="mt-1 text-lg font-bold text-slate-900">
                  Danh sách Email nhận quà "50 Prompt" ({subscribers.length})
                </h2>
              </div>
              <button
                onClick={handleExportSubscribersCsv}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                Xuất file CSV (Nhập vào MailerLite/Brevo)
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-200 bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold">Email đăng ký</th>
                    <th className="px-4 py-2.5 font-semibold">Vị trí công việc</th>
                    <th className="px-4 py-2.5 font-semibold">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {subscribers.map((sub, i) => (
                    <tr key={i} className="bg-white">
                      <td className="px-4 py-2.5 font-medium text-slate-900">{sub.email}</td>
                      <td className="px-4 py-2.5 text-slate-600">{sub.role}</td>
                      <td className="px-4 py-2.5 text-slate-500 tabular-nums">{sub.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
