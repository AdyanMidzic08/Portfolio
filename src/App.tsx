import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import { startSmoothScroll, useGithub } from './lib'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'

export default function App() {
  const still = useReducedMotion() ?? false
  const [ready, setReady] = useState(still)
  const repos = useGithub()

  useEffect(() => {
    if (!still) return startSmoothScroll()
  }, [still])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero ready={ready} repos={repos} still={still} />
        <Marquee />
        <About repos={repos} />
      </main>
    </MotionConfig>
  )
}
