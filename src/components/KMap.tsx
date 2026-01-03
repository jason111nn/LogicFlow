import { useState, useEffect } from 'react'

interface KMapProps {
  rows: number
  cols: number
  values: number[][]
  onValuesChange?: (values: number[][]) => void
  readOnly?: boolean
}

export default function KMap({ rows, cols, values, onValuesChange, readOnly = false }: KMapProps) {
  const [mapValues, setMapValues] = useState<number[][]>(values)
  const [selectedGroups, setSelectedGroups] = useState<Array<{ cells: Array<[number, number]> }>>([])
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectionStart, setSelectionStart] = useState<[number, number] | null>(null)

  useEffect(() => {
    setMapValues(values)
  }, [values])

  const toggleCell = (row: number, col: number) => {
    if (readOnly) return

    const newValues = mapValues.map((r, i) =>
      r.map((v, j) => (i === row && j === col ? (v === 1 ? 0 : 1) : v))
    )
    setMapValues(newValues)
    onValuesChange?.(newValues)
  }

  const handleCellMouseDown = (row: number, col: number) => {
    if (readOnly) return
    setIsSelecting(true)
    setSelectionStart([row, col])
  }

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting || !selectionStart || readOnly) return
    // 可以實作拖曳選擇多個格子的功能
  }

  const handleCellMouseUp = () => {
    setIsSelecting(false)
    setSelectionStart(null)
  }

  const getRowLabel = (row: number) => {
    if (rows === 2) return row === 0 ? '0' : '1'
    if (rows === 4) {
      const labels = ['00', '01', '11', '10'] // Gray code order
      return labels[row]
    }
    return row.toString()
  }

  const getColLabel = (col: number) => {
    if (cols === 2) return col === 0 ? '0' : '1'
    if (cols === 4) {
      const labels = ['00', '01', '11', '10'] // Gray code order
      return labels[col]
    }
    return col.toString()
  }

  const isCellInGroup = (row: number, col: number) => {
    return selectedGroups.some((group) =>
      group.cells.some(([r, c]) => r === row && c === col)
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Column labels */}
        <div className="flex mb-2">
          <div className="w-12"></div>
          {Array.from({ length: cols }).map((_, col) => (
            <div key={col} className="w-12 text-center font-mono text-sm">
              {getColLabel(col)}
            </div>
          ))}
        </div>

        {/* Map grid */}
        <div className="flex">
          {/* Row labels */}
          <div className="flex flex-col justify-center mr-2">
            {Array.from({ length: rows }).map((_, row) => (
              <div key={row} className="h-12 flex items-center justify-center font-mono text-sm">
                {getRowLabel(row)}
              </div>
            ))}
          </div>

          {/* Cells */}
          <div
            className="grid border-2 border-gray-800 dark:border-gray-200"
            style={{ gridTemplateColumns: `repeat(${cols}, 3rem)`, gridTemplateRows: `repeat(${rows}, 3rem)` }}
            onMouseUp={handleCellMouseUp}
            onMouseLeave={handleCellMouseUp}
          >
            {Array.from({ length: rows }).map((_, row) =>
              Array.from({ length: cols }).map((_, col) => {
                const value = mapValues[row][col]
                const inGroup = isCellInGroup(row, col)
                return (
                  <div
                    key={`${row}-${col}`}
                    onClick={() => toggleCell(row, col)}
                    onMouseDown={() => handleCellMouseDown(row, col)}
                    onMouseEnter={() => handleCellMouseEnter(row, col)}
                    className={`
                      border border-gray-400 dark:border-gray-600
                      flex items-center justify-center
                      font-bold text-lg
                      cursor-pointer
                      transition-colors
                      ${value === 1 ? 'bg-blue-200 dark:bg-blue-800' : 'bg-white dark:bg-gray-700'}
                      ${inGroup ? 'ring-2 ring-green-500 ring-offset-1' : ''}
                      ${readOnly ? 'cursor-default' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}
                    `}
                  >
                    {value}
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="flex gap-2">
          <button
            onClick={() => {
              const cleared = mapValues.map((r) => r.map(() => 0))
              setMapValues(cleared)
              onValuesChange?.(cleared)
              setSelectedGroups([])
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            清除
          </button>
          <button
            onClick={() => {
              // 自動圈選功能（簡化版）
              // 這裡可以實作自動尋找最大群組的演算法
              alert('自動圈選功能開發中')
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            自動圈選
          </button>
        </div>
      )}
    </div>
  )
}

