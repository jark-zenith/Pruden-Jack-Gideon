import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'pichahub',
    title: 'PichaHub',
    description: 'A Kenya-first photography discovery and commerce platform where customers can explore visual creators, browse portfolios, and request photography bookings. Payments and advanced commerce features remain in staged rollout.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    category: 'Creative Marketplace',
    featured: true,
    status: 'Starter release',
    githubUrl: 'https://github.com/jark-zenith/PichaHub',
  },
  {
    id: 'deon-dev',
    title: 'Deon.dev',
    description: 'A developer-focused marketplace for discovering reusable UI components, templates, and visual assets, with a searchable catalogue and saved assets.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    category: 'Developer Tools',
    featured: true,
    status: 'In development',
    githubUrl: 'https://deon-dev.onrender.com',
  },
  {
    id: 'ichat',
    title: 'Ichat',
    description: 'A phone-first real-time messaging application with account verification flows, contacts, groups, presence, message receipts, attachments, and a WebSocket-based backend.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSocket'],
    category: 'Communication',
    featured: true,
    status: 'In development',
    githubUrl: 'https://github.com/jark-zenith/Ichat',
  },
]
