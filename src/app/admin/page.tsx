'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Award, TrendingUp, Download, ChevronLeft, FileSpreadsheet, BarChart3 } from 'lucide-react'

interface Stats {
  totalParticipants: number
  totalResults: number
  passedCount: number
  passRate: number
  averageScore: number
}

interface Participant {
  id: string
  nama: string
  cabang: string
  email: string | null
  createdAt: string
  results: any[]
  progress: { percent: number } | null
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'participants'>('overview')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin')
      const data = await res.json()
      if (data.success) {
        setStats(data.data.stats)
        setParticipants(data.data.recentParticipants)
      }
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'hasil-pelatihan-pao.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error exporting:', error)
    }
  }

  if (isLoading) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center py-12">Memuat...</div>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 pb-16">
      <button onClick={() => router.push('/')} className="flex items-center gap-1 text-sm mb-4 hover:opacity-70" style={{ color: 'var(--color-text-secondary)' }}>
        <ChevronLeft size={16} />
        Kembali ke Beranda
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium">Admin Dashboard</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Monitoring pelatihan PAO FINATRA</p>
        </div>
        <button onClick={handleExport} className="btn-primary flex items-center gap-2">
          <Download size={16} />
          Export Excel
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
        >
          <BarChart3 size={14} className="inline mr-1" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab('participants')}
          className={`nav-btn ${activeTab === 'participants' ? 'active' : ''}`}
        >
          <Users size={14} className="inline mr-1" />
          Peserta
        </button>
      </div>

      {activeTab === 'overview' && stats && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="card p-4 text-center">
              <Users size={24} className="mx-auto mb-2" style={{ color: '#378ADD' }} />
              <div className="text-2xl font-medium">{stats.totalParticipants}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Total Peserta</div>
            </div>
            <div className="card p-4 text-center">
              <Award size={24} className="mx-auto mb-2" style={{ color: '#1D9E75' }} />
              <div className="text-2xl font-medium">{stats.totalResults}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Sudah Quiz</div>
            </div>
            <div className="card p-4 text-center">
              <TrendingUp size={24} className="mx-auto mb-2" style={{ color: '#BA7517' }} />
              <div className="text-2xl font-medium">{stats.passRate}%</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Tingkat Kelulusan</div>
            </div>
            <div className="card p-4 text-center">
              <FileSpreadsheet size={24} className="mx-auto mb-2" style={{ color: '#D4537E' }} />
              <div className="text-2xl font-medium">{stats.averageScore}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Rata-rata Skor</div>
            </div>
          </div>

          {/* Pass Rate Chart */}
          <div className="card p-5 mb-6">
            <h3 className="section-title">Distribusi Kelulusan</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Lulus</span>
                  <span>{stats.passedCount} orang</span>
                </div>
                <div className="progress-bar h-3">
                  <div className="progress-fill bg-green-500" style={{ width: `${stats.passRate}%` }}></div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>Remedial</span>
                  <span>{stats.totalResults - stats.passedCount} orang</span>
                </div>
                <div className="progress-bar h-3">
                  <div className="progress-fill bg-red-500" style={{ width: `${100 - stats.passRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'participants' && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-background-secondary)' }}>
                <th className="text-left p-3 text-xs font-medium">Nama</th>
                <th className="text-left p-3 text-xs font-medium">Cabang</th>
                <th className="text-left p-3 text-xs font-medium">Progress</th>
                <th className="text-left p-3 text-xs font-medium">Status Quiz</th>
                <th className="text-left p-3 text-xs font-medium">Skor</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => (
                <tr key={p.id} className="border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
                  <td className="p-3 font-medium">{p.nama}</td>
                  <td className="p-3" style={{ color: 'var(--color-text-secondary)' }}>{p.cabang}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-background-secondary)' }}>
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.progress?.percent || 0}%` }}></div>
                      </div>
                      <span className="text-xs">{p.progress?.percent || 0}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    {p.results.length > 0 ? (
                      <span className={`badge ${p.results[0].status === 'LULUS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.results[0].status}
                      </span>
                    ) : (
                      <span className="badge" style={{ background: 'var(--color-background-secondary)' }}>Belum</span>
                    )}
                  </td>
                  <td className="p-3">
                    {p.results.length > 0 ? (
                      <span className="font-medium">{Math.round(p.results[0].percentage)}%</span>
                    ) : (
                      <span style={{ color: 'var(--color-text-secondary)' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
