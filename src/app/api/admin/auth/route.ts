import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'finatra123'
const ADMIN_SESSION_MAX_AGE_SECONDS = 24 * 60 * 60

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      )
    }

    if (password === ADMIN_PASSWORD) {
      const token = Buffer.from(
        `${Date.now()}:${randomUUID()}`
      ).toString('base64')

      const response = NextResponse.json({
        success: true,
        message: 'Login successful'
      })

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
        path: '/',
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
