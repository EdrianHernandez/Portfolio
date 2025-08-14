import React, { useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'
import MobileNav from './MobileNav/MobileNav'
import { NAV_LINKS } from './navConfig'

const Navbar = ({ onOpenContact }) => {
    const [openMenu, setOpenMenu] = useState(false)
    const [active, setActive] = useState('hero')
    const navigate = useNavigate();
    const location = useLocation();

    const toggleMenu = () => setOpenMenu(o => !o)

    // Prevent body scroll when mobile nav open
    useEffect(() => {
        if (openMenu) {
            const prev = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = prev }
        }
    }, [openMenu])

    // IntersectionObserver scroll spy for section links
    useEffect(() => {
        if (location.pathname !== '/') return
        const sections = NAV_LINKS.filter(l => l.type === 'section')
            .map(l => document.getElementById(l.id))
            .filter(Boolean)
        if (!sections.length) return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id)
                }
            })
        }, { rootMargin: '-50% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] })
        sections.forEach(sec => observer.observe(sec))
        return () => observer.disconnect()
    }, [location.pathname])

    const scrollToId = useCallback((id) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [])

    const onLinkClick = (e, link) => {
        e.preventDefault()
        if (link.type === 'route') {
            navigate(link.to)
            setActive(link.id)
        } else {
            if (location.pathname !== '/') {
                navigate('/')
                setTimeout(() => scrollToId(link.id), 60)
            } else {
                scrollToId(link.id)
            }
        }
        if (openMenu) setOpenMenu(false)
    }

    const onHireClick = (e) => {
        e.preventDefault()
        if (typeof onOpenContact === 'function') {
            onOpenContact()
        } else {
            // Fallback: scroll to contact section if exists
            const link = { id: 'contact', label: 'Contact', type: 'section' }
            onLinkClick(e, link)
        }
    }

    return (
        <>
            <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} onOpenContact={onOpenContact} />

            <nav className="nav-wrapper">
                <div className="nav-content">
                    <h1 className="nav-title">Ed</h1>

                                        <ul role="menubar" aria-label="Primary">
                                                {NAV_LINKS.map(link => (
                                                        <li key={link.id} role="none">
                                                                <a
                                                                    role="menuitem"
                                                                    className={`menu-item ${active===link.id ? 'active' : ''}`}
                                                                    href={link.type==='route' ? link.to : `#${link.id}`}
                                                                    onClick={(e)=>onLinkClick(e, link)}
                                                                    aria-current={active===link.id ? 'page' : undefined}
                                                                >
                                                                    {link.label}
                                                                </a>
                                                        </li>
                                                ))}

                                        </ul>

                    <a
                        href="#contact"
                        className="hire-btn"
                        onClick={onHireClick}
                        aria-label="Hire me"
                    >
                        Hire me
                    </a>

                    <button className="menu-btn" onClick={toggleMenu}>
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "1.8rem" }}
                        >
                            {openMenu ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </nav>  
        </>
  )
}

export default Navbar