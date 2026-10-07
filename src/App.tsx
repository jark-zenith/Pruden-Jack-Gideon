import { useEffect, useState } from 'react'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Cv } from './sections/Cv'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Services } from './sections/Services'
import { Skills } from './sections/Skills'
import { OwnerDashboard } from './owner/OwnerDashboard'
import type { OwnerSession } from './owner/types'
import { getOwnerSession, logoutOwner } from './lib/adminApi'

function App() {
  const [isOwnerRoute, setIsOwnerRoute] = useState(window.location.pathname === '/owner')
  const [ownerSession, setOwnerSession] = useState<OwnerSession | null>(null)
  const [checkingOwner, setCheckingOwner] = useState(window.location.pathname === '/owner')

  useEffect(() => {
    const handlePopState = () => setIsOwnerRoute(window.location.pathname === '/owner')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (!isOwnerRoute) {
      setCheckingOwner(false)
      setOwnerSession(null)
      return
    }

    let cancelled = false
    setCheckingOwner(true)
    getOwnerSession()
      .then((session) => {
        if (!cancelled) setOwnerSession({ ownerId: session.ownerId, role: 'owner', expiresAt: session.expiresAt })
      })
      .catch(() => {
        if (!cancelled) {
          window.history.replaceState({}, '', '/')
          setIsOwnerRoute(false)
          setOwnerSession(null)
        }
      })
      .finally(() => {
        if (!cancelled) setCheckingOwner(false)
      })

    return () => { cancelled = true }
  }, [isOwnerRoute])

  if (isOwnerRoute) {
    if (checkingOwner) return <div className="grid min-h-screen place-items-center bg-[#050914] text-slate-300">Verifying secure owner session…</div>
    if (!ownerSession) return null

    return (
      <OwnerDashboard
        session={ownerSession}
        onSignOut={async () => {
          await logoutOwner().catch(() => undefined)
          window.history.replaceState({}, '', '/')
          setOwnerSession(null)
          setIsOwnerRoute(false)
        }}
      />
    )
  }

  return (
    <div className="site-shell text-slate-100">
      <div className="site-glow site-glow-blue" aria-hidden="true" />
      <div className="site-glow site-glow-red" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Cv />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
