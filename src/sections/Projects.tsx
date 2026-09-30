import { Github } from 'lucide-react'
import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

const featuredProjects = projects.filter((p) => p.featured)

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <PageContainer>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects in the lab."
          subtitle="A snapshot of the software, AI experiments, and digital products currently being built."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-500">More projects are being documented as they mature.</p>
          <a
            href="https://github.com/jark-zenith?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200"
          >
            <Github size={16} /> Browse all repositories
          </a>
        </div>
      </PageContainer>
    </section>
  )
}
