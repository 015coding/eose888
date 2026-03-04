import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })
  
  const { pathname } = request.nextUrl
  
  const protectedRoutes = ['/dashboard', '/setting']
  const authRoutes = ['/login', '/register']
  const adminRoutes = ['/admin']
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }
  
  if (authRoutes.includes(pathname)) {
    if (token) {
      // ถ้า login แล้วและเป็น admin ให้ไป /admin/dashboard
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/setting/:path*',
    '/login',
    '/register',
    '/admin/:path*',
    '/admin',
  ]
}