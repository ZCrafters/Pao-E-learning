'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: string[]
  order: number
}

export default function QuizPage() {
  const router = useRouter()
  const [participant, setParticipant] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('pao_participant')
    if (!saved) {
      router.push('/')
      return
    }
    setParticipant(JSON.parse(saved))
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/quiz')
      const data = await res.json()
      if (data.success) {
        setQuestions(data.data)
      }
    } catch (error) {
      console.error('Error fetching questions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswer = (optionLetter: string) => {
    setAnswers({ ...answers, [`q${currentQ + 1}`]: optionLetter })
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Jawab semua soal terlebih dahulu')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: participant.id,
          answers,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setResult(data.data)
        setShowResult(true)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
    setIsLoading(false)
  }

  const getOptionLetter = (index: number) => ['A', 'B', 'C'][index]

  const getFeedback = (questionIndex: number) => {
    if (!result) return null
    const qKey = `q${questionIndex + 1}`
    const userAns = answers[qKey]
    const correctAns = result.correctAnswers[qKey]
    return { userAns, correctAns, isCorrect: userAns === correctAns }
  }

  if (isLoading) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center py-12">Memuat...</div>
      </main>
    )
  }

  if (showResult && result) {
    const score = result.score
    const percentage = (score / questions.length) * 100
    const isPassed = percentage >= 60

    return (
      <main className="max-w-3xl mx-auto px-4 py-8 pb-16">
        <button onClick={() => router.push('/')} className="flex items-center gap-1 text-sm mb-4 hover:opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
          <ChevronLeft size={16} />
          Kembali ke Beranda
        </button>

        <div className="card p-8 text-center mb-6" style={{ background: isPassed ? '#eaf3de' : '#fcebeb', borderColor: isPassed ? '#9fe1cb' : '#f7c1c1' }}>
          <Award size={48} className="mx-auto mb-4" style={{ color: isPassed ? '#1D9E75' : '#E24B4A' }} />
          <div className="text-sm uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>Hasil Post-Test</div>
          <div className="text-5xl font-medium mb-2">{score}/{questions.length}</div>
          <div className="progress-bar max-w-xs mx-auto mb-4">
            <div className="progress-fill" style={{ width: `${percentage}%`, background: isPassed ? '#1D9E75' : '#E24B4A' }}></div>
          </div>
          <div className="text-lg" style={{ color: isPassed ? '#0F6E56' : '#791F1F' }}>
            {percentage} poin — {isPassed ? 'Selamat! Kamu LULUS' : 'Perlu Remedial'}
          </div>
        </div>

        <h3 className="section-title">Pembahasan Jawaban</h3>
        {questions.map((q, index) => {
          const feedback = getFeedback(index)
          if (!feedback) return null
          
          return (
            <div key={q.id} className="card p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${feedback.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {feedback.isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Soal {index + 1}</span>
              </div>
              <div className="text-sm font-medium mb-3">{q.question}</div>
              <div className="space-y-2">
                {q.options.map((opt, optIndex) => {
                  const letter = getOptionLetter(optIndex)
                  const isSelected = feedback.userAns === letter
                  const isCorrect = feedback.correctAns === letter
                  
                  let className = 'quiz-option '
                  if (isCorrect) className += 'correct'
                  else if (isSelected && !isCorrect) className += 'wrong'
                  
                  return (
                    <div key={optIndex} className={className}>
                      <span className="font-medium w-5">{letter}</span>
                      <span>{opt.replace(/^[A-C]\.\s*/, '')}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div className="flex gap-3">
          <button onClick={() => router.push('/')} className="btn-primary flex-1">
            Selesai
          </button>
          <button onClick={() => window.location.reload()} className="btn-secondary flex items-center gap-2">
            <RotateCcw size={16} />
            Coba Lagi
          </button>
        </div>
      </main>
    )
  }

  const currentQuestion = questions[currentQ]

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 pb-20">
      <button onClick={() => router.push('/')} className="flex items-center gap-1 text-sm mb-4 hover:opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
        <ChevronLeft size={16} />
        Kembali
      </button>

      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-secondary)' }}>Post-Test · Validasi Pemahaman</div>
        <h1 className="text-xl font-medium mb-2">Uji Pemahaman Materi</h1>
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pilih jawaban yang paling mencerminkan strategi profesional PAO.</p>
      </div>

      <div className="flex gap-1.5 mb-6">
        {questions.map((_, index) => (
          <div
            key={index}
            className="h-2.5 rounded-full transition-all"
            style={{
              width: index === currentQ ? '24px' : '10px',
              background: answers[`q${index + 1}`] ? '#1D9E75' : index === currentQ ? '#378ADD' : 'var(--color-border-secondary)'
            }}
          />
        ))}
      </div>

      {currentQuestion && (
        <div className="card p-5 mb-6">
          <div className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>Soal {currentQ + 1} dari {questions.length}</div>
          <div className="text-base font-medium mb-4">{currentQuestion.question}</div>
          
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => {
              const letter = getOptionLetter(index)
              const isSelected = answers[`q${currentQ + 1}`] === letter
              
              return (
                <div
                  key={index}
                  onClick={() => handleAnswer(letter)}
                  className={`quiz-option ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}
                  style={{ borderColor: isSelected ? '#378ADD' : undefined, background: isSelected ? '#E6F1FB' : undefined }}
                >
                  <span className="font-medium w-5" style={{ color: isSelected ? '#185FA5' : undefined }}>{letter}</span>
                  <span style={{ color: isSelected ? '#185FA5' : undefined }}>{option.replace(/^[A-C]\.\s*/, '')}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
        <div className="max-w-3xl mx-auto flex gap-3">
          <button
            onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
            disabled={currentQ === 0}
            className="btn-secondary"
          >
            Sebelumnya
          </button>
          
          {currentQ < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQ(currentQ + 1)}
              className="btn-primary flex-1"
              disabled={!answers[`q${currentQ + 1}`]}
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary flex-1"
              disabled={Object.keys(answers).length < questions.length}
            >
              Kirim Jawaban
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
