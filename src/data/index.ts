import type { Exam } from '../types'
import { psps } from './psps'
import { fmps } from './fmps'

export const exams: Exam[] = [psps, fmps]

export { psps, fmps }
