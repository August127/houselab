import { OfficeRole, AIToolName } from './siteData';

export type AINewsCategory =
  | 'Mô hình & Tính năng mới'
  | 'Xu hướng Công sở VN'
  | 'Ứng dụng theo Phòng ban'
  | 'Bảo mật & Quản trị AI';

export interface AINewsItem {
  id: string;
  title: string;
  summary: string;
  category: AINewsCategory;
  publishedDate: string;
  readTimeMinutes: number;
  impactRoles: OfficeRole[];
  featuredTools: AIToolName[];
  isBreaking?: boolean;
  trendMetric: string;
  beforeUpdateWorkflow: string;
  afterUpdateWorkflow: string;
  keyTakeaways: string[];
  fullAnalysis: {
    heading: string;
    body: string;
  }[];
  actionSteps: string[];
  linkedPromptId: string;
  linkedArticleId?: string;
  closedLoopNote: string;
}

export interface AITrendPulse {
  id: string;
  label: string;
  metric: string;
  changeLabel: string;
  summary: string;
  recommendedRole: OfficeRole;
  linkedNewsId: string;
}

export interface ClosedLoopStage {
  stepNumber: string;
  id: 'news' | 'articles' | 'prompts' | 'profile';
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  outcomeText: string;
  ctaLabel: string;
}

export const CLOSED_LOOP_STAGES: ClosedLoopStage[] = [
  {
    stepNumber: '01',
    id: 'news',
    shortTitle: 'Cập nhật Xu hướng',
    fullTitle: 'Bản tin & Xu hướng AI mới nhất',
    subtitle: 'Nắm bắt tính năng mới của Claude, ChatGPT, Gemini và cách áp dụng sát thực tế doanh nghiệp.',
    outcomeText: 'Biết công cụ nào giải quyết bài toán nào nhanh nhất hôm nay',
    ctaLabel: 'Đọc Tin tức AI',
  },
  {
    stepNumber: '02',
    id: 'articles',
    shortTitle: 'Hiểu Phương pháp',
    fullTitle: 'Tình huống mẫu & Lộ trình 30 ngày',
    subtitle: 'Phân tích câu lệnh Sai vs Đúng, đối chiếu 3 mô hình và rèn luyện bài bản 15 phút mỗi ngày.',
    outcomeText: 'Hiểu rõ cấu trúc 4 bước: Vai trò · Bối cảnh · Yêu cầu · Định dạng',
    ctaLabel: 'Xem Tình huống & Lộ trình',
  },
  {
    stepNumber: '03',
    id: 'prompts',
    shortTitle: 'Thực hành & Tối ưu',
    fullTitle: 'Thư viện Prompt & AI Agent thực chiến',
    subtitle: 'Điền biến tự động, đối chiếu tốc độ/độ chính xác cộng đồng và dùng AI gợi ý nâng cấp câu lệnh.',
    outcomeText: 'Tạo kết quả chuẩn công sở trong 30 giây, ẩn danh dữ liệu nhạy cảm',
    ctaLabel: 'Mở Thư viện Prompt',
  },
  {
    stepNumber: '04',
    id: 'profile',
    shortTitle: 'Lưu trữ & Đo lường',
    fullTitle: 'My Learning Path & Sổ tay cá nhân',
    subtitle: 'Ghim mẫu câu lệnh ruột, lưu biến thể ghi chú riêng theo phòng ban và theo dõi tiến độ 30 ngày.',
    outcomeText: 'Xây dựng bộ công cụ làm việc cá nhân hóa dùng lại mỗi sáng',
    ctaLabel: 'Mở Lộ trình của tôi',
  },
];

