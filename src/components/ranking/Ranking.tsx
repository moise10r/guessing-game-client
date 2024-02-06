'use client';
import { useGameContext } from "@/context/gameContext/gameContext";
import { RankPlayer } from "@/interfaces/player.interface";
import Image from "next/image";

export const Ranking: React.FC = () => {
  const rowsData = [
    {
      key: "1",
      name: "Tony Reichert",
      score: 2,
    },
    {
      key: "2",
      name: "Zoey Lang",
      score: 332,
    },
    {
      key: "3",
      name: "Jane Fisher",
      score: 323,
    },
    {
      key: "4",
      name: "William Howard",
      score: 443,
    },
    {
      key: "5",
      name: "Kathryn Murphy",
      score: 543,
    }
  ];

  let tableIndx = 0

  const {
   playersRanking
  } = useGameContext();

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

      <ul className="w-full flex flex-col items-center  border border-[#1a1d26] rounded-6">
        <li className="w-full flex items-center justify-between pl-28 py-8 text-12 text-[#8c94a8]">
          <p className="flex-1 text-md">No</p>
          <p className="flex-1 text-sm">Name</p>
          <p className="flex-1 text-sm">Score</p>
        </li>
        <li className="w-full">
          <ul className="w-full flex flex-col items-center  [&>li:nth-child(even)]:bg-dark-blue">
            {playersRanking.map((player: RankPlayer, index:number) => (
              <li key={index} className="w-full flex items-center justify-between gap-24 px-24 py-8 bg-[#232833]">
                <p className="flex-1 text-white text-sm">{tableIndx++}</p>
                <p className="flex-1 text-white text-sm">{player.name}</p>
                <p className="flex-1 text-white text-sm">{player.score}</p>
              </li>
            ))}
          </ul>

        </li>
      </ul>
    </article>
  )
}
