import { Mail, MessageCircle, Phone } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { personalInfo } from '../data/personal'

const emails = ['jarkpruden@gmail.com', 'developerjarkai@gmail.com']

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Open channel"
          title="Let's build something."
          subtitle="For collaborations, internships, attachment opportunities, freelance work, or technology conversations, connect with me directly."
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <div className="card-surface card-radius overflow-hidden p-7 sm:p-10">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">Direct contact</p>
                <h3 className="mt-3 text-2xl font-bold text-slate-100">Contact PRUDEN / JARK</h3>
                <div className="mt-7 grid gap-4">
                  {emails.map((email) => (
                    <a key={email} href={`mailto:${email}`} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-200 transition hover:border-blue-400/40 hover:text-blue-300">
                      <Mail size={18} className="text-blue-400" /> {email}
                    </a>
                  ))}
                  <a href="tel:+254180574470" className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-slate-200 transition hover:border-blue-400/40 hover:text-blue-300">
                    <Phone size={18} className="text-blue-400" /> +254 180 574470
                  </a>
                  <a href="https://wa.me/254180574470" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 font-semibold text-emerald-300 transition hover:bg-emerald-500/15">
                    <MessageCircle size={19} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-blue-400/15 bg-blue-500/[0.04] p-6">
                <p className="text-sm font-semibold text-slate-200">Current availability</p>
                <p className="mt-3 leading-relaxed text-slate-400">{personalInfo.availability}</p>
                <div className="mt-6 h-px bg-slate-800" />
                <div className="mt-6 flex items-center justify-between text-sm"><span className="text-slate-500">Based in</span><span className="text-slate-200">{personalInfo.location}</span></div>
                <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Direct channels</p>
                  <p className="mt-2 text-sm text-slate-300">WhatsApp, email and phone are open for professional enquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
      <a href="https://wa.me/254180574470" target="_blank" rel="noreferrer" aria-label="Chat with Pruden on WhatsApp" className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full border border-emerald-300/30 bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 transition hover:-translate-y-1 hover:bg-emerald-400 md:bottom-8 md:right-8">
        <MessageCircle size={27} />
      </a>
    </section>
  )
}
