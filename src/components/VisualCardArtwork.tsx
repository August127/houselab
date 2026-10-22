import React from 'react';
import { OfficeRole, Pillar, AIAgentType } from '../data/siteData';

interface RoleArtworkProps {
  role: OfficeRole | 'Tất cả vị trí';
  className?: string;
}

export const RoleIsometricArtwork: React.FC<RoleArtworkProps> = ({
  role,
  className = 'h-40 w-full',
}) => {
  switch (role) {
    case 'Kế toán':
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            {/* Isometric 3D Base Platform */}
            <polygon
              points="140,132 45,86 140,40 235,86"
              fill="#1E293B"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            <polygon points="45,86 140,132 140,142 45,96" fill="#0F172A" />
            <polygon points="235,86 140,132 140,142 235,96" fill="#1E3A8A" />
            {/* Floating Spreadsheet Grid */}
            <g transform="translate(68, 26)">
              <rect
                x="0"
                y="0"
                width="92"
                height="62"
                rx="6"
                fill="#0F172A"
                stroke="#34D399"
                strokeWidth="1.5"
              />
              <rect x="8" y="8" width="24" height="8" rx="2" fill="#10B981" />
              <rect x="36" y="8" width="48" height="8" rx="2" fill="#1E293B" />
              <rect x="8" y="22" width="24" height="6" rx="1.5" fill="#334155" />
              <rect x="36" y="22" width="32" height="6" rx="1.5" fill="#38BDF8" />
              <rect x="8" y="34" width="24" height="6" rx="1.5" fill="#334155" />
              <rect x="36" y="34" width="44" height="6" rx="1.5" fill="#34D399" />
              <rect x="8" y="46" width="24" height="6" rx="1.5" fill="#334155" />
              <rect x="36" y="46" width="26" height="6" rx="1.5" fill="#60A5FA" />
            </g>
            {/* 3D Bar Chart Columns */}
            <g transform="translate(172, 34)">
              <rect x="0" y="38" width="12" height="32" rx="3" fill="#38BDF8" />
              <rect x="18" y="22" width="12" height="48" rx="3" fill="#60A5FA" />
              <rect x="36" y="6" width="12" height="64" rx="3" fill="#34D399" />
              <circle cx="42" cy="4" r="4" fill="#FBBF24" />
            </g>
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-emerald-300">
            EXCEL · BÁO CÁO · CÔNG NỢ
          </span>
        </div>
      );

    case 'Nhân sự':
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            <polygon
              points="140,132 50,86 140,40 230,86"
              fill="#1E1B4B"
              stroke="#818CF8"
              strokeWidth="1.5"
            />
            {/* 3D Candidate / Team Cards */}
            <g transform="translate(65, 22)">
              <rect
                x="0"
                y="14"
                width="68"
                height="72"
                rx="8"
                fill="#1E293B"
                stroke="#60A5FA"
                strokeWidth="1.5"
              />
              <circle cx="34" cy="36" r="11" fill="#3B82F6" />
              <rect x="14" y="54" width="40" height="6" rx="3" fill="#93C5FD" />
              <rect x="20" y="65" width="28" height="5" rx="2.5" fill="#475569" />
            </g>
            <g transform="translate(125, 14)">
              <rect
                x="0"
                y="0"
                width="82"
                height="78"
                rx="8"
                fill="#0F172A"
                stroke="#A5B4FC"
                strokeWidth="1.8"
              />
              <circle cx="24" cy="24" r="10" fill="#818CF8" />
              <rect x="40" y="18" width="32" height="6" rx="3" fill="#E0E7FF" />
              <rect x="40" y="28" width="22" height="5" rx="2.5" fill="#6366F1" />
              <rect x="14" y="46" width="54" height="6" rx="3" fill="#34D399" />
              <rect x="14" y="58" width="42" height="6" rx="3" fill="#38BDF8" />
            </g>
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-indigo-300">
            TUYỂN DỤNG · C&B · ĐÁNH GIÁ
          </span>
        </div>
      );

    case 'Sales':
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-amber-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            <polygon
              points="140,132 50,86 140,40 230,86"
              fill="#1E293B"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            {/* 3D Deal Funnel & Message Bubble */}
            <g transform="translate(64, 24)">
              <rect
                x="0"
                y="0"
                width="96"
                height="58"
                rx="8"
                fill="#0F172A"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <path d="M14 18 H82 M14 30 H68 M14 42 H52" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
            </g>
            <g transform="translate(152, 42)">
              <circle cx="32" cy="32" r="28" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="2" />
              <path
                d="M22 33 L29 40 L44 24"
                stroke="#FBBF24"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-amber-300">
            BÁO GIÁ · ĐÀM PHÁN · CHỐT ĐƠN
          </span>
        </div>
      );

    case 'Marketing':
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-sky-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            <polygon
              points="140,132 50,86 140,40 230,86"
              fill="#0F172A"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            {/* Multi-channel 3D Video & Content Cards */}
            <rect
              x="62"
              y="22"
              width="46"
              height="74"
              rx="7"
              fill="#1E293B"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            <polygon points="81,52 81,66 93,59" fill="#38BDF8" />
            <rect
              x="118"
              y="16"
              width="52"
              height="80"
              rx="7"
              fill="#1E3A8A"
              stroke="#93C5FD"
              strokeWidth="1.8"
            />
            <polygon points="139,48 139,64 153,56" fill="#FBBF24" />
            <rect
              x="178"
              y="28"
              width="46"
              height="68"
              rx="7"
              fill="#1E293B"
              stroke="#34D399"
              strokeWidth="1.5"
            />
            <rect x="186" y="42" width="30" height="5" rx="2" fill="#34D399" />
            <rect x="186" y="52" width="22" height="5" rx="2" fill="#94A3B8" />
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-sky-300">
            CONTENT · VIDEO NGẮN · ĐA KÊNH
          </span>
        </div>
      );

    case 'Trợ lý & Quản lý':
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            <polygon
              points="140,132 45,86 140,40 235,86"
              fill="#0F172A"
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
            {/* 3D Shield & Strategy Nodes */}
            <path
              d="M140 18 L182 34 V68 C182 94 164 112 140 120 C116 112 98 94 98 68 V34 L140 18 Z"
              fill="#1E3A8A"
              stroke="#93C5FD"
              strokeWidth="2"
            />
            <path
              d="M126 68 L136 78 L156 56"
              stroke="#34D399"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-blue-300">
            KIỂM CHỨNG · BẢO MẬT · ĐIỀU HÀNH
          </span>
        </div>
      );

    case 'Hành chính':
    default:
      return (
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 280 150" className="h-full w-full max-w-[260px]" fill="none">
            <polygon
              points="140,132 45,86 140,40 235,86"
              fill="#1E293B"
              stroke="#60A5FA"
              strokeWidth="1.5"
            />
            {/* 3D Clipboard & Meeting Minutes */}
            <rect
              x="92"
              y="16"
              width="96"
              height="92"
              rx="8"
              fill="#0F172A"
              stroke="#93C5FD"
              strokeWidth="1.8"
            />
            <rect x="122" y="10" width="36" height="12" rx="4" fill="#3B82F6" />
            <rect x="108" y="34" width="64" height="6" rx="3" fill="#60A5FA" />
            <rect x="108" y="48" width="52" height="6" rx="3" fill="#34D399" />
            <rect x="108" y="62" width="60" height="6" rx="3" fill="#94A3B8" />
            <rect x="108" y="76" width="40" height="6" rx="3" fill="#FBBF24" />
          </svg>
          <span className="absolute bottom-2.5 right-3 text-[11px] font-mono font-semibold text-blue-300">
            BIÊN BẢN HỌP · CÔNG VĂN · HÀNH CHÍNH
          </span>
        </div>
      );
  }
};

