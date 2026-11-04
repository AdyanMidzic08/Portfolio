import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ease } from '../lib'

export default function Cv() {
  const [lang, setLang] = useState<'en' | 'de'>('en')
  return (
    <section id="cv" className="section panel">
      <h2 className="eyebrow">CV</h2>
      <div className="cv-grid">
        <div className="cv-head">
          <h3>My full résumé,<br />in your language.</h3>
          <div className="cv-actions">
            <div className="switch" role="group" aria-label="CV language">
              {(['en', 'de'] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}>
                  {lang === l && <motion.i layoutId="cvpill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  <span>{l === 'en' ? 'English' : 'Deutsch'}</span>
                </button>
              ))}
            </div>
            <a className="btn" href={`/cv/${lang}.pdf`} download={`Adyan_Midzic_CV_${lang.toUpperCase()}.pdf`}>Download PDF</a>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div className="cv-frame" key={lang} initial={{ opacity: 0, y: 24, rotateX: -6 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.45, ease }}>
            <iframe src={`/cv/${lang}.pdf#view=FitH&toolbar=0`} title={lang === 'en' ? 'CV in English' : 'Lebenslauf auf Deutsch'} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
