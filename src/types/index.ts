export interface Question {
  id: number
  text: string
  reversed: boolean
}

export interface Subscale {
  name: string
  itemIds: number[]
}

export interface Exam {
  id: string
  name: string
  questions: Question[]
  subscales: Subscale[]
  reversedItems: number[]
  scaleMax: number
  excludeFromTotal?: string[]
}

export interface ExamResult {
  examId: string
  completedAt: string
  answers: Record<number, number>
  subscaleScores: Record<string, number>
  totalScore: number
}
