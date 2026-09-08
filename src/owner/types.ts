import type {
  ExperienceItem,
  PersonalInfo,
  Project,
  Service,
  Skill,
  SocialLink,
} from '../types'

export type OwnerRole = 'owner'

export interface OwnerSession {
  ownerId: string
  role: OwnerRole
  expiresAt: string
}

export interface OwnerCredentials {
  email: string
  password: string
}

export interface EducationItem {
  id: string
  institution: string
  qualification: string
  date: string
  description: string
}

export interface AchievementItem {
  id: string
  title: string
  organization: string
  date: string
  description: string
}

export interface PortfolioDraft {
  personalInfo: PersonalInfo
  about: string
  projects: Project[]
  skills: Skill[]
  services: Service[]
  experience: ExperienceItem[]
  education: EducationItem[]
  achievements: AchievementItem[]
  socialLinks: SocialLink[]
  cvDocumentId?: string
  mediaIds: string[]
}

/** Implement with a server-backed session and secure, httpOnly cookies. */
export interface OwnerAuthClient {
  getSession(): Promise<OwnerSession | null>
  signIn(credentials: OwnerCredentials): Promise<OwnerSession>
  signOut(): Promise<void>
}

/** Implement with server-side authorization and persistent draft/publish state. */
export interface PortfolioDataClient {
  getDraft(): Promise<PortfolioDraft>
  saveDraft(draft: PortfolioDraft): Promise<PortfolioDraft>
  publishDraft(): Promise<void>
  unpublish(): Promise<void>
}

/** Implement with private object storage and server-issued upload permissions. */
export interface PortfolioMediaClient {
  upload(file: File): Promise<{ id: string; url: string }>
  delete(mediaId: string): Promise<void>
}

export interface OwnerPreviewClient {
  getDraftPreviewUrl(): Promise<string>
}
