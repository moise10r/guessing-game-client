'use client';

import Image from "next/image";
import { CustomButton } from "..";

export const Chat: React.FC = () => {

  interface ChatData {
    id: string;
    name: string;
    message: string;
  }

  const chatData: ChatData[] = [
    {
      id: "1",
      name: "CPU 1",
      message: "hi guys",
    },
    {
      id: "2",
      name: "CPU 2",
      message: "Hi, how are you doing?",
    },
    {
      id: "3",
      name: "CPU 1",
      message: "I am good, how about you?",
    },
  ];

  return (
    <article className="w-5/12 min-w-[375px] grow flex flex-col">
      <div className="flex items-center gap-4 mb-20">
        <Image
          src="/images/chat.png"
          alt="Logo"
          width={20}
          height={20}
        />
        <h3 className="text-white text-18">Chat</h3>
      </div>

      <div className="flex flex-col justify-end bg-dark-blue pt-24 rounded-6 grow">
        <ul className="px-16">
          {chatData.map((chat: ChatData) => (
            <li key={chat.id} className="w-full flex items-center gap-12 my-8">
              <p className="text-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#ff4326] to-[#6809dccb]">
                {chat.name}
              </p>
              <p className="text-white text-10 px-6 py-2 bg-[#eeeeee78] rounded-4">
                {chat.message}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-8 p-16 bg-[#232833] rounded-br-8 rounded-bl-8">
          <div className="w-full">
            <input
              type="text"
              className="bg-dark-blue rounded-8 w-full h-[42px] px-12 py-8 text-white" />
          </div>
          <CustomButton color="secondary" radius="sm"
            text="Start"
            className="h-[44px] w-[140px] font-semibold text-white bg-gradient-to-r from-[#e53d79] to-[#f75753]"
          // handleClick={() => (console.log("Candidate"))}
          />
        </div>

      </div>

    </article>
  )
}

