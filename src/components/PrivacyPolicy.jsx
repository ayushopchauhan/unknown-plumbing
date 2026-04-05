import { useState, useEffect } from 'react'
import config from '../siteConfig'
import { X } from 'lucide-react'

export default function PrivacyPolicy() {
  const { business, contact } = config
  const [isOpen, setIsOpen] = useState(false)

  // Listen for openPrivacy custom event from Footer/CookieConsent
  useEffect(() => {
    function handleOpen() { setIsOpen(true) }
    document.addEventListener('openPrivacy', handleOpen)
    return () => document.removeEventListener('openPrivacy', handleOpen)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    function handleKey(e) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Privacy Policy"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[85vh] bg-[var(--color-deep)] border border-[var(--color-cream)]/10 rounded-2xl overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-cream)]/10 bg-[var(--color-surface)]">
          <h2
            className="text-lg font-bold text-[var(--color-cream)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Privacy Policy
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[var(--color-cream)]/10 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[var(--color-cream)]/60" />
          </button>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto px-6 py-6 space-y-5 text-sm text-[var(--color-cream)]/70 leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          <p className="text-xs text-[var(--color-cream)]/40">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Information We Collect
            </h3>
            <p>
              When you use our website or contact us for plumbing services, we may collect information
              you provide directly, including your name, email address, phone number, physical address,
              and details about your plumbing issue. We also collect standard usage data such as browser
              type, pages visited, and time spent on the site.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              How We Use Your Information
            </h3>
            <p>
              We use the information we collect to respond to your service requests, schedule appointments,
              provide estimates, and communicate about your plumbing project. We may also use it to improve
              our website experience and send occasional service reminders if you have opted in.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Information Sharing
            </h3>
            <p>
              We do not sell, rent, or trade your personal information to third parties. We may share
              your contact information with trusted service partners only as needed to complete your
              plumbing service (for example, a specialty contractor for sewer work). We may also disclose
              information when required by law.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Cookies
            </h3>
            <p>
              Our website uses cookies to improve your browsing experience and understand how visitors
              use our site. You can control cookies through your browser settings. Disabling cookies
              may affect some functionality of the website.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Data Security
            </h3>
            <p>
              We take reasonable measures to protect your personal information from unauthorized access,
              alteration, or disclosure. However, no method of electronic storage or transmission is
              completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Rights
            </h3>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time.
              To make a request, contact us at {contact.email} or call {contact.phoneDisplay}.
            </p>
          </section>

          <section>
            <h3 className="text-[var(--color-cream)] font-semibold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Contact
            </h3>
            <p>
              If you have any questions about this privacy policy, please contact {business.name} at{' '}
              {contact.email} or {contact.phoneDisplay}.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
