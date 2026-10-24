export type Pillar =
  | 'Nhập môn'
  | 'Kỹ năng nền'
  | 'Công thức theo vị trí'
  | 'Công cụ và so sánh';

export type OfficeRole =
  | 'Hành chính'
  | 'Nhân sự'
  | 'Kế toán'
  | 'Marketing'
  | 'Sales'
  | 'Trợ lý & Quản lý';

export type SkillLevel = 'Cơ bản' | 'Trung cấp' | 'Nâng cao';

export type AIToolName = 'Claude' | 'ChatGPT' | 'Gemini' | 'Codex';

export type AIAgentType =
  | 'Agent Nghiên cứu & Tổng hợp'
  | 'Agent Phân tích Dữ liệu & Excel'
  | 'Agent Tra cứu Tài liệu Nội bộ (RAG)'
  | 'Agent Tự động hóa Quy trình'
  | 'Agent Trợ lý Họp & Điều phối'
  | 'Agent Viết Script & Macro Văn phòng';

export interface AIAgentCategory {
  id: string;
  agentType: AIAgentType;
  shortName: string;
  tagline: string;
  popularPlatforms: string[];
  recommendedTools: AIToolName[];
  targetRoles: OfficeRole[];
  whatItDoes: string;
  basicUsageSteps: string[];
  optimizationRules: {
    title: string;
    detail: string;
  }[];
  goldenStructureFormula: string;
  commonMistake: string;
  specializedPromptIds: string[];
}

export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  defaultValue: string;
}

export interface PromptItem {
  id: string;
  title: string;
  situation: string;
  pillar: Pillar;
  role: OfficeRole;
  level: SkillLevel;
  recommendedTools: AIToolName[];
  bestToolNote: string;
  template: string;
  variables: PromptVariable[];
  sampleOutput: string;
  securityTip: string;
  updatedAt: string;
  addedAt?: string;
  copyCount: number;
  viewCount?: number;
  agentType?: AIAgentType;
}

export interface ToolComparisonEntry {
  tool: AIToolName;
  strengths: string;
  sampleResponse: string;
  verdict: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  pillar: Pillar;
  role: OfficeRole;
  level: SkillLevel;
  tools: AIToolName[];
  updatedAt: string;
  readTimeMinutes: number;
  viewCount?: number;
  situationContext: string;
  badPrompt: string;
  goodPrompt: string;
  whyItWorks: string[];
  steps: { title: string; content: string }[];
  toolComparisons: ToolComparisonEntry[];
  securityChecklist: string[];
  repurposeKit: {
    tiktokScripts: { hook: string; body: string; cta: string }[];
    facebookPost: string;
    newsletterSnippet: string;
  };
}

export interface RoadmapStep {
  dayRange: string;
  week: number;
  weekTitle: string;
  weekLabel?: string;
  title: string;
  objective: string;
  level: SkillLevel;
  timeEstimate: string;
  actionTask: string;
  practiceTask?: string;
  linkedPromptId?: string;
  linkedArticleId?: string;
}

export type RoadmapDay = RoadmapStep;

export interface StoreProduct {
  id: string;
  title: string;
  category: 'Prompt Pack' | 'Mẫu Word/Excel/PPT' | 'Gói Tổng Hợp (Bundle)';
  role: OfficeRole | 'Tất cả vị trí';
  priceVnd: number;
  originalPriceVnd?: number;
  description: string;
  includes: string[];
  highlights?: string[];
  previewSnippet: string;
  phaseStatus: 'Đang mở bán' | 'Danh sách chờ';
}

export interface AffiliateResource {
  id: string;
  title: string;
  name?: string;
  category: 'Sách nên đọc' | 'Công cụ AI' | 'Khóa học chọn lọc';
  provider: string;
  priceNote: string;
  pricingNote?: string;
  honestReview: string;
  whoShouldBuy: string;
  bestFor?: string;
  whoShouldSkip: string;
  affiliateDisclosure: string;
  url: string;
  officialUrl?: string;
  vietnameseSupport?: string;
}

export interface VideoScriptTemplate {
  id: number;
  title: string;
  hook: string;
  demoAction: string;
  outcome: string;
  cta: string;
  durationSec: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  positioningStatement: string;
  currentPhase: 1 | 2 | 3;
  enableStore: boolean;
  enableCourses: boolean;
  enableAffiliate: boolean;
  founderName: string;
  founderRole: string;
  founderBio: string;
  contactEmail: string;
  lastQuarterlyAudit: string;
}

