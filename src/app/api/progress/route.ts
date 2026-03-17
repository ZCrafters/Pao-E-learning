import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { participantId, moduleSlug } = body

    if (!participantId || !moduleSlug) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // Get current progress
    let progress = await prisma.progress.findUnique({
      where: { participantId },
    })

    if (!progress) {
      progress = await prisma.progress.create({
        data: {
          participantId,
          modulesRead: JSON.stringify([moduleSlug]),
          percent: 25,
        },
      })
    } else {
      const modules = JSON.parse(progress.modulesRead)
      if (!modules.includes(moduleSlug)) {
        modules.push(moduleSlug)
      }
      const percent = Math.min(modules.length * 25, 100)
      
      progress = await prisma.progress.update({
        where: { participantId },
        data: {
          modulesRead: JSON.stringify(modules),
          percent,
        },
      })
    }

    return NextResponse.json({ success: true, data: progress })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Gagal memperbarui progress' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const participantId = searchParams.get('participantId')

    if (!participantId) {
      return NextResponse.json(
        { error: 'Participant ID diperlukan' },
        { status: 400 }
      )
    }

    const progress = await prisma.progress.findUnique({
      where: { participantId },
    })

    return NextResponse.json({ success: true, data: progress })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil progress' },
      { status: 500 }
    )
  }
}
