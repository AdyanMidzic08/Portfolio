import { lazy, Suspense, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { USER } from '../data'
import { ago, ease, go, lowPower, useLang, type Repo } from '../lib'
import { cta, ghostButton, primaryButton } from '../ui'
import Magnetic from './Magnetic'

const Field = lazy(() => import('./Field'))

function Letters({ word, delay, ready }: { word: string; delay: number; ready: boolean }) {
  return (
    <span className="pointer-events-auto flex w-max" aria-hidden>
      {[...word].map((l, i) => (
        <span className="-mr-[.07em] -mb-[.09em] -ml-[.03em] inline-block overflow-hidden pt-[.03em] pr-[.05em] pb-[.14em] pl-[.03em] tracking-normal" key={i}>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={ready ? { y: 0 } : undefined}
            transition={{ duration: 1, ease, delay: delay + i * 0.045 }}
            whileHover={{ color: 'var(--color-accent-text)', y: '-5%', transition: { duration: 0.2 } }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

function Roles() {
  const { t } = useLang()
  const [i, setI] = useState(0)
  const count = t.roles.length
  useEffect(() => {
    const timer = setInterval(() => setI((v) => (v + 1) % count), 2400)
    return () => clearInterval(timer)
  }, [count])
  return (
    <span className="relative inline-flex min-h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span className="block" key={i} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.4, ease }}>
          {t.roles[i]}
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
  const { lang, t } = useLang()
  return (
    <header
      className="relative flex min-h-svh overflow-hidden after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-[22%] after:bg-linear-to-b after:from-transparent after:to-surface"
      id="top"
    >
      {still || lowPower
        ? <img className="absolute inset-0 size-full object-cover dark:mix-blend-screen dark:invert dark:hue-rotate-180" src={`${import.meta.env.BASE_URL}assets/wave.webp`} alt="" width={1280} height={800} />
        : <div className="absolute inset-0"><Suspense fallback={null}><Field /></Suspense></div>}
      <motion.div className="pointer-events-none relative z-1 flex flex-1 flex-col justify-end gap-[clamp(14px,2.4vh,28px)] px-gut pt-24 pb-[clamp(24px,4vh,44px)]" style={{ y, opacity }}>
        <motion.div className="flex justify-between font-mono text-[clamp(12px,1.2vw,15px)] text-accent-text" initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : undefined} transition={{ delay: 0.7 }}>
          <Roles />
          <span className="hidden md:inline">{t.place}</span>
        </motion.div>
        <h1 className="flex flex-col text-[clamp(82px,min(21.5vw,31vh),400px)] leading-[.86] font-extrabold tracking-[-.055em]" aria-label="Adyan Midzic">
          <Letters word="Adyan" delay={0.05} ready={ready} />
          <Letters word="Midzic" delay={0.25} ready={ready} />
        </h1>
        <motion.div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-[18px] md:items-center" initial={{ opacity: 0, y: 24 }} animate={ready ? { opacity: 1, y: 0 } : undefined} transition={{ delay: 0.9, duration: 0.8, ease }}>
          <p className="max-w-[36ch] text-[clamp(17px,1.6vw,22px)] leading-[1.25]">{t.pitch}</p>
          <div className={cta}>
            <Magnetic><button className={`${primaryButton} pointer-events-auto`} onClick={() => go('contact')}>{t.contactMe}</button></Magnetic>
            <Magnetic><button className={`${ghostButton} pointer-events-auto`} onClick={() => go('work')}>{t.seeWork}</button></Magnetic>
          </div>
          {latest && (
            <a className="pointer-events-auto flex w-full flex-wrap items-center gap-2 font-mono text-[12.5px] text-muted" href={`https://github.com/${USER}/${latest.name}`} target="_blank" rel="noreferrer">
              <i className="size-2 animate-ring rounded-full bg-accent" /> {t.lastPushed} <b className="font-medium text-ink">{latest.name}</b> {ago(latest.pushed_at, lang)}
            </a>
          )}
        </motion.div>
      </motion.div>
    </header>
  )
}
