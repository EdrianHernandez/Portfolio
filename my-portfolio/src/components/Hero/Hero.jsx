import React from 'react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero-container">
        <div className="hero-content">            
            <h2>Crafting Modern Web Experiences</h2>
            <p>
                Frontend Developer specializing in React | Turning creative ideas into 
                elegant, high-performance digital solutions
            </p>
        </div>

        <div className="hero-img">
            <div className="profile-container">
                <div className="profile-img">
                    <img src="/assets/hero_img.jpg" alt="Profile" />
                </div>
                <div className="tech-icon react-icon">
                    <img src="/assets/icons8-react-24.png" alt="React" />
                </div>
            </div>

            <div className="tech-stack">
                <div className="tech-icon">
                    <img src="/assets/icons8-html-48.png" alt="HTML" />
                </div>
                <div className="tech-icon">
                    <img src="/assets/icons8-css-48.png" alt="CSS" />
                </div>
                <div className="tech-icon">
                    <img src="/assets/icons8-javascript-48.png" alt="JavaScript" />
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero