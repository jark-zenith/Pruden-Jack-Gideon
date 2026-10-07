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

function App() {
  const [isOwnerPreview, setIsOwnerPreview] = useState(window.location.pathname === '/owner')

  useEffect(() => {
    const handlePopState = () => setIsOwnerPreview(window.location.pathname === '/owner')
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (isOwnerPreview) {
    const previewSession: OwnerSession = {
      ownerId: 'owner-preview',
      role: 'owner',
      expiresAt: 'Backend auth pending',
    }

    return (
      <OwnerDashboard
        session={previewSession}
        onSignOut={() => {
          window.history.pushState({}, '', '/')
          setIsOwnerPreview(false)
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
