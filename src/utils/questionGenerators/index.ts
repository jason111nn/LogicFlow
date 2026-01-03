import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'
import { generateBooleanBasic } from './booleanBasic'
import { generateDeMorgan } from './deMorgan'
import { generateNumberConversion } from './numberConversion'
import { generateComplement } from './complement'
import { generateBCDEncoding } from './bcdEncoding'
import { generateGateConversion } from './gateConversion'
import { generateBooleanSimplify } from './booleanSimplify'
import { generateSOPPOS } from './sopPos'
import { generateAlgebraAlgorithm } from './algebraAlgorithm'
import { generateCombinationalSimplify } from './combinationalSimplify'
import { generateKMap } from './kMap'
import { generateNumberRepresentation } from './numberRepresentation'

export type QuestionGenerator = (
  questionType: QuestionType,
  seed?: number
) => Question

const generators: Record<string, QuestionGenerator> = {
  'boolean-basic': generateBooleanBasic,
  'demorgan': generateDeMorgan,
  'number-conversion': generateNumberConversion,
  'number-representation': generateNumberRepresentation,
  'complement': generateComplement,
  'bcd-encoding': generateBCDEncoding,
  'gate-conversion': generateGateConversion,
  'boolean-simplify': generateBooleanSimplify,
  'sop-pos': generateSOPPOS,
  'algebra-algorithm': generateAlgebraAlgorithm,
  'combinational-simplify': generateCombinationalSimplify,
  'k-map': generateKMap,
}

export function generateQuestion(
  chapterId: string,
  questionType: QuestionType,
  seed?: number
): Question | null {
  const generator = generators[chapterId]
  if (!generator) {
    return null
  }
  return generator(questionType, seed)
}

export function generateQuestions(
  chapterId: string,
  questionType: QuestionType,
  count: number = 5
): Question[] {
  const questions: Question[] = []
  for (let i = 0; i < count; i++) {
    const seed = Date.now() + i + Math.random() * 1000
    const question = generateQuestion(chapterId, questionType, seed)
    if (question) {
      questions.push(question)
    }
  }
  return questions
}

