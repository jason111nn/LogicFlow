import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateBooleanBasic(
  questionType: QuestionType,
  _seed?: number
): Question {
  const random = _seed ? new SeededRandom(_seed) : new SeededRandom()
  const types = [
    'or_identity',
    'and_identity',
    'or_complement',
    'and_complement',
    'absorption',
    'distributive',
  ]
  const type = types[random.nextInt(types.length)]

  switch (type) {
    case 'or_identity':
      return {
        id: `bool-or-id-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: '布林代數中，A + 0 = ?',
        options:
          questionType === 'multiple-choice'
            ? ['A', '0', '1', "A'"]
            : undefined,
        correctAnswer: 'A',
        hint: '思考一下：任何值與 0 做 OR 運算的結果是什麼？',
        solution:
          '在布林代數中，OR 運算的恆等元素是 0。因此 A + 0 = A。\n\n這表示任何布林變數與 0 做 OR 運算，結果都是該變數本身。',
        chapterId: 'boolean-basic',
      }

    case 'and_identity':
      return {
        id: `bool-and-id-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: '布林代數中，A · 1 = ?',
        options:
          questionType === 'multiple-choice'
            ? ['A', '0', '1', "A'"]
            : undefined,
        correctAnswer: 'A',
        hint: '思考一下：任何值與 1 做 AND 運算的結果是什麼？',
        solution:
          '在布林代數中，AND 運算的恆等元素是 1。因此 A · 1 = A。\n\n這表示任何布林變數與 1 做 AND 運算，結果都是該變數本身。',
        chapterId: 'boolean-basic',
      }

    case 'or_complement':
      return {
        id: `bool-or-comp-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: "布林代數中，A + A' = ?",
        options:
          questionType === 'multiple-choice'
            ? ['A', '0', '1', "A'"]
            : undefined,
        correctAnswer: '1',
        hint: '任何變數與其補數做 OR 運算的結果是什麼？',
        solution:
          "在布林代數中，互補律（Complement Law）指出：\n\nA + A' = 1\n\n這表示任何變數與其補數做 OR 運算，結果都是 1。",
        chapterId: 'boolean-basic',
      }

    case 'and_complement':
      return {
        id: `bool-and-comp-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: "布林代數中，A · A' = ?",
        options:
          questionType === 'multiple-choice'
            ? ['A', '0', '1', "A'"]
            : undefined,
        correctAnswer: '0',
        hint: '任何變數與其補數做 AND 運算的結果是什麼？',
        solution:
          "在布林代數中，互補律（Complement Law）指出：\n\nA · A' = 0\n\n這表示任何變數與其補數做 AND 運算，結果都是 0。",
        chapterId: 'boolean-basic',
      }

    case 'absorption':
      const vars = ['A', 'B', 'C']
      const var1 = vars[random.nextInt(vars.length)]
      const var2 = vars[random.nextInt(vars.length)]
      if (var1 === var2) {
        return generateBooleanBasic(questionType, _seed ? _seed + 1 : undefined)
      }
      return {
        id: `bool-abs-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `化簡布林表達式：${var1} + ${var1}·${var2}`,
        options:
          questionType === 'multiple-choice'
            ? [var1, var2, `${var1}·${var2}`, `${var1} + ${var2}`]
            : undefined,
        correctAnswer: var1,
        hint: `使用吸收律：${var1} + ${var1}·${var2} = ${var1}·(1 + ${var2}) = ${var1}·1 = ${var1}`,
        solution: `使用吸收律（Absorption Law）：\n\n${var1} + ${var1}·${var2} = ${var1}·(1 + ${var2})\n\n由於 1 + ${var2} = 1（任何值與 1 做 OR 運算都是 1），所以：\n\n${var1}·(1 + ${var2}) = ${var1}·1 = ${var1}\n\n因此答案為 ${var1}。`,
        chapterId: 'boolean-basic',
      }

    case 'distributive':
      const vars2 = ['A', 'B', 'C']
      const v1 = vars2[random.nextInt(vars2.length)]
      const v2 = vars2[random.nextInt(vars2.length)]
      const v3 = vars2[random.nextInt(vars2.length)]
      if (v1 === v2 || v1 === v3 || v2 === v3) {
        return generateBooleanBasic(questionType, _seed ? _seed + 1 : undefined)
      }
      return {
        id: `bool-dist-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `化簡布林表達式：${v1}·${v2} + ${v1}·${v2}'`,
        options:
          questionType === 'multiple-choice'
            ? [v1, v2, `${v1}·${v2}`, '1']
            : undefined,
        correctAnswer: v1,
        hint: `使用分配律：${v1}·${v2} + ${v1}·${v2}' = ${v1}·(${v2} + ${v2}') = ${v1}·1 = ${v1}`,
        solution: `使用分配律和互補律：\n\n${v1}·${v2} + ${v1}·${v2}' = ${v1}·(${v2} + ${v2}')\n\n由於 ${v2} + ${v2}' = 1（互補律），所以：\n\n${v1}·(${v2} + ${v2}') = ${v1}·1 = ${v1}\n\n因此答案為 ${v1}。`,
        chapterId: 'boolean-basic',
      }

    default:
      return generateBooleanBasic(questionType, _seed ? _seed + 1 : undefined)
  }
}

// 簡單的種子隨機數生成器
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

