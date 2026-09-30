import { BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { experience } from '../data/experience'

export function Experience() {
  const icons = [GraduationCap, Sparkles, BriefcaseBusiness]

  return (
    <section id="experience" className="py-20 md:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Trajectory"
          title="Experience & direction"
          subtitle="A living timeline of study, experimentation, and product building."
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative space-y-8">
            {experience.map((item, index) => {
              const Icon = icons[index % icons.length]
              return (
                <div key={item.title + index} className="relative pl-16">
                  {index !== experience.length - 1 && (
                    <div className="absolute left-[1.15rem] top-12 bottom-[-2rem] w-px bg-gradient-to-b from-blue-400/40 to-slate-800" />
                  )}
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                    <Icon size={18} />
                  </div>
                  <article className="card-surface card-radius p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="inline-flex rounded-full border border-blue-400/15 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">{item.type}</span>
                        <h3 className="mt-3 text-xl font-bold text-slate-100">{item.title}</h3>
                        <p className="mt-1 font-medium text-slate-300">{item.organization}</p>
                      </div>
                      <span className="text-sm text-slate-500">{item.date}</span>
                    </div>
                    <p className="mt-4 leading-relaxed text-slate-400">{item.description}</p>
                  </article>
                </div>
              )
            })}
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
