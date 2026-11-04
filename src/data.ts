import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiDocker, SiExpress, SiFigma, SiGit, SiJavascript, SiMongodb, SiMysql, SiNextdotjs,
  SiNodedotjs, SiPhp, SiReact, SiTailwindcss, SiTypescript, SiVuedotjs,
} from 'react-icons/si'

export const USER = 'AdyanMidzic08'
export const EMAIL = 'a.midzic2@students.htl-leonding.ac.at'
export const NAV = ['about', 'work', 'experience', 'cv', 'contact']
export type Lang = 'en' | 'de'

// shortcut: Playwright has no icon in react-icons, so it stays out of the stack and appears in the internship text.
export const TECH: Record<string, IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Vue: SiVuedotjs,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  'Tailwind CSS': SiTailwindcss,
  Java: FaJava,
  PHP: SiPhp,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Git: SiGit,
  Figma: SiFigma,
}

// Repos that never appear under "Selected work". Forks and repos without a description are skipped automatically.
export const HIDDEN_REPOS = [USER, 'Listen', 'FirstVueApp']
export const MAX_PROJECTS = 6

// Project images, shown instead of the data panel on a card. Movies-API-TS and PDF-Converter use designed covers.
export const SHOTS: Record<string, string> = {
  Portfolio: 'assets/projects/portfolio.webp',
  'Expense-Tracker': 'assets/projects/expense-tracker.webp',
  'Java-Socket': 'assets/projects/java-socket.webp',
  'PHP-Webserver': 'assets/projects/php-webserver.webp',
  'Live-Dashboard': 'assets/projects/live-dashboard.webp',
  'Docker-Starter': 'assets/projects/docker-starter.webp',
  'Movies-API-TS': 'assets/projects/movies-api.webp',
  'PDF-Converter': 'assets/projects/pdf-converter.webp',
}

// GitHub only reports one main language per repo, so the full stack is listed here.
export const STACKS: Record<string, string[]> = {
  Portfolio: ['React', 'TypeScript', 'Tailwind CSS'],
  'Expense-Tracker': ['Next.js', 'Express', 'MySQL', 'Docker'],
  'Live-Dashboard': ['React', 'TypeScript', 'Express'],
  'Docker-Starter': ['Docker', 'Node.js', 'Express'],
}

const fallback = (name: string, description: string, language: string) =>
  ({ name, description, language, fork: false, homepage: null, pushed_at: '' })

// Shown only when the GitHub API can't be reached or the rate limit is used up.
export const FALLBACK_REPOS = [
  fallback('Expense-Tracker', 'Full-stack finance tracking with JWT authentication, personal dashboards and a fully containerized setup.', 'TypeScript'),
  fallback('Java-Socket', 'A lightweight HTTP web server built from scratch in Java, with manual request processing and no external frameworks.', 'Java'),
  fallback('PHP-Webserver', 'A lightweight HTTP web server in pure PHP, with a custom modular router and static file handling.', 'PHP'),
  fallback('Live-Dashboard', 'A full-stack productivity dashboard for managing todos in one place.', 'TypeScript'),
  fallback('Movies-API-TS', 'A type-safe REST API for managing a personal movie collection and watch status.', 'TypeScript'),
]

