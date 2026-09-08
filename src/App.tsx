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

function App() {
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
