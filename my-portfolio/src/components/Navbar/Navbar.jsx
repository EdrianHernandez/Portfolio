import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
    <nav className="nav-wrapper">
        <div className="nav-content">
            <h1 className="nav-title">Ed</h1>

            <ul>
                <li>
                    <a className="menu-item">Home</a>
                </li>
                <li>
                    <a className="menu-item">Skills</a>
                </li>
                <li>
                    <a className="menu-item">Projects</a>
                </li>
                <li>
                    <a className="menu-item">Contact Me</a>
                </li>

                <button className="contact-btn" onClick={() => {}}>
                    Hire Me
                </button>
            </ul>

            <button className="menu-btn" onClick={() => {}}>
                <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "1.8rem" }}
                >
                    menu
                </span>
            </button>
        </div>
    </nav>  
    </>
  )
}

export default Navbar