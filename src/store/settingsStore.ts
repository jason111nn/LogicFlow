import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type QuestionType = 'multiple-choice' | 'fill-in'

interface SettingsState {
  questionType: QuestionType
  fontSize: number
  darkMode: boolean
  setQuestionType: (type: QuestionType) => void
  setFontSize: (size: number) => void
  toggleDarkMode: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      questionType: 'multiple-choice',
      fontSize: 16,
      darkMode: false,
      setQuestionType: (type) => set({ questionType: type }),
      setFontSize: (size) => set({ fontSize: size }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'logicflow-settings',
    }
  )
)

