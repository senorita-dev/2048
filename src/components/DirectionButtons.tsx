import { ButtonHTMLAttributes, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import UpChevron from "../assets/up-chevron.svg?react";
import DownChevron from "../assets/down-chevron.svg?react";
import LeftChevron from "../assets/left-chevron.svg?react";
import RightChevron from "../assets/right-chevron.svg?react";
import "../css/DirectionButtons.css";

export const UpButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="up-button"
      className="direction-button"
      onClick={() => setGameState("moveUp")}
      {...props}
    >
      <UpChevron />
    </button>
  );
};

export const DownButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="down-button"
      className="direction-button"
      onClick={() => setGameState("moveDown")}
      {...props}
    >
      <DownChevron />
    </button>
  );
};

export const LeftButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="left-button"
      className="direction-button"
      onClick={() => setGameState("moveLeft")}
      {...props}
    >
      <LeftChevron />
    </button>
  );
};

export const RightButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [, setGameState] = useContext(GameContext);
  return (
    <button
      id="right-button"
      className="direction-button"
      onClick={() => setGameState("moveRight")}
      {...props}
    >
      <RightChevron />
    </button>
  );
};
