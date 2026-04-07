import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

const obsColors = { primary: '#f59e0b', red: '#ef4444', blue: '#3b82f6', violet: '#8b5cf6' }

export default function S07Lab({ tr }) {
  const t = tr.lab
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', bottom: '10%', left: '5%' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 960, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-green" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.5rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t.subtitle}</motion.p>

        {/* Services */}
        <motion.div variants={item}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '0.75rem' }}>{t.services_title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {t.services.map((s, i) => (
              <motion.div key={i} variants={item} className="card" style={{ textAlign: 'center', padding: '0.75rem', borderColor: 'rgba(16,185,129,0.2)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--green)', fontWeight: 700, marginBottom: '0.25rem' }}>{s.name}</div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>{s.port}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--dim)' }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <motion.div variants={item} style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--dim)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '0.3rem 0.9rem', borderRadius: 999 }}>
            OpenTelemetry → auto-instrumented traces + logs
          </span>
        </motion.div>

        {/* Observability */}
        <motion.div variants={item}>
          <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)', marginBottom: '0.75rem' }}>{t.obs_title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
            {t.obs.map((o, i) => {
              const color = obsColors[o.color]
              return (
                <motion.div key={i} variants={item} className="card" style={{ textAlign: 'center', padding: '0.75rem', borderColor: `${color}33`, background: `${color}0d` }}>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color, marginBottom: '0.2rem' }}>{o.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{o.desc}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.p variants={item} style={{ marginTop: '1.5rem', fontSize: '0.72rem', color: 'var(--dim)', fontFamily: 'var(--mono)', textAlign: 'center' }}>{t.otel}</motion.p>
      </motion.div>
    </div>
  )
}
