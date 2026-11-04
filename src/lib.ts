import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { USER } from './data'

export const ease = [0.16, 1, 0.3, 1] as const

let lenis: Lenis | null = null

export function startSmoothScroll() {
  const instance = new Lenis({ lerp: 0.09 })
  lenis = instance
  let raf = requestAnimationFrame(function loop(t) {
    instance.raf(t)
    raf = requestAnimationFrame(loop)
  })
  return () => {
    cancelAnimationFrame(raf)
    instance.destroy()
    lenis = null
  }
}

export function go(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView()
}

export type Repo = {
  name: string
  description: string | null
  language: string | null
  fork: boolean
  stargazers_count: number
  pushed_at: string
}

// shortcut: unauthenticated GitHub API allows 60 requests/hour per visitor, Work falls back to FALLBACK_REPOS above that.
export function useGithub() {
  const [repos, setRepos] = useState<Repo[]>([])
  useEffect(() => {
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=pushed`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : []))
      .then(setRepos)
      .catch(() => {})
    return () => ctrl.abort()
  }, [])
  return repos
}

export function ago(iso: string) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 864e5)
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  return days < 30 ? rtf.format(-days, 'day') : rtf.format(-Math.round(days / 30), 'month')
}

export function useDesktop() {
  const [desktop, setDesktop] = useState(() => matchMedia('(min-width: 900px)').matches)
  useEffect(() => {
    const mq = matchMedia('(min-width: 900px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}
