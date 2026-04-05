import { useState } from 'react'
import config from '../siteConfig'
import { Droplets, AlertTriangle, Thermometer, Waves, Flame, Phone, X, Clock, DollarSign, ChevronRight } from 'lucide-react'
import { WaterDropPattern } from './PlumbingDecorations'

const iconMap = { Droplets, AlertTriangle, Thermometer, Waves, Flame }

const severityConfig = {
  critical: { color: '#DC2626', bg: 'rgba(220, 38, 38, 0.2)', label: 'Critical', border: 'rgba(220, 38, 38, 0.4)' },
  urgent: { color: '#EA580C', bg: 'rgba(234, 88, 12, 0.2)', label: 'Urgent', border: 'rgba(234, 88, 12, 0.4)' },
  moderate: { color: '#D97706', bg: 'rgba(217, 119, 6, 0.2)', label: 'Moderate', border: 'rgba(217, 119, 6, 0.4)' },
  low: { color: '#16A34A', bg: 'rgba(22, 163, 74, 0.2)', label: 'Low', border: 'rgba(22, 163, 74, 0.4)' },
}

const defaultSeverity = { color: '#D97706', bg: 'rgba(217, 119, 6, 0.2)', label: 'Unknown', border: 'rgba(217, 119, 6, 0.4)' }

function getSeverity(severity) {
  return severityConfig[severity] || defaultSeverity
}

function SeverityBadge({ severity }) {
  const cfg = getSeverity(severity)
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  )
}

function ScenarioCard({ scenario, isSelected, onSelect }) {
  const Icon = iconMap[scenario.icon] || AlertTriangle
  const sev = getSeverity(scenario.severity)

  return (
    <button
      onClick={() => onSelect(scenario.id)}
      className={`group relative w-full text-left p-4 sm:p-5 rounded-2xl card-dark transition-all duration-300 cursor-pointer ${
        isSelected ? 'border-[var(--color-blue)] shadow-[0_0_24px_rgba(14,165,233,0.15)]' : ''
      }`}
      style={isSelected ? { borderColor: 'var(--color-blue)' } : {}}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: sev.bg }}>
          <Icon className="w-5 h-5" style={{ color: sev.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[var(--color-cream)] font-semibold text-sm sm:text-base leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {scenario.name || scenario.title}
          </h4>
          <div className="mt-1.5"><SeverityBadge severity={scenario.severity} /></div>
        </div>
        <ChevronRight className={`w-4 h-4 text-[var(--color-cream)]/30 shrink-0 mt-1 transition-transform duration-300 ${isSelected ? 'rotate-90 text-[var(--color-blue)]' : 'group-hover:text-[var(--color-cream)]/50'}`} />
      </div>
    </button>
  )
}

