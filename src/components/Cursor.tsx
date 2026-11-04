import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from 'motion/react'

const TRAIL = [
  { size: 6, stiffness: 340, damping: 30, opacity: 0.55 },
  { size: 5, stiffness: 220, damping: 26, opacity: 0.4 },
  { size: 4, stiffness: 150, damping: 22, opacity: 0.28 },
  { size: 3, stiffness: 100, damping: 18, opacity: 0.18 },
]

const center = '-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 rounded-full'

function TrailDot({ x, y, size, stiffness, damping, opacity }: { x: MotionValue<number>; y: MotionValue<number> } & (typeof TRAIL)[number]) {
  const sx = useSpring(x, { stiffness, damping })
  const sy = useSpring(y, { stiffness, damping })
  return <motion.i className="fixed top-0 left-0" style={{ x: sx, y: sy }}><i className={`${center} bg-current`} style={{ width: size, height: size, opacity }} /></motion.i>
}

export default function Cursor() {
  const still = useReducedMotion()
  const enabled = !still && matchMedia('(hover: hover) and (pointer: fine)').matches
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 34 })
  const ry = useSpring(y, { stiffness: 420, damping: 34 })
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [onAccent, setOnAccent] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); setVisible(true) }
    const over = (e: PointerEvent) => {
      const el = e.target as Element
      setActive(Boolean(el.closest('a, button')))
      setOnAccent(Boolean(el.closest('#contact')))
    }
    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => setVisible(false)
    root.classList.add('custom-cursor')
    document.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.addEventListener('pointerdown', down)
    document.addEventListener('pointerup', up)
    root.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('custom-cursor')
      document.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('pointerup', up)
      root.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-60 transition-[opacity,color] duration-200 ${onAccent && !active ? 'text-white' : 'text-accent-text'} ${visible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden
    >
      {TRAIL.map((dot) => <TrailDot key={dot.size} x={x} y={y} {...dot} />)}
      <motion.i className="fixed top-0 left-0" style={{ x: rx, y: ry }}>
        <motion.i
          className={`${center} block size-9 border-[1.5px] border-current`}
          animate={{ scale: pressed ? 0.75 : active ? 1.6 : 1, backgroundColor: active ? 'rgba(178,3,55,.1)' : 'rgba(178,3,55,0)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        />
      </motion.i>
      <motion.i className="fixed top-0 left-0" style={{ x, y }}>
        <i className={`${center} size-2 bg-current shadow-[0_0_0_1.5px_rgba(255,255,255,.75)]`} />
      </motion.i>
    </div>
  )
}
