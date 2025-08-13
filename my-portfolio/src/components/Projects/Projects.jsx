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
          .slice(0, 8) // limit displayed
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
        <div className="projects-grid" role="list">
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
      )}
    </section>
  )
}

export default Projects
