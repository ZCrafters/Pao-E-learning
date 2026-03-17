import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as XLSX from 'xlsx'

export async function GET() {
  try {
    // Get all participants with results
    const participants = await prisma.participant.findMany({
      include: {
        results: true,
        progress: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    // Format data for export
    const exportData = participants.map((p) => ({
      'Timestamp': p.createdAt.toISOString(),
      'Nama': p.nama,
      'Cabang': p.cabang,
      'Email': p.email || '-',
      'Progress Belajar': p.progress ? `${p.progress.percent}%` : '0%',
      'Status Quiz': p.results.length > 0 ? p.results[0].status : 'Belum Mengikuti',
      'Skor': p.results.length > 0 ? `${p.results[0].score}/${p.results[0].total}` : '-',
      'Persentase': p.results.length > 0 ? `${Math.round(p.results[0].percentage)}%` : '-',
    }))

    // Create workbook
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)
    
    // Set column widths
    const colWidths = [
      { wch: 20 }, // Timestamp
      { wch: 25 }, // Nama
      { wch: 15 }, // Cabang
      { wch: 25 }, // Email
      { wch: 15 }, // Progress
      { wch: 15 }, // Status
      { wch: 10 }, // Skor
      { wch: 12 }, // Persentase
    ]
    ws['!cols'] = colWidths

    XLSX.utils.book_append_sheet(wb, ws, 'Hasil Pelatihan PAO')

    // Generate buffer
    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment; filename="hasil-pelatihan-pao.xlsx"',
      },
    })
  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Gagal mengekspor data' },
      { status: 500 }
    )
  }
}
