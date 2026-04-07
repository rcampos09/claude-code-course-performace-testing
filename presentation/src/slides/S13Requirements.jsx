import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }

export default function S13Requirements({ tr }) {
  const t = tr.reqs
  return (
    <div className="slide">
      <div className="bg-grid" />
      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 860, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '2.5rem' }}>{t.title}</motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {t.items.map((req, i) => (
            <motion.div key={i} variants={item} className="card" style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1.5rem' }} whileHover={{ borderColor: 'rgba(245,158,11,0.3)', y: -2 }}>
              <div style={{ fontSize: '2.25rem', flexShrink: 0 }}>{req.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.4rem' }}>{req.title}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{req.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--green)', background: 'var(--green-dim)', padding: '0.5rem 1.5rem', borderRadius: 999, border: '1px solid rgba(16,185,129,0.2)' }}>
            ✓ {t.note}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
