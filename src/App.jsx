import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════ */

const BIO_TEXT =
  'Berkomitmen menjadi engineer yang memahami arsitektur dengan baik dan sistemik. ' +
  'Saat ini fokus mengeksplorasi filosofi NixOS untuk mendalami proses bekerja secara sistemik ' +
  'sembari melawan overhead akibat tingginya abstraksi modern, guna merancang infrastruktur ' +
  'digital yang efisien, lean, dan terukur.'

const PROJECTS = [
  {
    tag: 'NATIVE_RTOS_SINK',
    desc: 'Pengembangan infrastruktur IoT Wastafel Pintar menggunakan native ESP-IDF dan FreeRTOS. Berfokus pada optimasi resource hardware dan eksekusi real-time dengan menekan overhead abstraksi.',
    status: 'LIVE',
  },
  {
    tag: 'REPRODUCIBLE_INFRA',
    desc: 'Merancang deployment server berbasis ekosistem Nix yang berjalan secara native, minim layering, dan 100% reproducible.',
    status: 'STABLE',
  },
  {
    tag: 'CYBERSEC_FRAMEWORK',
    desc: 'Riset sistem pertahanan siber dengan fokus pada analisis kerentanan infrastruktur hasil development berbasis AI.',
    status: 'ALPHA',
  },
]

const TECH_STACK = [
  {
    name: 'Nix',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"></line><line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
    )
  },
  {
    name: 'Linux',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
    )
  },
  {
    name: 'ESP-IDF',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
    )
  },
  {
    name: 'GNS3',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><circle cx="6" cy="19" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="10.5" y1="7.5" x2="7.5" y2="16.5"></line><line x1="13.5" y1="7.5" x2="16.5" y2="16.5"></line></svg>
    )
  },
  {
    name: 'Git',
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><line x1="6" y1="9" x2="6" y2="15"></line><line x1="8.12" y1="7.88" x2="15.88" y2="16.12"></line></svg>
    )
  }
]

const TOTAL_CELLS = 7 * 26

/* ═══════════════════════════════════════════════════════
   PARTICLES — global background layer (z-0)
   ═══════════════════════════════════════════════════════ */
