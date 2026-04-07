import { motion } from 'framer-motion'

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }
const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }

export default function S01Hero({ tr }) {
  const t = tr.hero
  return (
    <div className="slide" style={{ textAlign: 'center' }}>
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="bg-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', top: '20%', right: '10%' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 800, zIndex: 1 }}>
        <motion.div variants={item}>
          <span className="badge badge-primary" style={{ marginBottom: '1.5rem' }}>{t.label}</span>
        </motion.div>

        <motion.h1 variants={item} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          <span className="gradient-text">Claude Code</span>
          <br />
          <span style={{ color: 'var(--text)' }}>for Performance Tester</span>
        </motion.h1>

        <motion.p variants={item} style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 2.5rem' }}>
          {t.subtitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <span className="badge badge-green">{t.tag1}</span>
          <span className="badge badge-orange">{t.tag2}</span>
          <span className="badge badge-red">{t.tag3}</span>
        </motion.div>

        <motion.p variants={item} style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>
          {t.hint}
        </motion.p>
      </motion.div>
    </div>
  )
}
