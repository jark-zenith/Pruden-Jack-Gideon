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

export async function uploadPortfolioImage(file: File) {
  if (file.size > 8 * 1024 * 1024) throw new Error('Images must be 8MB or smaller.')
  if (!file.type.startsWith('image/')) throw new Error('Only image files are allowed.')
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '')
    reader.onerror = () => reject(new Error('Could not read the image.'))
    reader.readAsDataURL(file)
  })
  return request<{ url: string }>('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ name: file.name, mime: file.type, base64 }),
  })
}
