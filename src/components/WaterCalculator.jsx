import { useState, useMemo } from 'react'
import config from '../siteConfig'
import { Droplets, AlertTriangle, DollarSign, Phone } from 'lucide-react'
import { WaterDropPattern } from './PlumbingDecorations'

const AVG_HOUSEHOLD_ANNUAL_WASTE = 380

function safeNum(val, fallback = 0) {
  const n = Number(val)
  return isFinite(n) ? n : fallback
}

function safeStr(val, fallback = '') {
  if (val == null) return fallback
  if (typeof val === 'string') return val
  return fallback
}

export default function WaterCalculator() {
  const rawIssues = config.waterCalculator?.issues
  const issues = Array.isArray(rawIssues)
    ? rawIssues.filter(issue => issue && typeof issue === 'object')
    : []

  const [checked, setChecked] = useState(() => new Array(issues.length).fill(false))

  const toggleIssue = (index) => {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const { monthlyWaste, annualWaste, dailyGallons, checkedCount } = useMemo(() => {
    let monthly = 0
    let gallons = 0
    let count = 0
    issues.forEach((issue, i) => {
      if (checked[i]) {
        monthly += safeNum(issue.monthlyWaste)
        gallons += safeNum(issue.gallonsPerDay)
        count++
      }
    })
    return {
      monthlyWaste: monthly,
      annualWaste: monthly * 12,
      dailyGallons: gallons,
      checkedCount: count,
    }
  }, [checked, issues])

  if (issues.length === 0) return null

  const fillPercent = Math.min(100, (annualWaste / 2500) * 100)

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden" style={{ background: 'var(--color-deep)' }}>
      <WaterDropPattern />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14 reveal">
          <span
            className="inline-block text-[var(--color-blue)] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Hidden Costs
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-cream)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Is Your Home Wasting Water?
          </h2>
          <div className="w-16 h-1 bg-[var(--color-blue)] rounded-full mx-auto mb-4" />
          <p
            className="text-[var(--color-cream)]/60 max-w-xl mx-auto text-sm sm:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Check every issue that applies. See how much money is going down the drain every month.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: checkboxes */}
          <div className="reveal-left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
              {issues.map((issue, i) => {
                const name = safeStr(issue.name, `Issue ${i + 1}`)
                const monthlyWasteCost = safeNum(issue.monthlyWaste)
                const gallonsPerDay = safeNum(issue.gallonsPerDay)

                return (
                  <button
                    key={i}
                    onClick={() => toggleIssue(i)}
                    className={`group flex items-start gap-4 p-4 sm:p-5 rounded-2xl card-dark text-left transition-all duration-200 cursor-pointer ${
                      checked[i]
                        ? 'shadow-[0_0_20px_rgba(220,38,38,0.1)]'
                        : ''
                    }`}
                    style={checked[i] ? { borderColor: 'rgba(220, 38, 38, 0.35)', background: 'rgba(220, 38, 38, 0.06)' } : {}}
                  >
                    {/* Custom checkbox */}
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                        checked[i]
                          ? 'bg-[var(--color-emergency)] border-[var(--color-emergency)]'
                          : 'border-[var(--color-cream)]/20 group-hover:border-[var(--color-cream)]/40'
                      }`}
                    >
                      {checked[i] && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className={`font-semibold text-sm sm:text-base block transition-colors ${
                          checked[i] ? 'text-[var(--color-cream)]' : 'text-[var(--color-cream)]/70'
                        }`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {name}
                      </span>
                      <div className="flex items-center gap-3 mt-1.5">
                        {monthlyWasteCost > 0 && (
                          <span
                            className="text-[var(--color-emergency)] text-xs font-semibold"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            ${monthlyWasteCost}/mo
                          </span>
                        )}
                        {gallonsPerDay > 0 && (
                          <span
                            className="text-[var(--color-cream)]/40 text-xs"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {gallonsPerDay} gal/day
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: running total + visualization */}
          <div className="reveal-right">
            <div className="sticky top-24 p-6 sm:p-8 rounded-2xl card-dark" style={{ borderColor: 'rgba(14, 165, 233, 0.2)' }}>
              {/* Monthly loss */}
              <div className="text-center mb-6">
                <span
                  className="text-[var(--color-cream)]/50 text-xs uppercase tracking-wider block mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Your Home Is Losing
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`font-bold transition-all duration-500 ${
                      monthlyWaste > 0 ? 'text-[var(--color-emergency)] text-5xl sm:text-6xl' : 'text-[var(--color-cream)]/30 text-4xl sm:text-5xl'
                    }`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    ${monthlyWaste}
                  </span>
                  <span
                    className="text-[var(--color-cream)]/40 text-lg"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    /month
                  </span>
                </div>
              </div>

              {/* Annual loss with dramatic glow */}
              <div
                className={`text-center p-5 rounded-xl mb-6 transition-all duration-500 ${
                  annualWaste > 0
                    ? 'border border-[var(--color-emergency)]/30 shadow-[0_0_30px_rgba(220,38,38,0.12)]'
                    : 'bg-[var(--color-deep)] border border-[var(--color-blue)]/10'
                }`}
                style={annualWaste > 0 ? { background: 'rgba(220, 38, 38, 0.08)' } : {}}
              >
                <span
                  className="text-[var(--color-cream)]/50 text-xs uppercase tracking-wider block mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Annual Cost
                </span>
                <span
                  className={`font-bold text-3xl sm:text-4xl transition-colors duration-500 ${
                    annualWaste > 0 ? 'text-[var(--color-emergency)]' : 'text-[var(--color-cream)]/30'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)', textShadow: annualWaste > 0 ? '0 0 20px rgba(220, 38, 38, 0.3)' : 'none' }}
                >
                  ${annualWaste.toLocaleString()}
                </span>
                <span
                  className="text-[var(--color-cream)]/40 text-sm ml-1"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  per year
                </span>
              </div>

              {/* Money drain bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[var(--color-cream)]/50 text-xs uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Money Down the Drain
                  </span>
                  <span
                    className="text-[var(--color-cream)]/40 text-xs"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {checkedCount} of {issues.length} issues
                  </span>
                </div>
                <div className="h-4 rounded-full bg-[var(--color-deep)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${fillPercent}%`,
                      background: fillPercent > 60
                        ? 'linear-gradient(90deg, #DC2626, #EF4444)'
                        : fillPercent > 30
                          ? 'linear-gradient(90deg, #D97706, #F59E0B)'
                          : 'linear-gradient(90deg, #0EA5E9, #38BDF8)',
                    }}
                  />
                </div>
              </div>

              {/* Gallons wasted */}
              {dailyGallons > 0 && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-deep)] border border-[var(--color-blue)]/10 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-blue)]/10 flex items-center justify-center shrink-0">
                    <Droplets className="w-5 h-5 text-[var(--color-blue)]" />
                  </div>
                  <p
                    className="text-[var(--color-cream)]/70 text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    That is <span className="text-[var(--color-cream)] font-bold">{dailyGallons.toLocaleString()} gallons</span> of water wasted every day.
                  </p>
                </div>
              )}

              {/* Average comparison */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[var(--color-blue)]/8 border border-[var(--color-blue)]/15 mb-6">
                <AlertTriangle className="w-5 h-5 text-[var(--color-blue)] shrink-0 mt-0.5" />
                <p
                  className="text-[var(--color-cream)]/60 text-sm"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  The average American household wastes <span className="text-[var(--color-cream)] font-semibold">${AVG_HOUSEHOLD_ANNUAL_WASTE}/year</span> on preventable plumbing issues.
                </p>
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-bold text-base transition-all duration-200 hover:shadow-lg hover:shadow-[var(--color-accent)]/20"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <DollarSign className="w-5 h-5" />
                Stop the Leak. Schedule a Free Inspection.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
