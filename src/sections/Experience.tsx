import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-white">
      <PageContainer>
        <SectionHeading
          title="Experience"
          subtitle="Education, work, projects, and achievements along the way"
        />

        <div className="mt-16">
          {experience.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                Experience timeline coming soon.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {experience.map((item, index) => (
                <div key={index} className="relative pb-8">
                  {/* Timeline line */}
                  {index !== experience.length - 1 && (
                    <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-purple-200"></div>
                  )}

                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0">
                      <div className="relative z-10 w-9 h-9 rounded-full bg-purple-600 border-4 border-[#f7f6f2] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow pt-1">
                      <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-purple-700 bg-purple-50 rounded-full">
                        {item.type}
                      </div>
                      <h3 className="text-lg font-bold text-[#20201e] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-medium mb-1">
                        {item.organization}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.date}
                      </p>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  )
}
