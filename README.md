# PAO FINATRA E-Learning Platform

Platform pelatihan online untuk Partnership Account Officer (PAO) FINATRA dengan fitur lengkap: modul pembelajaran, quiz interaktif, dan progress tracking.

## 🚀 Fitur Utama

### Untuk Peserta
- **4 Modul Pembelajaran** (Bab 1-4) dengan konten lengkap
- **Progress Tracking** - lacak kemajuan belajar
- **Post-Test Interaktif** (5 soal) dengan feedback langsung
- **Sertifikasi Digital** - status LULUS/REMEDIAL

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Data Storage:** In-memory API state + browser localStorage
- **Styling:** Tailwind CSS

## 📁 Struktur Project

```
pao-elearning/
├── src/
│   ├── app/
│   │   ├── api/         # Backend API routes
│   │   │   ├── participants/  # CRUD peserta
│   │   │   ├── quiz/          # Get questions & Submit answers
│   │   │   ├── progress/      # Track learning progress
│   │   ├── bab/[slug]/  # Module pages (Bab 1-4)
│   │   ├── quiz/        # Quiz page
│   │   ├── page.tsx     # Home page
│   │   ├── layout.tsx   # Root layout
│   │   └── globals.css  # Global styles
│   └── components/      # React components
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
- Tambahkan Environment Variables di Vercel Project Settings:
  - `NEXTAUTH_SECRET` (gunakan secret acak untuk production)
  - `NEXTAUTH_URL` (contoh: `https://your-app.vercel.app`)
- Deploy!

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

## 💾 Data Storage

Data peserta/progress disimpan dalam state API runtime dan browser localStorage. Data ini tidak menggunakan database eksternal.

## 📝 Development

```bash
# Install dependencies
npm install

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

Copy `.env.example` menjadi `.env`, lalu sesuaikan nilainya:

```bash
cp .env.example .env
```

## 📱 Mobile Responsive

Platform fully responsive dan optimized untuk mobile learning.

## 📄 License

Internal Use - FINATRA PAO Training Module
