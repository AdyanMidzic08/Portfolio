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
      <motion.div className="fixed inset-x-0 top-0 z-30 h-[3px] origin-left bg-accent" style={{ scaleX }} />
      <nav className="pointer-events-none fixed top-[18px] right-gut left-gut z-20 flex items-center justify-between" aria-label="Main">
        <button
          className="pointer-events-auto size-11 rounded-full border border-line bg-white/82 font-mono text-[14px] font-bold backdrop-blur-[14px]"
          onClick={() => go('top')}
          aria-label="Back to top"
        >
          AM
        </button>
        <div className="pointer-events-auto flex rounded-full border border-line bg-white/82 p-1 backdrop-blur-[14px]">
          {NAV.map((id) => (
            <button
              key={id}
              className="relative rounded-full px-[9px] py-[7px] text-[12.5px] text-body transition-colors duration-200 hover:text-accent aria-[current=true]:text-white aria-[current=true]:hover:text-white md:px-[15px] md:py-2 md:text-[14px]"
              onClick={() => go(id)}
              aria-current={active === id ? 'true' : undefined}
            >
              {active === id && <motion.i className="absolute inset-0 rounded-full bg-accent" layoutId="navpill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="relative">{id === 'cv' ? 'CV' : id[0].toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
