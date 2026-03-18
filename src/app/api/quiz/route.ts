import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' },
      select: {
        id: true,
        question: true,
        options: true,
        order: true,
      },
    })

    // Parse options JSON for each question
    const parsedQuestions = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options),
    }))

    return NextResponse.json({ success: true, data: parsedQuestions })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Gagal mengambil soal' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { participantId, answers } = body

    if (!participantId || !answers) {
      return NextResponse.json(
        { error: 'Data tidak lengkap' },
        { status: 400 }
      )
    }

    // Get all questions with correct answers
    const questions = await prisma.question.findMany({
      orderBy: { order: 'asc' },
    })

    let score = 0
    const total = questions.length

    // Calculate score
    questions.forEach((q, index) => {
      const questionKey = `q${index + 1}`
      if (answers[questionKey] === q.correct) {
        score++
      }
    })

    const percentage = (score / total) * 100
    const status = percentage >= 60 ? 'LULUS' : 'REMEDIAL'

    // Save result
    const result = await prisma.quizResult.create({
      data: {
        participantId,
        score,
        total,
        percentage,
        answers: JSON.stringify(answers),
        status,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        correctAnswers: questions.reduce((acc, q, index) => {
          acc[`q${index + 1}`] = q.correct
          return acc
        }, {} as Record<string, string>),
      },
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { error: 'Gagal menyimpan hasil quiz' },
      { status: 500 }
    )
  }
}
