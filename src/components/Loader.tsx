import { useEffect, useState } from 'react'
import { animate, motion } from 'motion/react'
import { ease } from '../lib'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const c = animate(0, 100, { duration: 1.2, ease: 'easeInOut', onUpdate: (v) => setN(Math.round(v)), onComplete: onDone })
    return () => c.stop()
  }, [onDone])
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-between bg-accent p-gut text-[clamp(22px,3vw,40px)] font-bold text-white"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease }}
    >
      <span>Adyan Midzic</span>
      <b className="text-[clamp(90px,22vw,320px)] leading-[.8] font-extrabold tracking-[-.05em] tabular-nums">{n}</b>
    </motion.div>
  )
}
