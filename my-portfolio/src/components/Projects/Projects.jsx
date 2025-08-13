import React from 'react'
import './Projects.css'

// GitHub username to pull repositories from
const GITHUB_USER = 'EdrianHernandez'

// Helper: format repo name to a nicer title
const formatTitle = (name) => name.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

const Projects = () => {
  const [projects, setProjects] = React.useState([])
  const [status, setStatus] = React.useState('loading') // loading | ready | error
  const [errorMsg, setErrorMsg] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const modalRef = React.useRef(null)
  const triggerBtnRef = React.useRef(null)

  React.useEffect(() => {
    let cancelled = false
    const fetchRepos = async () => {
      try {
        setStatus('loading')
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
          headers: { 'Accept': 'application/vnd.github+json' }
        })
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`)
        }
        const data = await res.json()
        if (cancelled) return
        const transformed = data
          .filter(r => !r.fork) // skip forks
          .sort((a, b) => {
            // sort by stargazers then recent activity
            if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count
            return new Date(b.updated_at) - new Date(a.updated_at)
          })
          .map(r => ({
            title: formatTitle(r.name),
            description: r.description || 'No description provided.',
            tech: (r.topics && r.topics.length ? r.topics.slice(0,5) : [r.language].filter(Boolean)) || [],
            link: r.html_url
          }))
        setProjects(transformed)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setErrorMsg(e.message)
        setStatus('error')
      }
    }
    fetchRepos()
    return () => { cancelled = true }
  }, [])

  // Handle ESC close & focus management
  React.useEffect(() => {
    if (!showModal) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowModal(false)
      }
      // basic focus trap
      if (e.key === 'Tab') {
        const focusable = modalRef.current?.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])') || []
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prevActive = document.activeElement
    // focus modal container or first focusable
    setTimeout(() => {
      const firstFocusable = modalRef.current?.querySelector('button, a[href]')
      ;(firstFocusable || modalRef.current)?.focus()
    }, 0)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (prevActive && prevActive.focus) prevActive.focus()
    }
  }, [showModal])

  const displayedProjects = projects.slice(0, 6) // limit grid to 3 x 2

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <h5 id="projects-heading">Projects</h5>
      {status === 'loading' && (
        <p style={{ color: '#b9b4c8', fontSize: '.85rem' }}>Fetching repositories...</p>
      )}
      {status === 'error' && (
        <p style={{ color: '#ffb3c1', fontSize: '.8rem' }}>Could not load repositories. {errorMsg}</p>
      )}
      {status === 'ready' && (
        <>
          <div className="projects-grid" role="list">
            {displayedProjects.map(project => (
              <article key={project.title} className="project-card" role="listitem">
                <header className="project-card__header">
                  <h6 className="project-card__title">{project.title}</h6>
                </header>
                <p className="project-card__description">{project.description}</p>
                {project.tech.length > 0 && (
                  <ul className="project-card__tech" aria-label="Technologies / topics">
                    {project.tech.map(t => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {project.link && (
                  <a className="project-card__link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} repository`}>
                    View
                  </a>
                )}
              </article>
            ))}
          </div>
          {projects.length > 6 && (
            <div className="projects-view-all-wrap">
              <button
                ref={triggerBtnRef}
                type="button"
                className="projects-view-all-btn"
                onClick={openModal}
                aria-haspopup="dialog"
                aria-expanded={showModal}
              >
                View All Projects
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="projects-modal-overlay" role="presentation" onClick={closeModal}>
          <div
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            onClick={e => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
          >
            <div className="projects-modal__head">
              <h6 id="projects-modal-title">All Projects</h6>
              <button type="button" className="projects-modal__close" aria-label="Close" onClick={closeModal}>×</button>
            </div>
            <div className="projects-modal__body">
              <div className="projects-modal__grid" role="list">
                {projects.map(project => (
                  <article key={project.title} className="project-card" role="listitem">
                    <header className="project-card__header">
                      <h6 className="project-card__title">{project.title}</h6>
                    </header>
                    <p className="project-card__description">{project.description}</p>
                    {project.tech.length > 0 && (
                      <ul className="project-card__tech" aria-label="Technologies / topics">
                        {project.tech.map(t => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    {project.link && (
                      <a className="project-card__link" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} repository`}>
                        View
                      </a>
                    )}
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

export default Projects
