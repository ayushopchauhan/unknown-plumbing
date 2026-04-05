import { useState } from 'react'
import config from '../siteConfig'
import { ChevronDown } from 'lucide-react'
import { PipeCorner } from './PlumbingDecorations'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const faq = Array.isArray(config.faq) ? config.faq : []

  function toggle(index) {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (faq.length === 0) return null

  return (
    <section id="faq" className="section-light-warm py-20 md:py-28 relative overflow-hidden">
      {/* Floating glow orb */}
      <div className="glow-orb glow-orb-blue w-[300px] h-[300px]" style={{ top: '20%', right: '-5%' }} />

      {/* Pipe corner decorations */}
      <div className="absolute top-6 left-6 opacity-30 pointer-events-none">
        <PipeCorner position="top-left" size={48} />
      </div>
      <div className="absolute bottom-6 right-6 opacity-30 pointer-events-none">
        <PipeCorner position="bottom-right" size={48} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span
            className="reveal inline-block text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Common Questions
          </span>
          <h2
            className="reveal text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-light-text)] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="reveal w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        {/* Accordion */}
        <div className="reveal space-y-3">
          {faq.map((item, i) => {
            const isOpen = openIndex === i
            const question = typeof item.question === 'string' ? item.question : (item.question ? String(item.question) : '')
            const answer = typeof item.answer === 'string' ? item.answer : (item.answer ? String(item.answer) : '')

            if (!question) return null

            return (
              <div
                key={i}
                className={`card-light rounded-xl transition-all duration-300 ${
                  isOpen
                    ? 'border-l-3 border-l-[var(--color-blue)] shadow-[0_4px_16px_var(--color-blue-glow)]'
                    : 'hover:border-[var(--color-light-border-strong)]'
                }`}
              >
                {/* Question */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left cursor-pointer"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span
                    className={`text-sm md:text-base font-semibold transition-colors ${
                      isOpen ? 'text-[var(--color-blue)]' : 'text-[var(--color-light-text)]'
                    }`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[var(--color-blue)] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer with smooth height animation */}
                <div
                  id={`faq-answer-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                      <p
                        className="text-[var(--color-light-muted)] text-sm md:text-base leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
