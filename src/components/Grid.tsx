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
          row.map((cell, colIndex) => {
            if (cell === null) return null
            const key = `${rowIndex}-${colIndex}`
            const top = `${rowIndex * 25}%`
            const left = `${colIndex * 25}%`
            const className = `cell cell-${cell}`
            return <div className={className} key={key} style={{ top, left }}>{cell}</div>
          }),
        )}
      </div>
      <div className="grid">
        {board.map((row, rowIndex) =>
          row.map((_cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`
            const top = `${rowIndex * 25}%`
            const left = `${colIndex * 25}%`
            return <div className="cell-overlay" key={key} style={{ top, left }}></div>
          }),
        )}
      </div>
    </div>
  )
}

export default Grid
