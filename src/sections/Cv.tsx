import { Download, FileText } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'
import { personalInfo } from '../data/personal'

// Check if CV file exists in public/documents
const cvPath = '/documents/Pruden-Jack-Gideon-CV.pdf'

export function Cv() {
  return (
    <section id="cv" className="py-20 md:py-32 bg-transparent">
      <PageContainer>
        <SectionHeading
          title="Curriculum Vitae"
          subtitle="My professional experience, education, and qualifications"
        />

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="p-8 rounded-xl bg-white border border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                <FileText className="text-purple-600" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#20201e]">
                  {personalInfo.name}
                </h3>
                <p className="text-gray-600">{personalInfo.role}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-600 mb-6">
                Download my CV to view my complete professional history, education, certifications, and achievements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button href={cvPath} variant="primary">
                  <Download size={18} />
                  Download CV (PDF)
                </Button>
                <Button href="#contact" variant="secondary">
                  Get in Touch
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-6">
                Last updated: December 2025 • v1.0 launching December 12, 2026
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
