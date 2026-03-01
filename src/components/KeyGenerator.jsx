import { useState, useRef } from 'react'
import './KeyGenerator.css'

function generateKey(name, college) {
    const n = name.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X')
    const c = college.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X')
    const num = String(Math.floor(1000 + Math.random() * 9000))
    return `${n}${c}${num}`
}

export default function KeyGenerator() {
    const [name, setName] = useState('')
    const [college, setCollege] = useState('')
    const [key, setKey] = useState('')
    const [animating, setAnimating] = useState(false)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')
    const keyRef = useRef(null)

    const handleGenerate = () => {
        if (!name.trim() || name.trim().length < 2) {
            setError('Please enter at least 2 characters for your name.')
            return
        }
        if (!college.trim() || college.trim().length < 2) {
            setError('Please enter at least 2 characters for your college name.')
            return
        }
        setError('')
        setAnimating(true)
        setKey('')
        setTimeout(() => {
            setKey(generateKey(name, college))
            setAnimating(false)
        }, 600)
    }

    const handleCopy = () => {
        if (!key) return
        navigator.clipboard.writeText(key)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const keyChars = key ? key.split('') : []

    return (
        <section className="keygen-section" id="keygen">
            <div className="keygen-bg-glow" />

            <div className="section-header">
                <span className="section-eyebrow">🔑 Your Identity</span>
                <h2 className="section-title gradient-text">Generate Your Ambassador Key</h2>
                <p className="section-sub">
                    Your unique 8-character key is formed from your name, college, and a random ID •
                    <span className="key-format"> [2-letter Name] + [2-letter College] + [4-digit Code]</span>
                </p>
            </div>

            <div className="keygen-card glass-card">
                <div className="keygen-formula">
                    <div className="formula-part">
                        <span className="formula-sample">RA</span>
                        <span className="formula-desc">Name (2)</span>
                    </div>
                    <span className="formula-plus">+</span>
                    <div className="formula-part">
                        <span className="formula-sample">LM</span>
                        <span className="formula-desc">College (2)</span>
                    </div>
                    <span className="formula-plus">+</span>
                    <div className="formula-part">
                        <span className="formula-sample">4729</span>
                        <span className="formula-desc">Random (4)</span>
                    </div>
                    <span className="formula-eq">=</span>
                    <div className="formula-part">
                        <span className="formula-sample formula-result gradient-text">RALM4729</span>
                        <span className="formula-desc">Your Key</span>
                    </div>
                </div>

                <div className="keygen-inputs">
                    <div className="input-group">
                        <label className="input-label" htmlFor="kg-name">Full Name</label>
                        <input
                            id="kg-name"
                            className="kg-input"
                            type="text"
                            placeholder="e.g. Rahul Menon"
                            value={name}
                            onChange={e => { setName(e.target.value); setError('') }}
                            maxLength={50}
                        />
                        <span className="input-preview">Preview: <strong>{name ? name.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X') : 'XX'}</strong></span>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="kg-college">College Name</label>
                        <input
                            id="kg-college"
                            className="kg-input"
                            type="text"
                            placeholder="e.g. Lourdes Matha CST"
                            value={college}
                            onChange={e => { setCollege(e.target.value); setError('') }}
                            maxLength={80}
                        />
                        <span className="input-preview">Preview: <strong>{college ? college.replace(/\s+/g, '').toUpperCase().slice(0, 2).padEnd(2, 'X') : 'XX'}</strong></span>
                    </div>
                </div>

                {error && <p className="kg-error">⚠ {error}</p>}

                <button
                    className="kg-btn"
                    onClick={handleGenerate}
                    disabled={animating}
                    id="generate-key-btn"
                >
                    {animating ? (
                        <span className="kg-spinner" />
                    ) : (
                        <>⚡ Generate My Key</>
                    )}
                </button>

                {(key || animating) && (
                    <div className={`key-display${animating ? ' animating' : ''}`}>
                        <div className="key-label">Your Ambassador Key</div>
                        <div className="key-chars">
                            {animating ? (
                                [...Array(8)].map((_, i) => (
                                    <span key={i} className="key-char scramble">
                                        {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                                    </span>
                                ))
                            ) : (
                                keyChars.map((ch, i) => (
                                    <span
                                        key={i}
                                        className={`key-char${i < 4 ? ' key-alpha' : ' key-num'}`}
                                        style={{ animationDelay: `${i * 0.06}s` }}
                                    >
                                        {ch}
                                    </span>
                                ))
                            )}
                        </div>

                        {key && (
                            <>
                                <div className="key-breakdown">
                                    <span className="key-seg seg-name" title="Name initials">{key.slice(0, 2)}</span>
                                    <span className="key-seg-label">Name</span>
                                    <span className="key-sep">·</span>
                                    <span className="key-seg seg-college" title="College initials">{key.slice(2, 4)}</span>
                                    <span className="key-seg-label">College</span>
                                    <span className="key-sep">·</span>
                                    <span className="key-seg seg-num" title="Random ID">{key.slice(4)}</span>
                                    <span className="key-seg-label">ID</span>
                                </div>

                                <button className="copy-btn" onClick={handleCopy} id="copy-key-btn">
                                    {copied ? '✅ Copied!' : '📋 Copy Key'}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
}
