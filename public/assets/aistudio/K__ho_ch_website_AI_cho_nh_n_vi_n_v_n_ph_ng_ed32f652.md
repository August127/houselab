# Kế hoạch website AI cho nhân viên văn phòng

*Phiên bản 1.0 – tháng 10/2026. Tài liệu sống: hãy sửa trực tiếp khi có số liệu thực tế.*

## 1. Định vị

**Ý tưởng cốt lõi:** “AI cho công việc thật”. Người học không cần hiểu mô hình hoạt động thế nào, họ cần biết dùng AI để làm xong việc nhanh hơn vào sáng mai.

**Câu định vị:** Giúp nhân viên văn phòng dùng AI để làm xong việc nhanh hơn, bằng tiếng Việt, với tình huống công sở Việt Nam, không cần biết kỹ thuật.

**Khác biệt so với đối thủ**

- Học theo tình huống công việc, không theo công cụ (ví dụ: viết email từ chối khách, tóm tắt biên bản họp, làm báo cáo từ file Excel).
- Một tình huống, nhiều công cụ: cùng bài toán làm bằng Claude, ChatGPT, Gemini (và Codex cho người không biết code) để người học tự chọn.
- Tiếng Việt, ví dụ Việt Nam: báo cáo hành chính, email công sở, hợp đồng, Zalo, thuế/BHXH.
- Dạy kỹ năng bền (đặt câu hỏi, kiểm chứng, bảo mật dữ liệu) vì giao diện công cụ đổi liên tục còn kỹ năng nền thì không.

**Đối tượng:** nhân viên hành chính, nhân sự, kế toán, marketing, sales, trợ lý; quản lý nhỏ và chủ doanh nghiệp nhỏ; người đi làm 25-45 tuổi, ngại kỹ thuật.

## 2. Thương hiệu

Tên gợi ý (kiểm tra tên miền và tên kênh TikTok/Facebook): AI Công Sở, Làm Việc Cùng AI, AI Cho Dân Văn Phòng, Trợ Lý AI Của Bạn, Prompt Công Sở, Hôm Nay Dùng AI.

Tiêu chí: ngắn, dễ gõ không dấu, không chứa tên hãng AI (tránh rủi ro thương hiệu), tên kênh các nền tảng giống nhau. Không ngụ ý là đối tác chính thức của hãng nào nếu không phải.

## 3. Bốn trụ cột nội dung và ba trình độ

| Trụ cột | Mục đích | Ví dụ |
| --- | --- | --- |
| Nhập môn | Kéo người mới, giảm sợ hãi | AI là gì, tạo tài khoản, cuộc trò chuyện đầu tiên, 5 lỗi người mới hay mắc |
| Kỹ năng nền | Giá trị lõi, ít lỗi thời | Viết prompt, cung cấp ngữ cảnh, kiểm chứng, bảo mật dữ liệu công ty |
| Công thức theo vị trí | Dễ lan truyền, nền cho template bán sau | AI cho kế toán, nhân sự, sales, marketing, hành chính |
| Công cụ và so sánh | Kéo tìm kiếm, nền cho affiliate | Claude vs ChatGPT vs Gemini theo từng việc, tính năng mới |

Mọi bài gắn nhãn trình độ: **Cơ bản → Trung cấp → Nâng cao** (làm việc với file, tự động hóa, trợ lý riêng, agent).

## 4. Nguyên tắc cho người làm một mình

Giả định 10-15 giờ/tuần. Nếu ít hơn, giảm tần suất chứ đừng bỏ website.

| Hạng mục | Tần suất | Thời gian |
| --- | --- | --- |
| Bài trên website | 1-2 bài/tuần | 4-5 giờ |
| TikTok | 3 video/tuần (quay gộp một buổi) | 3 giờ |
| Facebook Page | 3 bài/tuần, tái sử dụng | 1 giờ |
| Email | 1 lần/tuần, từ tháng 2 | 1 giờ |

