import './App.css'
import Footer from './components/Footer'
import Page from './components/Page'
import { initialGameState, gameReducer, GameStateContext, GameDispatchContext } from './contexts/GameContext'
import { useReducer } from 'react'

function App() {
  const [gameState, setGameState] = useReducer(gameReducer, initialGameState)
  return (
    <div id="app">
      <GameStateContext.Provider value={gameState}>
        <GameDispatchContext.Provider value={setGameState}>
          <Page />
          <Footer />
        </GameDispatchContext.Provider>
      </GameStateContext.Provider>
    </div>
  )
}

export default App
