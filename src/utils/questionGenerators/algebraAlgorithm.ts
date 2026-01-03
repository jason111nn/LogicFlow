import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateAlgebraAlgorithm(
  questionType: QuestionType,
  seed?: number
): Question {
  return {
    id: `alg-${Date.now()}`,
    type: questionType,
    question: '使用代數演算法化簡時，哪個定律可以用來消除冗餘項？',
    options:
      questionType === 'multiple-choice'
        ? ['吸收律', '交換律', '結合律', '分配律']
        : undefined,
    correctAnswer: '吸收律',
    hint: '吸收律可以消除冗餘項，例如 A + A·B = A',
    solution:
      '吸收律（Absorption Law）在代數演算法中非常重要：\n\n- A + A·B = A\n- A·(A + B) = A\n\n這些定律可以幫助消除冗餘項，簡化布林表達式。',
    chapterId: 'algebra-algorithm',
  }
}

