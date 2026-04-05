import { useEffect, useRef, useCallback } from 'react'

const SESSION_ID = crypto.randomUUID()
const SESSION_START = new Date().toISOString()

const trackingState = {
  sessionId: SESSION_ID,
  sessionStart: SESSION_START,
  sessionEnd: null,
  businessName: '',
  visitorDevice: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : /Tablet|iPad/i.test(navigator.userAgent) ? 'tablet' : 'desktop',
  referrer: document.referrer || 'direct',
  screenSize: `${window.innerWidth}x${window.innerHeight}`,
  sections: {},
  clicks: [],
  highlights: [],
  copies: [],
  tabSwitches: 0,
  tabAwayEvents: [],
  scrollDepthMax: 0,
  interactions: [],
  emailsCaptured: [],
  quizAnswers: null,
  calculatorUsage: { costEstimator: 0, waterCalculator: 0, emergencyTriage: 0, healthQuiz: 0, maintenancePlanner: 0 },
  chatMessages: 0,
  pageUrl: window.location.href,
}

let tabHiddenAt = null
let currentSection = null
let sectionEnterTime = null

function getCurrentSection() {
  const sections = document.querySelectorAll('[data-track]')
  let best = null
  let bestRatio = 0
  const viewportH = window.innerHeight

  sections.forEach((el) => {
    const rect = el.getBoundingClientRect()
    const visibleTop = Math.max(0, rect.top)
    const visibleBottom = Math.min(viewportH, rect.bottom)
    const visibleHeight = Math.max(0, visibleBottom - visibleTop)
    const ratio = visibleHeight / viewportH
    if (ratio > bestRatio) {
      bestRatio = ratio
      best = el.dataset.track
    }
  })
  return best
}

function recordSectionTime() {
  if (currentSection && sectionEnterTime) {
    const elapsed = Date.now() - sectionEnterTime
    if (!trackingState.sections[currentSection]) {
      trackingState.sections[currentSection] = { totalTime: 0, visits: 0 }
    }
    trackingState.sections[currentSection].totalTime += elapsed
    trackingState.sections[currentSection].visits += 1
  }
}

function updateSection() {
  const newSection = getCurrentSection()
  if (newSection !== currentSection) {
    recordSectionTime()
    currentSection = newSection
    sectionEnterTime = Date.now()
  }
}

function findParentSection(el) {
  let node = el
  while (node && node !== document.body) {
    if (node.dataset && node.dataset.track) return node.dataset.track
    node = node.parentElement
  }
  return 'unknown'
}

function buildReport() {
  recordSectionTime()
  trackingState.sessionEnd = new Date().toISOString()

  const startDate = new Date(trackingState.sessionStart)
  const endDate = new Date(trackingState.sessionEnd)
  const durationMs = endDate - startDate
  const durationMin = Math.floor(durationMs / 60000)
  const durationSec = Math.floor((durationMs % 60000) / 1000)

  let report = `SESSION REPORT\n`
  report += `${'='.repeat(50)}\n\n`
  report += `Business: ${trackingState.businessName || 'Unknown'}\n`
  report += `Session ID: ${trackingState.sessionId}\n`
  report += `Page: ${trackingState.pageUrl}\n`
  report += `Device: ${trackingState.visitorDevice} (${trackingState.screenSize})\n`
  report += `Referrer: ${trackingState.referrer}\n`
  report += `Started: ${startDate.toLocaleString()}\n`
  report += `Ended: ${endDate.toLocaleString()}\n`
  report += `Duration: ${durationMin}m ${durationSec}s\n`
  report += `Max Scroll Depth: ${trackingState.scrollDepthMax}%\n\n`

  report += `SECTION TIME BREAKDOWN\n`
  report += `${'-'.repeat(50)}\n`
  const sortedSections = Object.entries(trackingState.sections).sort(([, a], [, b]) => b.totalTime - a.totalTime)
  if (sortedSections.length === 0) {
    report += `No section data recorded.\n`
  } else {
    const totalSectionTime = sortedSections.reduce((sum, [, s]) => sum + s.totalTime, 0)
    sortedSections.forEach(([name, data]) => {
      const sec = Math.round(data.totalTime / 1000)
      const pct = totalSectionTime > 0 ? Math.round((data.totalTime / totalSectionTime) * 100) : 0
      const bar = '#'.repeat(Math.max(1, Math.round(pct / 5)))
      report += `${name.padEnd(25)} ${String(sec).padStart(4)}s  ${String(pct).padStart(3)}% ${bar}  (${data.visits} visits)\n`
    })
  }

  report += `\nCLICKS (${trackingState.clicks.length})\n`
  report += `${'-'.repeat(50)}\n`
  trackingState.clicks.slice(-20).forEach((c) => {
    report += `[${new Date(c.timestamp).toLocaleTimeString()}] ${c.sectionId}: ${c.target}\n`
  })

  report += `\nEMAILS CAPTURED (${trackingState.emailsCaptured.length})\n`
  report += `${'-'.repeat(50)}\n`
  trackingState.emailsCaptured.forEach((e) => {
    report += `${e.email} (from ${e.source})\n`
  })

  report += `\nINTERACTIVE TOOL USAGE\n`
  report += `${'-'.repeat(50)}\n`
  Object.entries(trackingState.calculatorUsage).forEach(([tool, count]) => {
    report += `${tool}: ${count} interactions\n`
  })

  report += `\nCHAT MESSAGES: ${trackingState.chatMessages}\n`

  if (trackingState.quizAnswers) {
    report += `\nHEALTH QUIZ ANSWERS\n`
    report += `${'-'.repeat(50)}\n`
    Object.entries(trackingState.quizAnswers).forEach(([q, a]) => {
      report += `${q}: ${a}\n`
    })
  }

  return report
}

