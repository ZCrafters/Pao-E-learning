// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Participant {
  id: string
  nama: string
  cabang: string
  email: string | null
  createdAt: string
  updatedAt: string
  results: QuizResult[]
  progress: Progress | null
}

export interface Module {
  id: string
  title: string
  slug: string
  description: string
  order: number
  color: string
  content: ModuleContent
  createdAt: string
  updatedAt: string
}

export interface ModuleContent {
  theory?: {
    title: string
    text: string
  }
  identities?: Identity[]
  comparison?: {
    traditional: string[]
    pao: string[]
  }
  mindset?: Mindset[]
  stakeholders?: Stakeholder[]
  bonding?: BondingInfo
  bridging?: BridgingInfo
  matrix?: MatrixItem[]
  goldCriteria?: string[]
  lobbying?: LobbyingStep[]
  funnel?: FunnelStage[]
  screening3C?: Screening3C[]
  profiling?: ProfilingItem[]
  education?: EducationItem[]
  riskMetrics?: RiskMetric[]
  r1Causes?: RiskCause[]
  earlyWarnings?: string[]
  strategies?: Strategy[]
}

export interface Identity {
  code: string
  title: string
  desc: string
  bg: string
  color: string
}

export interface Mindset {
  type: 'wrong' | 'correct'
  title: string
  desc: string
}

export interface Stakeholder {
  role: string
  desc: string
  manage: string
}

export interface BondingInfo {
  title: string
  desc: string
  bg: string
  color: string
}

export interface BridgingInfo {
  title: string
  desc: string
  bg: string
  color: string
}

export interface MatrixItem {
  prio: string
  title: string
  desc: string
  bg: string
  color: string
  bar: string
}

export interface LobbyingStep {
  step: number
  title: string
  desc: string
}

export interface FunnelStage {
  stage: string
  pct: number
  label: string
  bg: string
  color: string
  highlight?: boolean
}

export interface Screening3C {
  code: string
  title: string
  desc: string
  bg: string
  color: string
}

export interface ProfilingItem {
  criteria: string
  ideal: string
  redflag: string
}

export interface EducationItem {
  code: string
  title: string
  desc: string
}

export interface RiskMetric {
  label: string
  value: string
  pct: number
  color: string
  desc: string
}

export interface RiskCause {
  title: string
  desc: string
}

export interface Strategy {
  step: number
  title: string
  desc: string
}

export interface Question {
  id: string
  question: string
  options: string[]
  correct: string
  explanation: string
  order: number
  moduleId: string
}

export interface QuizResult {
  id: string
  participantId: string
  score: number
  total: number
  percentage: number
  answers: string // JSON
  status: 'LULUS' | 'REMEDIAL'
  createdAt: string
}

export interface Progress {
  id: string
  participantId: string
  modulesRead: string // JSON array
  percent: number
  updatedAt: string
}

export interface AdminStats {
  totalParticipants: number
  totalResults: number
  passedCount: number
  passRate: number
  averageScore: number
}

export interface KPIItem {
  label: string
  value: string
  desc: string
  color: string
}

export type AnswerMap = Record<string, string>
