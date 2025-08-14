import React, { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
    const words = ["Design", "Develop", "Deliver"]; // rotating words
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000); // change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    const currentWord = words[index];
  return (
    <section className="hero-container" id="hero">
        <div className="hero-content">            
                        <h2 aria-live="polite">
                            <span key={currentWord} className="hero-rotating-word">{currentWord}</span> interfaces that inspire.
                        </h2>
            <p>
                I design and develop clean, scalable, and high-performing interfaces for the modern web.    
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
