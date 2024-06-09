import { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

const Score = () => {
  const [{ score }] = useContext(GameContext)
  return <b>Score: {score}</b>
}

export default Score