const en = {
  nav: { about: 'About', work: 'Work', experience: 'Experience', cv: 'CV', contact: 'Contact' } as Record<string, string>,
  navLabel: 'Main',
  backToTop: 'Back to top',
  switchLang: 'Auf Deutsch umschalten',
  otherLang: 'DE',
  techStack: 'Tech stack',
  roles: ['Web Developer', 'Software Engineer', 'Full-Stack Developer'],
  place: 'Leonding, Austria',
  pitch: "I build full-stack web apps, and I'm looking for a team to build the next ones with.",
  contactMe: 'Contact me',
  seeWork: 'See my work',
  lastPushed: 'Last pushed to',
  about: 'About',
  aboutText: "Hey, I'm Adyan, a student at HTL Leonding in Austria. TypeScript is my favorite language and React.js my favorite library. I love coding and turning ideas into things people enjoy using.",
  factRepos: 'public GitHub repositories',
  factInternship: 'software development internship',
  factStart: 'started at HTL Leonding',
  photoAlt: 'Adyan Midzic from behind, taking a photo with a Nikon camera, wearing a red jersey with the number 5',
  work: 'Selected work',
  workTitle: 'Things I built to understand how they work.',
  keepScrolling: 'Keep scrolling →',
  viewOnGithub: 'View on GitHub',
  liveDemo: 'Live demo',
  projects: {
    Portfolio: 'Built a WebGL hero with a custom shader, scroll-driven animations and live GitHub data, in English and German.',
    'Expense-Tracker': 'Built it end to end: JWT login with hashed passwords, payment and category management, and a Docker Compose setup connecting Next.js, Express and MySQL.',
    'Java-Socket': 'Wrote an HTTP web server on raw Java sockets, processing requests by hand and without any framework, to learn how the web works underneath.',
    'PHP-Webserver': 'Parses raw HTTP requests and writes valid HTTP/1.1 responses over native PHP sockets, with my own router and no Nginx or Apache.',
    'Live-Dashboard': 'Built todo management with optimistic UI updates, so every change feels instant, plus live statistics on total and completed tasks.',
    'Docker-Starter': 'Containerized a small Node.js and Express API to learn how Docker images and Docker Compose services work together.',
    'Movies-API-TS': 'Built a REST API and frontend in TypeScript to track a movie watchlist, with watched status and data saved in a JSON file.',
  } as Record<string, string>,
  experience: 'Experience',
  timeline: [
    { when: 'Jul – Aug 2026', title: 'Software Development Intern', where: 'ELEPHANTS 5 GmbH', text: 'Worked on a project using React, TypeScript, Node.js and MongoDB, and implemented automated tests with Playwright.' },
    { when: 'Since 2024', title: 'Media Technology', where: 'HTBLA Leonding', text: 'Technical secondary school focused on software development, web design and digital media.' },
  ],
  cv: 'CV',
  cvTitle: ['My full résumé,', 'in your language.'],
  cvLanguage: 'CV language',
  download: 'Download PDF',
  cvNote: 'For security reasons, my phone number and home address have been removed from this public version.',
  contactTitle: ["Let's build", 'something.'],
  contactText: "Hiring for web or software development? I'd love to hear about your team.",
  emailMe: 'Email me',
  copied: 'Copied ✓',
  copyAddress: 'Copy address',
  legalTitle: 'Legal notice (§ 25 MedienG)',
  legalPlace: 'Ansfelden, Austria',
  legalPurpose: 'Personal website presenting my work and qualifications.',
  legalContact: 'Contact',
  privacyTitle: 'Privacy',
  privacy: 'This site sets no cookies and uses no tracking. This site is hosted on GitHub Pages, and your browser loads my project data directly from the GitHub API. In both cases your IP address is sent to GitHub, Inc. (USA), which processes it in technical logs. This rests on my legitimate interest in presenting my work (Art. 6(1)(f) GDPR). If you email me, I use your message only to reply. You have the right to access, rectify, erase and restrict your data and to object, and you can complain to the Austrian Data Protection Authority (dsb.gv.at).',
}

