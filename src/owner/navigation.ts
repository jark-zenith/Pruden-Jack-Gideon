import {
  Award,
  BriefcaseBusiness,
  Contact,
  FileText,
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Palette,
  Settings2,
  Sparkles,
  UserRound,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface OwnerNavigationItem {
  label: string
  icon: LucideIcon
  section: string
}

export const ownerNavigation: OwnerNavigationItem[] = [
  { label: 'Overview', icon: LayoutDashboard, section: 'overview' },
  { label: 'Profile / About', icon: UserRound, section: 'profile' },
  { label: 'Projects', icon: FolderKanban, section: 'projects' },
  { label: 'Skills', icon: Sparkles, section: 'skills' },
  { label: 'Services', icon: Wrench, section: 'services' },
  { label: 'Experience', icon: BriefcaseBusiness, section: 'experience' },
  { label: 'Education', icon: FileText, section: 'education' },
  { label: 'Achievements', icon: Award, section: 'achievements' },
  { label: 'Media / Images', icon: Images, section: 'media' },
  { label: 'CV / Documents', icon: FileText, section: 'documents' },
  { label: 'Social & Contact', icon: Contact, section: 'contact' },
  { label: 'Site settings', icon: Settings2, section: 'settings' },
  { label: 'Preview', icon: Palette, section: 'preview' },
]

export const logoutNavigationItem: OwnerNavigationItem = {
  label: 'Logout',
  icon: LogOut,
  section: 'logout',
}
