import type { Exam, ExamResult } from '../types'

export function getAdjustedScore(answer: number, reversed: boolean, scaleMax: number): number {
  return reversed ? (scaleMax + 1) - answer : answer
}

export function calculateSubscaleScores(
  exam: Exam,
  answers: Record<number, number>
): Record<string, number> {
  const scores: Record<string, number> = {}

  for (const subscale of exam.subscales) {
    let total = 0
    for (const itemId of subscale.itemIds) {
      const answer = answers[itemId]
      if (answer !== undefined) {
        const question = exam.questions.find(q => q.id === itemId)
        const reversed = question?.reversed ?? false
        total += getAdjustedScore(answer, reversed, exam.scaleMax)
      }
    }
    scores[subscale.name] = total
  }

  return scores
}

export function calculateTotalScore(
  subscaleScores: Record<string, number>,
  excludeFromTotal?: string[]
): number {
  const excluded = new Set(excludeFromTotal ?? [])
  return Object.entries(subscaleScores)
    .filter(([name]) => !excluded.has(name))
    .reduce((sum, [, score]) => sum + score, 0)
}

export function calculateResult(
  exam: Exam,
  answers: Record<number, number>
): ExamResult {
  const subscaleScores = calculateSubscaleScores(exam, answers)
  const totalScore = calculateTotalScore(subscaleScores, exam.excludeFromTotal)

  return {
    examId: exam.id,
    completedAt: new Date().toISOString(),
    answers,
    subscaleScores,
    totalScore
  }
}
