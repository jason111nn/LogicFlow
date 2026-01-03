import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateGateConversion(
  questionType: QuestionType,
  seed?: number
): Question {
  return {
    id: `gate-${Date.now()}`,
    type: questionType,
    question: '使用 NAND 閘可以實現哪種邏輯閘？',
    options:
      questionType === 'multiple-choice'
        ? ['所有基本邏輯閘', '只有 AND 閘', '只有 OR 閘', '只有 NOT 閘']
        : undefined,
    correctAnswer: '所有基本邏輯閘',
    hint: 'NAND 閘是通用邏輯閘（universal gate）',
    solution:
      'NAND 閘是通用邏輯閘（universal gate），可以實現所有基本邏輯閘：\n\n- NOT：A NAND A = A\'\n- AND：(A NAND B) NAND (A NAND B) = A·B\n- OR：(A\' NAND B\') = A + B\n\n因此可以用 NAND 閘組合出任何邏輯函數。',
    chapterId: 'gate-conversion',
  }
}

