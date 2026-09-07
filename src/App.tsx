import { ArrowUpRight, Github, Mail } from 'lucide-react'

const navItems = ['About', 'Skills', 'Projects', 'Contact']

function App() {
  return (
    <main className="min-h-screen bg-[#f7f5ff] text-[#17151f]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          PJG<span className="text-violet-600">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-neutral-600 md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-violet-600">
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="rounded-full bg-[#17151f] px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          Let&apos;s Talk
        </a>
      </nav>

      <section id="top" className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
        <div>
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.24em] text-violet-600">
            Developer · AI Builder · Creative Technologist
          </p>
          <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-7xl lg:text-8xl">
            Pruden Jack <span className="text-violet-600">Gideon.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 sm:text-xl">
            I build software, AI experiences, and digital products while turning ideas into useful things people can actually use.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3.5 font-medium text-white transition hover:-translate-y-1 hover:bg-violet-700">
              View my work <ArrowUpRight size={18} />
            </a>
            <a href="#contact" className="rounded-full border border-black/10 bg-white px-6 py-3.5 font-medium transition hover:-translate-y-1 hover:border-violet-300">
              Start a conversation
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-5 rounded-[3rem] bg-violet-200/50 blur-2xl" />
          <div className="relative aspect-square rounded-[2.5rem] border border-white/80 bg-white p-5 shadow-2xl shadow-violet-200/50">
            <div className="flex h-full flex-col justify-between rounded-[2rem] bg-[#17151f] p-7 text-white">
              <span className="text-sm text-white/50">01 / 01</span>
              <div>
                <div className="mb-5 h-16 w-16 rounded-2xl bg-violet-500/20 ring-1 ring-violet-300/30" />
                <p className="text-3xl font-semibold tracking-tight">Build. Learn. Ship.</p>
                <p className="mt-3 text-sm leading-6 text-white/55">A portfolio that grows with the work.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-black/5 bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">About</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">A personal space for the work behind the name.</h2>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">
            This site is being developed as a living record of my journey in software engineering, artificial intelligence, web development, and entrepreneurship.
          </p>
        </div>
      </section>

      <section id="skills" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Skills</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['React + TypeScript', 'AI & APIs', 'Node.js', 'UI / UX'].map((skill) => (
              <div key={skill} className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
                <p className="font-medium">{skill}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">Growing through real projects and continuous practice.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-black/5 bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-600">Projects</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Things I&apos;m building.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {['J.A.R.K-AI', 'J.A.R.K-OS', 'Mtaani Marketplace'].map((project, index) => (
              <article key={project} className="group rounded-[2rem] bg-[#f7f5ff] p-7 transition hover:-translate-y-1">
                <span className="text-sm text-violet-600">0{index + 1}</span>
                <h3 className="mt-16 text-2xl font-semibold">{project}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-500">Project case study coming as the portfolio evolves.</p>
                <ArrowUpRight className="mt-8 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-[#17151f] px-7 py-14 text-white sm:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Contact</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">Have an idea worth building?</h2>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#17151f]"><Mail size={18} /> Email me</a>
            <a href="https://github.com/jark-zenith" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-medium"><Github size={18} /> GitHub</a>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl justify-between px-6 pb-8 text-sm text-neutral-500 lg:px-8">
        <span>© 2026 Pruden Jack Gideon</span>
        <span>Built with intention.</span>
      </footer>
    </main>
  )
}

export default App
