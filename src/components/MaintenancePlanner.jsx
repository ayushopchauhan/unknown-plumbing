import { useState, useMemo } from 'react'
import config from '../siteConfig'
import { Snowflake, Sprout, Sun, Leaf, Calendar, CheckSquare, ChevronRight } from 'lucide-react'

const seasonIcons = { winter: Snowflake, spring: Sprout, summer: Sun, fall: Leaf }

/* Richer season colors for light backgrounds */
const seasonColors = {
  winter: 'text-blue-500',
  spring: 'text-emerald-500',
  summer: 'text-amber-500',
  fall: 'text-orange-500',
}
const seasonBgColors = {
  winter: 'bg-blue-500',
  spring: 'bg-emerald-500',
  summer: 'bg-amber-500',
  fall: 'bg-orange-500',
}
const seasonBorderColors = {
  winter: 'border-blue-500/30',
  spring: 'border-emerald-500/30',
  summer: 'border-amber-500/30',
  fall: 'border-orange-500/30',
}
const seasonLightBg = {
  winter: 'rgba(14, 165, 233, 0.06)',
  spring: 'rgba(16, 185, 129, 0.06)',
  summer: 'rgba(245, 158, 11, 0.06)',
  fall: 'rgba(249, 115, 22, 0.06)',
}
const seasonLabels = {
  winter: 'Winter',
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
}
// GPT generates tasks as objects {task, description, priority} or as plain strings
const getTaskText = (t) => typeof t === 'string' ? t : (t.task || t.description || String(t))
const getTaskDescription = (t) => typeof t === 'string' ? null : (t.description || null)
const getTaskPriority = (t) => typeof t === 'string' ? null : (t.priority || null)


const currentMonthIndex = new Date().getMonth()

export default function MaintenancePlanner() {
  const months = config.maintenancePlanner?.months || []
  if (months.length === 0) return null
  return <MaintenancePlannerInner months={months} />
}

