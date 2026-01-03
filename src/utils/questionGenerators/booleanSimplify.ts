import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateBooleanSimplify(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const vars = ['A', 'B', 'C']
  const var1 = vars[random.nextInt(vars.length)]
  const var2 = vars[random.nextInt(vars.length)]
  const var3 = vars[random.nextInt(vars.length)]

  if (var1 === var2 || var1 === var3 || var2 === var3) {
    return generateBooleanSimplify(questionType, seed ? seed + 1 : undefined)
  }

  return {
    id: `simplify-${Date.now()}-${random.nextInt(1000)}`,
    type: questionType,
    question: `化簡布林表達式：${var1}·${var2} + ${var1}·${var2}' + ${var1}'·${var2}`,
    options:
      questionType === 'multiple-choice'
        ? [`${var1} + ${var2}`, `${var1}·${var2}`, var1, var2]
        : undefined,
    correctAnswer: `${var1} + ${var2}`,
    hint: '使用分配律和互補律化簡',
    solution: `化簡步驟：\n\n${var1}·${var2} + ${var1}·${var2}' + ${var1}'·${var2}\n= ${var1}·(${var2} + ${var2}') + ${var1}'·${var2}\n= ${var1}·1 + ${var1}'·${var2}\n= ${var1} + ${var1}'·${var2}\n= (${var1} + ${var1}')·(${var1} + ${var2})\n= 1·(${var1} + ${var2})\n= ${var1} + ${var2}`,
    chapterId: 'boolean-simplify',
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

