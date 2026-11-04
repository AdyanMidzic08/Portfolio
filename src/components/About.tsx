import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'motion/react'
import { ABOUT } from '../data'
import { ease, type Repo } from '../lib'

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
  return <b ref={ref}>{n}</b>
}

export default function About({ repos }: { repos: Repo[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const words = ABOUT.split(' ')
  return (
    <section id="about" className="section">
      <h2 className="eyebrow">About</h2>
      <div className="about-grid">
        <p className="about" ref={ref} aria-label={ABOUT}>
          <span aria-hidden>{words.map((w, i) => <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}</span>
        </p>
        <motion.div
          className="photo"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.1, ease }}
        >
          <motion.img
            src="/assets/Adyan.jpeg"
            alt="Adyan Midzic from behind, taking a photo with a Nikon camera, wearing a red jersey with the number 5"
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
      <div className="facts">
        <div><Count to={repos.length || 12} /><span>public GitHub repositories</span></div>
        <div><Count to={1} /><span>software development internship</span></div>
        <div><Count to={2024} /><span>started at HTL Leonding</span></div>
      </div>
    </section>
  )
}
