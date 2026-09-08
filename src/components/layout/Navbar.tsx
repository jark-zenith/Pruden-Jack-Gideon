import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'CV', href: '#cv' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<string>('#home')

  const handleNavClick = () => setIsOpen(false)

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActive(`#${visibleEntry.target.id}`)
        }
      },
      { root: null, rootMargin: '0px 0px -35% 0px', threshold: [0.15, 0.35, 0.6] }
    )

    sections.forEach((section) => section && observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#050914]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-500/10 font-bold text-blue-300">
              PJ
            </span>
            <span className="hidden sm:inline">Pruden Jack Gideon</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/60 p-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={active === item.href ? 'page' : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${
                    active === item.href
                      ? 'bg-blue-500/15 text-blue-200 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.4)]'
                      : 'text-slate-300 hover:text-blue-300'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition-all hover:border-blue-300 hover:bg-blue-500/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Let&apos;s Talk
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-slate-200 transition-colors hover:border-blue-400/60 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-1 border-t border-slate-700/60 pb-4 pt-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                aria-current={active === item.href ? 'page' : undefined}
                className={`block rounded-xl px-3 py-2.5 text-base font-medium transition-colors ${
                  active === item.href
                    ? 'bg-slate-900 text-blue-300'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-blue-300'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="mt-2 block rounded-xl border border-blue-400/40 bg-blue-500/10 px-3 py-2.5 text-center text-base font-semibold text-blue-200"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
