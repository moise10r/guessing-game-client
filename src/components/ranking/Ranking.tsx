'use client';
import { useGameContext } from "@/context/gameContext/gameContext";
import { RankPlayer } from "@/interfaces/player.interface";
import Image from "next/image";

export const Ranking: React.FC = () => {

  let tableIndx = 1

  const {
   playersRanking
  } = useGameContext();

  const sortedRowsData = [...playersRanking].sort((a, b) => a.score - b.score);

  return (
       <article className="w-6/12 md:min-w-[480px] grow">
      <div className="flex items-center gap-4 mb-20">
        <Image
          src="/images/ranking.png"
          alt="Logo"
          width={25}
          height={25}
        />
        <h3 className="text-white text-18">Ranking</h3>
      </div>

      <ul className="w-full flex flex-col items-center  border border-[#1a1d26] mx-w-[250px] overflow-scroll rounded-6">
        <li className="w-full flex items-center justify-between pl-28 py-8 text-12 text-[#8c94a8]">
          <p className="flex-1 text-md">No</p>
          <p className="flex-1 text-sm">Name</p>
          <p className="flex-1 text-sm">Score</p>
        </li>
        <li className="w-full">
          <ul className="w-full flex flex-col items-center  [&>li:nth-child(even)]:bg-dark-blue">
            {!!sortedRowsData.length?sortedRowsData.map((player: RankPlayer, index:number) => (
              <li key={index} className="w-full flex items-center justify-between gap-24 px-24 py-8 bg-[#232833]">
                <p className="flex-1 text-white text-sm">{tableIndx++}</p>
                <p className="flex-1 text-white text-sm">{player.name}</p>
                <p className="flex-1 text-white text-sm">{player.score}</p>
              </li>
            )): [...Array(5)].map((i: number,index:number) => (
              <li key={index} className="w-full flex items-center justify-between gap-24 px-24 py-8 bg-[#232833]">
                <p className="text-white flex-1">- </p>
                <p className="text-white flex-1">- </p>
                <p className="text-white flex-1">- </p>

              </li>
            ))}
          </ul>

        </li>
      </ul>
    </article>
  )
}
