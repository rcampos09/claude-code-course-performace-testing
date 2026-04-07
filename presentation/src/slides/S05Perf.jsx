import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }

const colorMap = {
  blue: { bg: 'var(--blue-dim)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
  green: { bg: 'var(--green-dim)', border: 'rgba(16,185,129,0.25)', text: 'var(--green)' },
  primary: { bg: 'var(--primary-dim)', border: 'rgba(245,158,11,0.25)', text: 'var(--primary)' },
  violet: { bg: 'var(--violet-dim)', border: 'rgba(124,58,237,0.25)', text: '#a78bfa' },
  red: { bg: 'var(--red-dim)', border: 'rgba(239,68,68,0.25)', text: 'var(--red)' },
}

export default function S05Perf({ tr }) {
  const t = tr.perf
  return (
    <div className="slide">
      <div className="bg-grid" />
      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1000, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.75rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', marginBottom: '2.5rem', fontSize: '0.95rem' }}>{t.subtitle}</motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
          {t.types.map((type, i) => {
            const c = colorMap[type.color]
            return (
              <motion.div key={i} variants={item} className="card" style={{ background: c.bg, borderColor: c.border, textAlign: 'center', padding: '1.25rem 1rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{type.icon}</div>
                <div style={{ fontWeight: 800, color: c.text, fontSize: '1rem', marginBottom: '0.5rem', fontFamily: 'var(--mono)' }}>{type.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5 }}>{type.desc}</div>
              </motion.div>
            )
          })}
        </div>

        <motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--dim)', marginRight: '0.5rem', alignSelf: 'center' }}>Key metrics:</span>
          {t.metrics.map((m, i) => <span key={i} className="badge badge-primary">{m}</span>)}
        </motion.div>
      </motion.div>
    </div>
  )
}
