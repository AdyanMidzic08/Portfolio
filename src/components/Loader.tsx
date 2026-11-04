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
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.8, ease }}>
      <span>Adyan Midzic</span><b>{n}</b>
    </motion.div>
  )
}
