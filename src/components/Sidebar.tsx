import { useState } from 'react'
import { chapters } from '../types/chapters'
import { useSettingsStore } from '../store/settingsStore'
import { useProgressStore } from '../store/progressStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onToggle: () => void
  onChapterSelect?: (chapterId: string) => void
}

export default function Sidebar({ isOpen, onClose, onToggle, onChapterSelect }: SidebarProps) {
  const { questionType, setQuestionType, fontSize, setFontSize, darkMode, toggleDarkMode } = useSettingsStore()
  const { chapters: progress } = useProgressStore()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'boolean-algebra': true,
    'number-system': true,
  })

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleChapterClick = (chapterId: string) => {
    onChapterSelect?.(chapterId)
    onClose()
  }

  const getChapterProgress = (chapterId: string) => {
    const chapterProgress = progress[chapterId]
    if (!chapterProgress || chapterProgress.totalQuestions === 0) return null
    const accuracy = (chapterProgress.correctAnswers / chapterProgress.totalQuestions) * 100
    return { accuracy, experience: chapterProgress.experience }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-bold">LogicFlow</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Learning Chapters */}
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold mb-4">學習章節</h3>
            {chapters.map((section) => (
              <div key={section.id} className="mb-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="font-medium">{section.title}</span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      expandedSections[section.id] ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                {expandedSections[section.id] && section.children && (
                  <div className="ml-4 mt-2 space-y-1">
                    {section.children.map((chapter) => {
                      const progress = getChapterProgress(chapter.id)
                      return (
                        <button
                          key={chapter.id}
                          onClick={() => handleChapterClick(chapter.id)}
                          className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span className="text-sm">{chapter.title}</span>
                          {progress && (
                            <span className="text-xs text-blue-500 dark:text-blue-400">
                              {progress.accuracy.toFixed(0)}%
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* System Controls */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-lg font-semibold mb-4">系統控制</h3>

            {/* Question Type Toggle */}
            <div>
              <label className="block text-sm font-medium mb-2">題型切換</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setQuestionType('multiple-choice')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    questionType === 'multiple-choice'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  選擇題
                </button>
                <button
                  onClick={() => setQuestionType('fill-in')}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    questionType === 'fill-in'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  填充題
                </button>
              </div>
            </div>

            {/* Font Size Slider */}
            <div>
              <label className="block text-sm font-medium mb-2">
                字體大小: {fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Dark Mode Toggle */}
            <div>
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium">深色模式</span>
                <button
                  onClick={toggleDarkMode}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    darkMode ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      darkMode ? 'translate-x-7' : ''
                    }`}
                  />
                </button>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-30 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  )
}

