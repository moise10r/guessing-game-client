"use client";

import React from "react";
import { ThemeProvider } from "./themeProvider";
import GameProvider from "@/context/gameContext/gameContext";
import { SocketProvider } from "@/context/socketContext/socketContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <GameProvider>
        <SocketProvider>{children}</SocketProvider>
      </GameProvider>
    </ThemeProvider>
  );
};
