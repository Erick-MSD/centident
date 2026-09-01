import React from 'react';
import centidentLogo from '../../assets/img/centident_logo.jpeg';

interface CentidentLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only' | 'compact';
  textColor?: 'dark' | 'light' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap: Record<
  NonNullable<CentidentLogoProps['size']>,
  { icon: number; text: string; sub: string }
> = {
  sm: { icon: 34, text: 'text-lg', sub: 'text-[9px]' },
  md: { icon: 44, text: 'text-xl', sub: 'text-[10px]' },
  lg: { icon: 56, text: 'text-2xl', sub: 'text-xs' },
  xl: { icon: 72, text: 'text-3xl', sub: 'text-sm' },
};

export const CentidentLogo: React.FC<CentidentLogoProps> = ({
  className = '',
  variant = 'full',
  textColor = 'dark',
  size = 'md',
}) => {
  const { icon: iconSize, text: textClass, sub: subClass } = sizeMap[size];

  let titleColor = 'text-[#173d6d]';
  if (textColor === 'light') {
    titleColor = 'text-white';
  } else if (textColor === 'auto') {
    titleColor = 'text-[#173d6d] dark:text-white';
  }

  let subtitleColor = 'text-slate-500';
  if (textColor === 'light') {
    subtitleColor = 'text-[#cee0ed]';
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={centidentLogo}
        alt="Centident Logo"
        width={iconSize}
        height={iconSize}
        className="flex-shrink-0 object-contain transition-transform duration-300 hover:scale-105 rounded-full"
        aria-label="Centident Logo"
      />

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
