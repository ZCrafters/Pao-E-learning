import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const modules = [
  {
    title: 'Positioning — Siapa Saya Sebenarnya?',
    slug: 'bab1',
    description: 'Role Identity Theory · PAO vs Sales Tradisional · Mindset Strategic Partner',
    order: 1,
    color: '#378ADD',
    content: JSON.stringify({
      theory: {
        title: 'Role Identity Theory',
        text: 'Ketika seseorang memahami perannya dengan jelas, ia mengambil keputusan lebih terarah. PAO yang tahu identitasnya akan jauh lebih efektif di lapangan.'
      },
      identities: [
        { code: 'SP', title: 'Strategic Partner', desc: 'Membangun sistem kolam nasabah. Mitra yang bekerja — PAO yang menuai hasil secara berkelanjutan.', bg: '#E6F1FB', color: '#185FA5' },
        { code: 'BB', title: 'Bridge Builder', desc: 'Wajah FINATRA di lapangan. Kepercayaan terhadap perusahaan dimulai dari kepercayaan pada kamu.', bg: '#E1F5EE', color: '#0F6E56' },
        { code: 'QC', title: 'Quality Controller', desc: 'Bukan sekadar kumpulkan nama. Pastikan setiap nama punya kapasitas bayar dan karakter yang baik.', bg: '#FAEEDA', color: '#854F0B' }
      ],
      comparison: {
        traditional: ['Berburu satu per satu (door to door)', 'Hasil = stamina harian PAO', 'Stop aktif = stop leads masuk', 'Tidak ada sistem yang bekerja sendiri', 'Susah scale up volume'],
        pao: ['Bangun kolam via komunitas', 'Satu komunitas = puluhan leads/bulan', 'Sistem tetap jalan meski PAO libur', 'Mitra yang merekomendasikan nasabah', 'Leads berkualitas lebih terjaga']
      },
      mindset: [
        { type: 'wrong', title: 'Mindset lama: "Aku harus cari nasabah sebanyak mungkin hari ini"', desc: 'Pola pikir ini membuat PAO kelelahan dan hasilnya tidak konsisten.' },
        { type: 'correct', title: 'Mindset baru: "Aku harus membangun komunitas yang terus mengirimkan nasabah untukku"', desc: 'Satu investasi waktu untuk melobi Ketua RT/RW bisa menghasilkan leads konsisten.' }
      ],
      stakeholders: [
        { role: 'Ketua RT/RW', desc: 'Gatekeeper & Trust Builder', manage: 'Kunjungan rutin, edukasi manfaat' },
        { role: 'Tokoh UMKM', desc: 'Influencer di komunitas dagang', manage: 'Jadikan ambassador FINATRA' },
        { role: 'Calon Nasabah', desc: 'Sumber AF (pencairan)', manage: 'Screening karakter + kapasitas' },
        { role: 'Nasabah Aktif', desc: 'Referral & social proof', manage: 'Jaga relasi, bantu jika ada masalah' }
      ]
    })
  },
  {
    title: 'Hunting & Mapping Komunitas',
    slug: 'bab2',
    description: 'Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper Effect',
    order: 2,
    color: '#1D9E75',
    content: JSON.stringify({
      theory: {
        title: 'Social Capital Theory (Robert Putnam)',
        text: 'Modal sosial adalah perekat yang memungkinkan anggota masyarakat bekerja sama. PAO tidak mencari individu, melainkan mengelola jaringan kepercayaan yang sudah ada.'
      },
      bonding: {
        title: 'Bonding — Komunitas Solid (Prioritas Utama)',
        desc: 'RT/RW, Koperasi, Paguyuban Pedagang Pasar. Anggota sudah saling kenal dan percaya satu sama lain. Kepercayaan Ketua langsung ditransfer ke anggota. Ini tanah subur — leads berkualitas lebih mudah didapat.',
        bg: '#E1F5EE',
        color: '#0F6E56'
      },
      bridging: {
        title: 'Bridging — Komunitas Baru (Investasi Jangka Menengah)',
        desc: 'UMKM lintas wilayah, grup media sosial, komunitas hobi produktif. Belum ada hubungan personal dengan FINATRA. Butuh 2-3 pertemuan untuk membangun kepercayaan.',
        bg: '#FAEEDA',
        color: '#854F0B'
      },
      matrix: [
        { prio: 'Prioritas 1', title: 'High Potential + High Trust', desc: 'RT/RW dengan UMKM aktif & Ketua yang kooperatif. Langsung garap sekarang.', bg: '#EAF3DE', color: '#27500A', bar: '#639922' },
        { prio: 'Prioritas 2', title: 'High Potential + Low Trust', desc: 'Komunitas besar tapi belum kenal FINATRA. Mulai edukasi, bangun relasi dulu.', bg: '#FAEEDA', color: '#633806', bar: '#BA7517' },
        { prio: 'Prioritas 3', title: 'Low Potential + High Trust', desc: 'Komunitas kecil tapi sudah percaya. Kelola efisien, jangan ditinggalkan.', bg: '#E6F1FB', color: '#185FA5', bar: '#378ADD' },
        { prio: 'Tunda', title: 'Low Potential + Low Trust', desc: 'Belum saatnya diinvestasikan. Fokus ke prioritas lebih tinggi.', bg: '#FCEBEB', color: '#791F1F', bar: '#E24B4A' }
      ],
      goldCriteria: [
        'Komunitas dengan perputaran uang harian (pedagang pasar, warung, bengkel)',
        'Ketua komunitas yang aktif dan dipercaya',
        'Anggota berjumlah 20-100 orang produktif'
      ],
      lobbying: [
        { step: 1, title: 'Pertemuan pertama: bangun kedekatan personal', desc: 'Jangan langsung bicara produk. Tanyakan tentang komunitas mereka dan tunjukkan genuine care.' },
        { step: 2, title: 'Pertemuan kedua: presentasikan solusi, bukan produk', desc: 'Sampaikan FINATRA hadir untuk membantu anggota naik kelas melalui akses modal.' },
        { step: 3, title: 'Jelaskan benefit konkret untuk komunitas', desc: 'Success fee, potensi peningkatan kuota, program komunitas berprestasi.' },
        { step: 4, title: 'Kunjungan rutin minimal 2x per bulan', desc: 'Jangan hilang setelah kerja sama berjalan. Komunitas aktif butuh perhatian konsisten.' },
        { step: 5, title: 'Input semua data ke Digital Form secara real-time', desc: 'Data ini adalah aset — basis evaluasi strategi bulan depan.' }
      ]
    })
  },
  {
    title: 'Lead Generation & Filtering',
    slug: 'bab3',
    description: 'AIDA Model · Sales Funnel · First Screening · Customer Profiling',
    order: 3,
    color: '#BA7517',
    content: JSON.stringify({
      theory: {
        title: 'Sales Funnel & AIDA Model',
        text: 'Setiap tahap funnel menyaring prospek. Semakin baik kualitas input di bagian atas, semakin tinggi konversi di bawah. Leads banyak tanpa kualitas = pemborosan biaya operasional (OPEX).'
      },
      funnel: [
        { stage: 'Awareness', pct: 100, label: 'Sosialisasi & edukasi komunitas', bg: '#E6F1FB', color: '#185FA5' },
        { stage: 'Interest', pct: 80, label: 'Leads masuk dari mitra', bg: '#FAEEDA', color: '#854F0B' },
        { stage: 'Decision', pct: 50, label: 'Lolos first screening', bg: '#F0997B', color: '#993C1D', highlight: true },
        { stage: 'Action (AF)', pct: 35, label: 'Cair / disbursement', bg: '#C0DD97', color: '#3B6D11' }
      ],
      screening3C: [
        { code: 'C1', title: 'Character — Karakter', desc: 'Tanya Ketua RT/RW: dikenal baik di lingkungan? Bertanggung jawab dalam urusan keuangan? Amanah dalam janji?', bg: '#E6F1FB', color: '#185FA5' },
        { code: 'C2', title: 'Capacity — Kapasitas Bayar', desc: 'Apakah memiliki UMKM aktif yang berjalan? Ada cashflow nyata — bukan sekadar rencana usaha.', bg: '#EAF3DE', color: '#3B6D11' },
        { code: 'C3', title: 'Capital & Condition — Kondisi Usaha', desc: 'Usaha sudah berjalan berapa lama? Ada aset atau jaminan sosial? Tujuan pinjaman harus produktif.', bg: '#FAEEDA', color: '#854F0B' }
      ],
      profiling: [
        { criteria: 'Jenis usaha', ideal: 'UMKM aktif, min. 6 bulan berjalan', redflag: 'Usaha baru atau tidak jelas' },
        { criteria: 'Penghasilan', ideal: 'Rutin, bisa dibuktikan', redflag: 'Tidak teratur, tidak ada bukti' },
        { criteria: 'Reputasi sosial', ideal: 'Dikenal baik oleh Ketua & tetangga', redflag: 'Diragukan Ketua RT/RW' },
        { criteria: 'Tujuan pinjaman', ideal: 'Modal usaha, stok barang, alat', redflag: 'Konsumsi, bayar hutang lain' },
        { criteria: 'Riwayat kredit', ideal: 'Tidak ada tunggak aktif', redflag: 'Ada kredit macet atau sengketa' }
      ],
      education: [
        { code: 'A', title: 'Ajarkan kriteria nasabah yang layak kepada Ketua', desc: 'Sampaikan secara sederhana: "Pak Ketua, cukup rekomendasikan warga yang usahanya jalan dan dikenal jujur di sini."' },
        { code: 'B', title: 'Berikan feedback setelah setiap batch leads', desc: 'Informasikan ke Ketua mana leads yang disetujui dan mana yang tidak, serta alasannya.' },
        { code: 'C', title: 'Follow-up dalam 24 jam pertama setelah leads masuk', desc: 'Kecepatan adalah keunggulan kompetitif. 24 jam adalah golden window.' }
      ]
    })
  },
  {
    title: 'Menjaga Kualitas Portofolio',
    slug: 'bab4',
    description: 'Relationship Marketing · R1 5% · R3M 25% · Early Warning System',
    order: 4,
    color: '#D4537E',
    content: JSON.stringify({
      theory: {
        title: 'Relationship Marketing (Morgan & Hunt, 1994)',
        text: 'Hubungan bisnis yang sukses dibangun di atas Trust (kepercayaan) dan Commitment (komitmen jangka panjang). Pekerjaan PAO tidak selesai saat pencairan — justru di situlah fase kritis dimulai.'
      },
      riskMetrics: [
        { label: 'R1 — Bulan Pertama', value: 'Maks. 5%', pct: 5, color: '#BA7517', desc: 'Nasabah menunggak di bulan pertama = sinyal serius. Ada kesalahan identifikasi karakter atau kapasitas sejak awal survei.' },
        { label: 'R3M — Bulan Ketiga', value: 'Maks. 25%', pct: 25, color: '#D4537E', desc: 'Tunggak di bulan ketiga bisa mengindikasikan masalah usaha atau kebiasaan pembayaran buruk.' }
      ],
      r1Causes: [
        { title: 'Salah identifikasi karakter sejak awal', desc: 'PAO atau mitra merekomendasikan orang yang sebenarnya tidak memiliki track record yang cukup baik.' },
        { title: 'Pinjaman digunakan untuk tujuan konsumtif', desc: 'Tidak ada return dari pinjaman untuk membayar cicilan. Cashflow tidak mendukung.' },
        { title: 'Over-credit — jumlah pinjaman melebihi kapasitas', desc: 'Cicilan terlalu besar relatif terhadap penghasilan nyata.' }
      ],
      earlyWarnings: [
        'Usaha tidak konsisten atau baru berdiri (kurang dari 3 bulan)',
        'Reputasi diragukan di komunitas',
        'Tujuan pinjaman tidak produktif',
        'Terlalu antusias mengajukan tanpa detail yang jelas'
      ],
      strategies: [
        { step: 1, title: 'Bangun Shared Values dengan mitra', desc: 'Komunitas yang pembayarannya lancar akan mendapat peningkatan kuota pinjaman. Ini menciptakan kontrol sosial organik.' },
        { step: 2, title: 'Jadikan Ketua sebagai early warning radar', desc: 'Minta Ketua untuk menginformasikan jika ada nasabah yang usahanya mulai lesu.' },
        { step: 3, title: 'Kunjungan check-in berkala ke nasabah aktif', desc: 'Terutama di bulan pertama dan ketiga. Kehadiran PAO memberikan sinyal bahwa perusahaan peduli.' },
        { step: 4, title: 'Gunakan kontrol sosial komunitas', desc: 'Dalam komunitas yang solid, rasa malu dan tekanan sosial antar anggota adalah mekanisme pembayaran yang sangat kuat.' }
      ]
    })
  }
]