export const AI_TREND_PULSES: AITrendPulse[] = [
  {
    id: 'pulse-1',
    label: 'Chuyển dịch sang AI Agent đa bước',
    metric: '68% DN',
    changeLabel: '+24% quý này',
    summary: 'Thay vì hỏi đáp từng câu rời rạc, nhân sự văn phòng dùng System Prompt giao trọn gói quy trình 4 bước.',
    recommendedRole: 'Trợ lý & Quản lý',
    linkedNewsId: 'news-01',
  },
  {
    id: 'pulse-2',
    label: 'Tự động hóa đối soát Excel & BCTC',
    metric: '4.2 giờ/tuần',
    changeLabel: 'Tiết kiệm TB',
    summary: 'Kế toán & Sales Admin dùng chế độ Extended Thinking để kiểm tra chéo bảng số liệu và phát hiện lệch dòng.',
    recommendedRole: 'Kế toán',
    linkedNewsId: 'news-02',
  },
  {
    id: 'pulse-3',
    label: 'Họp thông minh & RAG nội bộ',
    metric: '94% chính xác',
    changeLabel: 'Cửa sổ 2M từ',
    summary: 'Đưa toàn bộ quy chế công ty và biên bản họp dài hàng trăm trang vào bộ nhớ ngữ cảnh lớn mà không sợ sót ý.',
    recommendedRole: 'Hành chính',
    linkedNewsId: 'news-03',
  },
  {
    id: 'pulse-4',
    label: 'Chuẩn hóa ẩn danh dữ liệu nhạy cảm',
    metric: '100% tuân thủ',
    changeLabel: 'Bảo mật nội bộ',
    summary: 'Các công ty Việt Nam áp dụng quy tắc xóa SĐT, CCCD, mã số thuế và tên khách hàng trước khi đưa vào AI.',
    recommendedRole: 'Nhân sự',
    linkedNewsId: 'news-06',
  },
];

