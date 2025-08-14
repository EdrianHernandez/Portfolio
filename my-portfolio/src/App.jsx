import React from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Contact from './components/Contact/Contact.jsx'
import Home from './pages/Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
