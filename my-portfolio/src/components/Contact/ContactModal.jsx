import React, { useEffect, useRef, useState, useCallback } from 'react'
import './ContactModal.css'

const ContactModal = ({ open, onClose }) => {
  const dialogRef = useRef(null)
  const timerRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  // recipient email; uses env var if set, otherwise defaults to provided address
  const toEmail = import.meta.env.VITE_CONTACT_EMAIL || 'edrianhernandez07@gmail.com'

  const handleClose = useCallback(() => {
    // clear any pending timers
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
    setSent(false)
    setName('')
    setEmail('')
    setMessage('')
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [open, handleClose])

  useEffect(() => {
    if (open && dialogRef.current) {
      const first = dialogRef.current.querySelector('input, textarea, button, a')
      first && first.focus()
    }
  }, [open])

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent('Portfolio contact')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const href = `mailto:${toEmail}?subject=${subject}&body=${body}`
    // Open default mail client
    window.location.href = href
    // Show success state and auto-close after ~2.5s
    setSent(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { handleClose() }, 2500)
  }

  if (!open) return null

  return (
  <div className="contact-modal-overlay" role="dialog" aria-modal="true" aria-label={sent ? 'Message sent successfully' : 'Contact form'} onClick={onBackdrop}>
      <div className="contact-modal" ref={dialogRef}>
        {!sent ? (
          <>
            <div className="contact-modal__head">
              <h6>Contact me</h6>
        <button className="contact-modal__close" onClick={handleClose} aria-label="Close">×</button>
            </div>
            <form className="contact-form" onSubmit={submit}>
              <div className="form-row">
                <label htmlFor="cf-name">Your name</label>
                <input id="cf-name" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="John Doe" required />
              </div>
              <div className="form-row">
                <label htmlFor="cf-email">Your email</label>
                <input id="cf-email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="form-row">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" rows={5} value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Hi, I’d like to discuss an opportunity..." required />
              </div>

              <div className="actions">
                <button type="button" className="btn-secondary" onClick={handleClose}>Cancel</button>
                <button type="submit" className="btn-primary">Send</button>
              </div>

              {!toEmail && (
                <p className="hint">Set VITE_CONTACT_EMAIL in your .env to direct emails to your inbox.</p>
              )}
            </form>
          </>
        ) : (
          <div className="contact-success" role="alert" aria-live="assertive">
            <div className="success-icon" aria-hidden="true">✓</div>
            <h6>Message sent successfully!</h6>
            <p>Thanks for reaching out.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactModal
