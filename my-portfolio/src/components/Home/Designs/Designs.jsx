import React from 'react'
import './Designs.css'

/*
  Dynamic Figma integration
  --------------------------------------------------
  Set a personal access token in .env (never commit it):
    VITE_FIGMA_TOKEN=xxxxxxxxxxxxxxxx
  Uses the provided team link -> team ID 1439833541087867482
  We request team projects, then first few project files to build the gallery.
*/
const TEAM_ID = '1439833541087867482'
const FIGMA_BASE_FILE_URL = 'https://www.figma.com/file/'

// Local fallback items used when no Figma token is provided or the API fails
const fallbackDesigns = [
  {
    title: 'Web App Dashboard',
    description: 'Sample UI • Updated recently',
    thumbnail: 'https://via.placeholder.com/600x380?text=Dashboard',
    figmaUrl: ''
  },
  {
    title: 'Mobile Onboarding',
    description: 'Sample mobile screens • Updated recently',
    thumbnail: 'https://via.placeholder.com/600x380?text=Onboarding',
    figmaUrl: ''
  },
  {
    title: 'Landing Page Hero',
    description: 'Marketing • Updated recently',
    thumbnail: 'https://via.placeholder.com/600x380?text=Landing+Hero',
    figmaUrl: ''
  },
  {
    title: 'Style Guide',
    description: 'Typography and components • Updated recently',
    thumbnail: 'https://via.placeholder.com/600x380?text=Style+Guide',
    figmaUrl: ''
  }
]

