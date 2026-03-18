import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const modules = [
  {
    id: '1',
    title: 'Positioning — Siapa Saya Sebenarnya?',
    slug: 'bab1',
    description: 'Role Identity Theory · PAO vs Sales Tradisional · Mindset Strategic Partner',
    order: 1,
    color: '#378ADD',
  },
  {
    id: '2',
    title: 'Hunting & Mapping Komunitas',
    slug: 'bab2',
    description: 'Social Capital Theory · Bonding vs Bridging · Community Matrix · Gatekeeper Effect',
    order: 2,
    color: '#1D9E75',
  },
  {
    id: '3',
    title: 'Lead Generation & Filtering',
    slug: 'bab3',
    description: 'AIDA Model · Sales Funnel · First Screening · Customer Profiling',
    order: 3,
    color: '#BA7517',
  },
  {
    id: '4',
    title: 'Menjaga Kualitas Portofolio',
    slug: 'bab4',
    description: 'Relationship Marketing · R1 5% · R3M 25% · Early Warning System',
    order: 4,
    color: '#D4537E',
  },
]

export async function GET() {
  return NextResponse.json({ success: true, data: modules })
}
