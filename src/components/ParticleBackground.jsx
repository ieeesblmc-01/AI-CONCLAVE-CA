import { useEffect, useRef } from 'react'
import './ParticleBackground.css'

export default function ParticleBackground() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId
        let particles = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        class Particle {
            constructor() { this.reset() }
            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 2 + 0.5
                this.speedX = (Math.random() - 0.5) * 0.4
                this.speedY = -(Math.random() * 0.3 + 0.1)
                this.life = 1
                this.decay = Math.random() * 0.003 + 0.001
                const hue = Math.random() > 0.5 ? 270 : 300
                this.color = `hsla(${hue}, 100%, 70%, `
            }
            update() {
                this.x += this.speedX
                this.y += this.speedY
                this.life -= this.decay
                if (this.life <= 0 || this.y < -10) this.reset()
            }
            draw() {
                ctx.save()
                ctx.globalAlpha = this.life
                if (!isMobile) {
                    ctx.shadowBlur = 8
                    ctx.shadowColor = '#c44eff'
                }
                ctx.fillStyle = this.color + this.life + ')'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }
        }

        // Stars background
        class Star {
            constructor() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.5 + 0.2
                this.opacity = Math.random() * 0.7 + 0.1
                this.twinkleSpeed = Math.random() * 0.02 + 0.005
                this.twinkleOffset = Math.random() * Math.PI * 2
            }
            draw(time) {
                const o = this.opacity * (0.5 + 0.5 * Math.sin(time * this.twinkleSpeed + this.twinkleOffset))
                ctx.save()
                ctx.globalAlpha = o
                ctx.fillStyle = '#ffffff'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }
        }

        const isMobile = window.innerWidth < 768
        const PARTICLE_COUNT = isMobile ? 30 : 120
        const STAR_COUNT = isMobile ? 60 : 200
        // Throttle canvas to 20fps on mobile, 60fps on desktop
        const FRAME_MS = isMobile ? 50 : 0
        let lastFrameTime = 0

        for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())
        const stars = Array.from({ length: STAR_COUNT }, () => new Star())
        let time = 0

        const animate = (timestamp) => {
            animId = requestAnimationFrame(animate)
            if (FRAME_MS && timestamp - lastFrameTime < FRAME_MS) return
            lastFrameTime = timestamp
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            time++
            stars.forEach(s => s.draw(time))
            particles.forEach(p => { p.update(); p.draw() })
        }
        animate(0)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <canvas ref={canvasRef} className="particle-canvas" />
}
