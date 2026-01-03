import { Question } from '../../types/questions'
import { QuestionType } from '../../store/settingsStore'

export function generateKMap(
  questionType: QuestionType,
  seed?: number
): Question {
  return {
    id: `kmap-${Date.now()}`,
    type: questionType,
    question: '使用卡諾圖化簡布林函數（此題將使用互動式卡諾圖）',
    options: undefined,
    correctAnswer: '互動式題目',
    hint: '在卡諾圖中，嘗試圈選相鄰的 1 來形成最大的群組',
    solution:
      '卡諾圖化簡的步驟：\n1. 將布林函數的真值表填入卡諾圖\n2. 圈選相鄰的 1（可以跨越邊界）\n3. 每個圈選的群組對應一個簡化的項\n4. 選擇最少的群組來覆蓋所有的 1',
    chapterId: 'k-map',
  }
}

