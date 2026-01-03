import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateDeMorgan(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const types = ['or_complement', 'and_complement', 'triple_or', 'inverse']
  const type = types[random.nextInt(types.length)]
  const vars = ['A', 'B', 'C']
  const var1 = vars[random.nextInt(vars.length)]
  const var2 = vars[random.nextInt(vars.length)]
  const var3 = vars[random.nextInt(vars.length)]

  switch (type) {
    case 'or_complement':
      return {
        id: `demorgan-or-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `根據第摩根定理，(${var1} + ${var2})' = ?`,
        options:
          questionType === 'multiple-choice'
            ? [
                `${var1}' + ${var2}'`,
                `${var1}' · ${var2}'`,
                `${var1} + ${var2}`,
                `${var1} · ${var2}`,
              ]
            : undefined,
        correctAnswer: `${var1}' · ${var2}'`,
        hint: '第摩根定理：和的補數等於補數的積',
        solution: `第摩根定理（De Morgan's Law）的第一條規則：\n\n(${var1} + ${var2})' = ${var1}' · ${var2}'\n\n這表示「和的補數」等於「補數的積」。\n\n換句話說，將 OR 運算取補數，等於將各個變數取補數後再做 AND 運算。`,
        chapterId: 'demorgan',
      }

    case 'and_complement':
      return {
        id: `demorgan-and-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `根據第摩根定理，(${var1} · ${var2})' = ?`,
        options:
          questionType === 'multiple-choice'
            ? [
                `${var1}' + ${var2}'`,
                `${var1}' · ${var2}'`,
                `${var1} + ${var2}`,
                `${var1} · ${var2}`,
              ]
            : undefined,
        correctAnswer: `${var1}' + ${var2}'`,
        hint: '第摩根定理：積的補數等於補數的和',
        solution: `第摩根定理（De Morgan's Law）的第二條規則：\n\n(${var1} · ${var2})' = ${var1}' + ${var2}'\n\n這表示「積的補數」等於「補數的和」。\n\n換句話說，將 AND 運算取補數，等於將各個變數取補數後再做 OR 運算。`,
        chapterId: 'demorgan',
      }

    case 'triple_or':
      return {
        id: `demorgan-triple-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `根據第摩根定理，(${var1} + ${var2} + ${var3})' = ?`,
        options:
          questionType === 'multiple-choice'
            ? [
                `${var1}' + ${var2}' + ${var3}'`,
                `${var1}' · ${var2}' · ${var3}'`,
                `${var1} · ${var2} · ${var3}`,
                `${var1} + ${var2} + ${var3}`,
              ]
            : undefined,
        correctAnswer: `${var1}' · ${var2}' · ${var3}'`,
        hint: '將第摩根定理擴展到三個變數：和的補數等於補數的積',
        solution: `第摩根定理可以擴展到多個變數：\n\n(${var1} + ${var2} + ${var3})' = ${var1}' · ${var2}' · ${var3}'\n\n規則相同：和的補數等於各個變數補數的積。`,
        chapterId: 'demorgan',
      }

    case 'inverse':
      return {
        id: `demorgan-inv-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `化簡表達式：(${var1}' + ${var2}')'`,
        options:
          questionType === 'multiple-choice'
            ? [
                `${var1} + ${var2}`,
                `${var1} · ${var2}`,
                `${var1}' + ${var2}'`,
                `${var1}' · ${var2}'`,
              ]
            : undefined,
        correctAnswer: `${var1} · ${var2}`,
        hint: '使用第摩根定理的逆運算',
        solution: `使用第摩根定理的逆運算：\n\n(${var1}' + ${var2}')' = (${var1}')' · (${var2}')' = ${var1} · ${var2}\n\n因為雙重補數等於原變數。`,
        chapterId: 'demorgan',
      }

    default:
      return generateDeMorgan(questionType, seed ? seed + 1 : undefined)
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

