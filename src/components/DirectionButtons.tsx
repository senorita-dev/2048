import { ButtonHTMLAttributes, useContext } from 'react'
import { GameContext } from '../contexts/GameContext'
import UpChevron from '../assets/up-chevron.svg?react'
import DownChevron from '../assets/down-chevron.svg?react'
import LeftChevron from '../assets/left-chevron.svg?react'
import RightChevron from '../assets/right-chevron.svg?react'
import '../css/DirectionButtons.css'

export const UpButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [{ canMove, status }, setGameState] = useContext(GameContext)
  const disabled = !canMove.up || status === 'lost' || status === 'won'
  return (
    <button
      id="up-button"
      className="direction-button"
      onClick={() => setGameState('moveUp')}
      disabled={disabled}
      {...props}
    >
      <UpChevron />
    </button>
  )
}

export const DownButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [{ canMove, status }, setGameState] = useContext(GameContext)
  const disabled = !canMove.down || status === 'lost' || status === 'won'
  return (
    <button
      id="down-button"
      className="direction-button"
      onClick={() => setGameState('moveDown')}
      disabled={disabled}
      {...props}
    >
      <DownChevron />
    </button>
  )
}

export const LeftButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [{ canMove, status }, setGameState] = useContext(GameContext)
  const disabled = !canMove.left || status === 'lost' || status === 'won'
  return (
    <button
      id="left-button"
      className="direction-button"
      onClick={() => setGameState('moveLeft')}
      disabled={disabled}
      {...props}
    >
      <LeftChevron />
    </button>
  )
}

export const RightButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [{ canMove, status }, setGameState] = useContext(GameContext)
  const disabled = !canMove.right || status === 'lost' || status === 'won'
  return (
    <button
      id="right-button"
      className="direction-button"
      onClick={() => setGameState('moveRight')}
      disabled={disabled}
      {...props}
    >
      <RightChevron />
    </button>
  )
}
