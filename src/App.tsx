import "./App.css";
import Grid from "./components/Grid";
import NewGameButton from "./components/NewGameButton";
import {
  GameContext,
  initialGameState,
  gameReducer,
} from "./contexts/GameContext";
import { ServiceContext, gameManagerService } from "./modules/contexts/Context";
import { useReducer } from "react";
import BottomControls from "./components/BottomControls";

function App() {
  const [gameState, setGameState] = useReducer(gameReducer, initialGameState);
  return (
    <div id="app">
      <ServiceContext.Provider value={{ gameManagerService }}>
        <GameContext.Provider value={[gameState, setGameState]}>
          <div>
            <NewGameButton />
          </div>
          <Grid />
          <BottomControls />
        </GameContext.Provider>
      </ServiceContext.Provider>
    </div>
  );
}

export default App;
