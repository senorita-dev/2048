import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

const NewGameButton = () => {
  const [, setGameState] = useContext(GameContext);
  return <button onClick={() => setGameState("newGame")}>New Game</button>;
};

export default NewGameButton;
