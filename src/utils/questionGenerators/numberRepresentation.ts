import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateNumberRepresentation(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const decimal = random.nextInt(16) // 0-15 for simplicity
  const binary = decimal.toString(2)
  const wrongOptions = [
    decimal + 1,
    decimal - 1,
    decimal + 2,
  ].filter((v) => v >= 0 && v <= 15)

  return {
    id: `num-rep-${Date.now()}-${random.nextInt(1000)}`,
    type: questionType,
    question: `二進位數 ${binary} 的十進位表示是？`,
    options:
      questionType === 'multiple-choice'
        ? [
            decimal.toString(),
            ...wrongOptions.map((v) => v.toString()).slice(0, 3),
          ].sort(() => Math.random() - 0.5)
        : undefined,
    correctAnswer: decimal.toString(),
    hint: `${binary}₂ = ${getBinaryCalculation(binary)}`,
    solution: `${binary}₂ = ${getBinaryCalculation(binary)}\n      = ${decimal}₁₀`,
    chapterId: 'number-representation',
  }
}

function getBinaryCalculation(binary: string): string {
  const parts: string[] = []
  for (let i = 0; i < binary.length; i++) {
    const bit = binary[binary.length - 1 - i]
    const power = Math.pow(2, i)
    parts.push(`${bit}×2⁰`)
  }
  return parts.join(' + ')
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

