import { useState, useEffect } from 'react'
import config from '../siteConfig'
import { Phone, Menu, X, MessageSquare } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Tools', href: '#tools' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

function getLogoSrc() {
  const url = config.business && config.business.logoUrl
  if (!url || typeof url !== 'string') return null
  if (url.includes('placeholder') || url.includes('example.com')) return null
  return url
}

function getBusinessName() {
  const name = config.business && config.business.name
  if (!name || typeof name !== 'string') return ''
  return name
}

function getInitials(name) {
  if (!name) return ''
  return name
    .split(/\s+/)
    .filter(w => w.length > 0)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
}

function LogoMark() {
  const logoSrc = getLogoSrc()
  const [imgError, setImgError] = useState(false)
  const businessName = getBusinessName()

  if (logoSrc && !imgError) {
    return (
      <img
        src={logoSrc}
        alt={`${businessName} logo`}
        className="w-8 h-8 lg:w-10 lg:h-10 object-contain rounded"
        onError={() => setImgError(true)}
      />
    )
  }

  const initials = getInitials(businessName)

  return (
    <span
      className="text-2xl lg:text-3xl shrink-0 leading-none"
      style={{
        fontFamily: "'Dancing Script', cursive",
        fontWeight: 700,
        color: 'var(--color-blue)',
      }}
    >
      {initials}
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const businessName = getBusinessName()
  const contact = config.contact || {}
  const phone = typeof contact.phone === 'string' ? contact.phone : ''
  const phoneDisplay = typeof contact.phoneDisplay === 'string' ? contact.phoneDisplay : phone
  const emergencyPhone = typeof contact.emergencyPhone === 'string' ? contact.emergencyPhone : phone
  const firstName = businessName.split(' ')[0] || businessName

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--color-deep)]/90 backdrop-blur-xl border-b border-[var(--color-blue)]/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo / Business Name */}
            <a
              href="#"
              className="flex items-center gap-3 shrink-0"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <LogoMark />
              <span className="text-[var(--color-cream)] font-bold text-lg tracking-tight hidden sm:block">
                {businessName}
              </span>
              <span className="text-[var(--color-cream)] font-bold text-lg tracking-tight sm:hidden">
                {firstName}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-cream-dark)] hover:text-[var(--color-blue)] transition-colors text-sm font-medium tracking-wide"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Phone CTA */}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-[var(--color-accent)]/25"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Phone className="w-4 h-4" />
                {phoneDisplay}
              </a>
            )}

            {/* Tablet Phone CTA */}
            <div className="hidden md:flex lg:hidden items-center gap-3">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)] text-white font-semibold text-sm"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-lg text-[var(--color-cream)] hover:bg-white/5 transition-colors"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--color-cream)] hover:bg-white/5 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-[var(--color-surface)]/95 backdrop-blur-xl border-t border-[var(--color-blue)]/10 px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-3 rounded-lg text-[var(--color-cream)] hover:bg-[var(--color-blue)]/10 hover:text-[var(--color-blue)] transition-colors text-base font-medium"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile menu phone link */}
            {phone && (
              <a
                href={`tel:${phone}`}
                onClick={handleLinkClick}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-accent)] font-semibold"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Phone className="w-5 h-5" />
                {phoneDisplay}
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-[var(--color-deep)]/95 backdrop-blur-xl border-t border-[var(--color-blue)]/15 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="flex gap-3">
            {emergencyPhone && (
              <a
                href={`tel:${emergencyPhone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--color-accent)] text-white font-bold text-sm emergency-pulse"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            )}
            <a
              href="#contact"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--color-blue)]/40 text-[var(--color-blue)] font-bold text-sm hover:bg-[var(--color-blue)]/10 transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <MessageSquare className="w-4 h-4" />
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
