import { BrainCircuit, Building2 } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'

const ventures = [
  { name: 'Pruden Technologies', role: 'Founder', category: 'Technology venture · Kenya', description: 'An early-stage technology venture focused on building websites, web applications, AI-enabled digital solutions, and practical automation for people and businesses.', focus: ['Web development', 'Web applications', 'AI-enabled solutions', 'Digital services'], Icon: Building2 },
  { name: 'TeraVex', role: 'Founder', category: 'AI & technology research · Kenya', description: 'An emerging Kenyan AI and research venture exploring artificial intelligence, technology research, experimentation, and innovation-led solutions.', focus: ['Artificial intelligence', 'Technology research', 'Experimentation', 'Innovation'], Icon: BrainCircuit },
]

export function Ventures() {
  return (
    <section id="ventures" className="py-20 md:py-28">
      <PageContainer>
        <SectionHeading eyebrow="Leadership & initiative" title="Ventures I am building" subtitle="My founder journey through early-stage technology and research initiatives in Kenya." />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ventures.map(({ name, role, category, description, focus, Icon }) => (
            <article key={name} className="card-surface card-radius border border-slate-700/50 p-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300"><Icon size={22} /></div>
                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">{role}</span>
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{category}</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-100">{name}</h3>
              <p className="mt-4 leading-relaxed text-slate-300">{description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{focus.map((item) => <span key={item} className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-300">{item}</span>)}</div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  )
}
