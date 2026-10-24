import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Download,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Monitor,
  Smartphone,
  Sun,
  Moon,
  MessageSquareShare,
  Send,
} from 'lucide-react';
import { PromptItem, OfficeRole } from '../data/siteData';

export interface PromptShareModalProps {
  prompt: PromptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onCopiedToast?: (title?: string) => void;
}

const ROLE_COLOR_MAP: Record<
  OfficeRole,
  { bg: string; text: string; hex: string; lightHex: string }
> = {
  'Kế toán': {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-700 dark:text-emerald-300',
    hex: '#059669',
    lightHex: '#10b981',
  },
  'Nhân sự': {
    bg: 'bg-purple-500/15',
    text: 'text-purple-700 dark:text-purple-300',
    hex: '#7c3aed',
    lightHex: '#a855f7',
  },
  'Hành chính': {
    bg: 'bg-blue-500/15',
    text: 'text-blue-700 dark:text-blue-300',
    hex: '#2563eb',
    lightHex: '#3b82f6',
  },
  Sales: {
    bg: 'bg-amber-500/15',
    text: 'text-amber-700 dark:text-amber-300',
    hex: '#d97706',
    lightHex: '#f59e0b',
  },
  Marketing: {
    bg: 'bg-pink-500/15',
    text: 'text-pink-700 dark:text-pink-300',
    hex: '#db2777',
    lightHex: '#ec4899',
  },
  'Trợ lý & Quản lý': {
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-700 dark:text-indigo-300',
    hex: '#4f46e5',
    lightHex: '#6366f1',
  },
};

