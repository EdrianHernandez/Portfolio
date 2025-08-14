import React from 'react'
import Hero from '../components/Hero/Hero.jsx'
import Skills from '../components/Skills/Skills.jsx'
import Projects from '../components/Projects/Projects.jsx'
import Designs from '../components/Designs/Designs.jsx'

const Home = () => {
  return (
    <div className="container">
      <Hero />
      <Skills />
      <Projects />
      <Designs />
    </div>
  )
}

export default Home
