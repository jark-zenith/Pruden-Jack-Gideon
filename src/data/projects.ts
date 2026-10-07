import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'veronicca',
    title: 'V.E.R.O.N.I.C.C.A',
    description: 'A futuristic personal-assistant interface exploring voice interaction, owner access, camera capabilities, and an extensible AI assistant architecture.',
    technologies: ['React', 'TypeScript', 'AI', 'Voice'],
    category: 'AI / Assistant',
    featured: true,
    status: 'In development',
    githubUrl: 'https://veronicca-interface-v2.onrender.com/',
  },
  {
    id: 'pruden-ai-tech',
    title: 'PRUDEN AI TECH INDUSTRIES',
    description: 'A technology-company platform bringing together software development, AI, automation, digital systems, creative technology, services, and the wider PRUDEN Network vision.',
    technologies: ['React', 'TypeScript', 'Supabase', 'AI'],
    category: 'Technology / Business',
    featured: true,
    status: 'In development',
    githubUrl: 'https://pruden-ai-tech-industries.onrender.com/',
  },
  {
    id: 'gideon-si',
    title: 'GIDEON SI',
    description: 'GIDEON Super Intelligence — an original PRUDEN AI TECH INDUSTRIES personal AI system being engineered around multimodal intelligence, realtime-capable voice, user-controlled memory, secure tools, research, coding assistance, and future device integrations.',
    image: 'https://raw.githubusercontent.com/jark-zenith/Gideon-SI-/main/file_00000000e13081f78567b57ce2025177.png',
    technologies: ['TypeScript', 'AI', 'Security', 'Voice', 'Multimodal'],
    category: 'AI / Super Intelligence',
    featured: true,
    status: 'Ongoing',
    githubUrl: 'https://github.com/jark-zenith/Gideon-SI-',
  },
]
