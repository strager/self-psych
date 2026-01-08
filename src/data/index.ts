import type { Exam } from '../types'
import { psps } from './psps'
import { fmps } from './fmps'
import { ysqr } from './ysqr'

export const exams: Exam[] = [psps, fmps, ysqr]

export { psps, fmps, ysqr }
