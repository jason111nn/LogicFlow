import { useState, useEffect } from 'react'
import { Question } from '../types/questions'

interface QuestionDisplayProps {
  question: Question
  userAnswer?: string | string[]
  onAnswer: (answer: string | string[]) => void
  showSolution: boolean
  onShowSolution: () => void
}

export default function QuestionDisplay({
  question,
  userAnswer,
  onAnswer,
  showSolution,
  onShowSolution,
}: QuestionDisplayProps) {
  const [hintVisible, setHintVisible] = useState(false)
  const [solutionModalOpen, setSolutionModalOpen] = useState(false)
  const [localAnswer, setLocalAnswer] = useState<string>(
    typeof userAnswer === 'string' ? userAnswer : ''
  )

  // Sync localAnswer with userAnswer when it changes
  useEffect(() => {
    if (typeof userAnswer === 'string') {
      setLocalAnswer(userAnswer)
    }
  }, [userAnswer])

  const isCorrect = userAnswer !== undefined && (
    Array.isArray(question.correctAnswer)
      ? JSON.stringify((userAnswer as string[]).sort()) === JSON.stringify(question.correctAnswer.sort())
      : userAnswer === question.correctAnswer
  )

  const handleSubmit = () => {
    if (question.type === 'fill-in') {
      onAnswer(localAnswer)
    }
  }

  const handleOptionClick = (option: string) => {
    if (question.type === 'multiple-choice') {
      onAnswer(option)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

        {/* Multiple Choice */}
        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = userAnswer === option
              const isCorrectOption = option === question.correctAnswer
              const shouldHighlight = showSolution && isCorrectOption

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={showSolution}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    shouldHighlight
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  } ${showSolution ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                    <span>{option}</span>
                    {showSolution && isCorrectOption && (
                      <span className="ml-auto text-green-500 font-bold">✓</span>
                    )}
                    {showSolution && isSelected && !isCorrectOption && (
                      <span className="ml-auto text-red-500 font-bold">✗</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Fill-in */}
        {question.type === 'fill-in' && (
          <div className="space-y-4">
            <input
              type="text"
              value={localAnswer}
              onChange={(e) => setLocalAnswer(e.target.value)}
              onBlur={handleSubmit}
              disabled={showSolution}
              placeholder="請輸入答案"
              className={`w-full p-3 border-2 rounded-lg ${
                showSolution
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            {showSolution && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">正確答案：</p>
                <p className="font-semibold">{question.correctAnswer}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setHintVisible(!hintVisible)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
        >
          提示
        </button>
        <button
          onClick={() => {
            onShowSolution()
            setSolutionModalOpen(true)
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          解答
        </button>
      </div>

      {/* Hint */}
      {hintVisible && (
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm">{question.hint}</p>
        </div>
      )}

      {/* Solution Modal */}
      {solutionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">詳細解析</h3>
              <button
                onClick={() => setSolutionModalOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{question.solution}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

