import { useState } from 'react'
import { CheckCircle2, CircleAlert, LockKeyhole } from 'lucide-react'
import { logoutNavigationItem, ownerNavigation } from './navigation'
import type { OwnerSession } from './types'

interface OwnerDashboardProps {
  session: OwnerSession
  onSignOut: () => void
}

const statusCards = [
  { label: 'Content workspace', value: 'Not connected', detail: 'Backend data client required' },
  { label: 'Publication state', value: 'Draft only', detail: 'Publishing is server-controlled' },
  { label: 'Media library', value: 'Not connected', detail: 'Private storage required' },
  { label: 'Preview', value: 'Integration pending', detail: 'Draft preview URL required' },
]

export function OwnerDashboard({ session, onSignOut }: OwnerDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')

  const activeItem = ownerNavigation.find((item) => item.section === activeSection)
  const ActiveIcon = activeItem?.icon ?? ownerNavigation[0].icon

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-[#070d19] lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-6 lg:py-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">Private workspace</p>
              <h1 className="mt-2 text-xl font-bold text-slate-100">Owner Dashboard</h1>
            </div>
            <LockKeyhole className="text-blue-300 lg:mt-6" size={20} aria-hidden="true" />
          </div>

          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1 lg:px-4" aria-label="Owner dashboard">
            {ownerNavigation.map((item) => {
              const Icon = item.icon
              const isActive = item.section === activeSection

              return (
                <button
                  key={item.section}
                  type="button"
                  onClick={() => setActiveSection(item.section)}
                  className={`flex min-w-max items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors lg:w-full ${
                    isActive
                      ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30'
                      : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={17} aria-hidden="true" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          <div className="border-t border-slate-800 p-4 lg:mt-5">
            <button
              type="button"
              onClick={onSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-200"
            >
              <logoutNavigationItem.icon size={17} aria-hidden="true" />
              {logoutNavigationItem.label}
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="border-b border-slate-800 bg-[#050914]/80 px-5 py-6 backdrop-blur-xl sm:px-8 lg:px-10">
            <div className="mx-auto flex max-w-6xl items-start justify-between gap-6">
              <div>
                <p className="text-sm text-slate-500">Owner workspace</p>
                <h2 className="mt-1 flex items-center gap-3 text-2xl font-bold text-slate-100 sm:text-3xl">
                  <ActiveIcon className="text-blue-300" size={25} aria-hidden="true" />
                  {activeItem?.label ?? 'Overview'}
                </h2>
              </div>
              <div className="hidden text-right sm:block">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Authenticated owner</p>
                <p className="mt-1 text-sm text-slate-300">Session expires {session.expiresAt}</p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section className="rounded-xl border border-blue-400/20 bg-blue-500/[0.06] p-5 sm:p-6" aria-labelledby="connection-status">
              <div className="flex items-start gap-4">
                <CircleAlert className="mt-0.5 shrink-0 text-blue-300" size={20} aria-hidden="true" />
                <div>
                  <h3 id="connection-status" className="font-semibold text-blue-100">Dashboard foundation ready</h3>
                  <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-300">
                    This private shell is intentionally waiting for a server-backed authentication and data connection.
                    No credentials, content mutations, or uploads are handled in the browser yet.
                  </p>
                </div>
              </div>
            </section>

            <section aria-labelledby="workspace-status">
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Overview</p>
                  <h3 id="workspace-status" className="mt-2 text-xl font-bold text-slate-100">Workspace status</h3>
                </div>
                <span className="hidden text-sm text-slate-500 sm:block">Owner-only controls</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statusCards.map((card) => (
                  <article key={card.label} className="rounded-xl border border-slate-800 bg-[#0b1220] p-5">
                    <p className="text-sm text-slate-400">{card.label}</p>
                    <p className="mt-4 text-lg font-semibold text-slate-100">{card.value}</p>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{card.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-800 bg-[#0b1220] p-5 sm:p-6" aria-labelledby="section-state">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-slate-500" size={20} aria-hidden="true" />
                <div>
                  <h3 id="section-state" className="font-semibold text-slate-100">{activeItem?.label ?? 'Overview'} is ready for its editor</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    The navigation and protected shell are in place. The editor, save, cancel, reorder, and confirmation
                    flows will be connected after the server data contract is implemented.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
