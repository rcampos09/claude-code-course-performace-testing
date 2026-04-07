import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function S04Claude({ tr }) {
  const t = tr.claude
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', top: '40%', left: '20%', transform: 'translateY(-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1000, width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', zIndex: 1 }}>
        {/* Left */}
        <div>
          <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '1rem' }}>{t.label}</span></motion.div>
          <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '1rem' }}>{t.title}</motion.h2>
          <motion.p variants={item} style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.95rem' }}>{t.desc}</motion.p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {t.pillars.map((p, i) => (
              <motion.div key={i} variants={item} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-dim)', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: '0.2rem' }}>{p.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{p.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: terminal */}
        <motion.div variants={item} className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border-bright)' }}>
          <div style={{ background: 'var(--surface-2)', padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--dim)', marginLeft: '0.5rem' }}>claude — performance-project</span>
          </div>
          <div style={{ padding: '1.25rem', fontFamily: 'var(--mono)', fontSize: '0.8rem', lineHeight: 1.8 }}>
            {t.terminal.map((line, i) => (
              <div key={i} style={{
                color: line.startsWith('✓') ? 'var(--green)'
                  : line.startsWith('>') ? 'var(--primary)'
                  : line.startsWith('$') ? '#60a5fa'
                  : line === '' ? 'transparent' : 'var(--muted)',
              }}>{line || '\u00a0'}</div>
            ))}
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: 'var(--primary)' }}>▊</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
