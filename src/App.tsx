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
    <div className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#20201e]">
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
