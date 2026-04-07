import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

const dayColors = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444']

export default function S12Project({ tr }) {
  const t = tr.project
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 600, height: 300, background: 'linear-gradient(90deg, rgba(59,130,246,0.07) 0%, rgba(239,68,68,0.07) 100%)', top: '60%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', filter: 'blur(60px)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 950, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-red" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.5rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t.subtitle}</motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {t.days.map((d, i) => (
            <motion.div key={i} variants={item} className="card" style={{ borderColor: `${dayColors[i]}33`, padding: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: dayColors[i], borderRadius: '16px 16px 0 0' }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: dayColors[i], fontWeight: 700, marginBottom: '0.4rem', marginTop: '0.25rem' }}>{d.day}</div>
              <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.5rem' }}>{d.title}</div>
              <div style={{ fontSize: '0.73rem', color: 'var(--muted)', lineHeight: 1.5 }}>{d.deliverable}</div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="card card-glow-green" style={{ padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span style={{ fontSize: '1.75rem', flexShrink: 0 }}>🏆</span>
          <p style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.7 }}>{t.outcome}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
