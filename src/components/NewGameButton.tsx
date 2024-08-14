import { useGameDispatch } from '../contexts/GameContext'

const NewGameButton = () => {
  const setGameState = useGameDispatch()
  return <button onClick={() => setGameState('newGame')}>New Game</button>
}

export default NewGameButton
