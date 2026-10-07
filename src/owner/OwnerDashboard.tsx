import { useRef, useState } from 'react'
import { Activity, Check, ChevronRight, CircleAlert, Eye, FileImage, ImagePlus, Pencil, Plus, Rocket, Save, ShieldCheck, Sparkles, Trash2, UploadCloud, X } from 'lucide-react'
import { logoutNavigationItem, ownerNavigation } from './navigation'
import type { OwnerSession } from './types'

interface OwnerDashboardProps { session: OwnerSession; onSignOut: () => void }
interface MediaItem { id: string; name: string; url: string; size: string }

const descriptions: Record<string, string> = {
  overview: 'Command center for your personal brand, portfolio and public presence.',
  profile: 'Control your identity, headline, biography and personal information.',
  projects: 'Create, edit, feature and organize the work displayed on your portfolio.',
  skills: 'Manage your technical skills and technology stack.',
  services: 'Control the services you offer to clients.',
  experience: 'Maintain your professional and project experience timeline.',
  education: 'Manage institutions, qualifications and academic milestones.',
  achievements: 'Showcase awards, milestones and certifications.',
  media: 'Upload and organize photos, screenshots, logos and visual work.',
  documents: 'Manage your CV and public portfolio documents.',
  contact: 'Control contact details, social links and client channels.',
  settings: 'Control portfolio visibility, appearance and publication preferences.',
  preview: 'Preview the portfolio before sending changes live.',
}

