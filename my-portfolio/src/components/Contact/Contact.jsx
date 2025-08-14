import React, { useState, useEffect } from 'react'
import './Contact.css'

const initialState = { name:'', email:'', subject:'', message:'' }

const Contact = () => {
  const [form, setForm] = useState(initialState)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const [showToast, setShowToast] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const validate = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return 'Valid email required'
    if (!form.message.trim()) return 'Message cannot be empty'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) { setError(v); return }
    setError('')
    setStatus('sending')
    try {
      // Placeholder: normally send to API or service (EmailJS, Formspree, etc.)
      await new Promise(r => setTimeout(r, 900))
      setStatus('sent')
      setForm(initialState)
      setShowToast(true)
      setTimeout(()=> { setStatus('idle'); setShowToast(false) }, 4200)
    } catch (err) {
      setStatus('error')
      setError('Failed to send. Try again later.')
    }
  }

  // Allow ESC to dismiss toast
  useEffect(() => {
    if (!showToast) return
    const onKey = (e) => { if (e.key === 'Escape') setShowToast(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showToast])

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-decor" aria-hidden="true">
        <span className="c-shape c-shape--1" />
        <span className="c-shape c-shape--2" />
        <span className="c-gradient-ring" />
      </div>
      <div className="contact-inner">
        <div className="contact-grid">
          <header className="contact-head" aria-labelledby="contact-heading">
            <h5 id="contact-heading">Get In Touch</h5>
            <p className="contact-intro">Feel free to reach out about opportunities, collaborations, or just to say hi. I typically respond within 24 hours.</p>
          </header>

          <div className="contact-panel" aria-labelledby="contact-form-title">
            <h6 id="contact-form-title" className="contact-panel-title">Send a Message</h6>
            <form onSubmit={onSubmit} noValidate className={(status==='sent' ? 'was-sent ' : '') + (error ? 'has-error' : '')}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">Name<span aria-hidden="true" className="req">*</span></label>
                  <input id="c-name" name="name" type="text" autoComplete="name" value={form.name} onChange={update} disabled={status==='sending'} required />
                </div>
                <div className="field">
                  <label htmlFor="c-email">Email<span aria-hidden="true" className="req">*</span></label>
                  <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={update} disabled={status==='sending'} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-subject">Subject</label>
                <input id="c-subject" name="subject" type="text" value={form.subject} onChange={update} disabled={status==='sending'} />
              </div>
              <div className="field">
                <label htmlFor="c-message">Message<span aria-hidden="true" className="req">*</span></label>
                <textarea id="c-message" name="message" rows={6} value={form.message} onChange={update} disabled={status==='sending'} required />
              </div>
              {error && <p className="form-error" role="alert">{error}</p>}
              <div className="actions">
                <button type="submit" className="contact-submit" disabled={status==='sending'} data-variant={status}>
                  {status==='sending' ? 'Sending…' : status==='sent' ? 'Sent ✔' : 'Send Message'}
                  <span className="submit-glow" aria-hidden="true" />
                </button>
              </div>
              <p className="privacy-hint">This form doesn’t store data permanently. Integrate an API or service to enable real delivery.</p>
            </form>
          </div>
        </div>
      </div>
      <aside className="contact-side contact-side--links" aria-label="Other ways to connect">
        <a className="side-link" href="https://github.com/EdrianHernandez" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>GitHub</span>
        </a>
        <a className="side-link" href="mailto:edrianhernandez07@gmail.com" aria-label="Email">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"/></svg>
          <span>Email</span>
        </a>
        <a className="side-link" href="https://www.facebook.com/ed.hrnndzzz/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.2 10.44 22v-6.99H7.9v-2.95h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.95h-2.34V22C18.34 21.2 22 17.08 22 12.06Z"/></svg>
          <span>Facebook</span>
        </a>
      </aside>
      {showToast && (
        <div className="contact-toast" role="status" aria-live="polite">
          <div className="toast-inner">
            <span className="toast-icon" aria-hidden="true">✔</span>
            <p className="toast-msg">Message sent successfully.</p>
            <button className="toast-close" aria-label="Dismiss" onClick={()=>setShowToast(false)}>×</button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
