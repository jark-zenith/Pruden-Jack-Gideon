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
    <footer className="border-t border-slate-700/60 bg-[#050914]/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-slate-100">
              {personalInfo.name}
            </h3>
            <p className="text-sm text-slate-400">
              Software developer & AI builder crafting digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-200">Navigation</h4>
            <ul className="space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-200">Connect</h4>
            <SocialLinks className="gap-3" />
          </div>

          {/* Meta */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-200">Built with</h4>
            <ul className="space-y-1 text-sm text-slate-400">
              <li>React</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-700/60 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-slate-500">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="mt-4 text-sm text-slate-500 md:mt-0">
              Launching v1.0 on December 12, 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