export const INITIAL_SITE_CONFIG: SiteConfig = {
  brandName: 'AI Công Sở',
  tagline: 'AI cho công việc thật — Làm xong việc nhanh hơn vào sáng mai',
  positioningStatement:
    'Giúp nhân viên văn phòng dùng AI để làm xong việc nhanh hơn, bằng tiếng Việt, với tình huống công sở Việt Nam, không cần biết kỹ thuật.',
  currentPhase: 2,
  enableStore: true,
  enableCourses: true,
  enableAffiliate: true,
  founderName: 'Minh Anh',
  founderRole: 'Người sáng lập AI Công Sở · 10 năm kinh nghiệm vận hành & đào tạo văn phòng',
  founderBio:
    'Mình không phải kỹ sư lập trình. Mình là người đi làm văn phòng giống bạn, từng ngập trong biên bản họp, báo cáo Excel cuối tháng và hàng chục email khó xử. Website này ra đời để chia sẻ những công thức AI thực tế nhất bằng tiếng Việt — giúp bạn tiết kiệm 5–8 giờ mỗi tuần mà vẫn bảo mật tuyệt đối dữ liệu công ty.',
  contactEmail: 'lienhe@aicongso.vn',
  lastQuarterlyAudit: 'Tháng 10/2026',
};

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: 'prompt-01',
    title: 'Viết email từ chối báo giá/yêu cầu giảm giá của khách khéo léo',
    situation: 'Khách hàng thân thiết xin giảm giá thêm 15% vượt khung cho phép của công ty, cần từ chối mà vẫn giữ thiện chí hợp tác.',
    pillar: 'Công thức theo vị trí',
    role: 'Sales',
    level: 'Cơ bản',
    recommendedTools: ['Claude', 'ChatGPT', 'Gemini'],
    bestToolNote: 'Claude viết tiếng Việt tự nhiên, lịch sự và ít mùi văn mẫu dịch thuật nhất.',
    template: `Đóng vai Trưởng nhóm Kinh doanh B2B tại Việt Nam có 8 năm kinh nghiệm chăm sóc khách hàng doanh nghiệp.
Bối cảnh: Khách hàng [TEN_KHACH] vừa yêu cầu giảm giá thêm [MUC_GIAM] cho đơn hàng [SAN_PHAM], nhưng chính sách công ty không thể giảm thêm về giá tiền mặt. Tuy nhiên, công ty có thể hỗ trợ thêm [UU_DAI_THAY_THE].
Yêu cầu: Soạn 2 phương án email phản hồi bằng tiếng Việt (Phương án 1: trang trọng gửi qua Email; Phương án 2: ngắn gọn, ấm áp gửi qua Zalo).
Định dạng:
- Không dùng từ ngữ sáo rỗng như "Tôi hy vọng email này tìm thấy bạn trong sức khỏe tốt".
- Giữ thái độ tôn trọng, ghi nhận sự hợp tác của khách, giải thích ngắn gọn lý do giữ chuẩn chất lượng và đề xuất phương án bù đắp giá trị.`,
    variables: [
      { key: 'TEN_KHACH', label: 'Tên khách hàng / Xưng hô', placeholder: 'VD: Anh Tuấn - Công ty Minh Phát', defaultValue: 'Anh Tuấn (Công ty Minh Phát)' },
      { key: 'MUC_GIAM', label: 'Mức giảm khách yêu cầu', placeholder: 'VD: 15% trên tổng hợp đồng', defaultValue: '15% trên tổng giá trị đơn hàng' },
      { key: 'SAN_PHAM', label: 'Sản phẩm / Dịch vụ', placeholder: 'VD: Gói phần mềm quản lý kho', defaultValue: 'Gói dịch vụ bảo trì thiết bị văn phòng quý IV' },
      { key: 'UU_DAI_THAY_THE', label: 'Quyền lợi tặng thêm thay thế', placeholder: 'VD: Tặng thêm 2 tháng bảo hành & giao hàng miễn phí', defaultValue: 'tặng thêm 1 đợt bảo dưỡng định kỳ miễn phí và giãn tiến độ thanh toán thành 2 đợt' },
    ],
    sampleOutput: `Tiêu đề: Phản hồi đề xuất ngân sách gói bảo trì Quý IV — Gửi anh Tuấn (Minh Phát)\n\nChào anh Tuấn,\nCảm ơn anh đã luôn tin tưởng lựa chọn bên em cho kế hoạch bảo trì quý IV của Minh Phát.\nVề đề xuất điều chỉnh mức phí giảm thêm 15%, em đã trao đổi kỹ với bộ phận kế toán và kỹ thuật. Do định mức linh kiện chính hãng và nhân sự trực 24/7 đã được tối ưu sát giá gốc ngay từ báo giá đầu, bên em chưa thể giảm thêm trực tiếp trên đơn giá mà vẫn đảm bảo cam kết xử lý sự cố trong 2 giờ cho mình.\nTuy nhiên, để hỗ trợ tối đa cho ngân sách quý này của anh, bên em xin đề xuất tặng thêm 01 đợt bảo dưỡng định kỳ miễn phí và chia tiến độ thanh toán thành 2 đợt linh hoạt...`,
    securityTip: 'Không dán số hợp đồng thật, bảng giá vốn nội bộ hoặc số điện thoại cá nhân của khách vào AI.',
    updatedAt: '18/10/2026',
    copyCount: 1420,
    viewCount: 2840,
  },
  {
    id: 'prompt-02',
    title: 'Tóm tắt biên bản cuộc họp 2 tiếng thành bảng phân công việc rõ ràng',
    situation: 'Sau buổi họp giao ban dài 2 tiếng với ghi chú lộn xộn, cần xuất ngay biên bản họp chuẩn hành chính Việt Nam trong 3 phút.',
    pillar: 'Kỹ năng nền',
    role: 'Hành chính',
    level: 'Cơ bản',
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    bestToolNote: 'Gemini và Claude xử lý văn bản ghi chú dài rất tốt, không bỏ sót đầu việc.',
    template: `Bạn là Thư ký Ban Giám đốc chuyên nghiệp tại doanh nghiệp Việt Nam.
Dưới đây là ghi chú thô từ cuộc họp [TEN_CUOC_HOP] diễn ra ngày [NGAY_HOP]:
"""
[GHI_CHU_THO]
"""
Hãy tổng hợp thành Biên bản cuộc họp ngắn gọn, súc tích theo đúng 4 mục:
1. Tóm tắt 3 quyết định quan trọng nhất đã chốt (mỗi ý 1 dòng).
2. Bảng phân công công việc (Cột: Đầu việc cụ thể | Người phụ trách | Hạn hoàn thành | Lưu ý).
3. Các vấn đề còn bỏ ngỏ cần xin ý kiến thêm.
4. Những điểm thông tin chưa rõ trong ghi chú (tự động đánh dấu [Cần xác nhận lại] tuyệt đối không tự suy diễn).`,
    variables: [
      { key: 'TEN_CUOC_HOP', label: 'Tên cuộc họp', placeholder: 'VD: Họp triển khai kế hoạch cuối năm', defaultValue: 'Họp giao ban kế hoạch bán hàng tháng 11' },
      { key: 'NGAY_HOP', label: 'Ngày họp', placeholder: 'VD: 22/10/2026', defaultValue: '22/10/2026' },
      { key: 'GHI_CHU_THO', label: 'Nội dung ghi chú thô', placeholder: 'Dán ghi chú nhanh của bạn vào đây...', defaultValue: '- Doanh số tháng 10 đạt 85% kế hoạch, khu vực miền Nam chậm hơn dự kiến.\n- Chị Lan Marketing chốt lại bộ banner khuyến mãi trước thứ Năm tuần này.\n- Anh Hoàng Sales rà soát lại danh sách 30 đại lý tồn đọng công nợ trước ngày 28/10.\n- Ngân sách quà Tết cho khách VIP khoảng 50 triệu, chờ Sếp duyệt mức quà cụ thể vào tuần sau.' },
    ],
    sampleOutput: `1. TÓM TẮT QUYẾT ĐỊNH:\n- Ghi nhận tiến độ doanh số tháng 10 đạt 85%, tập trung đẩy mạnh khu vực miền Nam.\n- Triển khai chiến dịch khuyến mãi mới ngay trong tuần này.\n- Tạm hoãn chốt phương án quà Tết VIP sang tuần sau để duyệt mức chi tiết.\n\n2. BẢNG PHÂN CÔNG CÔNG VIỆC:\n- Chốt bộ banner khuyến mãi | Chị Lan (Marketing) | Thứ Năm tuần này | Phối hợp team thiết kế\n- Rà soát 30 đại lý tồn đọng công nợ | Anh Hoàng (Sales) | 28/10/2026 | Báo cáo chi tiết theo nhóm nợ`,
    securityTip: 'Thay tên dự án mật bằng Dự án A/B và làm tròn hoặc ẩn số liệu tài chính chưa công bố.',
    updatedAt: '15/10/2026',
    copyCount: 1895,
    viewCount: 3790,
  },
  {
    id: 'prompt-03',
    title: 'Phân tích bảng số liệu Excel & viết báo cáo nhận xét cho Sếp',
    situation: 'Có bảng số liệu doanh thu/chi phí khô khan từ Excel, cần viết phần nhận xét xu hướng và đề xuất hành động trước 5 giờ chiều.',
    pillar: 'Công thức theo vị trí',
    role: 'Kế toán',
    level: 'Trung cấp',
    recommendedTools: ['ChatGPT', 'Claude', 'Gemini'],
    bestToolNote: 'ChatGPT mạnh về tính toán bảng và vẽ biểu đồ; Claude mạnh về lời văn phân tích nguyên nhân.',
    template: `Đóng vai Chuyên viên Phân tích Tài chính - Kế toán quản trị.
Tôi cung cấp bảng số liệu tóm tắt (đã ẩn tên thật công ty) của kỳ [KY_BAO_CAO] với mục tiêu của Sếp là [MUC_TIEU_SEP]:
"""
[DU_LIEU_BANG]
"""
Yêu cầu thực hiện:
1. Nêu 3 điểm sáng và 3 điểm đáng lo ngại nhất từ bảng số liệu trên (kèm tỷ lệ % tăng/giảm cụ thể).
2. Đặt 3 câu hỏi quản trị sắc bén mà Sếp có thể sẽ hỏi trong buổi báo cáo ngày mai để tôi chuẩn bị trước câu trả lời.
3. Viết đoạn tóm tắt điều hành (Executive Summary) dài 150 chữ, giọng văn gãy gọn, đi thẳng vào con số để gửi kèm email báo cáo.`,
    variables: [
      { key: 'KY_BAO_CAO', label: 'Kỳ báo cáo', placeholder: 'VD: Quý 3/2026 so với Quý 2/2026', defaultValue: 'Tháng 10/2026 so với Tháng 09/2026' },
      { key: 'MUC_TIEU_SEP', label: 'Mục tiêu ưu tiên của Sếp', placeholder: 'VD: Cắt giảm chi phí vận hành 10%', defaultValue: 'Kiểm soát chi phí quảng cáo và tối ưu dòng tiền thu hồi nợ' },
      { key: 'DU_LIEU_BANG', label: 'Số liệu tóm tắt từ Excel', placeholder: 'Dán các dòng tổng hợp vào đây...', defaultValue: 'Doanh thu thuần: T9 = 1.200 triệu | T10 = 1.350 triệu\nChi phí Marketing: T9 = 180 triệu | T10 = 260 triệu\nChi phí vận chuyển: T9 = 65 triệu | T10 = 68 triệu\nCông nợ quá hạn >30 ngày: T9 = 210 triệu | T10 = 340 triệu' },
    ],
    sampleOutput: `ĐIỂM ĐÁNG LƯU Ý:\n- Doanh thu tăng 12,5% (+150 triệu) nhưng Chi phí Marketing lại tăng vọt 44,4% (+80 triệu). Tỷ suất chi phí Marketing/Doanh thu tăng từ 15% lên 19,2%.\n- Công nợ quá hạn trên 30 ngày tăng 61,9% (từ 210 triệu lên 340 triệu), cho thấy tăng trưởng doanh thu tháng 10 đang nằm nhiều ở khoản phải thu chưa thu hồi được tiền mặt...`,
    securityTip: 'Chỉ dán dòng Tổng hợp (Subtotal/Total) hoặc nhân số liệu với một hệ số không đổi. Tuyệt đối không tải file Excel chứa mã số thuế và lương nhân viên.',
    updatedAt: '19/10/2026',
    copyCount: 1640,
    viewCount: 3280,
  },
  {
    id: 'prompt-04',
    title: 'Soạn tin tuyển dụng thu hút & bộ 8 câu hỏi phỏng vấn thực chiến',
    situation: 'Cần tuyển nhân sự có kỹ năng làm việc thật thay vì chỉ nói hay khi phỏng vấn.',
    pillar: 'Công thức theo vị trí',
    role: 'Nhân sự',
    level: 'Cơ bản',
    recommendedTools: ['Claude', 'ChatGPT'],
    bestToolNote: 'Claude viết JD ấm áp, rõ ràng; ChatGPT gợi ý thang điểm đánh giá ứng viên rất chi tiết.',
    template: `Bạn là Trưởng phòng Nhân sự (HR Manager) am hiểu thị trường lao động Việt Nam.
Công ty tôi đang cần tuyển vị trí [VI_TRI_TUYEN] với mức lương [MUC_LUONG], làm việc tại [DIA_DIEM].
Đặc thù công việc thực tế hàng ngày là: [CONG_VIEC_HANG_NGAY].
Hãy giúp tôi:
1. Viết bài đăng tuyển dụng ngắn gọn để đăng Facebook/LinkedIn: mở đầu bằng bối cảnh công việc thật (không dùng từ sáo rỗng "môi trường năng động, trẻ trung"), nêu rõ 4 đầu việc chính, 3 quyền lợi thực chất.
2. Soạn 5 câu hỏi phỏng vấn tình huống (Behavioral Questions) để kiểm tra xem ứng viên có thực sự làm được việc hay chỉ học thuộc lý thuyết, kèm dấu hiệu nhận biết câu trả lời tốt vs câu trả lời sáo rỗng.`,
    variables: [
      { key: 'VI_TRI_TUYEN', label: 'Vị trí tuyển dụng', placeholder: 'VD: Chuyên viên Mua hàng (Purchasing)', defaultValue: 'Chuyên viên Hành chính - Nhân sự tổng hợp' },
      { key: 'MUC_LUONG', label: 'Khoảng lương', placeholder: 'VD: 12 - 15 triệu VNĐ', defaultValue: '12 - 16 triệu VNĐ/tháng' },
      { key: 'DIA_DIEM', label: 'Địa điểm làm việc', placeholder: 'VD: Quận 3, TP.HCM', defaultValue: 'Quận Cầu Giấy, Hà Nội' },
      { key: 'CONG_VIEC_HANG_NGAY', label: '3 việc thực tế nhất', placeholder: 'VD: Chấm công 60 người, mua văn phòng phẩm, làm BHXH', defaultValue: 'Quản lý chấm công 50 nhân sự, xử lý thủ tục BHXH - thuế TNCN và tổ chức gắn kết nội bộ hàng tháng' },
    ],
    sampleOutput: `GỢI Ý CÂU HỎI PHỎNG VẤN TÌNH HUỐNG:\nCâu 1: "Hãy kể về một lần nhân viên thắc mắc bảng lương hoặc chế độ BHXH bị sai lệch sát ngày chi lương. Bạn đã xử lý từng bước như thế nào trong 24 giờ đó?"\n- Dấu hiệu ứng viên làm thật: Nêu rõ bước đối chiếu dữ liệu chấm công, quy trình giải thích tạm ứng bù ngay và cách rà soát lại công thức Excel.\n- Dấu hiệu trả lời lý thuyết: Chỉ nói chung chung "Em sẽ bình tĩnh lắng nghe và giải quyết thỏa đáng".`,
    securityTip: 'Không đưa thông tin quỹ lương nội bộ của các nhân sự hiện tại vào prompt.',
    updatedAt: '12/10/2026',
    copyCount: 980,
    viewCount: 1960,
  },
  {
    id: 'prompt-05',
    title: 'Biến 1 chủ đề chuyên môn thành 3 kịch bản TikTok + 1 bài Facebook',
    situation: 'Cần sản xuất nội dung đều đặn mỗi tuần cho kênh công ty/cá nhân mà chỉ có 2 giờ viết bài.',
    pillar: 'Công thức theo vị trí',
    role: 'Marketing',
    level: 'Trung cấp',
    recommendedTools: ['Claude', 'ChatGPT', 'Gemini'],
    bestToolNote: 'Claude tạo Hook 3 giây cực kỳ đời thường, đúng tâm lý dân văn phòng Việt Nam.',
    template: `Bạn là Chuyên gia Nội dung Đa kênh (Content Strategist) tại Việt Nam.
Từ ý tưởng/nội dung gốc sau đây về chủ đề [CHU_DE_GOC] dành cho tệp khách hàng [DOI_TUONG_DOC]:
"""
[NOI_DUNG_TOM_TAT]
"""
Hãy chuyển hóa thành bộ nội dung đăng trong tuần theo công thức "Làm 1 lần, dùng nhiều lần":
1. 03 kịch bản video ngắn TikTok/Reels (35-45 giây/video), mỗi video đi theo cấu trúc: Hook 3 giây đầu (chạm đúng nỗi đau) -> Demo thao tác màn hình -> Kết quả cụ thể -> Lời kêu gọi hành động (CTA).
2. 01 bài đăng Facebook Page dạng kể chuyện thực tế (Storytelling), chia đoạn thoáng dễ đọc trên điện thoại.
3. 01 đoạn bản tin Email (Newsletter) đúng 180 chữ kèm 1 mẹo áp dụng ngay sáng mai.`,
    variables: [
      { key: 'CHU_DE_GOC', label: 'Chủ đề chính', placeholder: 'VD: Cách thu hồi công nợ khéo léo qua Zalo', defaultValue: 'Cách dùng AI rà soát hợp đồng dịch vụ tránh điều khoản bất lợi' },
      { key: 'DOI_TUONG_DOC', label: 'Người xem mục tiêu', placeholder: 'VD: Chủ shop, kế toán, quản lý nhỏ', defaultValue: 'Nhân viên hành chính, mua hàng và chủ doanh nghiệp nhỏ' },
      { key: 'NOI_DUNG_TOM_TAT', label: 'Các ý chính cần truyền tải', placeholder: 'Nhập 2-3 ý chính...', defaultValue: 'Nhiều người ký hợp đồng dịch vụ chỉ nhìn giá mà quên điều khoản phạt chậm tiến độ, điều khoản tự động gia hạn và trách nhiệm bảo mật thông tin.' },
    ],
    sampleOutput: `KỊCH BẢN TIKTOK SỐ 1 (40 giây):\n- Hook (0-3s): "Đừng đặt bút ký hợp đồng dịch vụ trước khi bắt AI soi 3 điều khoản ngầm này!"\n- Quay màn hình (3-25s): Xóa tên công ty trong file Word, dán điều khoản phạt & thanh toán vào Claude kèm câu lệnh kiểm tra rủi ro một chiều...\n- Kết quả (25-35s): AI chỉ ra ngay điều khoản phạt chậm thanh toán 0.5%/ngày nhưng không hề có điều khoản phạt nhà cung cấp giao trễ...`,
    securityTip: 'Luôn dùng ví dụ giả lập khi quay màn hình TikTok/Facebook.',
    updatedAt: '10/10/2026',
    copyCount: 1510,
    viewCount: 3020,
  },
  {
    id: 'prompt-06',
    title: 'Soạn công văn / thông báo nội bộ chuẩn văn phong hành chính Việt Nam',
    situation: 'Cần ra thông báo nghỉ lễ, thay đổi quy định chấm công hoặc chuyển văn phòng vừa trang trọng vừa không cứng nhắc.',
    pillar: 'Công thức theo vị trí',
    role: 'Hành chính',
    level: 'Cơ bản',
    recommendedTools: ['Claude', 'Gemini'],
    bestToolNote: 'Claude và Gemini nắm rất chuẩn bố cục Thông báo hành chính tại Việt Nam.',
    template: `Đóng vai Trưởng phòng Hành chính - Nhân sự.
Hãy soạn một Thông báo nội bộ gửi toàn thể cán bộ nhân viên về việc: [NOI_DUNG_THONG_BAO].
Thời gian áp dụng: từ [THOI_GIAN_AP_DUNG].
Đối tượng áp dụng: [DOI_TUONG_AP_DUNG].
Đầu mối liên hệ khi có thắc mắc: [DAU_MOI_LIEN_HE].

Yêu cầu:
- Trình bày thành 2 phiên bản:
  + Phiên bản 1: Văn bản Thông báo chuẩn hành chính (đầy đủ tiêu đề, căn cứ, nội dung từng mục, nơi nhận) để ban hành file PDF/in đóng dấu.
  + Phiên bản 2: Tin nhắn ghim lên nhóm Zalo công ty (ngắn gọn trong 8 dòng, đánh dấu đầu dòng rõ ràng để nhân viên đọc lướt trên điện thoại nắm ngay ý chính).`,
    variables: [
      { key: 'NOI_DUNG_THONG_BAO', label: 'Nội dung thông báo', placeholder: 'VD: Lịch nghỉ Tết Dương lịch và bàn giao công việc', defaultValue: 'Quy định mới về đăng ký làm việc từ xa (Work from home) và bàn giao thiết bị trước kỳ nghỉ lễ' },
      { key: 'THOI_GIAN_AP_DUNG', label: 'Thời gian áp dụng', placeholder: 'VD: Từ ngày 01/11/2026', defaultValue: 'Từ ngày 01/11/2026' },
      { key: 'DOI_TUONG_AP_DUNG', label: 'Đối tượng áp dụng', placeholder: 'VD: Toàn thể nhân viên khối văn phòng', defaultValue: 'Toàn thể nhân viên chính thức và thử việc tại văn phòng Hà Nội & TP.HCM' },
      { key: 'DAU_MOI_LIEN_HE', label: 'Người phụ trách giải đáp', placeholder: 'VD: Chị Mai - Phòng HCNS (Ext: 102)', defaultValue: 'Chị Thanh Mai - Phòng Hành chính Nhân sự' },
    ],
    sampleOutput: `PHIÊN BẢN 2 — TIN NHẮN GHIM ZALO CÔNG TY:\n[THÔNG BÁO] Quy định đăng ký làm việc từ xa & bàn giao trước kỳ nghỉ (Áp dụng từ 01/11/2026)\n1. Đăng ký WFH: Gửi xác nhận của Quản lý trực tiếp trước 17h00 ngày hôm trước.\n2. Bàn giao trước kỳ nghỉ: Kiểm tra tắt nguồn thiết bị điện tại bàn làm việc và cập nhật danh sách đầu việc khẩn cấp...\n3. Hỗ trợ giải đáp: Liên hệ chị Thanh Mai (Phòng HCNS).`,
    securityTip: 'Không dán mật khẩu wifi nội bộ hoặc mã khóa cửa văn phòng vào nội dung prompt.',
    updatedAt: '05/10/2026',
    copyCount: 1120,
    viewCount: 2240,
  },
  {
    id: 'prompt-07',
    title: 'Kiểm chứng thông tin & phát hiện điểm AI có nguy cơ bịa (Hallucination Check)',
    situation: 'Khi nhờ AI tra cứu quy định thuế, BHXH, luật lao động hoặc số liệu thị trường, cần biết đâu là thông tin thật, đâu là AI tự suy diễn.',
    pillar: 'Kỹ năng nền',
    role: 'Trợ lý & Quản lý',
    level: 'Trung cấp',
    recommendedTools: ['Gemini', 'ChatGPT', 'Claude'],
    bestToolNote: 'Gemini và ChatGPT có tìm kiếm web; Claude rất giỏi tự phản biện và chỉ ra điểm thiếu căn cứ.',
    template: `Tôi đang cần kiểm chứng độ chính xác của đoạn thông tin/tư vấn sau đây về chủ đề [CHU_DE_KIEM_CHUNG]:
"""
[NOI_DUNG_CAN_KIEM_TRA]
"""
Hãy thực hiện quy trình kiểm chứng 3 bước nghiêm ngặt:
1. Tách riêng từng khẳng định có chứa: con số, mức phạt, tỷ lệ %, số hiệu nghị định/thông tư hoặc mốc thời gian hiệu lực.
2. Đánh giá từng khẳng định theo 3 mức: [Đã xác thực chắc chắn] / [Cần kiểm tra lại văn bản gốc đang có hiệu lực] / [Có dấu hiệu nhầm lẫn hoặc đã hết hiệu lực].
3. Chỉ rõ cho tôi từ khóa chính xác nhất và tên cơ quan ban hành để tôi tra cứu đối chiếu lại trong 1 phút trên Cổng thông tin chính thức.`,
    variables: [
      { key: 'CHU_DE_KIEM_CHUNG', label: 'Chủ đề cần kiểm chứng', placeholder: 'VD: Quy định đóng BHXH bắt buộc mới nhất', defaultValue: 'Quy định về mức đóng BHXH và hồ sơ giảm trừ gia cảnh thuế TNCN' },
      { key: 'NOI_DUNG_CAN_KIEM_TRA', label: 'Đoạn nội dung AI vừa trả lời', placeholder: 'Dán câu trả lời bạn nghi ngờ vào đây...', defaultValue: 'Theo Thông tư 111, mức giảm trừ gia cảnh cho người nộp thuế là 11 triệu đồng/tháng và người phụ thuộc là 4,4 triệu đồng/tháng, thời hạn đăng ký người phụ thuộc chậm nhất là ngày 31/12 hàng năm.' },
    ],
    sampleOutput: `BẢNG RÀ SOÁT ĐỘ CHÍNH XÁC:\n1. Khẳng định: "Mức giảm trừ gia cảnh 11 triệu đồng/tháng và 4,4 triệu đồng/tháng"\n-> Đánh giá: [Cần kiểm tra lại nghị quyết điều chỉnh mới nhất năm 2026] — Lưu ý: Mức này căn cứ theo Nghị quyết 954/2020/UBTVQH14, không phải nằm trực tiếp trong Thông tư 111 gốc.\n2. Từ khóa tra cứu nhanh: "Nghị quyết UBTVQH mức giảm trừ gia cảnh thuế TNCN hiện hành"...`,
    securityTip: 'Luôn kiểm tra lại số hiệu Nghị định/Thông tư trên cổng văn bản pháp luật trước khi trình ký Sếp.',
    updatedAt: '20/10/2026',
    copyCount: 1340,
    viewCount: 2680,
  },
  {
    id: 'prompt-08',
    title: 'Viết công thức Excel / Google Sheets phức tạp không cần nhớ hàm',
    situation: 'Cần nối nhiều điều kiện tìm kiếm, lọc trùng, tính tổng theo tháng và phòng ban nhưng dùng VLOOKUP hay bị lỗi #N/A.',
    pillar: 'Kỹ năng nền',
    role: 'Kế toán',
    level: 'Nâng cao',
    recommendedTools: ['ChatGPT', 'Claude', 'Codex'],
    bestToolNote: 'ChatGPT và Claude giải thích từng thành phần hàm cực kỳ dễ hiểu và cho sẵn cách bẫy lỗi #N/A.',
    template: `Bạn là Chuyên gia Excel & Google Sheets cho văn phòng.
Tôi đang làm việc trên phần mềm [PHAN_MEM_BANG_TINH].
Cấu trúc bảng dữ liệu của tôi như sau:
- Tên Sheet nguồn và các cột: [MO_TA_COT]
- Kết quả tôi muốn tính ra ở ô đích là: [KET_QUA_MONG_MUON]

Yêu cầu:
1. Viết cho tôi 2 cách công thức: Cách 1 dùng hàm hiện đại (XLOOKUP / FILTER / SUMIFS) và Cách 2 dùng hàm tương thích với Excel đời cũ.
2. Bọc sẵn hàm xử lý lỗi (IFERROR) để bảng tính không hiện ký hiệu #N/A xấu xí khi gửi Sếp.
3. Giải thích ngắn gọn ý nghĩa từng đối số và chỉ ra 2 lỗi sai phổ biến nhất khiến công thức trả về kết quả bằng 0.`,
    variables: [
      { key: 'PHAN_MEM_BANG_TINH', label: 'Phần mềm bạn đang dùng', placeholder: 'VD: Excel 365 hoặc Google Sheets', defaultValue: 'Excel 365 (giao diện dấu phẩy ngăn cách hàm)' },
      { key: 'MO_TA_COT', label: 'Mô tả cột dữ liệu', placeholder: 'VD: Cột A là Mã NV, Cột B là Phòng ban, Cột E là Doanh số', defaultValue: 'Sheet "DonHang": Cột A là Ngày bán, Cột B là Tên Sales, Cột C là Khu vực, Cột F là Giá trị thanh toán' },
      { key: 'KET_QUA_MONG_MUON', label: 'Kết quả cần tính', placeholder: 'VD: Tính tổng doanh số của nhân viên A trong tháng 10', defaultValue: 'Tính tổng Giá trị thanh toán (Cột F) của nhân viên có tên ở ô H2, thuộc khu vực "Miền Nam" và chỉ tính các đơn hàng trong tháng 10/2026' },
    ],
    sampleOutput: `CÔNG THỨC ĐỀ XUẤT (Excel 365 & Mọi phiên bản):\n=IFERROR(SUMIFS(DonHang!$F:$F, DonHang!$B:$B, H2, DonHang!$C:$C, "Miền Nam", DonHang!$A:$A, ">=2026-10-01", DonHang!$A:$A, "<=2026-10-31"), 0)\n\nLƯU Ý TRÁNH LỖI KẾT QUẢ BẰNG 0:\n1. Cột A (Ngày bán) đang ở dạng Text thay vì Date chuẩn của Excel.\n2. Tên nhân viên ở ô H2 bị dư khoảng trắng ở cuối (dùng thêm hàm TRIM nếu cần).`,
    securityTip: 'Chỉ cần mô tả tên cột (Cột A, Cột B...), không cần copy toàn bộ bảng dữ liệu thật của công ty.',
    updatedAt: '21/10/2026',
    copyCount: 2150,
    viewCount: 4300,
  },
  {
    id: 'prompt-09',
    title: 'Thiết kế khung giao việc OKR/KPI tuần & checklist kiểm soát tiến độ đội nhóm',
    situation: 'Giao việc đầu tuần nhưng nhân sự hiểu sai ý hoặc trễ hạn, cần chuyển mục tiêu chung thành bảng đầu việc đo lường được.',
    pillar: 'Công thức theo vị trí',
    role: 'Trợ lý & Quản lý',
    level: 'Trung cấp',
    recommendedTools: ['Claude', 'ChatGPT'],
    bestToolNote: 'Claude chia tiêu chí hoàn thành (Definition of Done) rất sát thực tế vận hành tại doanh nghiệp Việt Nam.',
    template: `Đóng vai Quản lý Vận hành (Operations Manager) giàu kinh nghiệm.
Tuần này bộ phận [TEN_BO_PHAN] của tôi cần hoàn thành mục tiêu trọng tâm: [MUC_TIEU_TUAN] với nhân sự gồm: [DANH_SACH_NHAN_SU].
Hãy lập Bảng phân bổ công việc tuần theo cấu trúc:
1. Chia nhỏ mục tiêu thành 4–5 đầu việc cụ thể kèm Tiêu chí hoàn thành rõ ràng (để nhân viên tự kiểm tra trước khi nộp).
2. Dự báo 2 điểm nghẽn dễ gây trễ tiến độ nhất và gợi ý phương án xử lý sớm vào sáng thứ Tư.
3. Soạn sẵn đoạn tin nhắn ngắn gọn, truyền cảm hứng để gửi lên nhóm làm việc sáng thứ Hai.`,
    variables: [
      { key: 'TEN_BO_PHAN', label: 'Tên bộ phận / Nhóm', placeholder: 'VD: Nhóm Chăm sóc khách hàng & Vận đơn', defaultValue: 'Bộ phận Kinh doanh & Hỗ trợ dự án' },
      { key: 'MUC_TIEU_TUAN', label: 'Mục tiêu trọng tâm trong tuần', placeholder: 'VD: Hoàn tất nghiệm thu 12 hợp đồng tháng 10', defaultValue: 'Chốt nghiệm thu 10 hợp đồng dịch vụ Quý IV và thu hồi 80% công nợ đến hạn' },
      { key: 'DANH_SACH_NHAN_SU', label: 'Phân bổ nhân sự', placeholder: 'VD: 2 bạn Sales Admin, 3 bạn Kinh doanh', defaultValue: '02 Sales Admin chuẩn bị hồ sơ nghiệm thu, 03 Chuyên viên Kinh doanh làm việc trực tiếp với khách' },
    ],
    sampleOutput: `BẢNG GIAO VIỆC & TIÊU CHÍ HOÀN THÀNH (DEFINITION OF DONE):\n1. Rà soát bộ chứng từ nghiệm thu 10 hợp đồng | Phụ trách: 02 Sales Admin | Hạn: 17h00 Thứ Ba\n- Tiêu chí hoàn thành: Đủ chữ ký nháy, khớp số tiền trên hóa đơn nháp, không sai thông tin pháp nhân...`,
    securityTip: 'Chỉ ghi chức danh (Sales Admin, Kế toán...), không cần nhập họ tên đầy đủ và mức lương thưởng cá nhân.',
    updatedAt: '21/10/2026',
    copyCount: 640,
    viewCount: 1280,
  },
  {
    id: 'prompt-10',
    title: 'Rà soát điều khoản bất lợi trong Hợp đồng dịch vụ / Báo giá nhà cung cấp',
    situation: 'Nhận bản dự thảo hợp đồng dày 10 trang từ nhà cung cấp, cần phát hiện nhanh các điều khoản phạt một chiều hoặc chi phí ẩn.',
    pillar: 'Kỹ năng nền',
    role: 'Hành chính',
    level: 'Nâng cao',
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    bestToolNote: 'Claude cực mạnh khi đọc văn bản dài và đối chiếu quyền - nghĩa vụ giữa hai bên.',
    template: `Bạn là Chuyên viên Pháp chế & Mua hàng doanh nghiệp.
Dưới đây là các điều khoản dự thảo trong hợp đồng [LOAI_HOP_DONG] (đã ẩn tên công ty):
"""
[NOI_DUNG_DIEU_KHOAN]
"""
Yêu cầu rà soát:
1. Chỉ ra 3 điều khoản đang bất lợi hoặc thiếu cân xứng cho bên Mua (ví dụ: phạt chậm thanh toán nhưng không phạt chậm bàn giao, điều khoản tự động gia hạn, giới hạn trách nhiệm bồi thường).
2. Đề xuất câu chữ sửa đổi lại từng điều khoản theo hướng công bằng, lịch sự để gửi đàm phán với nhà cung cấp.`,
    variables: [
      { key: 'LOAI_HOP_DONG', label: 'Loại hợp đồng', placeholder: 'VD: Hợp đồng thuê dịch vụ phần mềm / thiết kế', defaultValue: 'Hợp đồng cung cấp và lắp đặt thiết bị văn phòng' },
      { key: 'NOI_DUNG_DIEU_KHOAN', label: 'Đoạn điều khoản cần soi', placeholder: 'Dán điều khoản thanh toán, bảo hành, phạt vi phạm...', defaultValue: 'Bên A thanh toán 100% giá trị hợp đồng trong vòng 3 ngày kể từ ngày ký. Nếu chậm thanh toán chịu phạt 0.5%/ngày. Bên B giao hàng dự kiến trong 15-30 ngày làm việc.' },
    ],
    sampleOutput: `PHÁT HIỆN ĐIỂM BẤT LỢI:\n1. Thanh toán 100% trước khi nhận hàng: Rủi ro toàn bộ thuộc về Bên Mua.\n2. Thời gian giao hàng "dự kiến 15-30 ngày" quá lỏng lẻo và không có chế tài nếu Bên B giao trễ.\n-> ĐỀ XUẤT SỬA ĐỔI: Chia làm 2 đợt thanh toán (50% tạm ứng, 50% sau khi nghiệm thu bàn giao)...`,
    securityTip: 'Luôn xóa tên pháp nhân, mã số thuế và giá trị tiền thật trước khi dán điều khoản hợp đồng.',
    updatedAt: '21/10/2026',
    copyCount: 890,
    viewCount: 1780,
  },
  {
    id: 'prompt-11',
    title: '[Agent Nghiên cứu] Lập báo cáo khảo sát thị trường & đối thủ có kiểm chứng chéo nguồn',
    situation: 'Cần giao cho AI Agent tự động tìm kiếm đa nguồn, đối chiếu số liệu thị trường và lập bảng so sánh đối thủ mà không bịa đặt số liệu.',
    pillar: 'Công cụ và so sánh',
    role: 'Marketing',
    level: 'Trung cấp',
    recommendedTools: ['Gemini', 'ChatGPT', 'Claude'],
    bestToolNote: 'Gemini Deep Research và ChatGPT Search cực mạnh khi chạy quy trình tìm kiếm đa bước có dẫn nguồn.',
    agentType: 'Agent Nghiên cứu & Tổng hợp',
    template: `Đóng vai AI Research Agent chuyên phân tích thị trường tại Việt Nam.
Nhiệm vụ của bạn là thực hiện quy trình nghiên cứu 4 bước về chủ đề: [CHU_DE_NGHIEN_CUU] trong phân khúc [PHAN_KHUC_KHACH_HANG] tại khu vực [KHU_VUC_THI_TRUONG].

QUY TRÌNH THỰC THI CỦA AGENT (BẮT BUỘC TUÂN THỦ):
- Bước 1 (Lập kế hoạch truy vấn): Liệt kê 4 góc độ dữ liệu cần thu thập trước khi tổng hợp (Quy mô/Xu hướng, 3 Đối thủ tiêu biểu, Khung giá phổ biến, Nỗi đau khách hàng chưa được giải quyết).
- Bước 2 (Kiểm chứng chéo & Chống ảo giác): Chỉ sử dụng thông tin có nguồn rõ ràng giai đoạn 2025–2026. Mọi con số chưa có nguồn kiểm chứng phải gắn nhãn [Chưa đủ dữ liệu kiểm chứng], tuyệt đối không tự suy đoán.
- Bước 3 (Đầu ra cấu trúc):
  1. Bảng so sánh 3 nhóm giải pháp/đối thủ trên thị trường (Tiêu chí | Điểm mạnh | Điểm yếu | Phân khúc giá).
  2. 03 cơ hội ngách khả thi nhất để triển khai trong 30 ngày tới.
  3. Danh mục nguồn tham khảo kèm độ tin cậy (Cao / Trung bình).`,
    variables: [
      { key: 'CHU_DE_NGHIEN_CUU', label: 'Chủ đề / Ngành hàng cần khảo sát', placeholder: 'VD: Dịch vụ suất ăn văn phòng lành mạnh', defaultValue: 'Giải pháp quà tặng doanh nghiệp dịp cuối năm tại Việt Nam' },
      { key: 'PHAN_KHUC_KHACH_HANG', label: 'Khách hàng mục tiêu', placeholder: 'VD: Công ty quy mô 50-200 nhân sự', defaultValue: 'Khối doanh nghiệp SME và ngân hàng (ngân sách 300.000đ - 800.000đ/phần quà)' },
      { key: 'KHU_VUC_THI_TRUONG', label: 'Phạm vi thị trường', placeholder: 'VD: TP.HCM và Hà Nội', defaultValue: 'Hà Nội và TP. Hồ Chí Minh' },
    ],
    sampleOutput: `KẾ HOẠCH TRUY VẤN CỦA AGENT:\n1. Xu hướng quà tặng doanh nghiệp B2B cuối năm 2026 (ưu tiên sản phẩm xanh, sức khỏe, cá nhân hóa).\n2. Bảng đối chiếu 3 phân khúc nhà cung cấp: Set hạt dinh dưỡng nội địa vs Thiết bị công nghệ văn phòng vs Quà tặng thủ công bản địa...\n- Lưu ý kiểm chứng: [Chưa đủ dữ liệu kiểm chứng] về thị phần chính xác của nhóm quà tặng thủ công nhỏ lẻ.`,
    securityTip: 'Không đưa kế hoạch giá thầu bí mật hoặc danh sách khách hàng nội bộ của công ty vào câu lệnh tìm kiếm web công khai.',
    updatedAt: '21/10/2026',
    copyCount: 1480,
    viewCount: 2960,
  },
  {
    id: 'prompt-12',
    title: '[Agent Dữ liệu & Excel] Làm sạch bảng số liệu, kiểm tra lệch tổng và tìm nguyên nhân biến động',
    situation: 'Dùng Agent có khả năng chạy mã phân tích (Data Analysis / Code Interpreter) để tự kiểm tra lỗi dữ liệu, đối chiếu công thức và xuất bảng tổng hợp.',
    pillar: 'Công cụ và so sánh',
    role: 'Kế toán',
    level: 'Trung cấp',
    recommendedTools: ['ChatGPT', 'Claude', 'Gemini'],
    bestToolNote: 'ChatGPT Data Analysis và Claude Analysis tự động chạy kiểm tra thống kê chính xác từng con số.',
    agentType: 'Agent Phân tích Dữ liệu & Excel',
    template: `Bạn là Data Analysis Agent chuyên xử lý bảng tính Tài chính - Kế toán - Kinh doanh.
Tôi cung cấp dữ liệu mẫu/cấu trúc bảng gồm các cột: [CAU_TRUC_COT] và số liệu tóm tắt kỳ [KY_PHAN_TICH]:
"""
[DU_LIEU_DAU_VAO]
"""

HÃY THỰC HIỆN THEO VÒNG LẶP KIỂM TRA 4 BƯỚC:
1. Bước Kiểm toán dữ liệu (Data Sanity Check): Kiểm tra xem có dòng nào bị khuyết, trùng lặp hoặc lệch tổng cộng ngang/dọc không. Báo cáo rõ trước khi tính toán.
2. Bước Phân tích biến động: Tính chênh lệch tuyệt đối và tỷ lệ % tăng/giảm của từng khoản mục theo chỉ tiêu [CHI_TIEU_UU_TIEN].
3. Bước Cảnh báo bất thường (Anomaly Detection): Khoanh vùng 2 khoản mục có biên độ lệch lớn nhất so với mức trung bình và giả định nguyên nhân nghiệp vụ.
4. Bước Xuất công thức Excel: Viết sẵn công thức hàm Excel (SUMIFS, XLOOKUP, IFERROR) để tôi copy dán vào bảng tính gốc trên máy.`,
    variables: [
      { key: 'CAU_TRUC_COT', label: 'Các cột trong bảng Excel', placeholder: 'VD: Cột A: Mã chi phí | Cột B: Phòng ban | Cột C: Ngân sách | Cột D: Thực chi', defaultValue: 'Cột A: Nhóm chi phí | Cột B: Định mức T10 | Cột C: Thực chi T10 | Cột D: Bộ phận phụ trách' },
      { key: 'KY_PHAN_TICH', label: 'Kỳ phân tích', placeholder: 'VD: Tháng 10/2026', defaultValue: 'Tháng 10/2026 (Đối chiếu Định mức vs Thực chi)' },
      { key: 'DU_LIEU_DAU_VAO', label: 'Dữ liệu tóm tắt (đã ẩn danh)', placeholder: 'Dán các dòng dữ liệu vào đây...', defaultValue: 'Quảng cáo số | Định mức: 200tr | Thực chi: 268tr | Marketing\nVăn phòng phẩm | Định mức: 25tr | Thực chi: 24tr | Hành chính\nTiếp khách & Hội nghị | Định mức: 40tr | Thực chi: 62tr | Kinh doanh\nVận chuyển giao nhận | Định mức: 80tr | Thực chi: 82tr | Kho vận' },
      { key: 'CHI_TIEU_UU_TIEN', label: 'Ngưỡng cảnh báo vượt định mức', placeholder: 'VD: Cảnh báo mọi khoản vượt > 10% ngân sách', defaultValue: 'Cảnh báo đỏ các khoản mục vượt định mức trên 15%' },
    ],
    sampleOutput: `1. KIỂM TOÁN DỮ LIỆU: Tổng Định mức = 345 triệu | Tổng Thực chi = 436 triệu (Vượt tổng 91 triệu, tương đương +26,38%). Không có dòng khuyết dữ liệu.\n2. CẢNH BÁO BẤT THƯỜNG (>15%):\n- Tiếp khách & Hội nghị: +55,0% (+22tr) tại khối Kinh doanh.\n- Quảng cáo số: +34,0% (+68tr) tại khối Marketing.\n3. CÔNG THỨC EXCEL CẢNH BÁO TỰ ĐỘNG:\n=IFERROR(IF((C2-B2)/B2>0.15, "Vượt ngưỡng ("&TEXT((C2-B2)/B2,"0.0%")&")", "Trong ngưỡng"), "Kiểm tra số liệu")`,
    securityTip: 'Luôn xóa cột Họ tên, CCCD, Số tài khoản và Mã số thuế trước khi tải bảng tính lên Data Agent.',
    updatedAt: '21/10/2026',
    copyCount: 1620,
    viewCount: 3240,
  },
  {
    id: 'prompt-13',
    title: '[Agent Tra cứu Nội bộ RAG] Hỏi đáp Quy chế, SOP & Hợp đồng không bịa thông tin ngoài tài liệu',
    situation: 'Thiết lập lệnh hệ thống (System Prompt) cho NotebookLM, Claude Projects hoặc Custom GPT để trả lời chính xác theo văn bản nội bộ của công ty.',
    pillar: 'Kỹ năng nền',
    role: 'Nhân sự',
    level: 'Cơ bản',
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    bestToolNote: 'Claude Projects và Google NotebookLM bám sát tài liệu gốc và trích dẫn điều khoản cực kỳ chuẩn xác.',
    agentType: 'Agent Tra cứu Tài liệu Nội bộ (RAG)',
    template: `Bạn là Knowledge Base RAG Agent phụ trách tra cứu văn bản nội bộ về: [TEN_BO_TAI_LIEU].
Dưới đây là nội dung văn bản quy định gốc của công ty:
"""
[NOI_DUNG_QUY_CHE]
"""
Câu hỏi của nhân viên/bộ phận cần giải đáp: "[CAU_HOI_TRA_CUU]"

QUY TẮC RÀNG BUỘC NGHIÊM NGẶT CỦA RAG AGENT:
1. Chỉ sử dụng 100% thông tin nằm trong phần văn bản quy định gốc ở trên. Tuyệt đối KHÔNG dùng kiến thức bên ngoài để tự suy diễn.
2. Sau mỗi ý trả lời, bắt buộc trích dẫn rõ: [Trích Điều/Mục số... - Nguyên văn: "..."].
3. Nếu câu hỏi liên quan đến trường hợp chưa được đề cập trong văn bản, hãy trả lời rõ: "Tài liệu hiện tại chưa quy định chi tiết trường hợp này — Cần trình [BO_PHAN_PHE_DUYET] xem xét quyết định."
4. Viết câu trả lời ngắn gọn, lịch sự để gửi trực tiếp cho nhân viên.`,
    variables: [
      { key: 'TEN_BO_TAI_LIEU', label: 'Tên quy chế / SOP nội bộ', placeholder: 'VD: Quy chế Công tác phí và Thanh toán tạm ứng 2026', defaultValue: 'Quy chế Nghỉ phép, Làm việc từ xa (WFH) và Công tác phí năm 2026' },
      { key: 'NOI_DUNG_QUY_CHE', label: 'Trích đoạn quy chế liên quan', placeholder: 'Dán điều khoản quy chế vào đây...', defaultValue: 'Điều 4.1: Nhân viên chính thức được đăng ký làm việc từ xa tối đa 02 ngày/tháng và phải gửi yêu cầu trước ít nhất 24 giờ.\nĐiều 4.2: Không áp dụng làm việc từ xa vào các ngày thứ Hai đầu tuần hoặc ngày có lịch họp toàn công ty.\nĐiều 5.1: Phụ cấp ăn trưa 45.000đ/ngày chỉ tính cho các ngày làm việc trực tiếp tại văn phòng hoặc đi gặp khách hàng có xác nhận.' },
      { key: 'CAU_HOI_TRA_CUU', label: 'Câu hỏi thực tế cần tra cứu', placeholder: 'VD: Em xin WFH sáng thứ Hai tuần tới có được hưởng phụ cấp ăn trưa không?', defaultValue: 'Em đang là nhân viên thử việc, thứ Hai tuần tới em xin làm việc tại nhà (WFH) và có được tính phụ cấp ăn trưa 45.000đ không ạ?' },
      { key: 'BO_PHAN_PHE_DUYET', label: 'Cấp phê duyệt ngoại lệ', placeholder: 'VD: Trưởng phòng HCNS và Quản lý trực tiếp', defaultValue: 'Trưởng phòng Hành chính Nhân sự và Quản lý trực tiếp' },
    ],
    sampleOutput: `KẾT QUẢ TRA CỨU TỪ QUY CHẾ NỘI BỘ:\n1. Về đối tượng đăng ký WFH: Quy chế chỉ cho phép "Nhân viên chính thức" đăng ký làm việc từ xa [Trích Điều 4.1]. Trường hợp nhân viên thử việc chưa được phép áp dụng chuẩn.\n2. Về thời gian thứ Hai đầu tuần: Quy chế quy định rõ không áp dụng WFH vào các ngày thứ Hai đầu tuần [Trích Điều 4.2].\n3. Về phụ cấp ăn trưa: Chỉ tính cho ngày làm việc trực tiếp tại văn phòng hoặc đi gặp khách hàng [Trích Điều 5.1].`,
    securityTip: 'Khi tạo kho tài liệu chung cho phòng ban, hãy tách riêng các văn bản phổ biến cho toàn công ty khỏi các quyết định lương thưởng mật.',
    updatedAt: '21/10/2026',
    copyCount: 1390,
    viewCount: 2780,
  },
  {
    id: 'prompt-14',
    title: '[Agent Tự động hóa Quy trình] Phân loại yêu cầu khách hàng & xuất cấu trúc dữ liệu chuẩn tự động',
    situation: 'Thiết lập prompt trung gian cho Agent tự động đọc Email/Form khách hàng gửi về, phân loại mức độ khẩn cấp, bóc tách thông tin thành bảng/JSON và soạn sẵn bản nháp phản hồi.',
    pillar: 'Công thức theo vị trí',
    role: 'Sales',
    level: 'Nâng cao',
    recommendedTools: ['ChatGPT', 'Claude', 'Gemini'],
    bestToolNote: 'ChatGPT và Claude tuân thủ cấu trúc đầu ra chuẩn (Structured Output / JSON / Bảng cố định) cực tốt cho quy trình tự động.',
    agentType: 'Agent Tự động hóa Quy trình',
    template: `Bạn là Workflow Triage & Automation Agent xử lý thông tin đầu vào cho bộ phận [BO_PHAN_TIEP_NHAN].
Hãy đọc tin nhắn/email thô vừa nhận được dưới đây:
"""
[NOI_DUNG_TIN_NHAN_THO]
"""

YÊU CẦU XỬ LÝ TỰ ĐỘNG THEO 3 KHỐI CỐ ĐỊNH (KHÔNG THÊM LỜI DẪN THỪA):
[KHỐI 1 - BẢNG DỮ LIỆU ĐỂ ĐẨY VÀO GOOGLE SHEETS / CRM]
- Phân loại yêu cầu: (Chỉ chọn 1 trong: Báo giá mới / Khiếu nại sự cố / Gia hạn hợp đồng / Hỏi thông tin chung)
- Mức độ ưu tiên: (Khẩn cấp xử lý trong 2h / Trong ngày / Bình thường)
- Tóm tắt 1 dòng (tối đa 15 chữ):
- Đầu mối phụ trách đề xuất: [QUY_TAC_PHAN_CONG]

[KHỐI 2 - KIỂM TRA THÔNG TIN CÒN THIẾU]
- Liệt kê các thông tin cần hỏi thêm khách hàng để xử lý trọn vẹn.

[KHỐI 3 - BẢN NHÁP PHẢN HỒI ĐỂ NHÂN VIÊN DUYỆT (HUMAN-IN-THE-LOOP)]
- Soạn tin nhắn phản hồi dưới 120 chữ, xác nhận đã tiếp nhận và hẹn giờ phản hồi cụ thể.`,
    variables: [
      { key: 'BO_PHAN_TIEP_NHAN', label: 'Bộ phận tiếp nhận', placeholder: 'VD: Phòng Kinh doanh & CSKH B2B', defaultValue: 'Bộ phận Kinh doanh & Hỗ trợ khách hàng doanh nghiệp' },
      { key: 'NOI_DUNG_TIN_NHAN_THO', label: 'Nội dung email/Zalo khách gửi', placeholder: 'Dán nội dung tin nhắn của khách...', defaultValue: 'Chào bên mình, bên anh đang cần đặt gấp 120 bộ quà Tết doanh nghiệp giao trước ngày 15 tháng sau tại Quận 1. Bên em gửi gấp báo giá kèm chính sách in logo lên hộp giúp anh trong sáng nay nhé, chiều anh họp trình sếp duyệt luôn!' },
      { key: 'QUY_TAC_PHAN_CONG', label: 'Quy tắc chia việc nội bộ', placeholder: 'VD: Đơn > 50 bộ chuyển Trưởng nhóm B2B; Khiếu nại chuyển CSKH', defaultValue: 'Đơn hàng từ 100 bộ trở lên phân công Trưởng nhóm B2B; Đơn lẻ phân công Chuyên viên trực ca' },
    ],
    sampleOutput: `[KHỐI 1 - BẢNG DỮ LIỆU CRM]\n- Phân loại yêu cầu: Báo giá mới\n- Mức độ ưu tiên: Khẩn cấp xử lý trong 2h (Khách trình sếp chiều nay)\n- Tóm tắt 1 dòng: Báo giá 120 bộ quà Tết in logo giao Quận 1\n- Đầu mối phụ trách: Trưởng nhóm B2B (Đơn >= 100 bộ)\n\n[KHỐI 2 - THÔNG TIN CẦN HỎI THÊM]\n- Ngân sách dự kiến trên mỗi bộ quà (VD: 300k, 500k hay 800k/bộ)?\n- File thiết kế logo вектор và yêu cầu xuất hóa đơn VAT.`,
    securityTip: 'Luôn giữ bước "Nhân viên duyệt bản nháp" trước khi gửi báo giá chính thức cho khách hàng.',
    updatedAt: '21/10/2026',
    copyCount: 1190,
    viewCount: 2380,
  },
  {
    id: 'prompt-15',
    title: '[Agent Trợ lý Cuộc họp] Bóc tách Quyết định đã chốt, Ma trận RACI & lịch nhắc việc sau họp',
    situation: 'Sau cuộc họp giao ban dài 90 phút, cần Agent phân tách rạch ròi đâu là ý kiến bàn bạc, đâu là quyết định đã chốt và tự động tạo chuỗi tin nhắn nhắc việc.',
    pillar: 'Công thức theo vị trí',
    role: 'Trợ lý & Quản lý',
    level: 'Trung cấp',
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    bestToolNote: 'Claude phân biệt cực tốt giữa "ý kiến đang thảo luận" và "quyết định đã chốt" trong bản ghi cuộc họp tiếng Việt.',
    agentType: 'Agent Trợ lý Họp & Điều phối',
    template: `Đóng vai Executive Meeting Agent hỗ trợ Ban Giám đốc và Quản lý dự án.
Danh sách thành viên tham dự cuộc họp [TEN_CUOC_HOP]: [THANH_VIEN_THAM_DU].
Dưới đây là bản ghi chú / gỡ băng thô của cuộc họp:
"""
[GHI_CHU_CUOC_HOP]
"""

YÊU CẦU XỬ LÝ CHÍNH XÁC:
1. Tách biệt Quyết định vs Thảo luận:
   - Mục A (QUYẾT ĐỊNH ĐÃ CHỐT): Chỉ liệt kê những việc đã thống nhất phương án.
   - Mục B (VẤN ĐỀ CÒN BỎ NGỎ): Những ý kiến đưa ra nhưng chưa chốt được kết luận cuối cùng.
2. Bảng hành động theo chuẩn RACI (Đầu việc | Người thực hiện chính - R | Người phê duyệt - A | Hạn chót | Trạng thái thông tin). Nếu thiếu hạn chót hoặc người phụ trách, bắt buộc ghi rõ [Cần xác nhận lại].
3. Soạn 02 tin nhắn ngắn: (1) Tin nhắn tổng kết gửi ngay sau họp; (2) Tin nhắn nhắc tiến độ gửi trước hạn chót 24 giờ.`,
    variables: [
      { key: 'TEN_CUOC_HOP', label: 'Tên cuộc họp', placeholder: 'VD: Họp triển khai chiến dịch bán hàng Quý IV', defaultValue: 'Họp giao ban triển khai sự kiện Tri ân Khách hàng tháng 11' },
      { key: 'THANH_VIEN_THAM_DU', label: 'Thành viên & Vai trò', placeholder: 'VD: Anh Minh (Giám đốc), Chị Lan (Marketing), Bạn Huy (Sales)', defaultValue: 'Anh Minh (Giám đốc - Chủ trì), Chị Lan (Trưởng nhóm Marketing), Anh Đức (Phụ trách Sự kiện), Chị Hà (Kế toán)' },
      { key: 'GHI_CHU_CUOC_HOP', label: 'Nội dung ghi chú thô', placeholder: 'Dán ghi chú cuộc họp vào đây...', defaultValue: 'Chốt tổ chức sự kiện vào sáng thứ Bảy 15/11 cho 80 khách mời. Chị Lan lo thiết kế thiệp mời và danh sách quà tặng hoàn thành trước thứ Năm tuần này. Anh Đức khảo sát 2 hội trường tại Quận 3, nhưng chưa chốt ngân sách thuê màn hình LED là bao nhiêu. Chị Hà kiểm tra thủ tục tạm ứng 30% cho bên hội trường.' },
    ],
    sampleOutput: `MỤC A — QUYẾT ĐỊNH ĐÃ CHỐT:\n- Thời gian & quy mô: Sáng thứ Bảy 15/11, quy mô 80 khách mời.\nMỤC B — VẤN ĐỀ CÒN BỎ NGỎ:\n- Ngân sách thuê màn hình LED tại hội trường Quận 3 [Cần xác nhận lại định mức với Anh Minh & Chị Hà].`,
    securityTip: 'Kiểm tra kỹ các con số ngân sách trong mục [Cần xác nhận lại] trước khi gửi biên bản lên nhóm chung.',
    updatedAt: '21/10/2026',
    copyCount: 1310,
    viewCount: 2620,
  },
  {
    id: 'prompt-16',
    title: '[Agent Script & Macro Văn phòng] Viết mã Google Apps Script / VBA tự động hóa báo cáo cho người không biết code',
    situation: 'Cần tự động gộp nhiều sheet báo cáo, tô màu dòng quá hạn hoặc tự động tạo file từ mẫu mà không biết lập trình.',
    pillar: 'Công thức theo vị trí',
    role: 'Hành chính',
    level: 'Nâng cao',
    recommendedTools: ['Codex', 'Claude', 'ChatGPT'],
    bestToolNote: 'Codex và Claude viết mã VBA / Google Apps Script sạch, có chú thích tiếng Việt từng dòng và kèm cơ chế chống lỗi.',
    agentType: 'Agent Viết Script & Macro Văn phòng',
    template: `Bạn là Office Automation Coding Agent chuyên viết mã tự động hóa trên [NEN_TANG_BANG_TINH] dành cho nhân viên văn phòng không biết lập trình.
Bài toán cần tự động hóa: [MO_TA_THAO_TAC_LAP_LAI].
Cấu trúc bảng dữ liệu hiện tại của tôi: [CAU_TRUC_BANG_HIEN_TAI].

YÊU CẦU BẮT BUỘC ĐỐI VỚI AGENT:
1. Viết đoạn mã hoàn chỉnh, có chú thích tiếng Việt dễ hiểu ở từng bước và có cơ chế an toàn:
   - Tự động bỏ qua các dòng trống.
   - Không làm mất công thức hiện có hoặc ghi kết quả sang một Sheet mới để bảo toàn dữ liệu gốc.
   - Hiển thị hộp thoại thông báo tiếng Việt khi chạy xong (ví dụ: "Đã xử lý thành công X dòng dữ liệu!").
2. Hướng dẫn cầm tay chỉ việc 4 bước (bấm vào menu nào, dán mã vào đâu, bấm nút nào để chạy) cho người lần đầu mở trình soạn thảo Script/VBA.
3. Nêu 2 lỗi thường gặp nhất khi chạy mã này và cách khắc phục trong 30 giây.`,
    variables: [
      { key: 'NEN_TANG_BANG_TINH', label: 'Phần mềm đang sử dụng', placeholder: 'VD: Google Sheets hoặc Microsoft Excel (VBA)', defaultValue: 'Google Sheets (sử dụng Google Apps Script)' },
      { key: 'MO_TA_THAO_TAC_LAP_LAI', label: 'Việc lặp đi lặp lại cần tự động', placeholder: 'VD: Lọc các dòng quá hạn thanh toán sang 1 sheet riêng và tô màu vàng', defaultValue: 'Quét bảng theo dõi hợp đồng, tự động lọc các hợp đồng sắp hết hạn trong vòng 15 ngày tới sang một sheet "Can_Gia_Han" và tô nền màu vàng nhạt' },
      { key: 'CAU_TRUC_BANG_HIEN_TAI', label: 'Tên Sheet & Thứ tự các cột', placeholder: 'VD: Sheet "HopDong", dòng 1 là tiêu đề, Cột A: Mã HĐ, Cột E: Ngày hết hạn', defaultValue: 'Sheet gốc tên "Danh_Sach_HD", dòng 1 là tiêu đề. Cột A: Mã hợp đồng, Cột B: Tên đối tác, Cột C: Giá trị, Cột D: Ngày hết hạn (định dạng dd/mm/yyyy)' },
    ],
    sampleOutput: `HƯỚNG DẪN CÀI ĐẶT TRONG 1 PHÚT (KHÔNG CẦN BIẾT CODE):\n- Bước 1: Mở file Google Sheets -> Bấm menu Tiện ích mở rộng (Extensions) -> Chọn Apps Script.\n- Bước 2: Xóa dòng chữ mặc định, dán toàn bộ đoạn mã bên dưới vào và bấm biểu tượng Đĩa mềm (Lưu).\n- Bước 3: Quay lại Google Sheets, tải lại trang sẽ thấy menu mới tên "⚡ Tự Động Hóa Công Sở" -> Bấm chọn "Lọc Hợp Đồng Sắp Hết Hạn"...`,
    securityTip: 'Luôn tạo một bản sao (Make a copy) của file Excel/Google Sheets để chạy thử đoạn mã lần đầu trước khi áp dụng trên file chính thức.',
    updatedAt: '21/10/2026',
    copyCount: 1275,
    viewCount: 2550,
  },
];

