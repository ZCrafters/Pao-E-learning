'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Target, Users, CheckCircle, ChevronRight, Award } from 'lucide-react'

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
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check for existing participant
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
        // Fallback to static modules if API fails
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
    
    setIsLoading(true)
    try {
      const res = await fetch('/api/participants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      
      if (data.success) {
        localStorage.setItem('pao_participant', JSON.stringify(data.data))
        setParticipant(data.data)
      }
    } catch (error) {
      console.error('Error registering:', error)
    }
    setIsLoading(false)
  }

  const handleReset = () => {
    localStorage.removeItem('pao_participant')
    setParticipant(null)
    setProgress(0)
  }

  const kpiData = [
    { label: 'AF Partnership', value: 'Rp 300 Jt', desc: 'Target pencairan bulanan', color: '#378ADD' },
    { label: 'Komunitas Aktif', value: '35%', desc: 'Rutin kirim leads/bulan', color: '#1D9E75' },
    { label: 'Leads to Order', value: '50%', desc: '5 dari 10 leads layak', color: '#BA7517' },
    { label: 'R1 / R3M', value: '5% / 25%', desc: 'Batas tunggak maks.', color: '#D4537E' },
  ]

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 pb-16">
      {/* Hero Section */}
      <div className="rounded-xl p-6 mb-6" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)' }}>
        <div className="text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          FINATRA · Modul Pelatihan Resmi PAO
        </div>
        <h1 className="text-2xl font-medium mb-2" style={{ color: 'var(--color-text-primary)' }}>
          Strategic Partnership<br />Account Officer
        </h1>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          Panduan lengkap berbasis KPI untuk PAO FINATRA — mulai membangun komunitas, mengelola leads, hingga menjaga kualitas portofolio secara berkelanjutan.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="badge" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>4 Bab Materi</span>
          <span className="badge" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>5 Soal Post-Test</span>
          <span className="badge" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-secondary)' }}>Sertifikat Digital</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {kpiData.map((kpi, i) => (
          <div key={i} className="card p-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: kpi.color }}></div>
            <div className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>{kpi.label}</div>
            <div className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{kpi.desc}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar if registered */}
      {participant && (
        <div className="card p-4 mb-6">
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
        <div className="card p-5 mb-6">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users size={20} />
            Daftar untuk Memulai
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Nama Lengkap *</label>
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
              <label className="text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Cabang/Area Kerja *</label>
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
              <label className="text-sm mb-1 block" style={{ color: 'var(--color-text-secondary)' }}>Email (opsional)</label>
              <input
                type="email"
                className="input"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Mendaftar...' : 'Mulai Belajar'}
            </button>
          </form>
        </div>
      ) : (
        <div className="card p-5 mb-6" style={{ background: '#eaf3de', borderColor: '#9fe1cb' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#1D9E75', color: 'white' }}>
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="font-medium">Selamat Datang, {participant.nama}!</div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Siap memulai pelatihan?</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => router.push('/quiz')} className="btn-primary flex-1">
              {progress === 100 ? 'Kerjakan Post-Test' : 'Lanjutkan Belajar'}
            </button>
            <button onClick={handleReset} className="btn-secondary">
              Ganti Akun
            </button>
          </div>
        </div>
      )}

      {/* Modules List */}
      <h2 className="section-title">Struktur Modul</h2>
      <div className="space-y-2 mb-6">
        {modules.map((mod, index) => (
          <div
            key={mod.id}
            onClick={() => participant && router.push(`/bab/${mod.slug}`)}
            className={`point-row ${!participant ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium flex-shrink-0"
              style={{ background: mod.color + '20', color: mod.color }}
            >
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{mod.title}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{mod.description}</div>
            </div>
            {participant && <ChevronRight size={16} style={{ color: 'var(--color-text-secondary)' }} />}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {participant && (
        <>
          <h2 className="section-title">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={() => router.push('/quiz')} className="card card-hover p-4 text-center">
              <Award size={24} className="mx-auto mb-2" style={{ color: '#BA7517' }} />
              <div className="text-sm font-medium">Post-Test</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>5 Soal</div>
            </button>
            <button onClick={() => router.push('/admin')} className="card card-hover p-4 text-center">
              <Target size={24} className="mx-auto mb-2" style={{ color: '#378ADD' }} />
              <div className="text-sm font-medium">Admin</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Dashboard</div>
            </button>
          </div>
        </>
      )}

      {/* Key Takeaway */}
      <div className="rounded-xl p-6 text-center" style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)' }}>
        <div className="section-title mb-3">Key Takeaway</div>
        <p className="text-base italic leading-relaxed mb-2" style={{ color: 'var(--color-text-primary)' }}>
          "Seorang PAO bukan sekadar 'tukang cari data', melainkan seorang Account Manager yang mengelola portofolio bisnis melalui kekuatan komunitas."
        </p>
        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Modul PAO FINATRA</div>
      </div>
    </main>
  )
}