// Typed as `en`, so a missing German text fails the build.
const de: typeof en = {
  nav: { about: 'Über', work: 'Projekte', experience: 'Erfahrung', cv: 'CV', contact: 'Kontakt' },
  navLabel: 'Hauptmenü',
  backToTop: 'Nach oben',
  switchLang: 'Switch to English',
  otherLang: 'EN',
  techStack: 'Technologien',
  roles: ['Webentwickler', 'Softwareentwickler', 'Full-Stack-Entwickler'],
  place: 'Leonding, Österreich',
  pitch: 'Ich entwickle Full-Stack-Web-Apps und suche ein Team, mit dem ich die nächsten baue.',
  contactMe: 'Kontakt aufnehmen',
  seeWork: 'Meine Projekte',
  lastPushed: 'Zuletzt gepusht auf',
  about: 'Über mich',
  aboutText: 'Hey, ich bin Adyan, Schüler an der HTL Leonding in Österreich. TypeScript ist meine Lieblingssprache und React.js meine Lieblingsbibliothek. Ich liebe es zu programmieren und Ideen in Dinge zu verwandeln, die Menschen gerne nutzen.',
  factRepos: 'öffentliche GitHub-Repositories',
  factInternship: 'Praktikum in der Softwareentwicklung',
  factStart: 'Start an der HTL Leonding',
  photoAlt: 'Adyan Midzic von hinten beim Fotografieren mit einer Nikon-Kamera, in einem roten Trikot mit der Nummer 5',
  work: 'Ausgewählte Projekte',
  workTitle: 'Dinge, die ich gebaut habe, um sie zu verstehen.',
  keepScrolling: 'Weiter scrollen →',
  viewOnGithub: 'Auf GitHub ansehen',
  liveDemo: 'Live-Demo',
  projects: {
    Portfolio: 'WebGL-Hero mit eigenem Shader, scrollgesteuerte Animationen und Live-Daten von GitHub, auf Englisch und Deutsch.',
    'Expense-Tracker': 'Komplett selbst gebaut: JWT-Login mit gehashten Passwörtern, Verwaltung von Zahlungen und Kategorien und ein Docker-Compose-Setup, das Next.js, Express und MySQL verbindet.',
    'Java-Socket': 'HTTP-Webserver auf reinen Java-Sockets, der Anfragen ohne Framework von Hand verarbeitet, um zu lernen, wie das Web im Kern funktioniert.',
    'PHP-Webserver': 'Liest rohe HTTP-Anfragen und schreibt gültige HTTP/1.1-Antworten über native PHP-Sockets, mit eigenem Router und ohne Nginx oder Apache.',
    'Live-Dashboard': 'Todo-Verwaltung mit optimistischen UI-Updates, damit jede Änderung sofort wirkt, dazu Live-Statistiken zu allen und erledigten Aufgaben.',
    'Docker-Starter': 'Kleine Node.js- und Express-API in Containern, um zu lernen, wie Docker-Images und Docker-Compose-Services zusammenspielen.',
    'Movies-API-TS': 'REST-API und Frontend in TypeScript für eine Film-Watchlist, mit Gesehen-Status und Speicherung in einer JSON-Datei.',
  },
  experience: 'Erfahrung',
  timeline: [
    { when: 'Juli – Aug. 2026', title: 'Praktikum Softwareentwicklung', where: 'ELEPHANTS 5 GmbH', text: 'Mitarbeit an einem Projekt mit React, TypeScript, Node.js und MongoDB sowie automatisierte Tests mit Playwright.' },
    { when: 'Seit 2024', title: 'Medientechnik', where: 'HTBLA Leonding', text: 'Höhere technische Schule mit Schwerpunkt auf Softwareentwicklung, Webdesign und digitalen Medien.' },
  ],
  cv: 'Lebenslauf',
  cvTitle: ['Mein Lebenslauf,', 'in Ihrer Sprache.'],
  cvLanguage: 'Sprache des Lebenslaufs',
  download: 'PDF herunterladen',
  cvNote: 'Aus Sicherheitsgründen wurden meine Telefonnummer und Adresse aus dieser öffentlichen Version entfernt.',
  contactTitle: ['Bauen wir', 'etwas.'],
  contactText: 'Sie suchen Verstärkung in der Web- oder Softwareentwicklung? Ich freue mich, Ihr Team kennenzulernen.',
  emailMe: 'E-Mail schreiben',
  copied: 'Kopiert ✓',
  copyAddress: 'Adresse kopieren',
  legalTitle: 'Offenlegung (§ 25 MedienG)',
  legalPlace: 'Ansfelden, Österreich',
  legalPurpose: 'Persönliche Website zur Präsentation meiner Arbeit und Qualifikationen.',
  legalContact: 'Kontakt',
  privacyTitle: 'Datenschutz',
  privacy: 'Diese Seite setzt keine Cookies und verwendet kein Tracking. Diese Seite wird über GitHub Pages bereitgestellt, und Ihr Browser lädt meine Projektdaten direkt von der GitHub-API. In beiden Fällen wird Ihre IP-Adresse an GitHub, Inc. (USA) übermittelt, die sie in technischen Logs verarbeitet. Dies beruht auf meinem berechtigten Interesse, meine Arbeit zu präsentieren (Art. 6 Abs. 1 lit. f DSGVO). Wenn Sie mir eine E-Mail schreiben, nutze ich Ihre Nachricht nur für die Antwort. Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Widerspruch und können sich bei der österreichischen Datenschutzbehörde beschweren (dsb.gv.at).',
}

export const TEXT: Record<Lang, typeof en> = { en, de }
