'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Target, Users, CheckCircle, ChevronRight, Award, BookOpen, MoreVertical } from 'lucide-react'

interface Module {
  id: string
  title: string
  slug: string
  description: string
  order: number
  color: string
}

export default function Home() {
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [participant, setParticipant] = useState<{id: string, nama: string} | null>(null)
  const [formData, setFormData] = useState({ nama: '', cabang: '', email: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [progress, setProgress] = useState(0)
  const [showDebug, setShowDebug] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pao_participant')
    if (saved) {
      const p = JSON.parse(saved)
      setParticipant(p)
      fetchProgress(p.id)
    }
    
    // Fetch modules
    fetch('/api/modules')
      .then(res => res.json())
      .then(data => {
        if (data.success) setModules(data.data)
      })
      .catch(() => {
        setModules([
          { id: '1', title: 'Positioning — Siapa Saya Sebenarnya?', slug: 'bab1', description: 'Role Identity Theory · PAO vs Sales Tradisional · Mindset Strategic Partner', order: 1, color: '#378ADD' },
          { id: '2', title: 'Hunting & Mapping Komunitas', slug: 'bab2', description: 'Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper Effect', order: 2, color: '#1D9E75' },
          { id: '3', title: 'Lead Generation & Filtering', slug: 'bab3', description: 'AIDA Model · Sales Funnel · First Screening · Customer Profiling', order: 3, color: '#BA7517' },
          { id: '4', title: 'Menjaga Kualitas Portofolio', slug: 'bab4', description: 'Relationship Marketing · R1 5% · R3M 25% · Early Warning System', order: 4, color: '#D4537E' },
        ])
      })
  }, [])

  const fetchProgress = async (participantId: string) => {
    try {
      const res = await fetch(`/api/progress?participantId=${participantId}`)
      const data = await res.json()
      if (data.success && data.data) {
        setProgress(data.data.percent)
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nama || !formData.cabang) return
    
    setSubmitError('')
    setIsLoading(true)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      })
      const data = await res.json().catch(() => null)
      
      if (!res.ok || !data?.success) {
        setSubmitError(data?.error || 'Pendaftaran gagal. Coba lagi.')
        return
      }

      if (data.success) {
        localStorage.setItem('pao_participant', JSON.stringify(data.data))
        setParticipant(data.data)
      }
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        setSubmitError('Koneksi terlalu lama. Periksa internet lalu coba lagi.')
      } else {
        setSubmitError('Terjadi kesalahan koneksi. Coba lagi.')
      }
      console.error('Error registering:', error)
    } finally {
      clearTimeout(timeoutId)
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    localStorage.removeItem('pao_participant')
    setParticipant(null)
    setProgress(0)
  }

  // Hidden admin access: triple click on the logo
  const handleLogoClick = (e: React.MouseEvent) => {
    if ((e as any).detail === 3) {
      setShowDebug(!showDebug)
    }
  }

  const kpiData = [
    { label: 'AF Partnership', value: 'Rp 300 Jt', desc: 'Target pencairan', color: '#378ADD' },
    { label: 'Komunitas Aktif', value: '35%', desc: 'Kirim leads/bulan', color: '#1D9E75' },
    { label: 'Leads to Order', value: '50%', desc: '5 dari 10 layak', color: '#BA7517' },
    { label: 'R1 / R3M', value: '5% / 25%', desc: 'Batas tunggak', color: '#D4537E' },
  ]

  return (
    <main className="mobile-container pb-24">
      {/* Hero Section */}
      <div 
        className="rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 cursor-pointer select-none"
        style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)' }}
        onClick={handleLogoClick}
      >
        <div className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          FINATRA · Modul Pelatihan Resmi PAO
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-medium mb-2 leading-tight">
          Strategic Partnership<br />Account Officer
        </h1>
        <p className="text-xs sm:text-sm mb-3 leading-relaxed" style={{ color: 'var(--var(--color-text-secondary)' }}>
          Panduan lengkap berbasis KPI untuk PAO FINATRA — mulai membangun komunitas, mengelola leads, hingga menjaga kualitas portofolio.
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="badge text-xs" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>4 Bab Materi</span>
          <span className="badge text-xs" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>5 Soal Post-Test</span>
          <span className="badge text-xs hidden sm:inline" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>Sertifikat Digital</span>
        </div>

        {/* Hidden admin button - only shows after triple click */}
        {showDebug && (
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); router.push('/admin/login') }}
                className="text-xs px-3 py-1.5 rounded border"
                style={{ borderColor: 'var(--color-border-secondary)' }}
              >
                🔒 Admin Panel
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowDebug(false) }}
                className="text-xs px-3 py-1.5 rounded border"
                style={{ borderColor: 'var(--color-border-secondary)' }}
              >
                Tutup
              </button>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
              Tip: Triple-click header untuk toggle menu ini
            </p>
          </div>
        )}
      </div>

      {/* KPI Grid */}
      <div className="mobile-grid-4 mb-4 sm:mb-6">
        {kpiData.map((kpi, i) => (
          <div key={i} className="card p-2.5 sm:p-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: kpi.color }}></div>
            <div className="text-xs mt-1.5 sm:mt-2" style={{ color: 'var(--color-text-secondary)' }}>{kpi.label}</div>
            <div className="text-base sm:text-lg font-medium">{kpi.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{kpi.desc}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar if registered */}
      {participant && (
        <div className="card p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress Belajar</span>
            <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%`, background: '#378ADD' }}></div>
          </div>
        </div>
      )}

      {/* Registration Form or Welcome */}
      {!participant ? (
        <div className="card p-4 sm:p-5 mb-4 sm:mb-6">
          <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 flex items-center gap-2">
            <Users size={18} />
            Daftar untuk Memulai
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="text-xs sm:text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Nama Lengkap *</label>
              <input
                type="text"
                className="input"
                placeholder="Masukkan nama lengkap"
                value={formData.nama}
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Cabang/Area Kerja *</label>
              <input
                type="text"
                className="input"
                placeholder="Contoh: Bogor, Depok, Jakarta"
                value={formData.cabang}
                onChange={(e) => setFormData({...formData, cabang: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-xs sm:text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Email (opsional)</label>
              <input
                type="email"
                className="input"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary w-full touch-target" disabled={isLoading}>
              {isLoading ? 'Mendaftar...' : 'Mulai Belajar'}
            </button>
            {submitError && (
              <p className="text-xs sm:text-sm" style={{ color: '#c2410c' }}>
                {submitError}
              </p>
            )}
          </form>
        </div>
      ) : (
        <div className="card p-4 sm:p-5 mb-4 sm:mb-6" style={{ background: '#eaf3de', borderColor: '#9fe1cb' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#1D9E75', color: 'white' }}>
              <CheckCircle size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm sm:text-base truncate">Selamat Datang, {participant.nama}!</div>
              <div className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary)' }}>Siap memulai pelatihan?</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button onClick={() => router.push('/quiz')} className="btn-primary flex-1 touch-target">
              {progress === 100 ? 'Kerjakan Post-Test' : 'Lanjutkan Belajar'}
            </button>
            <button onClick={handleReset} className="btn-secondary touch-target text-sm">
              Ganti Akun
            </button>
          </div>
        </div>
      )}

      {/* Modules List */}
      <h2 className="section-title">Struktur Modul</h2>
      <div className="space-y-2 mb-4 sm:mb-6">
        {modules.map((mod, index) => (
          <div
            key={mod.id}
            onClick={() => participant && router.push(`/bab/${mod.slug}`)}
            className={`point-row ${!participant ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <div 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium flex-shrink-0"
              style={{ background: mod.color + '20', color: mod.color }}
            >
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm leading-tight">{mod.title}</div>
              <div className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-text-secondary)' }}>{mod.description}</div>
            </div>
            {participant && <ChevronRight size={16} className="flex-shrink-0" style={{ color: 'var(--color-text-secondary)' }} />}
          </div>
        ))}
      </div>

      {/* Key Takeaway */}
      <div className="rounded-xl p-4 sm:p-6 text-center" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)' }}>
        <div className="section-title mb-2 sm:mb-3">Key Takeaway</div>
        <p className="text-sm sm:text-base italic leading-relaxed mb-2" style={{ color: 'var(--color-text-primary)' }}>
          &ldquo;Seorang PAO bukan sekadar &apos;tukang cari data&apos;, melainkan seorang Account Manager yang mengelola portofolio bisnis melalui kekuatan komunitas.&rdquo;
        </p>
        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Modul PAO FINATRA</div>
      </div>

      {/* Footer spacer for mobile */}
      <div className="h-8 sm:h-0"></div>
    </main>
  )
}
