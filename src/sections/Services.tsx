import {
  Code2,
  Sparkles,
  Zap,
  Palette,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { services } from '../data/services'

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  sparkles: Sparkles,
  zap: Zap,
  workflow: Zap,
  palette: Palette,
}

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#f7f6f2]">
      <PageContainer>
        <SectionHeading
          title="Services"
          subtitle="How I can help with your projects and ideas"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2

            return (
              <div
                key={index}
                className="p-8 rounded-xl bg-white border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <Icon size={24} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#20201e] mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                {service.technologies && service.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </PageContainer>
    </section>
  )
}
