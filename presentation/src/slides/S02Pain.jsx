import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 } }

export default function S02Pain({ tr }) {
  const t = tr.pain
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)', top: '30%', right: '5%' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 900, width: '100%', zIndex: 1 }}>
        <motion.div variants={item} style={{ marginBottom: '0.5rem' }}>
          <span className="badge badge-red">{t.label}</span>
        </motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '3rem' }}>
          {t.title}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {t.items.map((it, i) => (
            <motion.div key={i} variants={item} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderColor: 'rgba(239,68,68,0.2)' }}>
              <span style={{ fontSize: '2rem' }}>{it.icon}</span>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--red)', fontFamily: 'var(--mono)', lineHeight: 1 }}>{it.stat}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{it.text}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ marginTop: '2.5rem', padding: '1.25rem 1.75rem', borderLeft: '3px solid var(--primary)', background: 'var(--primary-dim)', borderRadius: '0 12px 12px 0' }}>
          <p style={{ color: 'var(--muted)', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.6 }}>{t.quote}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
