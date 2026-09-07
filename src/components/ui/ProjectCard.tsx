import { Code2, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-shadow">
      {/* Image */}
      {project.image ? (
        <div className="relative h-48 md:h-56 w-full bg-gradient-to-br from-purple-100 to-purple-50 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 md:h-56 w-full bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center">
          <span className="text-gray-400 font-medium">Project Image</span>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#20201e] mb-1">{project.title}</h3>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="text-xs px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
                {project.category}
              </span>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-1 bg-gray-50 text-gray-700 rounded border border-gray-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-2 py-1 text-gray-600">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-[#20201e] hover:text-purple-600 transition-colors"
              aria-label="View on GitHub"
            >
              <Code2 size={16} />
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-[#20201e] hover:text-purple-600 transition-colors"
              aria-label="View live project"
            >
              <ExternalLink size={16} />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
