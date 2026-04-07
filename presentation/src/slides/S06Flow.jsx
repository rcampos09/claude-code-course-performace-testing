import { motion } from 'framer-motion'

export default function S06Flow({ tr }) {
  const t = tr.flow
  return (
    <div className="slide" style={{ flexDirection: 'column' }}>
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 700, height: 300, background: 'linear-gradient(90deg, rgba(245,158,11,0.08) 0%, rgba(124,58,237,0.08) 100%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', filter: 'blur(80px)' }} />

      <motion.div initial="hidden" animate="show" style={{ maxWidth: 1050, width: '100%', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{t.label}</span>
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="slide-title" style={{ marginBottom: '3rem' }}>{t.title}</motion.h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
          {t.steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.12 }} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center', width: 110 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: i === 0 || i === t.steps.length - 1 ? 'var(--primary-dim)' : 'var(--surface)',
                  border: `1px solid ${i === 0 || i === t.steps.length - 1 ? 'rgba(245,158,11,0.4)' : 'var(--border-bright)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.75rem', margin: '0 auto 0.75rem',
                  boxShadow: i === 0 || i === t.steps.length - 1 ? '0 0 20px var(--primary-glow)' : 'none',
                }}>
                  {step.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--text)', marginBottom: '0.2rem' }}>{step.label}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--dim)', fontFamily: 'var(--mono)' }}>{step.sub}</div>
              </div>
              {i < t.steps.length - 1 && (
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }} style={{ width: 32, height: 2, background: 'linear-gradient(90deg, var(--border-bright), var(--border-bright))', flexShrink: 0, position: 'relative' }}>
                  <div style={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', color: 'var(--dim)', fontSize: '0.6rem' }}>▶</div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--primary)', background: 'var(--primary-dim)', padding: '0.5rem 1.25rem', borderRadius: 999, border: '1px solid rgba(245,158,11,0.2)' }}>
            {t.human}
          </span>
        </motion.div>
      </motion.div>
    </div>
  )
}
