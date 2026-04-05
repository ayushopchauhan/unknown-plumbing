import config from '../siteConfig'
import { Phone, Mail, MapPin, Facebook, ExternalLink } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

const socialIcons = {
  facebook: Facebook,
  google: ExternalLink,
  yelp: ExternalLink,
  nextdoor: ExternalLink,
}

export default function Footer() {
  const { business = {}, contact = {}, credentials = {} } = config
  const social = config.social && typeof config.social === 'object' ? config.social : {}
  const currentYear = new Date().getFullYear()

  const hasRealSocialLinks = Object.entries(social).some(
    ([, url]) => url && typeof url === 'string' && url.trim() && !url.includes('example.com') && !url.includes('placeholder')
  )

  return (
    <>
      <footer className="bg-[#070F1A] relative pt-0 pb-8 grain-overlay overflow-hidden">
        {/* Floating glow orb */}
        <div className="glow-orb glow-orb-blue w-[300px] h-[300px]" style={{ top: '20%', right: '5%' }} />

        {/* Blue divider at the very top */}
        <div className="divider-blue mb-16" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
            {/* Col 1: Brand */}
            <div>
              <h3
                className="text-lg font-bold text-[var(--color-cream)] mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {business.name || ''}
              </h3>
              <p
                className="text-sm text-[var(--color-cream)]/70 leading-relaxed mb-4"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {business.tagline || ''}
              </p>
              {/* Social Icons - only show if real URLs exist */}
              {hasRealSocialLinks && (
                <div className="flex gap-2">
                  {Object.entries(social)
                    .filter(([, url]) => url && typeof url === 'string' && url.trim() && !url.includes('example.com') && !url.includes('placeholder'))
                    .map(([platform, url]) => {
                      const Icon = socialIcons[platform] || ExternalLink
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-[var(--color-surface)] hover:bg-[var(--color-blue)]/20 flex items-center justify-center transition-all duration-300 group hover:scale-105"
                          aria-label={platform}
                        >
                          <Icon className="w-[18px] h-[18px] text-[var(--color-cream)]/50 group-hover:text-[var(--color-blue)] transition-colors" />
                        </a>
                      )
                    })}
                </div>
              )}
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4
                className="text-xs font-bold text-[var(--color-blue)] uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--color-cream)]/70 hover:text-[var(--color-blue)] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => document.dispatchEvent(new CustomEvent('openPrivacy'))}
                    className="text-sm text-[var(--color-cream)]/70 hover:text-[var(--color-blue)] transition-colors cursor-pointer bg-transparent border-none p-0"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <h4
                className="text-xs font-bold text-[var(--color-blue)] uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Contact
              </h4>
              <ul className="space-y-3">
                {contact.phone && (
                  <li>
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center gap-2 text-sm text-[var(--color-cream)]/70 hover:text-[var(--color-blue)] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <Phone className="w-4 h-4 text-[var(--color-blue)]/60" />
                      {contact.phoneDisplay || contact.phone}
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 text-sm text-[var(--color-cream)]/70 hover:text-[var(--color-blue)] transition-colors"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <Mail className="w-4 h-4 text-[var(--color-blue)]/60" />
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.fullAddress && (
                  <li className="flex items-start gap-2 text-sm text-[var(--color-cream)]/70" style={{ fontFamily: 'var(--font-body)' }}>
                    <MapPin className="w-4 h-4 text-[var(--color-blue)]/60 flex-shrink-0 mt-0.5" />
                    {contact.fullAddress}
                  </li>
                )}
              </ul>
            </div>

            {/* Col 4: Credentials */}
            <div className="border-l-2 border-[var(--color-blue)]/20 pl-4 lg:pl-6">
              <h4
                className="text-xs font-bold text-[var(--color-blue)] uppercase tracking-[0.2em] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Credentials
              </h4>
              <ul className="space-y-2.5 text-sm text-[var(--color-cream)]/70" style={{ fontFamily: 'var(--font-body)' }}>
                {business.licenseNumber ? <li>Licensed: {business.licenseNumber}</li> : <li>Fully Licensed &amp; Insured</li>}
                {business.insuranceAmount && <li>Insured: {business.insuranceAmount} General Liability</li>}
                {credentials.yearsExperience != null && <li>{credentials.yearsExperience}+ Years in Business</li>}
                {credentials.guaranteeDays
                  ? <li>{credentials.guaranteeDays}-Day Money-Back Guarantee</li>
                  : credentials.warrantyYears
                    ? <li>{credentials.warrantyYears}-Year Warranty on All Work</li>
                    : null
                }
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[var(--color-cream)]/8 mb-6" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p
              className="text-xs text-[var(--color-cream)]/40"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              &copy; {currentYear} {business.name || ''}. All rights reserved.
            </p>
            <p
              className="text-xs text-[var(--color-cream)]/30"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {business.licenseNumber ? `Licensed: ${business.licenseNumber} | ` : 'Licensed & '}Insured{business.insuranceAmount ? `: ${business.insuranceAmount} General Liability` : ''}
            </p>
          </div>
        </div>
      </footer>

    </>
  )
}
