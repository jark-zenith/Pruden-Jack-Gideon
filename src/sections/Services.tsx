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
    <section id="services" className="py-16 md:py-28 bg-transparent">
      <PageContainer>
        <SectionHeading
          title="Services"
          subtitle="How I can help with your projects and ideas"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2

            return (
              <div
                key={index}
                className="p-6 card-radius card-surface border border-transparent hover:shadow-[0_24px_60px_rgba(47,140,255,0.04)] transition-all"
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/8 flex items-center justify-center text-blue-300">
                    <Icon size={20} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-slate-100 mb-2">{service.title}</h3>

                <p className="text-slate-300 mb-4">{service.description}</p>

                {service.technologies && service.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded">
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
