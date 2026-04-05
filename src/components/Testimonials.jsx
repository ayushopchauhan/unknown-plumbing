import config from '../siteConfig'
import { Star, Quote } from 'lucide-react'
import { WaterDropPattern } from './PlumbingDecorations'

// Color palette for avatar initials (deterministic by name)
const avatarColors = [
  '#0ea5e9', '#f97316', '#10b981', '#8b5cf6', '#ec4899',
  '#06b6d4', '#f59e0b', '#14b8a6', '#a855f7', '#ef4444',
]

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  if (typeof val === 'number') return String(val)
  return fallback
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.substring(0, 2).toUpperCase()
}

function getAvatarColor(name) {
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false
  if (url.includes('source.unsplash.com')) return false
  if (url.includes('placeholder')) return false
  if (url.includes('example.com')) return false
  return true
}

export default function Testimonials() {
  const credentials = config.credentials && typeof config.credentials === 'object' ? config.credentials : {}
  const rawTestimonials = Array.isArray(config.testimonials) ? config.testimonials : []

  // Filter: only show 4+ star reviews, deduplicate by name
  const seen = new Set()
  const filtered = rawTestimonials.filter(t => {
    if (!t || typeof t !== 'object') return false
    const rating = typeof t.rating === 'number' ? t.rating : 5
    if (rating < 4) return false
    const name = safeStr(t.name, '')
    if (seen.has(name)) return false
    seen.add(name)
    return true
  })

  // Hide section entirely if no valid testimonials
  if (filtered.length === 0) return null

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[var(--color-deep)] relative overflow-hidden grain-overlay">
      <WaterDropPattern />

      {/* Floating glow orbs */}
      <div className="glow-orb glow-orb-blue w-[350px] h-[350px]" style={{ top: '-50px', left: '10%' }} />
      <div className="glow-orb glow-orb-orange w-[250px] h-[250px]" style={{ bottom: '-40px', right: '5%' }} />

      {/* Background blue glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-blue)]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-blue)]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span
            className="reveal inline-block text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Reviews
          </span>
          <h2
            className="reveal text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-cream)] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What Our Customers Say
          </h2>
          <div className="reveal w-16 h-0.5 bg-[var(--color-blue)] mx-auto mb-8" />

          {/* Google Rating Badge */}
          <div className="reveal inline-flex items-center gap-2 px-5 py-2.5 rounded-full card-dark border-[var(--color-blue)]/25">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
              ))}
            </div>
            <span
              className="text-sm text-[var(--color-cream)] font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {credentials.googleRating || ''}
            </span>
            <span className="text-sm text-[var(--color-cream)]/60" style={{ fontFamily: 'var(--font-body)' }}>
              {credentials.reviewCount ? `from ${credentials.reviewCount} reviews on Google` : 'on Google'}
            </span>
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 md:hidden scrollbar-hide">
          {filtered.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>

        {/* Tablet + Desktop: flex wrap for centered last row */}
        <div className="hidden md:flex md:flex-wrap md:justify-center gap-6">
          {filtered.map((t, i) => (
            <div key={i} className="w-full md:w-[calc(50%-0.75rem)]">
              <TestimonialCard testimonial={t} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
  const quote = safeStr(testimonial.quote)
  const name = safeStr(testimonial.name, 'Customer')
  const detail = safeStr(testimonial.detail, 'Customer')
  const rating = typeof testimonial.rating === 'number' ? testimonial.rating : 5
  const image = testimonial.image
  const validImage = isValidImageUrl(image)
  const initials = getInitials(name)
  const bgColor = avatarColors[index % avatarColors.length]
  const starCount = Math.min(Math.max(Math.round(rating), 1), 5)

  return (
    <div
      className={`reveal group min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-center card-dark-gradient rounded-2xl p-6 md:p-8 border-l-2 border-l-[var(--color-blue)]/40 hover:border-l-[var(--color-blue)] transition-all duration-300`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Quote Icon */}
      <Quote className="w-10 h-10 mb-4" style={{ color: 'var(--color-blue)', opacity: 0.6 }} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(starCount)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]" />
        ))}
      </div>

      {/* Quote Text */}
      <p
        className="text-[var(--color-cream)]/80 text-sm md:text-base leading-relaxed mb-6"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        &ldquo;{quote}&rdquo;
      </p>

      {/* Customer Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-cream)]/8">
        {validImage ? (
          <img
            src={image}
            alt={name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-[var(--color-blue)]/30 shadow-[0_0_12px_rgba(14,165,233,0.2)]"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
        ) : null}
        <div
          className={`w-11 h-11 rounded-full ring-2 ring-[var(--color-blue)]/30 shadow-[0_0_12px_rgba(14,165,233,0.2)] items-center justify-center text-white font-bold text-sm shrink-0`}
          style={{
            backgroundColor: bgColor,
            display: validImage ? 'none' : 'flex',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {initials}
        </div>
        <div>
          <p
            className="text-[var(--color-cream)] font-semibold text-sm"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {name}
          </p>
          <p
            className="text-[var(--color-blue)] text-xs"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {detail}
          </p>
        </div>
      </div>
    </div>
  )
}
