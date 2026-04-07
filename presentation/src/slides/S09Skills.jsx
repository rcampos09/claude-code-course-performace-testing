import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

const colorMap = {
  violet: { badge: 'badge-violet', border: 'rgba(124,58,237,0.3)', text: '#a78bfa', glow: 'rgba(124,58,237,0.08)' },
  primary: { badge: 'badge-primary', border: 'rgba(245,158,11,0.3)', text: 'var(--primary)', glow: 'rgba(245,158,11,0.06)' },
  green: { badge: 'badge-green', border: 'rgba(16,185,129,0.3)', text: 'var(--green)', glow: 'rgba(16,185,129,0.06)' },
}

export default function S09Skills({ tr }) {
  const t = tr.skills
  return (
    <div className="slide">
      <div className="bg-grid" />
      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1000, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-violet" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.5rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{t.subtitle}</motion.p>

        <motion.div variants={item} style={{ marginBottom: '2rem' }}>
          <code style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', background: 'var(--surface-2)', border: '1px solid var(--border-bright)', padding: '0.5rem 1rem', borderRadius: 8, color: 'var(--green)' }}>
            $ {t.install}
          </code>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {t.cards.map((card, i) => {
            const c = colorMap[card.color]
            return (
              <motion.div key={i} variants={item} className="card" style={{ borderColor: c.border, background: c.glow, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.75rem' }}>{card.icon}</span>
                  <code style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: c.text, fontWeight: 700, wordBreak: 'break-all' }}>{card.name}</code>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontFamily: 'var(--mono)', background: 'var(--primary-dim)', padding: '0.35rem 0.6rem', borderRadius: 6 }}>
                  {card.trigger}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6, flexGrow: 1 }}>{card.does}</p>
                <div style={{ fontSize: '0.72rem', color: c.text, borderTop: `1px solid ${c.border}`, paddingTop: '0.75rem', fontFamily: 'var(--mono)' }}>
                  → {card.output}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
