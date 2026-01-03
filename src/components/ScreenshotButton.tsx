import { useRef } from 'react'
import html2canvas from 'html2canvas'
import { useSettingsStore } from '../store/settingsStore'
import { useProgressStore } from '../store/progressStore'

interface ScreenshotButtonProps {
  onScreenshotStart?: () => void
  onScreenshotEnd?: () => void
}

export default function ScreenshotButton({ onScreenshotStart, onScreenshotEnd }: ScreenshotButtonProps) {
  const { darkMode } = useSettingsStore()
  const { chapters: progress } = useProgressStore()

  const handleScreenshot = async () => {
    onScreenshotStart?.()

    // Hide sidebar and hamburger menu
    const sidebar = document.querySelector('[class*="fixed"][class*="left-0"]')
    const hamburger = document.querySelector('button[class*="fixed"][class*="top-4"][class*="left-4"]')
    
    if (sidebar) (sidebar as HTMLElement).style.display = 'none'
    if (hamburger) (hamburger as HTMLElement).style.display = 'none'

    // Show progress bar temporarily
    const progressBar = document.createElement('div')
    progressBar.id = 'screenshot-progress-bar'
    progressBar.className = 'fixed top-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-800 shadow-lg'
    progressBar.innerHTML = `
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium">章節進度</span>
          <span class="text-sm font-medium">正確率</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: 60%"></div>
        </div>
      </div>
    `
    document.body.appendChild(progressBar)

    // Wait a bit for UI to update
    await new Promise(resolve => setTimeout(resolve, 300))

    try {
      // Capture the main content area
      const element = document.querySelector('.max-w-4xl') || document.body
      
      const canvas = await html2canvas(element as HTMLElement, {
        backgroundColor: darkMode ? '#111827' : '#f9fafb',
        scale: 2,
        logging: false,
        useCORS: true,
      })

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `logicflow-screenshot-${Date.now()}.png`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }
      }, 'image/png')
    } catch (error) {
      console.error('Screenshot failed:', error)
      alert('截圖失敗，請稍後再試')
    } finally {
      // Restore UI
      if (sidebar) (sidebar as HTMLElement).style.display = ''
      if (hamburger) (hamburger as HTMLElement).style.display = ''
      const progressBarEl = document.getElementById('screenshot-progress-bar')
      if (progressBarEl) {
        progressBarEl.remove()
      }
      onScreenshotEnd?.()
    }
  }

  return (
    <button
      onClick={handleScreenshot}
      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      截圖
    </button>
  )
}

