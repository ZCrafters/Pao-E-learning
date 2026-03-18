import { NextResponse } from 'next/server'

const questions = [
  {
    id: 'q1',
    question: 'Berdasarkan Social Capital Theory, mengapa posisi Ketua RT/RW disebut sebagai "Gatekeeper" dalam strategi PAO?',
    options: [
      'A. Karena mereka memegang kunci kantor dan menentukan siapa yang boleh masuk ke wilayah tersebut',
      'B. Karena rekomendasi mereka menciptakan Trust Transfer — warga lebih terbuka menerima informasi pembiayaan dari orang yang sudah mereka percaya',
      'C. Karena mereka adalah orang yang paling membutuhkan pinjaman di komunitas tersebut dan bisa menjadi contoh bagi anggota lain',
    ],
    correct: 'B',
    order: 1,
  },
  {
    id: 'q2',
    question: 'Leads to Order kamu bulan ini hanya 20% dari target 50%. Berdasarkan prinsip Sales Funnel, tindakan korektif mana yang paling efisien?',
    options: [
      'A. Meminta mitra komunitas mengirimkan leads sebanyak mungkin tanpa syarat apapun agar volume meningkat',
      'B. Melakukan standarisasi kriteria leads layak kepada mitra komunitas — edukasi mitra tentang profil nasabah ideal sebelum mengirimkan data',
      'C. Segera menghentikan kerja sama dengan komunitas tersebut dan mencari komunitas baru yang lebih potensial',
    ],
    correct: 'B',
    order: 2,
  },
  {
    id: 'q3',
    question: 'Dalam kerangka Relationship Marketing (Morgan & Hunt), cara terbaik menekan angka R1 di bawah 5% secara berkelanjutan adalah...',
    options: [
      'A. Mengancam mitra komunitas bahwa kerja sama akan diputus jika ada nasabah yang menunggak di bulan pertama',
      'B. Membangun komitmen bersama: nasabah yang bayar lancar berarti kuota pinjaman komunitas meningkat di masa depan — ciptakan kepentingan yang sama',
      'C. Menyewa orang luar atau pihak ketiga untuk membantu menagih nasabah yang berpotensi terlambat membayar',
    ],
    correct: 'B',
    order: 3,
  },
  {
    id: 'q4',
    question: 'PAO berbeda dari Sales Tradisional karena PAO membangun "sistem", bukan sekadar mencari satu per satu. Apa yang dimaksud dengan "sistem" dalam konteks ini?',
    options: [
      'A. Menggunakan aplikasi digital yang canggih untuk mencatat semua data nasabah secara otomatis',
      'B. Membangun jaringan mitra komunitas yang secara konsisten merekomendasikan nasabah sehingga leads terus masuk bahkan ketika PAO tidak sedang aktif mencari',
      'C. Membuat jadwal kunjungan door-to-door yang lebih terstruktur dan terjadwal setiap harinya',
    ],
    correct: 'B',
    order: 4,
  },
  {
    id: 'q5',
    question: 'Seorang PAO mature berbeda dari PAO yang masih berkembang. Dari pilihan berikut, mana yang paling mencerminkan perilaku PAO mature?',
    options: [
      'A. Selalu mengumpulkan leads dalam jumlah terbanyak dibanding rekan-rekannya setiap bulan tanpa gagal',
      'B. Mendidik mitra tentang kriteria nasabah ideal sehingga kualitas leads meningkat, dan menggunakan komunitas sebagai early warning system untuk menjaga R1 dan R3M',
      'C. Tidak perlu lagi melakukan kunjungan rutin ke komunitas karena sistem sudah berjalan sendiri secara otomatis',
    ],
    correct: 'B',
    order: 5,
  },
]

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: questions.map(({ correct, ...question }) => question),
  })
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

    let score = 0
    const total = questions.length

    questions.forEach((q, index) => {
      const questionKey = `q${index + 1}`
      if (answers[questionKey] === q.correct) {
        score++
      }
    })

    const percentage = (score / total) * 100
    const status = percentage >= 60 ? 'LULUS' : 'REMEDIAL'

    return NextResponse.json({
      success: true,
      data: {
        id: `${participantId}-${Date.now()}`,
        participantId,
        score,
        total,
        percentage,
        answers,
        status,
        createdAt: new Date().toISOString(),
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
