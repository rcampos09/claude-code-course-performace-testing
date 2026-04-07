import { motion } from 'framer-motion'

const item = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }
const container = { hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } } }

export default function S01Hero({ tr }) {
  const t = tr.hero
  return (
    <div className="slide" style={{ justifyContent: 'space-between', padding: '3rem', overflow: 'hidden' }}>
      <div className="bg-grid" />

      <motion.div variants={container} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '50%', zIndex: 1 }}>
        <motion.div variants={item}>
          <span className="badge badge-green" style={{ marginBottom: '1.5rem' }}>{t.label}</span>
        </motion.div>

        {/* Claude Code Title with colors */}
        <motion.div variants={item} style={{ marginBottom: '0.5rem' }}>
          <div style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)', marginBottom: '0.25rem' }}>
            <span style={{ color: '#10b981' }}>Claude</span>
            <span style={{ color: '#f59e0b' }}>Code</span>
          </div>
        </motion.div>

        <motion.h1 variants={item} style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: '1.5rem' }}>
          for Performance Tester
        </motion.h1>

        <motion.p variants={item} style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 550, marginBottom: '2rem' }}>
          {t.subtitle.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </motion.p>

        <motion.div variants={item} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <span className="badge badge-green">{t.tag1}</span>
          <span className="badge badge-orange">{t.tag2}</span>
          <span className="badge badge-red">{t.tag3}</span>
        </motion.div>

        <motion.p variants={item} style={{ fontSize: '0.8rem', color: 'var(--dim)', fontFamily: 'var(--mono)', fontWeight: 500 }}>
          {t.hint}
        </motion.p>
      </motion.div>

      {/* Terminal Visual - Right side */}
      <motion.div
        variants={item}
        initial={{ opacity: 0, scale: 0.95, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div style={{
          width: '90%',
          maxWidth: 450,
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: 12,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          overflow: 'hidden',
        }}>
          {/* Terminal header */}
          <div style={{
            background: 'linear-gradient(to bottom, #2a2a2a, #1f1f1f)',
            padding: '0.75rem 1rem',
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid #333',
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
            <div style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#666', fontFamily: 'var(--mono)' }}>Performance360</div>
          </div>

          {/* Terminal content */}
          <div style={{
            padding: '1.5rem',
            fontFamily: 'var(--mono)',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            color: '#e0e0e0',
            background: '#0f0f0f',
            minHeight: 280,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div style={{ color: '#f59e0b', marginBottom: '1.5rem' }}>
              <span style={{ marginRight: '0.5rem' }}>※</span>
              <span>Welcome to</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}> Claude Code </span>
              <span>for Performance Testing</span>
            </div>

            {/* ASCII-like visualization */}
            <div style={{
              background: 'rgba(16,185,129,0.1)',
              padding: '1rem',
              borderRadius: 8,
              borderLeft: '3px solid #10b981',
              marginBottom: '1.5rem',
              fontSize: '0.8rem',
              color: '#10b981',
              fontWeight: 600,
            }}>
              $ claude run performance-test
            </div>

            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ color: '#10b981', fontSize: '1.5rem' }}
            >
              ▊
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
