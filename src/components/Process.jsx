import config from '../siteConfig'
import { Phone, Truck, Search, Wrench, CheckCircle } from 'lucide-react'
import { WrenchWatermark } from './PlumbingDecorations'

const iconMap = { Phone, Truck, Search, Wrench, CheckCircle }

export default function Process() {
  // Guard: process may be undefined or empty in GPT-generated config
  const steps = config.process || []
  if (steps.length === 0) return null

  const lastIndex = steps.length - 1

  return (
    <section id="process" className="py-16 md:py-20 lg:py-28 px-4 sm:px-6 bg-[var(--color-deep)] relative overflow-hidden blueprint-grid grain-overlay">
      <WrenchWatermark side="left" />

      {/* Glow orbs */}
      <div className="glow-orb glow-orb-blue w-[350px] h-[350px] top-[-100px] right-[-80px]" />
      <div className="glow-orb glow-orb-orange w-[200px] h-[200px] bottom-[-60px] left-[-40px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16 reveal">
          <p
            className="text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            How It Works
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-cream)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Simple. Transparent. Professional.
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        {/* Mobile + Tablet: vertical timeline */}
        <div className="lg:hidden stagger-children">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon]
            const isLast = i === lastIndex
            // Support both 'step' number field and index fallback
            const stepNumber = step.step ?? i + 1
            return (
              <div key={stepNumber} className="reveal flex gap-4 sm:gap-6">
                {/* Timeline column */}
                <div className="flex flex-col items-center shrink-0">
                  {/* Numbered circle with glow ring */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-blue)]/20 blur-md scale-150" />
                    <div
                      className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[var(--color-blue)] text-white font-bold text-base shadow-[0_0_24px_rgba(14,165,233,0.4)]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stepNumber}
                    </div>
                  </div>
                  {/* Connecting line */}
                  {!isLast && (
                    <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-blue)]/60 to-[var(--color-blue)]/20 my-2" />
                  )}
                </div>

                {/* Card */}
                <div className={`pb-8 ${isLast ? 'pb-0' : ''} flex-1`}>
                  <div className="rounded-xl card-dark p-5 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      {Icon && <Icon className="h-5 w-5 text-[var(--color-blue)]" strokeWidth={1.5} />}
                      <h3
                        className="text-base font-semibold text-[var(--color-cream)]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--color-cream)]/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Horizontal connecting line with blue dots at intersections */}
          <div className="relative mx-auto mb-10" style={{ maxWidth: `${steps.length * 200}px` }}>
            <div className="absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-[var(--color-blue)]/20 via-[var(--color-blue)]/60 to-[var(--color-blue)]/20" />
            {/* Decorative dots at each step position */}
            <div className="absolute top-6 left-[10%] right-[10%] flex justify-between -translate-y-1/2">
              {steps.map((step, i) => (
                <div
                  key={`dot-${step.step ?? i}`}
                  className="w-2 h-2 rounded-full bg-[var(--color-blue)]/40"
                />
              ))}
            </div>
          </div>

          {/* Steps row */}
          <div className="grid stagger-children" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, i) => {
              const Icon = iconMap[step.icon]
              const stepNumber = step.step ?? i + 1
              return (
                <div key={stepNumber} className="reveal flex flex-col items-center text-center px-3">
                  {/* Numbered circle with glow ring */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 rounded-full bg-[var(--color-blue)]/20 blur-md scale-150" />
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-blue)] text-white font-bold text-base shadow-[0_0_24px_rgba(14,165,233,0.4)]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {stepNumber}
                    </div>
                  </div>

                  {/* Icon */}
                  {Icon && (
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-blue)]/10">
                      <Icon className="h-5 w-5 text-[var(--color-blue)]" strokeWidth={1.5} />
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    className="text-base font-semibold text-[var(--color-cream)] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--color-cream)]/85 leading-relaxed max-w-[200px] mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16 reveal">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent-light)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] btn-shimmer"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            Start With Step 1
          </a>
        </div>
      </div>
    </section>
  )
}
