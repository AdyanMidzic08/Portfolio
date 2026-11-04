import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { TIMELINE } from '../data'
import { ease } from '../lib'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  return (
    <section id="experience" className="section">
      <h2 className="eyebrow">Experience</h2>
      <div className="timeline" ref={ref}>
        <motion.i style={{ scaleY: scrollYProgress }} />
        {TIMELINE.map((t) => (
          <motion.article key={t.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8, ease }}>
            <span>{t.when}</span>
            <h3>{t.title}</h3>
            <h4>{t.where}</h4>
            <p>{t.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
