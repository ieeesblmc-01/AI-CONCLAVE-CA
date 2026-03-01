import { useState, useEffect, useRef } from 'react'
import './Countdown.css'

// ✏️ EDIT HERE — Change this date to the actual registration deadline
// Format: 'YYYY-MM-DDTHH:MM:SS+05:30'  (IST = +05:30)
const DEADLINE = new Date('2026-03-06T23:59:59+05:30')

// ✏️ EDIT HERE — Paste your Google Form link below
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfjk0_yd1RwVwASp5RskyBCpZHbrmbLiYHNmOxLhMvP9uvThw/viewform?usp=publish-editor'

function formatUnit(val) {
    return String(val).padStart(2, '0')
}

function TimeUnit({ value, label, prevValue }) {
    const changed = value !== prevValue
    return (
        <div className="time-unit">
            <div className={`time-card${changed ? ' flip' : ''}`}>
                <div className="time-number">{formatUnit(value)}</div>
                <div className="time-shine" />
            </div>
            <span className="time-label">{label}</span>
        </div>
    )
}

export default function RegisterPage() {
    const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    const [prev, setPrev] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const tick = () => {
            const now = new Date()
            const diff = Math.max(0, DEADLINE - now)
            const totalSecs = Math.floor(diff / 1000)
            const next = {
                days: Math.floor(totalSecs / 86400),
                hours: Math.floor((totalSecs % 86400) / 3600),
                minutes: Math.floor((totalSecs % 3600) / 60),
                seconds: totalSecs % 60,
            }
            setPrev(t => ({ ...t }))
            setTime(next)
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    const units = [
        { key: 'days', label: 'DAYS' },
        { key: 'hours', label: 'HRS' },
        { key: 'minutes', label: 'MINS' },
        { key: 'seconds', label: 'SECS' },
    ]

    return (
        <div className="register-page">
            <div className="orb orb1" style={{ position: 'fixed' }} />
            <div className="orb orb2" style={{ position: 'fixed' }} />
            <div className="grid-overlay" style={{ position: 'fixed' }} />

            {/* ─── Countdown ─── */}
            <section className="countdown-section">
                <div className="section-header">
                    <span className="section-eyebrow">⏳ Registration Closes Soon</span>
                    <h2 className="section-title gradient-text">Apply Before It's Too Late</h2>
                    <p className="section-sub">
                        {/* ✏️ EDIT HERE — Update the deadline text shown to users if the date changes */}
                        Campus Ambassador registrations close <strong style={{ color: 'var(--violet)' }}>this Friday</strong> — secure your spot now!
                    </p>
                </div>

                <div className="countdown-grid">
                    {units.map((u, i) => (
                        <div key={u.key} className="countdown-unit-wrapper">
                            <TimeUnit value={time[u.key]} prevValue={prev[u.key]} label={u.label} />
                            {i < units.length - 1 && <span className="time-sep">:</span>}
                        </div>
                    ))}
                </div>

                <div className="countdown-footer-text">
                    <span className="pulse-dot" />
                    {/* ✏️ EDIT HERE — Update the displayed deadline date text */}
                    CA Registration deadline: <strong>Friday, March 6, 2026</strong>
                </div>
            </section>

            {/* ─── Divider ─── */}
            <div className="reg-section-divider">
                <span className="divider-line" />
                <span className="divider-icon">📝</span>
                <span className="divider-line" />
            </div>

            {/* ─── Register ─── */}
            <section className="register-section" id="register">
                <div className="register-glow-ring" />
                <div className="register-glow-ring register-glow-ring2" />

                <div className="register-content">
                    <span className="register-eyebrow">📋 Applications Open Now</span>
                    <h2 className="register-title gradient-text">Register as a Campus Ambassador</h2>
                    <p className="register-desc">
                        Fill out the Google Form to officially apply for the CA program at your campus.<br />
                        <strong>Registration closes this Friday</strong> — limited spots available!
                    </p>

                    <a
                        href={GOOGLE_FORM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="register-btn"
                        id="main-register-btn"
                    >
                        <span className="register-btn-glow" />
                        <span className="register-btn-icon">📝</span>
                        <span className="register-btn-text">Register on Google Form</span>
                        <span className="register-btn-arrow">→</span>
                    </a>

                    <p className="register-note">Free registration · Limited spots · Closes Friday</p>
                </div>
            </section>
        </div>
    )
}
