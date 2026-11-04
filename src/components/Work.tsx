import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { FALLBACK_REPOS, HIDDEN_REPOS, MAX_PROJECTS, STACKS, TECH, USER } from '../data'
import { ago, type Repo } from '../lib'

// Real repo data from the GitHub API, shown as a small JSON response.
function RepoPreview({ repo }: { repo: Repo }) {
  const lines = [
    '{',
    `  "language": "${repo.language ?? 'n/a'}",`,
    `  "stars": ${repo.stargazers_count},`,
    ...(repo.pushed_at ? [`  "updated": "${ago(repo.pushed_at)}"`] : []),
    '}',
  ]
  return (
    <div className="pv code" aria-hidden>
      {lines.map((l, i) => (
        <motion.code key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}>{l}</motion.code>
      ))}
    </div>
  )
}

function Chip({ name }: { name: string }) {
  const Icon = TECH[name]
  if (!Icon) return <span className="chip">{name}</span>
  return <span className="chip icon" title={name} role="img" aria-label={name}><Icon /></span>
}

function Card({ repo, i }: { repo: Repo; i: number }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  const stack = STACKS[repo.name] ?? (repo.language ? [repo.language] : [])
  return (
    <motion.a
      className="card"
      href={`https://github.com/${USER}/${repo.name}`}
      target="_blank"
      rel="noreferrer"
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onPointerLeave={() => { mx.set(0.5); my.set(0.5) }}
    >
      <div className="card-head"><span>0{i + 1}</span><span className="arrow">↗</span></div>
      <RepoPreview repo={repo} />
      <h3>{repo.name.replace(/-/g, ' ')}</h3>
      <p>{repo.description}</p>
      <div className="chips">{stack.map((s) => <Chip key={s} name={s} />)}</div>
      <small>View on GitHub</small>
    </motion.a>
  )
}

export default function Work({ repos, horizontal }: { repos: Repo[]; horizontal: boolean }) {
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
  const live = repos.filter((r) => !r.fork && r.description && !HIDDEN_REPOS.includes(r.name)).slice(0, MAX_PROJECTS)
  const cards = (live.length ? live : FALLBACK_REPOS).map((r, i) => <Card key={r.name} repo={r} i={i} />)
  if (!horizontal) {
    return <section id="work" className="section panel"><h2 className="eyebrow">Selected work</h2><div className="stack">{cards}</div></section>
  }
  return (
    <section id="work" className="panel" ref={ref} style={{ height: `calc(100vh + ${dist}px)` }}>
      <div className="sticky">
        <motion.div className="hscroll" ref={track} style={{ x }}>
          <div className="work-intro"><h2 className="eyebrow">Selected work</h2><p>Things I built to understand how they work.</p><span>Keep scrolling →</span></div>
          {cards}
        </motion.div>
      </div>
    </section>
  )
}