function MaintenancePlannerInner({ months }) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonthIndex)

  if (months.length === 0) return null
  const [viewMode, setViewMode] = useState('grid')
  const [completedTasks, setCompletedTasks] = useState({})

  const selected = months[selectedMonth]
  const SeasonIcon = seasonIcons[selected.season]

  const toggleTask = (monthIdx, taskIdx) => {
    const key = `${monthIdx}-${taskIdx}`
    setCompletedTasks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const completedCount = useMemo(() => {
    let count = 0
    months.forEach((m, mi) => {
      m.tasks.forEach((_, ti) => {
        if (completedTasks[`${mi}-${ti}`]) count++
      })
    })
    return count
  }, [completedTasks, months])

  const totalTasks = useMemo(() => months.reduce((sum, m) => sum + m.tasks.length, 0), [months])

  return (
    <section
      id="maintenance"
      className="section-light-warm py-16 md:py-20 lg:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 lg:mb-14 reveal">
          <p
            className="text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Maintenance
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-light-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Your Seasonal Plumbing Guide
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-blue)] mx-auto mb-4" />
          <p
            className="text-sm text-[var(--color-light-muted)] max-w-lg mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Preventive maintenance saves you thousands in emergency repairs. Here is what to check each month.
          </p>
        </div>

        {/* Progress indicator */}
        {completedCount > 0 && (
          <div className="reveal flex items-center justify-center gap-3 mb-8">
            <div className="h-1.5 w-32 sm:w-48 rounded-full overflow-hidden" style={{ background: 'var(--color-light-border)' }}>
              <div
                className="h-full bg-[var(--color-blue)] rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalTasks) * 100}%` }}
              />
            </div>
            <span className="text-xs text-[var(--color-light-muted)]">
              {completedCount}/{totalTasks} tasks done
            </span>
          </div>
        )}

        {/* View toggle (visible on md+) */}
        <div className="hidden md:flex justify-end mb-4 reveal">
          <div className="inline-flex rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-light-border)' }}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 text-xs transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)]' : 'text-[var(--color-light-muted)] hover:text-[var(--color-light-text)]'}`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs transition-colors ${viewMode === 'list' ? 'bg-[var(--color-blue)]/10 text-[var(--color-blue)]' : 'text-[var(--color-light-muted)] hover:text-[var(--color-light-text)]'}`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              List
            </button>
          </div>
        </div>

        {/* MOBILE: horizontal scroller + detail panel */}
        <div className="md:hidden reveal">
          {/* Month scroller */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {months.map((m, i) => {
              const Icon = seasonIcons[m.season]
              const isSelected = i === selectedMonth
              const isCurrent = i === currentMonthIndex
              return (
                <button
                  key={i}
                  onClick={() => setSelectedMonth(i)}
                  className={`
                    flex-shrink-0 flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 min-w-[72px] transition-all duration-200
                    ${isSelected ? 'card-light shadow-md' : 'bg-white/60'}
                  `}
                  style={isSelected ? { borderColor: 'var(--color-blue)' } : { border: '1px solid transparent' }}
                >
                  <Icon
                    className={`w-4 h-4 ${isSelected ? seasonColors[m.season] : 'text-[var(--color-light-muted)]'}`}
                    strokeWidth={1.5}
                  />
                  <span
                    className={`text-[11px] font-medium ${isSelected ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-muted)]'}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {m.month.slice(0, 3)}
                  </span>
                  {isCurrent && (
                    <div className={`w-1 h-1 rounded-full ${seasonBgColors[m.season]}`} />
                  )}
                  <span className="text-[9px] text-[var(--color-light-muted)]">
                    {m.tasks.length} tasks
                  </span>
                </button>
              )
            })}
          </div>

          {/* Selected month detail */}
          <MobileDetail
            month={months[selectedMonth]}
            monthIndex={selectedMonth}
            completedTasks={completedTasks}
            onToggleTask={toggleTask}
          />
        </div>

        {/* TABLET/DESKTOP: grid or list view */}
        <div className="hidden md:block">
          {viewMode === 'grid' ? (
            <div className="flex gap-5 lg:gap-6">
              {/* Month grid */}
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 flex-shrink-0 w-[280px] lg:w-[340px]">
                {months.map((m, i) => {
                  const Icon = seasonIcons[m.season]
                  const isSelected = i === selectedMonth
                  const isCurrent = i === currentMonthIndex
                  const monthCompletedCount = m.tasks.filter(
                    (_, ti) => completedTasks[`${i}-${ti}`]
                  ).length
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedMonth(i)}
                      className={`
                        reveal relative flex flex-col items-center gap-1 rounded-xl p-3 transition-all duration-200
                        ${isSelected ? 'card-light shadow-lg' : 'bg-white/50 hover:bg-white/80'}
                      `}
                      style={isSelected ? { borderColor: 'var(--color-blue)' } : { border: '1px solid var(--color-light-border)' }}
                    >
                      {isCurrent && (
                        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${seasonBgColors[m.season]} shadow-sm`} />
                      )}
                      <Icon
                        className={`w-4 h-4 ${isSelected ? seasonColors[m.season] : 'text-[var(--color-light-muted)]'}`}
                        strokeWidth={1.5}
                      />
                      <span
                        className={`text-xs font-medium ${isSelected ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-muted)]'}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {m.month.slice(0, 3)}
                      </span>
                      <span className="text-[9px] text-[var(--color-light-muted)]">
                        {monthCompletedCount > 0
                          ? `${monthCompletedCount}/${m.tasks.length}`
                          : `${m.tasks.length} tasks`}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Detail panel */}
              <div className="flex-1 min-w-0">
                <DetailPanel
                  month={months[selectedMonth]}
                  monthIndex={selectedMonth}
                  completedTasks={completedTasks}
                  onToggleTask={toggleTask}
                />
              </div>
            </div>
          ) : (
            /* List view */
            <div className="space-y-3 stagger-children">
              {months.map((m, i) => {
                const Icon = seasonIcons[m.season]
                const isSelected = i === selectedMonth
                const isCurrent = i === currentMonthIndex
                return (
                  <div key={i} className="reveal">
                    <button
                      onClick={() => setSelectedMonth(isSelected ? -1 : i)}
                      className={`
                        w-full flex items-center gap-4 rounded-xl p-4 transition-all duration-200 card-light
                        ${isSelected ? 'shadow-md' : ''}
                      `}
                      style={isSelected ? { borderColor: 'var(--color-blue)' } : {}}
                    >
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: seasonLightBg[m.season] }}
                      >
                        <Icon className={`w-5 h-5 ${seasonColors[m.season]}`} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-semibold text-[var(--color-light-text)]"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {m.month}
                          </span>
                          {isCurrent && (
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${seasonColors[m.season]}`}
                              style={{ background: seasonLightBg[m.season] }}
                            >
                              Now
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[var(--color-light-muted)]">
                          {seasonLabels[m.season]} · {m.tasks.length} tasks
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 text-[var(--color-light-muted)] transition-transform duration-200 ${isSelected ? 'rotate-90' : ''}`}
                      />
                    </button>

                    {/* Expanded tasks */}
                    {isSelected && (
                      <div className="mt-2 ml-14 space-y-2 pb-2">
                        {m.tasks.map((task, ti) => {
                          const isDone = completedTasks[`${i}-${ti}`]
                          return (
                            <button
                              key={ti}
                              onClick={() => toggleTask(i, ti)}
                              className="flex items-start gap-3 w-full text-left group p-2 rounded-lg hover:bg-white/60 transition-colors"
                            >
                              <div
                                className={`
                                  flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                                  ${isDone ? `${seasonBorderColors[m.season]} ${seasonBgColors[m.season]}` : 'border-[var(--color-light-border-strong)] group-hover:border-[var(--color-blue)]'}
                                `}
                              >
                                {isDone && (
                                  <CheckSquare
                                    className="w-3 h-3 text-white"
                                    strokeWidth={3}
                                  />
                                )}
                              </div>
                              <span
                                className={`text-sm leading-relaxed transition-all ${isDone ? 'text-[var(--color-light-muted)] line-through opacity-50' : 'text-[var(--color-light-text)]'}`}
                              >
                                {getTaskText(task)}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 lg:mt-14 reveal">
          <p className="text-[var(--color-light-muted)] text-sm mb-4">
            Need help with seasonal maintenance? Let us handle it for you.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[var(--color-accent-light)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Calendar className="w-4 h-4" />
            Schedule Your Check
          </a>
        </div>
      </div>
    </section>
  )
}

/* Detail panel for desktop grid view */
function DetailPanel({ month, monthIndex, completedTasks, onToggleTask }) {
  const SeasonIcon = seasonIcons[month.season]
  const isCurrent = monthIndex === currentMonthIndex
  const doneCount = month.tasks.filter((_, ti) => completedTasks[`${monthIndex}-${ti}`]).length

  return (
    <div
      className="rounded-xl card-elevated p-6 lg:p-8 h-full transition-all duration-300"
      style={{ borderColor: 'var(--color-blue)', borderWidth: '1px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: seasonLightBg[month.season] }}
          >
            <SeasonIcon className={`w-5 h-5 ${seasonColors[month.season]}`} strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3
                className="text-lg font-semibold text-[var(--color-light-text)]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {month.month}
              </h3>
              {isCurrent && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${seasonColors[month.season]}`}
                  style={{ background: seasonLightBg[month.season] }}
                >
                  Current Month
                </span>
              )}
            </div>
            <p className={`text-xs ${seasonColors[month.season]}`}>
              {seasonLabels[month.season]} · {doneCount}/{month.tasks.length} completed
            </p>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {month.tasks.map((task, ti) => {
          const isDone = completedTasks[`${monthIndex}-${ti}`]
          return (
            <button
              key={ti}
              onClick={() => onToggleTask(monthIndex, ti)}
              className="flex items-start gap-3 w-full text-left group p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-all"
              style={{ border: '1px solid var(--color-light-border)' }}
            >
              <div
                className={`
                  flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center
                  ${isDone ? `${seasonBorderColors[month.season]} ${seasonBgColors[month.season]}` : 'border-[var(--color-light-border-strong)] group-hover:border-[var(--color-blue)]'}
                `}
              >
                {isDone && <CheckSquare className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span
                className={`text-sm leading-relaxed transition-all ${isDone ? 'text-[var(--color-light-muted)] line-through opacity-50' : 'text-[var(--color-light-text)] group-hover:text-[var(--color-light-text)]'}`}
              >
                {getTaskText(task)}
                {getTaskDescription(task) && <span className="block text-xs text-[var(--color-light-muted)] mt-0.5">{getTaskDescription(task)}</span>}
              </span>
            </button>
          )
        })}
      </div>

      {/* Season tip */}
      <div
        className="mt-6 p-4 rounded-lg"
        style={{ background: seasonLightBg[month.season], border: '1px solid var(--color-light-border)' }}
      >
        <p className="text-xs text-[var(--color-light-muted)] leading-relaxed">
          <span className={`font-semibold ${seasonColors[month.season]}`}>
            {seasonLabels[month.season]} Tip:
          </span>{' '}
          {month.season === 'winter' && 'Keep your thermostat at 55°F or higher, even when traveling. Frozen pipes are the #1 winter plumbing emergency.'}
          {month.season === 'spring' && 'Spring is the best time for a full plumbing inspection. Catch freeze damage early before it becomes a summer emergency.'}
          {month.season === 'summer' && 'Higher water usage in summer means higher stress on your system. Monitor your bill for unexpected spikes.'}
          {month.season === 'fall' && 'Everything you winterize now saves you an emergency call later. An ounce of prevention is worth a pound of cure.'}
        </p>
      </div>
    </div>
  )
}