Ba quy tắc: làm theo lô (một buổi quay 3 video, một buổi viết 2 bài); mỗi chủ đề làm một lần dùng nhiều lần (bài web → kịch bản video → bài Facebook); chưa làm Zalo, LinkedIn, YouTube dài trước tháng thứ 4.

## 5. Cấu trúc website

```
Trang chủ
├─ Bắt đầu từ đây (lộ trình 30 ngày miễn phí)
├─ Bài viết (lọc: công cụ / vị trí / trình độ)
├─ Thư viện prompt (nút copy, gắn nhãn công cụ)
├─ Quà tặng: 50 prompt cho dân văn phòng (đổi lấy email)
├─ Cửa hàng        [chừa sẵn, mở ở giai đoạn 2]
├─ Khóa học        [chừa sẵn, mở ở giai đoạn 3]
├─ Sách và công cụ nên dùng (affiliate) [mở ở giai đoạn 2]
├─ Về tôi
└─ Liên hệ / Chính sách (quyền riêng tư, tiết lộ affiliate, điều khoản)
```

Bắt buộc từ ngày đầu: Google Analytics, Search Console, form email (MailerLite, Brevo hoặc tương tự), trang chính sách, ngày cập nhật trên mỗi bài.

## 6. Hướng dẫn dựng website từng bước

Bạn đã có hosting và domain nên chỉ cần chọn cách dựng. Có hai hướng, chọn **một**:

|  | A. WordPress | B. Website tĩnh (HTML/Astro) |
| --- | --- | --- |
| Phù hợp | Không rành code, muốn cửa hàng và khóa học sau này | Muốn nhẹ, nhanh, ít bảo trì, Claude viết code trực tiếp |
| Bài viết | Soạn trong trình soạn thảo, Claude viết nội dung để dán | Mỗi bài là một file, Claude tạo file |
| Cửa hàng/khóa học | Có plugin (WooCommerce, LMS) | Cần dịch vụ ngoài (cổng thanh toán, nền tảng khóa học) |
| Rủi ro | Cập nhật plugin, bảo mật, chậm nếu cài nhiều plugin | Bán hàng phức tạp phải ghép nhiều dịch vụ |

**Khuyến nghị:** nếu tham vọng bán template, khóa học và có tài khoản thành viên, chọn **WordPress**. Nếu giai đoạn đầu chỉ cần đọc, prompt và email, chọn **tĩnh** rồi thêm dịch vụ ngoài sau.

### Các bước với WordPress

1. Cài WordPress trên hosting (hầu hết hosting có cài một chạm), bật HTTPS.
2. Chọn một theme nhẹ (Astra, GeneratePress, Kadence hoặc tương tự), tránh theme nặng nhiều hiệu ứng.
3. Cài tối thiểu: SEO (Rank Math hoặc Yoast), cache, form email, sao lưu tự động, bảo mật. Mỗi plugin thêm là một rủi ro, đừng cài thừa.
4. Tạo trang: Trang chủ, Về tôi, Liên hệ, Chính sách quyền riêng tư, Tiết lộ affiliate, Điều khoản.
5. Tạo danh mục và thẻ: danh mục theo trụ cột; thẻ theo công cụ, vị trí, trình độ.
6. Dựng thư viện prompt: dùng loại nội dung riêng (custom post type) hoặc bảng có bộ lọc; mỗi prompt có tiêu đề, công cụ phù hợp, trình độ, nút copy.
7. Gắn form nhận quà “50 prompt” và tự động gửi file.
8. Kết nối Google Analytics và Search Console, gửi sitemap.
9. Đăng 6-8 bài đầu trước khi quảng bá.
10. Kiểm tra trên điện thoại: phần lớn người xem từ TikTok và Facebook dùng di động.

### Các bước với website tĩnh

1. Chọn khung (HTML thuần hoặc Astro), thống nhất bảng màu, một phông chữ, hai mẫu trang (bài viết, danh sách).
2. Claude tạo các trang lõi và mẫu bài viết; mỗi bài là một file Markdown.
3. Thư viện prompt là một file dữ liệu (JSON) kèm trang lọc và nút copy.
4. Form email nhúng từ dịch vụ email.
5. Tải lên hosting qua FTP/quản lý file (hoặc kết nối Git nếu hosting hỗ trợ).
6. Thêm sitemap, robots, thẻ SEO, Analytics.

