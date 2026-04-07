import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function S14Instructor({ tr }) {
  const t = tr.instructor
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 820, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '1rem' }}>{t.label}</span></motion.div>

        <motion.div variants={item} className="card card-glow-primary" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #f59e0b, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
              RC
            </div>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.25rem' }}>{t.title}</h2>
              <span className="badge badge-primary">{t.role}</span>
            </div>
          </div>
          <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>{t.bio}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {t.built.map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--muted)' }}>
                <span style={{ flexShrink: 0 }}>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} style={{ padding: '1.25rem 1.75rem', borderLeft: '3px solid var(--primary)', background: 'var(--primary-dim)', borderRadius: '0 12px 12px 0' }}>
          <p style={{ color: 'var(--text)', fontStyle: 'italic', fontSize: '1rem', lineHeight: 1.6 }}>{t.quote}</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