export const INITIAL_ARTICLES: ArticleItem[] = [
  {
    id: 'art-01',
    title: 'Công thức Prompt 4 Bước cho dân văn phòng: Tạm biệt câu trả lời nhạt nhẽo của AI',
    subtitle: 'Vì sao cùng một công cụ miễn phí, đồng nghiệp làm xong báo cáo trong 10 phút còn bạn phải ngồi sửa lại từ đầu?',
    pillar: 'Kỹ năng nền',
    role: 'Hành chính',
    level: 'Cơ bản',
    tools: ['Claude', 'ChatGPT', 'Gemini'],
    updatedAt: 'Cập nhật 10/2026',
    readTimeMinutes: 5,
    viewCount: 4280,
    situationContext:
      '90% nhân viên văn phòng mới dùng AI thường gõ những câu ngắn ngủn như "Viết cho tôi email xin lỗi khách hàng giao hàng trễ". Kết quả là AI trả về một bức thư dài dòng, sặc mùi văn dịch nước ngoài ("Tôi hy vọng bức thư này tìm thấy bạn..."), cuối cùng bạn mất thêm 30 phút tự viết lại.',
    badPrompt: 'Viết email xin lỗi khách hàng vì giao hàng trễ 2 ngày.',
    goodPrompt:
      'Đóng vai Trưởng bộ phận Chăm sóc khách hàng B2B tại Việt Nam (Vai trò). Khách hàng Công ty Minh Phát đặt 50 thùng giấy in lịch hẹn giao sáng nay nhưng xe vận chuyển gặp sự cố kẹt phà nên trễ 2 ngày; đây là khách quen 3 năm (Bối cảnh). Hãy soạn email nhận lỗi thẳng thắn, thông báo giờ giao mới chính xác và tặng kèm phiếu giảm 5% cho đơn kế tiếp (Yêu cầu). Trình bày dưới 150 chữ, giọng lịch sự, cầu thị, tuyệt đối không dùng câu văn dịch sáo rỗng (Định dạng).',
    whyItWorks: [
      '1. Vai trò (Role): Giúp AI chọn đúng từ vựng của người đi làm thực tế tại Việt Nam thay vì giọng học thuật chung chung.',
      '2. Bối cảnh (Context): Cung cấp mối quan hệ với người nhận (khách mới hay khách quen 3 năm, sếp trực tiếp hay đối tác).',
      '3. Yêu cầu (Task): Nêu rõ thông điệp cốt lõi và giải pháp đền bù/hướng xử lý cụ thể.',
      '4. Định dạng (Format): Khóa độ dài (dưới 150 chữ), giọng điệu và những từ ngữ cấm dùng.',
    ],
    steps: [
      {
        title: 'Bước 1: Đừng mở đầu bằng động từ "Hãy viết..." ngay lập tức',
        content:
          'Trước khi bảo AI viết, hãy dành 1 câu đầu tiên để gắn cho AI một vị trí công việc cụ thể: "Bạn là Kế toán trưởng...", "Bạn là Chuyên viên Nhân sự...". Điều này giúp thu hẹp kho từ vựng của AI về đúng ngành nghề của bạn.',
      },
      {
        title: 'Bước 2: Đưa 3 mảnh ghép bối cảnh công sở Việt Nam',
        content:
          'Luôn trả lời nhanh 3 câu hỏi: Viết cho ai đọc? Chuyện gì vừa xảy ra? Ràng buộc của công ty bạn là gì? Bạn có thể gạch đầu dòng nhanh, không cần trau chuốt câu chữ.',
      },
      {
        title: 'Bước 3: Yêu cầu AI đưa ra 2 phương án để bạn chọn',
        content:
          'Thay vì chỉ xin 1 bản nháp, hãy yêu cầu: "Cho tôi 2 phương án: Phương án 1 trang trọng gửi Email; Phương án 2 ngắn gọn gửi Zalo". Bạn sẽ luôn có ngay bản dùng được mà không cần chỉnh sửa nhiều.',
      },
    ],
    toolComparisons: [
      {
        tool: 'Claude',
        strengths: 'Câu chữ tiếng Việt mượt mà, tự nhiên, giữ thể diện cho cả hai bên rất khéo.',
        sampleResponse: 'Chào chị Lan, Trước hết em xin nhận lỗi với chị và bộ phận hành chính Minh Phát vì lô 50 thùng giấy in chưa thể tới kho sáng nay như lịch hẹn...',
        verdict: 'Phù hợp nhất cho Email công sở, thông báo nội bộ, thư từ chối khéo.',
      },
      {
        tool: 'ChatGPT',
        strengths: 'Cấu trúc mạch lạc, chia ý rõ ràng, nhanh chóng tạo nhiều biến thể theo danh sách.',
        sampleResponse: 'Chủ đề: Thông báo cập nhật lịch giao đơn hàng 50 thùng giấy in & Phương án hỗ trợ Minh Phát...',
        verdict: 'Rất tốt khi cần lập bảng hành động hoặc tạo nhanh nhiều mẫu tin nhắn.',
      },
      {
        tool: 'Gemini',
        strengths: 'Kết nối tốt với hệ sinh thái Google Workspace (Gmail, Docs, Sheets) và tìm kiếm thông tin mới.',
        sampleResponse: 'Kính gửi Quý đối tác Công ty Minh Phát, Chúng tôi xin thông báo cập nhật tiến độ giao nhận...',
        verdict: 'Tiện lợi khi bạn làm việc trực tiếp trên Gmail và Google Docs hàng ngày.',
      },
    ],
    securityChecklist: [
      'Đã thay tên khách hàng/đối tác nhạy cảm bằng tên giả định trước khi dán.',
      'Không đính kèm toàn bộ chuỗi email chứa số tài khoản hoặc báo giá mật.',
      'Đọc lướt lại các mốc ngày tháng trước khi bấm gửi.',
    ],
    repurposeKit: {
      tiktokScripts: [
        {
          hook: 'Vì sao AI trả lời của bạn nghe cứ nhạt nhạt như văn mẫu dịch?',
          body: 'Quay màn hình so sánh câu lệnh 8 chữ vs câu lệnh 4 bước (Vai trò - Bối cảnh - Yêu cầu - Định dạng). Chỉ mất thêm 20 giây gõ bối cảnh nhưng kết quả khác nhau một trời một vực.',
          cta: 'Copy ngay khung công thức 4 bước miễn phí tại thư viện AI Công Sở ở bio nhé!',
        },
      ],
      facebookPost:
        'Hôm qua một bạn hành chính nhắn cho mình: "Chị ơi sao em bảo ChatGPT viết email nhắc lịch họp mà đọc cứ ngượng ngượng như Google Dịch?". Lý do không phải vì bạn dùng bản miễn phí đâu, mà vì bạn thiếu mất 4 mảnh ghép bối cảnh này...',
      newsletterSnippet:
        'Mẹo sáng thứ Hai: Trước khi bấm Enter gửi câu hỏi cho AI, hãy thêm đúng 1 dòng cuối cùng: "Trình bày dưới 150 chữ, giọng tự nhiên của công sở Việt Nam, cho tôi 2 phương án Email và Zalo".',
    },
  },
  {
    id: 'art-02',
    title: 'Một tình huống, Ba công cụ: Chọn Claude, ChatGPT hay Gemini cho từng việc văn phòng?',
    subtitle: 'Không cần trả phí cả 3 công cụ. Đây là bảng phân vai thực tế để bạn chọn đúng trợ lý cho từng đầu việc.',
    pillar: 'Công cụ và so sánh',
    role: 'Trợ lý & Quản lý',
    level: 'Cơ bản',
    tools: ['Claude', 'ChatGPT', 'Gemini'],
    updatedAt: 'Cập nhật 10/2026',
    readTimeMinutes: 6,
    viewCount: 3850,
    situationContext:
      'Mỗi tuần lại có một bản cập nhật AI mới khiến dân văn phòng hoang mang: Nên dùng công cụ nào? Có cần mua gói trả phí 500.000đ/tháng không? Thực tế, 85% công việc văn phòng hàng ngày có thể giải quyết trọn vẹn bằng bản miễn phí nếu bạn biết giao đúng việc cho đúng công cụ.',
    badPrompt: 'Công cụ AI nào thông minh nhất hiện nay?',
    goodPrompt:
      'Tôi là nhân viên văn phòng tại Việt Nam, công việc chính gồm: (1) Viết email và văn bản tiếng Việt, (2) Xử lý công thức và bảng biểu Excel, (3) Tóm tắt tài liệu PDF dài 30 trang. Hãy phân tích điểm mạnh/yếu thực tế của Claude, ChatGPT và Gemini cho từng đầu việc trên.',
    whyItWorks: [
      'Đánh giá công cụ dựa trên đầu việc thực tế hàng ngày thay vì điểm số benchmark kỹ thuật.',
      'Giúp tiết kiệm chi phí đăng ký tài khoản không cần thiết.',
      'Hiểu rõ giới hạn của từng mô hình để kiểm chứng chéo khi làm báo cáo quan trọng.',
    ],
    steps: [
      {
        title: 'Khi nào nên mở Claude đầu tiên?',
        content:
          'Mỗi khi bạn cần viết lách bằng tiếng Việt cần sự tinh tế: viết email từ chối khách, soạn thông báo nhân sự, tóm tắt biên bản họp dài, hoặc rà soát câu chữ hợp đồng. Giọng văn của Claude tự nhiên và ít sáo rỗng nhất.',
      },
      {
        title: 'Khi nào nên mở ChatGPT đầu tiên?',
        content:
          'Khi bạn cần xử lý logic, viết công thức Excel/Google Sheets, lên khung kế hoạch dạng bảng, hoặc brainstorm nhanh 10 ý tưởng tiêu đề cho chiến dịch.',
      },
      {
        title: 'Khi nào nên mở Gemini đầu tiên?',
        content:
          'Khi bạn cần tra cứu thông tin thời sự có dẫn nguồn web, tóm tắt tài liệu dài lưu trên Google Drive, hoặc chuyển đổi nhanh nội dung sang Google Docs / Sheets.',
      },
    ],
    toolComparisons: [
      {
        tool: 'Claude',
        strengths: 'Văn phong tiếng Việt xuất sắc, đọc hiểu tài liệu dài rất sâu và ít bịa thêm chi tiết ngoài văn bản.',
        sampleResponse: 'Phù hợp 9.5/10 cho Nhân sự, Hành chính, Sales B2B và Content Marketing.',
        verdict: 'Trợ lý biên tập và soạn thảo số 1 cho công sở Việt Nam.',
      },
      {
        tool: 'ChatGPT',
        strengths: 'Đa năng, phản hồi nhanh, hỗ trợ công thức Excel, phân tích dữ liệu và tạo cấu trúc bảng biểu rất nhạy.',
        sampleResponse: 'Phù hợp 9.5/10 cho Kế toán, Phân tích dữ liệu, Lập kế hoạch tuần.',
        verdict: 'Trợ lý logic và bảng tính đa năng.',
      },
      {
        tool: 'Gemini',
        strengths: 'Tích hợp mượt với Gmail/Docs/Sheets, cửa sổ ngữ cảnh lớn và tra cứu thông tin trực tuyến nhanh.',
        sampleResponse: 'Phù hợp 9/10 cho Trợ lý, Nghiên cứu thị trường và người dùng hệ sinh thái Google.',
        verdict: 'Trợ lý tìm kiếm và kết nối tài liệu văn phòng.',
      },
    ],
    securityChecklist: [
      'Tắt chế độ cho phép sử dụng dữ liệu trò chuyện để huấn luyện mô hình trong phần Cài đặt (Settings -> Data Controls).',
      'Không dùng chung một tài khoản miễn phí cho cả phòng ban nếu có dán dữ liệu nội bộ.',
    ],
    repurposeKit: {
      tiktokScripts: [
        {
          hook: 'Claude, ChatGPT hay Gemini? Giao sai việc là bạn đang tự làm khổ mình!',
          body: 'Chia màn hình 3 cột với cùng 1 đề bài viết email từ chối khách hàng bằng tiếng Việt. Chỉ ra sự khác biệt rõ rệt về giọng văn.',
          cta: 'Xem bảng phân vai chi tiết từng công cụ tại website AI Công Sở nhé!',
        },
      ],
      facebookPost:
        'Đừng hỏi "AI nào giỏi nhất?" — Hãy hỏi "Việc sáng nay của mình hợp với AI nào nhất?". Đây là bảng phân công 3 trợ lý miễn phí mà mình áp dụng suốt 1 năm qua...',
      newsletterSnippet:
        'Quy tắc ngón tay cái tuần này: Viết tiếng Việt khéo léo -> Mở Claude. Hỏi công thức Excel -> Mở ChatGPT. Tra cứu tin tức & nối Google Docs -> Mở Gemini.',
    },
  },
  {
    id: 'art-03',
    title: 'Quy tắc Bảo mật 3 Không: Những dữ liệu tuyệt đối không được dán vào AI ở công ty',
    subtitle: 'Cách ẩn danh hóa số liệu kế toán, hợp đồng và danh sách nhân sự trong 30 giây trước khi nhờ AI xử lý.',
    pillar: 'Kỹ năng nền',
    role: 'Kế toán',
    level: 'Cơ bản',
    tools: ['Claude', 'ChatGPT', 'Gemini'],
    updatedAt: 'Cập nhật 10/2026',
    readTimeMinutes: 5,
    viewCount: 3190,
    situationContext:
      'Rất nhiều nhân viên văn phòng vì vội hoàn thành báo cáo đã copy nguyên bảng lương kèm số CCCD, hoặc tải cả file hợp đồng kinh tế có tên khách hàng chiến lược lên AI công cộng. Chỉ một sơ suất nhỏ có thể vi phạm quy định bảo mật của công ty và Luật Bảo vệ dữ liệu cá nhân.',
    badPrompt: 'Tải nguyên file "Bang_Luong_Thang_10_Full_CCCD.xlsx" lên AI và bảo: Kiểm tra giúp tôi xem cột thuế TNCN tính đúng chưa.',
    goodPrompt:
      'Tôi có cấu trúc bảng tính lương gồm: Cột C (Lương cơ bản), Cột D (Phụ cấp ăn trưa), Cột E (Số người phụ thuộc). Dưới đây là 3 dòng dữ liệu giả lập (Nhân viên A, Nhân viên B, Nhân viên C). Hãy viết giúp tôi công thức Excel tính Thuế TNCN phải khấu trừ theo biểu lũy tiến để tôi tự dán vào file máy tính của mình.',
    whyItWorks: [
      'AI chỉ cần biết cấu trúc cột và 2-3 dòng dữ liệu giả lập là đã viết được công thức chính xác 100%.',
      'Dữ liệu thật (Họ tên, CCCD, Số tài khoản, Mức lương thật) không bao giờ rời khỏi máy tính của bạn.',
      'Giúp bạn làm chủ công thức để kiểm soát kết quả lâu dài.',
    ],
    steps: [
      {
        title: '1. Nhóm dữ liệu tuyệt đối cấm dán trực tiếp (Đèn Đỏ)',
        content:
          'Số CCCD/Hộ chiếu, số điện thoại cá nhân, số tài khoản ngân hàng, mật khẩu hệ thống, bảng lương thật kèm họ tên, danh sách khách hàng VIP kèm giá chiết khấu độc quyền và dự thảo chiến lược chưa công bố.',
      },
      {
        title: '2. Kỹ thuật "Thay tên đổi họ" trong 30 giây (Đèn Vàng)',
        content:
          'Khi cần AI rà soát hợp đồng hoặc viết báo cáo tài chính: Dùng Ctrl+H trong Word để đổi tên công ty thật thành "Công ty A / Bên Mua", đổi số tiền thật bằng cách chia cho một số bất kỳ (hoặc làm tròn tượng trưng).',
      },
      {
        title: '3. Sử dụng bộ lọc Kiểm tra Bảo mật ngay trên AI Công Sở',
        content:
          'Trước khi copy prompt tại Thư viện của chúng tôi, hệ thống tự động quét và cảnh báo nếu bạn vô tình nhập số điện thoại 10 số, email thật hoặc số CCCD 12 số vào ô biến số.',
      },
    ],
    toolComparisons: [
      {
        tool: 'Claude',
        strengths: 'Mặc định không dùng dữ liệu người dùng miễn phí để huấn luyện mô hình (trừ khi người dùng bật phản hồi).',
        sampleResponse: 'An toàn cao khi xử lý văn bản đã được ẩn tên riêng.',
        verdict: 'Rất đáng tin cậy khi rà soát hợp đồng đã ẩn danh.',
      },
      {
        tool: 'ChatGPT',
        strengths: 'Có chế độ Temporary Chat (Trò chuyện tạm thời) và nút tắt huấn luyện dữ liệu trong phần Data Controls.',
        sampleResponse: 'Hãy bật Temporary Chat khi làm việc với số liệu công việc.',
        verdict: 'Cần chủ động bật cài đặt riêng tư trước khi dùng.',
      },
      {
        tool: 'Gemini',
        strengths: 'Nếu công ty dùng tài khoản Google Workspace doanh nghiệp thì dữ liệu được bảo mật cấp tổ chức.',
        sampleResponse: 'Kiểm tra kỹ bạn đang đăng nhập Gmail cá nhân hay Gmail doanh nghiệp.',
        verdict: 'Ưu tiên dùng tài khoản Workspace công ty nếu có.',
      },
    ],
    securityChecklist: [
      'Không bao giờ dán CCCD, SĐT, Email khách hàng thật vào khung chat.',
      'Dùng Ctrl+H thay tên Công ty thật thành "Công ty X" trước khi rà soát hợp đồng.',
      'Chỉ xin công thức Excel từ dữ liệu mẫu, sau đó tự chạy công thức trên máy cá nhân.',
    ],
    repurposeKit: {
      tiktokScripts: [
        {
          hook: 'Đừng bao giờ dán 3 thứ này vào ChatGPT ở công ty nếu không muốn bị gọi lên phòng Nhân sự!',
          body: 'Chỉ ra 3 lỗi phổ biến: Dán bảng lương thật có CCCD, tải nguyên hợp đồng mật, và dán danh sách SĐT khách hàng. Hướng dẫn mẹo Ctrl+H ẩn tên trong 15 giây.',
          cta: 'Xem trọn bộ quy tắc bảo mật AI cho dân văn phòng tại link bio!',
        },
      ],
      facebookPost:
        'Dùng AI làm việc nhanh hơn là rất tốt, nhưng đừng để nhanh 1 phút mà rủi ro cả sự nghiệp vì lộ dữ liệu công ty. Đây là nguyên tắc "3 Đèn Giao Thông" mình luôn dán ở góc màn hình...',
      newsletterSnippet:
        'Mẹo bảo mật tuần này: Khi cần AI viết công thức Excel cho bảng dữ liệu nhạy cảm, bạn chỉ cần copy dòng Tiêu đề cột + 2 dòng số liệu giả lập. AI vẫn viết công thức chuẩn 100% mà dữ liệu công ty an toàn tuyệt đối.',
    },
  },
  {
    id: 'art-04',
    title: '5 Việc văn phòng tốn 2 tiếng mỗi sáng mà AI làm gọn trong 3 phút',
    subtitle: 'Hướng dẫn từng bước cho người mới bắt đầu: Không thuật ngữ kỹ thuật, áp dụng được ngay từ sáng mai.',
    pillar: 'Nhập môn',
    role: 'Hành chính',
    level: 'Cơ bản',
    tools: ['Claude', 'ChatGPT', 'Gemini'],
    updatedAt: 'Cập nhật 10/2026',
    readTimeMinutes: 4,
    viewCount: 2940,
    situationContext:
      'Mỗi sáng đến văn phòng, bạn chưa kịp làm việc chuyên môn đã mất 2 tiếng cho những việc vụn vặt: trả lời email lặp đi lặp lại, tổng hợp ghi chú họp hôm qua, viết thông báo nhắc lịch, chỉnh lại câu chữ báo cáo và tra cứu công thức bảng tính.',
    badPrompt: 'Hãy làm giúp tôi công việc hành chính hôm nay.',
    goodPrompt:
      'Tôi có danh sách 7 đầu việc ngổn ngang trong ngày hôm nay (đính kèm bên dưới). Hãy giúp tôi sắp xếp lại theo thứ tự ưu tiên (Việc khẩn cấp & quan trọng làm trước 10h sáng), ước tính thời gian cho từng việc và soạn sẵn tin nhắn báo cáo kế hoạch ngày gửi Quản lý.',
    whyItWorks: [
      'Chia nhỏ công việc thành các tác vụ văn bản cụ thể mà AI xử lý cực nhanh.',
      'Giúp giải phóng năng lượng não bộ vào buổi sáng cho các quyết định quan trọng.',
    ],
    steps: [
      {
        title: 'Việc 1: Lập kế hoạch ngày từ danh sách việc ngổn ngang (30 giây)',
        content: 'Liệt kê mọi đầu việc đang nhớ trong đầu vào AI và yêu cầu sắp xếp theo khung giờ sáng/chiều kèm tin nhắn báo cáo nhanh.',
      },
      {
        title: 'Việc 2: Viết nháp các email khó mở lời (1 phút)',
        content: 'Nhắc nợ khách hàng, từ chối yêu cầu ngoài phạm vi, xin dời lịch hẹn — để AI viết khung lịch sự rồi bạn chỉnh lại 10% cuối cùng.',
      },
      {
        title: 'Việc 3: Chuyển ghi chú rời rạc thành biên bản chuẩn (1 phút)',
        content: 'Dán gạch đầu dòng ghi vội trong cuộc họp để AI gom thành bảng phân công có người phụ trách và deadline.',
      },
    ],
    toolComparisons: [
      {
        tool: 'Claude',
        strengths: 'Soạn thảo email và biên bản họp nhanh, không cần sửa lại câu từ nhiều.',
        sampleResponse: 'Hoàn thành 90% bản nháp ngay lần đầu tiên.',
        verdict: 'Khuyên dùng cho người mới bắt đầu.',
      },
      {
        tool: 'ChatGPT',
        strengths: 'Sắp xếp lịch trình và lập bảng phân bổ thời gian trong ngày rất khoa học.',
        sampleResponse: 'Chia khung giờ 08:30 - 17:30 kèm thời gian dự phòng.',
        verdict: 'Rất tốt để lên kế hoạch đầu tuần.',
      },
      {
        tool: 'Gemini',
        strengths: 'Tóm tắt nhanh tài liệu dài đính kèm trong email buổi sáng.',
        sampleResponse: 'Rút gọn file 20 trang thành 5 gạch đầu dòng cốt lõi.',
        verdict: 'Tiện lợi khi cần đọc nhanh tài liệu.',
      },
    ],
    securityChecklist: [
      'Chỉ liệt kê tên đầu việc, không dán mật khẩu hay đường dẫn nội bộ.',
    ],
    repurposeKit: {
      tiktokScripts: [
        {
          hook: 'Bạn vẫn đang làm tay 5 việc văn phòng này mỗi sáng sao?',
          body: 'Điểm danh 5 việc: Viết email nhắc nợ, tóm tắt biên bản họp, lập kế hoạch tuần, dò lỗi công thức Excel, viết thông báo Zalo.',
          cta: 'Lấy trọn bộ 50 câu lệnh mẫu miễn phí tại link bio nhé!',
        },
      ],
      facebookPost:
        'Thứ Hai nào đến công ty cũng thấy ngập đầu vì 1001 việc không tên? Thử giao ngay 5 việc lặp đi lặp lại này cho AI trong sáng mai...',
      newsletterSnippet:
        'Bắt đầu tuần mới nhẹ nhàng hơn: Dành 3 phút đầu giờ sáng dán danh sách việc cần làm vào AI để chia khung giờ ưu tiên trước khi mở hộp thư đến.',
    },
  },
];