const Designs = () => {
  const token = import.meta.env.VITE_FIGMA_TOKEN
  // If a token exists, start with empty list (no placeholders). Otherwise show fallback.
  const [designs, setDesigns] = React.useState(token ? [] : fallbackDesigns)
  const [status, setStatus] = React.useState(token ? 'loading' : 'idle') // idle | loading | ready | error
  const [err, setErr] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const modalRef = React.useRef(null)

  React.useEffect(() => {
  if (!token) return // keep fallback
    let cancelled = false
    const run = async () => {
      try {
        setStatus('loading')
        // 1. Get projects for the team
        const projRes = await fetch(`https://api.figma.com/v1/teams/${TEAM_ID}/projects`, { headers: { 'X-Figma-Token': token } })
        if (!projRes.ok) throw new Error('Projects request failed ' + projRes.status)
        const projJson = await projRes.json()
        const projects = projJson.projects || []
        // 2. For first few projects, get files
        const projectFilePromises = projects.slice(0, 4).map(async p => {
          const filesRes = await fetch(`https://api.figma.com/v1/projects/${p.id}/files`, { headers: { 'X-Figma-Token': token } })
          if (!filesRes.ok) throw new Error('Files request failed ' + filesRes.status)
          const filesJson = await filesRes.json()
          return (filesJson.files || []).map(f => ({
            projectName: p.name,
            title: f.name,
            key: f.key,
            lastModified: f.last_modified,
            thumbnail: f.thumbnail_url,
            figmaUrl: FIGMA_BASE_FILE_URL + f.key
          }))
        })
        const nested = await Promise.all(projectFilePromises)
        const flat = nested.flat()
          .sort((a,b) => new Date(b.lastModified) - new Date(a.lastModified))
          .slice(0, 12) // limit gallery
          .map(d => ({
            title: d.title,
            description: d.projectName + ' • Updated ' + new Date(d.lastModified).toLocaleDateString(),
            thumbnail: d.thumbnail || 'https://via.placeholder.com/600x380?text=No+Thumbnail',
            figmaUrl: d.figmaUrl
          }))
        if (cancelled) return
        if (flat.length) {
          setDesigns(flat)
          setStatus('ready')
        } else {
          setStatus('ready')
        }
      } catch (e) {
        if (cancelled) return
        setErr(e.message)
        // On error, show fallback designs if we currently have none.
        setStatus('error')
        setDesigns(prev => (prev.length ? prev : fallbackDesigns))
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  // Focus trap & ESC for modal
  React.useEffect(() => {
    if (!showModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') setShowModal(false)
      if (e.key === 'Tab') {
        const nodes = modalRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])') || []
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.activeElement
    setTimeout(() => {
      const first = modalRef.current?.querySelector('button, a[href]')
      ;(first || modalRef.current)?.focus()
    }, 0)
    return () => { document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus() }
  }, [showModal])

  const limitedDesigns = designs.slice(0, 4)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
  <section className="designs-section" id="designs" aria-labelledby="designs-heading" data-section>
      <h5 id="designs-heading">Designs</h5>
      {status === 'loading' && (
        <>
          <div className="designs-grid" role="list" aria-busy="true" aria-live="polite">
            {Array.from({ length: 4 }).map((_, idx) => (
              <article key={idx} className="design-card design-card--skeleton" role="listitem" aria-hidden="true">
                <div className="design-card__thumb-wrap">
                  <div className="skeleton skeleton-thumb" />
                </div>
                <div className="design-card__body">
                  <div className="skeleton skeleton-title" />
                  <div className="skeleton skeleton-text" />
                  <div className="skeleton skeleton-text short" />
                  <div className="skeleton skeleton-button" />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
      {status === 'error' && <p style={{color:'#ffb3c1', fontSize:'.75rem'}}>Could not load Figma designs: {err}</p>}
  <div className={"designs-grid " + (designs.length > 4 ? 'designs-grid--limited' : '')} role="list" aria-live="polite">
        {limitedDesigns.map(d => (
          <article key={d.title + d.thumbnail} className="design-card" role="listitem">
            <div className="design-card__thumb-wrap">
              <img loading="lazy" src={d.thumbnail} alt={d.title + ' thumbnail'} className="design-card__thumb" />
            </div>
            <div className="design-card__body">
              <h6 className="design-card__title">{d.title}</h6>
              <p className="design-card__description">{d.description}</p>
              {d.figmaUrl && (
                <a className="design-card__link" href={d.figmaUrl} target="_blank" rel="noopener noreferrer">Open in Figma</a>
              )}
            </div>
          </article>
        ))}
      </div>
      {designs.length > 4 && (
        <div className="designs-view-all-wrap">
          <button type="button" className="designs-view-all-btn" onClick={openModal} aria-haspopup="dialog" aria-expanded={showModal}>View All Designs</button>
        </div>
      )}
      {!token && (
        <p style={{marginTop:'1rem', fontSize:'.65rem', color:'#8c84a4'}}>Add VITE_FIGMA_TOKEN in a .env file to load live designs from your Figma team.</p>
      )}
      {showModal && (
        <div className="designs-modal-overlay" role="presentation" onClick={closeModal}>
          <div className="designs-modal" role="dialog" aria-modal="true" aria-labelledby="designs-modal-title" onClick={e => e.stopPropagation()} ref={modalRef} tabIndex={-1}>
            <div className="designs-modal__head">
              <h6 id="designs-modal-title">All Designs</h6>
              <button type="button" className="designs-modal__close" aria-label="Close" onClick={closeModal}>×</button>
            </div>
            <div className="designs-modal__body">
              <div className="designs-modal__grid" role="list">
                {designs.map(d => (
                  <article key={d.title + d.thumbnail + 'full'} className="design-card" role="listitem">
                    <div className="design-card__thumb-wrap">
                      <img loading="lazy" src={d.thumbnail} alt={d.title + ' thumbnail'} className="design-card__thumb" />
                    </div>
                    <div className="design-card__body">
                      <h6 className="design-card__title">{d.title}</h6>
                      <p className="design-card__description">{d.description}</p>
                      {d.figmaUrl && (
                        <a className="design-card__link" href={d.figmaUrl} target="_blank" rel="noopener noreferrer">Open in Figma</a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Designs
