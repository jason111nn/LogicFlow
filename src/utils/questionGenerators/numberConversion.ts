import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateNumberConversion(
  questionType: QuestionType,
  seed?: number
): Question {
  const random = seed ? new SeededRandom(seed) : new SeededRandom()
  const types = ['dec_to_bin', 'bin_to_dec', 'dec_to_hex', 'oct_to_dec']
  const type = types[random.nextInt(types.length)]

  switch (type) {
    case 'dec_to_bin': {
      const decimal = random.nextInt(256) // 0-255
      const binary = decimal.toString(2)
      const wrongOptions = [
        (decimal + 1).toString(2),
        (decimal - 1).toString(2),
        (decimal + 2).toString(2),
      ].filter((v) => parseInt(v, 2) >= 0 && parseInt(v, 2) <= 255)

      return {
        id: `num-dec-bin-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `將十進位數 ${decimal} 轉換為二進位數`,
        options:
          questionType === 'multiple-choice'
            ? [
                binary,
                ...wrongOptions.slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: binary,
        hint: `${decimal} = ${decimal.toString(2)}₂`,
        solution: `將 ${decimal} 轉換為二進位：\n\n${getDivisionSteps(decimal, 2)}\n\n從下往上讀：${binary}₂\n\n驗證：${getBinaryVerification(binary)} = ${decimal}₁₀`,
        chapterId: 'number-conversion',
      }
    }

    case 'bin_to_dec': {
      const decimal = random.nextInt(256)
      const binary = decimal.toString(2)
      const wrongOptions = [
        decimal + 1,
        decimal - 1,
        decimal + 2,
      ].filter((v) => v >= 0 && v <= 255)

      return {
        id: `num-bin-dec-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `將二進位數 ${binary} 轉換為十進位數`,
        options:
          questionType === 'multiple-choice'
            ? [
                decimal.toString(),
                ...wrongOptions.map((v) => v.toString()).slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: decimal.toString(),
        hint: `${binary}₂ = ${getBinaryCalculation(binary)}`,
        solution: `將 ${binary}₂ 轉換為十進位：\n\n${binary}₂ = ${getBinaryCalculation(binary)}\n      = ${decimal}₁₀`,
        chapterId: 'number-conversion',
      }
    }

    case 'dec_to_hex': {
      const decimal = random.nextInt(256)
      const hex = decimal.toString(16).toUpperCase()
      const wrongOptions = [
        (decimal + 1).toString(16).toUpperCase(),
        (decimal - 1).toString(16).toUpperCase(),
        (decimal + 16).toString(16).toUpperCase(),
      ].filter((v) => parseInt(v, 16) >= 0 && parseInt(v, 16) <= 255)

      return {
        id: `num-dec-hex-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `將十進位數 ${decimal} 轉換為十六進位數`,
        options:
          questionType === 'multiple-choice'
            ? [
                hex,
                ...wrongOptions.slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: hex,
        hint: `${decimal} = ${hex}₁₆`,
        solution: `將 ${decimal} 轉換為十六進位：\n\n${getDivisionSteps(decimal, 16)}\n\n從下往上讀：${hex}₁₆\n\n驗證：${getHexVerification(hex)} = ${decimal}₁₀`,
        chapterId: 'number-conversion',
      }
    }

    case 'oct_to_dec': {
      const decimal = random.nextInt(512)
      const octal = decimal.toString(8)
      const wrongOptions = [
        decimal + 1,
        decimal - 1,
        decimal + 8,
      ].filter((v) => v >= 0 && v <= 511)

      return {
        id: `num-oct-dec-${Date.now()}-${random.nextInt(1000)}`,
        type: questionType,
        question: `將八進位數 ${octal} 轉換為十進位數`,
        options:
          questionType === 'multiple-choice'
            ? [
                decimal.toString(),
                ...wrongOptions.map((v) => v.toString()).slice(0, 3),
              ].sort(() => Math.random() - 0.5)
            : undefined,
        correctAnswer: decimal.toString(),
        hint: `${octal}₈ = ${getOctalCalculation(octal)}`,
        solution: `將 ${octal}₈ 轉換為十進位：\n\n${octal}₈ = ${getOctalCalculation(octal)}\n    = ${decimal}₁₀`,
        chapterId: 'number-conversion',
      }
    }

    default:
      return generateNumberConversion(questionType, seed ? seed + 1 : undefined)
  }
}

function getDivisionSteps(n: number, base: number): string {
  let steps = ''
  let num = n
  const remainders: number[] = []
  while (num > 0) {
    const remainder = num % base
    remainders.push(remainder)
    steps += `${num} ÷ ${base} = ${Math.floor(num / base)} 餘 ${remainder}\n`
    num = Math.floor(num / base)
  }
  return steps.trim()
}

function getBinaryVerification(binary: string): string {
  const parts: string[] = []
  for (let i = 0; i < binary.length; i++) {
    const bit = binary[binary.length - 1 - i]
    if (bit === '1') {
      const superscript = i.toString().replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)])
      parts.push(`1×2${superscript}`)
    }
  }
  return parts.join(' + ') || '0'
}

function getBinaryCalculation(binary: string): string {
  const parts: string[] = []
  for (let i = 0; i < binary.length; i++) {
    const bit = binary[binary.length - 1 - i]
    const superscript = i.toString().replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)])
    parts.push(`${bit}×2${superscript}`)
  }
  const result = parts.join(' + ')
  const calculated = parseInt(binary, 2)
  return `${result}\n      = ${calculated}₁₀`
}

function getHexVerification(hex: string): string {
  const parts: string[] = []
  for (let i = 0; i < hex.length; i++) {
    const digit = hex[hex.length - 1 - i]
    const value = parseInt(digit, 16)
    const superscript = i.toString().replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)])
    parts.push(`${value}×16${superscript}`)
  }
  return parts.join(' + ')
}

function getOctalCalculation(octal: string): string {
  const parts: string[] = []
  for (let i = 0; i < octal.length; i++) {
    const digit = octal[octal.length - 1 - i]
    const superscript = i.toString().replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[parseInt(d)])
    parts.push(`${digit}×8${superscript}`)
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

