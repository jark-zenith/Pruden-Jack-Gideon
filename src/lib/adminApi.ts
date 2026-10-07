const API_BASE = String(import.meta.env.VITE_ADMIN_API_URL || '').replace(/\/$/, '')

export interface AuthSession {
  ownerId: string
  expiresAt: string
}

export interface PortfolioProject {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  featured: boolean
  status: string
  githubUrl?: string
  liveUrl?: string
  image?: string
}

export interface PortfolioStore {
  profileImage: string | null
  projects: PortfolioProject[]
}

async function request<T>(path: string, init: RequestInit = {}) {
  if (!API_BASE) throw new Error('Admin API is not configured.')
  const response = await fetch(API_BASE + path, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || 'Request failed.')
  return body as T
}

export function getSetupStatus() {
  return request<{ setupRequired: boolean }>('/auth/setup-status')
}

export function setupOwner(email: string, password: string) {
  return request<AuthSession>('/auth/setup', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export function loginOwner(email: string, password: string) {
  return request<AuthSession>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
}

export function getOwnerSession() {
  return request<AuthSession>('/auth/me')
}

export function logoutOwner() {
  return request<{ ok: boolean }>('/auth/logout', { method: 'POST' })
}

export function getPortfolioStore() {
  return request<PortfolioStore>('/api/portfolio')
}

export function savePortfolioStore(store: PortfolioStore) {
  return request<PortfolioStore>('/api/portfolio', { method: 'PUT', body: JSON.stringify(store) })
}

export async function uploadPortfolioImage(file: File, onProgress?: (percent: number) => void) {
  if (file.size > 8 * 1024 * 1024) throw new Error('Images must be 8MB or smaller.')
  if (!file.type.startsWith('image/')) throw new Error('Only image files are allowed.')
  if (!API_BASE) throw new Error('Admin API is not configured.')

  return await new Promise<{ url: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', API_BASE + '/api/upload')
    xhr.withCredentials = true
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.setRequestHeader('X-Upload-Name', encodeURIComponent(file.name))
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress?.(Math.round((event.loaded / event.total) * 100))
    }
    xhr.onload = () => {
      let body: { publicUrl?: string; error?: string } = {}
      try { body = JSON.parse(xhr.responseText || '{}') } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && body.publicUrl) {
        onProgress?.(100)
        resolve({ url: body.publicUrl })
      } else {
        reject(new Error(body.error || xhr.responseText || `Upload failed (HTTP ${xhr.status}).`))
      }
    }
    xhr.onerror = () => reject(new Error('Could not connect to the owner upload service.'))
    xhr.onabort = () => reject(new Error('Upload cancelled.'))
    xhr.send(file)
  })
}
