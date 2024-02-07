import React, { PureComponent, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer

} from "recharts";
import CountUp from "react-countup";
import { useGameContext } from "@/context/gameContext/gameContext";
import { socket } from "@/services/socket.service";
import { WebSocketEvents } from "@/enums/socketevent.enum";
import { toast } from "sonner";


const GraphBoard = () => {
  const { freezePoint, speed, isComputing, score, name, multiplier,points, setScore } = useGameContext();
  const graphValue = [{ value: 0 }, { value: 0 }, { value: freezePoint }];
  const [isRoundEnded, setIsRoundEnded] = useState<boolean>(false);

  function duration() {
    return 3000 + 1000 * speed;
  }
console.log('freezePoint',freezePoint);

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const muliplierWatchedValue = mutation.addedNodes[0].nodeValue;
        if (muliplierWatchedValue) {
          const rasiedMultiplier = muliplierWatchedValue.match(/[\d.]+/); // get the number value expect x
          if (rasiedMultiplier && rasiedMultiplier.length > 0) {
            const number = +rasiedMultiplier[0];
            if (number === freezePoint && freezePoint !== 0) {
                observer.disconnect()
                socket.emit(WebSocketEvents.ROUND_ENDED)
                setIsRoundEnded(true)
                toast.success('Game session ended')
            }
          }
        }
      });
    });

    const counter = document.querySelector("#counter") as HTMLElement;
    const span = counter.querySelector("span") as HTMLElement;

    observer.observe(span, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [freezePoint, isComputing]);

  const customTicks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full">
      <div className="graph-container relative flex justify-center items-center p-2 h-[300px] w-[700px]">
        <div className={`${isRoundEnded?'text-[#f14e5f]':'text-white'} text-[64px] absolute z-50 top-[20px] right-[25%] font-extrabold`} id="counter">
          <CountUp
            start={0}
            end={freezePoint}
            redraw={false}
            duration={duration() / 1000}
            separator=" "
            decimals={2}
            decimal="."
            prefix=""
            suffix="x"
          ></CountUp>
        </div>
         <div className="w-[98%] mx-auto">
             <LineChart
              width={700}
              height={300}
              key={Math.random()}
                     >
              <Line
                type="monotone"
                dataKey="value"
                strokeWidth={6}
                stroke="#fb544e"
                data={graphValue}
                dot={false}
                animationDuration={duration()}
                hide={freezePoint === 0}
              />
              <YAxis domain={[0, 10]} hide={true} />
              <XAxis dataKey={'value'}  domain={[1, 10]} label={{ value: '', position: 'insideBottom', offset: -10,  }}
              axisLine={{ stroke: '#5a6373', strokeWidth: 1 }} tickLine={false} ticks={customTicks}
              tick={{ stroke: '#5a6373', strokeWidth: 0.5 }} style={{paddingTop:'10px'}} />
                     </LineChart>
         </div>
      </div>
    </div>
  );
};

export default GraphBoard;
