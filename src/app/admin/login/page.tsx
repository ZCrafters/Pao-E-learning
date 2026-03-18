'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Password salah!')
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi. Coba lagi.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-background-secondary)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#1a1a1a' }}>
            <Shield size={32} style={{ color: 'white' }} />
          </div>
          <h1 className="text-xl font-medium mb-1">Admin Panel</h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>PAO FINATRA E-Learning</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-sm mb-2 block" style={{ color: 'var(--color-text-secondary)' }}>
                Password Admin
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-secondary)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10"
                  placeholder="Masukkan password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#fcebeb', color: '#791f1f' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Memeriksa...</span>
              ) : (
                <>
                  <Lock size={18} />
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="text-sm hover:underline"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            ← Kembali ke halaman utama
          </button>
        </div>

        <div className="text-center mt-8 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          <p>Default password: <code className="bg-gray-200 px-2 py-1 rounded">finatra123</code></p>
          <p className="mt-1">Ganti di .env file: ADMIN_PASSWORD</p>
        </div>
      </div>
    </main>
  )
}
