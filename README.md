# 🚀 Awesome Vietnam Office Toolkit 2026: AI Prompts & Labor Finance Calculators

[![Ecosystem](https://img.shields.io/badge/Ecosystem-HouseLab.vn-2563eb?style=for-the-badge)](https://houselab.vn)
[![Finance Tools](https://img.shields.io/badge/Calculators-taichinh.houselab.vn-059669?style=for-the-badge)](https://taichinh.houselab.vn)
[![Updated](https://img.shields.io/badge/Luật_Lao_Động_&_AI-Cập_Nhật_2026-f59e0b?style=for-the-badge)](https://taichinh.houselab.vn)

> **Sổ tay mã nguồn mở & bộ công cụ thực chiến dành cho nhân sự văn phòng Việt Nam (2026):** Tổng hợp khung câu lệnh (Prompt Frameworks) cho ChatGPT/Claude/Gemini giúp tự động hóa công việc công sở và hệ thống công thức chuẩn tính Lương Gross - Net, Thuế TNCN, Bảo hiểm xã hội (BHXH) theo quy định pháp luật hiện hành.

---

## 📑 Mục Lục Nhanh (Table of Contents)
1. [Giới thiệu dự án HouseLab Ecosystem](#-1-giới-thiệu-dự-án-houselab-ecosystem)
2. [Khung Prompt AI Công Sở Thực Chiến (HouseLab.vn)](#-2-khung-prompt-ai-công-sở-thực-chiến-houselabvn)
3. [Công Thức & Công Cụ Tính Tài Chính Lao Động 2026 (taichinh.houselab.vn)](#-3-công-thức--công-cụ-tính-tài-chính-lao-động-2026-taichinhhouselabvn)
4. [Danh Mục Liên Kết Nhanh (Quick Links)](#-4-danh-mục-liên-kết-nhanh-quick-links)

---

## 🌐 1. Giới Thiệu Dự Án HouseLab Ecosystem

Dự án được phát triển bởi đội ngũ **[HouseLab.vn](https://houselab.vn)** nhằm giải quyết hai bài toán cốt lõi của người lao động trí thức tại Việt Nam:
* **Tối ưu hiệu suất làm việc:** Chuẩn hóa các câu lệnh AI theo từng phòng ban (Kế toán, Nhân sự, Marketing, Sales, Quản lý) thông qua **[Nền tảng AI Công Sở & Thư Viện Prompt HouseLab.vn](https://houselab.vn)**.
* **Minh bạch tài chính cá nhân & quyền lợi lao động:** Tự động hóa các phép tính phức tạp về tiền lương, thuế lũy tiến và chế độ bảo hiểm tại chuyên trang **[Cẩm Nang Tài Chính & Công Cụ Tính taichinh.houselab.vn](https://taichinh.houselab.vn)**.

---

## 🤖 2. Khung Prompt AI Công Sở Thực Chiến (`HouseLab.vn`)

Để AI (ChatGPT, Claude, Gemini) trả về kết quả chính xác và ứng dụng được ngay vào công việc tại doanh nghiệp Việt Nam, chúng tôi áp dụng cấu trúc **R-C-T-F (Role - Context - Task - Format)**. Dưới đây là các mẫu tiêu biểu trích từ **[thư viện câu lệnh Prompt AI cho dân văn phòng](https://houselab.vn)**:

### 📊 2.1. Prompt Xử Lý Excel, Google Sheets & Dữ Liệu Kế Toán
```text
[Vai trò]: Bạn là chuyên gia phân tích dữ liệu và lập trình viên VBA/Google Apps Script cao cấp.
[Bối cảnh]: Tôi đang xử lý bảng báo cáo tài chính/bán hàng trên Excel có cột A là [Mã SP], cột B là [Ngày bán], cột C là [Doanh thu].
[Nhiệm vụ]: Hãy viết công thức mảng (hoặc hàm XLOOKUP/QUERY) để lọc ra tổng doanh thu theo từng tháng và tự động bôi đỏ các dòng bị trùng lặp dữ liệu.
[Định dạng]: Trình bày công thức trong khối code, giải thích từng tham số và hướng dẫn cách bẫy lỗi #N/A, #VALUE!.
