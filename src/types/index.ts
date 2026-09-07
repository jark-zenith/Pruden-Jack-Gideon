export type SocialPlatform = 'github' | 'linkedin' | 'x' | 'whatsapp' | 'instagram' | 'youtube' | 'email' | 'other'

export interface PersonalInfo {
  name: string
  shortName: string
  role: string
  location: string
  bio: string
  email: string
  phone: string
  availability: string
}

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
}

export interface Skill {
  name: string
  category: string
  description: string
  proficiency?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  gallery?: string[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
  status: string
  date?: string
  caseStudy?: string
}

export interface Service { icon: string; title: string; description: string; technologies?: string[] }
export interface ExperienceItem { type: string; title: string; organization: string; date: string; description: string }