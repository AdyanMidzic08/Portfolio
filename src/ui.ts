// Tailwind class groups shared by several sections.
export const section = 'px-gut py-[clamp(90px,14vh,170px)]'
export const eyebrow = 'mb-[30px] font-mono text-[13px] font-medium tracking-[.08em] text-accent uppercase'
export const cta = 'flex flex-wrap items-center gap-2.5'

const button = 'inline-block rounded-full border font-semibold whitespace-nowrap transition-colors duration-200'
const small = 'px-[22px] py-[13px] text-[15px]'
const big = 'px-[30px] py-[17px] text-[18px]'

export const primaryButton = `${button} ${small} border-accent bg-accent text-white hover:border-ink hover:bg-ink`
export const ghostButton = `${button} ${small} border-ink bg-white/70 text-ink backdrop-blur-[8px] hover:bg-ink hover:text-white`
export const contactButton = `${button} ${big} border-ink bg-ink text-white hover:border-white hover:bg-white hover:text-ink`
export const contactGhostButton = `${button} ${big} border-white/70 bg-transparent text-white hover:bg-white hover:text-ink`
