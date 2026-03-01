import './Footer.css'

export default function Footer() {
    const orgs = [
        { name: 'Lourdes Matha Group of Institutions', color: '#f0d060' },
        { name: 'Lourdian TBI', color: '#c44eff' },
        { name: 'InnovateX', color: '#f7c948' },
        { name: 'GDG LMCST', color: '#4285F4' },
        { name: 'IEDC Kerala Startup Mission', color: '#00e5ff' },
        { name: 'µLearn LMCST', color: '#ff6b9d' },
        { name: 'LMCST IEEE Student Branch', color: '#0080ff' },
        { name: 'IEEE', color: '#0066cc' },
    ]

    return (
        <footer className="footer">
            <div className="footer-top-line" />

            <div className="footer-logos">
                {orgs.map(o => (
                    <div className="footer-org" key={o.name}>
                        <div className="footer-org-dot" style={{ background: o.color, boxShadow: `0 0 8px ${o.color}` }} />
                        <span className="footer-org-name">{o.name}</span>
                    </div>
                ))}
            </div>

            <div className="footer-divider" />

            <div className="footer-bottom">
                <div className="footer-event">
                    <span className="footer-event-name gradient-text">Global Summit on Artificial Intelligence</span>
                    <span className="footer-event-sub">Campus Ambassador Program · 2026</span>
                </div>
            </div>
        </footer>
    )
}
