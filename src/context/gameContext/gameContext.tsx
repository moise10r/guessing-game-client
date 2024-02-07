/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { RankPlayer } from "@/interfaces/player.interface";
import { socket } from "@/services/socket.service";
import { WebSocketEvents } from "@/enums/socketevent.enum";
import { IPlayer } from "@/app/dto/playerRound.dto";
import { generateRandomNumber } from "../../../utils/randomNumber";

interface GameContextProps {
  name: string;
  hasJoined: boolean;
  freezePoint: number;
  speed: number;
  score: number;
  isComputing: boolean;
  playersRanking: RankPlayer[];
  joinedPlayers: IPlayer[];
  points: number;
  multiplier: number;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setIsComputing: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayersRanking: React.Dispatch<React.SetStateAction<RankPlayer[]>>;
  setJoinedPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setFreezePoint: React.Dispatch<React.SetStateAction<number>>;
  setHasJoined: React.Dispatch<React.SetStateAction<boolean>>;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  setMultiplier: React.Dispatch<React.SetStateAction<number>>;
  gameStarted: () => void;
}

const defaultPlayerData: GameContextProps = {
  name: "",
  hasJoined: false,
  score: 1000,
  freezePoint: 0,
  speed: 0,
  isComputing: false,
  points: 100,
  multiplier: 2.15,
  playersRanking: [],
  joinedPlayers: [],
  setMultiplier: () => {},
  setPoints: () => {},
  setName: () => {},
  setHasJoined: () => {},
  setSpeed: () => {},
  setScore: () => {},
  setIsComputing: () => {},
  setPlayersRanking: () => {},
  setJoinedPlayers: () => {},
  setFreezePoint: () => {},
  gameStarted: () => {},
};

// Create context
export const PlayerContext = createContext<GameContextProps>(defaultPlayerData);

// Create a custom hook to use the PlayerContext
export const useGameContext = () => {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

const { Provider } = PlayerContext;

const GameProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>(defaultPlayerData.name);
  const [hasJoined, setHasJoined] = useState<boolean>(
    defaultPlayerData.hasJoined
  );

  const [score, setScore] = useState<number>(defaultPlayerData.score);
  const [freezePoint, setFreezePoint] = useState<number>(
    defaultPlayerData.freezePoint
  );
  const [isComputing, setIsComputing] = useState<boolean>(
    defaultPlayerData.isComputing
  );
  const [speed, setSpeed] = useState<number>(defaultPlayerData.speed);
  const [playersRanking, setPlayersRanking] = useState<RankPlayer[]>(
    defaultPlayerData.playersRanking
  );
  const [joinedPlayers, setJoinedPlayers] = useState<IPlayer[]>(
    defaultPlayerData.joinedPlayers
  );

  const [points, setPoints] = useState(defaultPlayerData.points);
  const [multiplier, setMultiplier] = useState(defaultPlayerData.multiplier);

  const gameStarted = () => {
    setIsComputing(true);
    const freezePoint: number = generateRandomNumber(1, 9, 2);
    setFreezePoint(freezePoint);
    
    const data: Omit<IPlayer, 'score'> = {
      name,
      points,
      multiplier,
      freezePoint,
    };
    console.log(data);

    socket.emit(WebSocketEvents.STARTS_ROUND, data);
  };

  useEffect(() => {
    console.log("loaded");

    socket.on(WebSocketEvents.STARTS_ROUND, (initiatorPlayer: IPlayer) => {
      console.log("playerName", initiatorPlayer); // who initialized the game
      const data: Omit<IPlayer, 'score'> = {
        name,
        points,
        multiplier,
        freezePoint: initiatorPlayer.freezePoint
      };
      setFreezePoint(initiatorPlayer.freezePoint);
      console.log("IPlayer", data);
      setIsComputing(true);
      socket.emit(WebSocketEvents.ROUND_STARTED, data);
    });
    socket.on(WebSocketEvents.ROUND_STARTED, (initiatingClientName: string) => {
      console.log(
        "Round has started for initiating client:",
        initiatingClientName
      );
      // Perform actions when the round starts for the initiating client
    });

    //Cleanup: Remove the event listeners when the component is unmounted
    return () => {
      socket.off(WebSocketEvents.STARTS_ROUND);
      socket.off(WebSocketEvents.ROUND_STARTED);
    };
  }, []);

  const providerValues: GameContextProps = {
    name,
    hasJoined,
    setHasJoined,
    setName,
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
    gameStarted,
    points,
    setPoints,
    multiplier,
    setMultiplier,
    joinedPlayers,
    setJoinedPlayers
  };

  return <Provider value={providerValues}>{children}</Provider>;
};

export default GameProvider;
