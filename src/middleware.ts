import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_MAX_AGE_SECONDS = 24 * 60 * 60

function hasValidAdminToken(token: string | undefined) {
  if (!token) return false

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [issuedAtRaw, sessionId] = decoded.split(':')
    const issuedAt = Number(issuedAtRaw)

    if (!Number.isFinite(issuedAt) || !sessionId) return false

    const sessionAgeMs = Date.now() - issuedAt
    return sessionAgeMs >= 0 && sessionAgeMs <= ADMIN_SESSION_MAX_AGE_SECONDS * 1000
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  // Check if accessing admin routes (except login and auth API)
  const pathname = request.nextUrl.pathname
  
  if (pathname.startsWith('/admin') && 
      !pathname.includes('/admin/login') &&
      !pathname.includes('/api/admin/auth')) {
    
    const adminToken = request.cookies.get('admin_token')?.value

    if (!hasValidAdminToken(adminToken)) {
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
