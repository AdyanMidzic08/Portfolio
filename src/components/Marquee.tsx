import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { TECH } from '../data'

const entries = Object.entries(TECH)

export default function Marquee() {
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skewX = useTransform(velocity, [-2500, 2500], [-12, 12], { clamp: true })
  return (
    <div className="marquee" role="img" aria-label={`Tech stack: ${Object.keys(TECH).join(', ')}`}>
      <motion.div style={{ skewX }}>
        <motion.div className="track" aria-hidden animate={{ x: ['0%', '-50%'] }} transition={{ duration: 34, ease: 'linear', repeat: Infinity }}>
          {[...entries, ...entries].map(([name, Icon], i) => <span key={i} title={name}><Icon /></span>)}
        </motion.div>
      </motion.div>
    </div>
  )
}
