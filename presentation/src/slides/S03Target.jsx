import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function S03Target({ tr }) {
  const t = tr.target
  return (
    <div className="slide">
      <div className="bg-grid" />
      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 960, width: '100%', zIndex: 1 }}>
        <motion.div variants={item} style={{ marginBottom: '0.5rem' }}>
          <span className="badge badge-violet">{t.label}</span>
        </motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '2.5rem' }}>{t.title}</motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* YES */}
          <motion.div variants={item} className="card card-glow-green" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.25rem' }}>✅</span>
              <span style={{ fontWeight: 700, color: 'var(--green)', fontSize: '1rem' }}>{t.yes_title}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {t.yes.map((y, i) => (
                <motion.div key={i} variants={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--green)', marginTop: '0.1rem', flexShrink: 0 }}>→</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>{y}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NO */}
          <motion.div variants={item} className="card card-glow-red" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🚫</span>
              <span style={{ fontWeight: 700, color: 'var(--red)', fontSize: '1rem' }}>{t.no_title}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {t.no.map((n, i) => (
                <motion.div key={i} variants={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--red)', marginTop: '0.1rem', flexShrink: 0 }}>✕</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>{n}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
