import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const { pathname } = request.nextUrl
  const isDynamicUserSettingRoute = /^\/[^/]+\/setting(?:\/.*)?$/.test(pathname)
  const dynamicRouteUser = isDynamicUserSettingRoute
    ? pathname.split('/')[1].toLowerCase()
    : ''
  
  const protectedRoutes = ['/dashboard', '/profile', '/settings', '/admin']
  const authRoutes = ['/login', '/register']
  const adminRoutes = ['/admin']
  
  // 1. ตรวจสอบ protected routes ก่อน
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  if (isDynamicUserSettingRoute) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }

    const email = typeof token.email === 'string' ? token.email : ''
    const name = typeof token.name === 'string' ? token.name : ''
    const slugFromEmail = email.split('@')[0]?.toLowerCase() ?? ''
    const slugFromName = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-_]/g, '')

    const allowedSlugs = [slugFromEmail, slugFromName].filter(Boolean)

    if (token.role !== 'USER' || !allowedSlugs.includes(dynamicRouteUser)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  // 2. ตรวจสอบ admin routes
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // ✅ ถ้าเข้า /admin เฉยๆ ให้ redirect ไป /admin/dashboard
    // ✅ แต่ถ้าเข้า /admin/dashboard อยู่แล้ว ไม่ต้อง redirect
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }
  
  // 3. ตรวจสอบ auth routes (login/register)
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      // ถ้า login แล้วและเป็น admin ให้ไป /admin/dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      // ถ้าเป็น user ธรรมดา ให้ไป /dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/:user/setting/:path*',
    '/login',
    '/register',
    '/admin/:path*',
    '/admin',  // ✅ เพิ่มนี้เพื่อจับ /admin เฉยๆ
  ]
}