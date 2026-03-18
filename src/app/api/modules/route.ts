import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        order: true,
        color: true,
      },
    })

    return NextResponse.json({ success: true, data: modules })
  } catch (error) {
    console.error('Error fetching modules:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil modul' },
      { status: 500 }
    )
  }
}