## 7. Claude quản lý website như thế nào

Claude không tự đăng nhập vào hosting hay WordPress của bạn trong cuộc trò chuyện này. Khả năng “quản lý” thực tế phụ thuộc cách bạn kết nối, và bạn nên kiểm tra tính năng hiện hành trên trang tài liệu của Anthropic. Hai cách làm khả thi:

- **Claude là biên tập viên và lập trình viên, bạn là người đăng:** Claude viết bài, prompt, email, kịch bản, trang HTML hoặc mã; bạn dán vào WordPress hoặc tải file lên. Cách này an toàn nhất vì bạn duyệt trước khi lên web.
- **Kết nối sâu hơn (nâng cao):** dùng công cụ cho phép Claude làm việc với thư mục dự án hoặc kho mã của bạn (ví dụ Claude Code hoặc Claude Cowork), rồi bạn tự đẩy lên hosting. Không đưa mật khẩu hosting vào khung chat.

**Quy tắc an toàn:** luôn duyệt nội dung trước khi đăng; không chia sẻ mật khẩu, khóa API, dữ liệu khách hàng; bật sao lưu tự động trước khi sửa lớn; mọi thông tin giá, tính năng, chính sách của hãng AI cần kiểm chứng lại vì thay đổi nhanh.

### Quy trình vận hành hàng tuần cùng Claude (khoảng 3-4 giờ)

| Ngày | Việc | Prompt gợi ý cho Claude |
| --- | --- | --- |
| Thứ Hai | Chọn chủ đề tuần từ câu hỏi người xem | “Đây là 10 bình luận và câu hỏi tuần qua. Nhóm lại và đề xuất 2 chủ đề bài viết.” |
| Thứ Ba | Viết bài web | “Viết bài hướng dẫn \[chủ đề\] cho nhân viên văn phòng Việt Nam, trình độ cơ bản, có ví dụ và prompt mẫu, giọng thân thiện.” |
| Thứ Tư | Tách thành nội dung mạng xã hội | “Từ bài này viết 3 kịch bản TikTok 40 giây và 1 bài Facebook.” |
| Thứ Năm | Email tuần | “Viết newsletter 200 chữ tóm tắt bài mới và một mẹo.” |
| Thứ Sáu | Rà soát số liệu | “Đây là số liệu tuần này. Cái gì hiệu quả, tuần tới nên làm gì?” |

Mỗi quý: nhờ Claude liệt kê các bài có thể đã lỗi thời (tính năng đổi, giao diện đổi) để bạn kiểm tra và cập nhật.

## 8. Lộ trình kiếm tiền

Mỗi giai đoạn chỉ mở khi đạt ngưỡng, không mở theo lịch cứng.

### Giai đoạn 1 (tháng 1-3): Xây nền, chưa bán

Mục tiêu: 25-30 bài, 100+ prompt, 300-1.000 email. Chưa gắn affiliate dày đặc để giữ uy tín.

### Giai đoạn 2 (tháng 3-6): Cửa hàng template và affiliate nhẹ

**Cửa hàng template văn phòng** (giá gợi ý 99.000-299.000đ mỗi gói):

- Prompt pack theo vị trí (kế toán, nhân sự, sales, marketing, hành chính).
- Mẫu Word/Excel/PowerPoint: biên bản họp, kế hoạch tuần, báo cáo tháng, bảng theo dõi công việc, mẫu email công sở.
- Gói tổng hợp (bundle) giá ưu đãi.

Cách bán đơn giản để bắt đầu: trang bán hàng + cổng thanh toán nội địa (ví dụ chuyển khoản QR qua PayOS, SePay hoặc tương tự; kiểm tra phí và điều kiện hiện hành), tự động gửi file qua email. Nếu dùng WordPress có thể dùng WooCommerce. Trước khi mở, hãy mở danh sách chờ để đo nhu cầu.

