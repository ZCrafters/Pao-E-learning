import { Question } from '../types'

export const QUIZ_QUESTIONS: Omit<Question, 'id' | 'moduleId' | 'createdAt' | 'updatedAt'>[] = [
  {
    question: 'Berdasarkan Social Capital Theory, mengapa posisi Ketua RT/RW disebut sebagai "Gatekeeper" dalam strategi PAO?',
    options: [
      'A. Karena mereka memegang kunci kantor dan menentukan siapa yang boleh masuk ke wilayah tersebut',
      'B. Karena rekomendasi mereka menciptakan Trust Transfer — warga lebih terbuka menerima informasi pembiayaan dari orang yang sudah mereka percaya',
      'C. Karena mereka adalah orang yang paling membutuhkan pinjaman di komunitas tersebut dan bisa menjadi contoh bagi anggota lain'
    ],
    correct: 'B',
    explanation: 'Gatekeeper bukan soal otoritas fisik, melainkan otoritas sosial. Rekomendasi Ketua RT/RW menurunkan resistensi warga karena ada unsur kepercayaan yang sudah terbangun sebelumnya.',
    order: 1
  },
  {
    question: 'Leads to Order kamu bulan ini hanya 20% dari target 50%. Berdasarkan prinsip Sales Funnel, tindakan korektif mana yang paling efisien?',
    options: [
      'A. Meminta mitra komunitas mengirimkan leads sebanyak mungkin tanpa syarat apapun agar volume meningkat',
      'B. Melakukan standarisasi kriteria leads layak kepada mitra komunitas — edukasi mitra tentang profil nasabah ideal sebelum mengirimkan data',
      'C. Segera menghentikan kerja sama dengan komunitas tersebut dan mencari komunitas baru yang lebih potensial'
    ],
    correct: 'B',
    explanation: 'Filtering at Source berarti mendidik mitra agar hanya mengirim leads yang sudah memenuhi kriteria dasar. Jauh lebih efisien daripada memproses banyak leads yang ujungnya reject.',
    order: 2
  },
  {
    question: 'Dalam kerangka Relationship Marketing (Morgan & Hunt), cara terbaik menekan angka R1 di bawah 5% secara berkelanjutan adalah...',
    options: [
      'A. Mengancam mitra komunitas bahwa kerja sama akan diputus jika ada nasabah yang menunggak di bulan pertama',
      'B. Membangun komitmen bersama: nasabah yang bayar lancar berarti kuota pinjaman komunitas meningkat di masa depan — ciptakan kepentingan yang sama',
      'C. Menyewa orang luar atau pihak ketiga untuk membantu menagih nasabah yang berpotensi terlambat membayar'
    ],
    correct: 'B',
    explanation: 'Shared commitment menciptakan kontrol sosial organik. Mitra akan sukarela memantau nasabah karena kepentingan mereka sendiri bergantung pada kualitas pembayaran anggota.',
    order: 3
  },
  {
    question: 'PAO berbeda dari Sales Tradisional karena PAO membangun "sistem", bukan sekadar mencari satu per satu. Apa yang dimaksud dengan "sistem" dalam konteks ini?',
    options: [
      'A. Menggunakan aplikasi digital yang canggih untuk mencatat semua data nasabah secara otomatis',
      'B. Membangun jaringan mitra komunitas yang secara konsisten merekomendasikan nasabah sehingga leads terus masuk bahkan ketika PAO tidak sedang aktif mencari',
      'C. Membuat jadwal kunjungan door-to-door yang lebih terstruktur dan terjadwal setiap harinya'
    ],
    correct: 'B',
    explanation: '"Sistem" dalam konteks PAO adalah jaringan mitra komunitas yang aktif merekomendasikan nasabah. Bukan teknologi, bukan jadwal — tapi ekosistem manusia yang bekerja secara berkelanjutan.',
    order: 4
  },
  {
    question: 'Seorang PAO mature berbeda dari PAO yang masih berkembang. Dari pilihan berikut, mana yang paling mencerminkan perilaku PAO mature?',
    options: [
      'A. Selalu mengumpulkan leads dalam jumlah terbanyak dibanding rekan-rekannya setiap bulan tanpa gagal',
      'B. Mendidik mitra tentang kriteria nasabah ideal sehingga kualitas leads meningkat, dan menggunakan komunitas sebagai early warning system untuk menjaga R1 dan R3M',
      'C. Tidak perlu lagi melakukan kunjungan rutin ke komunitas karena sistem sudah berjalan sendiri secara otomatis'
    ],
    correct: 'B',
    explanation: 'PAO mature membangun sistem dan mendidik mitra sehingga kualitas leads meningkat secara konsisten, sekaligus menggunakan komunitas sebagai early warning untuk menjaga portofolio.',
    order: 5
  }
]

export const PASSING_SCORE = 60 // Minimum 60% to pass
export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length
export const POINTS_PER_QUESTION = 20

export const getScoreStatus = (percentage: number): { status: 'LULUS' | 'REMEDIAL'; message: string } => {
  if (percentage >= PASSING_SCORE) {
    return {
      status: 'LULUS',
      message: percentage >= 80 ? 'Sempurna! Kamu siap jadi PAO profesional.' : 'Selamat! Kamu LULUS.'
    }
  }
  return {
    status: 'REMEDIAL',
    message: percentage >= 40 ? 'Beberapa konsep perlu diperkuat.' : 'Perlu mengulang materi dari awal.'
  }
}
