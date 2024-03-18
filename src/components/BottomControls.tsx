import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import {
  UpButton,
  DownButton,
  LeftButton,
  RightButton,
} from "./DirectionButtons";

const BottomControls = () => {
  const [{ status }] = useContext(GameContext);
  const disabled = status === "lost";
  return (
    <div>
      <UpButton disabled={disabled} />
      <DownButton disabled={disabled} />
      <LeftButton disabled={disabled} />
      <RightButton disabled={disabled} />
    </div>
  );
};

export default BottomControls;
