import { useState, useMemo, useCallback } from 'react'
import config from '../siteConfig'
import { ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, XCircle, Mail } from 'lucide-react'

const resultIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  emergency: XCircle,
}

const resultColors = {
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  emergency: 'text-[var(--color-emergency)]',
}

const resultBgColors = {
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  emergency: 'bg-[var(--color-emergency)]',
}

const resultBorderColors = {
  success: 'border-[var(--color-success)]/30',
  warning: 'border-[var(--color-warning)]/30',
  emergency: 'border-[var(--color-emergency)]/30',
}

function getResultKey(score, results) {
  if (score >= results.poor.range[0]) return 'poor'
  if (score >= results.fair.range[0]) return 'fair'
  return 'good'
}

export default function HealthQuiz() {
  const questions = config.healthQuiz?.questions || []
  const results = config.healthQuiz?.results || {}
  if (questions.length === 0 || !results.good || !results.fair || !results.poor) return null
  return <HealthQuizInner questions={questions} results={results} />
}

function HealthQuizInner({ questions, results }) {
  const totalQuestions = questions.length
  const maxScore = totalQuestions * 3

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null))
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const totalScore = useMemo(
    () => answers.reduce((sum, a) => sum + (a !== null ? a : 0), 0),
    [answers]
  )

  const resultKey = useMemo(() => getResultKey(totalScore, results), [totalScore, results])
  const result = results[resultKey]
  const ResultIcon = resultIcons[result.color]

  const handleSelect = useCallback(
    (score) => {
      const updated = answers.map((a, i) => (i === currentQuestion ? score : a))
      setAnswers(updated)

      setTransitioning(true)
      setTimeout(() => {
        if (currentQuestion < totalQuestions - 1) {
          setCurrentQuestion(currentQuestion + 1)
        } else {
          setShowResults(true)
        }
        setTransitioning(false)
      }, 350)
    },
    [answers, currentQuestion, totalQuestions]
  )

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false)
      return
    }
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }, [showResults, currentQuestion])

  const restart = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers(Array(totalQuestions).fill(null))
    setShowResults(false)
    setEmail('')
    setEmailSubmitted(false)
  }, [totalQuestions])

  const handleEmailSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!email.trim()) return
      setEmailSubmitted(true)
    },
    [email]
  )

  const progressPercent = showResults
    ? 100
    : ((currentQuestion + (answers[currentQuestion] !== null ? 1 : 0)) / totalQuestions) * 100

  const goodEnd = ((results.good.range[1] + 1) / (maxScore + 1)) * 100
  const fairEnd = ((results.fair.range[1] + 1) / (maxScore + 1)) * 100
  const scorePosition = (totalScore / maxScore) * 100

  const q = questions[currentQuestion]

  // Determine if this question uses Yes/No format (yesScore/noScore) or options array
  const hasOptions = Array.isArray(q?.options) && q.options.length > 0

  return (
    <section id="health-quiz" className="section-light py-16 md:py-20 lg:py-28 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10 lg:mb-14 reveal">
          <p
            className="text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Free Assessment
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-light-text)] mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            How Healthy Is Your Plumbing?
          </h2>
          <div className="w-16 h-0.5 bg-[var(--color-blue)] mx-auto mb-4" />
          <p
            className="text-sm text-[var(--color-light-muted)] max-w-md mx-auto"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Answer 6 quick questions about your home. Get a personalized plumbing health score in under a minute.
          </p>
        </div>

        {/* Quiz card */}
        <div className="reveal rounded-xl card-elevated overflow-hidden">
          {/* Progress bar */}
          <div className="h-1.5" style={{ background: 'var(--color-light-border)' }}>
            <div
              className="h-full bg-[var(--color-blue)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="p-5 sm:p-7 lg:p-9">
            {!showResults ? (
              /* Question view */
              <div>
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={goBack}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-1 text-xs text-[var(--color-light-muted)] hover:text-[var(--color-light-text)] transition-colors disabled:opacity-0 disabled:pointer-events-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <span
                    className="text-xs text-[var(--color-light-muted)] tracking-wider uppercase"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {currentQuestion + 1} of {totalQuestions}
                  </span>
                </div>

                {/* Question */}
                <div
                  className={`transition-all duration-300 ${transitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
                >
                  <h3
                    className="text-xl sm:text-2xl font-semibold text-[var(--color-light-text)] mb-6"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {q?.question}
                  </h3>

                  {/* Options: use options array if present, else Yes/No buttons */}
                  <div className="space-y-3">
                    {hasOptions ? (
                      (q.options || []).map((option, i) => {
                        const isSelected = answers[currentQuestion] === option.score
                        return (
                          <button
                            key={i}
                            onClick={() => handleSelect(option.score)}
                            className={`
                              w-full text-left rounded-lg p-4 sm:p-5 transition-all duration-200 card-light
                              ${isSelected ? 'shadow-[0_0_20px_var(--color-blue-glow)]' : ''}
                            `}
                            style={isSelected ? { borderColor: 'var(--color-blue)', background: 'var(--color-blue-subtle)' } : {}}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`
                                  flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                  ${isSelected ? 'border-[var(--color-blue)] bg-[var(--color-blue)]' : 'border-[var(--color-light-border-strong)]'}
                                `}
                              >
                                {isSelected && (
                                  <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                                )}
                              </div>
                              <span
                                className={`text-sm sm:text-base ${isSelected ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-muted)]'}`}
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                {option.label}
                              </span>
                            </div>
                          </button>
                        )
                      })
                    ) : (
                      /* Yes/No buttons for GPT-generated questions with yesScore/noScore */
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Yes', score: q?.yesScore ?? 0 },
                          { label: 'No', score: q?.noScore ?? 3 },
                        ].map(({ label, score }) => {
                          const isSelected = answers[currentQuestion] === score
                          return (
                            <button
                              key={label}
                              onClick={() => handleSelect(score)}
                              className={`
                                rounded-lg p-4 sm:p-5 transition-all duration-200 card-light text-center font-semibold
                                ${isSelected ? 'shadow-[0_0_20px_var(--color-blue-glow)]' : ''}
                              `}
                              style={
                                isSelected
                                  ? { borderColor: 'var(--color-blue)', background: 'var(--color-blue-subtle)' }
                                  : {}
                              }
                            >
                              <div className="flex items-center justify-center gap-2">
                                <div
                                  className={`
                                    flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center
                                    ${isSelected ? 'border-[var(--color-blue)] bg-[var(--color-blue)]' : 'border-[var(--color-light-border-strong)]'}
                                  `}
                                >
                                  {isSelected && (
                                    <CheckCircle className="w-3 h-3 text-white" strokeWidth={3} />
                                  )}
                                </div>
                                <span
                                  className={`text-sm sm:text-base ${isSelected ? 'text-[var(--color-light-text)]' : 'text-[var(--color-light-muted)]'}`}
                                  style={{ fontFamily: 'var(--font-body)' }}
                                >
                                  {label}
                                </span>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-2 h-2 rounded-full transition-all duration-300
                        ${i === currentQuestion ? 'bg-[var(--color-blue)] w-6' : ''}
                        ${i < currentQuestion && answers[i] !== null ? 'bg-[var(--color-blue)]/50' : ''}
                        ${i > currentQuestion || (i < currentQuestion && answers[i] === null) ? 'bg-[var(--color-light-border-strong)]' : ''}
                      `}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Results view */
              <div>
                <button
                  onClick={goBack}
                  className="flex items-center gap-1 text-xs text-[var(--color-light-muted)] hover:text-[var(--color-light-text)] transition-colors mb-6"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to questions
                </button>

                {/* Result icon and title */}
                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${resultBgColors[result.color]}/15 mb-4`}
                  >
                    {ResultIcon && (
                      <ResultIcon className={`w-8 h-8 ${resultColors[result.color]}`} strokeWidth={1.5} />
                    )}
                  </div>
                  <h3
                    className={`text-2xl sm:text-3xl font-bold mb-3 ${resultColors[result.color]}`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {result.title}
                  </h3>
                  <p
                    className="text-sm text-[var(--color-light-muted)] max-w-md mx-auto leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {result.description}
                  </p>
                </div>

                {/* Score bar */}
                <div className="mb-8 px-2 p-5 rounded-xl card-elevated">
                  <div className="flex justify-between text-[10px] text-[var(--color-light-muted)] uppercase tracking-wider mb-2">
                    <span>Healthy</span>
                    <span>Needs Attention</span>
                  </div>

                  {/* Zone bar */}
                  <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'var(--color-light-border)' }}>
                    <div
                      className="absolute inset-y-0 left-0 bg-[var(--color-success)]/40 rounded-l-full"
                      style={{ width: `${goodEnd}%` }}
                    />
                    <div
                      className="absolute inset-y-0 bg-[var(--color-warning)]/40"
                      style={{ left: `${goodEnd}%`, width: `${fairEnd - goodEnd}%` }}
                    />
                    <div
                      className="absolute inset-y-0 right-0 bg-[var(--color-emergency)]/40 rounded-r-full"
                      style={{ left: `${fairEnd}%` }}
                    />
                  </div>

                  {/* Score marker */}
                  <div className="relative h-6 mt-1">
                    <div
                      className="absolute -translate-x-1/2 flex flex-col items-center transition-all duration-700"
                      style={{ left: `${scorePosition}%` }}
                    >
                      <div className={`w-3 h-3 rounded-full ${resultBgColors[result.color]} shadow-lg`} />
                      <span
                        className={`text-xs font-bold mt-1 ${resultColors[result.color]}`}
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {totalScore}/{maxScore}
                      </span>
                    </div>
                  </div>

                  {/* Zone labels */}
                  <div className="flex text-[10px] mt-2">
                    <span
                      className="text-[var(--color-success)] text-center font-medium"
                      style={{ width: `${goodEnd}%` }}
                    >
                      Good
                    </span>
                    <span
                      className="text-[var(--color-warning)] text-center font-medium"
                      style={{ width: `${fairEnd - goodEnd}%` }}
                    >
                      Fair
                    </span>
                    <span
                      className="text-[var(--color-emergency)] text-center font-medium"
                      style={{ width: `${100 - fairEnd}%` }}
                    >
                      Poor
                    </span>
                  </div>
                </div>

                {/* Score breakdown */}
                <div className="rounded-lg p-4 mb-8" style={{ background: 'var(--color-light-warm)', border: '1px solid var(--color-light-border)' }}>
                  <p
                    className="text-xs text-[var(--color-light-muted)] uppercase tracking-wider mb-3"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Your Answers
                  </p>
                  <div className="space-y-2">
                    {questions.map((qItem, i) => {
                      const selectedScore = answers[i]
                      let answerLabel = 'Skipped'
                      if (selectedScore !== null) {
                        if (Array.isArray(qItem.options) && qItem.options.length > 0) {
                          const found = qItem.options.find((o) => o.score === selectedScore)
                          answerLabel = found?.label || String(selectedScore)
                        } else {
                          if (selectedScore === (qItem.yesScore ?? 0)) answerLabel = 'Yes'
                          else if (selectedScore === (qItem.noScore ?? 3)) answerLabel = 'No'
                          else answerLabel = String(selectedScore)
                        }
                      }
                      const borderColor =
                        selectedScore === 0
                          ? 'var(--color-success)'
                          : selectedScore === 1
                            ? 'var(--color-light-border-strong)'
                            : selectedScore === 2
                              ? 'var(--color-warning)'
                              : 'var(--color-emergency)'
                      const severity =
                        selectedScore === 0
                          ? 'text-[var(--color-success)]'
                          : selectedScore === 1
                            ? 'text-[var(--color-light-muted)]'
                            : selectedScore === 2
                              ? 'text-[var(--color-warning)]'
                              : 'text-[var(--color-emergency)]'
                      return (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 text-sm p-3 rounded-lg bg-white"
                          style={{ borderLeft: `3px solid ${borderColor}` }}
                        >
                          <span className="text-[var(--color-light-muted)] flex-1">{qItem.question}</span>
                          <span className={`flex-shrink-0 font-medium ${severity}`}>
                            {answerLabel}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Email capture for fair/poor results */}
                {resultKey !== 'good' && !emailSubmitted && (
                  <div
                    className={`rounded-lg border ${resultBorderColors[result.color]} p-5 mb-6`}
                    style={{ background: 'var(--color-light-card)' }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Mail className={`w-5 h-5 flex-shrink-0 mt-0.5 ${resultColors[result.color]}`} />
                      <div>
                        <p
                          className="text-sm font-semibold text-[var(--color-light-text)] mb-1"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          Get Your Free Detailed Report
                        </p>
                        <p className="text-xs text-[var(--color-light-muted)]">
                          We will email you a personalized breakdown with specific recommendations for your home.
                        </p>
                      </div>
                    </div>
                    <form onSubmit={handleEmailSubmit} className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="input-light flex-1"
                      />
                      <button
                        type="submit"
                        className="flex-shrink-0 rounded-lg bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        Send Report
                      </button>
                    </form>
                  </div>
                )}

                {emailSubmitted && (
                  <div className="rounded-lg border border-[var(--color-success)]/30 bg-[var(--color-success)]/5 p-4 mb-6 text-center">
                    <CheckCircle className="w-5 h-5 text-[var(--color-success)] mx-auto mb-2" />
                    <p className="text-sm text-[var(--color-success)]">
                      Report on the way! Check your inbox shortly.
                    </p>
                  </div>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Schedule a Free Inspection
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={restart}
                    className="flex-shrink-0 inline-flex items-center justify-center rounded-lg border border-[var(--color-light-border-strong)] px-6 py-3.5 text-sm text-[var(--color-light-muted)] transition-all hover:border-[var(--color-blue)] hover:text-[var(--color-light-text)]"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
