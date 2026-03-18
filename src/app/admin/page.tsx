'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Award, TrendingUp, Download, ChevronLeft, FileSpreadsheet, BarChart3, LogOut, RefreshCw } from 'lucide-react'

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

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/admin/login')
  }

  const handleExport = async () => {
    try {
      const res = await fetch('/api/admin/export')
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `hasil-pelatihan-pao-${new Date().toISOString().split('T')[0]}.xlsx`
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
      <main className="mobile-container">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <RefreshCw size={32} className="animate-spin mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Memuat data...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="mobile-container pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-1 text-xs sm:text-sm mb-2 hover:opacity-70"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <ChevronLeft size={14} />
            Kembali
          </button>
          <h1 className="mobile-title">Admin Dashboard</h1>
          <p className="mobile-subtitle" style={{ color: 'var(--color-text-secondary)' }}>Monitoring pelatihan PAO FINATRA</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleExport} 
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export Excel</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button 
            onClick={handleLogout}
            className="btn-secondary flex items-center gap-2 text-sm"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-1">
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
          <div className="mobile-grid-4 mb-4">
            <div className="card p-3 text-center">
              <Users size={20} className="mx-auto mb-1" style={{ color: '#378ADD' }} />
              <div className="text-lg sm:text-xl font-medium">{stats.totalParticipants}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Total Peserta</div>
            </div>
            <div className="card p-3 text-center">
              <Award size={20} className="mx-auto mb-1" style={{ color: '#1D9E75' }} />
              <div className="text-lg sm:text-xl font-medium">{stats.totalResults}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Sudah Quiz</div>
            </div>
            <div className="card p-3 text-center">
              <TrendingUp size={20} className="mx-auto mb-1" style={{ color: '#BA7517' }} />
              <div className="text-lg sm:text-xl font-medium">{stats.passRate}%</div>
              <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Kelulusan</div>
            </div>
            <div className="card p-3 text-center">
              <FileSpreadsheet size={20} className="mx-auto mb-1" style={{ color: '#D4537E' }} />
              <div className="text-lg sm:text-xl font-medium">{stats.averageScore}</div>
              <div className="text-xs" style={{ color: 'var(--var(--color-text-secondary)' }}>Rata-rata</div>
            </div>
          </div>

          {/* Pass Rate Chart */}
          <div className="card p-4 mb-4">
            <h3 className="section-title">Distribusi Kelulusan</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lulus</span>
                  <span className="font-medium">{stats.passedCount} orang ({stats.passRate}%)</span>
                </div>
                <div className="progress-bar h-2.5">
                  <div className="progress-fill bg-green-500" style={{ width: `${stats.passRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Remedial</span>
                  <span className="font-medium">{stats.totalResults - stats.passedCount} orang ({100 - stats.passRate}%)</span>
                </div>
                <div className="progress-bar h-2.5">
                  <div className="progress-fill bg-red-500" style={{ width: `${100 - stats.passRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'participants' && (
        <div className="card overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr style={{ background: 'var(--color-background-secondary)' }}>
                <th className="text-left p-2 sm:p-3 font-medium">Nama</th>
                <th className="text-left p-2 sm:p-3 font-medium">Cabang</th>
                <th className="text-left p-2 sm:p-3 font-medium hidden sm:table-cell">Progress</th>
                <th className="text-left p-2 sm:p-3 font-medium">Status</th>
                <th className="text-left p-2 sm:p-3 font-medium">Skor</th>
              </tr>
            </thead>
            <tbody>
              {participants.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center" style={{ color: 'var(--color-text-secondary)' }}>
                    Belum ada peserta
                  </td>
                </tr>
              ) : (
                participants.map((p) => (
                  <tr key={p.id} className="border-t" style={{ borderColor: 'var(--color-border-tertiary)' }}>
                    <td className="p-2 sm:p-3 font-medium">{p.nama}</td>
                    <td className="p-2 sm:p-3" style={{ color: 'var(--color-text-secondary)' }}>{p.cabang}</td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-12 sm:w-16 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-background-secondary)' }}>
                          <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.progress?.percent || 0}%` }}></div>
                        </div>
                        <span className="text-xs">{p.progress?.percent || 0}%</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-3">
                      {p.results.length > 0 ? (
                        <span className={`badge text-xs ${p.results[0].status === 'LULUS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {p.results[0].status}
                        </span>
                      ) : (
                        <span className="badge text-xs" style={{ background: 'var(--color-background-secondary)' }}>Belum</span>
                      )}
                    </td>
                    <td className="p-2 sm:p-3">
                      {p.results.length > 0 ? (
                        <span className="font-medium">{Math.round(p.results[0].percentage)}%</span>
                      ) : (
                        <span style={{ color: 'var(--color-text-secondary)' }}>-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