export const INITIAL_ROADMAP: RoadmapStep[] = [
  {
    dayRange: 'Ngày 1 – 3',
    week: 1,
    weekTitle: 'Tuần 1: Nhập môn — Bỏ nỗi sợ kỹ thuật & Cuộc trò chuyện đầu tiên',
    title: 'Thiết lập tài khoản an toàn & Hiểu đúng bản chất AI công sở',
    objective: 'Tạo tài khoản Claude, ChatGPT, Gemini miễn phí; tắt chế độ thu thập dữ liệu huấn luyện và thực hiện cuộc trò chuyện công việc đầu tiên.',
    level: 'Cơ bản',
    timeEstimate: '20 phút/ngày',
    actionTask: 'Vào phần Cài đặt của công cụ AI bạn đang dùng, tắt tùy chọn huấn luyện dữ liệu và thử tóm tắt 1 văn bản dài 2 trang.',
    linkedArticleId: 'art-04',
  },
  {
    dayRange: 'Ngày 4 – 7',
    week: 1,
    weekTitle: 'Tuần 1: Nhập môn — Bỏ nỗi sợ kỹ thuật & Cuộc trò chuyện đầu tiên',
    title: 'Tránh 5 lỗi người mới hay mắc khiến AI trả lời sáo rỗng',
    objective: 'Nhận diện lỗi hỏi quá ngắn, thiếu bối cảnh người nhận và giao sai việc cho công cụ.',
    level: 'Cơ bản',
    timeEstimate: '25 phút/ngày',
    actionTask: 'Lấy 1 email bạn vừa tự viết hôm qua, dùng AI viết lại thành 2 phiên bản (Email trang trọng & Zalo ngắn gọn).',
    linkedPromptId: 'prompt-01',
  },
  {
    dayRange: 'Ngày 8 – 11',
    week: 2,
    weekTitle: 'Tuần 2: Kỹ năng nền — Công thức 4 Bước, Kiểm chứng & Bảo mật',
    title: 'Làm chủ công thức Prompt 4 Bước (Vai trò → Bối cảnh → Yêu cầu → Định dạng)',
    objective: 'Viết câu lệnh một lần dùng được ngay, không cần sửa đi sửa lại nhiều lần.',
    level: 'Cơ bản',
    timeEstimate: '30 phút/ngày',
    actionTask: 'Áp dụng công thức 4 bước để تóm tắt biên bản cuộc họp tuần này thành bảng phân công việc.',
    linkedArticleId: 'art-01',
    linkedPromptId: 'prompt-02',
  },
  {
    dayRange: 'Ngày 12 – 15',
    week: 2,
    weekTitle: 'Tuần 2: Kỹ năng nền — Công thức 4 Bước, Kiểm chứng & Bảo mật',
    title: 'Quy tắc Bảo mật dữ liệu công ty & Cách kiểm tra khi AI bịa thông tin',
    objective: 'Thành thạo kỹ thuật ẩn danh hóa dữ liệu nhạy cảm và quy trình 3 bước kiểm chứng văn bản pháp lý/thuế.',
    level: 'Trung cấp',
    timeEstimate: '30 phút/ngày',
    actionTask: 'Thực hành ẩn tên công ty và số liệu nhạy cảm trước khi nhờ AI kiểm tra 1 đoạn điều khoản hợp đồng hoặc quy định.',
    linkedArticleId: 'art-03',
    linkedPromptId: 'prompt-07',
  },
  {
    dayRange: 'Ngày 16 – 22',
    week: 3,
    weekTitle: 'Tuần 3: Công thức theo vị trí — Xử lý Excel, Báo cáo & Chuyên môn sâu',
    title: 'Tăng tốc làm báo cáo từ bảng số liệu Excel & Soạn thảo văn bản theo bộ phận',
    objective: 'Nhờ AI viết công thức Excel phức tạp có bẫy lỗi #N/A và viết nhận xét báo cáo gửi Sếp trước 5 giờ chiều.',
    level: 'Trung cấp',
    timeEstimate: '30 phút/ngày',
    actionTask: 'Dùng AI giải quyết 1 bảng tính Excel đang làm bạn mất nhiều thời gian nhất trong tuần và viết đoạn Executive Summary 150 chữ.',
    linkedPromptId: 'prompt-03',
  },
  {
    dayRange: 'Ngày 23 – 30',
    week: 4,
    weekTitle: 'Tuần 4: Đa công cụ & Xây dựng bộ trợ lý cá nhân lâu dài',
    title: 'Phối hợp Claude + ChatGPT + Gemini & Tạo kho mẫu câu lệnh riêng cho phòng ban',
    objective: 'Biết kết hợp thế mạnh của cả 3 công cụ cho một dự án lớn và lưu trữ bộ 20 câu lệnh dùng riêng cho công việc hàng tuần.',
    level: 'Nâng cao',
    timeEstimate: '30 phút/ngày',
    actionTask: 'Chạy cùng 1 bài toán báo cáo tháng trên cả Claude và ChatGPT để chọn ra công thức tối ưu nhất lưu vào sổ tay cá nhân.',
    linkedArticleId: 'art-02',
    linkedPromptId: 'prompt-08',
  },
];

