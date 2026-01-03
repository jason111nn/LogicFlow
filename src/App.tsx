import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import PracticeArea from './components/PracticeArea'
import { useSettingsStore } from './store/settingsStore'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedChapterId, setSelectedChapterId] = useState<string>('boolean-basic')
  const { fontSize, darkMode } = useSettingsStore()

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`
  }, [fontSize])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapterId(chapterId)
    setSidebarOpen(false)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onChapterSelect={handleChapterSelect}
      />
      <PracticeArea 
        onMenuClick={() => setSidebarOpen(true)}
        initialChapterId={selectedChapterId}
      />
    </div>
  )
}

export default App