export const INITIAL_AI_NEWS: AINewsItem[] = [
  {
    id: 'news-01',
    title: 'Claude nâng cấp chế độ Suy luận Sâu (Extended Thinking): Bước ngoặt cho Kế toán & Phân tích Báo cáo Quản trị',
    summary:
      'Khả năng tự kiểm tra lại phép tính và lập luận nhiều tầng trước khi trả lời giúp giảm tới 78% lỗi sai số học và tạo nhận xét tài chính sắc sảo như chuyên viên cao cấp.',
    category: 'Mô hình & Tính năng mới',
    publishedDate: '21/10/2026',
    readTimeMinutes: 4,
    impactRoles: ['Kế toán', 'Trợ lý & Quản lý', 'Sales'],
    featuredTools: ['Claude', 'ChatGPT'],
    isBreaking: true,
    trendMetric: 'Độ chính xác phân tích số liệu đạt 96.4%',
    beforeUpdateWorkflow:
      'Dán bảng số liệu vào AI thường bị cộng nhầm cột tổng hoặc chỉ nhận được những câu nhận xét chung chung kiểu "doanh thu tăng trưởng tốt".',
    afterUpdateWorkflow:
      'AI tự động đối chiếu tỷ trọng chi phí/doanh thu, chỉ ra khoản mục tăng bất thường và soạn sẵn 3 câu hỏi hóc búa mà Ban Giám đốc sẽ chất vấn.',
    keyTakeaways: [
      'Luôn yêu cầu AI "liệt kê từng bước kiểm tra tỷ lệ % trước khi viết nhận xét điều hành".',
      'Kết hợp bảng tổng hợp từ Excel (đã làm tròn/ẩn tên khách hàng) với mục tiêu ưu tiên của Sếp trong kỳ.',
      'Phù hợp nhất khi lập báo cáo biến động chi phí, tuổi nợ quá hạn và hiệu quả chiến dịch bán hàng.',
    ],
    fullAnalysis: [
      {
        heading: '1. Điều gì vừa thay đổi trong các mô hình suy luận thế hệ mới?',
        body: 'Trước đây, các mô hình ngôn ngữ lớn trả lời ngay lập tức theo xác suất từ vựng nên rất dễ gặp hiện tượng "ảo giác số liệu" khi xử lý bảng biểu nhiều cột. Với cơ chế Extended Thinking (suy luận có kiểm chứng), mô hình dành vài giây đầu tiên để tự lập bảng nháp, kiểm tra chéo tổng dòng/tổng cột rồi mới xuất bản báo cáo cuối cùng.',
      },
      {
        heading: '2. Ứng dụng sát sườn cho Kế toán và Quản lý tại Việt Nam',
        body: 'Khi bạn cần trình báo cáo doanh thu - chi phí tháng 10 lúc 4h30 chiều, thay vì ngồi gõ từng dòng nhận xét, bạn chỉ cần cung cấp các chỉ số tóm tắt và yêu cầu mô hình đóng vai Kế toán quản trị. Kết quả trả về không chỉ nêu con số mà còn chỉ rõ điểm nghẽn dòng tiền ở nhóm nợ quá hạn.',
      },
      {
        heading: '3. Lưu ý vàng để không lộ bí mật tài chính',
        body: 'Chỉ đưa vào AI các con số đã quy đổi theo tỷ lệ hoặc làm tròn (ví dụ: 1.350 triệu thay vì số lẻ đến từng đồng) và tuyệt đối thay tên pháp nhân thật bằng Công ty A, Đại lý B.',
      },
    ],
    actionSteps: [
      'Chuẩn bị 4–6 dòng số liệu tổng hợp kỳ này so với kỳ trước từ file Excel.',
      'Mở mẫu Prompt "Phân tích bảng số liệu Excel & viết báo cáo nhận xét cho Sếp" ngay bên dưới.',
      'Điền mục tiêu ưu tiên của Sếp và lưu lại cấu trúc nhận xét vào Sổ tay cá nhân.',
    ],
    linkedPromptId: 'prompt-03',
    linkedArticleId: 'art-03',
    closedLoopNote: 'Đọc tin công nghệ mới → Mở ngay Prompt phân tích số liệu #prompt-03 để kiểm chứng trên bảng Excel của bạn.',
  },
  {
    id: 'news-02',
    title: 'ChatGPT Deep Research & Agent Nghiên cứu: Tự động lập bảng so sánh đối thủ và báo cáo thị trường trong 5 phút',
    summary:
      'Tính năng tự động duyệt hàng chục nguồn báo cáo ngành, tổng hợp thành bảng ma trận đối chiếu có trích dẫn nguồn rõ ràng giúp Marketing và Sales B2B tiết kiệm cả ngày tìm kiếm.',
    category: 'Mô hình & Tính năng mới',
    publishedDate: '20/10/2026',
    readTimeMinutes: 5,
    impactRoles: ['Marketing', 'Sales', 'Trợ lý & Quản lý'],
    featuredTools: ['ChatGPT', 'Gemini'],
    isBreaking: true,
    trendMetric: 'Rút ngắn 85% thời gian làm Desk Research',
    beforeUpdateWorkflow:
      'Mở 20 tab trình duyệt, đọc từng bài báo, tự copy số liệu rời rạc vào Word và mất 4–6 tiếng để kẻ bảng so sánh ưu nhược điểm.',
    afterUpdateWorkflow:
      'Giao đề bài theo khung 4 bước cho Agent Nghiên cứu: AI tự động phân nhóm tiêu chí, lập bảng Markdown đối chiếu và tách bạch rõ phần "Số liệu thực tế" với "Đề xuất chiến lược".',
    keyTakeaways: [
      'Muốn AI không bịa số liệu thị trường, bắt buộc thêm câu lệnh: "Nếu không có số liệu chính thức, hãy ghi rõ [Chưa có dữ liệu kiểm chứng]".',
      'Yêu cầu xuất kết quả dưới dạng bảng đối chiếu 4 cột để dán thẳng vào slide PowerPoint hoặc Google Sheets.',
      'Rất hiệu quả khi chuẩn bị hồ sơ chào thầu (Proposal), nghiên cứu sản phẩm mới hoặc lập kế hoạch nội dung quý.',
    ],
    fullAnalysis: [
      {
        heading: '1. Từ công cụ trả lời nhanh sang Trợ lý Nghiên cứu chuyên sâu',
        body: 'Xu hướng lớn nhất năm 2026 là sự lên ngôi của Research Agent. Thay vì trả lời dựa trên trí nhớ có sẵn, AI chủ động chia nhỏ chủ đề thành 5–7 câu hỏi phụ, đối chiếu thông tin đa chiều trước khi đóng gói thành báo cáo hoàn chỉnh.',
      },
      {
        heading: '2. Cách đặt câu lệnh để nhận báo cáo dùng được ngay cho Sếp',
        body: 'Sai lầm phổ biến của dân văn phòng là chỉ gõ "Nghiên cứu thị trường X giúp tôi". Hãy chỉ định rõ khung phân tích (ví dụ: Phân khúc giá, Điểm mạnh cốt lõi, Điểm yếu khách hàng hay phàn nàn, Cơ hội ngách cho công ty mình).',
      },
    ],
    actionSteps: [
      'Xác định 3 đối thủ hoặc 3 phương án sản phẩm cần đặt lên bàn cân.',
      'Bấm nút "Thực hành Prompt liên quan" để mở mẫu câu lệnh Agent Nghiên cứu chuẩn.',
      'Kiểm tra lại các con số quan trọng và lưu bản mẫu vào My Learning Path.',
    ],
    linkedPromptId: 'prompt-05',
    linkedArticleId: 'art-01',
    closedLoopNote: 'Từ xu hướng Deep Research → Chuyển sang thực hành xây dựng kế hoạch Marketing & nghiên cứu với Prompt #prompt-05.',
  },
  {
    id: 'news-03',
    title: 'Gemini mở rộng bộ nhớ ngữ cảnh 2 triệu Token & NotebookLM Audio: Đọc hiểu hàng trăm trang quy chế & biên bản họp',
    summary:
      'Dân Hành chính, Nhân sự và Pháp chế giờ đây có thể tải toàn bộ sổ tay nhân viên, hợp đồng mẫu và ghi chú họp cả quý để tra cứu chính xác từng điều khoản trong tích tắc.',
    category: 'Ứng dụng theo Phòng ban',
    publishedDate: '19/10/2026',
    readTimeMinutes: 4,
    impactRoles: ['Hành chính', 'Nhân sự', 'Trợ lý & Quản lý'],
    featuredTools: ['Gemini', 'Claude'],
    trendMetric: 'Xử lý tới 1.500 trang tài liệu/lần chạy',
    beforeUpdateWorkflow:
      'Phải cắt nhỏ file PDF hoặc biên bản họp dài thành từng đoạn ngắn dán vào AI, dẫn đến mất mạch thông tin và sót các đầu việc quan trọng.',
    afterUpdateWorkflow:
      'Đưa toàn bộ nội dung cuộc họp 2 tiếng hoặc bộ quy định nội bộ vào một lần duy nhất; AI trích xuất bảng phân công kèm cột [Cần xác nhận lại] cực kỳ chặt chẽ.',
    keyTakeaways: [
      'Gemini dẫn đầu về tốc độ nuốt văn bản dài (tốc độ phản hồi trung bình chỉ ~1.9 giây) và tích hợp thẳng với Google Docs/Sheets.',
      'Khi tóm tắt họp hoặc tra cứu quy chế, luôn khóa quy tắc: "Chỉ trả lời dựa trên văn bản cung cấp, không tự suy diễn thông tin ngoài lề".',
      'Giúp bộ phận HCNS giảm 90% thời gian trả lời các câu hỏi lặp đi lặp lại của nhân viên mới về quy trình nghỉ phép, hoàn ứng.',
    ],
    fullAnalysis: [
      {
        heading: '1. Tại sao cửa sổ ngữ cảnh lớn lại thay đổi hoàn toàn công việc Hành chính - Nhân sự?',
        body: 'Công việc HCNS gắn liền với văn bản dài: quy chế tài chính, thỏa ước lao động, biên bản họp giao ban. Khi mô hình có thể đọc toàn bộ tài liệu cùng lúc, nó phát hiện được cả những mâu thuẫn nhỏ giữa các điều khoản mà mắt thường dễ bỏ sót.',
      },
      {
        heading: '2. Kết hợp Gemini và Claude để đạt chất lượng văn bản cao nhất',
        body: 'Bạn có thể dùng Gemini để lọc nhanh ý chính và trích xuất bảng dữ liệu từ tài liệu dài, sau đó dùng Claude để biên tập lại thành thông báo nội bộ hoặc email gửi toàn công ty với giọng văn trang trọng, ấm áp.',
      },
    ],
    actionSteps: [
      'Gom ghi chú thô của buổi họp gần nhất trong phòng ban của bạn.',
      'Chạy thử mẫu Prompt "Tóm tắt biên bản cuộc họp 2 tiếng thành bảng phân công việc rõ ràng".',
      'Đối chiếu kết quả giữa Gemini và Claude ngay trong tab So sánh.',
    ],
    linkedPromptId: 'prompt-02',
    linkedArticleId: 'art-02',
    closedLoopNote: 'Áp dụng ngay lợi thế xử lý văn bản dài vào mẫu Prompt Biên bản họp #prompt-02.',
  },
  {
    id: 'news-04',
    title: 'Báo cáo Xu hướng AI Công sở Việt Nam 2026: 4 kỹ năng giúp nhân viên văn phòng tăng 40% hiệu suất thật',
    summary:
      'Khảo sát hơn 1.200 nhân sự văn phòng tại Hà Nội và TP.HCM cho thấy người dùng hiệu quả nhất không phải người biết nhiều công cụ nhất, mà là người sở hữu "Thư viện câu lệnh cá nhân hóa".',
    category: 'Xu hướng Công sở VN',
    publishedDate: '17/10/2026',
    readTimeMinutes: 6,
    impactRoles: ['Kế toán', 'Nhân sự', 'Hành chính', 'Sales', 'Marketing', 'Trợ lý & Quản lý'],
    featuredTools: ['Claude', 'ChatGPT', 'Gemini', 'Codex'],
    trendMetric: 'Tiết kiệm trung bình 5.5 giờ/tuần',
    beforeUpdateWorkflow:
      'Mỗi lần cần viết email hay làm báo cáo lại gõ câu lệnh từ đầu theo cảm hứng, kết quả lúc hay lúc dở và tốn nhiều thời gian sửa lại.',
    afterUpdateWorkflow:
      'Xây dựng chu trình khép kín: Chọn mẫu Prompt chuẩn 4 bước → Điền biến số thực tế → Ghi chú lại mẹo riêng của phòng ban vào Sổ tay cá nhân để tái sử dụng 1 chạm.',
    keyTakeaways: [
      'Kỹ năng số 1: Đóng khung bối cảnh công sở Việt Nam (xưng hô, văn hóa trình ký, cấp bậc nhận tin) trong câu lệnh.',
      'Kỹ năng số 2: Biết phân vai 3 công cụ — Claude cho soạn thảo tinh tế, ChatGPT cho logic/bảng biểu, Gemini cho tài liệu dài & hệ sinh thái Google.',
      'Kỹ năng số 3: Lưu trữ các biến thể câu lệnh đã chạy tốt vào My Learning Path để cả tuần chỉ việc thay số liệu mới.',
    ],
    fullAnalysis: [
      {
        heading: '1. Khoảng cách giữa "Biết dùng AI" và "Làm xong việc nhờ AI"',
        body: 'Hơn 80% nhân viên văn phòng đã từng mở ChatGPT, nhưng chỉ khoảng 25% ứng dụng được hàng ngày vào công việc chuyên môn. Nguyên nhân chính là thiếu các mẫu câu lệnh được thiết kế riêng cho đặc thù văn书, kế toán, bán hàng tại Việt Nam.',
      },
      {
        heading: '2. Chu trình học tập khép kín 4 bước tạo ra sự khác biệt bền vững',
        body: 'Khi bạn kết nối từ việc đọc hiểu tình huống mẫu, thực hành trên trình điền biến, dùng AI tối ưu lại câu lệnh cho đến việc lưu trữ vào hồ sơ cá nhân, kỹ năng sử dụng AI sẽ trở thành phản xạ tự nhiên mỗi sáng.',
      },
    ],
    actionSteps: [
      'Chọn ra 3 công việc lặp đi lặp lại tốn nhiều thời gian nhất trong tuần của bạn.',
      'Tìm 3 mẫu Prompt tương ứng trong Thư viện và bấm biểu tượng Đánh dấu (Bookmark).',
      'Thêm ghi chú cá nhân vào từng thẻ Prompt để lưu lại văn phong riêng của sếp hoặc công ty bạn.',
    ],
    linkedPromptId: 'prompt-01',
    linkedArticleId: 'art-01',
    closedLoopNote: 'Khởi động chu trình học tập cá nhân hóa bằng mẫu Prompt giao tiếp khách hàng #prompt-01.',
  },
  {
    id: 'news-05',
    title: 'Ứng dụng AI trong Tuyển dụng & Đánh giá Nhân sự (HR Tech): Tự động hóa sàng lọc JD và bộ câu hỏi phỏng vấn tình huống',
    summary:
      'Bộ phận Nhân sự (HR) hiện có thể thiết kế bản mô tả công việc (JD) thu hút đúng chân dung ứng viên và tạo ma trận chấm điểm phỏng vấn hành vi STAR chỉ trong 3 phút.',
    category: 'Ứng dụng theo Phòng ban',
    publishedDate: '15/10/2026',
    readTimeMinutes: 4,
    impactRoles: ['Nhân sự', 'Trợ lý & Quản lý'],
    featuredTools: ['Claude', 'ChatGPT'],
    trendMetric: 'Giảm 60% thời gian chuẩn bị tuyển dụng',
    beforeUpdateWorkflow:
      'Copy lại mẫu JD cũ từ năm ngoái với danh sách yêu cầu chung chung, dẫn đến thu hút sai tệp hồ sơ và phỏng vấn cảm tính.',
    afterUpdateWorkflow:
      'Dùng câu lệnh cấu trúc hóa để AI viết JD nhấn mạnh văn hóa thực tế của doanh nghiệp, kèm bộ 5 câu hỏi phỏng vấn tình huống đo lường đúng năng lực cốt lõi.',
    keyTakeaways: [
      'Cung cấp rõ "3 kết quả đầu ra mong đợi trong 60 ngày thử việc" thay vì chỉ liệt kê bằng cấp.',
      'Yêu cầu AI kèm theo thang điểm đánh giá câu trả lời (Tốt / Đạt / Cần lưu ý) để hội đồng phỏng vấn chấm điểm khách quan.',
      'Sử dụng Claude để tinh chỉnh giọng văn tuyển dụng gần gũi, chuyên nghiệp, phù hợp thế hệ nhân sự trẻ.',
    ],
    fullAnalysis: [
      {
        heading: '1. Giải quyết bài toán "Khát nhân sự giỏi nhưng ngập CV không phù hợp"',
        body: 'Một bản JD hiệu quả phải nói rõ ứng viên sẽ giải quyết bài toán gì khi vào làm việc. AI giúp chuyên viên tuyển dụng chuyển hóa các gạch đầu dòng khô khan từ Trưởng bộ phận thành bản tin tuyển dụng có sức thuyết phục cao.',
      },
      {
        heading: '2. Chuẩn hóa quy trình phỏng vấn cùng Trưởng phòng chuyên môn',
        body: 'Ngay sau khi tạo JD, bạn có thể yêu cầu AI sinh tiếp bộ câu hỏi tình huống thực tế kèm tiêu chí đánh giá để gửi cho Trưởng bộ phận trước buổi phỏng vấn 15 phút.',
      },
    ],
    actionSteps: [
      'Mở mẫu Prompt Nhân sự trong Thư viện để điền vị trí đang cần tuyển và mức ngân sách.',
      'Chạy thử để lấy bản JD hoàn chỉnh cùng bộ câu hỏi phỏng vấn STAR.',
      'Lưu lại cấu trúc chấm điểm vào sổ tay HR của bạn.',
    ],
    linkedPromptId: 'prompt-04',
    linkedArticleId: 'art-02',
    closedLoopNote: 'Thực hành ngay quy trình Tuyển dụng & Nhân sự thông minh với Prompt #prompt-04.',
  },
  {
    id: 'news-06',
    title: 'Cảnh báo & Quy chuẩn Bảo mật AI nơi công sở: 5 loại dữ liệu tuyệt đối phải ẩn danh trước khi nhấn Enter',
    summary:
      'Hướng dẫn thực hành quy tắc an toàn thông tin cho nhân viên văn phòng Việt Nam khi sử dụng các công cụ AI đám mây: bảo vệ dữ liệu cá nhân (CCCD, SĐT, Email) và bí mật kinh doanh.',
    category: 'Bảo mật & Quản trị AI',
    publishedDate: '12/10/2026',
    readTimeMinutes: 5,
    impactRoles: ['Kế toán', 'Nhân sự', 'Hành chính', 'Sales', 'Marketing', 'Trợ lý & Quản lý'],
    featuredTools: ['Claude', 'ChatGPT', 'Gemini', 'Codex'],
    trendMetric: 'Quy tắc bắt buộc tại doanh nghiệp',
    beforeUpdateWorkflow:
      'Copy nguyên văn hợp đồng có tên thật khách hàng, số CCCD, số điện thoại, tài khoản ngân hàng và bảng lương dán thẳng vào cửa sổ chat AI.',
    afterUpdateWorkflow:
      'Chạy qua Bộ lọc Ẩn danh Tự động trong 3 giây để thay thế toàn bộ thông tin định danh bằng mã giả định ([SDT_DA_AN], [CCCD_DA_AN]) trước khi gửi cho AI xử lý.',
    keyTakeaways: [
      '5 nhóm dữ liệu cấm dán trực tiếp: (1) CCCD/Hộ chiếu, (2) SĐT & Email cá nhân, (3) Bảng lương chi tiết gắn tên thật, (4) Giá vốn/Biên lợi nhuận mật, (5) Mã nguồn/Mật khẩu nội bộ.',
      'AI chỉ cần "cấu trúc logic và mối quan hệ số liệu" để viết báo cáo hoặc soạn thư, hoàn toàn không cần biết tên thật của khách hàng.',
      'Sử dụng ngay công cụ Quét & Ẩn danh tích hợp sẵn trên mỗi cửa sổ Prompt của AI Công Sở trước khi sao chép.',
    ],
    fullAnalysis: [
      {
        heading: '1. Vì sao bảo mật dữ liệu là kỹ năng sống còn khi dùng AI công sở?',
        body: 'Nhiều nhân sự vô tình đưa danh sách khách hàng VIP hoặc dự thảo hợp đồng M&A lên các tài khoản AI miễn phí mà chưa tắt chế độ huấn luyện mô hình. Việc tuân thủ quy tắc ẩn danh giúp bạn tận dụng 100% sức mạnh của AI mà vẫn an toàn tuyệt đối.',
      },
      {
        heading: '2. Công thức "Thay tên đổi số - Giữ nguyên cấu trúc"',
        body: 'Khi cần AI kiểm tra điều khoản hợp đồng hoặc viết email đòi nợ khó đòi, hãy dùng tính năng Ẩn danh tự động để biến "Anh Nguyễn Văn Hùng - SĐT 0909123456" thành "Khách hàng A - [SDT_DA_AN]". Sau khi AI soạn xong văn bản, bạn chỉ mất 5 giây điền lại thông tin thật trong Word.',
      },
    ],
    actionSteps: [
      'Kiểm tra văn bản nháp của bạn bằng Bộ lọc bảo mật dữ liệu trong Thư viện Prompt.',
      'Nhấn nút "Ẩn danh tự động" để xem cách hệ thống che SĐT, CCCD và Email.',
      'Áp dụng thói quen này cho toàn bộ quy trình làm việc hàng ngày.',
    ],
    linkedPromptId: 'prompt-06',
    linkedArticleId: 'art-03',
    closedLoopNote: 'Kiểm chứng tính năng Quét bảo mật & thực hành trình bày cho Quản lý với Prompt #prompt-06.',
  },
];
