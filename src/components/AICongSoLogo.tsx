import React from 'react';

interface AICongSoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'light' | 'dark' | 'auto';
}

export const AICongSoLogo: React.FC<AICongSoLogoProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  variant = 'auto',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Brand Icon: Bong bóng hội thoại có dấu tích + Chấm cam tia sáng ý tưởng */}
      <div className="relative shrink-0">
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}
          aria-hidden="true"
        >
          {/* Subtle glow filter */}
          <defs>
            <linearGradient id="bubbleGradient" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
            <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#F97316" floodOpacity="0.45" />
            </filter>
          </defs>

          {/* Speech Bubble Base */}
          <path
            d="M8 8C5.79086 8 4 9.79086 4 12V24C4 26.2091 5.79086 28 8 28H10V33.5C10 34.3333 11 34.8 11.7 34.3L19.3 28H32C34.2091 28 36 26.2091 36 24V12C36 9.79086 34.2091 8 32 8H8Z"
            fill="url(#bubbleGradient)"
          />

          {/* Checkmark: Việc được xong */}
          <path
            d="M13 18.5L17.5 23L27 13.5"
            stroke="white"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Chấm cam: Tia sáng ý tưởng (Orange Spark / Idea Dot) */}
          <circle
            cx="32.5"
            cy="7.5"
            r="4.5"
            fill="#F97316"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            filter="url(#orangeGlow)"
          />
        </svg>
      </div>

      {/* Brand Name Text: AI Công Sở */}
      <div className="flex flex-col">
        <div
          className={`font-display font-extrabold tracking-tight ${
            variant === 'dark'
              ? 'text-white'
              : variant === 'light'
              ? 'text-slate-900'
              : 'text-slate-900 dark:text-white'
          } ${textSizes[size]}`}
        >
          <span className="text-emerald-400 font-black">AI</span>{' '}
          <span className="font-extrabold">Công Sở</span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] tracking-tight -mt-0.5 ${
              variant === 'dark' ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            Dùng AI để xong việc sớm hơn
          </span>
        )}
      </div>
    </div>
  );
};
