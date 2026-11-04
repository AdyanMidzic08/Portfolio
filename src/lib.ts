import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { TEXT, USER, type Lang } from './data'

export const ease = [0.16, 1, 0.3, 1] as const

export const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: 'en', setLang: () => {} })

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  return { lang, setLang, t: TEXT[lang] }
}

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
  homepage: string | null
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

export function ago(iso: string, lang: Lang) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 864e5)
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  return days < 30 ? rtf.format(-days, 'day') : rtf.format(-Math.round(days / 30), 'month')
}

const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

// Phones with few cores or little memory, and anyone with data saver on, get a still image instead of WebGL.
export const lowPower = Boolean(device.connection?.saveData)
  || (matchMedia('(pointer: coarse)').matches && (device.hardwareConcurrency <= 4 || (device.deviceMemory ?? 8) < 4))

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
