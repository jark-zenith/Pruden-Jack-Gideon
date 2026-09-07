import { Mail, MessageSquare, Phone } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { SocialLinks } from '../components/ui/SocialLinks'
import { personalInfo } from '../data/personal'

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <PageContainer>
        <SectionHeading
          title="Let's Talk"
          subtitle="I'm always interested in new ideas and opportunities"
        />

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="p-8 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-200">
            {/* Contact Methods */}
            <div className="space-y-6 mb-8">
              {personalInfo.email && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#20201e] mb-1">Email</h3>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-purple-600 hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#20201e] mb-1">Phone</h3>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-purple-600 hover:underline"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <MessageSquare className="text-purple-600" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#20201e] mb-3">Connect on Social</h3>
                  <SocialLinks className="gap-3" />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-purple-200"></div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                The best way to reach me is by email or through my social channels.
              </p>
              <Button href={`mailto:${personalInfo.email || 'contact@prudenackgideon.dev'}`} variant="primary">
                Send an Email
              </Button>
            </div>
          </div>

          {/* Optional Contact Form */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              A contact form is coming soon. For now, please reach out via email or social media.
            </p>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
