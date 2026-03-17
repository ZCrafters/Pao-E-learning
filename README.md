# PAO FINATRA E-Learning Platform

Platform pelatihan online untuk Partnership Account Officer (PAO) FINATRA dengan fitur lengkap: modul pembelajaran, quiz interaktif, progress tracking, dan admin dashboard.

## 🚀 Fitur Utama

### Untuk Peserta
- **4 Modul Pembelajaran** (Bab 1-4) dengan konten lengkap
- **Progress Tracking** - lacak kemajuan belajar
- **Post-Test Interaktif** (5 soal) dengan feedback langsung
- **Sertifikasi Digital** - status LULUS/REMEDIAL

### Untuk Admin
- **Dashboard Statistik** - overview pelatihan real-time
- **Export Excel** - download hasil pelatihan dalam format .xlsx
- **Monitoring Peserta** - lihat progress dan hasil quiz per peserta

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** SQLite + Prisma ORM
- **Styling:** Tailwind CSS
- **Export:** xlsx (Excel)

## 📁 Struktur Project

```
pao-elearning/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data (4 modules + 5 questions)
├── src/
│   ├── app/
│   │   ├── api/         # Backend API routes
│   │   │   ├── participants/  # CRUD peserta
│   │   │   ├── quiz/          # Get questions & Submit answers
│   │   │   ├── progress/      # Track learning progress
│   │   │   ├── admin/         # Dashboard stats
│   │   │   └── admin/export/  # Export to Excel
│   │   ├── bab/[slug]/  # Module pages (Bab 1-4)
│   │   ├── quiz/        # Quiz page
│   │   ├── admin/       # Admin dashboard
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   ├── components/      # React components
│   └── lib/
│       └── prisma.ts    # Database client
├── .env                 # Environment variables
└── next.config.mjs      # Next.js config
```

## 🚀 Deployment

### Option 1: Deploy ke Vercel (Recommended)

1. **Push ke GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/pao-elearning.git
git push -u origin main
```

2. **Deploy ke Vercel:**
- Buka [vercel.com](https://vercel.com)
- Import project dari GitHub
- Environment variables sudah diatur di `.env`
- Deploy!

3. **Setup Database:**
```bash
# Setelah deploy, jalankan di local:
npx prisma migrate dev
npm run seed
```

### Option 2: Deploy ke VPS/Server

1. **Build project:**
```bash
npm run build
```

2. **Upload ke server:**
```bash
# Upload folder `dist` ke server
# Pastikan Node.js 18+ terinstall
```

3. **Setup production:**
```bash
npm install --production
npx prisma generate
npx prisma migrate deploy
npm start
```

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/participants` | POST | Register new participant |
| `/api/participants` | GET | Get all participants |
| `/api/quiz` | GET | Get quiz questions |
| `/api/quiz` | POST | Submit quiz answers |
| `/api/progress` | POST | Update module progress |
| `/api/progress` | GET | Get participant progress |
| `/api/admin` | GET | Get dashboard stats |
| `/api/admin/export` | GET | Export to Excel |

## 💾 Database Schema

```prisma
Participant {
  id, nama, cabang, email, createdAt
  results: QuizResult[]
  progress: Progress
}

Module {
  id, title, slug, description, content, order, color
  questions: Question[]
}

Question {
  id, moduleId, question, options, correct, explanation, order
}

QuizResult {
  id, participantId, score, total, percentage, answers, status
}

Progress {
  id, participantId, modulesRead, percent
}
```

## 📝 Development

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npm run seed

# Run dev server
npm run dev

# Open http://localhost:3000
```

## 🎨 Design System

Platform menggunakan design system yang konsisten:
- **Primary Colors:** Blue (#378ADD), Green (#1D9E75), Orange (#BA7517), Pink (#D4537E)
- **Typography:** System UI font stack
- **Spacing:** Consistent 4px/8px grid
- **Components:** Cards, Buttons, Progress bars, Tables

## 🔒 Environment Variables

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 📱 Mobile Responsive

Platform fully responsive dan optimized untuk mobile learning.

## 📄 License

Internal Use - FINATRA PAO Training Module
