import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { PROJECTS, TECH, USER, type Preview, type Project } from '../data'
import { ago, ease, type Repo } from '../lib'

const LINES: Record<Exclude<Preview, 'bars'>, string[]> = {
  http: ['$ curl -i localhost:8080', 'HTTP/1.1 200 OK', 'Content-Type: text/html', '<h1>hello from sockets</h1>'],
  router: ['$router->get("/", $home);', '$router->get("/about", $about);', '$router->static("/public");', '// listening on tcp://0.0.0.0'],
  todos: ['[x] Set up Express API', '[x] Build React dashboard', '[x] Add TypeScript types', '[ ] Next feature'],
  json: ['{', '  "title": "Movie title",', '  "status": "watched",', '  "favorite": true', '}'],
}

function ProjectPreview({ kind }: { kind: Preview }) {
  if (kind === 'bars') {
    return (
      <div className="pv bars" aria-hidden>
        {[38, 62, 45, 84, 56, 72, 94].map((h, i) => (
          <motion.i key={i} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.8, ease }} style={{ height: `${h}%` }} />
        ))}
      </div>
    )
  }
  return (
    <div className="pv code" aria-hidden>
      {LINES[kind].map((l, i) => (
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

function Card({ p, i, repo }: { p: Project; i: number; repo?: Repo }) {
  const mx = useMotionValue(0.5), my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 })
  return (
    <motion.a
      className="card"
      href={`https://github.com/${USER}/${p.repo}`}
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
      <ProjectPreview kind={p.preview} />
      <h3>{p.title}</h3>
      <p>{p.text}</p>
      <div className="chips">{p.stack.map((s) => <Chip key={s} name={s} />)}</div>
      <small>{repo ? `Updated ${ago(repo.pushed_at)}${repo.stargazers_count ? ` · ★ ${repo.stargazers_count}` : ''}` : 'View on GitHub'}</small>
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
  const cards = PROJECTS.map((p, i) => <Card key={p.repo} p={p} i={i} repo={repos.find((r) => r.name === p.repo)} />)
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
