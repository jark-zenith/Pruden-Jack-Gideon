import { Code2, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group card-radius card-surface border border-transparent hover:shadow-[0_24px_60px_rgba(47,140,255,0.06)] transition-shadow">
      {/* Image */}
      {project.image ? (
        <div className="relative h-48 md:h-56 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="h-48 md:h-56 w-full bg-gradient-to-br from-blue-400/6 to-red-500/4 flex items-center justify-center">
          <span className="text-slate-400 font-medium">Project Image</span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">{project.title}</h3>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="text-xs px-2 py-1 bg-blue-500/8 text-blue-300 rounded-full">
                {project.category}
              </span>
              <span className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded-full">
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-3 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="mb-3 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 text-slate-400">+{project.technologies.length - 4} more</span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-slate-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-slate-100 hover:text-blue-300 transition-colors"
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
              className="flex items-center gap-2 text-sm font-medium text-slate-100 hover:text-blue-300 transition-colors"
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
