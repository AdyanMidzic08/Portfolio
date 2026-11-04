import { useRef } from 'react'
import { motion, useScroll } from 'motion/react'
import { ease, useLang } from '../lib'
import { eyebrow, section } from '../ui'

export default function Experience() {
  const { t } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  return (
    <section id="experience" className={section}>
      <h2 className={eyebrow}>{t.experience}</h2>
      <div className="relative grid gap-[70px] border-l border-line pl-[clamp(28px,6vw,90px)]" ref={ref}>
        <motion.i className="absolute top-0 bottom-0 -left-0.5 w-[3px] origin-top bg-accent" style={{ scaleY: scrollYProgress }} />
        {t.timeline.map((item) => (
          <motion.article className="min-w-0" key={item.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8, ease }}>
            <span className="font-mono text-[13px] text-muted">{item.when}</span>
            <h3 className="mt-2.5 text-[clamp(32px,5vw,76px)] leading-none font-bold tracking-[-.04em] wrap-break-word hyphens-auto">{item.title}</h3>
            <h4 className="mt-2 text-[clamp(19px,2vw,28px)] font-medium text-accent">{item.where}</h4>
            <p className="mt-3.5 max-w-[54ch] text-[18px] leading-[1.4] text-body">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
