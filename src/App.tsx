import "./App.css";
import Grid from "./components/Grid";
import NewGameButton from "./components/NewGameButton";
import {
  GameContext,
  initialGameState,
  gameReducer,
} from "./contexts/GameContext";
import { useReducer } from "react";
import {
  UpButton,
  DownButton,
  LeftButton,
  RightButton,
} from "./components/DirectionButtons";

function App() {
  const [gameState, setGameState] = useReducer(gameReducer, initialGameState);
  return (
    <div id="app">
      <GameContext.Provider value={[gameState, setGameState]}>
        <div>
          <NewGameButton />
        </div>
        <Grid />
        <div>
          <UpButton />
          <DownButton />
          <LeftButton />
          <RightButton />
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default App;
