import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { personalInfo } from '../data/personal'

export function About() {
  return (
    <section id="about" className="py-16 md:py-28 bg-transparent">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative mx-auto w-72 h-72 md:w-full md:h-96 card-radius card-surface">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/6 to-red-500/4" />
            <div className="absolute inset-4 rounded-2xl flex items-center justify-center border border-slate-700/40">
              <span className="text-slate-400 font-medium text-center px-4">About Image</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeading title="About" centered={false} />

            <div className="mt-6 space-y-6 text-slate-300">
              <p className="text-base leading-relaxed">
                I'm a software developer and AI builder focused on creating digital experiences that matter.
              </p>

              <p className="leading-relaxed">
                My work spans frontend development, AI integration, and product thinking. I believe in building thoughtfully,
                learning in public, and creating technology that solves real problems.
              </p>

              <p className="leading-relaxed">
                Currently exploring the intersection of AI and product development, with particular interest in making AI
                practical and accessible to developers and users alike.
              </p>

              <div className="pt-4">
                <p className="text-sm text-slate-400 mb-3"><strong>Location:</strong> {personalInfo.location}</p>
                {personalInfo.email && (
                  <p className="text-sm text-slate-400 mb-3"><strong>Email:</strong>{' '}<a href={`mailto:${personalInfo.email}`} className="text-blue-300 hover:underline">{personalInfo.email}</a></p>
                )}
                {personalInfo.availability && (
                  <p className="text-sm text-slate-400"><strong>Availability:</strong> {personalInfo.availability}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
