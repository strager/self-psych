import type { ExamResult } from '../types'

const STORAGE_KEY = 'psych-exam-results'

export function saveResult(result: ExamResult): void {
  const results = getResults()
  results.push(result)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
}

export function getResults(): ExamResult[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  return JSON.parse(data) as ExamResult[]
}

export function getResultsByExam(examId: string): ExamResult[] {
  return getResults().filter(r => r.examId === examId)
}

export function updateLastResult(result: ExamResult): void {
  const results = getResults()
  for (let i = results.length - 1; i >= 0; i--) {
    const existing = results[i]
    if (existing && existing.examId === result.examId) {
      results[i] = result
      localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
      return
    }
  }
  results.push(result)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(results))
}
