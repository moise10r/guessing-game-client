"use client";
import React, { createContext, useState, ReactNode } from "react";
import { NextPage } from "next";
import { IPlayer } from "@/interfaces/player.interface";


interface GameContextProps {
  name: string;
  hasJoined: boolean;
  freezePoint: number;
  speed: number;
  score: number;
  isComputing: boolean;
  playersRanking: IPlayer[];
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setIsComputing: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayersRanking: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setFreezePoint: React.Dispatch<React.SetStateAction<number>>;
  setHasJoined: React.Dispatch<React.SetStateAction<boolean>>;
  
}

const defaultPlayerData: GameContextProps = {
  name: "",
  hasJoined: false,
  score: 1000,
  freezePoint: 0,
  speed: 0,
  isComputing: false,
  playersRanking: [],
  setPlayerName: () => {},
  setHasJoined: () => {},
  setSpeed: () => {},
  setScore: () => {},
  setIsComputing: () => {},
  setPlayersRanking: () => {},
  setFreezePoint: () => {},
};

// Create context
export const PlayerContext = createContext<GameContextProps>(defaultPlayerData);

// Create a custom hook to use the PlayerContext
export const useGameContext = () => {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error(
      "useGameContext must be used within a GameProvider"
    );
  }
  return context;
};

const { Provider } = PlayerContext;

const GameProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [name, setPlayerName] = useState<string>(
    defaultPlayerData.name
  );
  const [hasJoined, setHasJoined] = useState<boolean>(
    defaultPlayerData.hasJoined
  );
  console.log('name',name);
  
  const [score, setScore] = useState<number>(
    defaultPlayerData.score
  );
  const [freezePoint, setFreezePoint] = useState<number>(
    defaultPlayerData.freezePoint
  );
  const [isComputing, setIsComputing] = useState<boolean>(
    defaultPlayerData.isComputing
  );
  const [speed, setSpeed] = useState<number>(
    defaultPlayerData.speed
  );
  const [playersRanking, setPlayersRanking] = useState<IPlayer[]>(
    defaultPlayerData.playersRanking
  );

  const providerValues: GameContextProps = {
    name,
    hasJoined, 
    setHasJoined,
    setPlayerName,
    score,
    setScore,
    freezePoint,
    setFreezePoint,
    speed,
    setSpeed,
    isComputing,
    setIsComputing,
    playersRanking,
    setPlayersRanking,
  };

  return <Provider value={providerValues}>{children}</Provider>;
};

export default GameProvider;