function Particles({ count = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * 10,
        duration: Math.random() * 10 + 15,
        opacity: Math.random() * 0.4 + 0.2, // Boosted opacity
      })),
    [count],
  )
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-[#00f0ff]"
          style={{ left: p.left, width: p.size, height: p.size, opacity: 0 }}
          animate={{
            y: ['10vh', '-110vh'],
            opacity: [0, p.opacity, p.opacity, 0],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════════════════ */

/** Fade-in-up on scroll */
function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

/** ASCII bracket ornaments on card corners */
function Corners({ color = '#7ebae4' }) {
  const base =
    'absolute text-xs font-mono select-none pointer-events-none leading-none'
  const style = { color, opacity: 0.55, textShadow: `0 0 8px ${color}` }
  return (
    <>
      <span className={`${base} top-2 left-2.5`} style={style}>┌</span>
      <span className={`${base} top-2 right-2.5`} style={style}>┐</span>
      <span className={`${base} bottom-2 left-2.5`} style={style}>└</span>
      <span className={`${base} bottom-2 right-2.5`} style={style}>┘</span>
    </>
  )
}



// Animations removed for performance

/** Flickering text effect on a label */
function FlickerLabel({ children, className = '' }) {
  return (
    <motion.span
      className={className}
      animate={{ opacity: [1, 1, 0.85, 1, 0.9, 1] }}
      transition={{ duration: 4, repeat: Infinity, times: [0, 0.7, 0.75, 0.8, 0.85, 1] }}
    >
      {children}
    </motion.span>
  )
}

/* ═══════════════════════════════════════════════════════
   HEATMAP CELL COMPONENT (animated color when active)
   ═══════════════════════════════════════════════════════ */
function HeatCell({ isActive, baseValue }) {
  const [color, setColor] = useState(null)

  useEffect(() => {
    if (!isActive) return
    const randomColor = () => {
      const r = Math.random()
      if (r > 0.6) return `rgba(0,240,255,${0.5 + Math.random() * 0.5})`
      if (r > 0.3) return `rgba(126,186,228,${0.4 + Math.random() * 0.4})`
      return `rgba(100,220,200,${0.3 + Math.random() * 0.5})`
    }
    setColor(randomColor())
    const id = setInterval(() => setColor(randomColor()), 1200 + Math.random() * 800)
    return () => clearInterval(id)
  }, [isActive])

  const bg = isActive
    ? color || 'rgba(0,240,255,0.7)'
    : `rgba(126,186,228,${baseValue * 0.12})`

  const shadow = isActive ? `0 0 6px ${bg}` : 'none'

  return (
    <div
      className="w-[11px] h-[11px] rounded-[2px] shrink-0 transition-colors duration-700"
      style={{ backgroundColor: bg, boxShadow: shadow }}
    />
  )
}

/* ═══════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════ */

export default function App() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState([])
  const [typedText, setTypedText] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [deploying, setDeploying] = useState(false)
  const logContainerRef = useRef(null)

  /* Typewriter (Accelerated heavily) */
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      if (i < BIO_TEXT.length) { i += 5; setTypedText(BIO_TEXT.slice(0, i)) }
      else clearInterval(id)
    }, 10)
    return () => clearInterval(id)
  }, [])

  /* Blinking cursor */
  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530)
    return () => clearInterval(id)
  }, [])

  /* Auto-scroll log container only (no page jump) */
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [logs])

  /* Deploy handler with "deploying" flash state */
  const handleDeploy = useCallback(() => {
    setDeploying(true)
    setTimeout(() => {
      const next = count + 1
      setCount(next)
      setLogs((prev) => [
        ...prev,
        `> [${new Date().toLocaleTimeString()}] Project_0${String(next).padStart(2,'0')} — Build OK. Deployed securely.`,
      ])
      setDeploying(false)
    }, 420)
  }, [count])

  /* Stable base values for heatmap background cells */
  const baseValues = useMemo(() => Array.from({ length: TOTAL_CELLS }, () => Math.random()), [])
  /* Active cells count: 4 per project */
  const activeCellCount = Math.min(count * 4, TOTAL_CELLS)

  return (
    <div className="relative min-h-screen text-[#f8fafc] font-mono leading-[1.65] overflow-x-hidden">
      {/* Global floating particles replacing drifters */}
      <Particles count={45} />

      {/* Animated grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 grid-bg" />

      {/* Screen-corner ASCII ornaments with glow */}
      {[
        { pos: 'fixed top-3 left-4', text: '┌──//' },
        { pos: 'fixed top-3 right-4', text: '//──┐' },
        { pos: 'fixed bottom-3 left-4', text: '└──+' },
        { pos: 'fixed bottom-3 right-4', text: '+──┘' },
      ].map(({ pos, text }) => (
        <motion.span
          key={text}
          className={`${pos} text-[#7ebae4] text-xs select-none pointer-events-none z-50 font-mono`}
          style={{ opacity: 0.55, textShadow: '0 0 10px rgba(126,186,228,0.8)' }}
          animate={{ opacity: [0.55, 0.7, 0.45, 0.65, 0.55] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 1] }}
        >
          {text}
        </motion.span>
      ))}

      {/* ╔══════════════════════════════════════════╗
          ║  1 · HEADER & NAVBAR                    ║
          ╚══════════════════════════════════════════╝ */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/75 border-b border-[#7ebae4]/20 shadow-[0_4px_30px_rgba(126,186,228,0.06)]">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <FlickerLabel className="text-[#7ebae4] text-sm font-bold tracking-wide" style={{ textShadow: '0 0 8px rgba(126,186,228,0.5)' }}>
              I Made Oka Jelantik
            </FlickerLabel>
            <span className="text-[#8b949e] text-xs hidden sm:inline">|</span>
            <span className="text-[#8b949e] text-xs">NIM: 2505551101</span>
          </div>
          <div className="text-xs text-[#8b949e] border border-[#7ebae4]/30 px-3 py-1.5 rounded hover:border-[#7ebae4]/60 transition-colors bg-[#7ebae4]/5">
            <span className="text-[#7ebae4]">[</span> Bidang IoT dan Jaringan <span className="text-[#7ebae4]">]</span>
          </div>
        </nav>
      </header>

      <main className="relative z-10">
        {/* ╔══════════════════════════════════════════╗
            ║  2 · HERO PROFILE                       ║
            ╚══════════════════════════════════════════╝ */}
        <section className="relative max-w-4xl mx-auto px-6 py-20 md:py-28 text-center overflow-hidden">
          <ScrollReveal>
            <motion.p
              className="text-[#8b949e] text-xs tracking-[0.2em] mb-4"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              // STUDENT_PROFILE
            </motion.p>

            <h1
              className="text-3xl md:text-5xl font-bold mb-6 glitch-text text-[#f8fafc]"
              data-text="I Made Oka Jelantik"
            >
              I Made Oka Jelantik
            </h1>

            <div className="inline-block border border-[#7ebae4]/30 rounded px-5 py-2.5 bg-[#7ebae4]/10 mb-10">
              <span className="text-[#7ebae4] text-sm">
                &gt; Target: PL-01 (Pengembang Sistem Teknologi Informasi)
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.18}>
            <div className="relative max-w-2xl mx-auto text-left card border-[#7ebae4]/30 overflow-hidden">

              <Corners />
              <span className="text-[#7ebae4] text-xs mb-3 block font-bold">&gt;_bio.md</span>
              <p className="text-[#8b949e] text-sm leading-[1.75]">
                {typedText}
                <span
                  className="inline-block w-[7px] h-[15px] bg-[#7ebae4] ml-0.5 align-middle translate-y-[1px] rounded-[1px]"
                  style={{ opacity: cursorOn ? 1 : 0, boxShadow: '0 0 8px rgba(126,186,228,0.9)' }}
                />
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ╔══════════════════════════════════════════╗
            ║  3 · DEPLOYMENT COUNTER (Mission Control)║
            ╚══════════════════════════════════════════╝ */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <ScrollReveal>
            <p className="text-[#8b949e] text-xs tracking-[0.2em] mb-8">// DEPLOYMENT_COUNTER</p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="relative card border-[#7ebae4]/30 overflow-hidden">

              <Corners />

              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-[#00f0ff]"
                    animate={{ opacity: [1, 0.2, 1], scale: [1, 0.7, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <span className="text-[#8b949e] text-xs tracking-wider">MISSION_CONTROL v1.0</span>
                </div>
                <span className="text-[#8b949e] text-xs">
                  uptime: <span className="text-[#00f0ff]">99.9%</span>
                </span>
              </div>

              {/* Main content: counter + button | log */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT — Big Counter Display */}
                <div className="flex flex-col items-center justify-center gap-6 py-4">
                  {/* Pulsing counter ring */}
                  <div className="relative flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        className="relative w-36 h-36 rounded-full border-2 border-[#7ebae4]/40 flex flex-col items-center justify-center bg-[#050505]"
                        animate={deploying ? { borderColor: ['rgba(126,186,228,0.4)', 'rgba(0,240,255,0.9)', 'rgba(126,186,228,0.4)'] } : {}}
                        transition={{ duration: 0.42, repeat: deploying ? Infinity : 0 }}
                        style={{ boxShadow: count > 0 ? '0 0 30px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)' : 'none' }}
                      >
                        <span className="text-[#8b949e] text-[10px] tracking-widest mb-1">DEPLOYED</span>
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={count}
                            className="text-5xl font-bold text-[#00f0ff]"
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ textShadow: '0 0 20px rgba(0,240,255,0.8)' }}
                          >
                            {count}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-[#8b949e] text-[10px] mt-1">PROJECTS</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Heatmap contribution graph */}
                  <div>
                    <span className="text-[#8b949e] text-[10px] block mb-2 text-center tracking-widest">DEPLOYMENT.MAP</span>
                    <div className="grid grid-rows-7 grid-flow-col gap-[3px] overflow-x-auto pb-1">
                      {baseValues.map((v, i) => (
                        <HeatCell key={i} isActive={i < activeCellCount} baseValue={v} />
                      ))}
                    </div>
                  </div>

                  {/* Execute button */}
                  <motion.button
                    onClick={handleDeploy}
                    type="button"
                    disabled={deploying}
                    className="w-full border border-[#7ebae4]/50 bg-[#7ebae4]/10 text-[#7ebae4] text-sm px-4 py-3 rounded font-mono cursor-pointer disabled:cursor-wait transition-colors hover:bg-[#7ebae4]/20 hover:border-[#7ebae4]/70"
                    whileTap={{ scale: 0.97 }}
                    animate={deploying
                      ? { borderColor: ['rgba(0,240,255,0.5)', 'rgba(0,240,255,1)', 'rgba(0,240,255,0.5)'] }
                      : {}
                    }
                    transition={{ duration: 0.4, repeat: deploying ? Infinity : 0 }}
                  >
                    {deploying ? '[ DEPLOYING... ]' : '[ EKSEKUSI_PROJECT ]'}
                  </motion.button>
                </div>

                {/* RIGHT — Terminal log */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#7ebae4] text-xs font-bold">interactive.log</span>
                    <motion.span
                      className="text-[10px] text-[#8b949e]"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                    >
                      ▮
                    </motion.span>
                  </div>
                  <div
                    ref={logContainerRef}
                    className="bg-[#050505] rounded border border-[#7ebae4]/20 p-3 flex-1 min-h-[220px] max-h-[320px] overflow-y-auto text-xs space-y-1"
                  >
                    <p className="text-[#8b949e]">&gt; Deployment monitor initialized. Awaiting execution...</p>
                    {logs.map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[#00f0ff]"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  {/* Mini sys stats */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] mt-1">
                    {[
                      { label: 'OS', value: 'NixOS' },
                      { label: 'Overhead', value: 'Minimal' },
                      { label: 'Status', value: count > 0 ? '● Active' : '○ Standby', active: count > 0 },
                    ].map(({ label, value, active }) => (
                      <div key={label} className="bg-[#050505] rounded p-2 border border-[#7ebae4]/10 text-center">
                        <span className="text-[#8b949e] block text-[10px]">{label}</span>
                        <span className={active ? 'text-green-400' : 'text-[#7ebae4]'}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ╔══════════════════════════════════════════╗
            ║  4 · PROJECT SHOWCASE                   ║
            ╚══════════════════════════════════════════╝ */}
        <section className="max-w-6xl mx-auto px-6 py-14">
          <ScrollReveal>
            <p className="text-[#8b949e] text-xs tracking-[0.2em] mb-8">// PROJECT_SHOWCASE</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <ScrollReveal key={p.tag} delay={0.14 * (i + 1)}>
                <div className="card h-full border-[#7ebae4]/30 cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-[#7ebae4]/60">
                  <Corners />
                  <div className="flex items-start justify-between mb-3">
                    <h3
                      className="text-[#7ebae4] text-sm font-bold"
                      style={{ textShadow: '0 0 6px rgba(126,186,228,0.5)' }}
                    >
                      [ {p.tag} ]
                    </h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${
                      p.status === 'LIVE'
                        ? 'border-green-400/40 text-green-400 bg-green-400/5'
                        : p.status === 'STABLE'
                        ? 'border-[#7ebae4]/40 text-[#7ebae4] bg-[#7ebae4]/5'
                        : 'border-yellow-400/40 text-yellow-400 bg-yellow-400/5'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="w-8 h-px bg-[#7ebae4]/40 mb-4" />
                  <p className="text-[#8b949e] text-sm leading-[1.75]">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ╔══════════════════════════════════════════╗
            ║  5 · TECH STACK                         ║
            ╚══════════════════════════════════════════╝ */}
        <section className="max-w-6xl mx-auto px-6 py-14 overflow-hidden">
          <ScrollReveal>
            <p className="text-[#8b949e] text-xs tracking-[0.2em] mb-8">// DEPENDENCIES</p>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="relative card overflow-hidden border-[#7ebae4]/30">

              <Corners />
              <span className="text-[#7ebae4]/90 font-bold text-xs mb-6 block">$ nix-env -iA</span>

              <div className="flex flex-wrap justify-center items-center gap-5 mt-4 mb-2">
                {TECH_STACK.map((t, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2.5 border border-[#7ebae4]/30 bg-[#7ebae4]/10 text-[#7ebae4] px-5 py-3 rounded-md text-sm font-bold cursor-default transition-all duration-200 hover:scale-105 hover:bg-[#7ebae4]/20 hover:border-[#7ebae4]/60"
                  >
                    {t.icon}
                    <span>{t.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* ╔══════════════════════════════════════════╗
          ║  6 · FOOTER & CONTACT (PING)            ║
          ╚══════════════════════════════════════════╝ */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pt-14 pb-8 border-t border-[#7ebae4]/20">
        <ScrollReveal>
          <motion.p
            className="text-[#7ebae4] text-lg font-bold mb-6"
            style={{ textShadow: '0 0 10px rgba(126,186,228,0.7)' }}
            animate={{ textShadow: ['0 0 10px rgba(126,186,228,0.4)', '0 0 20px rgba(126,186,228,0.9)', '0 0 10px rgba(126,186,228,0.4)'] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            &gt; PING_ME
          </motion.p>

          <div className="relative card text-left border-[#7ebae4]/30 overflow-hidden">

            <Corners />
            <div className="space-y-3 text-sm">
              <p className="text-[#8b949e]">
                <span className="text-[#7ebae4] font-bold">$</span> echo &quot;hello&quot; &gt;{' '}
                <span className="text-[#00f0ff] cursor-pointer transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                  okajelantikstdy@gmail.com
                </span>
              </p>
              <p className="text-[#8b949e]">
                <span className="text-[#7ebae4] font-bold">$</span> ssh git@github.com:
                <span className="text-[#00f0ff] cursor-pointer transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                  OkaaJelantik
                </span>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-10 flex justify-end">
          <span className="text-[#8b949e] text-xs">
            System Uptime:{' '}
            <motion.span
              className="text-[#00f0ff]"
              animate={{ textShadow: ['0 0 4px rgba(0,240,255,0.3)', '0 0 10px rgba(0,240,255,0.8)', '0 0 4px rgba(0,240,255,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              99.9%
            </motion.span>
            {' | '}Status:{' '}
            <span className="text-green-400" style={{ textShadow: '0 0 6px rgba(74,222,128,0.6)' }}>
              Online
            </span>
          </span>
        </div>
      </footer>
    </div>
  )
}
