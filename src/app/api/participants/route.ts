import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    // Check if prisma is connected
    await prisma.$connect()

    const participant = await prisma.participant.create({
      data: {
        nama,
        cabang,
        email: email || null,
      },
    })

    // Create initial progress
    await prisma.progress.create({
      data: {
        participantId: participant.id,
        modulesRead: '[]',
        percent: 0,
      },
    })

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
  try {
    await prisma.$connect()
    
    const participants = await prisma.participant.findMany({
      include: {
        results: true,
        progress: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: participants })
  } catch (error: any) {
    console.error('Error fetching participants:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data peserta: ' + (error.message || 'Unknown error') },
      { status: 500 }
    )
  }
}
