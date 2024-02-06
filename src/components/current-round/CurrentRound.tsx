import React, { useState } from "react";
import Slider from "@mui/material/Slider";

import Image from "next/image";
import { CustomButton } from "../shared";
import { useGameContext } from "@/context/gameContext/gameContext";
import { IPlayer } from "@/app/dto/playerRound.dto";
import { movePlayerToFirst } from "../../../utils/sortPlayers";

interface CurrentRoundData {
  name: string;
  point: string;
  multiple: string;
}

export const CurrentRound = () => {
  const {
    gameStarted,
    isComputing,
    name,
    setSpeed,
    joinedPlayers,
    freezePoint,
  } = useGameContext();
  const [speedStep, setSpeedStep] = useState(0);

  const sortedPlayers = movePlayerToFirst(joinedPlayers, name);

  const rowsData: CurrentRoundData[] = [
    {
      name: "CPU 1",
      point: "-",
      multiple: "-",
    },
    {
      point: "2",
      name: "CPU 2",
      multiple: "-",
    },
    {
      name: "CPU 3",
      point: "-",
      multiple: "-",
    },
    {
      name: "CPU 4",
      point: "-",
      multiple: "-",
    },
  ];

  const speedMarks = [
    {
      value: 0,
      label: "1x",
    },
    {
      value: 25,
      label: "2x",
    },
    {
      value: 50,
      label: "3x",
    },
    {
      value: 75,
      label: "4x",
    },
    {
      value: 100,
      label: "5x",
    },
  ];

  const handleSpeed = (value: number): void => {
    setSpeedStep(value);
    if (value === 0) setSpeed(1);
    if (value === 25) setSpeed(2);
    if (value === 50) setSpeed(3);
    if (value === 75) setSpeed(4);
    if (value === 100) setSpeed(5);
  };

  return (
    <div className="flex flex-col w-full h-full rounded-small py-48 px-20">
      <CustomButton
        color="secondary"
        radius="sm"
        fullWidth
        text={isComputing ? "Started" : "Start"}
        handleClick={gameStarted}
        className={`h-[48px] text-white bg-gradient-to-r
        ${
          isComputing
            ? "from-[#5a6374] to-[#5a6374] cursor-not-allowed"
            : "from-[#e53d79] to-[#f75753]"
        }
         `}
      />

      <div className="flex items-center gap-8 my-20">
        <Image
          src="/images/trophy-cup.webp"
          alt="Logo"
          width={25}
          height={25}
        />
        <h3 className="text-white text-18">Current Round</h3>
      </div>

      <ul className="w-full flex flex-col items-center border border-[#1a1d26] rounded-6">
        <li className="w-full flex items-center justify-between pl-28 py-8 text-12 text-[#8c94a8]">
          <p className="flex-1 text-md">No</p>
          <p className="flex-1 text-sm">Name</p>
          <p className="flex-1 text-sm">Score</p>
        </li>
        <li className="w-full">
          <ul className="w-full flex flex-col items-center">
            {sortedPlayers.map((player: IPlayer, index: number) => (
              <li
                key={index}
                className={`w-full flex items-center justify-between gap-24 px-24 py-8 bg-${
                  index % 2 === 0 ? "dark-blue" : "#232833"
                }`}
              >
                <p
                  className={`flex-1 ${
                    player.multiplier < freezePoint
                      ? "text-[#15803d]"
                      : player.multiplier > freezePoint
                      ? "text-[#9f1239]"
                      : "text-white"
                  }`}
                >
                  {player.name === name ? "You" : player.name}
                </p>
                <p  className={`flex-1 ${
                    player.multiplier < freezePoint
                      ? "text-[#15803d]"
                      : player.multiplier > freezePoint
                      ? "text-[#9f1239]"
                      : "text-white"
                  }`}>
                  {player.points ?? "-"}
                </p>
                <p  className={`flex-1 ${
                    player.multiplier < freezePoint
                      ? "text-[#15803d]"
                      : player.multiplier > freezePoint
                      ? "text-[#9f1239]"
                      : "text-white"
                  }`}>
                  {player.multiplier ?? "-"}
                </p>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="flex items-center gap-8 my-20">
        <Image
          src="/images/speedometer.svg"
          alt="Logo"
          width={25}
          height={25}
        />
        <h3 className="text-white text-18">Speed</h3>
      </div>

      <div className="w-full flex items-center py-24 bg-dark-blue border border-[#5a6374] rounded-small">
        <div className="w-full h-[48px] flex items-center px-24">
          <Slider
            aria-label="Temperature"
            defaultValue={0}
            value={speedStep}
            onChange={(e, value: number): void => handleSpeed(value)}
            // getAriaValueText={valuetext}
            valueLabelDisplay="off"
            step={25}
            marks={speedMarks}
            // min={10}
            // max={110}
            classes={{
              root: "w-full ",
              thumb:
                "w-[25px] h-[25px] bg-[#e53d79] bg-gradient-to-r from-[#e53d79] to-[#f75753] border-2 border-white rounded-small",
              track: "h-[4px] bg-[#e53d79]",
            }}
            sx={{
              color: "#afb7ca",
              background: "",
              "MuiSlider-valueLabel": {
                color: "white",
              },
              "MuiSlider-valueLabelLabel": {
                color: "white !important",
              },
              // Style the marks label with different colors
              "& .MuiSlider-markLabel": {
                color: "white",
              },
              "& .MuiSlider-markLabelActive": {
                background: "bg-gradient-to-r from-[#ff4326] to-[#6809dccb]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
