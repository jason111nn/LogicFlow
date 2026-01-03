import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateCombinationalSimplify(
  questionType: QuestionType,
  _seed?: number
): Question {
  return {
    id: `comb-${Date.now()}`,
    type: questionType,
    question: '組合邏輯電路化簡的主要目標是？',
    options:
      questionType === 'multiple-choice'
        ? ['減少邏輯閘數量', '增加電路速度', '減少成本', '以上皆是']
        : undefined,
    correctAnswer: '以上皆是',
    hint: '化簡可以同時達到多個目標',
    solution:
      '組合邏輯電路化簡的主要目標包括：\n\n1. 減少邏輯閘數量（降低成本）\n2. 減少邏輯層級（提高速度）\n3. 降低功耗\n4. 提高可靠性\n\n因此答案為「以上皆是」。',
    chapterId: 'combinational-simplify',
  }
}

