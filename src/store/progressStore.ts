import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChapterProgress {
  chapterId: string
  totalQuestions: number
  correctAnswers: number
  bestAccuracy: number
  experience: number
}

interface ProgressState {
  chapters: Record<string, ChapterProgress>
  updateProgress: (chapterId: string, isCorrect: boolean) => void
  resetProgress: (chapterId?: string) => void
}

const defaultChapterProgress = (chapterId: string): ChapterProgress => ({
  chapterId,
  totalQuestions: 0,
  correctAnswers: 0,
  bestAccuracy: 0,
  experience: 0,
})

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      chapters: {},
      updateProgress: (chapterId: string, isCorrect: boolean) => {
        set((state) => {
          const current = state.chapters[chapterId] || defaultChapterProgress(chapterId)
          const newTotal = current.totalQuestions + 1
          const newCorrect = current.correctAnswers + (isCorrect ? 1 : 0)
          const newAccuracy = (newCorrect / newTotal) * 100
          const newExperience = current.experience + (isCorrect ? 10 : 5)

          return {
            chapters: {
              ...state.chapters,
              [chapterId]: {
                ...current,
                totalQuestions: newTotal,
                correctAnswers: newCorrect,
                bestAccuracy: Math.max(current.bestAccuracy, newAccuracy),
                experience: newExperience,
              },
            },
          }
        })
      },
      resetProgress: (chapterId?: string) => {
        if (chapterId) {
          set((state) => {
            const newChapters = { ...state.chapters }
            delete newChapters[chapterId]
            return { chapters: newChapters }
          })
        } else {
          set({ chapters: {} })
        }
      },
    }),
    {
      name: 'logicflow-progress',
    }
  )
)

