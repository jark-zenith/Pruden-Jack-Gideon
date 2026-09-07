import {
  AtSign,
  BriefcaseBusiness,
  Camera,
  Code2,
  MessageCircle,
  PlaySquare,
  Mail,
  ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { socialLinks } from '../../data/socialLinks'

interface SocialLinksProps {
  className?: string
}

const iconMap: Record<string, LucideIcon> = {
  github: Code2,
  linkedin: BriefcaseBusiness,
  x: AtSign,
  whatsapp: MessageCircle,
  instagram: Camera,
  youtube: PlaySquare,
  email: Mail,
  other: ExternalLink,
}

export function SocialLinks({ className = 'gap-4' }: SocialLinksProps) {
  // Filter out empty URLs
  const activeLinks = socialLinks.filter((link) => link.url.trim())

  if (activeLinks.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Social links coming soon
      </p>
    )
  }

  return (
    <div className={`flex flex-wrap ${className}`}>
      {activeLinks.map((link) => {
        const Icon = iconMap[link.platform] || ExternalLink
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#20201e] hover:text-purple-600 transition-colors"
            aria-label={link.label}
            title={link.label}
          >
            <Icon size={20} />
          </a>
        )
      })}
    </div>
  )
}
