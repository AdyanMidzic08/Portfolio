import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { NAV } from '../data'
import { go } from '../lib'

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [active, setActive] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    ;['top', ...NAV].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <nav className="nav" aria-label="Main">
        <button className="logo" onClick={() => go('top')} aria-label="Back to top">AM</button>
        <div className="links">
          {NAV.map((id) => (
            <button key={id} onClick={() => go(id)} aria-current={active === id ? 'true' : undefined}>
              {active === id && <motion.i layoutId="navpill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{id === 'cv' ? 'CV' : id[0].toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
