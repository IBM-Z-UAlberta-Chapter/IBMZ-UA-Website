import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CLUB_LOGO_PATH } from '../config';

interface ClubLogoMarkProps {
  size?: number;
  className?: string;
}

export function ClubLogoMark({ size = 36, className = '' }: ClubLogoMarkProps) {
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <span
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-sky/45 bg-navy-950 ${className}`}
    >
      {!imgFailed ? (
        <img
          src={CLUB_LOGO_PATH}
          alt="IBM Z UAlberta Chapter logo"
          width={size}
          height={size}
          onError={() => setImgFailed(true)}
          className="h-full w-full scale-[1.52] object-cover"
        />
      ) : (
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden="true">
          <rect width="64" height="64" fill="#11183C" />
          <path d="M12 32V12H52V32" stroke="#47DBD9" strokeWidth="3" fill="none" />
          <path d="M12 32V52H52V32" stroke="#78A9FF" strokeWidth="3" fill="none" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#8C7BFF" strokeWidth="3" />
          <line x1="20" y1="13" x2="20" y2="51" stroke="#4589FF" strokeWidth="3.5" />
          <line x1="32" y1="13" x2="32" y2="51" stroke="#E801A0" strokeWidth="3.5" />
          <line x1="44" y1="13" x2="44" y2="51" stroke="#8C7BFF" strokeWidth="3.5" />
        </svg>
      )}
    </span>
  );
}

interface TrussGridProps {
  className?: string;
  opacityClass?: string;
}

/**
 * Architectural background truss inspired by the chapter's 3-column stacked logo mark.
 * Balances cobalt/sky/indigo blue bars with a rhythmic pink accent bar per row.
 */
export function TrussGrid({ className = '', opacityClass = 'opacity-[0.14]' }: TrussGridProps) {
  return (
    <svg
      viewBox="0 0 420 560"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none ${opacityClass} ${className}`}
    >
      {[0, 1, 2, 3].map((row) => {
        const y = row * 140;
        const isEven = row % 2 === 0;
        const frameColor = isEven ? '#47DBD9' : '#78A9FF';
        const pinkCol = (row + 1) % 3;
        return (
          <g key={row} transform={`translate(0, ${y})`}>
            <rect
              x="6"
              y="6"
              width="408"
              height="128"
              stroke={frameColor}
              strokeWidth="4"
            />
            {[0, 1, 2].map((col) => {
              const x = 6 + col * 136;
              const barColor =
                col === pinkCol ? '#E801A0' : col % 2 === 0 ? '#4589FF' : '#8C7BFF';
              return (
                <g key={col} transform={`translate(${x}, 6)`}>
                  {/* Column frame divider */}
                  {col > 0 && (
                    <line x1="0" y1="0" x2="0" y2="128" stroke="#2C306D" strokeWidth="8" />
                  )}
                  {/* Diagonal K or Arrow brace */}
                  {isEven ? (
                    <polyline
                      points="116,12 22,64 116,116"
                      stroke="#47DBD9"
                      strokeWidth="4"
                      fill="none"
                    />
                  ) : (
                    <polyline
                      points="22,12 116,64 22,116"
                      stroke="#8C7BFF"
                      strokeWidth="4"
                      fill="none"
                    />
                  )}
                  {/* Vertical rack indicator bar */}
                  <rect
                    x="58"
                    y="10"
                    width="12"
                    height="108"
                    fill={barColor}
                    className="truss-bar-breathe"
                    style={{ animationDelay: `${(col * 1.9 + row * 0.8).toFixed(1)}s` }}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

interface TrussDividerProps {
  tone?: 'dark' | 'beige-top' | 'beige-bottom';
  className?: string;
}

export function TrussDivider({ tone = 'dark', className = '' }: TrussDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const bgClass =
    tone === 'beige-top'
      ? 'bg-navy-900 border-y border-navy-700/80'
      : tone === 'beige-bottom'
      ? 'bg-navy-950 border-y border-navy-700/80'
      : 'bg-navy-950/70 border-y border-navy-700/80';

  return (
    <div
      aria-hidden="true"
      className={`relative h-[68px] w-full overflow-hidden ${bgClass} ${className}`}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center px-5 lg:px-8">
        <svg
          viewBox="0 0 1140 60"
          fill="none"
          preserveAspectRatio="none"
          className="h-[52px] w-full"
        >
          {/* Outer top and bottom rails */}
          <line x1="0" y1="6" x2="1140" y2="6" stroke="#2C306D" strokeWidth="1.5" />
          <line x1="0" y1="54" x2="1140" y2="54" stroke="#2C306D" strokeWidth="1.5" />
          {/* Repeating truss bays across the width */}
          {Array.from({ length: 12 }).map((_, idx) => {
            const x = idx * 95;
            const braceColor =
              idx % 2 === 0 ? 'rgba(71,219,217,0.5)' : 'rgba(140,123,255,0.48)';
            return (
              <g key={idx} transform={`translate(${x}, 6)`}>
                <line x1="0" y1="0" x2="0" y2="48" stroke="#2C306D" strokeWidth="1.5" />
                {idx % 2 === 0 ? (
                  <polyline points="82,4 16,24 82,44" stroke={braceColor} strokeWidth="1.5" />
                ) : (
                  <polyline points="16,4 82,24 16,44" stroke={braceColor} strokeWidth="1.5" />
                )}
              </g>
            );
          })}
          {/* Sweeping pink signature bar once on scroll into view */}
          <motion.rect
            x="48"
            y="27"
            width="180"
            height="6"
            rx="1"
            fill="#E801A0"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -72 }}
            whileInView={{ opacity: 0.95, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>
    </div>
  );
}

interface TrussCornerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right';
  className?: string;
}

export function TrussCorner({ position = 'top-right', className = '' }: TrussCornerProps) {
  const rotation =
    position === 'top-left'
      ? 'rotate-180'
      : position === 'bottom-right'
      ? 'rotate-90'
      : '';

  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none h-7 w-7 shrink-0 ${rotation} ${className}`}
    >
      <path d="M2 2H34V34" stroke="#47DBD9" strokeOpacity="0.65" strokeWidth="1.5" />
      <polyline points="12,2 34,24" stroke="#8C7BFF" strokeOpacity="0.7" strokeWidth="1.5" />
      <rect x="26" y="6" width="4" height="14" fill="#E801A0" />
    </svg>
  );
}
