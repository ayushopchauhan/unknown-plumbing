import config from '../siteConfig'
import { Siren, Waves, Flame, Wrench, Droplets, Construction } from 'lucide-react'
import { WrenchWatermark } from './PlumbingDecorations'

const iconMap = { Siren, Waves, Flame, Wrench, Droplets, Construction }

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function Services() {
  const services = Array.isArray(config.services) ? config.services : []

  if (services.length === 0) return null

  return (
    <section id="services" className="section-light grain-overlay py-16 md:py-20 lg:py-28 px-4 sm:px-6 relative overflow-hidden">
      {/* Glow orbs */}
      <div className="glow-orb glow-orb-blue w-[350px] h-[350px]" style={{ top: '5%', right: '0%' }} />
      <div className="glow-orb glow-orb-orange w-[250px] h-[250px]" style={{ bottom: '5%', left: '0%' }} />

      {/* Background decoration */}
      <WrenchWatermark side="right" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16 reveal">
          <p
            className="text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What We Do
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-light-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Our Services
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        {/* Service grid */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 lg:gap-6 stagger-children">
          {services.map((service, i) => {
            if (!service || typeof service !== 'object') return null
            const iconKey = safeStr(service.icon)
            const Icon = iconMap[iconKey] || null
            const name = safeStr(service.name, 'Service')
            const description = safeStr(service.description)
            const priceRange = safeStr(service.priceRange)
            const popular = Boolean(service.popular)

            return (
              <a
                key={i}
                href="#contact"
                className="reveal group relative block rounded-xl card-gradient-border p-6 lg:p-7 cursor-pointer w-full md:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-1rem)]"
              >
                {/* Popular badge */}
                {popular && (
                  <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-white">
                    Popular
                  </span>
                )}

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-blue-subtle)] icon-glow">
                  {Icon && <Icon className="h-6 w-6 text-[var(--color-blue)]" strokeWidth={1.5} />}
                </div>

                {/* Name */}
                <h3
                  className="text-lg font-semibold text-[var(--color-light-text)] mb-2 group-hover:text-[var(--color-blue)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-light-muted)] leading-relaxed mb-4">
                  {description}
                </p>

                {/* Price range */}
                {priceRange && (
                  <div className="flex items-center justify-between border-t border-[var(--color-light-border)] pt-4">
                    <span className="text-xs text-[var(--color-light-muted)] uppercase tracking-wider">
                      Starting from
                    </span>
                    <span
                      className="text-sm font-semibold text-[var(--color-blue)]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {priceRange}
                    </span>
                  </div>
                )}
              </a>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 lg:mt-14 reveal">
          <p className="text-[var(--color-light-muted)] text-sm mb-4">
            Not sure what you need? Describe your issue and we will recommend the right service.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] btn-shimmer"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get a Free Quote
          </a>
        </div>
      </div>
    </section>
  )
}
