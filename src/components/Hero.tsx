import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { ROLES, USER } from '../data'
import { ago, ease, go, type Repo } from '../lib'
import Magnetic from './Magnetic'

const Field = lazy(() => import('./Field'))

function Letters({ word, delay, ready }: { word: string; delay: number; ready: boolean }) {
  return (
    <span className="word" aria-hidden>
      {[...word].map((l, i) => (
        <span className="clip" key={i}>
          <motion.span
            initial={{ y: '110%' }}
            animate={ready ? { y: 0 } : undefined}
            transition={{ duration: 1, ease, delay: delay + i * 0.045 }}
            whileHover={{ color: '#B20337', y: '-5%', transition: { duration: 0.2 } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Roles() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="roles">
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.4, ease }}>
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default function Hero({ ready, repos, still }: { ready: boolean; repos: Repo[]; still: boolean }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -160])
  const opacity = useTransform(scrollY, [0, 620], [1, 0])
  const latest = repos[0]
  return (
    <header className="hero" id="top">
      {!still && <div className="field"><Suspense fallback={null}><Field /></Suspense></div>}
      <motion.div className="hero-in" style={{ y, opacity }}>
        <motion.div className="hero-top" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 0.7 }}>
          <Roles />
          <span>Leonding, Austria</span>
        </motion.div>
        <h1 aria-label="Adyan Midzic">
          <Letters word="Adyan" delay={0.05} ready={ready} />
          <Letters word="Midzic" delay={0.25} ready={ready} />
        </h1>
        <motion.div className="hero-bottom" initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.9, duration: 0.8, ease }}>
          <p>I build full-stack web apps, and I'm looking for a team to build the next ones with.</p>
          <div className="cta">
            <Magnetic><button className="btn" onClick={() => go('contact')}>Contact me</button></Magnetic>
            <Magnetic><button className="btn ghost" onClick={() => go('work')}>See my work</button></Magnetic>
          </div>
          {latest && (
            <a className="live" href={`https://github.com/${USER}/${latest.name}`} target="_blank" rel="noreferrer">
              <i /> Last pushed to <b>{latest.name}</b> {ago(latest.pushed_at)}
            </a>
          )}
        </motion.div>
      </motion.div>
    </header>
  )
}