export const PillarIsometricArtwork: React.FC<{ pillar: Pillar; className?: string }> = ({
  pillar,
  className = 'h-32 w-full',
}) => {
  switch (pillar) {
    case 'Nhập môn':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 p-4 flex items-center justify-between ${className}`}>
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-sky-300">BƯỚC 01</span>
            <p className="text-sm font-bold text-white">Bắt đầu từ số 0</p>
            <p className="text-[11px] text-slate-300">Tạo tài khoản & 5 lỗi cần tránh</p>
          </div>
          <svg viewBox="0 0 90 90" className="h-20 w-20 shrink-0" fill="none">
            <circle cx="45" cy="45" r="36" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="2" />
            <path d="M36 30 L62 45 L36 60 Z" fill="#38BDF8" />
          </svg>
        </div>
      );
    case 'Kỹ năng nền':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 p-4 flex items-center justify-between ${className}`}>
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-300">BƯỚC 02</span>
            <p className="text-sm font-bold text-white">Công thức 4 Bước</p>
            <p className="text-[11px] text-slate-300">Đặt câu hỏi & Bảo mật dữ liệu</p>
          </div>
          <svg viewBox="0 0 90 90" className="h-20 w-20 shrink-0" fill="none">
            <rect x="14" y="14" width="26" height="26" rx="5" fill="#10B981" />
            <rect x="50" y="14" width="26" height="26" rx="5" fill="#38BDF8" />
            <rect x="14" y="50" width="26" height="26" rx="5" fill="#F59E0B" />
            <rect x="50" y="50" width="26" height="26" rx="5" fill="#6366F1" />
          </svg>
        </div>
      );
    case 'Công thức theo vị trí':
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950 to-blue-900 p-4 flex items-center justify-between ${className}`}>
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-indigo-300">BƯỚC 03</span>
            <p className="text-sm font-bold text-white">6 Phòng ban công sở</p>
            <p className="text-[11px] text-slate-300">Kế toán · HR · Sales · Admin</p>
          </div>
          <svg viewBox="0 0 90 90" className="h-20 w-20 shrink-0" fill="none">
            <polygon points="45,12 78,30 78,64 45,80 12,64 12,30" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
            <circle cx="45" cy="45" r="14" fill="#60A5FA" />
          </svg>
        </div>
      );
    case 'Công cụ và so sánh':
    default:
      return (
        <div className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-blue-950 to-amber-950 p-4 flex items-center justify-between ${className}`}>
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-amber-300">BƯỚC 04</span>
            <p className="text-sm font-bold text-white">So sánh 3 AI</p>
            <p className="text-[11px] text-slate-300">Claude · ChatGPT · Gemini</p>
          </div>
          <svg viewBox="0 0 90 90" className="h-20 w-20 shrink-0" fill="none">
            <circle cx="28" cy="48" r="16" fill="#D97706" fillOpacity="0.85" stroke="#FDE68A" strokeWidth="1.5" />
            <circle cx="48" cy="34" r="16" fill="#10B981" fillOpacity="0.85" stroke="#A7F3D0" strokeWidth="1.5" />
            <circle cx="56" cy="56" r="16" fill="#3B82F6" fillOpacity="0.85" stroke="#BFDBFE" strokeWidth="1.5" />
          </svg>
        </div>
      );
  }
};