export const PromptShareModal: React.FC<PromptShareModalProps> = ({
  prompt,
  isOpen,
  onClose,
  onCopiedToast,
}) => {
  const [aspectRatio, setAspectRatio] = useState<'landscape' | 'portrait'>('landscape');
  const [cardTheme, setCardTheme] = useState<'dark' | 'light'>('dark');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [canShareApi, setCanShareApi] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      setCanShareApi(true);
    }
  }, []);

  // Compute canonical share link and post text
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/?prompt=${prompt?.id || ''}`
    : `https://aicongso.vn/?prompt=${prompt?.id || ''}`;

  const shortDisplayLink = `aicongso.vn/p/${prompt?.id || ''}`;

  const getCompiledPromptText = useCallback((p: PromptItem): string => {
    let result = p.template;
    p.variables.forEach((v) => {
      result = result.split(`[${v.key}]`).join(v.defaultValue);
    });
    return result;
  }, []);

  const getSocialCaptionText = useCallback((): string => {
    if (!prompt) return '';
    return [
      `🔥 [AI CÔNG SỞ] ${prompt.title.toUpperCase()}`,
      `📌 Phòng ban: ${prompt.role} · Cấp độ: ${prompt.level}`,
      `💡 Tình huống: ${prompt.situation}`,
      `🤖 Công cụ khuyên dùng: ${prompt.recommendedTools.join(', ')}`,
      '',
      '--- CÂU LỆNH MẪU THỰC CHIẾN ---',
      getCompiledPromptText(prompt),
      '',
      `🛡️ Lưu ý bảo mật: ${prompt.securityTip}`,
      '',
      `👉 Trải nghiệm điền biến tự động tại: ${shareUrl}`,
      '#AICongSo #PromptThucChien #TuDongHoaVanPhong #' + prompt.role.replace(/\s+/g, ''),
    ].join('\n');
  }, [prompt, getCompiledPromptText, shareUrl]);

  // Canvas drawing function
  const renderCardToCanvas = useCallback(() => {
    if (!prompt || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isLandscape = aspectRatio === 'landscape';
    const width = isLandscape ? 1200 : 1080;
    const height = isLandscape ? 675 : 1350;

    canvas.width = width;
    canvas.height = height;

    const isDark = cardTheme === 'dark';
    const roleColors = ROLE_COLOR_MAP[prompt.role] || {
      hex: '#059669',
      lightHex: '#10b981',
    };

    // Helper: Rounded Rectangle
    const fillRoundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fillStyle: string,
      strokeStyle?: string,
      lineWidth = 1
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();
      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    // Helper: Text Wrapping
    const drawWrappedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number,
      maxLines = 10
    ): number => {
      const words = text.split(' ');
      let line = '';
      let currentY = y;
      let linesCount = 0;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[n] + ' ';
          currentY += lineHeight;
          linesCount++;
          if (linesCount >= maxLines) {
            ctx.fillText(line.trim() + '...', x, currentY);
            return currentY + lineHeight;
          }
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), x, currentY);
      return currentY + lineHeight;
    };

    // 1. Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (isDark) {
      bgGrad.addColorStop(0, '#0a0f1d');
      bgGrad.addColorStop(0.5, '#09151f');
      bgGrad.addColorStop(1, '#06201b');
    } else {
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(0.5, '#f0fdf4');
      bgGrad.addColorStop(1, '#ecfdf5');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle decorative grid dots
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(16, 185, 129, 0.07)';
    const dotSpacing = 36;
    for (let gx = 20; gx < width; gx += dotSpacing) {
      for (let gy = 20; gy < height; gy += dotSpacing) {
        ctx.beginPath();
        ctx.arc(gx, gy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Outer glow container
    const margin = 40;
    const cardW = width - margin * 2;
    const cardH = height - margin * 2;
    fillRoundRect(
      margin,
      margin,
      cardW,
      cardH,
      32,
      isDark ? '#0f172a' : '#ffffff',
      isDark ? 'rgba(16, 185, 129, 0.35)' : 'rgba(16, 185, 129, 0.4)',
      2
    );

    // Header strip inside card
    const innerX = margin + 36;
    const innerW = cardW - 72;
    let cursorY = margin + 55;

    // Logo & Brand tag
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#34d399' : '#059669';
    ctx.fillText('✦ AI CÔNG SỞ', innerX, cursorY);

    ctx.font = '600 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText(
      'CHƯƠNG TRÌNH HỌC TẬP & BỘ CÂU LỆNH THỰC CHIẾN',
      innerX + 175,
      cursorY - 2
    );

    // Right-side Role badge
    const roleBadgeText = `${prompt.role} · ${prompt.level}`;
    ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
    const roleBadgeMetrics = ctx.measureText(roleBadgeText);
    const badgeW = roleBadgeMetrics.width + 30;
    const badgeH = 34;
    const badgeX = margin + cardW - 36 - badgeW;
    const badgeY = cursorY - 24;

    fillRoundRect(
      badgeX,
      badgeY,
      badgeW,
      badgeH,
      17,
      isDark ? 'rgba(5, 150, 105, 0.22)' : 'rgba(5, 150, 105, 0.12)',
      isDark ? 'rgba(52, 211, 153, 0.4)' : 'rgba(5, 150, 105, 0.3)',
      1
    );
    ctx.fillStyle = isDark ? '#34d399' : '#047857';
    ctx.fillText(roleBadgeText, badgeX + 15, cursorY - 2);

    // Divider line
    cursorY += 24;
    ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(innerX, cursorY);
    ctx.lineTo(innerX + innerW, cursorY);
    ctx.stroke();

    // Title
    cursorY += 45;
    ctx.font = isLandscape
      ? 'bold 36px system-ui, -apple-system, sans-serif'
      : 'bold 44px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
    cursorY = drawWrappedText(
      prompt.title,
      innerX,
      cursorY,
      innerW,
      isLandscape ? 44 : 52,
      2
    );

    // Situation
    cursorY += 6;
    ctx.font = '500 18px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#475569';
    cursorY = drawWrappedText(
      `Tình huống: ${prompt.situation}`,
      innerX,
      cursorY,
      innerW,
      26,
      2
    );

    // Prompt Box (Darker aesthetic container)
    cursorY += 16;
    const promptBoxY = cursorY;
    const promptBoxH = isLandscape ? 220 : 520;

    fillRoundRect(
      innerX,
      promptBoxY,
      innerW,
      promptBoxH,
      20,
      isDark ? '#020617' : '#f1f5f9',
      isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
      1
    );

    // Prompt Header inside Box
    let pInsideY = promptBoxY + 36;
    ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
    ctx.fillText('CÂU LỆNH MẪU (BỘ BIẾN SỐ CHUẨN 4 BƯỚC):', innerX + 24, pInsideY);

    // AI Tools badges on top-right of box
    const toolsText = `Công cụ: ${prompt.recommendedTools.join(' · ')}`;
    ctx.font = '600 13px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    const toolsMetrics = ctx.measureText(toolsText);
    ctx.fillText(toolsText, innerX + innerW - 24 - toolsMetrics.width, pInsideY);

    // Actual Template Text inside Box
    pInsideY += 34;
    ctx.font = isLandscape
      ? '500 17px Consolas, Monaco, "Courier New", monospace'
      : '500 20px Consolas, Monaco, "Courier New", monospace';
    ctx.fillStyle = isDark ? '#e2e8f0' : '#1e293b';

    const compiledPrompt = getCompiledPromptText(prompt);
    drawWrappedText(
      compiledPrompt,
      innerX + 24,
      pInsideY,
      innerW - 48,
      isLandscape ? 28 : 34,
      isLandscape ? 5 : 12
    );

    // Footer section (below prompt box)
    cursorY = promptBoxY + promptBoxH + (isLandscape ? 30 : 50);

    // Security tip strip
    const tipText = `Lưu ý bảo mật: ${prompt.securityTip}`;
    fillRoundRect(
      innerX,
      cursorY,
      innerW,
      48,
      12,
      isDark ? 'rgba(15, 23, 42, 0.7)' : 'rgba(240, 253, 244, 0.8)',
      isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(245, 158, 11, 0.35)',
      1
    );
    ctx.font = '500 14px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#fbbf24' : '#b45309';
    ctx.fillText('🛡️ ' + tipText, innerX + 18, cursorY + 29);

    // Bottom Watermark & Canonical link
    const footerY = margin + cardH - 32;
    ctx.font = '600 15px system-ui, -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#64748b' : '#94a3b8';
    ctx.fillText('aicongso.vn · Chu trình 4 bước làm chủ AI công sở', innerX, footerY);

    const callToAction = 'Quét mã hoặc truy cập liên kết để điền biến trực tiếp →';
    const ctaMetrics = ctx.measureText(callToAction);
    ctx.fillStyle = isDark ? '#34d399' : '#059669';
    ctx.fillText(callToAction, innerX + innerW - ctaMetrics.width, footerY);
  }, [prompt, aspectRatio, cardTheme, getCompiledPromptText]);

  // Redraw whenever configuration changes
  useEffect(() => {
    if (isOpen && prompt) {
      const timer = setTimeout(() => {
        renderCardToCanvas();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, prompt, aspectRatio, cardTheme, renderCardToCanvas]);

  if (!isOpen || !prompt) return null;

  // Actions
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    if (onCopiedToast) {
      onCopiedToast('Đã sao chép liên kết rút gọn!');
    }
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleCopyCaption = () => {
    const text = getSocialCaptionText();
    navigator.clipboard.writeText(text);
    setCopiedCaption(true);
    if (onCopiedToast) {
      onCopiedToast('Đã sao chép nội dung bài đăng Zalo / Facebook!');
    }
    setTimeout(() => setCopiedCaption(false), 2200);
  };

  const handleDownloadPng = () => {
    if (!canvasRef.current || !prompt) return;
    setIsExporting(true);
    try {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      const safeTitle = prompt.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .slice(0, 40);
      link.download = `aicongso-${prompt.role}-${safeTitle}.png`;
      link.href = dataUrl;
      link.click();
      if (onCopiedToast) {
        onCopiedToast('Đã tải ảnh PNG sắc nét về máy!');
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImageToClipboard = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          if (typeof ClipboardItem !== 'undefined') {
            const item = new ClipboardItem({ 'image/png': blob });
            await navigator.clipboard.write([item]);
            setCopiedImage(true);
            if (onCopiedToast) {
              onCopiedToast('Đã sao chép ảnh vào Clipboard! Bạn có thể dán (Ctrl+V) vào Zalo/Facebook.');
            }
            setTimeout(() => setCopiedImage(false), 2400);
          } else {
            handleDownloadPng();
          }
        } catch {
          // Fallback to downloading image if clipboard write is blocked by browser policy
          handleDownloadPng();
        } finally {
          setIsExporting(false);
        }
      }, 'image/png');
    } catch {
      handleDownloadPng();
      setIsExporting(false);
    }
  };

  const handleNativeShare = async () => {
    if (!prompt || !navigator.share) return;
    try {
      if (canvasRef.current) {
        canvasRef.current.toBlob(async (blob) => {
          if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'prompt.png', { type: 'image/png' })] })) {
            const file = new File([blob], `aicongso-${prompt.id}.png`, { type: 'image/png' });
            await navigator.share({
              title: prompt.title,
              text: `Gợi ý Prompt thực chiến cho ${prompt.role}: ${prompt.title}`,
              url: shareUrl,
              files: [file],
            });
            return;
          }
          await navigator.share({
            title: prompt.title,
            text: `Gợi ý Prompt thực chiến cho ${prompt.role}: ${prompt.title}\n${prompt.situation}`,
            url: shareUrl,
          });
        });
      } else {
        await navigator.share({
          title: prompt.title,
          text: `Gợi ý Prompt thực chiến cho ${prompt.role}: ${prompt.title}`,
          url: shareUrl,
        });
      }
    } catch {
      // Ignore user cancellation
    }
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}&quote=${encodeURIComponent(`[AI Công Sở] ${prompt.title} — Câu lệnh thực chiến cho ${prompt.role}`)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer,width=620,height=560');
  };

  const handleShareZalo = () => {
    const zaloUrl = `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(zaloUrl, '_blank', 'noopener,noreferrer,width=620,height=560');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-prompt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3
                id="share-prompt-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                Chia sẻ Prompt &amp; Tạo ảnh PNG đẹp mắt
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tạo ảnh quote câu lệnh sắc nét hoặc sao chép link rút gọn cho Facebook, Zalo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left Canvas Preview, Right Controls */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Bản xem trước ảnh chất lượng cao (HD)
              </span>

              {/* Aspect Ratio Switcher */}
              <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAspectRatio('landscape')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors cursor-pointer ${
                    aspectRatio === 'landscape'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Khung ngang (16:9)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio('portrait')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 transition-colors cursor-pointer ${
                    aspectRatio === 'portrait'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Khung dọc (4:5)</span>
                </button>
              </div>
            </div>

            {/* Canvas Container with Scroll / Fit */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 p-2 flex items-center justify-center overflow-hidden min-h-[320px] max-h-[460px]">
              <canvas
                ref={canvasRef}
                className="max-h-[420px] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                style={{ imageRendering: 'auto' }}
              />
            </div>

            {/* Canvas Customizer Bar */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-slate-500 dark:text-slate-400">
                Độ phân giải thực: {aspectRatio === 'landscape' ? '1200 × 675 px' : '1080 × 1350 px'}
              </span>

              {/* Theme Toggle for Image */}
              <div className="inline-flex items-center gap-1">
                <span className="text-slate-500 mr-1">Tông màu ảnh:</span>
                <button
                  type="button"
                  onClick={() => setCardTheme('dark')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 font-semibold transition-colors cursor-pointer ${
                    cardTheme === 'dark'
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Moon className="w-3 h-3" />
                  <span>Đêm</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCardTheme('light')}
                  className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 font-semibold transition-colors cursor-pointer ${
                    cardTheme === 'light'
                      ? 'bg-slate-100 text-slate-900 border border-slate-300'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sun className="w-3 h-3" />
                  <span>Sáng</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Actions & Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Option 1: Copy Link */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Liên kết truy cập trực tiếp
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Mở thẳng Prompt
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shortDisplayLink}
                    className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-mono select-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white transition-all cursor-pointer shrink-0 ${
                      copiedLink
                        ? 'bg-emerald-600'
                        : 'bg-slate-900 dark:bg-emerald-600 hover:opacity-90'
                    }`}
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Chép link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Option 2: Image Export Buttons */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Xuất ảnh PNG kèm câu lệnh
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    disabled={isExporting}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2.5 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải ảnh PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyImageToClipboard}
                    disabled={isExporting}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500 px-3 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer ${
                      copiedImage ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : ''
                    }`}
                  >
                    {copiedImage ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Đã copy ảnh!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Chép ảnh (Ctrl+V)</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  💡 Sau khi bấm &apos;Chép ảnh&apos;, bạn có thể dán trực tiếp (Ctrl+V) vào khung chat Zalo, Facebook Messenger hoặc bài đăng.
                </p>
              </div>

              {/* Option 3: Quick Social Sharing */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Chia sẻ nhanh qua mạng xã hội
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleShareFacebook}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-blue-600/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-700 dark:text-blue-300 px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <MessageSquareShare className="w-3.5 h-3.5" />
                    <span>Facebook</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareZalo}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-700 dark:text-sky-300 px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Zalo</span>
                  </button>
                </div>

                {/* Copy Ready Caption */}
                <button
                  type="button"
                  onClick={handleCopyCaption}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  {copiedCaption ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Đã chép nội dung bài đăng Zalo / Facebook!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Sao chép bài đăng kèm hashtag</span>
                    </>
                  )}
                </button>

                {/* Mobile Web Share API */}
                {canShareApi && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white px-3 py-2 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Mở bảng chia sẻ hệ thống (Di động)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Bottom note */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Đảm bảo không lộ thông tin nhạy cảm
              </span>
              <span>AI Công Sở · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
