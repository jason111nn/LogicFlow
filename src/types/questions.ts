export interface Question {
  id: string
  type: 'multiple-choice' | 'fill-in'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  hint: string
  solution: string
  chapterId: string
}

export interface PracticeSession {
  questions: Question[]
  currentIndex: number
  answers: Record<string, string | string[]>
  startTime: number
  endTime?: number
  correctCount: number
}

