import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'

type Participant = {
  id: string
  nama: string
  cabang: string
  email: string | null
  createdAt: string
}

const globalStore = globalThis as typeof globalThis & {
  paoParticipants?: Map<string, Participant>
}

const participants = globalStore.paoParticipants ?? new Map<string, Participant>()

if (!globalStore.paoParticipants) {
  globalStore.paoParticipants = participants
}

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nama, cabang, email } = body

    if (!nama || !cabang) {
      return NextResponse.json(
        { error: 'Nama dan cabang wajib diisi' },
        { status: 400 }
      )
    }

    const participant: Participant = {
      id: randomUUID(),
      nama,
      cabang,
      email: email || null,
      createdAt: new Date().toISOString(),
    }

    participants.set(participant.id, participant)

    return NextResponse.json({ success: true, data: participant })
  } catch (error: any) {
    console.error('Error creating participant:', error)
    return NextResponse.json(
      { error: 'Gagal mendaftarkan peserta: ' + (error.message || 'Unknown error') },
      { status: 500 }
    )
  }
}

export async function GET() {
  const data = Array.from(participants.values()).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  )

  return NextResponse.json({ success: true, data })
}
