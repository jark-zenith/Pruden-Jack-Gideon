import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { personalInfo } from '../data/personal'

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <PageContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative mx-auto w-80 h-80 md:w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-100 rounded-2xl opacity-20"></div>
            <div className="absolute inset-4 bg-gradient-to-br from-purple-200 to-purple-50 rounded-2xl flex items-center justify-center border-2 border-purple-200">
              <span className="text-gray-400 font-medium text-center px-4">
                About Image
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionHeading title="About" centered={false} />

            <div className="mt-8 space-y-6 text-gray-600">
              <p className="text-lg leading-relaxed">
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
                <p className="text-sm text-gray-500 mb-3">
                  <strong>Location:</strong> {personalInfo.location}
                </p>
                {personalInfo.email && (
                  <p className="text-sm text-gray-500 mb-3">
                    <strong>Email:</strong>{' '}
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-purple-600 hover:underline"
                    >
                      {personalInfo.email}
                    </a>
                  </p>
                )}
                {personalInfo.availability && (
                  <p className="text-sm text-gray-500">
                    <strong>Availability:</strong> {personalInfo.availability}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