**Affiliate** (luôn công khai đó là liên kết giới thiệu):

- Sách: chương trình liên kết của các sàn (Shopee, Tiki, Lazada hoặc mạng liên kết như Accesstrade); làm trang “Sách nên đọc” kèm nhận xét thật của bạn.
- Khóa học: chỉ giới thiệu khóa bạn đã học hoặc kiểm tra kỹ.
- Công cụ AI và phần mềm: chỉ những thứ bạn thật sự dùng; kiểm tra điều kiện chương trình giới thiệu của từng hãng.

### Giai đoạn 3 (tháng 6-12): Khóa học và cộng đồng

- Khóa video theo lộ trình (499.000-1.990.000đ) hoặc khóa live theo đợt. Chỉ làm khi biết chủ đề người ta muốn học.
- Cộng đồng trả phí (nhóm Zalo/Facebook) có hỏi đáp hàng tuần.
- Workshop cho doanh nghiệp nhỏ (doanh thu mỗi hợp đồng thường cao hơn bán lẻ).

### Giai đoạn 4 (năm 2 trở đi)

Ebook rồi sách in (gom từ nội dung đã được thị trường kiểm chứng), tư vấn và đào tạo nội bộ doanh nghiệp, chương trình chứng nhận.

### Ngưỡng chuyển giai đoạn gợi ý

- Sang giai đoạn 2: có ≥ 500 email hoặc có người hỏi mua khi chưa bán.
- Sang giai đoạn 3: có doanh thu từ template và người hỏi khóa học lặp lại.

### Pháp lý và thuế (cần xác nhận với chuyên gia)

Khi bắt đầu có doanh thu, hãy hỏi kế toán hoặc cơ quan thuế về hình thức kinh doanh (cá nhân hay hộ kinh doanh/công ty), nghĩa vụ thuế và hóa đơn. Quy định thay đổi nên cần kiểm tra bản hiện hành. Ngoài ra: chính sách hoàn tiền rõ ràng, điều khoản sử dụng sản phẩm số, tiết lộ affiliate, chính sách bảo vệ dữ liệu cá nhân.

## 9. Chiến lược đa nền tảng

```
1 bài hướng dẫn trên website (trụ cột, tối ưu SEO)
   ├─ 3 video ngắn TikTok/Reels/Shorts (mỗi video 1 mẹo)
   ├─ 1 bài Facebook (ảnh/carousel)
   ├─ 1 email trong chuỗi newsletter
   └─ 1 prompt mẫu vào thư viện
```

| Nền tảng | Vai trò | Giai đoạn đầu |
| --- | --- | --- |
| Website/SEO | Bến đỗ, uy tín, traffic dài hạn | 1-2 bài/tuần |
| TikTok | Tiếp cận người mới | 3 video/tuần, quay màn hình |
| Facebook Page + Group | Cộng đồng, đối tượng văn phòng dùng nhiều | 3 bài/tuần; Group từ tháng 2 nếu có thời gian trả lời |
| Email | Chuyển đổi, bán hàng, tài sản của bạn | 1 lần/tuần từ tháng 2 |
| YouTube, Zalo, LinkedIn | Mở rộng sau | Từ tháng 4 trở đi |

**Công thức video ngắn:** Hook 3 giây (nêu nỗi đau cụ thể) → Demo quay màn hình → Kết quả → CTA (lấy prompt ở link trong bio).

## 10. Lịch 90 ngày

**Tháng 1: Xây nền**

| Tuần | Website | TikTok / Facebook |
| --- | --- | --- |
| 1 | Chốt tên, dựng web, tạo trang chính sách | Tạo kênh, thống nhất tên và ảnh đại diện |
| 2 | 2 bài nhập môn, soạn “50 prompt” | Video 1-3 |
| 3 | Bài công thức prompt, 20 prompt đầu lên thư viện, gắn form email | Video 4-6, bắt đầu đăng Facebook |
| 4 | Bài email công sở và tóm tắt họp | Video 7-10 |