export const INITIAL_PRODUCTS: StoreProduct[] = [
  {
    id: 'prod-01',
    title: 'Bộ 120 Prompt & Mẫu Báo Cáo Thực Chiến Cho Kế Toán - Tài Chính',
    category: 'Prompt Pack',
    role: 'Kế toán',
    priceVnd: 149000,
    originalPriceVnd: 249000,
    description: 'Tổng hợp các câu lệnh viết công thức Excel nâng cao, giải trình chênh lệch chi phí, soạn email thu hồi công nợ khéo léo và khung báo cáo quản trị tháng.',
    includes: [
      '120 câu lệnh chia theo 6 nghiệp vụ kế toán thực tế (File Notion + Excel tra cứu nhanh)',
      '10 mẫu bảng theo dõi công nợ & dòng tiền tích hợp sẵn công thức chống lỗi',
      'Hướng dẫn ẩn danh hóa số liệu tài chính an toàn trước khi dùng AI',
    ],
    previewSnippet: 'Bao gồm mẫu Prompt: "Phân tích biến động chi phí bán hàng vượt định mức 15% và viết giải trình 3 nguyên nhân cốt lõi trình Giám đốc..."',
    phaseStatus: 'Đang mở bán',
  },
  {
    id: 'prod-02',
    title: 'Bộ Công Cụ Hành Chính - Nhân Sự: Tuyển Dụng, Nội Quy & Biên Bản Họp',
    category: 'Mẫu Word/Excel/PPT',
    role: 'Nhân sự',
    priceVnd: 169000,
    originalPriceVnd: 269000,
    description: 'Giải phóng 80% thời gian soạn thảo công văn, thông báo nội bộ, mô tả công việc (JD), câu hỏi phỏng vấn tình huống và đánh giá thử việc.',
    includes: [
      '35 mẫu văn bản Hành chính - Nhân sự chuẩn thể thức doanh nghiệp Việt Nam (Word)',
      '80 câu lệnh AI chuyên sâu cho Tuyển dụng, C&B, Đào tạo nội bộ và Gắn kết nhân viên',
      'Bảng chấm công & theo dõi phép năm tự động (Excel)',
    ],
    previewSnippet: 'Bao gồm mẫu: "Soạn bộ 10 câu hỏi phỏng vấn kiểm tra kỹ năng xử lý tình huống thực tế cho từng vị trí kèm thang điểm đánh giá..."',
    phaseStatus: 'Đang mở bán',
  },
  {
    id: 'prod-03',
    title: 'Gói Tổng Hợp (All-in-One Bundle): Trợ Lý AI Toàn Diện Cho 6 Vị Trí Văn Phòng',
    category: 'Gói Tổng Hợp (Bundle)',
    role: 'Tất cả vị trí',
    priceVnd: 299000,
    originalPriceVnd: 590000,
    description: 'Trọn bộ thư viện hơn 350+ câu lệnh thực chiến cho Hành chính, Nhân sự, Kế toán, Sales, Marketing, Quản lý kèm trọn bộ mẫu biểu Word/Excel/PowerPoint.',
    includes: [
      'Toàn bộ 350+ Prompt công sở phân loại theo tình huống và cập nhật miễn phí trọn đời',
      '50 mẫu biểu Word, Excel, khung trình bày PowerPoint báo cáo tháng/quý',
      'Cẩm nang Bảo mật dữ liệu & Kiểm chứng thông tin AI cho doanh nghiệp nhỏ',
    ],
    previewSnippet: 'Tiết kiệm 50% so với mua lẻ từng vị trí. Phù hợp cho Quản lý nhỏ, Trợ lý hoặc nhân sự kiêm nhiệm nhiều đầu việc.',
    phaseStatus: 'Đang mở bán',
  },
];

