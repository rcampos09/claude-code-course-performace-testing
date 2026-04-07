import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }

export default function S10Transform({ tr }) {
  const t = tr.transform
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', top: '50%', right: '5%', transform: 'translateY(-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 900, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '2rem' }}>{t.title}</motion.h2>

        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ padding: '0.75rem 1.25rem', fontSize: '0.75rem', color: 'var(--dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Metric</div>
            <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--red)', fontWeight: 700, textAlign: 'center', borderLeft: '1px solid var(--border)' }}>⬛ {t.before_title}</div>
            <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--green)', fontWeight: 700, textAlign: 'center', borderLeft: '1px solid var(--border)' }}>✅ {t.after_title}</div>
          </div>
          {/* Rows */}
          {t.rows.map((row, i) => (
            <motion.div key={i} variants={item} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', borderBottom: i < t.rows.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ padding: '0.9rem 1.25rem', fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 500 }}>{row.metric}</div>
              <div style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', color: 'var(--red)', textAlign: 'center', borderLeft: '1px solid var(--border)', background: 'rgba(239,68,68,0.03)' }}>{row.before}</div>
              <div style={{ padding: '0.9rem 1rem', fontSize: '0.85rem', color: 'var(--green)', fontWeight: 600, textAlign: 'center', borderLeft: '1px solid var(--border)', background: 'rgba(16,185,129,0.05)' }}>{row.after}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={item} style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--primary)', background: 'var(--primary-dim)', padding: '0.5rem 1.25rem', borderRadius: 999, border: '1px solid rgba(245,158,11,0.2)' }}>
            {t.note}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
