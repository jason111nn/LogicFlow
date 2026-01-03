import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateComplement(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const types = ['ones_complement', 'twos_complement']
  const type = types[random.nextInt(types.length)]
  const bits = 8
  const decimal = random.nextInt(256)
  const binary = decimal.toString(2).padStart(bits, '0')

  switch (type) {
    case 'ones_complement': {
      const onesComplement = binary
        .split('')
        .map((bit) => (bit === '0' ? '1' : '0'))
        .join('')
      const wrongOptions = [
        binary,
        (parseInt(onesComplement, 2) + 1).toString(2).padStart(bits, '0'),
        (parseInt(onesComplement, 2) - 1).toString(2).padStart(bits, '0'),
      ]

      return {
        id: `comp-ones-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `${bits} 位元二進位數 ${binary} 的 1's complement（1的補數）是？`,
        options:
          questionType === 'multiple-choice'
            ? [
                onesComplement,
                ...wrongOptions.slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: onesComplement,
        hint: '1的補數就是將所有位元反轉（0變1，1變0）',
        solution: `1的補數（1's complement）是將所有位元反轉：\n\n原數：${binary}\n補數：${onesComplement}\n\n每一位元都從 0 變 1，從 1 變 0。`,
        chapterId: 'complement',
      }
    }

    case 'twos_complement': {
      const onesComplement = binary
        .split('')
        .map((bit) => (bit === '0' ? '1' : '0'))
        .join('')
      const twosComplement = (parseInt(onesComplement, 2) + 1)
        .toString(2)
        .padStart(bits, '0')
      const wrongOptions = [
        onesComplement,
        binary,
        (parseInt(twosComplement, 2) - 1).toString(2).padStart(bits, '0'),
      ]

      return {
        id: `comp-twos-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `${bits} 位元二進位數 ${binary} 的 2's complement（2的補數）是？`,
        options:
          questionType === 'multiple-choice'
            ? [
                twosComplement,
                ...wrongOptions.slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: twosComplement,
        hint: '2的補數 = 1的補數 + 1',
        solution: `2的補數（2's complement）計算步驟：\n\n1. 先求 1的補數：${onesComplement}\n2. 再加 1：${onesComplement} + 1 = ${twosComplement}\n\n因此答案為 ${twosComplement}。`,
        chapterId: 'complement',
      }
    }

    default:
      return generateComplement(questionType, seed ? seed + 1 : undefined)
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