function sendReport() {
  const report = buildReport()
  const payload = JSON.stringify({
    slug: window.__SITE_SLUG__ || '',
    sessionId: trackingState.sessionId,
    businessName: trackingState.businessName,
    report,
    raw: trackingState,
  })

  const endpoint = window.__TRACKING_ENDPOINT__
  if (endpoint) {
    navigator.sendBeacon(endpoint, payload)
  }

  try {
    localStorage.setItem(`session_report_${trackingState.sessionId}`, payload)
  } catch (e) {
    // localStorage unavailable
  }
}

export function useTracking(businessName = 'Apex Plumbing Co.') {
  const hasSentReport = useRef(false)

  useEffect(() => {
    trackingState.businessName = businessName

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0
      if (pct > trackingState.scrollDepthMax) trackingState.scrollDepthMax = pct
      updateSection()
    }

    const handleClick = (e) => {
      const target = e.target.closest('button, a, input, [role="button"]')
      if (!target) return
      const label = target.textContent?.trim().slice(0, 60) || target.getAttribute('aria-label') || target.tagName
      const sectionId = findParentSection(target)
      trackingState.clicks.push({ target: label, sectionId, timestamp: Date.now() })
    }

    const handleSelectionChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed) return
      const text = sel.toString().trim()
      if (text.length < 3) return
      const last = trackingState.highlights[trackingState.highlights.length - 1]
      if (last && last.text === text && Date.now() - last.timestamp < 2000) return
      const anchor = sel.anchorNode?.parentElement
      const sectionId = anchor ? findParentSection(anchor) : 'unknown'
      trackingState.highlights.push({ text, sectionId, timestamp: Date.now() })
    }

    const handleCopy = () => {
      const text = window.getSelection()?.toString().trim()
      if (!text) return
      const anchor = window.getSelection()?.anchorNode?.parentElement
      const sectionId = anchor ? findParentSection(anchor) : 'unknown'
      trackingState.copies.push({ text, sectionId, timestamp: Date.now() })
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        tabHiddenAt = Date.now()
        trackingState.tabSwitches++
        trackingState.tabAwayEvents.push({ awayAt: Date.now(), returnedAt: null, awayDuration: null })
      } else if (tabHiddenAt) {
        const awayDuration = Date.now() - tabHiddenAt
        const lastEvent = trackingState.tabAwayEvents[trackingState.tabAwayEvents.length - 1]
        if (lastEvent && !lastEvent.returnedAt) {
          lastEvent.returnedAt = Date.now()
          lastEvent.awayDuration = awayDuration
        }
        tabHiddenAt = null
      }
    }

    const handlePageHide = () => {
      if (hasSentReport.current) return
      const sessionDuration = Date.now() - new Date(SESSION_START).getTime()
      if (sessionDuration < 10000) return
      hasSentReport.current = true
      sendReport()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick, true)
    document.addEventListener('selectionchange', handleSelectionChange)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pagehide', handlePageHide)
    updateSection()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('selectionchange', handleSelectionChange)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [businessName])

  const trackEmail = useCallback((email, source) => {
    trackingState.emailsCaptured.push({ email, source, timestamp: Date.now() })
  }, [])

  const trackQuiz = useCallback((answers) => {
    trackingState.quizAnswers = answers
  }, [])

  const trackCalculator = useCallback((type) => {
    if (type in trackingState.calculatorUsage) {
      trackingState.calculatorUsage[type]++
    }
  }, [])

  const trackChat = useCallback(() => {
    trackingState.chatMessages++
  }, [])

  return { trackEmail, trackQuiz, trackCalculator, trackChat, sessionId: SESSION_ID }
}

export function setTrackingEndpoint(url) {
  window.__TRACKING_ENDPOINT__ = url
}
