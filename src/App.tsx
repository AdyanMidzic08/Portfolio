import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { startSmoothScroll } from './lib'
import Loader from './components/Loader'
import Nav from './components/Nav'

export default function App() {
  const still = useReducedMotion() ?? false
  const [ready, setReady] = useState(still)

  useEffect(() => {
    if (!still) return startSmoothScroll()
  }, [still])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
      <Nav />
      <main>
      </main>
    </MotionConfig>
  )
}
