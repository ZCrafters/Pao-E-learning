import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

type Progress = {
  id: string
  participantId: string
  modulesRead: string[]
  percent: number
  updatedAt: string
}

const globalStore = globalThis as typeof globalThis & {
  paoProgress?: Map<string, Progress>
}

const progressStore = globalStore.paoProgress ?? new Map<string, Progress>()

if (!globalStore.paoProgress) {
  globalStore.paoProgress = progressStore
}

export const dynamic = 'force-dynamic'

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

    const current = progressStore.get(participantId)
    const modulesRead = current
      ? Array.from(new Set([...current.modulesRead, moduleSlug]))
      : [moduleSlug]

    const progress: Progress = {
      id: current?.id ?? randomUUID(),
      participantId,
      modulesRead,
      percent: Math.min(modulesRead.length * 25, 100),
      updatedAt: new Date().toISOString(),
    }

    progressStore.set(participantId, progress)

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

    return NextResponse.json({
      success: true,
      data: progressStore.get(participantId) ?? null,
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil progress' },
      { status: 500 }
    )
  }
}
