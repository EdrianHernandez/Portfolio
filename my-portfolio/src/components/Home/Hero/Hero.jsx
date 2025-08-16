import React, { useEffect, useState } from 'react'
import './Hero.css'

const Hero = () => {
    const words = ["Design", "Develop", "Deliver"]; // rotating words
    const [index, setIndex] = useState(0);
    const heroSrc = `${import.meta.env.BASE_URL}assets/hero_img.jpg`;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2000); // change every 2 seconds
        return () => clearInterval(interval);
    }, []);

    // Preload the above-the-fold hero image to improve LCP
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = heroSrc;
        // fetchpriority is supported in Chromium-based browsers
        // @ts-ignore - not all TS DOM lib versions include this prop
        link.fetchpriority = 'high';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, [heroSrc]);

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
                    <img
                        src={heroSrc}
                        alt="Portrait of Edrian"
                        width={332}
                        height={400}
                        sizes="(max-width: 600px) 260px, 332px"
                        loading="eager"
                        decoding="sync"
                        fetchpriority="high"
                        onLoad={(e) => e.currentTarget.classList.add('loaded')}
                    />
                </div>
                <div className="tech-icon react-icon">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/icons8-react-24.png`}
                        alt="React"
                        width={45}
                        height={45}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>

            <div className="tech-stack">
                <div className="tech-icon">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/icons8-html-48.png`}
                        alt="HTML"
                        width={50}
                        height={50}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="tech-icon">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/icons8-css-48.png`}
                        alt="CSS"
                        width={50}
                        height={50}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="tech-icon">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/icons8-javascript-48.png`}
                        alt="JavaScript"
                        width={50}
                        height={50}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero
