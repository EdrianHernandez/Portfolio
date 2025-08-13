import React from 'react';
import './MobileNav.css';

const MobileNav = ({isOpen, toggleMenu}) => {
    const stop = (e) => e.stopPropagation();
    return (
        <>
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-hidden={!isOpen} role="dialog" aria-label="Mobile navigation menu">
                <div className="mobile-menu-container" onClick={stop}>
                    <button className="mobile-close-btn" aria-label="Close menu" onClick={toggleMenu}>✕</button>
                    <h1 className="mobile-nav-title">Ed</h1>
                    <ul>
                        <li><a className="menu-item" href="#hero" onClick={toggleMenu}>Home</a></li>
                        <li><a className="menu-item" href="#skills" onClick={toggleMenu}>Skills</a></li>
                        <li><a className="menu-item" href="#projects" onClick={toggleMenu}>Projects</a></li>
                        <li><a className="menu-item" href="#designs" onClick={toggleMenu}>Designs</a></li>
                        <li><a className="menu-item" href="#contact" onClick={toggleMenu}>Contact Me</a></li>
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