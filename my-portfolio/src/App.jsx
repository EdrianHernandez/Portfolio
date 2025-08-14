import React, { useState, useCallback, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import ContactModal from './components/Contact/ContactModal.jsx'

const App = () => {
  const [contactOpen, setContactOpen] = useState(false)
  const openContact = useCallback(() => setContactOpen(true), [])
  const closeContact = useCallback(() => setContactOpen(false), [])
  // Hide the preloader after critical assets are ready (or a max timeout), with a minimum display time
  useEffect(() => {
    // Prevent double-run in React StrictMode (dev)
    if (typeof window !== 'undefined' && window.__PRELOADER_DONE) return
    const preloader = document.getElementById('preloader')
    if (!preloader) return

    const MIN_LOADER_MS = 1200  // minimum visible time for loader
    const MAX_WAIT_MS = 4000    // hard cap so we never hang on slow networks
    const HIDE_ANIM_MS = 350    // match CSS transition
    const start = Date.now()

    const cleanup = []
    let cancelled = false

    const preloadImages = (urls = []) => Promise.all(
      urls.map(src => new Promise(resolve => {
        const img = new Image()
        img.onload = () => resolve(true)
        img.onerror = () => resolve(false)
        img.src = src
      }))
    )

    const waitForWindowLoad = () => new Promise(resolve => {
      if (document.readyState === 'complete') resolve()
      else window.addEventListener('load', () => resolve(), { once: true })
    })

    const waitForFonts = () => {
      try {
        if (document.fonts && document.fonts.ready) return document.fonts.ready
      } catch {
        /* no-op */
      }
      return Promise.resolve()
    }

    // Critical assets for first paint (hero + key icons)
    const criticalImages = [
      '/assets/hero_img.jpg',
      '/assets/icons8-react-24.png',
      '/assets/icons8-html-48.png',
      '/assets/icons8-css-48.png',
      '/assets/icons8-javascript-48.png'
    ]

    const master = Promise.all([
      waitForWindowLoad(),
      preloadImages(criticalImages),
      waitForFonts()
    ])

    const withTimeout = Promise.race([
      master,
      new Promise(resolve => {
        const t = setTimeout(resolve, MAX_WAIT_MS)
        cleanup.push(() => clearTimeout(t))
      })
    ])

    withTimeout.then(() => {
      if (cancelled) return
      const elapsed = Date.now() - start
      const waitMore = Math.max(0, MIN_LOADER_MS - elapsed)
      const tMin = setTimeout(() => {
        preloader.classList.add('preloader--hide')
        const tHide = setTimeout(() => {
          if (preloader && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader)
          }
          if (typeof window !== 'undefined') window.__PRELOADER_DONE = true
        }, HIDE_ANIM_MS)
        cleanup.push(() => clearTimeout(tHide))
      }, waitMore)
      cleanup.push(() => clearTimeout(tMin))
    })

    return () => {
      cancelled = true
      cleanup.forEach(fn => fn())
    }
  }, [])
  return (
    <BrowserRouter>
      <Navbar onOpenContact={openContact} />
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      <ContactModal open={contactOpen} onClose={closeContact} />
    </BrowserRouter>
  )
}

export default App
