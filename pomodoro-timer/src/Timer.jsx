import { useEffect, useState } from "react";

export default function Timer() {
  const [timerHovered, setTimerHovered] = useState(false);

  const [increasing, setIncreasing] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [perc, setPerc] = useState(100);

  useEffect(() => {
    if (perc >= 100) setIncreasing(false);
    else if (perc <= 0) setIncreasing(true);
  }, [perc]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!timerStarted) {
        setPerc(100);
        return;
      }

      if (increasing) {
        setPerc((p) => p + Math.floor(100 / 15));
      } else {
        setPerc((p) => p - Math.floor(100 / 30));
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timerStarted, increasing]);

  return (
    <div
      id="timer-container"
      className="grid grid-cols-1 w-full min-h-50 bg-[#78A4CB] hover:cursor-pointer"
      onClick={() => setTimerStarted((p) => !p)}
      onMouseEnter={() => setTimerHovered(true)}
      onMouseLeave={() => setTimerHovered(false)}
    >
      <div
        className="transition-all [grid-area:1/1] min-h-50 bg-white/20"
        style={{
          width: `${perc}%`,
        }}
      ></div>
      <h1 className="[grid-area:1/1] h-full w-full flex items-center justify-center font-bold text-black/30 text-5xl">
        {timerHovered
          ? `Click to ${timerStarted ? "Reset" : "Start"}`
          : `${Math.round((perc * (increasing ? 15 : 30)) / 100)}`}{" "}
      </h1>
    </div>
  );
}
