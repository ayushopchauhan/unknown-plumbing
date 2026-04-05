import config from '../siteConfig'
import { Phone, ChevronDown, AlertTriangle } from 'lucide-react'
import { WaterDropPattern } from './PlumbingDecorations'

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

export default function Hero() {
  const hero = config.hero && typeof config.hero === 'object' ? config.hero : {}
  const contact = config.contact && typeof config.contact === 'object' ? config.contact : {}
  const business = config.business && typeof config.business === 'object' ? config.business : {}

  const headline = safeStr(hero.headline, 'Professional Plumbing Services')
  const subheadline = safeStr(hero.subheadline)
  const ctaText = safeStr(hero.ctaText, 'Get a Free Quote')
  const emergencyCtaText = safeStr(hero.emergencyCtaText, 'Emergency? Call Now')
  const urgencyBadge = safeStr(hero.urgencyBadge)
  const backgroundImage = safeStr(hero.backgroundImage)
  const emergencyPhone = safeStr(contact.emergencyPhone || contact.phone)

  // Split headline at the period for two-tone styling
  const parts = headline.split('.')
  const firstPart = parts[0] + '.'
  const secondPart = parts.slice(1).join('.').trim()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background Image with Rich Multi-Stop Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
      >
        {/* Rich gradient: deep at top for navbar, opens up in middle, fades to light at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(13, 17, 23, 0.92) 0%,
              rgba(13, 17, 23, 0.75) 20%,
              rgba(13, 17, 23, 0.60) 40%,
              rgba(13, 17, 23, 0.70) 65%,
              rgba(13, 17, 23, 0.85) 80%,
              var(--color-light) 100%
            )`,
          }}
        />
        {/* Subtle vignette from the edges */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13, 17, 23, 0.4) 100%)',
          }}
        />
      </div>

      {/* Floating Glow Orbs */}
      <div className="glow-orb glow-orb-blue" style={{ top: '10%', left: '5%', width: '300px', height: '300px' }} />
      <div className="glow-orb glow-orb-orange" style={{ bottom: '15%', right: '5%', width: '250px', height: '250px' }} />
      <div className="glow-orb glow-orb-cyan" style={{ top: '40%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px' }} />

      {/* Water Drop Pattern overlay */}
      <WaterDropPattern />

      {/* Blue Gradient Accent Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-blue)] to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32 md:pt-28 md:pb-36">
        {/* Frosted Glass Card */}
        <div className="card-glass rounded-2xl px-6 py-10 sm:px-10 sm:py-14 md:px-14 md:py-16" style={{ boxShadow: '0 0 30px rgba(14, 165, 233, 0.08), 0 0 60px rgba(14, 165, 233, 0.04)' }}>
          {/* Pre-heading: Emergency badge */}
          <div className="reveal mb-5 md:mb-6">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-blue)]/30 bg-[var(--color-blue)]/10 text-[var(--color-blue)] text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--color-blue)] animate-pulse" />
              24/7 Emergency Service
            </span>
            {/* Blue accent line under badge */}
            <div
              className="mx-auto mt-4 w-16 h-0.5 rounded-full"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--color-blue), transparent)',
              }}
            />
          </div>

          {/* Headline */}
          <h1
            className="reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-white">{firstPart}</span>
            {secondPart && (
              <>
                <br className="hidden sm:block" />
                {' '}
                <span className="text-blue-gradient">{secondPart}</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p
              className="reveal text-base sm:text-lg md:text-xl text-[var(--color-cream-dark)]/80 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {subheadline}
            </p>
          )}

          {/* Mobile Urgency Badge */}
          {urgencyBadge && (
            <div className="reveal md:hidden mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-emergency)]/10 border border-[var(--color-emergency)]/20">
                <AlertTriangle className="w-4 h-4 text-[var(--color-emergency)] shrink-0" />
                <span className="text-[var(--color-emergency)] text-xs font-medium">
                  {urgencyBadge}
                </span>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            {/* Get a Free Quote - Outline with blue */}
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-[var(--color-blue)]/40 text-[var(--color-blue)] hover:bg-[var(--color-blue)]/10 hover:border-[var(--color-blue)] font-bold text-base transition-all duration-200"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {ctaText}
            </a>

            {/* Emergency Call Now - Solid Orange */}
            {emergencyPhone && (
              <a
                href={`tel:${emergencyPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-bold text-base transition-all duration-200 emergency-pulse hover:shadow-lg hover:shadow-[var(--color-accent)]/25 btn-shimmer"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Phone className="w-5 h-5" />
                {emergencyCtaText}
              </a>
            )}
          </div>

          {/* Desktop Urgency Line */}
          {urgencyBadge && (
            <p className="hidden md:block reveal mt-6 text-sm text-[var(--color-cream-dark)]/50">
              {urgencyBadge}
            </p>
          )}
        </div>

        {/* Animated pulsing blue line below glass card */}
        <div
          className="mx-auto mt-4 h-[2px] rounded-full"
          style={{
            width: '120px',
            background: 'linear-gradient(90deg, transparent, var(--color-blue), transparent)',
            animation: 'pulse 2.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[var(--color-cream-dark)]/40 text-xs tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-[var(--color-blue)]/60 animate-bounce" />
      </div>

      {/* Bottom Gradient Fade to Light (TrustBar below is a light section) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: `linear-gradient(to top, var(--color-light) 0%, var(--color-light) 10%, transparent 100%)`,
        }}
      />
    </section>
  )
}
