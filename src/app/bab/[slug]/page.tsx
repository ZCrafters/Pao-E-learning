'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, CheckCircle } from 'lucide-react'

interface Module {
  id: string
  title: string
  slug: string
  description: string
  color: string
  content: any
}

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string
  
  const [module, setModule] = useState<Module | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [participant, setParticipant] = useState<any>(null)
  const [isRead, setIsRead] = useState(false)

  const fetchModule = useCallback(async () => {
    try {
      const moduleData = getModuleData(slug)
      setModule(moduleData)
    } catch (error) {
      console.error('Error fetching module:', error)
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    const saved = localStorage.getItem('pao_participant')
    if (saved) {
      setParticipant(JSON.parse(saved))
    }
    fetchModule()
  }, [fetchModule])

  const handleMarkAsRead = async () => {
    if (isRead) return
    if (!participant) {
      setIsRead(true)
      return
    }
    
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: participant.id,
          moduleSlug: slug,
        }),
      })
      setIsRead(true)
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="mobile-container">
        <div className="text-center py-12 text-sm">Memuat...</div>
      </main>
    )
  }

  if (!module) {
    return (
      <main className="mobile-container">
        <div className="text-center py-12 text-sm">Modul tidak ditemukan</div>
      </main>
    )
  }

  const content = module.content

  return (
    <main className="mobile-container pb-24">
      {/* Header */}
      <button 
        onClick={() => router.push('/')}
        className="flex items-center gap-1 text-xs sm:text-sm mb-3 sm:mb-4 hover:opacity-70"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <ChevronLeft size={16} />
        Kembali
      </button>

      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <div className="text-xs font-medium tracking-wider uppercase mb-1 sm:mb-2" style={{ color: module.color }}>
          Bab {module.slug.replace('bab', '')}
        </div>
        <h1 className="text-lg sm:text-xl font-medium mb-1 sm:mb-2 leading-tight">{module.title}</h1>
        <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>{module.description}</p>
      </div>

      {/* Theory Card */}
      {content.theory && (
        <div className="theory-card">
          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: module.color }}></div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: 'var(--color-text-secondary)' }}>
              Landasan Teori
            </div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong>{content.theory.title}</strong> — {content.theory.text}
            </div>
          </div>
        </div>
      )}

      {/* Content based on module type */}
      {slug === 'bab1' && <Bab1Content content={content} color={module.color} />}
      {slug === 'bab2' && <Bab2Content content={content} color={module.color} />}
      {slug === 'bab3' && <Bab3Content content={content} color={module.color} />}
      {slug === 'bab4' && <Bab4Content content={content} color={module.color} />}

      {/* Mark as Read Button - Fixed bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-white border-t safe-bottom" style={{ borderColor: 'var(--color-border-tertiary)' }}>
        <div className="max-w-3xl mx-auto">
          <button
            onClick={handleMarkAsRead}
            disabled={isRead}
            className={`w-full py-3 rounded-lg font-medium transition-all text-sm sm:text-base touch-target ${
              isRead ? 'bg-green-100 text-green-700' : 'btn-primary'
            }`}
          >
            {isRead ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle size={18} />
                Sudah Dibaca
              </span>
            ) : 'Tandai Sudah Dibaca'}
          </button>
        </div>
      </div>
    </main>
  )
}

// Module-specific content components with mobile improvements
function Bab1Content({ content, color }: { content: any; color: string }) {
  return (
    <>
      <h3 className="section-title">3 Identitas Profesional PAO</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        {content.identities?.map((id: any, i: number) => (
          <div key={i} className="card p-3 sm:p-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs font-medium mb-2" style={{ background: id.bg, color: id.color }}>
              {id.code}
            </div>
            <div className="font-medium text-sm mb-1">{id.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{id.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Perbandingan Mendasar</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="card p-3 sm:p-4 border-l-4" style={{ borderLeftColor: '#E24B4A' }}>
          <div className="font-medium text-sm mb-2" style={{ color: '#A32D2D' }}>Sales Tradisional</div>
          {content.comparison?.traditional.map((item: string, i: number) => (
            <div key={i} className="text-xs mb-1 pl-3 relative" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="absolute left-0">·</span>{item}
            </div>
          ))}
        </div>
        <div className="card p-3 sm:p-4 border-l-4" style={{ borderLeftColor: '#1D9E75' }}>
          <div className="font-medium text-sm mb-2" style={{ color: '#0F6E56' }}>PAO (Strategic Partner)</div>
          {content.comparison?.pao.map((item: string, i: number) => (
            <div key={i} className="text-xs mb-1 pl-3 relative" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="absolute left-0">·</span>{item}
            </div>
          ))}
        </div>
      </div>

      <h3 className="section-title">Mindset Shift</h3>
      {content.mindset?.map((m: any, i: number) => (
        <div key={i} className="point-row mb-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: m.type === 'wrong' ? '#FCEBEB' : '#EAF3DE', color: m.type === 'wrong' ? '#A32D2D' : '#3B6D11' }}>
            {m.type === 'wrong' ? '✗' : '✓'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{m.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{m.desc}</div>
          </div>
        </div>
      ))}

      <h3 className="section-title mt-4">Stakeholder</h3>
      <div className="overflow-x-auto -mx-3 px-3">
        <table className="w-full text-xs sm:text-sm min-w-[300px]">
          <thead>
            <tr style={{ background: 'var(--color-background-secondary)' }}>
              <th className="text-left p-2 text-xs font-medium">Pihak</th>
              <th className="text-left p-2 text-xs font-medium">Peran</th>
              <th className="text-left p-2 text-xs font-medium hidden sm:table-cell">Cara</th>
            </tr>
          </thead>
          <tbody>
            {content.stakeholders?.map((s: any, i: number) => (
              <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
                <td className="p-2 font-medium">{s.role}</td>
                <td className="p-2" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</td>
                <td className="p-2 hidden sm:table-cell" style={{ color: 'var(--color-text-secondary)' }}>{s.manage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="highlight-box mt-4" style={{ background: '#E6F1FB', color: '#185FA5', borderLeftColor: color }}>
        <strong>Insight:</strong> PAO yang membangun ekosistem akan menuai hasil bahkan ketika tidak sedang aktif di lapangan.
      </div>
    </>
  )
}

function Bab2Content({ content, color }: { content: any; color: string }) {
  return (
    <>
      <h3 className="section-title">Bonding vs Bridging</h3>
      <div className="point-row mb-2">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#E1F5EE', color: '#0F6E56' }}>Bn</div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-xs sm:text-sm">{content.bonding?.title}</div>
          <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{content.bonding?.desc}</div>
        </div>
      </div>
      <div className="point-row mb-4">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#FAEEDA', color: '#854F0B' }}>Br</div>
        <div className="min-w-0 flex-1">
          <div className="font-medium text-xs sm:text-sm">{content.bridging?.title}</div>
          <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{content.bridging?.desc}</div>
        </div>
      </div>

      <h3 className="section-title">Community Matrix</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {content.matrix?.map((m: any, i: number) => (
          <div key={i} className="card p-3 relative" style={{ background: m.bg, color: m.color }}>
            <div className="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: m.bar, color: 'white' }}>{m.prio}</div>
            <div className="font-medium text-sm mt-5">{m.title}</div>
            <div className="text-xs opacity-80">{m.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Gold Community</h3>
      {content.goldCriteria?.map((c: string, i: number) => (
        <div key={i} className="point-row mb-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#FAEEDA', color: '#854F0B' }}>G</div>
          <div className="text-xs sm:text-sm">{c}</div>
        </div>
      ))}

      <h3 className="section-title mt-4">Teknik Lobbying</h3>
      {content.lobbying?.map((step: any, i: number) => (
        <div key={i} className="flex gap-2 sm:gap-3 mb-3 p-2.5 sm:p-3 rounded-lg border" style={{ borderColor: 'var(--color-border-tertiary)' }}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#E1F5EE', color: '#085041' }}>{step.step}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{step.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</div>
          </div>
        </div>
      ))}
    </>
  )
}

function Bab3Content({ content, color }: { content: any; color: string }) {
  return (
    <>
      <h3 className="section-title">Sales Funnel</h3>
      <div className="space-y-1 mb-4">
        {content.funnel?.map((f: any, i: number) => (
          <div key={i} className="flex items-center gap-2 sm:gap-3">
            <div className="text-xs w-16 sm:w-20 text-right" style={{ color: 'var(--color-text-secondary)' }}>{f.stage}</div>
            <div className="flex-1 h-7 sm:h-8 rounded-lg overflow-hidden" style={{ background: 'var(--color-background-secondary)' }}>
              <div className="h-full flex items-center px-2 sm:px-3 text-xs font-medium truncate" style={{ width: `${f.pct}%`, background: f.bg, color: f.color }}>{f.label}</div>
            </div>
            <div className="text-xs w-10" style={{ color: f.highlight ? color : 'var(--color-text-secondary)', fontWeight: f.highlight ? 500 : 400 }}>{f.pct}%{f.highlight ? ' ✓' : ''}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">First Screening — Cek 3C</h3>
      {content.screening3C?.map((c: any, i: number) => (
        <div key={i} className="point-row mb-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: c.bg, color: c.color }}>{c.code}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{c.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{c.desc}</div>
          </div>
        </div>
      ))}

      <h3 className="section-title mt-4">Customer Profiling</h3>
      <div className="overflow-x-auto -mx-3 px-3">
        <table className="w-full text-xs sm:text-sm min-w-[300px]">
          <thead>
            <tr style={{ background: 'var(--color-background-secondary)' }}>
              <th className="text-left p-2 text-xs font-medium">Kriteria</th>
              <th className="text-left p-2 text-xs font-medium">Ideal</th>
              <th className="text-left p-2 text-xs font-medium hidden sm:table-cell">Red Flag</th>
            </tr>
          </thead>
          <tbody>
            {content.profiling?.map((p: any, i: number) => (
              <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
                <td className="p-2 font-medium">{p.criteria}</td>
                <td className="p-2" style={{ color: 'var(--color-text-secondary)' }}>{p.ideal}</td>
                <td className="p-2 hidden sm:table-cell" style={{ color: '#A32D2D' }}>{p.redflag}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-title mt-4">Edukasi Mitra</h3>
      {content.education?.map((e: any, i: number) => (
        <div key={i} className="flex gap-2 sm:gap-3 mb-3 p-2.5 sm:p-3 rounded-lg border" style={{ borderColor: 'var(--color-border-tertiary)' }}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#FAEEDA', color: '#854F0B' }}>{e.code}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{e.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{e.desc}</div>
          </div>
        </div>
      ))}

      <div className="highlight-box mt-4" style={{ background: '#FAEEDA', color: '#854F0B', borderLeftColor: color }}>
        <strong>Rumus:</strong> Dari 10 leads → minimal 5 lolos screening → target AF tercapai.
      </div>
    </>
  )
}

function Bab4Content({ content, color }: { content: any; color: string }) {
  return (
    <>
      <h3 className="section-title">R1 dan R3M</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
        {content.riskMetrics?.map((r: any, i: number) => (
          <div key={i} className="card p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-xs sm:text-sm">{r.label}</span>
              <span className="text-base sm:text-lg font-medium" style={{ color: r.color }}>{r.value}</span>
            </div>
            <div className="progress-bar mb-2">
              <div className="progress-fill" style={{ width: `${r.pct}%`, background: r.color }}></div>
            </div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{r.desc}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Penyebab R1 Tinggi</h3>
      {content.r1Causes?.map((c: any, i: number) => (
        <div key={i} className="point-row mb-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-xs flex-shrink-0" style={{ background: '#FCEBEB', color: '#A32D2D' }}>!</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{c.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{c.desc}</div>
          </div>
        </div>
      ))}

      <h3 className="section-title mt-4">Early Warning</h3>
      <div className="space-y-2 mb-4">
        {content.earlyWarnings?.map((w: string, i: number) => (
          <div key={i} className="flex gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border" style={{ borderColor: '#F7C1C1', background: '#FCEBEB' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></div>
            <div className="text-xs sm:text-sm" style={{ color: '#791F1F' }}>{w}</div>
          </div>
        ))}
      </div>

      <h3 className="section-title">Strategi Monitoring</h3>
      {content.strategies?.map((s: any, i: number) => (
        <div key={i} className="flex gap-2 sm:gap-3 mb-3 p-2.5 sm:p-3 rounded-lg border" style={{ borderColor: 'var(--color-border-tertiary)' }}>
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0" style={{ background: '#FBEAF0', color: '#993556' }}>{s.step}</div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-xs sm:text-sm">{s.title}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{s.desc}</div>
          </div>
        </div>
      ))}

      <div className="highlight-box mt-4" style={{ background: '#E1F5EE', color: '#0F6E56', borderLeftColor: '#1D9E75' }}>
        <strong>Shared Values:</strong> Komunitas lancar bayar = kuota meningkat bulan depan.
      </div>
      <div className="highlight-box" style={{ background: '#FBEAF0', color: '#993556', borderLeftColor: color }}>
        <strong>PAO Mature:</strong> Tidak menunggu tagihan jatuh tempo untuk mengetahui masalah.
      </div>
    </>
  )
}

function getModuleData(slug: string): Module {
  const modules: Record<string, Module> = {
    bab1: {
      id: '1',
      title: 'Positioning — Siapa Saya Sebenarnya?',
      slug: 'bab1',
      description: 'Role Identity Theory · PAO vs Sales Tradisional · Mindset Strategic Partner',
      color: '#378ADD',
      content: {
        theory: { title: 'Role Identity Theory', text: 'Ketika seseorang memahami perannya dengan jelas, ia mengambil keputusan lebih terarah. PAO yang tahu identitasnya akan jauh lebih efektif di lapangan.' },
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
      }
    },
    bab2: {
      id: '2',
      title: 'Hunting & Mapping Komunitas',
      slug: 'bab2',
      description: 'Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper Effect',
      color: '#1D9E75',
      content: {
        theory: { title: 'Social Capital Theory (Robert Putnam)', text: 'Modal sosial adalah perekat yang memungkinkan anggota masyarakat bekerja sama. PAO tidak mencari individu, melainkan mengelola jaringan kepercayaan yang sudah ada.' },
        bonding: { title: 'Bonding — Komunitas Solid (Prioritas Utama)', desc: 'RT/RW, Koperasi, Paguyuban Pedagang Pasar. Anggota sudah saling kenal dan percaya satu sama lain.', bg: '#E1F5EE', color: '#0F6E56' },
        bridging: { title: 'Bridging — Komunitas Baru', desc: 'UMKM lintas wilayah, grup media sosial. Butuh 2-3 pertemuan untuk membangun kepercayaan.', bg: '#FAEEDA', color: '#854F0B' },
        matrix: [
          { prio: 'Prioritas 1', title: 'High Potential + High Trust', desc: 'RT/RW dengan UMKM aktif.', bg: '#EAF3DE', color: '#27500A', bar: '#639922' },
          { prio: 'Prioritas 2', title: 'High Potential + Low Trust', desc: 'Komunitas besar tapi belum kenal FINATRA.', bg: '#FAEEDA', color: '#633806', bar: '#BA7517' },
          { prio: 'Prioritas 3', title: 'Low Potential + High Trust', desc: 'Komunitas kecil tapi sudah percaya.', bg: '#E6F1FB', color: '#185FA5', bar: '#378ADD' },
          { prio: 'Tunda', title: 'Low Potential + Low Trust', desc: 'Belum saatnya diinvestasikan.', bg: '#FCEBEB', color: '#791F1F', bar: '#E24B4A' }
        ],
        goldCriteria: ['Komunitas dengan perputaran uang harian', 'Ketua komunitas yang aktif dan dipercaya', 'Anggota berjumlah 20-100 orang produktif'],
        lobbying: [
          { step: 1, title: 'Pertemuan pertama: bangun kedekatan personal', desc: 'Jangan langsung bicara produk.' },
          { step: 2, title: 'Pertemuan kedua: presentasikan solusi', desc: 'Sampaikan FINATRA hadir untuk membantu.' },
          { step: 3, title: 'Jelaskan benefit konkret', desc: 'Success fee, potensi peningkatan kuota.' },
          { step: 4, title: 'Kunjungan rutin minimal 2x per bulan', desc: 'Jangan hilang setelah kerja sama berjalan.' },
          { step: 5, title: 'Input semua data ke Digital Form', desc: 'Data ini adalah aset.' }
        ]
      }
    },
    bab3: {
      id: '3',
      title: 'Lead Generation & Filtering',
      slug: 'bab3',
      description: 'AIDA Model · Sales Funnel · First Screening · Customer Profiling',
      color: '#BA7517',
      content: {
        theory: { title: 'Sales Funnel & AIDA Model', text: 'Setiap tahap funnel menyaring prospek. Semakin baik kualitas input di bagian atas, semakin tinggi konversi di bawah.' },
        funnel: [
          { stage: 'Awareness', pct: 100, label: 'Sosialisasi', bg: '#E6F1FB', color: '#185FA5' },
          { stage: 'Interest', pct: 80, label: 'Leads masuk', bg: '#FAEEDA', color: '#854F0B' },
          { stage: 'Decision', pct: 50, label: 'Lolos screening', bg: '#F0997B', color: '#993C1D', highlight: true },
          { stage: 'Action', pct: 35, label: 'Cair', bg: '#C0DD97', color: '#3B6D11' }
        ],
        screening3C: [
          { code: 'C1', title: 'Character', desc: 'Dikenal baik? Amanah?', bg: '#E6F1FB', color: '#185FA5' },
          { code: 'C2', title: 'Capacity', desc: 'UMKM aktif? Cashflow nyata?', bg: '#EAF3DE', color: '#3B6D11' },
          { code: 'C3', title: 'Capital', desc: 'Tujuan produktif?', bg: '#FAEEDA', color: '#854F0B' }
        ],
        profiling: [
          { criteria: 'Jenis usaha', ideal: 'UMKM aktif, min. 6 bulan', redflag: 'Usaha baru' },
          { criteria: 'Penghasilan', ideal: 'Rutin, bisa dibuktikan', redflag: 'Tidak teratur' },
          { criteria: 'Reputasi', ideal: 'Dikenal baik', redflag: 'Diragukan' },
          { criteria: 'Tujuan', ideal: 'Modal usaha', redflag: 'Konsumsi' },
          { criteria: 'Riwayat', ideal: 'Tidak ada tunggak', redflag: 'Kredit macet' }
        ],
        education: [
          { code: 'A', title: 'Ajarkan kriteria nasabah layak', desc: 'Sampaikan secara sederhana.' },
          { code: 'B', title: 'Berikan feedback', desc: 'Informasikan hasil screening.' },
          { code: 'C', title: 'Follow-up 24 jam', desc: 'Kecepatan adalah keunggulan.' }
        ]
      }
    },
    bab4: {
      id: '4',
      title: 'Menjaga Kualitas Portofolio',
      slug: 'bab4',
      description: 'Relationship Marketing · R1 5% · R3M 25% · Early Warning System',
      color: '#D4537E',
      content: {
        theory: { title: 'Relationship Marketing', text: 'Hubungan bisnis yang sukses dibangun di atas Trust dan Commitment.' },
        riskMetrics: [
          { label: 'R1 — Bulan Pertama', value: 'Maks. 5%', pct: 5, color: '#BA7517', desc: 'Nasabah menunggak = sinyal serius.' },
          { label: 'R3M — Bulan Ketiga', value: 'Maks. 25%', pct: 25, color: '#D4537E', desc: 'Masalah usaha atau kebiasaan buruk.' }
        ],
        r1Causes: [
          { title: 'Salah identifikasi karakter', desc: 'Tanpa track record baik.' },
          { title: 'Pinjaman untuk konsumtif', desc: 'Tidak ada return.' },
          { title: 'Over-credit', desc: 'Cicilan terlalu besar.' }
        ],
        earlyWarnings: ['Usaha tidak konsisten', 'Reputasi diragukan', 'Tujuan tidak produktif', 'Terlalu antusias tanpa detail'],
        strategies: [
          { step: 1, title: 'Bangun Shared Values', desc: 'Lancar bayar = kuota meningkat.' },
          { step: 2, title: 'Jadikan Ketua early warning', desc: 'Minta informasi jika lesu.' },
          { step: 3, title: 'Kunjungan check-in', desc: 'Terutama bulan 1 dan 3.' },
          { step: 4, title: 'Gunakan kontrol sosial', desc: 'Tekanan sosial sangat kuat.' }
        ]
      }
    }
  }
  return modules[slug] || modules['bab1']
}
