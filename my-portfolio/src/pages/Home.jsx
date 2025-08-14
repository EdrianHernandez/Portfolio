import React from 'react'
import Hero from '../components/Home/Hero/Hero.jsx'
import Skills from '../components/Home/Skills/Skills.jsx'
import Projects from '../components/Home/Projects/Projects.jsx'
import Designs from '../components/Home/Designs/Designs.jsx'

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
