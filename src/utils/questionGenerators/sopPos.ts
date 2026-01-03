import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateSOPPOS(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const vars = ['A', 'B']
  const var1 = vars[random.nextInt(vars.length)]
  const var2 = vars[random.nextInt(vars.length)]

  if (var1 === var2) {
    return generateSOPPOS(questionType, seed ? seed + 1 : undefined)
  }

  return {
    id: `sop-${Date.now()}-${random.nextInt(1000)}`,
    type: questionType,
    question: `布林函數 F(${var1},${var2}) = ${var1}·${var2} + ${var1}·${var2}' 的標準 SOP 形式是？`,
    options:
      questionType === 'multiple-choice'
        ? [var1, `${var1}·${var2}`, `${var1} + ${var2}`, `${var1}·${var2} + ${var1}·${var2}'`]
        : undefined,
    correctAnswer: var1,
    hint: '先化簡，再判斷是否為標準形式',
    solution: `F(${var1},${var2}) = ${var1}·${var2} + ${var1}·${var2}'\n        = ${var1}·(${var2} + ${var2}')\n        = ${var1}·1\n        = ${var1}\n\n標準 SOP（Sum of Products）形式是各項都是最小項（minterm）的和。`,
    chapterId: 'sop-pos',
  }
}

class SeededRandom {
  private seed: number

  constructor(seed?: number) {
    this.seed = seed || Date.now() + Math.random() * 1000000
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max)
  }
}

