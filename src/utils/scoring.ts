import type { Exam, ExamResult } from '../types'

export function getAdjustedScore(answer: number, reversed: boolean, scaleMax: number): number {
  return reversed ? (scaleMax + 1) - answer : answer
}

export function calculateSubscaleScores(
  exam: Exam,
  answers: Record<number, number>
): Record<string, number> {
  const scores: Record<string, number> = {}
  const useAverage = exam.scoringMethod === 'average'

  for (const subscale of exam.subscales) {
    let total = 0
    let count = 0
    for (const itemId of subscale.itemIds) {
      const answer = answers[itemId]
      if (answer !== undefined) {
        const question = exam.questions.find(q => q.id === itemId)
        const reversed = question?.reversed ?? false
        total += getAdjustedScore(answer, reversed, exam.scaleMax)
        count++
      }
    }
    scores[subscale.name] = useAverage && count > 0
      ? Math.round((total / count) * 100) / 100
      : total
  }

  return scores
}

export function calculateSubscalePercentHigh(
  exam: Exam,
  answers: Record<number, number>
): Record<string, number> {
  const percentages: Record<string, number> = {}

  for (const subscale of exam.subscales) {
    let highCount = 0
    let total = 0
    for (const itemId of subscale.itemIds) {
      const answer = answers[itemId]
      if (answer !== undefined) {
        total++
        if (answer >= 5) {
          highCount++
        }
      }
    }
    percentages[subscale.name] = total > 0
      ? Math.round((highCount / total) * 100)
      : 0
  }

  return percentages
}

export function calculateElevatedStatus(
  percentHigh: Record<string, number>
): Record<string, boolean> {
  const elevated: Record<string, boolean> = {}
  for (const [name, percent] of Object.entries(percentHigh)) {
    elevated[name] = percent >= 50
  }
  return elevated
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

  const result: ExamResult = {
    examId: exam.id,
    completedAt: new Date().toISOString(),
    answers,
    subscaleScores,
    totalScore
  }

  if (exam.scoringMethod === 'average') {
    const subscalePercentHigh = calculateSubscalePercentHigh(exam, answers)
    result.subscalePercentHigh = subscalePercentHigh
    result.subscaleElevated = calculateElevatedStatus(subscalePercentHigh)
  }

  return result
}
