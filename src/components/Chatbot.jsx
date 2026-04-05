import { useState, useRef, useEffect } from 'react'
import config from '../siteConfig'
import { MessageCircle, X, Send, Phone } from 'lucide-react'

const chatbot = config.chatbot || {}
const contact = config.contact || {}

const greeting = typeof chatbot.greeting === 'string'
  ? chatbot.greeting
  : 'Hi! How can I help you today?'

const chatbotName = typeof chatbot.name === 'string' ? chatbot.name : 'Chat Support'

const quickReplies = Array.isArray(chatbot.quickReplies)
  ? chatbot.quickReplies.filter(r => typeof r === 'string')
  : []

const phoneDisplay = typeof contact.phoneDisplay === 'string' ? contact.phoneDisplay : (typeof contact.phone === 'string' ? contact.phone : '')
const phone = typeof contact.phone === 'string' ? contact.phone : ''
const city = typeof contact.city === 'string' ? contact.city : 'your area'
const emergencyPhoneDisplay = typeof contact.emergencyPhoneDisplay === 'string' ? contact.emergencyPhoneDisplay : phoneDisplay

const BOT_RESPONSES = {
  emergency: {
    text: `If you have an active emergency (flooding, burst pipe, sewage backup), call us immediately at ${emergencyPhoneDisplay}. We dispatch 24/7 and typically arrive in 30 to 60 minutes.`,
    showCall: true,
  },
  cost: {
    text: 'We have a cost estimator tool on this page. Scroll up to the "What Will It Cost?" section for instant price ranges on common services. All estimates are free and we always quote before starting work.',
    scrollTo: 'estimator',
  },
  area: {
    text: `We serve the greater ${city} area including Downtown, North, South, East, and West ${city}, plus Georgetown. Check the "Areas We Serve" section for response times in your neighborhood.`,
    scrollTo: 'areas',
  },
  warranty: {
    text: 'Every job comes with a minimum 2-year warranty on parts and labor. Water heater installations also carry the manufacturer warranty. If something we fixed breaks again, we come back for free.',
  },
  book: {
    text: 'Great, let me take you to our contact form. Fill in the details and we will get back to you within the hour.',
    scrollTo: 'contact',
  },
}

function matchResponse(input) {
  const lower = input.toLowerCase()
  if (lower.includes('emergency') || lower.includes('urgent') || lower.includes('flood') || lower.includes('burst')) {
    return BOT_RESPONSES.emergency
  }
  if (lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('estimate')) {
    return BOT_RESPONSES.cost
  }
  if (lower.includes('area') || lower.includes('serve') || lower.includes('location') || lower.includes('where')) {
    return BOT_RESPONSES.area
  }
  if (lower.includes('warranty') || lower.includes('guarantee')) {
    return BOT_RESPONSES.warranty
  }
  if (lower.includes('book') || lower.includes('schedule') || lower.includes('appointment')) {
    return BOT_RESPONSES.book
  }
  return {
    text: `I would recommend speaking with our team directly. Call ${phoneDisplay} or scroll down to our contact form.`,
    showCall: true,
    scrollTo: 'contact',
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: greeting },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  function handleSend(text) {
    if (!text.trim()) return

    const userMsg = { role: 'user', text: text.trim() }
    const response = matchResponse(text)
    const botMsg = { role: 'bot', text: response.text, showCall: response.showCall }

    setMessages(prev => [...prev, userMsg, botMsg])
    setInput('')

    if (response.scrollTo) {
      setTimeout(() => {
        const el = document.getElementById(response.scrollTo)
        if (el) {
          setIsOpen(false)
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
        }
      }, 1200)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    handleSend(input)
  }

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'bg-[var(--color-surface)] border border-[var(--color-cream)]/10 rotate-90 scale-90'
            : 'bg-[var(--color-blue)] hover:bg-[var(--color-blue-light)] hover:scale-110'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[var(--color-cream)]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed z-40 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        } ${
          /* Mobile: full screen overlay */
          'inset-0 md:inset-auto md:bottom-24 md:right-5 md:w-[350px] lg:w-[380px] md:h-[500px] md:rounded-2xl'
        }`}
      >
        <div className="flex flex-col h-full bg-[var(--color-deep)] md:rounded-2xl border border-[var(--color-cream)]/10 overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[var(--color-blue)] border-b border-[var(--color-blue-light)]/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {chatbotName}
                </p>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-blue)] text-white rounded-br-sm'
                      : 'bg-[var(--color-surface)] text-[var(--color-cream)]/80 rounded-bl-sm'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {msg.text}
                  {msg.showCall && phone && (
                    <a
                      href={`tel:${phone}`}
                      className="mt-2 flex items-center gap-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] px-3 py-2 rounded-lg transition-colors"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call {phoneDisplay}
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies (show only when few messages) */}
          {messages.length <= 2 && quickReplies.length > 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(reply)}
                  className="px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-blue)]/20 text-xs text-[var(--color-blue-light)] hover:bg-[var(--color-blue)]/10 hover:border-[var(--color-blue)]/40 transition-colors cursor-pointer"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 border-t border-[var(--color-cream)]/10 bg-[var(--color-surface)]/50"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[var(--color-deep)] border border-[var(--color-cream)]/10 rounded-lg px-4 py-2.5 text-sm text-[var(--color-cream)] placeholder:text-[var(--color-cream)]/30 focus:outline-none focus:border-[var(--color-blue)]/40 transition-colors"
              style={{ fontFamily: 'var(--font-body)' }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
