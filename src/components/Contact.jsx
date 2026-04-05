import { useState } from 'react'
import config from '../siteConfig'
import { Phone, Mail, MapPin, Clock, Send, AlertTriangle } from 'lucide-react'
import { PipeCorner } from './PlumbingDecorations'

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
  emergency: false,
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const { contact, services, business } = config
  // Guard: services may be undefined if GPT omits it
  const serviceList = services || []

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      ...form,
      slug: config.slug,
      source: 'contact_form',
      timestamp: new Date().toISOString(),
    }

    try {
      const endpoint = window.__LEAD_ENDPOINT__ || config.leadEndpoint
      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
      } else {
        console.log('Contact form submission:', payload)
      }
      setSubmitted(true)
      setForm(initialForm)
    } catch (err) {
      console.error('Form submission error:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-[var(--color-deep)] relative overflow-hidden grain-overlay">
      {/* Floating glow orbs */}
      <div className="glow-orb glow-orb-blue w-[400px] h-[400px]" style={{ top: '5%', right: '-5%' }} />
      <div className="glow-orb glow-orb-orange w-[250px] h-[250px]" style={{ bottom: '10%', left: '-3%' }} />

      {/* Background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-blue)]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Banner */}
        <div className="reveal mb-10 md:mb-14">
          <a
            href={`tel:${contact?.emergencyPhone || contact?.phone}`}
            className="emergency-pulse flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[var(--color-emergency)]/10 border border-[var(--color-emergency)]/30 hover:bg-[var(--color-emergency)]/20 transition-colors"
          >
            <AlertTriangle className="w-5 h-5 text-[var(--color-emergency)]" />
            <span
              className="text-[var(--color-emergency)] font-bold text-sm md:text-base"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Need help now? Call {contact?.emergencyPhoneDisplay || contact?.phoneDisplay}
            </span>
            <Phone className="w-5 h-5 text-[var(--color-emergency)]" />
          </a>
        </div>

        {/* Section Header */}
        <div className="text-center mb-14 md:mb-16">
          <span
            className="reveal inline-block text-[var(--color-blue)] text-xs tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Get In Touch
          </span>
          <h2
            className="reveal text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-cream)] mb-6"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ready to Fix It?
          </h2>
          <div className="reveal w-16 h-0.5 bg-[var(--color-blue)] mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Left: Form */}
          <div className="reveal">
            {submitted ? (
              <div className="card-dark rounded-2xl p-8 text-center border-[var(--color-success)]/30">
                <div className="w-16 h-16 rounded-full bg-[var(--color-success)]/10 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-7 h-7 text-[var(--color-success)]" />
                </div>
                <h3
                  className="text-xl font-bold text-[var(--color-cream)] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Request Sent
                </h3>
                <p className="text-[var(--color-cream)]/60 text-sm" style={{ fontFamily: 'var(--font-body)' }}>
                  We will get back to you within the hour. For emergencies, call us directly.
                </p>
              </div>
            ) : (
              <div className="relative">
                {/* PipeCorner decorations */}
                <div className="absolute -top-2 -left-2 z-10">
                  <PipeCorner position="top-left" size={32} />
                </div>
                <div className="absolute -top-2 -right-2 z-10">
                  <PipeCorner position="top-right" size={32} />
                </div>
                <div className="absolute -bottom-2 -left-2 z-10">
                  <PipeCorner position="bottom-left" size={32} />
                </div>
                <div className="absolute -bottom-2 -right-2 z-10">
                  <PipeCorner position="bottom-right" size={32} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 card-dark rounded-2xl p-6 sm:p-8">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-[var(--color-cream)]/60 uppercase tracking-wider mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="input-dark w-full px-4 py-3 rounded-lg text-sm"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  {/* Email + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-[var(--color-cream)]/60 uppercase tracking-wider mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="input-dark w-full px-4 py-3 rounded-lg text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-[var(--color-cream)]/60 uppercase tracking-wider mb-2"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        className="input-dark w-full px-4 py-3 rounded-lg text-sm"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                    </div>
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-xs font-semibold text-[var(--color-cream)]/60 uppercase tracking-wider mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Service Needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="input-dark w-full px-4 py-3 rounded-lg text-sm appearance-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      <option value="">Select a service</option>
                      {serviceList.map((s, i) => (
                        <option key={s.name || i} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-[var(--color-cream)]/60 uppercase tracking-wider mb-2"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe the issue you are experiencing..."
                      className="input-dark w-full px-4 py-3 rounded-lg text-sm resize-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                    />
                  </div>

                  {/* Emergency Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="emergency"
                      checked={form.emergency}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-[var(--color-cream)]/20 bg-[var(--color-surface)] text-[var(--color-emergency)] focus:ring-[var(--color-emergency)]/30 accent-[var(--color-emergency)]"
                    />
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-[var(--color-emergency)]" />
                      <span
                        className="text-sm text-[var(--color-cream)]/80 group-hover:text-[var(--color-cream)] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        This is an emergency
                      </span>
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-bold text-sm tracking-wide uppercase transition-all duration-300 cursor-pointer btn-shimmer ${
                      form.emergency
                        ? 'bg-[var(--color-emergency)] hover:bg-[var(--color-emergency)]/90 text-white emergency-pulse'
                        : 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_24px_rgba(249,115,22,0.4)]'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Sending...' : form.emergency ? 'Send Emergency Request' : 'Send Request'}
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right: Contact Info */}
          <div className="reveal space-y-6">
            {/* Phone (most prominent) */}
            <a
              href={`tel:${contact?.phone}`}
              className="flex items-center gap-4 p-5 rounded-xl card-dark border-[var(--color-blue)]/30 hover:border-[var(--color-blue)]/60 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-blue)]/15 flex items-center justify-center group-hover:bg-[var(--color-blue)]/25 transition-colors shadow-[0_0_16px_rgba(14,165,233,0.15)]">
                <Phone className="w-5 h-5 text-[var(--color-blue)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  Call Us
                </p>
                <p
                  className="text-xl font-bold text-[var(--color-cream)] group-hover:text-[var(--color-blue)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {contact?.phoneDisplay}
                </p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${contact?.email}`}
              className="flex items-center gap-4 p-5 rounded-xl card-dark transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-blue)]/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-[var(--color-blue)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  Email
                </p>
                <p className="text-sm font-semibold text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-body)' }}>
                  {contact?.email}
                </p>
              </div>
            </a>

            {/* Address */}
            <div className="flex items-center gap-4 p-5 rounded-xl card-dark">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-blue)]/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--color-blue)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  Address
                </p>
                <p className="text-sm font-semibold text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-body)' }}>
                  {contact?.fullAddress}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4 p-5 rounded-xl card-dark">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-blue)]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[var(--color-blue)]" />
              </div>
              <div>
                <p className="text-xs text-[var(--color-cream)]/60 uppercase tracking-wider mb-0.5" style={{ fontFamily: 'var(--font-heading)' }}>
                  Hours
                </p>
                <p className="text-sm font-semibold text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-body)' }}>
                  {contact?.hours}
                </p>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="rounded-xl overflow-hidden card-dark h-48 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[var(--color-blue)]/40 mx-auto mb-2" />
                <p className="text-xs text-[var(--color-cream)]/40" style={{ fontFamily: 'var(--font-body)' }}>
                  {contact?.city}, {contact?.state} {contact?.zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
