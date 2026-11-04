import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ease, useLang, type Repo } from '../lib'
import { eyebrow, section } from '../ui'

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{word} </motion.span>
}

function Count({ to }: { to: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.2, ease, onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return <b className="block text-[clamp(54px,7vw,110px)] leading-none font-extrabold tracking-[-.05em] text-accent tabular-nums" ref={ref}>{n}</b>
}

function Fact({ to, label }: { to: number; label: string }) {
  return <div className="pt-5"><Count to={to} /><span className="text-[15px] text-muted">{label}</span></div>
}

export default function About({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const { t } = useLang()
  const words = t.aboutText.split(' ')
  return (
    <section id="about" className={section}>
      <h2 className={eyebrow}>{t.about}</h2>
      <div className="grid grid-cols-1 items-center gap-[clamp(28px,5vw,80px)] md:grid-cols-[1fr_minmax(240px,min(27vw,400px))]">
        <p className="text-[clamp(30px,4.3vw,72px)] leading-[1.04] font-semibold tracking-[-.035em]" ref={ref} aria-label={t.aboutText}>
          <span aria-hidden>{words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}</span>
        </p>
        <motion.div
          className="max-w-80 overflow-hidden rounded-[20px] bg-panel md:max-w-none"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease }}
        >
          <motion.img
            className="h-auto w-full"
            src={`${import.meta.env.BASE_URL}assets/Adyan.jpeg`}
            alt={t.photoAlt}
            width={400}
            height={400}
            loading="lazy"
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease }}
          />
        </motion.div>
      </div>
      <div className="mt-[50px] grid grid-cols-1 gap-5 border-t border-line md:mt-20 md:grid-cols-3">
        <Fact to={repos.length || 12} label={t.factRepos} />
        <Fact to={1} label={t.factInternship} />
        <Fact to={2024} label={t.factStart} />
      </div>
    </section>
  )
}
