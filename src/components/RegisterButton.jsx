import './RegisterButton.css'

// Replace with your actual Google Form link
const GOOGLE_FORM_URL = 'https://forms.gle/YOUR_GOOGLE_FORM_LINK_HERE'

export default function RegisterButton() {
    return (
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
    )
}
