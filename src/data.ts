import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiDocker, SiExpress, SiFigma, SiGit, SiJavascript, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPhp, SiReact, SiTypescript, SiVuedotjs,
} from 'react-icons/si'

export const USER = 'AdyanMidzic08'
export const EMAIL = 'a.midzic2@students.htl-leonding.ac.at'
export const NAV = ['about', 'work', 'experience', 'cv', 'contact']
export const ROLES = ['Web Developer', 'Software Engineer', 'Full-Stack Developer']
export const ABOUT = "Hey, I'm Adyan, a student at HTL Leonding in Austria. TypeScript is my favorite language and React.js my favorite library. I love building for the web, from the database to the final pixel."

// shortcut: Playwright has no icon in react-icons, so it stays out of the stack and appears in the internship text.
export const TECH: Record<string, IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Vue: SiVuedotjs,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  Java: FaJava,
  PHP: SiPhp,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Git: SiGit,
  Figma: SiFigma,
}

// Repos that never appear under "Selected work". Forks and repos without a description are skipped automatically.
export const HIDDEN_REPOS = [USER, 'Portfolio', 'Listen']
export const MAX_PROJECTS = 6

// GitHub only reports one main language per repo, so the full stack is listed here.
export const STACKS: Record<string, string[]> = {
  'Expense-Tracker': ['Next.js', 'Express', 'MySQL', 'Docker'],
  'Live-Dashboard': ['React', 'TypeScript', 'Express'],
  'Docker-Starter': ['Docker', 'Node.js', 'Express'],
}

const fallback = (name: string, description: string, language: string) =>
  ({ name, description, language, fork: false, stargazers_count: 0, pushed_at: '' })

// Shown only when the GitHub API can't be reached or the rate limit is used up.
export const FALLBACK_REPOS = [
  fallback('Expense-Tracker', 'Full-stack finance tracking with JWT authentication, personal dashboards and a fully containerized setup.', 'TypeScript'),
  fallback('Java-Socket', 'A lightweight HTTP web server built from scratch in Java, with manual request processing and no external frameworks.', 'Java'),
  fallback('PHP-Webserver', 'A lightweight HTTP web server in pure PHP, with a custom modular router and static file handling.', 'PHP'),
  fallback('Live-Dashboard', 'A full-stack productivity dashboard for managing todos in one place.', 'TypeScript'),
  fallback('Movies-API-TS', 'A type-safe REST API for managing a personal movie collection and watch status.', 'TypeScript'),
]

export const TIMELINE = [
  { when: 'Jul – Aug 2026', title: 'Software Development Intern', where: 'ELEPHANTS 5 GmbH', text: 'Worked on a project using React, TypeScript, Node.js and MongoDB, and implemented automated tests with Playwright.' },
  { when: 'Since 2024', title: 'Media Technology', where: 'HTBLA Leonding', text: 'Technical secondary school focused on software development, web design and digital media.' },
]
