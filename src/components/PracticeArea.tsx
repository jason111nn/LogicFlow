import { useState, useEffect } from 'react'
import { useSettingsStore } from '../store/settingsStore'
import { useProgressStore } from '../store/progressStore'
import QuestionDisplay from './QuestionDisplay'
import StatisticsModal from './StatisticsModal'
import ScreenshotButton from './ScreenshotButton'
import { generateQuestion, generateQuestions } from '../utils/questionGenerators'
import { PracticeSession } from '../types/questions'

interface PracticeAreaProps {
  onMenuClick: () => void
  initialChapterId?: string
  onChapterSelect?: (chapterId: string) => void
}

export default function PracticeArea({ onMenuClick, initialChapterId }: PracticeAreaProps) {
  const { questionType } = useSettingsStore()
  const { updateProgress } = useProgressStore()
  const [currentChapterId, setCurrentChapterId] = useState<string>(initialChapterId || 'boolean-basic')
  
  // Handle chapter selection from parent
  useEffect(() => {
    if (initialChapterId && initialChapterId !== currentChapterId) {
      setCurrentChapterId(initialChapterId)
    }
  }, [initialChapterId])
  const [session, setSession] = useState<PracticeSession | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [isScreenshotMode, setIsScreenshotMode] = useState(false)

  useEffect(() => {
    startNewSession(currentChapterId)
  }, [currentChapterId, questionType])

  const startNewSession = (chapterId: string) => {
    const questions = generateQuestions(chapterId, questionType, 5)
    setSession({
      questions,
      currentIndex: 0,
      answers: {},
      startTime: Date.now(),
      correctCount: 0,
    })
    setShowSolution(false)
  }

  const handleAnswer = (answer: string | string[]) => {
    if (!session) return

    const currentQuestion = session.questions[session.currentIndex]
    const isCorrect = Array.isArray(currentQuestion.correctAnswer)
      ? Array.isArray(answer)
        ? JSON.stringify([...answer].sort()) === JSON.stringify([...currentQuestion.correctAnswer].sort())
        : false
      : answer === currentQuestion.correctAnswer

    const newAnswers = {
      ...session.answers,
      [currentQuestion.id]: answer,
    }

    const newCorrectCount = session.correctCount + (isCorrect ? 1 : 0)

    setSession({
      ...session,
      answers: newAnswers,
      correctCount: newCorrectCount,
    })

    updateProgress(currentChapterId, isCorrect)
  }

  const handleNext = () => {
    if (!session) return
    
    // 動態生成新題目
    const newQuestion = generateQuestion(currentChapterId, questionType)
    if (!newQuestion) {
      // 如果無法生成題目，結束練習
      setSession({
        ...session,
        endTime: Date.now(),
      })
      setShowStatistics(true)
      return
    }

    // 如果已經有下一題，直接跳轉
    if (session.currentIndex < session.questions.length - 1) {
      setSession({
        ...session,
        currentIndex: session.currentIndex + 1,
      })
      setShowSolution(false)
    } else {
      // 添加新生成的題目並繼續
      const newQuestions = [...session.questions, newQuestion]
      setSession({
        ...session,
        questions: newQuestions,
        currentIndex: session.currentIndex + 1,
      })
      setShowSolution(false)
    }
  }

  const handleEndPractice = () => {
    if (!session) return
    setSession({
      ...session,
      endTime: Date.now(),
    })
    setShowStatistics(true)
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl mb-4">載入中...</p>
          <button
            onClick={() => startNewSession(currentChapterId)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            開始練習
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = session.questions[session.currentIndex]
  const progress = ((session.currentIndex + 1) / session.questions.length) * 100
  const accuracy = session.currentIndex > 0 
    ? (session.correctCount / session.currentIndex) * 100 
    : 0

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Progress Bar (shown during screenshot mode) */}
      {isScreenshotMode && (
        <div className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">章節進度: {session.currentIndex + 1} / {session.questions.length}</span>
            <span className="text-sm font-medium">正確率: {accuracy.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="打開菜單"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold">練習模式</h1>
          </div>
          <div className="flex gap-2">
            <ScreenshotButton
              onScreenshotStart={() => setIsScreenshotMode(true)}
              onScreenshotEnd={() => setIsScreenshotMode(false)}
            />
            <button
              onClick={handleEndPractice}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              結束練習
            </button>
          </div>
        </div>

        <QuestionDisplay
          question={currentQuestion}
          userAnswer={session.answers[currentQuestion.id]}
          onAnswer={handleAnswer}
          showSolution={showSolution}
          onShowSolution={() => setShowSolution(true)}
        />

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => {
              if (session.currentIndex > 0) {
                setSession({ ...session, currentIndex: session.currentIndex - 1 })
                setShowSolution(false)
              }
            }}
            disabled={session.currentIndex === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一題
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            下一題
          </button>
        </div>
      </div>

      {showStatistics && session.endTime && (
        <StatisticsModal
          session={session}
          onClose={() => {
            setShowStatistics(false)
            startNewSession(currentChapterId)
          }}
        />
      )}
    </div>
  )
}