export const AgentIsometricArtwork: React.FC<{
  agentType: AIAgentType;
  className?: string;
}> = ({ agentType, className = 'h-36 w-full' }) => {
  switch (agentType) {
    case 'Agent Nghiên cứu & Tổng hợp':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="130" cy="60" r="22" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1.8" />
            <circle cx="130" cy="60" r="8" fill="#38BDF8" />
            <line x1="130" y1="60" x2="78" y2="34" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="130" y1="60" x2="184" y2="32" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="130" y1="60" x2="192" y2="76" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="54" y="20" width="38" height="24" rx="5" fill="#1E293B" stroke="#7DD3FC" strokeWidth="1.2" />
            <rect x="168" y="18" width="42" height="24" rx="5" fill="#1E293B" stroke="#34D399" strokeWidth="1.2" />
            <rect x="176" y="66" width="38" height="22" rx="5" fill="#1E293B" stroke="#FBBF24" strokeWidth="1.2" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-sky-300">
            DEEP RESEARCH · MULTI-SOURCE
          </span>
        </div>
      );

    case 'Agent Phân tích Dữ liệu & Excel':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
            <rect x="64" y="24" width="84" height="58" rx="6" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
            <rect x="72" y="34" width="24" height="7" rx="2" fill="#10B981" />
            <rect x="102" y="34" width="36" height="7" rx="2" fill="#334155" />
            <rect x="72" y="47" width="66" height="6" rx="2" fill="#38BDF8" />
            <rect x="72" y="59" width="52" height="6" rx="2" fill="#34D399" />
            <rect x="162" y="52" width="10" height="32" rx="2.5" fill="#38BDF8" />
            <rect x="176" y="38" width="10" height="46" rx="2.5" fill="#10B981" />
            <rect x="190" y="22" width="10" height="62" rx="2.5" fill="#FBBF24" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-emerald-300">
            SANDBOX · EXCEL · ANOMALY
          </span>
        </div>
      );

    case 'Agent Tra cứu Tài liệu Nội bộ (RAG)':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#1E1B4B" stroke="#818CF8" strokeWidth="1.5" />
            <rect x="74" y="24" width="64" height="72" rx="6" fill="#0F172A" stroke="#A5B4FC" strokeWidth="1.6" />
            <rect x="84" y="36" width="44" height="6" rx="2" fill="#818CF8" />
            <rect x="84" y="48" width="36" height="5" rx="2" fill="#34D399" />
            <rect x="84" y="58" width="40" height="5" rx="2" fill="#64748B" />
            <rect x="84" y="68" width="28" height="5" rx="2" fill="#FBBF24" />
            <circle cx="166" cy="58" r="22" fill="#312E81" stroke="#34D399" strokeWidth="2" />
            <path d="M158 58 L164 64 L176 52" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-indigo-300">
            RAG · QUY CHẾ · TRÍCH DẪN
          </span>
        </div>
      );

    case 'Agent Tự động hóa Quy trình':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-blue-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#0F172A" stroke="#F59E0B" strokeWidth="1.5" />
            <rect x="52" y="42" width="42" height="32" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="109" y="34" width="44" height="44" rx="8" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
            <rect x="168" y="42" width="42" height="32" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
            <line x1="94" y1="58" x2="109" y2="58" stroke="#FBBF24" strokeWidth="2" />
            <line x1="153" y1="58" x2="168" y2="58" stroke="#34D399" strokeWidth="2" />
            <circle cx="131" cy="56" r="9" fill="#F59E0B" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-amber-300">
            TRIGGER · AI TRIAGE · CRM
          </span>
        </div>
      );

    case 'Agent Trợ lý Họp & Điều phối':
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-cyan-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" />
            <rect x="64" y="32" width="54" height="50" rx="8" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="74" y="50" width="5" height="16" rx="2" fill="#38BDF8" />
            <rect x="83" y="42" width="5" height="28" rx="2" fill="#22D3EE" />
            <rect x="92" y="46" width="5" height="20" rx="2" fill="#34D399" />
            <rect x="101" y="52" width="5" height="12" rx="2" fill="#38BDF8" />
            <rect x="134" y="26" width="66" height="60" rx="7" fill="#0F172A" stroke="#34D399" strokeWidth="1.6" />
            <rect x="144" y="38" width="46" height="6" rx="2" fill="#34D399" />
            <rect x="144" y="50" width="38" height="6" rx="2" fill="#38BDF8" />
            <rect x="144" y="62" width="42" height="6" rx="2" fill="#FBBF24" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-cyan-300">
            TRANSCRIPT · RACI · DEADLINE
          </span>
        </div>
      );

    case 'Agent Viết Script & Macro Văn phòng':
    default:
      return (
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950 to-cyan-950 p-4 flex items-center justify-center ${className}`}
        >
          <svg viewBox="0 0 260 130" className="h-full w-full max-w-[240px]" fill="none">
            <polygon points="130,118 45,78 130,38 215,78" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
            <rect x="68" y="22" width="124" height="68" rx="8" fill="#020617" stroke="#10B981" strokeWidth="1.8" />
            <circle cx="80" cy="33" r="3" fill="#F43F5E" />
            <circle cx="90" cy="33" r="3" fill="#F59E0B" />
            <circle cx="100" cy="33" r="3" fill="#10B981" />
            <path d="M84 52 L76 58 L84 64" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
            <path d="M104 52 L112 58 L104 64" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
            <rect x="122" y="50" width="54" height="6" rx="2" fill="#38BDF8" />
            <rect x="122" y="62" width="40" height="6" rx="2" fill="#10B981" />
          </svg>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono font-bold text-emerald-300">
            APPS SCRIPT · VBA · MACRO
          </span>
        </div>
      );
  }
};

