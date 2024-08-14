import { useGameState } from '../contexts/GameContext'

const Score = () => {
  const { score } = useGameState()
  return <b>Score: {score}</b>
}

export default Score
