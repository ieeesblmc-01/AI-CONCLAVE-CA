import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

// Real PNG logos from assets/logo
import logo1 from '../assets/logo/1.png'            // GSAI
import logo4 from '../assets/logo/4.png'            // LMCST Trivandrum
import logo6 from '../assets/logo/6.png'            // LMCST IEEE
import logo10 from '../assets/logo/10.png'           // GDG LMCST
import logo15 from '../assets/logo/15.png'           // µLearn LMCST
import logoLMCST2 from '../assets/logo/lmcst.png'
import logoIEEE from '../assets/logo/IEEE_MB_white_RGB_72ppi.png'
import logoKSUM from '../assets/logo/ksumiedcsquarefullwhite.png'

const logos = [
    { name: 'InnovateX', src: logo1 },
    { name: 'LMCST', src: logo4 },
    { name: 'LMCST', src: logoLMCST2 },
    { name: 'LMCST IEEE', src: logo6 },
    { name: 'GDG LMCST', src: logo10 },
    { name: 'µLearn LMCST', src: logo15 },
    { name: 'IEEE', src: logoIEEE },
    { name: 'KSUM IEDC', src: logoKSUM },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => setMenuOpen(prev => !prev)
    const closeMenu = () => setMenuOpen(false)

    return (
        <nav className="navbar scrolled">
            <div className="nav-inner">
                {/* Left logos */}
                <div className="nav-logos-left">
                    {logos.slice(0, 4).map(l => (
                        <div className="nav-logo" key={l.name} title={l.name}>
                            <img src={l.src} alt={l.name} className="nav-logo-img" />
                        </div>
                    ))}
                </div>

                {/* Center title */}
                <div className="nav-title">
                    <span className="nav-event-label">Global Summit on</span>
                    <NavLink to="/" className="nav-ai-label gradient-text" style={{ textDecoration: 'none' }}>
                        Artificial Intelligence
                    </NavLink>
                </div>

                {/* Right logos */}
                <div className="nav-logos-right">
                    {logos.slice(4).map(l => (
                        <div className="nav-logo" key={l.name} title={l.name}>
                            <img src={l.src} alt={l.name} className="nav-logo-img" />
                        </div>
                    ))}
                </div>

                {/* Hamburger button (mobile) */}
                <button
                    className={`hamburger${menuOpen ? ' open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Desktop nav links */}
                <div className="nav-page-links desktop-only">
                    <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} end>Home</NavLink>
                    <NavLink to="/benefits" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Benefits</NavLink>
                    <NavLink to="/register" className={({ isActive }) => 'nav-link nav-link-cta' + (isActive ? ' active' : '')}>Register</NavLink>
                </div>
            </div>

            {/* Mobile dropdown menu */}
            <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
                {/* Logos row inside mobile menu */}
                <div className="mobile-logo-strip">
                    {logos.map(l => (
                        <div className="mobile-logo-item" key={l.name} title={l.name}>
                            <img src={l.src} alt={l.name} className="mobile-logo-img" />
                        </div>
                    ))}
                </div>
                <div className="mobile-menu-divider" />
                <NavLink to="/" className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' active' : '')} end onClick={closeMenu}>🏠 Home</NavLink>
                <NavLink to="/benefits" className={({ isActive }) => 'mobile-nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>🌟 Benefits</NavLink>
                <NavLink to="/register" className={({ isActive }) => 'mobile-nav-link mobile-nav-cta' + (isActive ? ' active' : '')} onClick={closeMenu}>🚀 Register</NavLink>
            </div>
        </nav>
    )
}
