import http from 'node:http'
import crypto from 'node:crypto'
import { URL } from 'node:url'

const PORT = Number(process.env.PORT || 10000)
const DEFAULT_ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || 'jarkpruden@gmail.com').trim().toLowerCase()
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''
const SESSION_SECRET = process.env.SESSION_SECRET || ''
const FRONTEND_ORIGIN = String(process.env.FRONTEND_ORIGIN || '').replace(/\/$/, '')
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''
const GITHUB_REPO = process.env.GITHUB_REPO || 'jark-zenith/Pruden-Jack-Gideon'
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main'
const SUPABASE_URL = String(process.env.SUPABASE_URL || '').replace(/\/$/, '')
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const SUPABASE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'portfolio-media'
const PORTFOLIO_PATH = 'public/portfolio.json'
const AUTH_PATH = 'public/.owner-auth.json'
const SESSION_TTL_MS = 8 * 60 * 60 * 1000
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024
const failed = new Map()

function json(res, status, body, extraHeaders = {}) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders })
  res.end(JSON.stringify(body))
}

function corsHeaders(origin) {
  if (!FRONTEND_ORIGIN || origin === FRONTEND_ORIGIN) {
    return { 'Access-Control-Allow-Origin': FRONTEND_ORIGIN || origin || '*', 'Access-Control-Allow-Credentials': 'true', Vary: 'Origin' }
  }
  return {}
}

function passwordVerifier(password) {
  if (!SESSION_SECRET || !password) return ''
  return crypto.createHmac('sha256', SESSION_SECRET).update(password).digest('hex')
}

function safeEqual(a, b) {
  const aa = Buffer.from(a)
  const bb = Buffer.from(b)
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb)
}

function makeSession() {
  const expires = Date.now() + SESSION_TTL_MS
  const payload = String(expires)
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url')
  return payload + '.' + sig
}

function validSession(token) {
  if (!SESSION_SECRET || !token) return false
  const [expires, sig] = token.split('.')
  if (!expires || !sig || Number(expires) < Date.now()) return false
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(expires).digest('base64url')
  return safeEqual(sig, expected)
}

function cookies(req) {
  return Object.fromEntries(String(req.headers.cookie || '').split(';').map(v => v.trim()).filter(Boolean).map(v => {
    const i = v.indexOf('=')
    return i === -1 ? [v, ''] : [v.slice(0, i), decodeURIComponent(v.slice(i + 1))] 
  }))
}

function authenticated(req) {
  return validSession(cookies(req).pruden_owner_session)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    let size = 0
    req.on('data', chunk => {
      size += chunk.length
      if (size > 12 * 1024 * 1024) {
        reject(new Error('Request too large'))
        req.destroy()
        return
      }
      data += chunk
    })
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}) } catch { reject(new Error('Invalid JSON')) }
    })
    req.on('error', reject)
  })
}

function rateLimited(ip) {
  const now = Date.now()
  const entry = failed.get(ip)
  if (!entry) return false
  if (entry.reset < now) { failed.delete(ip); return false }
  return entry.count >= 5
}

function recordFailure(ip) {
  const now = Date.now()
  const entry = failed.get(ip)
  if (!entry || entry.reset < now) failed.set(ip, { count: 1, reset: now + 15 * 60 * 1000 })
  else entry.count += 1
}

