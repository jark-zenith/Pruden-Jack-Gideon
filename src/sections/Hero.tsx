import { ArrowDown, ArrowRight, Code2, Cpu, MapPin, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageContainer } from '../components/layout/PageContainer'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { personalInfo } from '../data/personal'

const stats = [
  { value: 'AI', label: 'Systems & assistants', icon: Cpu },
  { value: 'WEB', label: 'Products & interfaces', icon: Code2 },
  { value: 'KE', label: 'Built from Kenya', icon: MapPin },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[110px]" />
        <div className="absolute right-[-10rem] top-24 h-96 w-96 rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="hero-orbit absolute left-[58%] top-[42%] hidden h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10 lg:block" />
      </div>

      <PageContainer className="relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
              Building from Kenya · 2026
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Hello, I'm</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              PRUDEN
              <span className="block bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">JACK GIDEON.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-xl font-medium leading-relaxed text-slate-300 md:text-2xl">
              {personalInfo.role}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              {personalInfo.bio}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#projects" variant="primary" className="btn-soft">
                Explore My Work <ArrowRight size={17} />
              </Button>
              <Button href="#contact" variant="ghost" className="btn-soft">
                Start a Conversation
              </Button>
            </div>

            <div className="mt-8">
              <SocialLinks className="gap-3" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/70 bg-slate-950/70 p-4 shadow-2xl shadow-blue-950/30 backdrop-blur-xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_55%)]" />
              <div className="relative rounded-[1.5rem] border border-blue-400/15 bg-[#07101f]/80 p-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-blue-400">PRUDEN / PORTFOLIO</p>
                    <p className="mt-1 text-sm text-slate-400">Builder console</p>
                  </div>
                  <Sparkles size={18} className="text-blue-300" />
                </div>

                <div className="py-12 text-center">
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[2rem] border border-blue-400/30 bg-blue-500/[0.08] text-4xl font-black text-blue-200 shadow-[0_0_60px_rgba(59,130,246,0.14)]">
                    P
                  </div>
                  <p className="mt-6 text-lg font-bold text-white">Ideas → Systems → Products</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">A living portfolio of software, AI experiments, and the PRUDEN ecosystem.</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {stats.map(({ value, label, icon: Icon }) => (
                    <div key={value} className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                      <Icon size={14} className="mb-2 text-blue-400" />
                      <p className="text-xs font-bold text-slate-200">{value}</p>
                      <p className="mt-1 text-[10px] leading-4 text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-700 bg-[#050914]/95 px-4 py-2 text-xs text-slate-400 shadow-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {personalInfo.availability}
            </div>
          </motion.div>
        </div>

        <a href="#about" className="mx-auto mt-20 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 hover:text-blue-300">
          Scroll to explore <ArrowDown size={14} />
        </a>
      </PageContainer>
    </section>
  )
}
