import Image from 'next/image';
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { CustomButton } from '../shared';

type Props = {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const RoundController: React.FC<Props> = ({
  label,
  value,
  onIncrement,
  onDecrement
}) => {

  console.log('value', value);
  return (
    <div className="text-center px-8 py-4 border border-[#1a1d26] rounded-8">
      <p className="text-8 text-[#8c94a8] mb-2">
        {label}
      </p>

      <div className='flex items-center justify-center gap-4 h-[32px]'>
        <CustomButton
          variant="bordered"
          radius="sm"
          text=""
          endIcon={<BiSolidDownArrow />}
          handleClick={onDecrement}
          className="max-w-[20px] h-full p-0 border-[#1a1d26] text-white"
        />
        <div className='h-full text-white text-16 text-center'>
          <p className="text-while h-full w-[80px] leading-[32px] bg-[#000] rounded-8">
            {parseFloat(value.toPrecision(3))}
          </p>
        </div>
        <CustomButton
          variant="bordered"
          radius="sm"
          text=""
          endIcon={<BiSolidUpArrow />}
          handleClick={onIncrement}
          className="w-[20px] h-full p-0 border-[#1a1d26] text-white"
        />
      </div>
    </div>
  )
}
