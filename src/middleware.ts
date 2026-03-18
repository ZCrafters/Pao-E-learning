import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if accessing admin routes (except login and auth API)
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/admin') && 
      !pathname.includes('/admin/login') &&
      !pathname.includes('/api/admin/auth')) {
    
    const adminToken = request.cookies.get('admin_token')?.value
    
    if (!adminToken) {
      // Redirect to admin login
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
