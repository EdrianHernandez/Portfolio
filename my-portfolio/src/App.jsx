import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Hero from './components/Hero/Hero.jsx'
import Skills from './components/Skills/Skills.jsx'
import Projects from './components/Projects/Projects.jsx'
import Designs from './components/Designs/Designs.jsx'
import Contact from './components/Contact/Contact.jsx'

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <Skills />
  <Projects />
  <Designs />
  <Contact />
      </div>
    </>
  )
}

export default App