export function OwnerDashboard({ session, onSignOut }: OwnerDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [toast, setToast] = useState('')
  const [notice, setNotice] = useState(true)
  const input = useRef<HTMLInputElement>(null)
  const active = ownerNavigation.find((item) => item.section === activeSection) ?? ownerNavigation[0]
  const ActiveIcon = active.icon

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2500)
  }

  const addImages = (files: FileList | null) => {
    if (!files?.length) return
    const images = Array.from(files).filter((file) => file.type.startsWith('image/')).map((file) => ({
      id: crypto.randomUUID(), name: file.name, url: URL.createObjectURL(file),
      size: Math.max(1, Math.round(file.size / 1024)) + ' KB',
    }))
    if (!images.length) return notify('Please choose image files.')
    setMedia((items) => [...images, ...items])
    notify(images.length + ' image' + (images.length === 1 ? '' : 's') + ' added.')
  }

  const overview = (
    <div className="space-y-7">
      <section className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.14] via-[#0b1220] to-[#0b1220] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Owner control active
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome back, Pruden.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">Your central control room for the PRUDEN JACK GIDEON portfolio.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setActiveSection('preview')} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-blue-400/40"><Eye size={16}/> Preview</button>
            <button type="button" onClick={() => notify('Publish workflow is ready for the backend.')} className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-400"><Rocket size={16}/> Publish</button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Projects','8','Portfolio entries',Rocket],
          ['Skills','12','Technology areas',Sparkles],
          ['Services','5','Client offerings',Activity],
          ['Media',String(media.length),'Uploaded assets',FileImage],
        ].map(([label,value,detail,Icon]) => (
          <article key={String(label)} className="rounded-2xl border border-slate-800 bg-[#0b1220] p-5">
            <span className="inline-flex rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 text-blue-300"><Icon size={18}/></span>
            <p className="mt-5 text-3xl font-bold text-white">{String(value)}</p>
            <p className="mt-1 text-sm font-medium text-slate-200">{String(label)}</p>
            <p className="mt-1 text-xs text-slate-500">{String(detail)}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Quick controls</p>
          <h3 className="mt-2 text-xl font-bold text-white">Manage your portfolio</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ['projects','Add a project','Showcase new work'],
              ['media','Upload work photos','Build your visual library'],
              ['profile','Edit profile','Update your public identity'],
              ['services','Manage services','Control client offerings'],
            ].map(([section,title,detail]) => (
              <button key={section} type="button" onClick={() => setActiveSection(section)} className="group rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-left hover:border-blue-400/30">
                <span className="flex items-center justify-between text-sm font-semibold text-slate-100">{title}<ChevronRight size={16} className="text-slate-600 group-hover:text-blue-300"/></span>
                <span className="mt-1 block text-xs text-slate-500">{detail}</span>
              </button>
            ))}
          </div>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6">
          <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-300" size={21}/><div><p className="text-xs uppercase tracking-[0.16em] text-slate-500">Security</p><h3 className="font-bold text-white">Owner session</h3></div></div>
          <div className="mt-6 space-y-4 text-sm">
            <p className="flex justify-between border-b border-slate-800 pb-3"><span className="text-slate-500">Role</span><span>Super Admin</span></p>
            <p className="flex justify-between border-b border-slate-800 pb-3"><span className="text-slate-500">Session</span><span className="text-emerald-300">Authenticated</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Owner ID</span><span className="max-w-[150px] truncate">{session.ownerId}</span></p>
          </div>
        </article>
      </section>
    </div>
  )

  const mediaPanel = (
    <div className="space-y-6">
      <section className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.05] p-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Media library</p><h3 className="mt-2 text-2xl font-bold text-white">Your work, visually managed.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Upload project screenshots, photos, posters, logos and other portfolio visuals. Persistent storage will be connected in the backend phase.</p></div>
          <button type="button" onClick={() => input.current?.click()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-400"><UploadCloud size={17}/> Upload images</button>
          <input ref={input} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(e.target.files)}/>
        </div>
      </section>
      {!media.length ? (
        <button type="button" onClick={() => input.current?.click()} className="flex min-h-72 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-[#0b1220] p-8 text-center hover:border-blue-400/40">
          <span className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-blue-300"><ImagePlus size={28}/></span><h3 className="mt-5 font-semibold text-white">Your media library is empty</h3><p className="mt-2 text-sm text-slate-500">Choose the photos and screenshots you want to use.</p><span className="mt-5 text-sm font-semibold text-blue-300">Choose images</span>
        </button>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220]"><div className="aspect-video bg-slate-950"><img src={item.url} alt={item.name} className="h-full w-full object-cover"/></div><div className="flex items-center justify-between p-4"><div className="min-w-0"><p className="truncate text-sm font-medium">{item.name}</p><p className="text-xs text-slate-500">{item.size}</p></div><button type="button" onClick={() => { setMedia((items) => items.filter((x) => x.id !== item.id)); notify('Image removed.') }} className="rounded-lg p-2 text-slate-500 hover:text-red-300"><Trash2 size={16}/></button></div></article>)}
        </section>
      )}
    </div>
  )

  const content = activeSection === 'overview' ? overview : activeSection === 'media' ? mediaPanel : (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6 sm:p-8">
        <span className="inline-flex rounded-xl border border-blue-400/20 bg-blue-500/[0.06] p-3 text-blue-300"><ActiveIcon size={22}/></span>
        <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row"><div><h3 className="text-2xl font-bold text-white">{active.label}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{descriptions[activeSection]}</p></div><button type="button" onClick={() => notify(active.label + ' editor opened.')} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold"><Plus size={16}/> Add new</button></div>
      </section>
      <section className="rounded-2xl border border-dashed border-slate-700 bg-[#0b1220]/70 p-10 text-center"><Pencil className="mx-auto text-slate-600" size={28}/><h3 className="mt-4 font-semibold text-white">Editor workspace ready</h3><p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">This control surface is ready for persistent content APIs. Your existing navigation now covers the entire portfolio.</p><button type="button" onClick={() => notify('Draft saved for this session.')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold"><Save size={16}/> Save draft</button></section>
    </div>
  )

  return <div className="min-h-screen bg-[#050914] text-slate-100">
    {toast && <div className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0b1220] px-4 py-3 text-sm shadow-2xl"><Check size={17} className="text-emerald-300"/>{toast}</div>}
    <div className="flex min-h-screen flex-col lg:flex-row">
      <aside className="w-full border-b border-slate-800 bg-[#070d19] lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="px-5 py-6 lg:px-6"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-lg font-black text-blue-200">P</div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">PRUDEN</p><h1 className="mt-1 text-sm font-bold">Super Admin</h1></div></div><div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-xs text-emerald-300">● Secure owner workspace</div></div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1" aria-label="Owner dashboard">
          {ownerNavigation.map((item) => { const Icon = item.icon; const selected = item.section === activeSection; return <button key={item.section} type="button" onClick={() => setActiveSection(item.section)} className={'flex min-w-max items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium lg:w-full ' + (selected ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30' : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100')}><Icon size={17}/>{item.label}</button> })}
        </nav>
        <div className="border-t border-slate-800 p-4 lg:mt-5"><button type="button" onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-200"><logoutNavigationItem.icon size={17}/>{logoutNavigationItem.label}</button></div>
      </aside>
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#050914]/85 px-5 py-5 backdrop-blur-xl sm:px-8"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">PRUDEN JACK GIDEON · CONTROL ROOM</p><h2 className="mt-1 flex items-center gap-2 text-xl font-bold sm:text-2xl"><ActiveIcon className="text-blue-300" size={21}/>{active.label}</h2></div><div className="hidden text-right sm:block"><p className="text-xs text-slate-500">OWNER</p><p className="max-w-[180px] truncate text-sm">{session.ownerId}</p></div></div></header>
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">{notice && <div className="mb-7 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3"><CircleAlert className="mt-0.5 shrink-0 text-blue-300" size={17}/><p className="text-xs leading-5 text-slate-500">The Super Admin UI is live. Authentication, persistent content storage, image storage and publishing are the next backend layer.</p><button type="button" onClick={() => setNotice(false)} className="ml-auto text-slate-600 hover:text-slate-300" aria-label="Dismiss"><X size={15}/></button></div>}{content}</div>
      </main>
    </div>
  </div>
}
