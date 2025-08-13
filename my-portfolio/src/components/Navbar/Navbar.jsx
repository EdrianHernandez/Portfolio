import React, { useEffect } from 'react'
import { useState } from 'react';
import './Navbar.css'
import MobileNav from './MobileNav/MobileNav';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [active, setActive] = useState('hero');

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    };

    // Scroll spy to update active link
    useEffect(() => {
        const sectionIds = ['hero','skills','projects','designs','contact'];
        const handler = () => {
            const scrollPos = window.scrollY + 120; // offset for navbar
            let current = 'hero';
            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                }
            }
            setActive(current);
        };
        window.addEventListener('scroll', handler, { passive: true });
        handler();
        return () => window.removeEventListener('scroll', handler);
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActive(id);
            if (openMenu) setOpenMenu(false);
        }
    };

    return (
        <>
            <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />

            <nav className="nav-wrapper">
                <div className="nav-content">
                    <h1 className="nav-title">Ed</h1>

                    <ul>
                        <li>
                            <a className={`menu-item ${active==='hero' ? 'active' : ''}`} href="#hero" onClick={(e)=>handleNavClick(e,'hero')}>Home</a>
                        </li>
                        <li>
                            <a className={`menu-item ${active==='skills' ? 'active' : ''}`} href="#skills" onClick={(e)=>handleNavClick(e,'skills')}>Skills</a>
                        </li>
                        <li>
                            <a className={`menu-item ${active==='projects' ? 'active' : ''}`} href="#projects" onClick={(e)=>handleNavClick(e,'projects')}>Projects</a>
                        </li>
                        <li>
                            <a className={`menu-item ${active==='designs' ? 'active' : ''}`} href="#designs" onClick={(e)=>handleNavClick(e,'designs')}>Designs</a>
                        </li>
                        <li>
                            <a className={`menu-item ${active==='contact' ? 'active' : ''}`} href="#contact" onClick={(e)=>handleNavClick(e,'contact')}>Contact Me</a>
                        </li>

                        <button className="contact-btn" onClick={() => {}}>
                            Hire Me
                        </button>
                    </ul>

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