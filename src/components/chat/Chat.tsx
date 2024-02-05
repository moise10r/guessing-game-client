"use client";

import Image from "next/image";
import { CustomButton } from "../shared";
import React, { useEffect, useState } from "react";
import { socket } from "@/services/socket.service";
import { WebSocketEvents } from "../../enums/socketevent.enum";
import { IPlayer } from "@/interfaces/player.interface";
import { useGameContext } from "@/context/gameContext/gameContext";

interface ChatData {
  id?: string;
  name: string;
  message: string;
}

export const Chat: React.FC = () => {
  const [joinedPlayers, setJoinedPlayers] = useState<IPlayer[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatData[]>([]);
  const [message, setMessage] = useState<string>("");
  const { name } = useGameContext();

  console.log("joinedPlayers", joinedPlayers);

  useEffect(() => {
    socket.on(WebSocketEvents.CHAT, ({ name, message }) => {
      setChatMessages([...chatMessages, { name, message }]);
      console.log("chat", chatMessages);
    });
    socket.on(WebSocketEvents.PLAYER_ADDED, (players: IPlayer[]) => {
      setJoinedPlayers(players);
    });
    return () => {
      socket.off();
    };
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (!message) {
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
          chat (
          { name && joinedPlayers.length > 0 ? joinedPlayers.length : "0"})
        </h3>
      </div>

      <div className="flex flex-col justify-end bg-dark-blue pt-24 rounded-6 grow">
        {name ? (
          <ul className="px-16">
            {chatMessages.map((chat: ChatData) => (
              <li
                key={chat.name}
                className="w-full flex items-center gap-12 my-8"
              >
                <p className="text-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff4326] to-[#6809dccb]">
                  {chat.name}
                </p>
                <p className="text-white text-10 px-6 py-2 bg-[#eeeeee78] rounded-4">
                  {chat.message}
                </p>
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