export const INITIAL_AFFILIATES: AffiliateResource[] = [
  {
    id: 'aff-01',
    title: 'Claude Pro (Anthropic) — Trợ lý viết lách & phân tích tài liệu tiếng Việt',
    category: 'Công cụ AI',
    provider: 'Anthropic',
    priceNote: 'Bản miễn phí dùng rất tốt · Bản Pro 20 USD/tháng',
    honestReview:
      'Mình dùng bản miễn phí suốt 3 tháng đầu trước khi nâng cấp. Claude viết tiếng Việt tự nhiên nhất hiện nay, cực kỳ hợp để soạn email khéo léo, biên bản họp và rà soát file PDF dài đến hàng chục trang.',
    whoShouldBuy: 'Nhân sự, Hành chính, Sales, Marketing phải viết và đọc tài liệu tiếng Việt trên 2 giờ mỗi ngày.',
    whoShouldSkip: 'Người mới bắt đầu hoặc chỉ dùng 2-3 lần/ngày (bản miễn phí đã hoàn toàn đủ dùng).',
    affiliateDisclosure: 'Liên kết giới thiệu minh bạch: Giá bạn trả không đổi, kênh nhận một khoản hoa hồng nhỏ để duy trì bài viết miễn phí.',
    url: 'https://claude.ai',
  },
  {
    id: 'aff-02',
    title: 'Sách: "Làm Chủ Tư Duy Đặt Câu Hỏi Trong Kỷ Nguyên AI" (Ấn bản Tiếng Việt)',
    category: 'Sách nên đọc',
    provider: 'Nhà xuất bản Trẻ / Gian hàng chính hãng',
    priceNote: 'Khoảng 135.000đ',
    honestReview:
      'Cuốn sách hiếm hoi không dạy các mẹo vặt mau lỗi thời mà dạy cách chia nhỏ vấn đề công việc, tư duy phản biện và kiểm chứng thông tin khi làm việc cùng máy tính.',
    whoShouldBuy: 'Người đi làm 25–45 tuổi muốn rèn kỹ năng nền bền vững bất chấp công cụ thay đổi.',
    whoShouldSkip: 'Người chỉ cần tìm danh sách câu lệnh copy-paste nhanh (hãy dùng Thư viện Prompt miễn phí trên web này).',
    affiliateDisclosure: 'Liên kết giới thiệu sàn thương mại điện tử chính hãng (Tiết lộ Affiliate theo quy chuẩn minh bạch).',
    url: 'https://tiki.vn',
  },
  {
    id: 'aff-03',
    title: 'Google Workspace + Gemini cho Văn Phòng',
    category: 'Công cụ AI',
    provider: 'Google',
    priceNote: 'Tích hợp theo gói Google Workspace doanh nghiệp',
    honestReview:
      'Điểm mạnh lớn nhất là nằm ngay trong Gmail, Google Docs và Google Sheets bạn mở hàng ngày, đồng thời đáp ứng tiêu chuẩn bảo mật dữ liệu nội bộ của công ty.',
    whoShouldBuy: 'Các nhóm làm việc và doanh nghiệp nhỏ đang dùng sẵn hệ sinh thái Gmail/Google Drive.',
    whoShouldSkip: 'Cá nhân làm việc độc lập chủ yếu trên Word/Excel ngoại tuyến.',
    affiliateDisclosure: 'Liên kết giới thiệu đối tác chính thức — Minh bạch liên kết giới thiệu.',
    url: 'https://workspace.google.com',
  },
];

