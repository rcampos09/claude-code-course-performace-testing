import { motion } from 'framer-motion'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, scale: 0.95, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }

export default function S14Instructor({ tr }) {
  const t = tr.instructor
  return (
    <div className="slide">
      <div className="bg-grid" />
      <div className="bg-glow" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', top: '50%', right: '5%', transform: 'translateY(-50%)' }} />

      <motion.div variants={container} initial="hidden" animate="show" style={{ maxWidth: 900, width: '100%', textAlign: 'center', zIndex: 1 }}>
        <motion.div variants={item}><span className="badge badge-primary" style={{ marginBottom: '1rem' }}>{t.label}</span></motion.div>

        <motion.h2 variants={item} className="slide-title" style={{ marginBottom: '0.75rem' }}>{t.title}</motion.h2>
        <motion.p variants={item} style={{ color: 'var(--muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: 650, margin: '0 auto 2.5rem' }}>{t.subtitle}</motion.p>

        <motion.div variants={item} style={{ padding: '2rem', borderRadius: 20, background: 'linear-gradient(135deg, var(--primary-dim) 0%, var(--surface-2) 100%)', border: '2px solid #10b98133', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Performance360</div>
          <p style={{ color: 'var(--text)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Liderazgo en performance testing y observabilidad en Latinoamérica. Herramientas + Skills + Instructores especializados.
          </p>
        </motion.div>

        <motion.p variants={item} style={{ color: 'var(--text-light)', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.8 }}>
          "{t.quote}"
        </motion.p>
      </motion.div>
    </div>
  )
}
