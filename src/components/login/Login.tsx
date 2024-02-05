'use client';
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { usePlayerInfoContext } from "@/context/playerContext";
import { CustomButton } from "../shared";


export const Login: React.FC = () => {
  const { playerInfo, setPlayerInfo } = usePlayerInfoContext();
  console.log('playerInfo', playerInfo);
  let isDesabled = ((playerInfo?.name?.length) || 0) <= 3;

  return (
    <Card className="flex flex-col w-full h-full bg-dark-blue border border-[#5a6374] rounded-small py-48 px-20">
      <CardHeader className="flex justify-center">
        <h2 className="text-20 text-[#afb7ca]">Welcome</h2>
      </CardHeader>

      <CardBody className="flex flex-col items-center justify-center grow">
        <p className="text-[#5a6374] mb-16">
          Please insert Your Name
        </p>
        <div className="mb-8 w-full">
          <input
            type="text"
            value={playerInfo.name}
            onChange={(e) => setPlayerInfo({ ...playerInfo, name: e.target.value })}
            className="bg-[#000] border border-[#5a6374] rounded-8 w-full h-[48px] px-12 py-8 text-white"
          />
        </div>

        <CustomButton color="secondary" radius="sm" fullWidth
          text="Accept"
          isDisabled={isDesabled}
          // variant=""
          className={`h-[42px] text-white bg-gradient-to-r
           ${isDesabled ? 'from-[#5a6374] to-[#5a6374]' : 'from-[#e53d79] to-[#f75753]'}
            `}
          handleClick={() => setPlayerInfo({ ...playerInfo, hasJoined: true })}
        />

      </CardBody>
    </Card>
  );
}
