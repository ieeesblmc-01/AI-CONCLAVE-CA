import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Advantages from './components/Advantages'
import RegisterPage from './components/RegisterPage'
import Footer from './components/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Skip custom cursor logic on touch/mobile devices (no hover support)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    const over = (e) => {
      const t = e.target.closest('a, button, [role="button"], input, .adv-card, .nav-logo')
      setHovering(!!t)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className={`cursor-ring${hovering ? ' hovered' : ''}`} ref={ringRef} />

      <ParticleBackground />
      <Navbar />
      <ScrollToTop />

      <main>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/benefits" element={<BenefitsPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

function BenefitsPage() {
  return (
    <div className="page-wrapper">
      <div className="orb orb1" style={{ position: 'fixed' }} />
      <div className="orb orb2" style={{ position: 'fixed' }} />
      <div className="grid-overlay" style={{ position: 'fixed' }} />
      <Advantages />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppInner />
    </BrowserRouter>
  )
}
