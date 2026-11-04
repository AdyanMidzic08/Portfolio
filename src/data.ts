import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiDocker, SiExpress, SiFigma, SiGit, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPhp, SiReact, SiTypescript,
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

export type Preview = 'bars' | 'http' | 'router' | 'todos' | 'json'
export type Project = { repo: string; title: string; text: string; stack: string[]; preview: Preview }

export const PROJECTS: Project[] = [
  { repo: 'Expense-Tracker', title: 'Expense Tracker', text: 'Full-stack finance tracking with JWT authentication, personal dashboards and a fully containerized setup.', stack: ['Next.js', 'Express', 'MySQL', 'Docker'], preview: 'bars' },
  { repo: 'Java-Socket', title: 'HTTP Server in Java', text: 'A web server written from scratch on Java sockets, with manual HTTP request parsing and no frameworks.', stack: ['Java', 'Sockets', 'HTTP'], preview: 'http' },
  { repo: 'PHP-Webserver', title: 'PHP Web Server', text: 'Raw TCP sockets in pure PHP, with a custom modular router and static file handling.', stack: ['PHP', 'TCP', 'Routing'], preview: 'router' },
  { repo: 'Live-Dashboard', title: 'Life Dashboard', text: 'A full-stack productivity dashboard for managing todos in one place.', stack: ['React', 'TypeScript', 'Express'], preview: 'todos' },
  { repo: 'Movies-API-TS', title: 'Movies API', text: 'A type-safe REST API for managing a personal movie collection and watch status.', stack: ['TypeScript', 'REST'], preview: 'json' },
]

export const TIMELINE = [
  { when: 'Jul – Aug 2026', title: 'Software Development Intern', where: 'ELEPHANTS 5 GmbH', text: 'Worked on a project using React, TypeScript, Node.js and MongoDB, and implemented automated tests with Playwright.' },
  { when: 'Since 2024', title: 'Media Technology', where: 'HTBLA Leonding', text: 'Technical secondary school focused on software development, web design and digital media.' },
]
