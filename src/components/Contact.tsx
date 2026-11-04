import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import { EMAIL, LOCATION, PRIVACY, USER } from '../data'
import { contactButton, contactGhostButton, cta } from '../ui'
import Magnetic from './Magnetic'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1])
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard can be blocked; the address stays visible below the buttons.
    }
  }
  return (
    <footer id="contact" className="flex min-h-svh flex-col justify-end gap-6 overflow-hidden bg-accent px-gut pt-[110px] pb-[34px] text-white [&_:focus-visible]:outline-white" ref={ref}>
      <motion.h2 className="origin-bottom-left text-[clamp(66px,15.4vw,270px)] leading-[.84] font-extrabold tracking-[-.055em]" style={{ scale }}>Let's build<br />something.</motion.h2>
      <p className="max-w-[32ch] text-[clamp(19px,2vw,28px)] leading-[1.2]">Hiring for web or software development? I'd love to hear about your team.</p>
      <div className={cta}>
        <Magnetic><a className={contactButton} href={`mailto:${EMAIL}?subject=Hello%20Adyan`}>Email me</a></Magnetic>
        <button className={contactGhostButton} onClick={copy}>
          <AnimatePresence mode="wait">
            <motion.span className="inline-block" key={String(copied)} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} transition={{ duration: 0.18 }}>
              {copied ? 'Copied ✓' : 'Copy address'}
            </motion.span>
          </AnimatePresence>
        </button>
        <Magnetic><a className={contactGhostButton} href={`https://github.com/${USER}`} target="_blank" rel="noreferrer">GitHub ↗</a></Magnetic>
      </div>
      <small className="font-mono text-[13px]">{EMAIL}</small>
      <div className="grid gap-6 border-t border-white/30 pt-6 text-[13px] leading-[1.45] md:grid-cols-[1fr_2fr]">
        <section>
          <h3 className="mb-1.5 font-semibold">Legal notice (§ 25 MedienG)</h3>
          <p>Adyan Midzic, {LOCATION}<br />Personal website presenting my work and qualifications.<br />Contact: {EMAIL}</p>
        </section>
        <section>
          <h3 className="mb-1.5 font-semibold">Privacy</h3>
          <p>{PRIVACY}</p>
        </section>
      </div>
    </footer>
  )
}
