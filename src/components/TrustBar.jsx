import config from '../siteConfig'
import { Shield, Star, CheckCircle, Award, Clock } from 'lucide-react'

const iconMap = {
  Shield,
  Star,
  CheckCircle,
  Award,
  Clock,
}

export default function TrustBar() {
  const rawItems = config.trustBar
  const items = Array.isArray(rawItems) ? rawItems.filter(item => item && typeof item === 'object') : []

  if (items.length === 0) return null

  return (
    <section
      className="relative z-10"
      style={{
        borderTop: '1px solid var(--color-light-border)',
        borderBottom: '1px solid var(--color-light-border)',
        background: '#FFFFFF',
      }}
    >
      {/* Desktop: Single row, evenly spaced */}
      <div className="hidden lg:flex max-w-7xl mx-auto relative z-10">
        {items.map((item, i) => {
          const iconKey = typeof item.icon === 'string' ? item.icon : ''
          const Icon = iconMap[iconKey] || Shield
          const label = typeof item.label === 'string' ? item.label : (item.label != null ? String(item.label) : '')
          return (
            <div
              key={i}
              className="flex-1 flex items-center justify-center gap-3 py-5"
              style={{
                borderRight: i < items.length - 1
                  ? '1px solid var(--color-light-border)'
                  : 'none',
              }}
            >
              <Icon className="w-5 h-5 shrink-0" style={{ color: 'var(--color-blue)' }} />
              <span
                className="text-sm font-semibold whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#111827',
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tablet: centered flex wrap */}
      <div className="hidden md:flex lg:hidden flex-wrap justify-center max-w-3xl mx-auto py-4 px-6 gap-y-3 relative z-10">
        {items.map((item, i) => {
          const iconKey = typeof item.icon === 'string' ? item.icon : ''
          const Icon = iconMap[iconKey] || Shield
          const label = typeof item.label === 'string' ? item.label : (item.label != null ? String(item.label) : '')
          return (
            <div
              key={i}
              className="flex items-center justify-center gap-2.5 py-2 px-5"
            >
              <Icon className="w-4.5 h-4.5 shrink-0" style={{ color: 'var(--color-blue)' }} />
              <span
                className="text-sm font-semibold"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: '#111827',
                }}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile: Horizontal scroll */}
      <div className="md:hidden overflow-x-auto scrollbar-hide relative z-10">
        <div className="flex items-center gap-0 min-w-max">
          {items.map((item, i) => {
            const iconKey = typeof item.icon === 'string' ? item.icon : ''
            const Icon = iconMap[iconKey] || Shield
            const label = typeof item.label === 'string' ? item.label : (item.label != null ? String(item.label) : '')
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-4 shrink-0"
                style={{
                  borderRight: i < items.length - 1
                    ? '1px solid var(--color-light-border)'
                    : 'none',
                }}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--color-blue)' }} />
                <span
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: '#111827',
                  }}
                >
                  {label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
