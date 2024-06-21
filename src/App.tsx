import './App.css'
import Page from './components/Page'
import { GameContext, initialGameState, gameReducer } from './contexts/GameContext'
import { useReducer } from 'react'

function App() {
  const [gameState, setGameState] = useReducer(gameReducer, initialGameState)
  return (
    <div id="app">
      <GameContext.Provider value={[gameState, setGameState]}>
        <Page />
      </GameContext.Provider>
    </div>
  )
}

export default App