function DetailPanel({ scenario, onClose }) {
  if (!scenario) return null
  const sev = getSeverity(scenario.severity)
  const Icon = iconMap[scenario.icon] || AlertTriangle
  const steps = scenario.immediateSteps || []

  return (
    <div className="rounded-2xl card-dark overflow-hidden" style={{ borderColor: 'rgba(14, 165, 233, 0.25)' }}>
      <div className="h-1.5" style={{ background: sev.color }} />
      <div className="p-5 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: sev.bg }}>
              <Icon className="w-6 h-6" style={{ color: sev.color }} />
            </div>
            <div>
              <h3 className="text-[var(--color-cream)] font-bold text-lg sm:text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                {scenario.name || scenario.title}
              </h3>
              <SeverityBadge severity={scenario.severity} />
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-[var(--color-cream)]/40 hover:text-[var(--color-cream)] hover:bg-white/5 transition-colors lg:hidden" aria-label="Close details">
            <X className="w-5 h-5" />
          </button>
        </div>

        {steps.length > 0 && (
          <div className="mb-6">
            <h4 className="text-[var(--color-blue)] font-bold text-sm uppercase tracking-wider mb-3" style={{ fontFamily: 'var(--font-heading)' }}>What to Do Right Now</h4>
            <ol className="space-y-2.5">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: sev.bg, color: sev.color }}>{i + 1}</span>
                  <span className="text-[var(--color-cream)]/80 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-6">
          {(scenario.responseTime || scenario.estimatedResponse) && (
            <div className="p-3.5 rounded-xl bg-[var(--color-deep)] border border-[var(--color-blue)]/10">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--color-blue)]" />
                <span className="text-[var(--color-cream)]/50 text-xs uppercase tracking-wider font-medium">Response</span>
              </div>
              <p className="text-[var(--color-cream)] font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{scenario.responseTime || scenario.estimatedResponse}</p>
            </div>
          )}
          {scenario.costRange && (
            <div className="p-3.5 rounded-xl bg-[var(--color-deep)] border border-[var(--color-blue)]/10">
              <div className="flex items-center gap-2 mb-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[var(--color-blue)]" />
                <span className="text-[var(--color-cream)]/50 text-xs uppercase tracking-wider font-medium">Estimate</span>
              </div>
              <p className="text-[var(--color-cream)] font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>{scenario.costRange}</p>
            </div>
          )}
        </div>

        {scenario.costOfDelay && (
          <div className="p-4 rounded-xl mb-6 flex items-start gap-3" style={{ background: getSeverity('critical').bg, border: `1px solid ${getSeverity('critical').border}` }}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#DC2626' }} />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#DC2626', fontFamily: 'var(--font-heading)' }}>Cost of Waiting</p>
              <p className="text-sm leading-relaxed" style={{ color: '#FCA5A5', fontFamily: 'var(--font-body)' }}>{scenario.costOfDelay}</p>
            </div>
          </div>
        )}

        <a href={`tel:${config.contact.emergencyPhone}`} className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-[var(--color-emergency)] hover:bg-red-700 text-white font-bold text-base transition-all duration-200 emergency-pulse" style={{ fontFamily: 'var(--font-heading)' }}>
          <Phone className="w-5 h-5" />
          Call Now for {scenario.name || scenario.title}
        </a>
      </div>
    </div>
  )
}

export default function EmergencyTriage() {
  const scenarios = config.emergencyTriage?.scenarios || []
  if (scenarios.length === 0) return null

  const [selectedId, setSelectedId] = useState(null)
  const selectedScenario = scenarios.find((s) => s.id === selectedId) || null

  const handleSelect = (id) => { setSelectedId(id === selectedId ? null : id) }
  const handleClose = () => { setSelectedId(null) }

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ background: 'var(--color-deep)' }}>
      <WaterDropPattern />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 reveal">
          <span className="inline-block text-[var(--color-blue)] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>Emergency Help</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-cream)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>What Is Your Emergency?</h2>
          <div className="w-16 h-1 bg-[var(--color-blue)] rounded-full mx-auto mb-4" />
          <p className="text-[var(--color-cream)]/60 max-w-xl mx-auto text-sm sm:text-base" style={{ fontFamily: 'var(--font-body)' }}>Select your situation below. We will tell you exactly what to do right now while we send help your way.</p>
        </div>

        <div className="lg:hidden">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 stagger-children">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="reveal w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.667rem)]">
                <ScenarioCard scenario={scenario} isSelected={selectedId === scenario.id} onSelect={handleSelect} />
              </div>
            ))}
          </div>
          {selectedScenario && (
            <div className="mt-4 sm:mt-6 reveal">
              <DetailPanel scenario={selectedScenario} onClose={handleClose} />
            </div>
          )}
        </div>

        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 space-y-3 stagger-children">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="reveal">
                <ScenarioCard scenario={scenario} isSelected={selectedId === scenario.id} onSelect={handleSelect} />
              </div>
            ))}
          </div>
          <div className="col-span-3">
            {selectedScenario ? (
              <div className="sticky top-24"><DetailPanel scenario={selectedScenario} onClose={handleClose} /></div>
            ) : (
              <div className="sticky top-24 flex items-center justify-center h-full min-h-[400px] rounded-2xl card-dark" style={{ borderStyle: 'dashed', borderColor: 'rgba(14, 165, 233, 0.2)' }}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--color-blue)]/10 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-[var(--color-blue)]/40" />
                  </div>
                  <p className="text-[var(--color-cream)]/40 text-base" style={{ fontFamily: 'var(--font-body)' }}>Select an emergency to see immediate instructions</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
