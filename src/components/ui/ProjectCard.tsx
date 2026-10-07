import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, ExternalLink, Sparkles } from 'lucide-react'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
    setTilt({ x: ((y / rect.height) - 0.5) * -5, y: ((x / rect.width) - 0.5) * 5 })
  }

  const handleLeave = () => {
    setSpotlight({ x: 50, y: 50 })
    setTilt({ x: 0, y: 0 })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: 'easeOut' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      whileHover={{ y: -8 }}
      style={{ transformPerspective: 1200 }}
      className="group relative h-full"
    >
      <div className="absolute -inset-px rounded-[26px] bg-gradient-to-br from-blue-400/40 via-transparent to-red-400/20 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div
        className="relative h-full overflow-hidden rounded-[26px] border border-slate-800/90 bg-[#080b12] shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-colors duration-500 group-hover:border-blue-400/30"
        style={{
          backgroundImage: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(47,140,255,0.16), transparent 34%), linear-gradient(145deg, rgba(15,23,42,0.98), rgba(3,7,18,0.98))`,
        }}
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800/80">
          {project.image ? (
            <motion.img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.07 }}
              transition={{ duration: 0.7 }}
            />
          ) : (
            <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(47,140,255,0.25),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.15),transparent_30%),#070b13]">
              <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />
              <div className="absolute left-7 top-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-300 backdrop-blur-md">
                <Sparkles size={21} />
              </div>
              <div className="absolute bottom-6 left-7 right-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-blue-300/70">PRUDEN LAB</p>
                <p className="mt-2 max-w-[85%] text-xl font-bold tracking-tight text-white">{project.title}</p>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur-md">
              {project.category}
            </span>
            <span className="rounded-full border border-blue-300/15 bg-blue-400/10 px-3 py-1.5 text-[10px] font-medium text-blue-200 backdrop-blur-md">
              {project.status}
            </span>
          </div>

          <motion.div
            className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md"
            whileHover={{ scale: 1.12, rotate: 8 }}
          >
            <ArrowUpRight size={18} />
          </motion.div>
        </div>

        <div className="flex h-[270px] flex-col p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-400/80">Project {String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-200">{project.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
          </div>

          <div className="mt-auto">
            <div className="mb-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="rounded-full border border-slate-700/80 bg-slate-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && <span className="px-1 py-1 text-[11px] text-slate-500">+{project.technologies.length - 4}</span>}
            </div>

            <div className="flex items-center gap-3 border-t border-slate-800/80 pt-4">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-200">
                  <Code2 size={15} /> Source
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
              {!project.liveUrl && !project.githubUrl && (
                <span className="text-xs text-slate-500">Private build</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
