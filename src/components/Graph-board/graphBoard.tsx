import React, { PureComponent, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  DotProps,

} from "recharts";
import CountUp from "react-countup";
import { useGameContext } from "@/context/gameContext/gameContext";
import { socket } from "@/services/socket.service";
import { WebSocketEvents } from "@/enums/socketevent.enum";
import { toast } from "sonner";


const CustomDot: React.FC<DotProps> = ({ cx, cy }) => (
  <svg>
    <circle cx={cx} cy={cy} r={5} fill="#fb544e" />
  </svg>
);

const GraphBoard = () => {
  const { freezePoint, speed, isComputing, setFreezePoint } = useGameContext();
  const lineGraphData = [{ t: 0 }, { t: 0 }, { t: freezePoint }];
  const [isRoundEnded, setIsRoundEnded] = useState<boolean>(false);
  const axisValues = Array.from({ length: 11 }, (_, index) => ({ t: index }));
  function duration() {
    return 3000 + (1000 * speed);
  }

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        const muliplierWatchedValue = mutation.addedNodes[0].nodeValue;
        if (muliplierWatchedValue) {
          const rasiedMultiplier = muliplierWatchedValue.match(/[\d.]+/); // get the number value expect x
          if (rasiedMultiplier && rasiedMultiplier.length > 0) {
            const watchedRaisedMultiplier = +rasiedMultiplier[0];
            if (watchedRaisedMultiplier === freezePoint && freezePoint !== 0) {
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
  console.log('render');


  return (
    <div className="w-full flex items-center justify-center">
      <div className="graph-container relative flex justify-center items-center p-2 h-[300px] w-[700px]">
        <div className={`${isRoundEnded ? 'text-[#f14e5f]' : 'text-white'} drop-shadow-md text-[64px] absolute z-50 top-[-50px] right-[25%] font-extrabold  left-1/2 transform -translate-x-1/2`} id="counter">
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
        <div className="w-full h-full relative">
          <div className="w-[98%] mx-auto absolute top-0 right-0 bottom-0 left-0">
            <LineChart
              width={700}
              height={300}
              key={Math.random()}
            >
              <Line
                type="monotone"
                dataKey="t"
                strokeWidth={6}
                stroke="#fb544e"
                data={lineGraphData}
                dot={false}
                animationDuration={duration()}
                hide={freezePoint === 0}
              />
              <YAxis domain={[0, 10]} hide={true} />
              <XAxis dataKey={'t'} tickFormatter={(str) => ''} tickLine={false} />
            </LineChart>
          </div>
          <div className="w-[98%] mx-auto absolute top-0 right-0 bottom-0 left-0 ">
            <LineChart
              width={700}
              height={300}
              key={Math.random()}
            >
              <Line
                type="monotone"
                dataKey="t"
                strokeWidth={6}
                stroke="#fb544e"
                data={axisValues}
                dot={<CustomDot />}
                animationDuration={0}
                hide={true}
              />
              <XAxis dataKey={'t'} label={{ value: '', position: 'insideBottom', offset: -10, }}
                axisLine={{ stroke: '#5a6373', strokeWidth: 1 }} tickLine={false}
                tick={{ stroke: '#5a6373', strokeWidth: 0.5 }} style={{ paddingTop: '10px' }} className="z-50" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphBoard;
