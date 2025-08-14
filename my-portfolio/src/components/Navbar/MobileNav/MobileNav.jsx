import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MobileNav.css';

const MobileNav = ({isOpen, toggleMenu}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const goSection = (e, id) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(()=>{
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        toggleMenu();
    }
    const goContact = (e) => { e.preventDefault(); navigate('/contact'); toggleMenu(); }
    const stop = (e) => e.stopPropagation();
    return (
        <>
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-hidden={!isOpen} role="dialog" aria-label="Mobile navigation menu">
                <div className="mobile-menu-container" onClick={stop}>
                    <button className="mobile-close-btn" aria-label="Close menu" onClick={toggleMenu}>✕</button>
                    <h1 className="mobile-nav-title">Ed</h1>
                    <ul>
                        <li><a className="menu-item" href="#hero" onClick={(e)=>goSection(e,'hero')}>Home</a></li>
                        <li><a className="menu-item" href="#skills" onClick={(e)=>goSection(e,'skills')}>Skills</a></li>
                        <li><a className="menu-item" href="#projects" onClick={(e)=>goSection(e,'projects')}>Projects</a></li>
                        <li><a className="menu-item" href="#designs" onClick={(e)=>goSection(e,'designs')}>Designs</a></li>
                        <li><a className="menu-item" href="/contact" onClick={goContact}>Contact Me</a></li>
                        <li>
                            <button className="contact-btn" onClick={() => {}}>
                                Hire Me
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MobileNav