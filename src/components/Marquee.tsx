import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import { TECH } from '../data'
import { useLang } from '../lib'

const entries = Object.entries(TECH)

export default function Marquee() {
  const { t } = useLang()
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const skewX = useTransform(velocity, [-2500, 2500], [-12, 12], { clamp: true })
  return (
    <div className="overflow-hidden border-y border-line bg-panel py-6" role="img" aria-label={`${t.techStack}: ${Object.keys(TECH).join(', ')}`}>
      <motion.div style={{ skewX }}>
        <motion.div className="flex w-max text-[clamp(38px,4.6vw,64px)]" aria-hidden animate={{ x: ['0%', '-50%'] }} transition={{ duration: 34, ease: 'linear', repeat: Infinity }}>
          {[...entries, ...entries].map(([name, Icon], i) => <span className="mx-[clamp(26px,3.4vw,50px)] inline-flex" key={i} title={name}><Icon /></span>)}
        </motion.div>
      </motion.div>
    </div>
  )
}
