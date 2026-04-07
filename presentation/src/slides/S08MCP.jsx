import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function S08MCP({ tr }) {
  const t = tr.mcp
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', top: '30%', left: '15%', transform: 'translateY(-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1000, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.5rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{t.subtitle}</motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Before */}
          <motion.div variants={item} className="card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <div style={{ fontWeight: 700, color: 'var(--red)', marginBottom: '1rem', fontSize: '0.85rem' }}>❌ {t.before}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {t.before_steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--dim)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--red-dim)', border: '1px solid var(--red)', flexShrink: 0 }} />
                  {s}
                </div>
              ))}
            </div>
          </motion.div>

          {/* MCP cards */}
          <motion.div variants={item} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {t.cards.map((card, i) => {
              const isBlue = card.color === 'blue'
              return (
                <motion.div key={i} variants={item} className="card" style={{ borderColor: isBlue ? 'rgba(59,130,246,0.3)' : 'rgba(245,158,11,0.3)', background: isBlue ? 'rgba(59,130,246,0.05)' : 'rgba(245,158,11,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isBlue ? '#60a5fa' : 'var(--primary)', fontFamily: 'var(--mono)' }}>{card.name}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {card.actions.map((a, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--muted)' }}>
                        <span style={{ color: isBlue ? '#60a5fa' : 'var(--primary)', flexShrink: 0, marginTop: '0.1rem' }}>▸</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
