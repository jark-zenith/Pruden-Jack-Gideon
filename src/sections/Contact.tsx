import { ArrowUpRight, Mail, MessageSquare, Phone } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { personalInfo } from '../data/personal'

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Open channel"
          title="Let's build something."
          subtitle="For collaborations, internships, freelance work, or technology conversations, connect with me through the channels below."
        />

        <div className="mx-auto mt-12 max-w-4xl">
          <div className="card-surface card-radius overflow-hidden p-7 sm:p-10">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Contact</p>
                <h3 className="mt-3 text-2xl font-bold text-slate-100">Start with a message.</h3>
                <p className="mt-4 max-w-lg leading-relaxed text-slate-400">
                  I keep this portfolio intentionally simple: the work comes first, and direct communication handles the rest.
                </p>

                <div className="mt-7 space-y-4">
                  {personalInfo.email && (
                    <a href={'mailto:' + personalInfo.email} className="flex items-center gap-3 text-slate-200 hover:text-blue-300">
                      <Mail size={18} className="text-blue-400" /> {personalInfo.email}
                    </a>
                  )}
                  {personalInfo.phone && (
                    <a href={'tel:' + personalInfo.phone} className="flex items-center gap-3 text-slate-200 hover:text-blue-300">
                      <Phone size={18} className="text-blue-400" /> {personalInfo.phone}
                    </a>
                  )}
                  {!personalInfo.email && !personalInfo.phone && (
                    <p className="flex items-center gap-3 text-sm text-slate-500">
                      <MessageSquare size={18} className="text-blue-400" /> Direct email can be added from the owner dashboard.
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <SocialLinks className="gap-3" />
                </div>
              </div>

              <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.04] p-6">
                <p className="text-sm font-semibold text-slate-200">Current availability</p>
                <p className="mt-3 leading-relaxed text-slate-400">{personalInfo.availability}</p>
                <div className="mt-6 h-px bg-slate-800" />
                <div className="mt-6 flex items-center justify-between text-sm">
                  <span className="text-slate-500">Based in</span>
                  <span className="text-slate-200">{personalInfo.location}</span>
                </div>
                <Button href="https://github.com/jark-zenith" variant="ghost" className="mt-7 w-full">
                  GitHub <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