/* Mobile detail card */
function MobileDetail({ month, monthIndex, completedTasks, onToggleTask }) {
  const SeasonIcon = seasonIcons[month.season]
  const isCurrent = monthIndex === currentMonthIndex

  return (
    <div
      className="mt-4 rounded-xl card-elevated p-5 transition-all duration-300"
      style={{ borderColor: 'var(--color-blue)', borderWidth: '1px' }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background: seasonLightBg[month.season] }}
        >
          <SeasonIcon className={`w-4.5 h-4.5 ${seasonColors[month.season]}`} strokeWidth={1.5} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3
              className="text-base font-semibold text-[var(--color-light-text)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {month.month}
            </h3>
            {isCurrent && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${seasonColors[month.season]}`}
                style={{ background: seasonLightBg[month.season] }}
              >
                Now
              </span>
            )}
          </div>
          <p className={`text-[11px] ${seasonColors[month.season]}`}>
            {seasonLabels[month.season]} · {month.tasks.length} tasks
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {month.tasks.map((task, ti) => {
          const isDone = completedTasks[`${monthIndex}-${ti}`]
          return (
            <button
              key={ti}
              onClick={() => onToggleTask(monthIndex, ti)}
              className="flex items-start gap-3 w-full text-left min-h-[48px] group p-3 rounded-lg bg-white shadow-sm transition-all"
              style={{ border: '1px solid var(--color-light-border)' }}
            >
              <div
                className={`
                  flex-shrink-0 mt-1 w-6 h-6 rounded border-2 transition-all duration-200 flex items-center justify-center
                  ${isDone ? `${seasonBorderColors[month.season]} ${seasonBgColors[month.season]}` : 'border-[var(--color-light-border-strong)]'}
                `}
              >
                {isDone && <CheckSquare className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <span
                className={`text-sm leading-relaxed pt-0.5 transition-all ${isDone ? 'text-[var(--color-light-muted)] line-through opacity-50' : 'text-[var(--color-light-text)]'}`}
              >
                {getTaskText(task)}
                {getTaskDescription(task) && <span className="block text-xs text-[var(--color-light-muted)] mt-0.5">{getTaskDescription(task)}</span>}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
