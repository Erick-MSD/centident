import React from 'react';

interface CentidentLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'compact';
  textColor?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const CentidentLogo: React.FC<CentidentLogoProps> = ({
  className = '',
  variant = 'full',
  textColor = 'dark',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 44, text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 56, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 72, text: 'text-3xl', sub: 'text-sm' },
  };

  const { icon: iconSize, text: textClass, sub: subClass } = sizeMap[size];

  const titleColor =
    textColor === 'light'
      ? 'text-white'
      : textColor === 'dark'
      ? 'text-[#173d6d]'
      : 'text-[#173d6d] dark:text-white';

  const subtitleColor =
    textColor === 'light'
      ? 'text-[#cee0ed]'
      : 'text-slate-500';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Dental Knight Badge SVG */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Centident Logo"
      >
        <defs>
          <linearGradient id="centidentBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#173d6d" />
            <stop offset="100%" stopColor="#0e2645" />
          </linearGradient>
          <linearGradient id="centidentOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f18641" />
            <stop offset="100%" stopColor="#e0691e" />
          </linearGradient>
        </defs>

        {/* Outer Circle Background */}
        <circle cx="100" cy="100" r="95" fill="url(#centidentBlueGrad)" stroke="#cee0ed" strokeWidth="3" />

        {/* Outer White Border Ring */}
        <circle cx="100" cy="100" r="92" stroke="#ffffff" strokeWidth="5" fill="none" opacity="0.95" />

        {/* Dynamic Orange Swoosh / Crescent */}
        <path
          d="M 28 85 C 38 42, 85 22, 140 28 C 105 20, 52 35, 34 80 C 22 108, 30 148, 48 165 C 32 142, 22 112, 28 85 Z"
          fill="url(#centidentOrangeGrad)"
        />

        {/* Dynamic Soft Blue Swoosh */}
        <path
          d="M 32 105 C 28 135, 48 168, 85 180 C 58 172, 38 152, 34 125 C 32 115, 33 105, 36 96 C 33 100, 32 103, 32 105 Z"
          fill="#3b82f6"
          opacity="0.9"
        />

        {/* Outer Top Orange Accent Arc */}
        <path
          d="M 55 38 C 85 24, 130 25, 160 40 C 130 30, 85 30, 60 42 Z"
          fill="#f18641"
        />

        {/* Dental Knight Mascot */}
        <g id="dental-knight" transform="translate(10, 5)">
          {/* Knight Helmet Top Crest / Point */}
          <path
            d="M 90 35 L 85 46 L 95 46 Z"
            fill="#ffffff"
          />

          {/* Knight Helmet Dome & Cheek Guards */}
          <path
            d="M 58 65 C 58 48, 72 38, 90 38 C 108 38, 122 48, 122 65 C 122 85, 125 105, 122 120 L 58 120 C 55 105, 58 85, 58 65 Z"
            fill="#ffffff"
          />

          {/* Helmet Ear Rivets / Bolts */}
          <circle cx="53" cy="85" r="4.5" fill="#ffffff" />
          <circle cx="127" cy="85" r="4.5" fill="#ffffff" />

          {/* Visor Area (Navy Inset) */}
          <path
            d="M 68 82 C 68 76, 112 76, 112 82 C 112 94, 68 94, 68 82 Z"
            fill="#173d6d"
          />

          {/* Visor Cute Eyes (Double Dots) */}
          <circle cx="85" cy="88" r="3" fill="#ffffff" />
          <circle cx="95" cy="88" r="3" fill="#ffffff" />

          {/* Dental Grille / Tooth Slots (6 teeth slots) */}
          <g fill="#173d6d">
            <rect x="63" y="100" width="5.5" height="15" rx="2.5" />
            <rect x="72" y="100" width="5.5" height="15" rx="2.5" />
            <rect x="81" y="100" width="5.5" height="15" rx="2.5" />
            <rect x="90" y="100" width="5.5" height="15" rx="2.5" />
            <rect x="99" y="100" width="5.5" height="15" rx="2.5" />
            <rect x="108" y="100" width="5.5" height="15" rx="2.5" />
          </g>

          {/* Mascot Torso */}
          <path
            d="M 76 128 L 104 128 L 108 165 L 72 165 Z"
            fill="#ffffff"
          />

          {/* Left Arm on Hip */}
          <path
            d="M 75 135 L 56 148 L 74 158"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="68" cy="158" r="7" fill="#ffffff" />

          {/* Feet / Boots */}
          <path
            d="M 58 174 C 58 167, 72 167, 76 167 L 76 174 C 76 177, 60 177, 58 174 Z"
            fill="#ffffff"
          />
          <path
            d="M 104 167 C 108 167, 122 167, 122 174 C 120 177, 104 177, 104 174 Z"
            fill="#ffffff"
          />

          {/* Right Arm holding Dental Tool */}
          <path
            d="M 105 135 L 138 123"
            stroke="#ffffff"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand Grip Sphere */}
          <circle cx="138" cy="123" r="6" fill="#ffffff" />

          {/* Dental Mirror / Probe Tool Shaft */}
          <line
            x1="140"
            y1="40"
            x2="140"
            y2="170"
            stroke="#ffffff"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Middle Grip Joint */}
          <circle cx="140" cy="123" r="6.5" fill="#ffffff" />

          {/* Top Dental Inspection Mirror Head */}
          <ellipse
            cx="135"
            cy="46"
            rx="12"
            ry="14"
            transform="rotate(-20 135 46)"
            stroke="#ffffff"
            strokeWidth="4"
            fill="none"
          />
          {/* Mirror Inner Reflection */}
          <ellipse
            cx="135"
            cy="46"
            rx="7"
            ry="9"
            transform="rotate(-20 135 46)"
            fill="#cee0ed"
            opacity="0.6"
          />
        </g>
      </svg>

      {/* Brand Typography */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1">
            <span
              className={`font-heading font-extrabold tracking-tight ${textClass} ${titleColor}`}
            >
              CENTI<span className="text-[#f18641]">DENT</span>
            </span>
          </div>
          {variant === 'full' && (
            <span
              className={`font-medium tracking-wider uppercase mt-0.5 ${subClass} ${subtitleColor}`}
            >
              Suministros Odontológicos
            </span>
          )}
        </div>
      )}
    </div>
  );
};
