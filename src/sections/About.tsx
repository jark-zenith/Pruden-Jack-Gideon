import { ArrowUpRight, MapPin, Sparkles } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { personalInfo } from '../data/personal'

export function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <PageContainer>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card-surface card-radius relative min-h-[360px] overflow-hidden p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,140,255,0.22),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(226,61,86,0.16),transparent_30%)]" />
            <div className="relative flex h-full min-h-[300px] flex-col justify-between">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
                <span>PRUDEN / 001</span>
                <span>Profile</span>
              </div>
              <div>
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-500/10 text-blue-300">
                  <Sparkles size={28} />
                </div>
                <p className="max-w-sm text-2xl font-semibold leading-tight text-slate-100">
                  Building the bridge between imagination and working technology.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-blue-400" />
                {personalInfo.location}
              </div>
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="About the builder" title="I build, test, learn, and build again." centered={false} />
            <div className="mt-7 space-y-5 text-slate-300">
              <p className="text-lg leading-relaxed">{personalInfo.bio}</p>
              <p className="leading-relaxed">
                My work sits across frontend engineering, AI experimentation, backend foundations, and product design.
                I enjoy taking an ambitious idea, breaking it into smaller systems, and turning those systems into something people can actually use.
              </p>
              <p className="leading-relaxed">
                I am especially interested in AI-assisted development, intelligent interfaces, developer tools, and technology products built from Kenya for a wider audience.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Software development</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Artificial intelligence</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300">Digital products</span>
              </div>
              <a href="#projects" className="inline-flex items-center gap-2 pt-3 text-sm font-semibold text-blue-300 hover:text-blue-200">
                Explore the work <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
