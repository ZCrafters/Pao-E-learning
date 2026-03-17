import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get statistics
    const totalParticipants = await prisma.participant.count()
    const totalResults = await prisma.quizResult.count()
    
    const passedResults = await prisma.quizResult.count({
      where: { status: 'LULUS' }
    })
    
    const averageScore = await prisma.quizResult.aggregate({
      _avg: { percentage: true }
    })

    // Get recent participants with their results
    const recentParticipants = await prisma.participant.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: {
        results: true,
        progress: true,
      },
    })

    // Get results by branch
    const resultsByBranch = await prisma.participant.groupBy({
      by: ['cabang'],
      _count: { id: true },
    })

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalParticipants,
          totalResults,
          passedCount: passedResults,
          passRate: totalResults > 0 ? Math.round((passedResults / totalResults) * 100) : 0,
          averageScore: Math.round(averageScore._avg.percentage || 0),
        },
        recentParticipants,
        resultsByBranch,
      },
    })
  } catch (error) {
    console.error('Error fetching admin data:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil data admin' },
      { status: 500 }
    )
  }
}
