import { personalInfo } from '../../data/personal'
import { SocialLinks } from '../ui/SocialLinks'

const footerNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-[#f7f6f2]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-[#20201e] mb-2">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-gray-600">
              Software developer & AI builder crafting digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[#20201e] mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-[#20201e] mb-4">Connect</h4>
            <SocialLinks className="gap-3" />
          </div>

          {/* Meta */}
          <div>
            <h4 className="font-semibold text-[#20201e] mb-4">Built with</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>React</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 mt-4 md:mt-0">
              Launching v1.0 on December 12, 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
