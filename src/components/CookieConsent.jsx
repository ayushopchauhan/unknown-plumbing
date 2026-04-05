import { useState, useEffect } from 'react'

const STORAGE_KEY = 'plumber_cookie_consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (!consent) {
        const showTimer = setTimeout(() => setVisible(true), 1500)
        const autoTimer = setTimeout(() => {
          try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch {}
          setVisible(false)
        }, 8000)
        return () => { clearTimeout(showTimer); clearTimeout(autoTimer) }
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      // silent fail
    }
    setVisible(false)
  }

  function decline() {
    try {
      localStorage.setItem(STORAGE_KEY, 'declined')
    } catch {
      // silent fail
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[90] p-4 transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border-dark)] rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(0,0,0,0.3)]">
        <p
          className="text-sm text-[var(--color-cream)]/70 flex-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          We use cookies to improve your experience on our site.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-[0_2px_8px_rgba(249,115,22,0.3)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Accept
          </button>
          <button
            onClick={decline}
            className="px-4 py-2 rounded-lg bg-transparent border border-[var(--color-cream)]/20 hover:border-[var(--color-blue)]/50 text-[var(--color-cream)]/60 hover:text-[var(--color-cream)] text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
