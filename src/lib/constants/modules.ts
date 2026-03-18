import { Module, KPIItem } from '../types'

export const KPI_DATA: KPIItem[] = [
  { label: 'AF Partnership', value: 'Rp 300 Jt', desc: 'Target pencairan', color: '#378ADD' },
  { label: 'Komunitas Aktif', value: '35%', desc: 'Kirim leads/bulan', color: '#1D9E75' },
  { label: 'Leads to Order', value: '50%', desc: '5 dari 10 layak', color: '#BA7517' },
  { label: 'R1 / R3M', value: '5% / 25%', desc: 'Batas tunggak', color: '#D4537E' },
]

export const MODULES: Module[] = [
  {
    id: '1',
    title: 'Positioning — Siapa Saya Sebenarnya?',
    slug: 'bab1',
    description: 'Role Identity Theory · PAO vs Sales Tradisional · Mindset Strategic Partner',
    order: 1,
    color: '#378ADD',
    content: {
      theory: {
        title: 'Role Identity Theory',
        text: 'Ketika seseorang memahami perannya dengan jelas, ia mengambil keputusan lebih terarah. PAO yang tahu identitasnya akan jauh lebih efektif di lapangan.'
      },
      identities: [
        { 
          code: 'SP', 
          title: 'Strategic Partner', 
          desc: 'Membangun sistem kolam nasabah. Mitra yang bekerja — PAO yang menuai hasil secara berkelanjutan.', 
          bg: '#E6F1FB', 
          color: '#185FA5' 
        },
        { 
          code: 'BB', 
          title: 'Bridge Builder', 
          desc: 'Wajah FINATRA di lapangan. Kepercayaan terhadap perusahaan dimulai dari kepercayaan pada kamu.', 
          bg: '#E1F5EE', 
          color: '#0F6E56' 
        },
        { 
          code: 'QC', 
          title: 'Quality Controller', 
          desc: 'Bukan sekadar kumpulkan nama. Pastikan setiap nama punya kapasitas bayar dan karakter yang baik.', 
          bg: '#FAEEDA', 
          color: '#854F0B' 
        }
      ],
      comparison: {
        traditional: [
          'Berburu satu per satu (door to door)',
          'Hasil = stamina harian PAO',
          'Stop aktif = stop leads masuk',
          'Tidak ada sistem yang bekerja sendiri',
          'Susah scale up volume'
        ],
        pao: [
          'Bangun kolam via komunitas',
          'Satu komunitas = puluhan leads/bulan',
          'Sistem tetap jalan meski PAO libur',
          'Mitra yang merekomendasikan nasabah',
          'Leads berkualitas lebih terjaga'
        ]
      },
      mindset: [
        { 
          type: 'wrong', 
          title: 'Mindset lama: "Aku harus cari nasabah sebanyak mungkin hari ini"', 
          desc: 'Pola pikir ini membuat PAO kelelahan dan hasilnya tidak konsisten.' 
        },
        { 
          type: 'correct', 
          title: 'Mindset baru: "Aku harus membangun komunitas yang terus mengirimkan nasabah untukku"', 
          desc: 'Satu investasi waktu untuk melobi Ketua RT/RW bisa menghasilkan leads konsisten.' 
        }
      ],
      stakeholders: [
        { role: 'Ketua RT/RW', desc: 'Gatekeeper & Trust Builder', manage: 'Kunjungan rutin, edukasi manfaat' },
        { role: 'Tokoh UMKM', desc: 'Influencer di komunitas dagang', manage: 'Jadikan ambassador FINATRA' },
        { role: 'Calon Nasabah', desc: 'Sumber AF (pencairan)', manage: 'Screening karakter + kapasitas' },
        { role: 'Nasabah Aktif', desc: 'Referral & social proof', manage: 'Jaga relasi, bantu jika ada masalah' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Hunting & Mapping Komunitas',
    slug: 'bab2',
    description: 'Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper Effect',
    order: 2,
    color: '#1D9E75',
    content: {
      theory: {
        title: 'Social Capital Theory (Robert Putnam)',
        text: 'Modal sosial adalah perekat yang memungkinkan anggota masyarakat bekerja sama. PAO tidak mencari individu, melainkan mengelola jaringan kepercayaan yang sudah ada.'
      },
      bonding: {
        title: 'Bonding — Komunitas Solid (Prioritas Utama)',
        desc: 'RT/RW, Koperasi, Paguyuban Pedagang Pasar. Anggota sudah saling kenal dan percaya satu sama lain. Kepercayaan Ketua langsung ditransfer ke anggota.',
        bg: '#E1F5EE',
        color: '#0F6E56'
      },
      bridging: {
        title: 'Bridging — Komunitas Baru (Investasi Jangka Menengah)',
        desc: 'UMKM lintas wilayah, grup media sosial, komunitas hobi produktif. Butuh 2-3 pertemuan untuk membangun kepercayaan.',
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
        { step: 1, title: 'Pertemuan pertama: bangun kedekatan personal', desc: 'Jangan langsung bicara produk. Tanyakan tentang komunitas mereka.' },
        { step: 2, title: 'Pertemuan kedua: presentasikan solusi', desc: 'Sampaikan FINATRA hadir untuk membantu anggota naik kelas.' },
        { step: 3, title: 'Jelaskan benefit konkret', desc: 'Success fee, potensi peningkatan kuota, program komunitas berprestasi.' },
        { step: 4, title: 'Kunjungan rutin minimal 2x per bulan', desc: 'Jangan hilang setelah kerja sama berjalan.' },
        { step: 5, title: 'Input semua data ke Digital Form', desc: 'Data ini adalah aset — basis evaluasi strategi bulan depan.' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Lead Generation & Filtering',
    slug: 'bab3',
    description: 'AIDA Model · Sales Funnel · First Screening · Customer Profiling',
    order: 3,
    color: '#BA7517',
    content: {
      theory: {
        title: 'Sales Funnel & AIDA Model',
        text: 'Setiap tahap funnel menyaring prospek. Semakin baik kualitas input di bagian atas, semakin tinggi konversi di bawah. Leads banyak tanpa kualitas = pemborosan OPEX.'
      },
      funnel: [
        { stage: 'Awareness', pct: 100, label: 'Sosialisasi & edukasi', bg: '#E6F1FB', color: '#185FA5' },
        { stage: 'Interest', pct: 80, label: 'Leads masuk dari mitra', bg: '#FAEEDA', color: '#854F0B' },
        { stage: 'Decision', pct: 50, label: 'Lolos first screening', bg: '#F0997B', color: '#993C1D', highlight: true },
        { stage: 'Action (AF)', pct: 35, label: 'Cair / disbursement', bg: '#C0DD97', color: '#3B6D11' }
      ],
      screening3C: [
        { code: 'C1', title: 'Character — Karakter', desc: 'Tanya Ketua RT/RW: dikenal baik di lingkungan? Amanah dalam janji?', bg: '#E6F1FB', color: '#185FA5' },
        { code: 'C2', title: 'Capacity — Kapasitas Bayar', desc: 'Apakah memiliki UMKM aktif yang berjalan? Ada cashflow nyata?', bg: '#EAF3DE', color: '#3B6D11' },
        { code: 'C3', title: 'Capital & Condition', desc: 'Usaha sudah berjalan berapa lama? Tujuan pinjaman harus produktif.', bg: '#FAEEDA', color: '#854F0B' }
      ],
      profiling: [
        { criteria: 'Jenis usaha', ideal: 'UMKM aktif, min. 6 bulan', redflag: 'Usaha baru atau tidak jelas' },
        { criteria: 'Penghasilan', ideal: 'Rutin, bisa dibuktikan', redflag: 'Tidak teratur, tidak ada bukti' },
        { criteria: 'Reputasi sosial', ideal: 'Dikenal baik oleh Ketua', redflag: 'Diragukan Ketua RT/RW' },
        { criteria: 'Tujuan pinjaman', ideal: 'Modal usaha, stok barang', redflag: 'Konsumsi, bayar hutang lain' },
        { criteria: 'Riwayat kredit', ideal: 'Tidak ada tunggak aktif', redflag: 'Ada kredit macet' }
      ],
      education: [
        { code: 'A', title: 'Ajarkan kriteria nasabah yang layak kepada Ketua', desc: 'Sampaikan secara sederhana ke Ketua.' },
        { code: 'B', title: 'Berikan feedback setelah setiap batch leads', desc: 'Informasikan ke Ketua mana leads yang disetujui.' },
        { code: 'C', title: 'Follow-up dalam 24 jam pertama setelah leads masuk', desc: 'Kecepatan adalah keunggulan kompetitif.' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Menjaga Kualitas Portofolio',
    slug: 'bab4',
    description: 'Relationship Marketing · R1 5% · R3M 25% · Early Warning System',
    order: 4,
    color: '#D4537E',
    content: {
      theory: {
        title: 'Relationship Marketing (Morgan & Hunt, 1994)',
        text: 'Hubungan bisnis yang sukses dibangun di atas Trust dan Commitment. Pekerjaan PAO tidak selesai saat pencairan.'
      },
      riskMetrics: [
        { label: 'R1 — Bulan Pertama', value: 'Maks. 5%', pct: 5, color: '#BA7517', desc: 'Nasabah menunggak di bulan pertama = sinyal serius. Ada kesalahan identifikasi karakter.' },
        { label: 'R3M — Bulan Ketiga', value: 'Maks. 25%', pct: 25, color: '#D4537E', desc: 'Tunggak di bulan ketiga = masalah usaha atau kebiasaan pembayaran buruk.' }
      ],
      r1Causes: [
        { title: 'Salah identifikasi karakter sejak awal', desc: 'Merekomendasikan orang tanpa track record baik.' },
        { title: 'Pinjaman digunakan untuk tujuan konsumtif', desc: 'Tidak ada return dari pinjaman untuk membayar cicilan.' },
        { title: 'Over-credit — jumlah pinjaman melebihi kapasitas', desc: 'Cicilan terlalu besar relatif terhadap penghasilan.' }
      ],
      earlyWarnings: [
        'Usaha tidak konsisten atau baru berdiri (kurang dari 3 bulan)',
        'Reputasi diragukan di komunitas',
        'Tujuan pinjaman tidak produktif',
        'Terlalu antusias tanpa detail yang jelas'
      ],
      strategies: [
        { step: 1, title: 'Bangun Shared Values dengan mitra', desc: 'Komunitas yang pembayarannya lancar akan mendapat peningkatan kuota.' },
        { step: 2, title: 'Jadikan Ketua sebagai early warning radar', desc: 'Minta Ketua untuk menginformasikan jika ada nasabah yang usahanya lesu.' },
        { step: 3, title: 'Kunjungan check-in berkala ke nasabah aktif', desc: 'Terutama di bulan pertama dan ketiga.' },
        { step: 4, title: 'Gunakan kontrol sosial komunitas', desc: 'Tekanan sosial antar anggota sangat kuat.' }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
]

export const getModuleBySlug = (slug: string): Module | undefined => {
  return MODULES.find(m => m.slug === slug)
}

export const getAllModules = (): Module[] => {
  return MODULES.sort((a, b) => a.order - b.order)
}
