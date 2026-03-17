import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PAO FINATRA - Modul Pelatihan',
  description: 'Pelatihan Strategic Partnership Account Officer FINATRA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}
