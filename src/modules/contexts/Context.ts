import React from "react";
import { GameManagerService } from "../services/GameManagerService";

interface ServiceContextType {
  gameManagerService: GameManagerService;
}

export const gameManagerService = new GameManagerService();

export const ServiceContext = React.createContext<ServiceContextType>({
  gameManagerService,
});
