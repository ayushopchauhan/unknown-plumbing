import config from '../siteConfig'
import { useCountUp } from '../hooks/useCountUp'

function safeNum(val, fallback = 0) {
  const n = Number(val)
  return isFinite(n) && n > 0 ? n : fallback
}

// Ensure we always have exactly 4 stats for visual balance
function getDisplayStats() {
  const stats = Array.isArray(config.stats) ? config.stats : []
  const credentials = config.credentials && typeof config.credentials === 'object' ? config.credentials : {}
  const result = [...stats]

  // If we have fewer than 4, fill from credentials
  if (result.length < 4) {
    const existing = new Set(result.map(s => (s.label || '').toLowerCase()))
    const fallbacks = [
      { number: credentials.yearsExperience, suffix: '+', label: 'Years Experience' },
      { number: credentials.jobsCompleted, suffix: '+', label: 'Jobs Completed' },
      { number: credentials.satisfactionRate, suffix: '%', label: 'Satisfaction Rate' },
      { number: parseInt(credentials.responseTime) || 0, suffix: 'min', label: 'Avg Response Time' },
      { number: credentials.reviewCount, suffix: '+', label: 'Happy Customers' },
    ]
    for (const fb of fallbacks) {
      if (result.length >= 4) break
      if (!fb.number || fb.number === 0) continue
      const key = fb.label.toLowerCase()
      if (existing.has(key)) continue
      // Check for similar labels
      const similar = [...existing].some(e =>
        (e.includes('year') && key.includes('year')) ||
        (e.includes('job') && key.includes('job')) ||
        (e.includes('satisfaction') && key.includes('satisfaction')) ||
        (e.includes('response') && key.includes('response')) ||
        (e.includes('customer') && key.includes('customer')) ||
        (e.includes('review') && key.includes('review'))
      )
      if (similar) continue
      existing.add(key)
      result.push(fb)
    }
  }

  // Filter out any stats with 0 or invalid numbers, normalize fields
  return result
    .filter(s => s && typeof s === 'object' && safeNum(s.number) > 0)
    .map(s => ({
      number: safeNum(s.number),
      suffix: typeof s.suffix === 'string' ? s.suffix : (s.suffix != null ? String(s.suffix) : ''),
      label: typeof s.label === 'string' ? s.label : (s.label != null ? String(s.label) : ''),
    }))
    .slice(0, 4)
}

function StatItem({ number, suffix, label }) {
  const { count, ref } = useCountUp(number, 2000)

  return (
    <div
      ref={ref}
      className="card-dark-gradient relative flex flex-col items-center rounded-xl py-6 md:py-8 lg:py-10 px-4"
    >
      <div className="flex items-baseline gap-0.5">
        <span
          className="text-blue-gradient text-4xl sm:text-5xl lg:text-6xl font-bold tabular-nums"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {count.toLocaleString()}
        </span>
        <span
          className="text-[var(--color-blue-light)] text-xl sm:text-2xl lg:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {suffix}
        </span>
      </div>
      <span
        className="mt-3 text-[var(--color-cream-dark)]/70 text-xs sm:text-sm tracking-wide uppercase"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </span>
      <div
        className="mt-2 w-8 h-0.5 rounded-full"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-blue), transparent)',
        }}
      />
    </div>
  )
}

export default function Stats() {
  const displayStats = getDisplayStats()

  // Hide if we have fewer than 2 meaningful stats
  if (displayStats.length < 2) return null

  // Determine grid columns based on stat count
  const gridCols = displayStats.length <= 2 ? 'grid-cols-2' :
                   displayStats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'

  return (
    <section
      className="relative py-10 md:py-14 overflow-hidden blueprint-grid grain-overlay"
      style={{ background: 'var(--color-deep)' }}
    >
      {/* Floating glow orbs */}
      <div className="glow-orb glow-orb-blue w-[300px] h-[300px]" style={{ top: '-80px', right: '10%' }} />
      <div className="glow-orb glow-orb-cyan w-[200px] h-[200px]" style={{ bottom: '-60px', left: '5%' }} />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="divider-blue mb-8 md:mb-10" />

        <div className={`grid ${gridCols} gap-3 md:gap-4 lg:gap-6 max-w-4xl mx-auto`}>
          {displayStats.map((stat) => (
            <StatItem
              key={stat.label}
              number={stat.number}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <div className="divider-blue mt-8 md:mt-10" />
      </div>
    </section>
  )
}
