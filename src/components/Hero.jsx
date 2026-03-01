import './Hero.css'
import ParticleBackground from './ParticleBackground'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const typewriterWords = ['Campus Ambassador', 'AI Innovator', 'Change Maker', 'Future Leader']

export default function Hero() {
    const [wordIdx, setWordIdx] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [rings, setRings] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const word = typewriterWords[wordIdx]
        let timeout
        if (!deleting) {
            if (displayed.length < word.length) {
                timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
            } else {
                timeout = setTimeout(() => setDeleting(true), 1800)
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
            } else {
                setDeleting(false)
                setWordIdx(i => (i + 1) % typewriterWords.length)
            }
        }
        return () => clearTimeout(timeout)
    }, [displayed, deleting, wordIdx])

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()
        setRings(r => [...r, { id, x, y }])
        setTimeout(() => setRings(r => r.filter(r => r.id !== id)), 1000)
    }

    return (
        <section className="hero" id="about" onClick={handleClick}>
            {rings.map(r => (
                <span key={r.id} className="click-ring" style={{ left: r.x, top: r.y }} />
            ))}
            <div className="orb orb1" />
            <div className="orb orb2" />
            <div className="orb orb3" />
            <div className="scanline" />
            <div className="grid-overlay" />

            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-dot" />
                    WE ARE LIVE
                </div>

                <h1 className="hero-title">
                    <span className="hero-line1">GLOBAL SUMMIT ON</span>
                    <span className="hero-line2 gradient-text">ARTIFICIAL</span>
                    <span className="hero-line3 gradient-text">INTELLIGENCE</span>
                </h1>

                <div className="hero-sub">
                    <span className="hero-sub-label">Campus Ambassador Program</span>
                </div>

                <div className="typewriter-container">
                    <span className="typewriter-prefix">Register as an </span>
                    <span className="typewriter-text">{displayed}</span>
                    <span className="typewriter-cursor">|</span>
                </div>

                {/* Floating statue silhouette */}
                <div className="statue-art">
                    <div className="statue-glow" />
                    <svg className="statue-svg" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="100" cy="80" rx="45" ry="55" fill="none" stroke="rgba(196,78,255,0.4)" strokeWidth="1.5" />
                        <ellipse cx="100" cy="78" rx="52" ry="62" fill="none" stroke="rgba(123,47,255,0.2)" strokeWidth="1" />
                        <rect x="65" y="68" width="70" height="28" rx="8" fill="rgba(30,10,60,0.8)" stroke="rgba(196,78,255,0.8)" strokeWidth="1.5" />
                        <rect x="72" y="72" width="26" height="18" rx="4" fill="rgba(123,47,255,0.3)" stroke="rgba(196,78,255,0.5)" strokeWidth="1" />
                        <rect x="102" y="72" width="26" height="18" rx="4" fill="rgba(123,47,255,0.3)" stroke="rgba(196,78,255,0.5)" strokeWidth="1" />
                        <line x1="65" y1="80" x2="55" y2="80" stroke="rgba(196,78,255,0.6)" strokeWidth="1.5" />
                        <line x1="135" y1="80" x2="145" y2="80" stroke="rgba(196,78,255,0.6)" strokeWidth="1.5" />
                        <path d="M72 130 Q100 160 128 130" fill="none" stroke="rgba(180,120,255,0.4)" strokeWidth="2" />
                        <path d="M80 145 Q100 175 120 145" fill="none" stroke="rgba(180,120,255,0.3)" strokeWidth="1.5" />
                        <path d="M60 200 L50 290 L150 290 L140 200 Z" fill="none" stroke="rgba(123,47,255,0.3)" strokeWidth="1.5" />
                        <path d="M55 240 Q100 250 145 240" fill="none" stroke="rgba(123,47,255,0.2)" strokeWidth="1" />
                        <path d="M70 160 Q85 155 90 170 Q95 185 80 185" fill="none" stroke="rgba(196,78,255,0.4)" strokeWidth="1.5" />
                        <circle cx="78" cy="81" r="3" fill="rgba(196,78,255,0.6)">
                            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="122" cy="81" r="3" fill="rgba(196,78,255,0.6)">
                            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.3s" repeatCount="indefinite" />
                        </circle>
                        <path d="M155 60 L148 78 L154 78 L147 95" stroke="#c44eff" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                </div>

                <div className="hero-actions">
                    <button className="btn-primary" onClick={() => navigate('/register')} id="hero-register-btn">
                        <span className="btn-glow" />
                        <span className="btn-text">⚡ Register Now</span>
                    </button>
                    <button className="btn-secondary" onClick={() => navigate('/benefits')}>
                        Explore Benefits
                    </button>
                </div>
            </div>

            <div className="scroll-indicator" onClick={() => navigate('/benefits')} style={{ cursor: 'pointer', opacity: 0.7 }}>
                <span>Explore</span>
                <div className="scroll-line" />
            </div>
        </section>
    )
}
