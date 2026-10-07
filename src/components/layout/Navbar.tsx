import { useEffect, useState } from 'react'
import { LockKeyhole, Menu, X } from 'lucide-react'
import { loginOwner } from '../../lib/adminApi'

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
  const [showOwnerLogin, setShowOwnerLogin] = useState(false)
  const [ownerEmail, setOwnerEmail] = useState('')
  const [ownerPassword, setOwnerPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState<string>('#home')

  const openOwnerLogin = () => {
    setError('')
    setOwnerEmail('')
    setOwnerPassword('')
    setShowOwnerLogin(true)
    setIsOpen(false)
  }

  const handleOwnerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginOwner(ownerEmail, ownerPassword)
      window.history.pushState({}, '', '/owner')
      window.dispatchEvent(new PopStateEvent('popstate'))
      setShowOwnerLogin(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Owner authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href))
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visibleEntry) setActive('#' + visibleEntry.target.id)
      },
      { root: null, rootMargin: '0px 0px -35% 0px', threshold: [0.15, 0.35, 0.6] }
    )
    sections.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#050914]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <a href="#home" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-100">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/40 bg-blue-500/10 font-black text-blue-300">P</span>
              <span className="hidden sm:inline">PRUDEN / JACK GIDEON</span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              <div className="flex items-center gap-1 rounded-full border border-slate-800 bg-slate-950/60 p-1">
                {navItems.map((item) => <a key={item.label} href={item.href} className={`rounded-full px-3 py-2 text-sm font-medium transition-all ${active === item.href ? 'bg-blue-500/15 text-blue-200 shadow-[inset_0_0_0_1px_rgba(96,165,250,0.4)]' : 'text-slate-300 hover:text-blue-300'}`}>{item.label}</a>)}
              </div>
              <a href="#contact" className="rounded-xl border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">Let's Talk</a>
              <button type="button" onClick={openOwnerLogin} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-blue-400/60"><LockKeyhole size={16} /> Owner</button>
            </div>

            <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 p-2 text-slate-200 md:hidden" aria-expanded={isOpen} aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}>
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 md:hidden ${isOpen ? 'max-h-[34rem] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-1 border-t border-slate-700/60 pb-4 pt-3">
              {navItems.map((item) => <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-3 py-2.5 text-base font-medium text-slate-200 hover:bg-slate-800 hover:text-blue-300">{item.label}</a>)}
              <a href="#contact" onClick={() => setIsOpen(false)} className="mt-2 block rounded-xl border border-blue-400/40 bg-blue-500/10 px-3 py-2.5 text-center text-base font-semibold text-blue-200">Let's Talk</a>
              <button type="button" onClick={openOwnerLogin} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-base font-semibold text-slate-200"><LockKeyhole size={17} /> Owner Access</button>
            </div>
          </div>
        </div>
      </nav>

      {showOwnerLogin && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/90 p-4 backdrop-blur-md">
          <form onSubmit={handleOwnerSubmit} className="w-full max-w-md rounded-3xl border border-blue-400/25 bg-[#07101f] p-7 shadow-2xl shadow-blue-950/40">
            <div className="mb-6 flex items-center justify-between">
              <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">PRUDEN secure area</p><h2 className="mt-2 text-2xl font-bold text-white">Owner Sign In</h2></div>
              <button type="button" onClick={() => setShowOwnerLogin(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800"><X size={20} /></button>
            </div>
            <label className="text-sm font-medium text-slate-300">Owner email</label>
            <input autoFocus type="email" value={ownerEmail} onChange={(e) => setOwnerEmail(e.target.value)} placeholder="Owner email" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-blue-400" required />
            <label className="mt-4 block text-sm font-medium text-slate-300">Admin password</label>
            <input type="password" value={ownerPassword} onChange={(e) => setOwnerPassword(e.target.value)} placeholder="Admin password" autoComplete="current-password" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none focus:border-blue-400" required />
            {error && <p className="mt-3 rounded-lg border border-red-400/20 bg-red-500/5 px-3 py-2 text-sm text-red-300">{error}</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">Only the configured owner email and server-side admin password can enter. Credentials are never stored in the browser.</p>
            <button disabled={loading} type="submit" className="mt-6 w-full rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Authenticating…' : 'Sign in securely'}</button>
          </form>
        </div>
      )}
    </>
  )
}
