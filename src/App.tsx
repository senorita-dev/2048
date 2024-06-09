import './App.css'
import Grid from './components/Grid'
import NewGameButton from './components/NewGameButton'
import { GameContext, initialGameState, gameReducer } from './contexts/GameContext'
import { useReducer } from 'react'
import BottomControls from './components/BottomControls'
import Score from './components/Score'

function App() {
  const [gameState, setGameState] = useReducer(gameReducer, initialGameState)
  return (
    <div id="app">
      <GameContext.Provider value={[gameState, setGameState]}>
        <div>
          <NewGameButton />
        </div>
        <Score />
        <Grid />
        <BottomControls />
      </GameContext.Provider>
    </div>
  )
}

export default App
