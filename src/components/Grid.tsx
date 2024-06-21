import { useEffect, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import '../css/Grid.css'

const Grid = () => {
  const [gameStatus, setGameStatus] = useContext(GameContext)
  const { board, status, prevBoard, newCells, mergedCells, movedCells } = gameStatus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return
      switch (event.key) {
        case 'ArrowUp':
          setGameStatus('moveUp')
          break
        case 'ArrowDown':
          setGameStatus('moveDown')
          break
        case 'ArrowLeft':
          setGameStatus('moveLeft')
          break
        case 'ArrowRight':
          setGameStatus('moveRight')
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  switch (status) {
    case 'ongoing':
      break
    case 'won':
      break
    case 'lost':
      break
    default:
      throw new Error('Invalid status')
  }
  return (
    <div className="grid-container">
      <div className="grid">
        {board.map((row, rowIndex) =>
          row.map((_cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`
            const top = `${rowIndex * 25}%`
            const left = `${colIndex * 25}%`
            return (
              <div className="cell-container" key={key} style={{ top, left }}>
                <div className="cell-background"></div>
              </div>
            )
          }),
        )}
      </div>
      <div className="grid">
        {prevBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            if (cell === null) return null
            const key = `${rowIndex}-${colIndex}`
            let top = `${rowIndex * 25}%`
            let left = `${colIndex * 25}%`
            let transform: string | undefined = undefined
            let containerClassName = 'cell-container'
            const movedCell = movedCells.find(([row, col]) => row === rowIndex && col === colIndex)
            if (movedCell === undefined) {
              containerClassName += ' cell-previous'
            } else {
              containerClassName += ' cell-moved'
              const [fromRow, fromCol, toRow, toCol] = movedCell
              top = `${toRow * 25}%`
              left = `${toCol * 25}%`
              transform = `translate(${(fromCol - toCol) * 100}%, ${(fromRow - toRow) * 100}%)`
            }
            const className = `cell cell-${cell}`
            return (
              <div key={key} className={containerClassName} style={{ top, left, transform }}>
                <div className={className}>{cell}</div>
              </div>
            )
          }),
        )}
        {newCells.map(([row, col]) => {
          const key = `${row}-${col}`
          const top = `${row * 25}%`
          const left = `${col * 25}%`
          const cell = board[row][col]
          const className = `cell cell-${cell}`
          return (
            <div key={key} style={{ top, left }} className="cell-container cell-new">
              <div className={className}>{cell}</div>
            </div>
          )
        })}
        {mergedCells.map(([row, col]) => {
          const key = `${row}-${col}`
          const top = `${row * 25}%`
          const left = `${col * 25}%`
          const cell = board[row][col]
          const className = `cell cell-${cell}`
          return (
            <div key={key} style={{ top, left }} className="cell-container cell-merged">
              <div className={className}>{cell}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Grid
