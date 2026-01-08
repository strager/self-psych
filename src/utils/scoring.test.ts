import { describe, it, expect } from 'vitest'
import { getAdjustedScore, calculateSubscaleScores, calculateTotalScore } from './scoring'
import { psps } from '../data/psps'

describe('getAdjustedScore', () => {
  it('returns the answer unchanged when not reversed', () => {
    expect(getAdjustedScore(1, false)).toBe(1)
    expect(getAdjustedScore(4, false)).toBe(4)
    expect(getAdjustedScore(7, false)).toBe(7)
  })

  it('reverses the score when reversed is true', () => {
    expect(getAdjustedScore(1, true)).toBe(7)
    expect(getAdjustedScore(2, true)).toBe(6)
    expect(getAdjustedScore(4, true)).toBe(4)
    expect(getAdjustedScore(6, true)).toBe(2)
    expect(getAdjustedScore(7, true)).toBe(1)
  })
})

describe('calculateSubscaleScores', () => {
  it('calculates Nondisclosure of Imperfection subscale correctly', () => {
    // Nondisclosure items: 1, 9, 13, 14, 16, 19, 21
    // Items 1 and 16 are reversed
    const answers: Record<number, number> = {
      1: 7,   // reversed: 8-7=1
      9: 4,   // not reversed: 4
      13: 4,  // not reversed: 4
      14: 4,  // not reversed: 4
      16: 7,  // reversed: 8-7=1
      19: 4,  // not reversed: 4
      21: 4   // not reversed: 4
    }
    // Fill in other answers with neutral values
    for (let i = 1; i <= 27; i++) {
      if (!(i in answers)) answers[i] = 4
    }

    const scores = calculateSubscaleScores(psps, answers)
    // Expected: 1 + 4 + 4 + 4 + 1 + 4 + 4 = 22
    expect(scores['Nondisclosure of Imperfection']).toBe(22)
  })

  it('calculates Perfectionistic Self-Promotion subscale correctly', () => {
    // Self-Promotion items: 5, 7, 11, 15, 17, 18, 23, 25, 26, 27
    // Items 11 and 18 are reversed
    const answers: Record<number, number> = {
      5: 6,   // not reversed: 6
      7: 6,   // not reversed: 6
      11: 2,  // reversed: 8-2=6
      15: 6,  // not reversed: 6
      17: 6,  // not reversed: 6
      18: 2,  // reversed: 8-2=6
      23: 6,  // not reversed: 6
      25: 6,  // not reversed: 6
      26: 6,  // not reversed: 6
      27: 6   // not reversed: 6
    }
    // Fill in other answers
    for (let i = 1; i <= 27; i++) {
      if (!(i in answers)) answers[i] = 4
    }

    const scores = calculateSubscaleScores(psps, answers)
    // Expected: 6 * 10 = 60
    expect(scores['Perfectionistic Self-Promotion']).toBe(60)
  })

  it('calculates Nondisplay of Imperfection subscale correctly', () => {
    // Nondisplay items: 2, 3, 4, 6, 8, 10, 12, 20, 22, 24
    // Item 22 is reversed
    const answers: Record<number, number> = {
      2: 5,   // not reversed: 5
      3: 5,   // not reversed: 5
      4: 5,   // not reversed: 5
      6: 5,   // not reversed: 5
      8: 5,   // not reversed: 5
      10: 5,  // not reversed: 5
      12: 5,  // not reversed: 5
      20: 5,  // not reversed: 5
      22: 3,  // reversed: 8-3=5
      24: 5   // not reversed: 5
    }
    // Fill in other answers
    for (let i = 1; i <= 27; i++) {
      if (!(i in answers)) answers[i] = 4
    }

    const scores = calculateSubscaleScores(psps, answers)
    // Expected: 5 * 10 = 50
    expect(scores['Nondisplay of Imperfection']).toBe(50)
  })

  it('handles all answers being 1 (minimum)', () => {
    const answers: Record<number, number> = {}
    for (let i = 1; i <= 27; i++) {
      answers[i] = 1
    }

    const scores = calculateSubscaleScores(psps, answers)
    // Reversed items (1, 11, 16, 18, 22) become 7, others stay 1
    // Nondisclosure (1,9,13,14,16,19,21): 7+1+1+1+7+1+1 = 19
    expect(scores['Nondisclosure of Imperfection']).toBe(19)
    // Self-Promotion (5,7,11,15,17,18,23,25,26,27): 1+1+7+1+1+7+1+1+1+1 = 22
    expect(scores['Perfectionistic Self-Promotion']).toBe(22)
    // Nondisplay (2,3,4,6,8,10,12,20,22,24): 1+1+1+1+1+1+1+1+7+1 = 16
    expect(scores['Nondisplay of Imperfection']).toBe(16)
  })

  it('handles all answers being 7 (maximum)', () => {
    const answers: Record<number, number> = {}
    for (let i = 1; i <= 27; i++) {
      answers[i] = 7
    }

    const scores = calculateSubscaleScores(psps, answers)
    // Reversed items (1, 11, 16, 18, 22) become 1, others stay 7
    // Nondisclosure (1,9,13,14,16,19,21): 1+7+7+7+1+7+7 = 37
    expect(scores['Nondisclosure of Imperfection']).toBe(37)
    // Self-Promotion (5,7,11,15,17,18,23,25,26,27): 7+7+1+7+7+1+7+7+7+7 = 58
    expect(scores['Perfectionistic Self-Promotion']).toBe(58)
    // Nondisplay (2,3,4,6,8,10,12,20,22,24): 7+7+7+7+7+7+7+7+1+7 = 64
    expect(scores['Nondisplay of Imperfection']).toBe(64)
  })
})

describe('calculateTotalScore', () => {
  it('sums all subscale scores', () => {
    const subscaleScores = {
      'Perfectionistic Self-Promotion': 40,
      'Nondisplay of Imperfection': 35,
      'Nondisclosure of Imperfection': 25
    }
    expect(calculateTotalScore(subscaleScores)).toBe(100)
  })

  it('returns 0 for empty scores', () => {
    expect(calculateTotalScore({})).toBe(0)
  })
})