export const TEN_VIDEO_SCRIPTS: VideoScriptTemplate[] = [
  {
    id: 1,
    title: '5 việc văn phòng AI làm trong 1 phút',
    hook: '“Bạn vẫn đang làm tay 5 việc văn phòng tốn hàng tiếng đồng hồ này sao?”',
    demoAction: 'Quay màn hình lướt nhanh 5 việc: Viết email nhắc lịch, tóm tắt biên bản họp, sửa lỗi công thức Excel, chuyển thông báo sang tin nhắn Zalo, lập kế hoạch tuần.',
    outcome: 'Tiết kiệm 1 tiếng mỗi sáng để tập trung làm việc chuyên môn quan trọng.',
    cta: 'Lấy trọn bộ 50 prompt công sở miễn phí ở link trong bio nhé!',
    durationSec: '35 giây',
  },
  {
    id: 2,
    title: 'Viết email từ chối khách khéo léo',
    hook: '“Khách đòi giảm giá thêm 15%, từ chối sao cho không mất lòng?”',
    demoAction: 'Quay màn hình dán câu lệnh 4 bước vào Claude, yêu cầu xuất 2 bản: 1 bản gửi Email trang trọng, 1 bản nhắn Zalo ấm áp kèm đề xuất tặng thêm dịch vụ.',
    outcome: 'Email lịch sự, giữ chuẩn giá công ty mà khách vẫn vui vẻ hợp tác.',
    cta: 'Copy nguyên mẫu câu lệnh này ở Thư viện Prompt trong bio!',
    durationSec: '40 giây',
  },
  {
    id: 3,
    title: 'Tóm tắt biên bản họp 2 tiếng',
    hook: '“Họp 2 tiếng đồng hồ, xong ngồi viết biên bản mất thêm 1 tiếng nữa?”',
    demoAction: 'Dùng bản ghi chú nháp giả lập lộn xộn, dán vào AI kèm yêu cầu tách thành Bảng phân công việc (Đầu việc - Người làm - Deadline) và đánh dấu chỗ chưa rõ.',
    outcome: 'Biên bản họp chuẩn chỉnh gửi toàn phòng ngay sau khi rời phòng họp 3 phút.',
    cta: 'Mẫu câu lệnh thư ký cuộc họp đã có sẵn ở link bio!',
    durationSec: '40 giây',
  },
  {
    id: 4,
    title: 'Prompt dở vs Prompt tốt',
    hook: '“Vì sao AI trả lời của bạn nghe cứ nhạt nhạt như văn mẫu dịch?”',
    demoAction: 'Chia đôi màn hình: Bên trái gõ 1 dòng cụt lủn; Bên phải áp dụng đúng 4 mảnh ghép (Vai trò + Bối cảnh + Yêu cầu + Định dạng).',
    outcome: 'Bản bên phải dùng được ngay không cần sửa một chữ.',
    cta: 'Học công thức 4 bước miễn phí tại website ở bio!',
    durationSec: '35 giây',
  },
  {
    id: 5,
    title: 'Công thức Prompt 4 bước bất bại',
    hook: '“Đừng học thuộc lòng 1.000 câu lệnh, chỉ cần nhớ đúng 4 từ khóa này!”',
    demoAction: 'Minh họa trực quan 4 bước: Vai trò -> Bối cảnh -> Yêu cầu -> Định dạng trên một ví dụ hành chính nhân sự thực tế.',
    outcome: 'Áp dụng được cho cả Claude, ChatGPT lẫn Gemini.',
    cta: 'Tải bảng nhắc 4 bước dán góc màn hình tại bio nhé!',
    durationSec: '40 giây',
  },
  {
    id: 6,
    title: 'Làm báo cáo từ bảng số liệu Excel',
    hook: '“Có file Excel đầy số, Sếp cần báo cáo nhận xét trước 5 giờ chiều?”',
    demoAction: 'Copy dòng tổng hợp (đã ẩn tên công ty) vào AI, yêu cầu chỉ ra 3 điểm sáng, 3 điểm bất thường và viết đoạn tóm tắt 150 chữ.',
    outcome: 'Báo cáo sắc sảo, chuẩn bị sẵn luôn câu trả lời cho các câu hỏi khó của Sếp.',
    cta: 'Xem mẫu prompt cho Kế toán & Admin ở link bio!',
    durationSec: '45 giây',
  },
  {
    id: 7,
    title: 'Soạn kế hoạch công việc tuần',
    hook: '“Thứ Hai nào đến công ty cũng rối như tơ vò vì chục việc cùng lúc?”',
    demoAction: 'Gõ toàn bộ đầu việc ngổn ngang vào AI, yêu cầu phân loại theo mức độ ưu tiên và chia vào khung giờ sáng/chiều từ Thứ 2 đến Thứ 6.',
    outcome: 'Lịch làm việc tuần rõ ràng kèm tin nhắn báo cáo Sếp trong 1 phút.',
    cta: 'Thử ngay câu lệnh lập kế hoạch tuần ở bio!',
    durationSec: '35 giây',
  },
  {
    id: 8,
    title: 'Một câu hỏi, ba AI (Claude vs ChatGPT vs Gemini)',
    hook: '“Claude, ChatGPT hay Gemini: Cái nào viết tiếng Việt công sở đỉnh nhất?”',
    demoAction: 'Chạy cùng một tình huống viết thông báo nội bộ trên cả 3 công cụ và đặt kết quả cạnh nhau cho người xem tự đánh giá.',
    outcome: 'Biết chính xác việc nào nên mở công cụ nào để không tốn thời gian.',
    cta: 'Xem bảng so sánh chi tiết 3 công cụ trên web ở bio!',
    durationSec: '45 giây',
  },
  {
    id: 9,
    title: 'Sai lầm chết người khi dùng AI ở công ty',
    hook: '“Tuyệt đối đừng dán 3 thứ này vào AI nếu không muốn gặp rắc rối lớn!”',
    demoAction: 'Cảnh báo việc dán bảng lương có CCCD, hợp đồng mật, SĐT khách hàng. Hướng dẫn thao tác ẩn thông tin nhạy cảm trong 20 giây.',
    outcome: 'Vừa dùng AI làm việc nhanh vừa bảo mật tuyệt đối dữ liệu công ty.',
    cta: 'Đọc ngay quy tắc bảo mật AI công sở ở link bio!',
    durationSec: '40 giây',
  },
  {
    id: 10,
    title: 'AI bịa thông tin & Cách kiểm tra trong 1 phút',
    hook: '“AI trả lời rất tự tin, văn phong cực mượt nhưng... sai hoàn toàn!”',
    demoAction: 'Ví dụ AI trích dẫn nhầm số hiệu thông tư thuế/BHXH đã hết hiệu lực và cách dùng prompt kiểm chứng 3 bước.',
    outcome: 'Không bao giờ bị trình ký nhầm số liệu hay văn bản hết hiệu lực.',
    cta: 'Lấy câu lệnh kiểm chứng thông tin ở thư viện bio nhé!',
    durationSec: '45 giây',
  },
];

export const WEEKLY_SOLO_WORKFLOW = [
  {
    day: 'Thứ Hai',
    task: 'Chọn chủ đề tuần từ câu hỏi thực tế của người xem',
    duration: '45 phút',
    claudePrompt:
      'Đây là 10 bình luận và câu hỏi của nhân viên văn phòng tuần qua: [Dán bình luận]. Hãy nhóm lại theo nỗi đau lớn nhất và đề xuất 2 chủ đề bài viết hướng dẫn thực tế nhất cho tuần này.',
  },
  {
    day: 'Thứ Ba',
    task: 'Viết 1–2 bài hướng dẫn chuyên sâu trên Website',
    duration: '2.5 giờ',
    claudePrompt:
      'Viết bài hướng dẫn [Chủ đề] cho nhân viên văn phòng Việt Nam, trình độ cơ bản, có tình huống công sở thật, so sánh Prompt dở vs Prompt tốt, kết quả trên Claude/ChatGPT/Gemini và lưu ý bảo mật dữ liệu. Giọng thân thiện, dễ làm theo.',
  },
  {
    day: 'Thứ Tư',
    task: 'Tách bài web thành 3 kịch bản TikTok + 1 bài Facebook (Làm 1 lần dùng nhiều lần)',
    duration: '2 giờ',
    claudePrompt:
      'Từ bài viết hướng dẫn vừa soạn, hãy tách thành 3 kịch bản TikTok 40 giây (Hook 3 giây nêu nỗi đau -> Demo màn hình -> Kết quả -> CTA về web) và 1 bài Facebook chia sẻ gần gũi.',
  },
  {
    day: 'Thứ Năm',
    task: 'Soạn bản tin Email tuần (Newsletter) gửi người đăng ký',
    duration: '1 giờ',
    claudePrompt:
      'Viết newsletter đúng 200 chữ gửi nhân viên văn phòng sáng thứ Năm: tóm tắt bài viết mới nhất trong tuần và tặng kèm 1 mẹo câu lệnh ngắn có thể áp dụng ngay trong 2 phút.',
  },
  {
    day: 'Thứ Sáu',
    task: 'Rà soát số liệu & Cập nhật thư viện Prompt',
    duration: '45 phút',
    claudePrompt:
      'Đây là số liệu lượt xem bài viết, số lượt copy prompt và các câu hỏi được tìm kiếm nhiều nhất tuần này: [Dán số liệu]. Phân tích điểm hiệu quả và gợi ý 3 prompt mới nên bổ sung vào thư viện tuần tới.',
  },
];

