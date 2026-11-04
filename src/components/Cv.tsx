import { AnimatePresence, motion } from 'motion/react'
import { ease, useLang } from '../lib'
import { eyebrow, primaryButton, section } from '../ui'

export default function Cv() {
  const { lang, setLang, t } = useLang()
  return (
    <section id="cv" className={`${section} bg-panel`}>
      <h2 className={eyebrow}>{t.cv}</h2>
      <div className="grid grid-cols-1 items-start gap-[clamp(28px,5vw,70px)] md:grid-cols-[1fr_minmax(0,620px)]">
        <div className="flex flex-col gap-7 md:sticky md:top-[100px]">
          <h3 className="text-[clamp(36px,5.4vw,84px)] leading-none font-bold tracking-[-.04em]">{t.cvTitle[0]}<br />{t.cvTitle[1]}</h3>
          <div className="flex flex-wrap gap-2.5">
            <div className="flex rounded-full border border-line bg-white p-1" role="group" aria-label={t.cvLanguage}>
              {(['en', 'de'] as const).map((l) => (
                <button
                  key={l}
                  className="relative rounded-full px-[18px] py-[9px] text-[15px] font-semibold transition-colors duration-200 aria-pressed:text-white"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                >
                  {lang === l && <motion.i className="absolute inset-0 rounded-full bg-ink" layoutId="cvpill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  <span className="relative">{l === 'en' ? 'English' : 'Deutsch'}</span>
                </button>
              ))}
            </div>
            <a className={primaryButton} href={`${import.meta.env.BASE_URL}cv/${lang}.pdf`} download={`Adyan_Midzic_CV_${lang.toUpperCase()}.pdf`}>{t.download}</a>
          </div>
        </div>
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              className="aspect-[1/1.414] origin-top overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_24px_70px_rgba(10,10,10,.1)]"
              key={lang}
              initial={{ opacity: 0, y: 24, rotateX: -6 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
            >
              <iframe className="size-full border-0" src={`${import.meta.env.BASE_URL}cv/${lang}.pdf#view=FitH&toolbar=0`} title={lang === 'en' ? 'CV in English' : 'Lebenslauf auf Deutsch'} />
            </motion.div>
          </AnimatePresence>
          <p className="mt-4 text-[14px] leading-[1.4] text-muted">
            {t.cvNote}
          </p>
        </div>
      </div>
    </section>
  )
}
