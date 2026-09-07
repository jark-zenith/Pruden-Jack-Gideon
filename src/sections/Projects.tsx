import { PageContainer } from '../components/layout/PageContainer'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projects } from '../data/projects'

// Featured projects
const featuredProjects = projects.filter((p) => p.featured)

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-white">
      <PageContainer>
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of projects I'm proud of. More coming as work evolves."
        />

        {projects.length === 0 ? (
          <div className="mt-16 text-center py-12">
            <p className="text-gray-600">
              Projects are being documented and added to this section.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-[#20201e] mb-8">Featured</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}

            {/* All Projects */}
            {projects.length > featuredProjects.length && (
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-[#20201e] mb-8">All Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </PageContainer>
    </section>
  )
}