const questions = [
  // Questions for Bab 1-4 mixed quiz (5 questions)
  {
    moduleId: '', // Will be set after module creation
    question: 'Berdasarkan Social Capital Theory, mengapa posisi Ketua RT/RW disebut sebagai "Gatekeeper" dalam strategi PAO?',
    options: JSON.stringify([
      'A. Karena mereka memegang kunci kantor dan menentukan siapa yang boleh masuk ke wilayah tersebut',
      'B. Karena rekomendasi mereka menciptakan Trust Transfer — warga lebih terbuka menerima informasi pembiayaan dari orang yang sudah mereka percaya',
      'C. Karena mereka adalah orang yang paling membutuhkan pinjaman di komunitas tersebut dan bisa menjadi contoh bagi anggota lain'
    ]),
    correct: 'B',
    explanation: 'Gatekeeper bukan soal otoritas fisik, melainkan otoritas sosial. Rekomendasi Ketua RT/RW menurunkan resistensi warga karena ada unsur kepercayaan yang sudah terbangun sebelumnya.',
    order: 1
  },
  {
    moduleId: '',
    question: 'Leads to Order kamu bulan ini hanya 20% dari target 50%. Berdasarkan prinsip Sales Funnel, tindakan korektif mana yang paling efisien?',
    options: JSON.stringify([
      'A. Meminta mitra komunitas mengirimkan leads sebanyak mungkin tanpa syarat apapun agar volume meningkat',
      'B. Melakukan standarisasi kriteria leads layak kepada mitra komunitas — edukasi mitra tentang profil nasabah ideal sebelum mengirimkan data',
      'C. Segera menghentikan kerja sama dengan komunitas tersebut dan mencari komunitas baru yang lebih potensial'
    ]),
    correct: 'B',
    explanation: 'Filtering at Source berarti mendidik mitra agar hanya mengirim leads yang sudah memenuhi kriteria dasar. Jauh lebih efisien daripada memproses banyak leads yang ujungnya reject.',
    order: 2
  },
  {
    moduleId: '',
    question: 'Dalam kerangka Relationship Marketing (Morgan & Hunt), cara terbaik menekan angka R1 di bawah 5% secara berkelanjutan adalah...',
    options: JSON.stringify([
      'A. Mengancam mitra komunitas bahwa kerja sama akan diputus jika ada nasabah yang menunggak di bulan pertama',
      'B. Membangun komitmen bersama: nasabah yang bayar lancar berarti kuota pinjaman komunitas meningkat di masa depan — ciptakan kepentingan yang sama',
      'C. Menyewa orang luar atau pihak ketiga untuk membantu menagih nasabah yang berpotensi terlambat membayar'
    ]),
    correct: 'B',
    explanation: 'Shared commitment menciptakan kontrol sosial organik. Mitra akan sukarela memantau nasabah karena kepentingan mereka sendiri bergantung pada kualitas pembayaran anggota.',
    order: 3
  },
  {
    moduleId: '',
    question: 'PAO berbeda dari Sales Tradisional karena PAO membangun "sistem", bukan sekadar mencari satu per satu. Apa yang dimaksud dengan "sistem" dalam konteks ini?',
    options: JSON.stringify([
      'A. Menggunakan aplikasi digital yang canggih untuk mencatat semua data nasabah secara otomatis',
      'B. Membangun jaringan mitra komunitas yang secara konsisten merekomendasikan nasabah sehingga leads terus masuk bahkan ketika PAO tidak sedang aktif mencari',
      'C. Membuat jadwal kunjungan door-to-door yang lebih terstruktur dan terjadwal setiap harinya'
    ]),
    correct: 'B',
    explanation: '"Sistem" dalam konteks PAO adalah jaringan mitra komunitas yang aktif merekomendasikan nasabah. Bukan teknologi, bukan jadwal — tapi ekosistem manusia yang bekerja secara berkelanjutan.',
    order: 4
  },
  {
    moduleId: '',
    question: 'Seorang PAO mature berbeda dari PAO yang masih berkembang. Dari pilihan berikut, mana yang paling mencerminkan perilaku PAO mature?',
    options: JSON.stringify([
      'A. Selalu mengumpulkan leads dalam jumlah terbanyak dibanding rekan-rekannya setiap bulan tanpa gagal',
      'B. Mendidik mitra tentang kriteria nasabah ideal sehingga kualitas leads meningkat, dan menggunakan komunitas sebagai early warning system untuk menjaga R1 dan R3M',
      'C. Tidak perlu lagi melakukan kunjungan rutin ke komunitas karena sistem sudah berjalan sendiri secara otomatis'
    ]),
    correct: 'B',
    explanation: 'PAO mature membangun sistem dan mendidik mitra sehingga kualitas leads meningkat secara konsisten, sekaligus menggunakan komunitas sebagai early warning untuk menjaga portofolio.',
    order: 5
  }
]

async function main() {
  console.log('Start seeding...')

  // Create modules
  for (const mod of modules) {
    const created = await prisma.module.create({
      data: mod
    })
    console.log(`Created module: ${created.title}`)
    
    // Assign questions to the first module (general quiz)
    if (mod.order === 1) {
      for (const q of questions) {
        await prisma.question.create({
          data: {
            ...q,
            moduleId: created.id
          }
        })
      }
      console.log(`Created ${questions.length} questions`)
    }
  }

  // Create default admin
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: '$2a$10$YourHashedPasswordHere', // In production, hash this properly
      email: 'admin@finatra.co.id'
    }
  })
  console.log('Created default admin')

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
