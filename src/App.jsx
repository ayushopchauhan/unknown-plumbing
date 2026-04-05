import { createContext, useContext, lazy, Suspense } from 'react'
import { useReveal } from './hooks/useReveal'
import { useTracking, setTrackingEndpoint } from './hooks/useTracking'
import config from './siteConfig'
import { PipeDivider } from './components/PlumbingDecorations'

// Above-fold: loaded immediately (critical path)
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Stats from './components/Stats'
import DynamicFavicon from './components/DynamicFavicon'

// Below-fold: lazy-loaded for faster initial paint
// Section order based on conversion funnel psychology:
// Trust -> Value Demo -> Reciprocity -> Loss Aversion -> Commitment -> Social Proof -> Conversion
const Services = lazy(() => import('./components/Services'))
const EmergencyTriage = lazy(() => import('./components/EmergencyTriage'))
const CostEstimator = lazy(() => import('./components/CostEstimator'))
const WaterCalculator = lazy(() => import('./components/WaterCalculator'))
const About = lazy(() => import('./components/About'))
const Process = lazy(() => import('./components/Process'))
const HealthQuiz = lazy(() => import('./components/HealthQuiz'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const MaintenancePlanner = lazy(() => import('./components/MaintenancePlanner'))
const ServiceAreas = lazy(() => import('./components/ServiceAreas'))
const FAQ = lazy(() => import('./components/FAQ'))
const Contact = lazy(() => import('./components/Contact'))
const Chatbot = lazy(() => import('./components/Chatbot'))
const Footer = lazy(() => import('./components/Footer'))
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))
const CookieConsent = lazy(() => import('./components/CookieConsent'))

// Configure endpoints from siteConfig
if (config.trackingEndpoint) setTrackingEndpoint(config.trackingEndpoint)
if (config.leadEndpoint) window.__LEAD_ENDPOINT__ = config.leadEndpoint
window.__SITE_SLUG__ = config.slug || window.location.hostname.replace('.vercel.app', '').replace('.netlify.app', '')

// Tracking context for child components
const TrackingContext = createContext(null)
export function useTrackingContext() {
  return useContext(TrackingContext)
}

const businessName = (config.business && typeof config.business.name === 'string')
  ? config.business.name
  : ''

export default function App() {
  useReveal()
  const { trackEmail, trackQuiz, trackCalculator, trackChat, sessionId } = useTracking(businessName)

  return (
    <TrackingContext.Provider value={{ trackEmail, trackQuiz, trackCalculator, trackChat, sessionId }}>
      <DynamicFavicon />
      <Navbar />

      {/* PHASE 1: ATTENTION CAPTURE */}
      <div data-track="hero"><Hero /></div>
      <div data-track="trust-bar"><TrustBar /></div>

      {/* Pipe divider: light to dark */}
      <div style={{ background: 'var(--color-deep)' }}><PipeDivider /></div>

      <div data-track="stats"><Stats /></div>

      <Suspense fallback={null}>
        {/* PHASE 2: VALUE DEMONSTRATION */}
        <div data-track="services"><Services /></div>

        {/* Pipe divider: light to dark */}
        <div style={{ background: 'var(--color-deep)' }}><PipeDivider /></div>

        {/* PHASE 3: RECIPROCITY TRIGGERS (free tools) */}
        <div data-track="emergency-triage"><EmergencyTriage /></div>
        <div data-track="cost-estimator"><CostEstimator /></div>

        {/* PHASE 4: LOSS AVERSION ACTIVATION */}
        <div data-track="water-calculator"><WaterCalculator /></div>

        {/* PHASE 5: PERSON CERTAINTY (Belfort Three Tens) */}
        <div data-track="about"><About /></div>

        {/* Pipe divider: light to dark */}
        <div style={{ background: 'var(--color-deep)' }}><PipeDivider /></div>

        <div data-track="process"><Process /></div>

        {/* PHASE 6: COMMITMENT ESCALATION */}
        <div data-track="health-quiz"><HealthQuiz /></div>

        {/* Pipe divider: light to dark */}
        <div style={{ background: 'var(--color-deep)' }}><PipeDivider /></div>

        {/* PHASE 7: SOCIAL PROOF */}
        <div data-track="testimonials"><Testimonials /></div>

        {/* PHASE 8: ONGOING RELATIONSHIP FRAME */}
        <div data-track="maintenance-planner"><MaintenancePlanner /></div>

        {/* PHASE 9: REDUCE UNCERTAINTY */}
        <div data-track="service-areas"><ServiceAreas /></div>
        <div data-track="faq"><FAQ /></div>

        {/* Pipe divider: light to dark */}
        <div style={{ background: 'var(--color-deep)' }}><PipeDivider /></div>

        {/* PHASE 10: CONVERSION */}
        <div data-track="contact"><Contact /></div>

        {/* ALWAYS AVAILABLE */}
        <Chatbot />
        <div data-track="footer"><Footer /></div>
        <PrivacyPolicy />
        <CookieConsent />
      </Suspense>
    </TrackingContext.Provider>
  )
}
