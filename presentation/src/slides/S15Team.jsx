import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export default function S15Team({ tr }) {
  const t = tr.instructor
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 600, height: 400, background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', top: '50%', left: '10%', transform: 'translateY(-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 1050, width: '100%', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{t.label}</span></motion.div>
        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.5rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>{t.subtitle}</motion.p>

        {/* Team grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
          {t.team.map((member, i) => (
            <motion.div key={i} variants={item} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', textAlign: 'center', overflow: 'hidden' }} whileHover={{ y: -4 }}>
              {/* Image */}
              <div style={{ width: '100%', height: 220, borderRadius: 16, overflow: 'hidden', background: 'var(--surface-2)' }}>
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.style.fontSize = '3.5rem'
                  e.target.parentElement.style.display = 'flex'
                  e.target.parentElement.style.alignItems = 'center'
                  e.target.parentElement.style.justifyContent = 'center'
                  e.target.parentElement.textContent = '👤'
                }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.2rem', fontFamily: 'var(--font-heading)' }}>{member.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--mono)' }}>{member.role}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>{member.bio}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div variants={item} style={{ padding: '1.5rem 2rem', borderLeft: '4px solid var(--primary)', background: 'linear-gradient(135deg, var(--primary-dim), var(--surface-2))', borderRadius: '0 16px 16px 0', textAlign: 'center' }}>
          <p style={{ color: 'var(--text)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>
            {t.quote}
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
