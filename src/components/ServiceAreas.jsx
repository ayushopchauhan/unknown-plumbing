import config from '../siteConfig'
import { MapPin, Clock } from 'lucide-react'

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function ServiceAreas() {
  const serviceAreas = Array.isArray(config.serviceAreas) ? config.serviceAreas : []

  if (serviceAreas.length === 0) return null

  return (
    <section id="areas" className="section-light py-20 md:py-28 relative overflow-hidden">
      {/* Floating glow orbs */}
      <div className="glow-orb glow-orb-blue w-[350px] h-[350px]" style={{ bottom: '-80px', right: '-5%' }} />
      <div className="glow-orb glow-orb-cyan w-[200px] h-[200px]" style={{ top: '10%', left: '-3%' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span
            className="reveal inline-block text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Coverage
          </span>
          <h2
            className="reveal text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-light-text)] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Areas We Serve
          </h2>
          <div className="reveal w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        {/* Areas Grid - flex wrap for centered last row */}
        <div className="flex flex-wrap justify-center gap-5 md:gap-6">
          {serviceAreas.map((area, i) => {
            if (!area || typeof area !== 'object') return null
            const name = safeStr(area.name, `Area ${i + 1}`)
            const description = safeStr(area.description)
            const responseTime = safeStr(area.responseTime)

            return (
              <div
                key={i}
                className="reveal group card-gradient-border rounded-2xl p-6 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Area Icon + Name */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-blue-subtle)] flex items-center justify-center icon-glow">
                    <MapPin className="w-5 h-5 text-[var(--color-blue)]" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-bold text-[var(--color-light-text)] group-hover:text-[var(--color-blue)] transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                {description && (
                  <p
                    className="text-[var(--color-light-muted)] text-sm leading-relaxed mb-4"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {description}
                  </p>
                )}

                {/* Response Time Pill */}
                {responseTime && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-blue)] text-white">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span
                      className="text-xs font-semibold text-white"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {responseTime} response
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
