import { useState, useCallback } from 'react'

export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const submitLead = useCallback(async (leadData) => {
    setIsSubmitting(true)
    setError(null)

    const endpoint = window.__LEAD_ENDPOINT__
    const slug = window.__SITE_SLUG__ || ''

    const payload = {
      slug,
      ...leadData,
      timestamp: new Date().toISOString(),
      pageUrl: window.location.href,
      referrer: document.referrer || 'direct',
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    }

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error('Failed to submit')
      }
      setIsSubmitted(true)
      return true
    } catch (err) {
      setError('Something went wrong. Please call us directly.')
      // Store locally as fallback
      try {
        const key = `lead_${Date.now()}`
        localStorage.setItem(key, JSON.stringify(payload))
      } catch (e) {
        // localStorage unavailable
      }
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const reset = useCallback(() => {
    setIsSubmitted(false)
    setError(null)
  }, [])

  return { submitLead, isSubmitting, isSubmitted, error, reset }
}
