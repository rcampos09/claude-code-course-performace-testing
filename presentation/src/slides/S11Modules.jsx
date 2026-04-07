import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

export default function S11Modules({ tr }) {
  const t = tr.modules
  return (
    <div className="slide">
      <div className="bg-grid" />
      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1000, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '2rem' }}>{t.title}</motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
          {t.items.map((mod, i) => (
            <motion.div key={i} variants={item} className="card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'border-color 0.2s' }}
              whileHover={{ borderColor: 'rgba(245,158,11,0.4)', y: -2 }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--border-bright)', lineHeight: 1 }}>{mod.n}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.4 }}>{mod.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontFamily: 'var(--mono)', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>{mod.tool}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
