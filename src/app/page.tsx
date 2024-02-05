"use client";

import { useState } from "react";
import Image from "next/image";
import { Login } from "@/components/login/Login";
import { RoundController } from "@/components/round-controller/RoundController";
import { usePlayerInfoContext } from "@/context/playerContext";
import { CurrentRound } from "@/components/current-round/CurrentRound";
import { Ranking } from "@/components/ranking/Ranking";
import { Chat } from "@/components/chat/Chat";

const columns = [
  {
    key: "No.",
    label: "No",
  },
  {
    key: "Name",
    label: "NAME",
  },
  {
    key: "Score",
    label: "SCORE",
  },
];

export default function Home() {
  const [points, setPoints] = useState(100);
  const [multiplier, setMultiplier] = useState(2.15);
  const { playerInfo, setPlayerInfo } = usePlayerInfoContext();

  const headerItems = [
    {
      icon: "/images/medal.webp",
      text: "Home",
      size: "md",
    },
    {
      icon: "/images/player-profile.png",
      text: "Guest",
      size: "sm",
    },
    {
      icon: "/images/clock.webp",
      text: new Date().toLocaleTimeString(),
      size: "sm",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center py-32 px-24 bg-black">
      <div className="w-full max-w-7xl min-h-[480px] flex justify-center flex-wrap gap-16 lg:flex-nowrap">
        <div className="grow w-2/5 max-w-[480px]">
          {playerInfo.hasJoined ? (
            <>
              <div className="flex items-center justify-around">
                <RoundController
                  label="Points"
                  value={points}
                  onIncrement={() => {
                    setPoints((previous: number) => previous + 1);
                  }}
                  onDecrement={() => {
                    setPoints((previous: number) => previous - 1);
                  }}
                />
                <RoundController
                  label="Multipilier"
                  value={multiplier}
                  onIncrement={() => {
                    setMultiplier((previous: number) => previous + 1);
                  }}
                  onDecrement={() => {
                    setMultiplier((previous: number) => previous - 1);
                  }}
                />
              </div>
              <CurrentRound />
            </>
          ) : (
            <Login />
          )}
        </div>

        <div className="grow w-7/12 flex flex-col">
          <ul className="h-[48px] w-full flex items-center gap-16 mb-16">
            {headerItems.map((item, index: number) => (
              <li
                key={index}
                className={`h-full flex flex-1 items-center gap-8 rounded-8 bg-gradient-to-r from-[#181b24] ${
                  index === 0 ? "to-dark-blue" : "bg-dark-blue"
                }`}
              >
                <Image src={item.icon} alt="Logo" width={40} height={40} />
                <p className={`text-white text-${item.size}`}>{item.text}</p>
              </li>
            ))}
          </ul>

          <div className="w-full grow bg-dark-blue border border-[#5a6374] rounded-small"></div>
        </div>
      </div>

      <div className="w-full max-w-7xl flex gap-16 flex-wrap mt-24">
        <Ranking />
        <Chat/>
      </div>
    </div>
  );
}
