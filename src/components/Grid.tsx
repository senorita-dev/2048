import { useEffect, useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import "../css/Grid.css";

const Grid = () => {
  const [{ board, status }, setGameStatus] = useContext(GameContext);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      switch (event.key) {
        case "ArrowUp":
          setGameStatus("moveUp");
          break;
        case "ArrowDown":
          setGameStatus("moveDown");
          break;
        case "ArrowLeft":
          setGameStatus("moveLeft");
          break;
        case "ArrowRight":
          setGameStatus("moveRight");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  switch (status) {
    case "ongoing":
      break;
    case "won":
      break;
    case "lost":
      break;
    default:
      throw new Error("Invalid status");
  }
  return (
    <div className="grid">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className="cell">
            {cell}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
