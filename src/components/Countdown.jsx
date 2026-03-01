import { useState, useEffect, useRef } from 'react'
import './Countdown.css'

// ✏️ EDIT HERE — Change this date to the actual registration deadline
// Format: 'YYYY-MM-DDTHH:MM:SS+05:30'  (IST = +05:30)
const DEADLINE = new Date('2026-03-06T23:59:59+05:30')

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

export default function Countdown() {
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
        <section className="countdown-section" id="countdown">
            <div className="section-header">
                <span className="section-eyebrow">⏳ Registration Closes Soon</span>
                <h2 className="section-title gradient-text">Apply Before It's Too Late</h2>
                <p className="section-sub">
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
    )
}
