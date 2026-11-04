import { useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig, useReducedMotion } from 'motion/react'
import type { Lang } from './data'
import { LangContext, startSmoothScroll, useDesktop, useGithub } from './lib'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Cv from './components/Cv'
import Contact from './components/Contact'
import Cursor from './components/Cursor'

export default function App() {
  const still = useReducedMotion() ?? false
  const desktop = useDesktop()
  const [ready, setReady] = useState(still)
  const repos = useGithub()
  const [lang, setLang] = useState<Lang>(() => (navigator.language.toLowerCase().startsWith('de') ? 'de' : 'en'))

  useEffect(() => {
    if (!still) return startSmoothScroll()
  }, [still])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LangContext value={{ lang, setLang }}>
      <MotionConfig reducedMotion="user">
        <AnimatePresence>{!ready && <Loader onDone={() => setReady(true)} />}</AnimatePresence>
        <Nav />
        <main>
          <Hero ready={ready} repos={repos} still={still} />
          <Marquee />
          <About repos={repos} />
          <Work repos={repos} horizontal={desktop && !still} />
          <Experience />
          <Cv />
        </main>
        <Contact />
        <Cursor />
      </MotionConfig>
    </LangContext>
  )
}
