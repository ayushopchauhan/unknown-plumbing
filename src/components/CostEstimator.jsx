import { useState, useMemo } from 'react'
import config from '../siteConfig'

const complexityLabels = ['Simple', 'Standard', 'Complex']

function DonutChart({ total, segments }) {
  const radius = 70
  const stroke = 14
  const circumference = 2 * Math.PI * radius
  const center = radius + stroke

  let accumulated = 0
  const segmentArcs = segments.map((seg) => {
    const length = (seg.pct / 100) * circumference
    const gap = 4
    const offset = accumulated * circumference / 100
    accumulated += seg.pct
    return {
      ...seg,
      dasharray: `${Math.max(0, length - gap)} ${circumference - Math.max(0, length - gap)}`,
      dashoffset: -offset,
    }
  })

  return (
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
      <svg viewBox={`0 0 ${center * 2} ${center * 2}`} className="w-full h-full -rotate-90">
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--color-light-border)"
          strokeWidth={stroke}
        />
        {/* Segments */}
        {segmentArcs.map((seg, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={seg.dasharray}
            strokeDashoffset={seg.dashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        ))}
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-[var(--color-light-muted)] text-xs uppercase tracking-wider mb-1"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Estimate
        </span>
        <span
          className="text-blue-gradient text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default function CostEstimator() {
  const services = config.costEstimator?.services || []
  if (services.length === 0) return null
  return <CostEstimatorInner services={services} />
}

function CostEstimatorInner({ services }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [complexity, setComplexity] = useState(2)

  const selected = services[selectedIndex] || services[0]

  const estimate = useMemo(() => {
    const base = selected?.basePrice ?? 0
    const max = selected?.maxPrice ?? base
    return Math.round(base + (max - base) * ((complexity - 1) / 2))
  }, [selected, complexity])

  const nationalAvg = useMemo(() => Math.round(estimate * 1.2), [estimate])

  const laborAmount = Math.round(estimate * 0.6)
  const partsAmount = Math.round(estimate * 0.25)
  const warrantyAmount = estimate - laborAmount - partsAmount

  const segments = [
    { label: 'Labor', pct: 60, color: '#0EA5E9', amount: laborAmount },
    { label: 'Parts', pct: 25, color: '#38BDF8', amount: partsAmount },
    { label: 'Warranty', pct: 15, color: '#0284C7', amount: warrantyAmount },
  ]

  // factors may not exist in GPT-generated config; guard it
  const factors = selected?.factors || []

  return (
    <section className="section-light py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-14 reveal">
          <span
            className="inline-block text-[var(--color-blue)] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Pricing
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-light-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Cost <span className="text-blue-gradient">Estimator</span>
          </h2>
          <div className="w-16 h-1 bg-[var(--color-blue)] rounded-full mx-auto mb-4" />
          <p
            className="text-[var(--color-light-muted)] max-w-xl mx-auto text-sm sm:text-base"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Get an instant ballpark for your project. Select a service and adjust complexity to see your estimate.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: selector + slider */}
          <div className="reveal-left">
            {/* Service selector grid */}
            <div className="mb-8">
              <h3
                className="text-[var(--color-blue)] text-xs font-bold uppercase tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Select a Service
              </h3>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {services.map((svc, i) => (
                  <button
                    key={svc.name || i}
                    onClick={() => setSelectedIndex(i)}
                    className={`px-3.5 py-3 sm:py-3.5 rounded-xl text-left text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selectedIndex === i
                        ? 'card-light text-[var(--color-blue)]'
                        : 'card-light text-[var(--color-light-muted)] hover:text-[var(--color-light-text)]'
                    }`}
                    style={selectedIndex === i ? { borderColor: 'var(--color-blue)', fontFamily: 'var(--font-heading)' } : { fontFamily: 'var(--font-heading)' }}
                  >
                    {svc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity slider */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-[var(--color-blue)] text-xs font-bold uppercase tracking-wider"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Job Complexity
                </h3>
                <span
                  className="text-[var(--color-blue)] text-sm font-semibold px-3 py-1 rounded-full bg-[var(--color-blue-subtle)]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {complexityLabels[complexity - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="1"
                value={complexity}
                onChange={(e) => setComplexity(Number(e.target.value))}
                className="plumber-slider-light"
                aria-label="Job complexity"
              />
              <div
                className="flex justify-between mt-2 text-xs text-[var(--color-light-muted)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>Simple</span>
                <span>Standard</span>
                <span>Complex</span>
              </div>
            </div>

            {/* Price factors - only shown if factors exist */}
            {factors.length > 0 && (
              <div className="p-5 rounded-2xl card-light">
                <h4
                  className="text-[var(--color-blue)] text-xs font-bold uppercase tracking-wider mb-3"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Price Depends On
                </h4>
                <ul className="space-y-2">
                  {factors.map((factor, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-[var(--color-light-muted)] text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-blue)] shrink-0 mt-1.5" />
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: price display + donut + comparison */}
          <div className="reveal-right">
            <div className="p-6 sm:p-8 rounded-2xl card-elevated">
              {/* Service name + unit */}
              <div className="text-center mb-2">
                <h3
                  className="text-[var(--color-light-text)] font-bold text-xl sm:text-2xl mb-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {selected?.name}
                </h3>
                {selected?.unit && (
                  <span
                    className="text-[var(--color-light-muted)] text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {selected.unit}
                  </span>
                )}
              </div>

              {/* Donut chart */}
              <div className="my-6 sm:my-8">
                <DonutChart total={estimate} segments={segments} />
              </div>

              {/* Segment legend */}
              <div className="flex justify-center gap-4 sm:gap-6 mb-6">
                {segments.map((seg) => (
                  <div key={seg.label} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ background: seg.color }} />
                    <div>
                      <span
                        className="text-[var(--color-light-muted)] text-xs block"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {seg.label}
                      </span>
                      <span
                        className="text-[var(--color-light-text)] text-xs font-semibold"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        ${seg.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* National average comparison (anchoring) */}
              <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--color-blue-subtle)', border: '1px solid var(--color-light-border)' }}>
                <div className="flex items-center justify-between">
                  <span
                    className="text-[var(--color-light-muted)] text-sm"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    National average for this service
                  </span>
                  <span
                    className="text-[var(--color-light-muted)] text-sm font-semibold line-through"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    ${nationalAvg.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span
                    className="text-[var(--color-blue)] text-sm font-semibold"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Our estimate
                  </span>
                  <span
                    className="text-[var(--color-blue)] text-sm font-bold"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    ${estimate.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Price range */}
              <div className="text-center mb-4">
                <span
                  className="text-[var(--color-light-muted)] text-xs"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Full range: ${(selected?.basePrice ?? 0).toLocaleString()} &ndash; ${(selected?.maxPrice ?? 0).toLocaleString()}
                </span>
              </div>

              {/* Disclaimer */}
              <p
                className="text-center text-[var(--color-light-muted)] text-xs opacity-60"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Estimates are approximate. Final pricing after on-site inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
