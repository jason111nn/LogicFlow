import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateBCDEncoding(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const types = ['bcd', 'ascii']
  const type = types[random.nextInt(types.length)]

  switch (type) {
    case 'bcd': {
      const decimal = random.nextInt(10) // 0-9
      const bcd = decimal.toString(2).padStart(4, '0')
      const wrongOptions = [
        (decimal + 1).toString(2).padStart(4, '0'),
        (decimal - 1).toString(2).padStart(4, '0'),
        (decimal + 2).toString(2).padStart(4, '0'),
      ].filter((v) => parseInt(v, 2) >= 0 && parseInt(v, 2) <= 9)

      return {
        id: `bcd-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `十進位數 ${decimal} 的 BCD 編碼是？`,
        options:
          questionType === 'multiple-choice'
            ? [
                bcd,
                ...wrongOptions.slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: bcd,
        hint: 'BCD 編碼是將每個十進位數字用 4 位元二進位表示',
        solution: `BCD（Binary Coded Decimal）編碼：\n\n十進位數 ${decimal} 用 4 位元二進位表示為 ${bcd}₂\n\nBCD 編碼中，每個十進位數字（0-9）都用 4 位元二進位表示。`,
        chapterId: 'bcd-encoding',
      }
    }

    case 'ascii': {
      const isUpper = random.next() > 0.5
      const charCode = isUpper
        ? 65 + random.nextInt(26) // A-Z
        : 97 + random.nextInt(26) // a-z
      const char = String.fromCharCode(charCode)
      const wrongOptions = [
        charCode + 1,
        charCode - 1,
        isUpper ? charCode + 32 : charCode - 32,
      ]

      return {
        id: `ascii-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `ASCII 編碼中，${isUpper ? '大寫' : '小寫'}字母 ${char} 的十進位值是多少？`,
        options:
          questionType === 'multiple-choice'
            ? [
                charCode.toString(),
                ...wrongOptions.map((v) => v.toString()).slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: charCode.toString(),
        hint: `ASCII 中，${isUpper ? '大寫字母 A-Z 的範圍是 65-90' : '小寫字母 a-z 的範圍是 97-122'}`,
        solution: `ASCII 編碼中：\n\n- ${isUpper ? '大寫' : '小寫'}字母 ${char} 的十進位值是 ${charCode}\n- ${isUpper ? '大寫字母 Z 的十進位值是 90' : '小寫字母 z 的十進位值是 122'}\n- ${isUpper ? '小寫字母 a 的十進位值是 97' : '大寫字母 A 的十進位值是 65'}`,
        chapterId: 'bcd-encoding',
      }
    }

    default:
      return generateBCDEncoding(questionType, seed ? seed + 1 : undefined)
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