async function github(path, options = {}) {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not configured')
  const response = await fetch('https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + path, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: 'Bearer ' + GITHUB_TOKEN,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'GitHub request failed')
  return data
}

async function getFileIfExists(path) {
  try {
    return await github(path + '?ref=' + encodeURIComponent(GITHUB_BRANCH))
  } catch (error) {
    if (error instanceof Error && /Not Found/i.test(error.message)) return null
    throw error
  }
}

async function getOwnerAuth() {
  const stored = await getFileIfExists(AUTH_PATH)
  if (stored?.content) {
    try {
      const parsed = JSON.parse(Buffer.from(stored.content, 'base64').toString('utf8'))
      if (parsed?.email && parsed?.verifier) return { email: String(parsed.email).trim().toLowerCase(), verifier: String(parsed.verifier), sha: stored.sha }
    } catch {}
  }
  if (ADMIN_PASSWORD && SESSION_SECRET) return { email: DEFAULT_ADMIN_EMAIL, verifier: passwordVerifier(ADMIN_PASSWORD), sha: null }
  return null
}

async function createOwnerAuth(email, password) {
  if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is not configured')
  if (!SESSION_SECRET) throw new Error('SESSION_SECRET is not configured')
  const existing = await getFileIfExists(AUTH_PATH)
  if (existing) throw new Error('Owner account is already configured.')
  const content = Buffer.from(JSON.stringify({ version: 1, email, verifier: passwordVerifier(password) }, null, 2) + '\n').toString('base64')
  await github(AUTH_PATH, { method: 'PUT', body: JSON.stringify({ message: 'feat: initialize owner account', content, branch: GITHUB_BRANCH }) })
}

async function getPortfolio() {
  try {
    const file = await github(PORTFOLIO_PATH + '?ref=' + encodeURIComponent(GITHUB_BRANCH))
    return JSON.parse(Buffer.from(file.content, 'base64').toString('utf8'))
  } catch {
    return { profileImage: null, projects: [] }
  }
}

async function savePortfolio(portfolio, message) {
  const existing = await github(PORTFOLIO_PATH + '?ref=' + encodeURIComponent(GITHUB_BRANCH))
  const content = Buffer.from(JSON.stringify(portfolio, null, 2) + '\n').toString('base64')
  await github(PORTFOLIO_PATH, { method: 'PUT', body: JSON.stringify({ message, content, sha: existing.sha, branch: GITHUB_BRANCH }) })
}

async function uploadToGitHub(name, base64) {
  const safeName = name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-').replace(/-+/g, '-').slice(-100)
  const path = 'public/uploads/admin/' + Date.now() + '-' + safeName
  await github(path, { method: 'PUT', body: JSON.stringify({ message: 'chore: upload portfolio media', content: base64, branch: GITHUB_BRANCH }) })
  return 'https://raw.githubusercontent.com/' + GITHUB_REPO + '/' + GITHUB_BRANCH + '/' + path
}

async function createSupabaseSignedUpload(name, mime) {
  if (!SUPABASE_URL) throw new Error('SUPABASE_URL is not configured')
  if (!SUPABASE_SECRET_KEY) throw new Error('SUPABASE_SECRET_KEY is not configured on the admin API')

  const original = String(name || 'upload')
  const ext = (original.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin'
  const safeBase = original.replace(/\\.[^.]+$/, '').toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-').replace(/-+/g, '-')
    .replace(/^-|-$/g, '').slice(0, 80) || 'portfolio-image'
  const path = `owner/${Date.now()}-${crypto.randomUUID()}-${safeBase}.${ext}`

  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/upload/sign/${SUPABASE_BUCKET}/${path}`,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + SUPABASE_SECRET_KEY,
        apikey: SUPABASE_SECRET_KEY,
        'Content-Type': 'application/json',
        'x-upsert': 'false',
      },
      body: '{}',
    },
  )

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.message || data.error || 'Could not create Supabase signed upload URL')

  const relative = String(data.url || '')
  if (!relative) throw new Error('Supabase did not return a signed upload URL')

  const signedUrl = relative.startsWith('http') ? relative : SUPABASE_URL + relative
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${path}`
  return { signedUrl, publicUrl, path, mime }
}
function sessionCookie(value, maxAge = Math.floor(SESSION_TTL_MS / 1000)) {
  return 'pruden_owner_session=' + encodeURIComponent(value) + '; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=' + maxAge
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin || ''
  const headers = corsHeaders(origin)
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...headers, 'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' })
    return res.end()
  }
  if (FRONTEND_ORIGIN && origin && origin !== FRONTEND_ORIGIN) return json(res, 403, { error: 'Origin not allowed' }, headers)

  const url = new URL(req.url || '/', 'http://localhost')
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress || 'unknown'

  try {
    if (url.pathname === '/health') {
      const auth = await getOwnerAuth().catch(() => null)
      return json(res, 200, { ok: true, configured: Boolean(auth && SESSION_SECRET) }, headers)
    }
    if (url.pathname === '/auth/setup-status' && req.method === 'GET') {
      const auth = await getOwnerAuth()
      return json(res, 200, { setupRequired: !auth }, headers)
    }
    if (url.pathname === '/auth/setup' && req.method === 'POST') {
      if (rateLimited(ip)) return json(res, 429, { error: 'Too many failed attempts. Try again later.' }, headers)
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 400, { error: 'Enter a valid owner email.' }, headers)
      if (password.length < 12) return json(res, 400, { error: 'Choose a password of at least 12 characters.' }, headers)
      const existing = await getOwnerAuth()
      if (existing) return json(res, 409, { error: 'Owner setup has already been completed. Use Owner Sign In.' }, headers)
      await createOwnerAuth(email, password)
      return json(res, 201, { ok: true, ownerId: email, expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString() }, { ...headers, 'Set-Cookie': sessionCookie(makeSession()) })
    }
    if (url.pathname === '/auth/login' && req.method === 'POST') {
      if (rateLimited(ip)) return json(res, 429, { error: 'Too many failed attempts. Try again later.' }, headers)
      const body = await readBody(req)
      const email = String(body.email || '').trim().toLowerCase()
      const password = String(body.password || '')
      const auth = await getOwnerAuth()
      const ok = Boolean(auth && SESSION_SECRET && email === auth.email && safeEqual(passwordVerifier(password), auth.verifier))
      if (!ok) {
        recordFailure(ip)
        return json(res, 401, { error: 'Invalid owner credentials.' }, headers)
      }
      failed.delete(ip)
      return json(res, 200, { ok: true, ownerId: auth.email, expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString() }, { ...headers, 'Set-Cookie': sessionCookie(makeSession()) })
    }
    if (url.pathname === '/auth/me' && req.method === 'GET') {
      if (!authenticated(req)) return json(res, 401, { authenticated: false }, headers)
      const auth = await getOwnerAuth()
      return json(res, 200, { authenticated: true, ownerId: auth?.email || DEFAULT_ADMIN_EMAIL, expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString() }, headers)
    }
    if (url.pathname === '/auth/logout' && req.method === 'POST') {
      return json(res, 200, { ok: true }, { ...headers, 'Set-Cookie': sessionCookie('', 0) })
    }
    if (url.pathname === '/api/portfolio' && req.method === 'GET') return json(res, 200, await getPortfolio(), headers)
    if (url.pathname === '/api/portfolio' && req.method === 'PUT') {
      if (!authenticated(req)) return json(res, 401, { error: 'Owner authentication required.' }, headers)
      const body = await readBody(req)
      const current = await getPortfolio()
      const next = {
        profileImage: typeof body.profileImage === 'string' || body.profileImage === null ? body.profileImage : current.profileImage,
        projects: Array.isArray(body.projects) ? body.projects : current.projects,
      }
      await savePortfolio(next, 'feat: update portfolio from owner dashboard')
      return json(res, 200, next, headers)
    }
    if (url.pathname === '/api/upload-url' && req.method === 'POST') {
      if (!authenticated(req)) return json(res, 401, { error: 'Owner authentication required.' }, headers)
      const body = await readBody(req)
      const mime = String(body.mime || '')
      const name = String(body.name || 'upload')
      const size = Number(body.size || 0)
      if (!mime.startsWith('image/') || !name || !Number.isFinite(size) || size <= 0 || size > MAX_UPLOAD_BYTES) {
        return json(res, 400, { error: 'Only images up to 8MB are accepted.' }, headers)
      }
      return json(res, 200, await createSupabaseSignedUpload(name, mime), headers)
    }
    return json(res, 404, { error: 'Not found' }, headers)
  } catch (error) {
    console.error(error)
    return json(res, 500, { error: error instanceof Error ? error.message : 'Server error' }, headers)
  }
})

server.listen(PORT, () => console.log('PRUDEN owner API listening on ' + PORT))
