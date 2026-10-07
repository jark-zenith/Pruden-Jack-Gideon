import { useState } from 'react'
import { ChevronDown, ExternalLink, Sparkles } from 'lucide-react'

export type TabMedia = { value: string; label: string; src: string; alt?: string }
export type ShowcaseStep = { id: string; title: string; text: string }

export interface FeatureShowcaseProps {
  eyebrow?: string
  title: string
  description?: string
  stats?: string[]
  steps?: ShowcaseStep[]
  tabs: TabMedia[]
  defaultTab?: string
  panelMinHeight?: number
  className?: string
}

export function FeatureShowcase({
  eyebrow = 'Discover',
  title,
  description,
  stats = [],
  steps = [],
  tabs,
  defaultTab,
  panelMinHeight = 560,
  className = '',
}: FeatureShowcaseProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.value ?? '')
  const [openStep, setOpenStep] = useState(steps[0]?.id ?? '')
  const activeMedia = tabs.find((tab) => tab.value === activeTab) ?? tabs[0]

  return (
    <section className={`w-full text-slate-100 ${className}`}>
      <div className="grid max-w-7xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 md:grid-cols-12 md:py-20 lg:gap-14 lg:px-8">
        <div className="md:col-span-6">
          <span className="mb-6 inline-flex rounded-full border border-blue-400/25 bg-blue-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">{eyebrow}</span>
          <h2 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl">{title}</h2>
          {description && <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">{description}</p>}
          {stats.length > 0 && <div className="mt-6 flex flex-wrap gap-2">{stats.map((stat) => <span key={stat} className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-slate-300">{stat}</span>)}</div>}

          <div className="mt-10 max-w-xl divide-y divide-slate-800 border-y border-slate-800">
            {steps.map((step, index) => {
              const open = openStep === step.id
              return <div key={step.id}>
                <button type="button" onClick={() => setOpenStep(open ? '' : step.id)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}>
                  <span className="flex items-center gap-3 text-base font-semibold text-slate-100">
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${open ? 'border-blue-400/50 bg-blue-500/10 text-blue-300' : 'border-slate-700 text-slate-500'}`}>{index + 1}</span>
                    {step.title}
                  </span>
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180 text-blue-300' : 'text-slate-500'}`} />
                </button>
                {open && <p className="pb-5 pl-10 text-sm leading-6 text-slate-400">{step.text}</p>}
              </div>
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-400">Explore my work <ExternalLink size={16} /></a>
            <a href="#contact" className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-blue-400/40 hover:text-blue-200">Start a conversation</a>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/70 bg-[#0b1220] shadow-2xl shadow-black/30" style={{ minHeight: panelMinHeight }}>
            {activeMedia ? <img src={activeMedia.src} alt={activeMedia.alt ?? activeMedia.label} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /> : <div className="absolute inset-0 grid place-items-center text-slate-500">Add media from the Owner Dashboard.</div>}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md"><Sparkles size={14} className="text-blue-300" /> PRUDEN / ABOUT</div>
            {tabs.length > 0 && <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center px-4"><div className="flex flex-wrap justify-center gap-1 rounded-2xl border border-white/10 bg-black/55 p-1.5 backdrop-blur-xl">{tabs.map((tab) => <button key={tab.value} type="button" onClick={() => setActiveTab(tab.value)} className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${activeTab === tab.value ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`} aria-pressed={activeTab === tab.value}>{tab.label}</button>)}</div></div>}
          </div>
        </div>
      </div>
    </section>
  )
}
