import { useState } from 'react'
import './Advantages.css'

const advantages = [
    {
        icon: '🌐',
        title: 'Global Network',
        desc: 'Connect with AI professionals, researchers, and innovators from top institutions worldwide.',
        color: '#7b2fff',
    },
    {
        icon: '🏆',
        title: 'Exclusive Certification',
        desc: 'Earn a globally recognised AI Campus Ambassador certification to showcase leadership.',
        color: '#c44eff',
    },
    {
        icon: '🎤',
        title: 'Public Speaking',
        desc: 'Host workshops, panels, and talks to sharpen your communication and leadership skills.',
        color: '#ff44cc',
    },
    {
        icon: '🎁',
        title: 'Swag & Rewards',
        desc: 'Earn exclusive merchandise, vouchers, and prizes for top-performing ambassadors.',
        color: '#c44eff',
    },
    {
        icon: '📄',
        title: 'Resume Booster',
        desc: 'Stand out to recruiters with a prestigious ambassador role in one of India\'s leading AI summits.',
        color: '#ff44cc',
    },
    {
        icon: '💡',
        title: 'Startup Exposure',
        desc: 'Collaborate with Lourdian TBI and IEDC to bring your AI startup ideas to life.',
        color: '#c44eff',
    },
]

export default function Advantages() {
    const [hovered, setHovered] = useState(null)

    return (
        <section className="advantages-section" id="advantages">
            <div className="adv-bg-glow" />
            <div className="section-header">
                <span className="section-eyebrow">🌟 Why Join?</span>
                <h2 className="section-title gradient-text">Campus Ambassador Benefits</h2>
                <p className="section-sub">Unlock a world of opportunities by representing AI innovation on your campus</p>
            </div>

            <div className="adv-grid">
                {advantages.map((adv, i) => (
                    <div
                        className={`adv-card${hovered === i ? ' hovered' : ''}`}
                        key={adv.title}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        style={{ '--card-color': adv.color }}
                    >
                        <div className="adv-card-glow" />
                        <div className="adv-icon" style={{ background: `radial-gradient(circle, ${adv.color}30 0%, transparent 70%)` }}>
                            <span className="adv-emoji">{adv.icon}</span>
                        </div>
                        <h3 className="adv-title">{adv.title}</h3>
                        <p className="adv-desc">{adv.desc}</p>
                        <div className="adv-bar">
                            <div className="adv-bar-fill" style={{ background: adv.color }} />
                        </div>
                        <div className="adv-number">0{i + 1}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}
