'use client';
import React, { createContext, useState, ReactNode } from 'react';
import { NextPage } from 'next';


type PlayerDataT = {
  name: string;
  email?: string;
  hasJoined: boolean;
}

interface PlayerContextProps {
  playerInfo: PlayerDataT;
  setPlayerInfo: React.Dispatch<React.SetStateAction<PlayerDataT>>;
}

const defaultPlayerData: PlayerContextProps = {
  playerInfo: {
    name: '',
    hasJoined: false,
  },
  setPlayerInfo: () => { },
};

// Create context
export const PlayerContext = createContext<PlayerContextProps>(defaultPlayerData);

// Create a custom hook to use the PlayerContext
export const usePlayerInfoContext = () => {
  const context = React.useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerInfoContext must be used within a PlayerProvider');
  }
  return context;
};

const { Provider } = PlayerContext;

const PlayerProvider: NextPage<{ children: ReactNode }> = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerDataT>(defaultPlayerData.playerInfo);


  const providerValues: PlayerContextProps = {
    playerInfo,
    setPlayerInfo,
  };

  return (
    <Provider value={providerValues}>
      {children}
    </Provider>
  );
}

export default PlayerProvider;