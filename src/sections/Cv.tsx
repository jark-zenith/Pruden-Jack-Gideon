import { ExternalLink, FileText } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { personalInfo } from '../data/personal'

export function Cv() {
  return (
    <section id="cv" className="py-20 md:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Documents"
          title="Curriculum Vitae"
          subtitle="A concise record of my education, technical work, and ongoing development."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="card-surface card-radius p-7 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
                <FileText size={28} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Professional document</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-100">{personalInfo.name}</h3>
                <p className="mt-1 text-slate-400">{personalInfo.role}</p>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-7">
              <p className="max-w-2xl leading-relaxed text-slate-400">
                The portfolio is ready for the current CV document to be uploaded through the owner workflow.
                Once the PDF is available, this section can expose it as the public download.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" variant="primary">
                  Request CV <ExternalLink size={17} />
                </Button>
                <Button href="https://github.com/jark-zenith" variant="secondary">View GitHub</Button>
              </div>
              <p className="mt-6 text-xs text-slate-500">Recommended public file path: public/documents/Pruden-Jack-Gideon-CV.pdf</p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
