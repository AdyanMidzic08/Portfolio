import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { FALLBACK_REPOS, HIDDEN_REPOS, MAX_PROJECTS, SHOTS, STACKS, TECH, USER } from '../data'
import { ago, useLang, type Repo } from '../lib'
import { eyebrow, section } from '../ui'

// Real repo data from the GitHub API, shown as a small JSON response.
function RepoPreview({ repo, wide }: { repo: Repo; wide: boolean }) {
  const { lang } = useLang()
  const shot = SHOTS[repo.name]
  if (shot) {
    return <img className={`mb-2 min-h-[110px] w-full overflow-hidden rounded-xl border border-line object-cover object-top ${wide ? 'flex-1' : 'h-40 flex-none'}`} src={`${import.meta.env.BASE_URL}${shot}`} alt="" width={800} height={600} loading="lazy" />
  }
  const lines = [
    '{',
    `  "language": "${repo.language ?? 'n/a'}"${repo.pushed_at ? ',' : ''}`,
    ...(repo.pushed_at ? [`  "updated": "${ago(repo.pushed_at, lang)}"`] : []),
    '}',
  ]
  return (
    <div className={`mb-2 flex min-h-[110px] flex-col justify-center gap-1.5 overflow-hidden rounded-xl border border-line bg-panel p-4 ${wide ? 'flex-1' : 'h-40 flex-none'}`} aria-hidden>
      {lines.map((l, i) => (
        <motion.code
          className="font-mono text-[clamp(12px,1vw,14.5px)] whitespace-pre text-accent-text [font-variant-ligatures:none]"
          key={i}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
        >
          {l}
        </motion.code>
      ))}
    </div>
  )
}

function Chip({ name }: { name: string }) {
  const Icon = TECH[name]
  if (!Icon) return <span className="rounded-full border border-line px-[9px] py-[5px] font-mono text-[11.5px]">{name}</span>
  return <span className="inline-flex rounded-full border border-line p-1.5 text-[18px]" title={name} role="img" aria-label={name}><Icon /></span>
}

function Card({ repo, i, wide }: { repo: Repo; i: number; wide: boolean }) {
  const { t } = useLang()
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  const stack = STACKS[repo.name] ?? (repo.language ? [repo.language] : [])
  return (
    <motion.div
      className={`group relative flex flex-col gap-2.5 rounded-[20px] border border-line bg-surface p-[22px] transition-[border-color,box-shadow] duration-250 hover:border-accent hover:shadow-[0_18px_50px_rgba(178,3,55,.13)] ${wide ? 'h-[min(68vh,560px)] w-[clamp(330px,30vw,450px)]' : 'w-full'}`}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5) }}
    >
      <div className="flex justify-between font-mono text-[13px] text-muted">
        <span>0{i + 1}</span>
        <span className="text-[20px] leading-none text-ink transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px] group-hover:text-accent-text">↗</span>
      </div>
      <RepoPreview repo={repo} wide={wide} />
      <h3 className="text-[clamp(26px,2.4vw,36px)] leading-[1.05] font-bold tracking-[-.03em]">{repo.name.replace(/-/g, ' ')}</h3>
      <p className="line-clamp-5 text-[15px] leading-[1.35] text-body">{repo.description}</p>
      <div className="flex flex-wrap items-center gap-1.5">{stack.map((s) => <Chip key={s} name={s} />)}</div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[12px] text-muted">
        <a className="after:absolute after:inset-0" href={`https://github.com/${USER}/${repo.name}`} target="_blank" rel="noreferrer">{t.viewOnGithub}</a>
        {repo.homepage?.startsWith('http') && <a className="relative z-1 font-medium text-accent-text underline" href={repo.homepage} target="_blank" rel="noreferrer">{t.liveDemo} ↗</a>}
      </div>
    </motion.div>
  )
}

export default function Work({ repos, horizontal }: { repos: Repo[]; horizontal: boolean }) {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  useLayoutEffect(() => {
    if (!horizontal || !track.current) return
    const el = track.current
    const ro = new ResizeObserver(() => setDist(Math.max(0, el.scrollWidth - innerWidth)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [horizontal])
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const cards = (repos.length ? repos : FALLBACK_REPOS)
    .map((r) => ({ ...r, description: t.projects[r.name] ?? r.description }))
    .filter((r) => !r.fork && r.description && !HIDDEN_REPOS.includes(r.name))
    .slice(0, MAX_PROJECTS)
    .map((r, i) => <Card key={r.name} repo={r} i={i} wide={horizontal} />)
  if (!horizontal) {
    return <section id="work" className={`${section} bg-panel`}><h2 className={eyebrow}>{t.work}</h2><div className="grid gap-[18px]">{cards}</div></section>
  }
  return (
    <section id="work" className="bg-panel" ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div className="flex w-max items-stretch gap-[22px] px-gut pt-[70px] pb-5" ref={track} style={{ x }}>
          <div className="flex w-[33vw] min-w-[340px] flex-col justify-center pr-5">
            <h2 className={eyebrow}>{t.work}</h2>
            <p className="text-[clamp(36px,4.6vw,72px)] leading-none font-bold tracking-[-.04em]">{t.workTitle}</p>
            <span className="mt-[26px] font-mono text-[13px] text-muted">{t.keepScrolling}</span>
          </div>
          {cards}
        </motion.div>
      </div>
    </section>
  )
}