Mục tiêu cuối tháng 1: web chạy, 6-8 bài, 20-30 prompt, 10 video, 50+ email.

**Tháng 2: Đều tay và học từ số liệu**

- Web: 6-8 bài chủ yếu theo vị trí công việc, thư viện 60-80 prompt.
- TikTok: 3 video/tuần, xem video nào giữ chân tốt rồi làm thêm theo hướng đó.
- Facebook: mở Group nhỏ nếu đủ thời gian.
- Gửi email đầu tiên.

**Tháng 3: Dò nhu cầu bán hàng**

- Web: 6-8 bài, thêm 2 bài so sánh Claude/ChatGPT/Gemini.
- Biến lộ trình 30 ngày thành chuỗi email.
- Hỏi người đăng ký: bạn muốn học gì nhất? Đọc bình luận video.
- Mở danh sách chờ hoặc thử một prompt pack có phí nhỏ cho vị trí được hỏi nhiều nhất.

Mục tiêu cuối tháng 3: 25-30 bài, 100+ prompt, 300-500 email, biết chủ đề được quan tâm nhất.

## 11. Mười kịch bản video đầu tiên (30-45 giây)

1. **5 việc văn phòng AI làm trong 1 phút.** Hook: “Bạn vẫn đang làm tay 5 việc này?”
2. **Viết email từ chối khách khéo léo.** Hook: “Từ chối khách mà không mất lòng?”
3. **Tóm tắt biên bản họp.** Hook: “Họp 2 tiếng, viết biên bản thêm 1 tiếng?” (dùng ghi chú mẫu giả)
4. **Prompt dở vs prompt tốt.** Hook: “Vì sao AI trả lời của bạn nhạt?”
5. **Công thức prompt 4 bước:** vai trò → bối cảnh → yêu cầu → định dạng.
6. **Làm báo cáo từ bảng số liệu.** Hook: “Có file Excel, cần báo cáo trước 5 giờ?” (dữ liệu mẫu)
7. **Soạn kế hoạch công việc tuần.** Hook: “Thứ Hai nào cũng rối?”
8. **Một câu hỏi, ba AI.** Hook: “Claude, ChatGPT hay Gemini?”
9. **Sai lầm khi dùng AI ở công ty.** Hook: “Đừng dán thứ này vào AI.” (dữ liệu nhạy cảm, cách ẩn thông tin)
10. **AI bịa thông tin, cách kiểm tra.** Hook: “AI trả lời rất tự tin nhưng sai.”

Luôn dùng dữ liệu giả khi quay và ghi “Cập nhật tháng/năm” khi nói về tính năng công cụ.

## 12. Việc cần làm trong 7 ngày tới

1. Chọn tên, kiểm tra tên kênh TikTok/Facebook còn trống.
2. Chọn WordPress hay website tĩnh (mục 6).
3. Dựng 5 trang lõi: trang chủ, giới thiệu, thư viện prompt, form email, chính sách.
4. Soạn 30 prompt đầu tiên cho bộ “50 prompt”.
5. Tạo kênh TikTok, Facebook và quay thử 3 video.
6. Bật Analytics, Search Console và sao lưu tự động.

## 13. Rủi ro cần nhớ

- **Công cụ AI đổi rất nhanh:** ghi ngày cập nhật, rà soát mỗi quý, ưu tiên dạy kỹ năng hơn là từng nút bấm.
- **Uy tín trước, kiếm tiền sau:** nêu rõ giới hạn của AI (có thể bịa thông tin) và không đưa dữ liệu mật vào.
- **Minh bạch affiliate:** ghi rõ liên kết giới thiệu; nhiều nền tảng cũng yêu cầu.
- **Bản quyền và thương hiệu:** dùng logo theo quy định của từng hãng; nội dung sách, khóa học của người khác chỉ giới thiệu, không sao chép.
- **Đo lường đơn giản:** số email, bài/video dẫn về web, câu hỏi hay gặp (chính là ý tưởng sản phẩm tiếp theo).
