import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "../css/DirectionButtons.css";


export const UpButton = () => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="up-button"
      className="direction-button"
      onClick={() => setGameState("moveUp")}
    ></button>
  );
};

export const DownButton = () => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="down-button"
      className="direction-button"
      onClick={() => setGameState("moveDown")}
    ></button>
  );
};

export const LeftButton = () => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="left-button"
      className="direction-button"
      onClick={() => setGameState("moveLeft")}
    ></button>
  );
};

export const RightButton = () => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="right-button"
      className="direction-button"
      onClick={() => setGameState("moveRight")}
    ></button>
  );
};
