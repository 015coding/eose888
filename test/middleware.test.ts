import { describe, it, expect, vi, beforeEach } from 'vitest'
import { middleware } from '@/middleware'
import { NextRequest } from 'next/server'

const { mockGetToken } = vi.hoisted(() => ({
  mockGetToken: vi.fn(),
}))

vi.mock('next-auth/jwt', () => ({
  getToken: mockGetToken,
}))

const createRequest = (pathname: string) =>
  new NextRequest(new URL(pathname, 'http://localhost'))

describe('Middleware', () => {
  beforeEach(() => {
    mockGetToken.mockReset()
  })


  it('redirects to /login if not logged in and accessing /dashboard', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/dashboard'))
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/login')
  })

  it('sets callbackUrl when redirecting to /login', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/dashboard'))
    expect(res.headers.get('location')).toContain('callbackUrl=%2Fdashboard')
  })

  it('redirects to /login if not logged in and accessing /setting', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/setting'))
    expect(res.headers.get('location')).toContain('/login')
  })

  it('allows logged in USER to access /dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'USER', email: 'user@test.com' })
    const res = await middleware(createRequest('/dashboard'))
    expect(res.status).toBe(200)
  })

  it('allows logged in USER to access /setting', async () => {
    mockGetToken.mockResolvedValue({ role: 'USER', email: 'user@test.com' })
    const res = await middleware(createRequest('/setting'))
    expect(res.status).toBe(200)
  })


  it('redirects unauthenticated user from /admin to /dashboard', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/admin/dashboard'))
    expect(res.headers.get('location')).toContain('/dashboard')
  })

  it('redirects USER from /admin to /dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'USER', email: 'user@test.com' })
    const res = await middleware(createRequest('/admin'))
    expect(res.headers.get('location')).toContain('/dashboard')
  })

  it('redirects ADMIN from /admin to /admin/dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'ADMIN', email: 'admin@test.com' })
    const res = await middleware(createRequest('/admin'))
    expect(res.headers.get('location')).toContain('/admin/dashboard')
  })

  it('allows ADMIN to access /admin/dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'ADMIN', email: 'admin@test.com' })
    const res = await middleware(createRequest('/admin/dashboard'))
    expect(res.status).toBe(200)
  })


  it('allows unauthenticated user to access /login', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/login'))
    expect(res.status).toBe(200)
  })

  it('allows unauthenticated user to access /register', async () => {
    mockGetToken.mockResolvedValue(null)
    const res = await middleware(createRequest('/register'))
    expect(res.status).toBe(200)
  })

  it('redirects logged in USER from /login to /dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'USER', email: 'user@test.com' })
    const res = await middleware(createRequest('/login'))
    expect(res.headers.get('location')).toContain('/dashboard')
  })

  it('redirects logged in ADMIN from /login to /admin/dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'ADMIN', email: 'admin@test.com' })
    const res = await middleware(createRequest('/login'))
    expect(res.headers.get('location')).toContain('/admin/dashboard')
  })

  it('redirects logged in USER from /register to /dashboard', async () => {
    mockGetToken.mockResolvedValue({ role: 'USER', email: 'user@test.com' })
    const res = await middleware(createRequest('/register'))
    expect(res.headers.get('location')).toContain('/dashboard')
  })
})