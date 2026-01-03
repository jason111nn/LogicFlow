import { useMemo } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'
import { PracticeSession } from '../types/questions'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface StatisticsModalProps {
  session: PracticeSession
  onClose: () => void
}

export default function StatisticsModal({ session, onClose }: StatisticsModalProps) {
  const stats = useMemo(() => {
    const totalQuestions = session.questions.length
    const correctCount = session.correctCount
    const accuracy = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0
    const timeSpent = session.endTime && session.startTime
      ? Math.round((session.endTime - session.startTime) / 1000)
      : 0

    return {
      totalQuestions,
      correctCount,
      incorrectCount: totalQuestions - correctCount,
      accuracy,
      timeSpent,
    }
  }, [session])

  const doughnutData = {
    labels: ['正確', '錯誤'],
    datasets: [
      {
        data: [stats.correctCount, stats.incorrectCount],
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  }

  const barData = {
    labels: ['答題數', '正確數', '錯誤數'],
    datasets: [
      {
        label: '統計',
        data: [stats.totalQuestions, stats.correctCount, stats.incorrectCount],
        backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
      },
    ],
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}分${secs}秒`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">練習成果</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Statistics Cards */}
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">總答題數</p>
              <p className="text-3xl font-bold">{stats.totalQuestions}</p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">正確率</p>
              <p className="text-3xl font-bold">{stats.accuracy.toFixed(1)}%</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">耗時</p>
              <p className="text-3xl font-bold">{formatTime(stats.timeSpent)}</p>
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="flex items-center justify-center">
            <div className="w-64 h-64">
              <Doughnut
                data={doughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">答題統計</h3>
          <div className="h-64">
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          繼續練習
        </button>
      </div>
    </div>
  )
}

