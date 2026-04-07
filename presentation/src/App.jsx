import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { t as translations } from './translations'
import {
  S01Hero, S02Pain, S03Target, S04Claude, S05Perf, S06Flow,
  S07Lab, S08MCP, S09Skills, S10Transform, S11Modules,
  S12Project, S13Requirements, S14Instructor, S15Team,
} from './slides/index'

const SLIDES = [
  S01Hero, S02Pain, S03Target, S04Claude, S05Perf, S06Flow,
  S07Lab, S08MCP, S09Skills, S10Transform, S11Modules,
  S12Project, S13Requirements, S14Instructor, S15Team,
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } }),
}

export default function App() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lang, setLang] = useState('es')

  const tr = translations[lang]

  const goNext = useCallback(() => {
    if (current < SLIDES.length - 1) {
      setDirection(1)
      setCurrent(c => c + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent(c => c - 1)
    }
  }, [current])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const SlideComponent = SLIDES[current]

  return (
    <div className="presentation">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1.5rem',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(255,255,255,0.6)',
          backdropFilter: 'blur(12px)',
          padding: '0.75rem 1.5rem',
          borderRadius: '16px',
          border: '1px solid rgba(16,185,129,0.15)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src="https://performance360latam.com/images/Perf360LogoBlack.png"
          alt="Performance360"
          style={{
            height: 72,
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Language toggle */}
      <div className="lang-toggle">
        {['es', 'en'].map(l => (
          <button key={l} className={`lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Slides */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ position: 'absolute', inset: 0 }}
        >
          <SlideComponent tr={tr} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <nav className="nav">
        <button className="nav-btn" onClick={goPrev} disabled={current === 0} aria-label="Previous">‹</button>
        <div className="nav-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`nav-dot ${i === current ? 'active' : ''}`}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="nav-btn" onClick={goNext} disabled={current === SLIDES.length - 1} aria-label="Next">›</button>
        <span className="slide-counter">{current + 1} / {SLIDES.length}</span>
      </nav>
    </div>
  )
}
