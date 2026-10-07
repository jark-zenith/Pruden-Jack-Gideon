import { useEffect, useRef, useState } from 'react'
import { Check, ChevronRight, CircleAlert, Eye, ImagePlus, LogOut, Pencil, Plus, Save, ShieldCheck, Trash2, UploadCloud, UserRound, X } from 'lucide-react'
import { logoutNavigationItem, ownerNavigation } from './navigation'
import type { OwnerSession } from './types'
import { getPortfolioStore, savePortfolioStore, uploadPortfolioImage, type PortfolioProject, type PortfolioStore } from '../lib/adminApi'

interface OwnerDashboardProps {
  session: OwnerSession
  onSignOut: () => void
}

const emptyProject: PortfolioProject = {
  id: '',
  title: '',
  description: '',
  technologies: [],
  category: 'Web Product',
  featured: true,
  status: 'In development',
  githubUrl: '',
  liveUrl: '',
}

export function OwnerDashboard({ session, onSignOut }: OwnerDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview')
  const [store, setStore] = useState<PortfolioStore>({ profileImage: null, projects: [] })
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null)
  const [toast, setToast] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(true)
  const profileInput = useRef<HTMLInputElement>(null)
  const projectInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getPortfolioStore().then(setStore).catch((error) => notify(error instanceof Error ? error.message : 'Could not load portfolio data.'))
  }, [])

  function notify(message: string) {
    setToast(message)
    window.setTimeout(() => setToast(''), 3000)
  }

  async function saveStore(next: PortfolioStore, message = 'Changes saved.') {
    setBusy(true)
    try {
      const saved = await savePortfolioStore(next)
      setStore(saved)
      notify(message + ' Render will rebuild the public portfolio automatically.')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not save changes.')
    } finally {
      setBusy(false)
    }
  }

  async function changeProfileImage(file?: File) {
    if (!file) return
    setBusy(true)
    try {
      const uploaded = await uploadPortfolioImage(file)
      await saveStore({ ...store, profileImage: uploaded.url }, 'Hero profile image updated.')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Profile image upload failed.')
      setBusy(false)
    }
  }

  async function changeProjectImage(file?: File) {
    if (!file || !editingProject) return
    setBusy(true)
    try {
      const uploaded = await uploadPortfolioImage(file)
      setEditingProject({ ...editingProject, image: uploaded.url })
      notify('Project image uploaded. Save the project to publish it.')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Project image upload failed.')
    } finally {
      setBusy(false)
    }
  }

  async function saveProject() {
    if (!editingProject?.title.trim()) return notify('Project title is required.')
    const project = { ...editingProject, id: editingProject.id || crypto.randomUUID(), technologies: editingProject.technologies.filter(Boolean) }
    const exists = store.projects.some((item) => item.id === project.id)
    const projects = exists ? store.projects.map((item) => item.id === project.id ? project : item) : [project, ...store.projects]
    await saveStore({ ...store, projects }, exists ? 'Project updated.' : 'Project added to showcase.')
    setEditingProject(null)
  }

  async function deleteProject(id: string) {
    if (!window.confirm('Remove this project from the public showcase?')) return
    await saveStore({ ...store, projects: store.projects.filter((project) => project.id !== id) }, 'Project removed.')
  }

  const overview = (
    <div className="space-y-7">
      <section className="rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.14] via-[#0b1220] to-[#0b1220] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Secure owner session</div><h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Welcome back, Pruden.</h3><p className="mt-3 text-sm leading-7 text-slate-300">Manage the public portfolio from one owner-only control room.</p></div>
          <button type="button" onClick={() => setActiveSection('preview')} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:border-blue-400/40"><Eye size={16}/> Preview</button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[['Projects', String(store.projects.length)], ['Featured', String(store.projects.filter((p) => p.featured).length)], ['Hero image', store.profileImage ? 'Configured' : 'Not set']].map(([label, value]) => <article key={label} className="rounded-2xl border border-slate-800 bg-[#0b1220] p-5"><p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p><p className="mt-3 text-2xl font-bold text-white">{value}</p></article>)}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <button type="button" onClick={() => setActiveSection('profile')} className="group rounded-2xl border border-slate-800 bg-[#0b1220] p-6 text-left hover:border-blue-400/30"><UserRound className="text-blue-300" size={22}/><h3 className="mt-4 text-xl font-bold text-white">Hero profile image</h3><p className="mt-2 text-sm leading-6 text-slate-400">Replace the image shown in the Hero section without editing code.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">Manage image <ChevronRight size={16}/></span></button>
        <button type="button" onClick={() => { setActiveSection('projects'); setEditingProject({ ...emptyProject }) }} className="group rounded-2xl border border-slate-800 bg-[#0b1220] p-6 text-left hover:border-blue-400/30"><Plus className="text-blue-300" size={22}/><h3 className="mt-4 text-xl font-bold text-white">Project Showcase</h3><p className="mt-2 text-sm leading-6 text-slate-400">Upload a project image and publish a new animated showcase card.</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">Add project <ChevronRight size={16}/></span></button>
      </section>
    </div>
  )

  const profilePanel = (
    <section className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6 sm:p-8">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-center">
        <div className="grid h-52 w-36 shrink-0 place-items-center overflow-hidden rounded-[50%] border border-blue-400/25 bg-slate-950">
          {store.profileImage ? <img src={store.profileImage} alt="Current owner profile" className="h-full w-full object-cover" /> : <UserRound size={42} className="text-slate-600" />}
        </div>
        <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">Hero image</p><h3 className="mt-2 text-2xl font-bold text-white">Owner profile picture</h3><p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">Upload a new profile image. The dashboard sends it to protected owner storage, updates the portfolio record, and triggers the normal Render rebuild.</p><button type="button" disabled={busy} onClick={() => profileInput.current?.click()} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-400 disabled:opacity-50"><UploadCloud size={17}/> Upload new profile picture</button><input ref={profileInput} type="file" accept="image/*" className="hidden" onChange={(event) => changeProfileImage(event.target.files?.[0])}/></div>
      </div>
    </section>
  )

  const projectEditor = editingProject && (
    <section className="rounded-2xl border border-blue-400/20 bg-[#0b1220] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4"><div><p className="text-xs uppercase tracking-[0.18em] text-blue-300">{editingProject.id ? 'Edit project' : 'New showcase project'}</p><h3 className="mt-2 text-2xl font-bold text-white">Project details</h3></div><button type="button" onClick={() => setEditingProject(null)} className="rounded-lg p-2 text-slate-500 hover:text-white"><X size={20}/></button></div>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="md:col-span-2 text-sm text-slate-300">Title<input value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400" placeholder="Project name"/></label>
        <label className="md:col-span-2 text-sm text-slate-300">Description<textarea value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} rows={4} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-400" placeholder="What did you build?"/></label>
        <label className="text-sm text-slate-300">Category<input value={editingProject.category} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"/></label>
        <label className="text-sm text-slate-300">Status<input value={editingProject.status} onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"/></label>
        <label className="md:col-span-2 text-sm text-slate-300">Technologies <span className="text-slate-500">(comma separated)</span><input value={editingProject.technologies.join(', ')} onChange={(e) => setEditingProject({ ...editingProject, technologies: e.target.value.split(',').map((v) => v.trim()).filter(Boolean) })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="React, TypeScript, AI"/></label>
        <label className="text-sm text-slate-300">GitHub URL<input value={editingProject.githubUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"/></label>
        <label className="text-sm text-slate-300">Live URL<input value={editingProject.liveUrl || ''} onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"/></label>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-300 hover:border-blue-400/40"><ImagePlus size={18} className="text-blue-300"/> {editingProject.image ? 'Replace project image' : 'Upload project image'}<input ref={projectInput} type="file" accept="image/*" className="hidden" onChange={(e) => changeProjectImage(e.target.files?.[0])}/></label>
        <label className="flex items-center gap-2 text-sm text-slate-300"><input type="checkbox" checked={editingProject.featured} onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}/> Show in showcase</label>
        {editingProject.image && <img src={editingProject.image} alt="Project preview" className="h-16 w-28 rounded-lg object-cover"/>}
      </div>
      <div className="mt-7 flex justify-end gap-3 border-t border-slate-800 pt-5"><button type="button" onClick={() => setEditingProject(null)} className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm">Cancel</button><button type="button" disabled={busy} onClick={saveProject} className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"><Save size={16}/> Save project</button></div>
    </section>
  )

  const projectsPanel = (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-[#0b1220] p-6"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs uppercase tracking-[0.18em] text-blue-300">Project Showcase</p><h3 className="mt-2 text-2xl font-bold text-white">Manage featured work</h3></div><button type="button" onClick={() => setEditingProject({ ...emptyProject })} className="inline-flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold"><Plus size={16}/> Add project</button></div></section>
      {projectEditor}
      <section className="grid gap-4 lg:grid-cols-2">
        {store.projects.map((project) => <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1220]">{project.image ? <img src={project.image} alt={project.title} className="aspect-video w-full object-cover"/> : <div className="grid aspect-video place-items-center bg-slate-950 text-slate-600">No project image</div>}<div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.16em] text-blue-300">{project.category}</p><h4 className="mt-1 font-bold text-white">{project.title}</h4></div><span className="text-xs text-slate-500">{project.featured ? 'Featured' : 'Hidden'}</span></div><p className="mt-3 line-clamp-2 text-sm text-slate-400">{project.description}</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => setEditingProject({ ...project })} className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold hover:border-blue-400/40"><Pencil size={14}/> Edit</button><button type="button" onClick={() => deleteProject(project.id)} className="inline-flex items-center gap-2 rounded-lg border border-red-400/15 px-3 py-2 text-xs font-semibold text-red-300"><Trash2 size={14}/> Delete</button></div></div></article>)}
      </section>
    </div>
  )

  const content = activeSection === 'overview' ? overview : activeSection === 'profile' ? profilePanel : activeSection === 'projects' ? projectsPanel : (
    <section className="rounded-2xl border border-slate-800 bg-[#0b1220] p-8"><p className="text-xs uppercase tracking-[0.18em] text-blue-300">Owner module</p><h3 className="mt-2 text-2xl font-bold text-white">{ownerNavigation.find((item) => item.section === activeSection)?.label}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">This module remains in the control room. The secure backend and persistent portfolio layer are now active for the Hero profile image and Project Showcase.</p></section>
  )

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      {toast && <div className="fixed right-4 top-4 z-[100] flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0b1220] px-4 py-3 text-sm shadow-2xl"><Check size={17} className="text-emerald-300"/>{toast}</div>}
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-800 bg-[#070d19] lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="px-5 py-6"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-lg font-black text-blue-200">P</div><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">PRUDEN</p><h1 className="text-sm font-bold">Super Admin</h1></div></div><div className="mt-5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3 text-xs text-emerald-300">● Server-authenticated owner</div></div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-1">{ownerNavigation.map((item) => { const Icon=item.icon; const selected=item.section===activeSection; return <button key={item.section} type="button" onClick={() => setActiveSection(item.section)} className={'flex min-w-max items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium lg:w-full ' + (selected ? 'bg-blue-500/15 text-blue-200 ring-1 ring-inset ring-blue-400/30' : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100')}><Icon size={17}/>{item.label}</button> })}</nav>
          <div className="border-t border-slate-800 p-4"><button type="button" onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-200"><LogOut size={17}/>{logoutNavigationItem.label}</button></div>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#050914]/85 px-5 py-5 backdrop-blur-xl"><div className="mx-auto flex max-w-7xl items-center justify-between gap-5"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">PRUDEN JACK GIDEON · CONTROL ROOM</p><h2 className="mt-1 flex items-center gap-2 text-xl font-bold sm:text-2xl">{ownerNavigation.find((item) => item.section === activeSection)?.label}</h2></div><div className="hidden items-center gap-3 sm:flex"><ShieldCheck size={17} className="text-emerald-300"/><span className="max-w-[220px] truncate text-xs text-slate-400">{session.ownerId}</span></div></div></header>
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
            {notice && <div className="mb-7 flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/30 px-4 py-3"><CircleAlert className="mt-0.5 shrink-0 text-blue-300" size={17}/><p className="text-xs leading-5 text-slate-500">Owner-only controls are protected by a server session. Uploaded media is committed to the portfolio repository and becomes public after the Render rebuild.</p><button type="button" onClick={() => setNotice(false)} className="ml-auto text-slate-600"><X size={15}/></button></div>}
            {content}
          </div>
        </main>
      </div>
    </div>
  )
}
