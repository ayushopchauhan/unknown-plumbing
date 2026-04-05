/**
 * Reusable plumbing-themed SVG decorations.
 * Pipe dividers, water drops, wrench watermarks, hex bolt accents.
 */

/* ── Pipe Divider ──
 * Horizontal copper pipe with joints at the ends.
 * Place between sections for visual connection.
 */
export function PipeDivider({ variant = 'dark-to-light', className = '' }) {
  const isReversed = variant === 'light-to-dark'
  return (
    <div className={`relative w-full h-12 flex items-center overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Main pipe body */}
        <rect x="0" y="18" width="1440" height="12" rx="6" fill="url(#pipeGrad)" />

        {/* Pipe shine */}
        <rect x="0" y="19" width="1440" height="4" rx="2" fill="url(#pipeShine)" opacity="0.5" />

        {/* Left joint */}
        <rect x="80" y="12" width="24" height="24" rx="4" fill="url(#jointGrad)" stroke="#92400E" strokeWidth="1" />
        <rect x="84" y="13" width="16" height="6" rx="2" fill="#F59E0B" opacity="0.4" />

        {/* Center T-joint */}
        <rect x="708" y="10" width="24" height="28" rx="4" fill="url(#jointGrad)" stroke="#92400E" strokeWidth="1" />
        <rect x="715" y="0" width="10" height="14" rx="3" fill="url(#pipeGrad)" />
        <rect x="712" y="11" width="16" height="6" rx="2" fill="#F59E0B" opacity="0.4" />

        {/* Water drip from T-joint */}
        <ellipse cx="720" cy="44" rx="3" ry="4" fill="#0EA5E9" opacity="0.5">
          <animate attributeName="cy" values="38;46;38" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2.5s" repeatCount="indefinite" />
        </ellipse>

        {/* Right joint */}
        <rect x="1336" y="12" width="24" height="24" rx="4" fill="url(#jointGrad)" stroke="#92400E" strokeWidth="1" />
        <rect x="1340" y="13" width="16" height="6" rx="2" fill="#F59E0B" opacity="0.4" />

        {/* Hex bolts */}
        <circle cx="92" cy="24" r="4" fill="#92400E" />
        <circle cx="92" cy="24" r="2.5" fill="#B45309" />
        <circle cx="720" cy="24" r="4" fill="#92400E" />
        <circle cx="720" cy="24" r="2.5" fill="#B45309" />
        <circle cx="1348" cy="24" r="4" fill="#92400E" />
        <circle cx="1348" cy="24" r="2.5" fill="#B45309" />

        <defs>
          <linearGradient id="pipeGrad" x1="0" y1="18" x2="0" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="30%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="pipeShine" x1="0" y1="18" x2="0" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="jointGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

/* ── Water Drop Scatter ──
 * Scattered water droplets as a background pattern.
 * Use on dark sections for subtle visual texture.
 */
export function WaterDropPattern({ className = '' }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.08]">
        <defs>
          <pattern id="waterDrops" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Drop 1 */}
            <path d="M20 30 Q20 20 25 15 Q30 20 30 30 Q30 38 25 38 Q20 38 20 30Z" fill="#0EA5E9" />
            {/* Drop 2 */}
            <path d="M70 60 Q70 52 74 48 Q78 52 78 60 Q78 66 74 66 Q70 66 70 60Z" fill="#0EA5E9" />
            {/* Drop 3 */}
            <path d="M100 20 Q100 14 103 11 Q106 14 106 20 Q106 24 103 24 Q100 24 100 20Z" fill="#0EA5E9" />
            {/* Drop 4 */}
            <path d="M45 90 Q45 82 49 78 Q53 82 53 90 Q53 96 49 96 Q45 96 45 90Z" fill="#0EA5E9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waterDrops)" />
      </svg>
    </div>
  )
}

/* ── Wrench Watermark ──
 * Large faint wrench silhouette for section backgrounds.
 */
export function WrenchWatermark({ side = 'right', className = '' }) {
  const posClass = side === 'right'
    ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/3'
    : 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/3'

  return (
    <div className={`absolute ${posClass} pointer-events-none ${className}`}>
      <svg
        width="300"
        height="300"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-[0.07] rotate-[-15deg]"
      >
        {/* Wrench body */}
        <rect x="85" y="50" width="30" height="100" rx="4" fill="currentColor" />
        {/* Wrench head (top) */}
        <path d="M75 50 L125 50 L120 20 C115 10 85 10 80 20 Z" fill="currentColor" />
        <path d="M88 30 L112 30 L110 15 C107 8 93 8 90 15 Z" fill="none" stroke="currentColor" strokeWidth="3" />
        {/* Wrench jaw (bottom) */}
        <path d="M75 150 L125 150 L130 175 C125 190 75 190 70 175 Z" fill="currentColor" />
        <rect x="90" y="155" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  )
}

/* ── Hex Bolt Accent ──
 * Small decorative hexagonal bolt.
 */
export function HexBolt({ size = 12, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <polygon
        points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5"
        fill="url(#boltGrad)"
        stroke="#92400E"
        strokeWidth="1"
      />
      <circle cx="10" cy="10" r="4" fill="#B45309" />
      <circle cx="10" cy="10" r="2" fill="#D97706" />
      <defs>
        <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── Pipe Corner ──
 * L-shaped pipe for card corner decorations.
 */
export function PipeCorner({ position = 'top-left', size = 40, className = '' }) {
  const transforms = {
    'top-left': '',
    'top-right': 'scale(-1, 1)',
    'bottom-left': 'scale(1, -1)',
    'bottom-right': 'scale(-1, -1)',
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: transforms[position] }}
    >
      {/* Vertical pipe */}
      <rect x="2" y="0" width="8" height="22" rx="2" fill="url(#cornerPipe)" />
      {/* Horizontal pipe */}
      <rect x="6" y="14" width="34" height="8" rx="2" fill="url(#cornerPipe)" />
      {/* Elbow joint */}
      <rect x="0" y="12" width="14" height="14" rx="3" fill="url(#cornerJoint)" stroke="#92400E" strokeWidth="0.5" />
      {/* Bolt */}
      <circle cx="7" cy="19" r="3" fill="#92400E" />
      <circle cx="7" cy="19" r="1.5" fill="#D97706" />
      {/* Shine */}
      <rect x="3" y="1" width="3" height="12" rx="1" fill="#F59E0B" opacity="0.3" />
      <rect x="10" y="15" width="26" height="3" rx="1" fill="#F59E0B" opacity="0.3" />

      <defs>
        <linearGradient id="cornerPipe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="cornerJoint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
