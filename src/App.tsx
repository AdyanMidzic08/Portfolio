import { useEffect } from 'react'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { startSmoothScroll } from './lib'

export default function App() {
  const still = useReducedMotion() ?? false

  useEffect(() => {
    if (!still) return startSmoothScroll()
  }, [still])

  return (
    <MotionConfig reducedMotion="user">
      <main>
      </main>
    </MotionConfig>
  )
}
