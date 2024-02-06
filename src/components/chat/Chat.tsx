"use client";

import Image from "next/image";
import { CustomButton } from "../shared";
import React, { useEffect, useState } from "react";
import { socket } from "@/services/socket.service";
import { WebSocketEvents } from "../../enums/socketevent.enum";
import { useGameContext } from "@/context/gameContext/gameContext";
import { IPlayer } from "@/app/dto/playerRound.dto";
import { computerScoreForPlayer } from "../../../utils/computerPlayerScore";
import { RankPlayer } from "@/interfaces/player.interface";

interface ChatData {
  id?: string;
  name: string;
  message: string;
}

export const Chat: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatData[]>([]);
  const [message, setMessage] = useState<string>("");
  const {
    name,
    points,
    multiplier,
    setIsComputing,
    joinedPlayers,
    setJoinedPlayers,
    setFreezePoint,
    score,
    freezePoint,
    setPlayersRanking,
    setScore,
    isComputing
  } = useGameContext();

  useEffect(() => {
    console.log("joinedPlayersmultiplier", multiplier);
    socket.on(WebSocketEvents.CHAT, ({ name, message }) => {
      setChatMessages([...chatMessages, { name, message }]);
      console.log("chat", chatMessages);
    });
    socket.on(WebSocketEvents.PLAYER_ADDED, (players: IPlayer[]) => {
      setJoinedPlayers(players);
    });

    socket.on(WebSocketEvents.ROUND_ENDED, () => {
        const player = {
          name,
          multiplier,
          score,
          points,
          freezePoint,
        };
        // only only players who is not computed
        if(isComputing){
        const rankPlayer = computerScoreForPlayer(player);
        console.log("rankPlayer", rankPlayer);
        setScore(rankPlayer.score);
        socket.emit(WebSocketEvents.SEND_SCORE, rankPlayer);
        setIsComputing(false);
      }
    });

    socket.on(WebSocketEvents.SEND_SCORE, (players: RankPlayer[]) => {
      setPlayersRanking(players);
    });

    socket.on(WebSocketEvents.STARTS_ROUND, (initiatorPlayer: IPlayer) => {
      console.log("playerName", initiatorPlayer); // who initialized the game
      console.log("joinedPlayersmultiplier", multiplier);
      const data: Omit<IPlayer, "score"> = {
        name,
        points,
        multiplier,
        freezePoint: initiatorPlayer.freezePoint,
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
    return () => {
      socket.off();
    };
  }, [
    chatMessages,
    freezePoint,
    multiplier,
    name,
    points,
    score,
    setFreezePoint,
    setIsComputing,
    setJoinedPlayers,
    setPlayersRanking,
    setScore
  ]);

  const handleSendMessage = () => {
    if (!message) {
      // toast notification
      return;
    } else {
      socket.on(WebSocketEvents.CHAT, ({ name, message }) => {
        setChatMessages([...chatMessages, { name, message }]);
        console.log("chat", chatMessages);
      });
      socket.emit(WebSocketEvents.CHAT, { name, message });
      setChatMessages([...chatMessages, { name, message }]);
      // clean the input
      setMessage("");
    }
  };
  return (
    <article className="w-5/12 min-w-[375px] grow flex flex-col">
      <div className="flex items-center gap-4 mb-20">
        <Image src="/images/chat.png" alt="Logo" width={20} height={20} />
        <h3 className="text-white text-18">
          Chat ({name && joinedPlayers.length > 0 ? joinedPlayers.length : "0"})
        </h3>
      </div>

      <div className="flex flex-col justify-end bg-dark-blue pt-24 rounded-6 grow">
        {name ? (
          <ul className="px-16 max-h-[140px] min-h-[140px] scroll-auto">
            {chatMessages.map((chat: ChatData, index: number) => (
              <li
                key={index}
                className={`w-full flex ${
                  chat.name === name ? "justify-end" : "items-center"
                } gap-12 my-8`}
              >
                {chat.name === name ? (
                  <>
                    <p className="text-white text-10 px-6 py-2 bg-[#eeeeee78] rounded-4">
                      {chat.message}
                    </p>
                    <p className="text-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff4326] to-[#6809dccb]">
                      {chat.name}
                    </p>
                  </>
                ) : (
                  <>
                    {" "}
                    <p className="text-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff4326] to-[#6809dccb]">
                      {chat.name}
                    </p>
                    <p className="text-white text-10 px-6 py-2 bg-[#eeeeee78] rounded-4">
                      {chat.message}
                    </p>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <div className="flex items-center gap-8 p-16 bg-[#232833] rounded-br-8 rounded-bl-8">
          <div className="w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-dark-blue rounded-8 w-full h-[42px] px-12 py-8 text-white"
            />
          </div>
          <CustomButton
            color="secondary"
            radius="sm"
            text="Start"
            className="h-[44px] w-[140px] font-semibold text-white bg-gradient-to-r from-[#e53d79] to-[#f75753]"
            handleClick={handleSendMessage}
          />
        </div>
      </div>
    </article>
  );
};