export const POPULAR_AI_AGENTS: AIAgentCategory[] = [
  {
    id: 'agent-research',
    agentType: 'Agent Nghiên cứu & Tổng hợp',
    shortName: 'Research & Synthesis Agent',
    tagline: 'Tự động lập kế hoạch tìm kiếm đa nguồn, đối chiếu chéo dữ liệu và tổng hợp báo cáo có trích dẫn.',
    popularPlatforms: ['Gemini Deep Research', 'ChatGPT Deep Research / Search', 'Perplexity Pro'],
    recommendedTools: ['Gemini', 'ChatGPT', 'Claude'],
    targetRoles: ['Marketing', 'Sales', 'Trợ lý & Quản lý'],
    whatItDoes:
      'Khác với chatbot thông thường chỉ trả lời từ trí nhớ có sẵn, Research Agent tự chia nhỏ câu hỏi lớn thành 5–10 truy vấn con, đọc hàng chục trang báo cáo/website, đối chiếu số liệu và xuất báo cáo kèm link nguồn kiểm chứng.',
    basicUsageSteps: [
      'Giao đề bài kèm phạm vi địa lý (Việt Nam), mốc thời gian (2025–2026) và mục đích sử dụng báo cáo.',
      'Yêu cầu Agent liệt kê "Kế hoạch các góc độ tìm kiếm" trước khi bắt đầu tổng hợp chi tiết.',
      'Bắt buộc xuất kết quả thành bảng đối chiếu và gắn nhãn rõ những số liệu chưa có nguồn xác thực.',
    ],
    optimizationRules: [
      {
        title: 'Khóa phạm vi nguồn & năm dữ liệu',
        detail: 'Luôn chỉ định rõ giai đoạn (ví dụ: dữ liệu 2025–2026 tại thị trường Việt Nam) để tránh Agent lấy số liệu cũ từ 4–5 năm trước.',
      },
      {
        title: 'Cơ chế chống ảo giác (Anti-Hallucination)',
        detail: 'Thêm lệnh: "Nếu không tìm thấy số liệu chính thống, hãy ghi [Chưa đủ dữ liệu kiểm chứng], tuyệt đối không tự ước lượng."',
      },
      {
        title: 'Định dạng đầu ra hướng quyết định',
        detail: 'Đừng chỉ yêu cầu "tổng hợp thông tin" — hãy yêu cầu "Bảng so sánh 3 đối thủ + 3 hành động đề xuất trong 30 ngày".',
      },
    ],
    goldenStructureFormula:
      '[Vai trò Chuyên gia Nghiên cứu] + [Phạm vi Thị trường & Thời gian] + [Quy trình 3 bước: Lập kế hoạch -> Kiểm chứng chéo -> Tổng hợp bảng] + [Quy tắc cấm tự suy đoán số liệu]',
    commonMistake:
      'Đặt câu hỏi quá rộng như "Hãy phân tích thị trường F&B" khiến Agent trả về bài viết chung chung dài 10 trang nhưng không dùng được vào báo cáo thực tế.',
    specializedPromptIds: ['prompt-11', 'prompt-05'],
  },
  {
    id: 'agent-data',
    agentType: 'Agent Phân tích Dữ liệu & Excel',
    shortName: 'Data Analysis & Spreadsheet Agent',
    tagline: 'Tự viết và thực thi mã phân tích để làm sạch bảng tính, kiểm tra lệch tổng, tìm bất thường và viết hàm Excel.',
    popularPlatforms: ['ChatGPT Data Analysis', 'Claude Analysis Tool', 'Gemini trong Google Sheets'],
    recommendedTools: ['ChatGPT', 'Claude', 'Gemini'],
    targetRoles: ['Kế toán', 'Sales', 'Hành chính'],
    whatItDoes:
      'Sử dụng môi trường tính toán thực (Code Execution Sandbox) để đọc cấu trúc bảng dữ liệu, kiểm tra dòng trống/lệch tổng, tính tỷ lệ tăng trưởng chính xác tuyệt đối và sinh công thức Excel/Sheets.',
    basicUsageSteps: [
      'Chuẩn hóa bảng tính trước khi đưa vào: Dòng 1 là tên cột rõ ràng, bỏ các ô gộp (Merge Cells) và ẩn danh tên thật.',
      'Yêu cầu Agent chạy bước "Kiểm toán dữ liệu (Data Sanity Check)" (đếm số dòng, kiểm tra tổng cộng) trước khi phân tích.',
      'Yêu cầu xuất đồng thời nhận xét quản trị cho Sếp và công thức hàm Excel để tái sử dụng lâu dài.',
    ],
    optimizationRules: [
      {
        title: 'Định nghĩa rõ công thức nghiệp vụ',
        detail: 'Nêu rõ quy tắc tính của công ty bạn (VD: Tỷ lệ vượt định mức = (Thực chi - Định mức) / Định mức) để Agent không dùng công thức mặc định khác.',
      },
      {
        title: 'Bắt buộc kiểm tra tổng (Check-sum)',
        detail: 'Luôn yêu cầu Agent in ra Tổng cộng các cột ở bước 1 để bạn đối chiếu khớp 100% với file Excel trên máy.',
      },
      {
        title: 'Đặt ngưỡng cảnh báo cụ thể',
        detail: 'Chỉ định rõ ngưỡng cần tô đậm (VD: mọi khoản mục biến động > 15% hoặc công nợ quá hạn > 30 ngày).',
      },
    ],
    goldenStructureFormula:
      '[Mô tả cấu trúc Cột A, B, C] + [Bước 1: Kiểm tra khớp tổng & dòng lỗi] + [Bước 2: Phân tích biến động theo ngưỡng X%] + [Bước 3: Xuất công thức Excel & nhận xét 150 chữ]',
    commonMistake:
      'Đưa bảng Excel có nhiều dòng tổng phụ (Subtotal) xen lẫn dòng chi tiết mà không báo trước, khiến Agent cộng trùng gấp đôi số liệu.',
    specializedPromptIds: ['prompt-12', 'prompt-03'],
  },
  {
    id: 'agent-rag',
    agentType: 'Agent Tra cứu Tài liệu Nội bộ (RAG)',
    shortName: 'Knowledge & Document RAG Agent',
    tagline: 'Đọc hiểu và trích dẫn chính xác 100% từ Hợp đồng, Quy chế nhân sự, SOP nội bộ mà không bịa thêm quy định.',
    popularPlatforms: ['Google NotebookLM', 'Claude Projects', 'Custom GPTs (Knowledge)'],
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    targetRoles: ['Nhân sự', 'Hành chính', 'Kế toán'],
    whatItDoes:
      'Khoanh vùng câu trả lời chỉ nằm trong bộ tài liệu PDF/Word bạn cung cấp (Retrieval-Augmented Generation), kèm trích dẫn chính xác số Điều, Khoản và trang văn bản.',
    basicUsageSteps: [
      'Tải các văn bản còn hiệu lực (Quy chế nhân sự, quy trình mua hàng, hợp đồng mẫu) vào 1 Project/Notebook riêng biệt.',
      'Dán câu lệnh khóa phạm vi (Grounding Prompt) yêu cầu chỉ trả lời dựa trên tài liệu được cung cấp.',
      'Đối chiếu nhanh phần trích dẫn [Điều/Khoản] mà Agent chỉ ra trước khi phản hồi chính thức.',
    ],
    optimizationRules: [
      {
        title: 'Khóa chặt nguồn trả lời (Strict Grounding)',
        detail: 'Bắt buộc có câu lệnh: "Chỉ sử dụng 100% thông tin trong tài liệu đính kèm; không dùng kiến thức chung bên ngoài."',
      },
      {
        title: 'Yêu cầu trích dẫn nguyên văn điều khoản',
        detail: 'Yêu cầu Agent ghi rõ [Trích Điều X - Nguyên văn: "..."] ngay sau mỗi kết luận để kiểm tra trong 5 giây.',
      },
      {
        title: 'Kịch bản xử lý khi tài liệu không quy định',
        detail: 'Hướng dẫn Agent trả lời rõ "Tài liệu chưa quy định mục này, cần trình cấp quản lý" thay vì tự đoán.',
      },
    ],
    goldenStructureFormula:
      '[Kho tài liệu gốc] + [Câu hỏi thực tế] + [Ràng buộc: Chỉ dùng tài liệu gốc + Trích dẫn Điều/Khoản nguyên văn + Báo rõ nếu ngoài phạm vi quy chế]',
    commonMistake:
      'Để lẫn cả quy chế năm cũ (đã hết hiệu lực) và quy chế năm mới trong cùng một thư mục khiến Agent trích dẫn nhầm mức phụ cấp cũ.',
    specializedPromptIds: ['prompt-13', 'prompt-10'],
  },
  {
    id: 'agent-workflow',
    agentType: 'Agent Tự động hóa Quy trình',
    shortName: 'Workflow & Triage Automation Agent',
    tagline: 'Phân loại email/tin nhắn khách hàng, bóc tách dữ liệu vào bảng CRM và soạn sẵn bản nháp phản hồi theo quy tắc.',
    popularPlatforms: ['Zapier Central / Make AI', 'Google Workspace Flows', 'Microsoft Copilot Studio'],
    recommendedTools: ['ChatGPT', 'Claude', 'Gemini'],
    targetRoles: ['Sales', 'Marketing', 'Hành chính'],
    whatItDoes:
      'Đóng vai trò bộ lọc thông minh ở giữa quy trình: nhận thông tin thô (Email, Form đăng ký, tin nhắn khách hàng), phân loại mức độ ưu tiên, bóc tách thành các trường dữ liệu cố định và gợi ý hành động tiếp theo.',
    basicUsageSteps: [
      'Xác định rõ danh sách nhãn phân loại cố định (VD: Báo giá gấp / Khiếu nại / Hỏi thông tin).',
      'Khóa cấu trúc đầu ra thành các khối cố định để dễ dàng copy sang CRM/Google Sheets hoặc nối vào quy trình tự động.',
      'Luôn giữ bước "Nhân viên kiểm duyệt (Human-in-the-loop)" đối với bản nháp phản hồi trước khi gửi đi.',
    ],
    optimizationRules: [
      {
        title: 'Ép danh sách nhãn phân loại khép kín',
        detail: 'Chỉ cho phép Agent chọn 1 trong 3–4 nhãn cố định do bạn quy định để dữ liệu đẩy vào bảng tính luôn đồng nhất.',
      },
      {
        title: 'Cấm lời dẫn rườm rà',
        detail: 'Yêu cầu "Trả về đúng 3 khối dữ liệu cố định, không thêm câu chào hỏi mở đầu" để kết quả sạch sẽ.',
      },
      {
        title: 'Tự động phát hiện thông tin còn thiếu',
        detail: 'Dặn Agent liệt kê các thông tin khách hàng quên cung cấp (số lượng, ngày giao, ngân sách) để nhân viên hỏi lại ngay.',
      },
    ],
    goldenStructureFormula:
      '[Dữ liệu thô đầu vào] + [Bộ nhãn phân loại cố định & Quy tắc chia việc] + [Khối dữ liệu chuẩn CRM + Khối thông tin thiếu + Bản nháp phản hồi chờ duyệt]',
    commonMistake:
      'Cho phép Agent tự động gửi thẳng email báo giá hoặc cam kết bồi thường cho khách hàng mà không qua bước con người đọc duyệt.',
    specializedPromptIds: ['prompt-14', 'prompt-01'],
  },
  {
    id: 'agent-meeting',
    agentType: 'Agent Trợ lý Họp & Điều phối',
    shortName: 'Meeting & Executive Assistant Agent',
    tagline: 'Chuyển bản ghi cuộc họp dài thành danh sách quyết định đã chốt, bảng phân công RACI và lịch nhắc tiến độ.',
    popularPlatforms: ['Claude 3.7 Sonnet', 'Gemini trong Google Meet', 'Zoom AI / Fireflies AI'],
    recommendedTools: ['Claude', 'Gemini', 'ChatGPT'],
    targetRoles: ['Trợ lý & Quản lý', 'Hành chính', 'Nhân sự'],
    whatItDoes:
      'Xử lý bản ghi âm/ghi chú cuộc họp lộn xộn để tách bạch rõ ràng giữa "ý kiến đang bàn" và "quyết định đã chốt", đồng thời lập bảng giao việc rõ người chịu trách nhiệm và hạn hoàn thành.',
    basicUsageSteps: [
      'Khai báo danh sách người tham dự kèm chức vụ ở đầu câu lệnh để Agent hiểu đúng thẩm quyền phát biểu.',
      'Yêu cầu tách riêng mục "Quyết định đã chốt" và "Vấn đề còn bỏ ngỏ chưa thống nhất".',
      'Xuất bảng giao việc kèm tin nhắn tổng kết gửi nhóm Zalo/Teams ngay sau buổi họp.',
    ],
    optimizationRules: [
      {
        title: 'Khai báo danh sách & vai trò người dự họp',
        detail: 'Giúp Agent nhận diện chính xác ai là người phê duyệt (Accountable) và ai là người thực thi (Responsible).',
      },
      {
        title: 'Tách bạch Thảo luận vs Quyết định chốt',
        detail: 'Tránh lỗi phổ biến nhất của thư ký AI là biến một ý kiến đề xuất thử nghiệm thành quyết định chính thức.',
      },
      {
        title: 'Gắn cờ [Cần xác nhận lại] cho đầu việc mơ hồ',
        detail: 'Mọi đầu việc chưa nghe rõ hạn chót hoặc ngân sách phải được đánh dấu nổi bật để hỏi lại chủ tọa.',
      },
    ],
    goldenStructureFormula:
      '[Danh sách & Chức vụ người dự họp] + [Ghi chú thô] + [Tách: Quyết định đã chốt vs Vấn đề bỏ ngỏ] + [Bảng RACI + Nhãn Cần xác nhận lại + Tin nhắn nhắc việc]',
    commonMistake:
      'Dán bản ghi chú cuộc họp không có tên người phụ trách rồi gửi biên bản AI tạo ra đi ngay mà không rà soát các mốc deadline.',
    specializedPromptIds: ['prompt-15', 'prompt-02', 'prompt-09'],
  },
  {
    id: 'agent-coding',
    agentType: 'Agent Viết Script & Macro Văn phòng',
    shortName: 'Office Script & Macro Coding Agent',
    tagline: 'Viết mã Google Apps Script, VBA Excel và công thức mảng tự động hóa các thao tác lặp đi lặp lại cho dân không chuyên.',
    popularPlatforms: ['OpenAI Codex / o3-mini', 'Claude 3.7 Sonnet', 'ChatGPT Canvas'],
    recommendedTools: ['Codex', 'Claude', 'ChatGPT'],
    targetRoles: ['Hành chính', 'Kế toán', 'Nhân sự'],
    whatItDoes:
      'Biến mô tả bằng tiếng Việt thông thường thành đoạn mã Google Apps Script hoặc Excel VBA hoàn chỉnh, kèm hướng dẫn từng bước cách dán mã và nút bấm chạy tự động cho người chưa từng học lập trình.',
    basicUsageSteps: [
      'Mô tả rõ tên Sheet, dòng tiêu đề và ý nghĩa từng cột (Cột A, Cột B, Cột C, Cột D).',
      'Nêu rõ thao tác lặp lại muốn tự động hóa và yêu cầu xuất kết quả sang một Sheet mới để an toàn.',
      'Tạo một bản sao (Backup) của file bảng tính, làm theo 4 bước hướng dẫn để dán mã và kiểm tra kết quả.',
    ],
    optimizationRules: [
      {
        title: 'Mô tả chính xác tọa độ Sheet & Cột',
        detail: 'Cung cấp đúng tên Sheet (VD: "Danh_Sach_HD") và định dạng ngày tháng/số tiền ở từng cột để mã chạy đúng ngay lần đầu.',
      },
      {
        title: 'Yêu cầu cơ chế bảo vệ dữ liệu gốc',
        detail: 'Luôn thêm quy tắc: "Không xóa dữ liệu gốc; hãy xuất kết quả lọc sang một Sheet mới và bỏ qua dòng trống."',
      },
      {
        title: 'Yêu cầu hướng dẫn thao tác cho người không biết code',
        detail: 'Bắt buộc Agent chỉ rõ bấm vào menu nào trên Excel/Google Sheets và cách tạo nút bấm trên thanh công cụ.',
      },
    ],
    goldenStructureFormula:
      '[Nền tảng Excel VBA / Google Apps Script] + [Tên Sheet & Cấu trúc Cột A..D] + [Thao tác cần tự động] + [Quy tắc: Bảo toàn sheet gốc + Bỏ qua dòng trống + Hướng dẫn 4 bước cài đặt]',
    commonMistake:
      'Chạy thử đoạn mã tự động xóa hoặc gộp dữ liệu trực tiếp trên file báo cáo gốc duy nhất mà chưa tạo bản sao lưu.',
    specializedPromptIds: ['prompt-16', 'prompt-08'],
  },
];

