import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'jark-ai',
    title: 'J.A.R.K-AI',
    description: 'AI and product development project currently in development.',
    technologies: ['AI', 'Product development'],
    category: 'AI / Product',
    featured: true,
    status: 'In development',
  },
  {
    id: 'jark-os',
    title: 'J.A.R.K-OS',
    description: 'Systems and experiments project currently in development.',
    technologies: ['Systems', 'Experiments'],
    category: 'Systems',
    featured: true,
    status: 'In development',
  },
  {
    id: 'mtaani-marketplace',
    title: 'Mtaani Marketplace',
    description: 'Web marketplace project planned and in development.',
    technologies: ['Web', 'Marketplace'],
    category: 'Web product',
    featured: true,
    status: 'Planned / in development',
  },
]