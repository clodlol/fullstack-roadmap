import { useEffect, useState } from "react";

export default function Timer() {
  const [timerHovered, setTimerHovered] = useState(false);

  const total = 15;

  const [increasing, setIncreasing] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(total);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!started) return setElapsed(total);

      setElapsed((p) => {
        if (p + 1 > total) setIncreasing(false);
        if (p - 1 < 0) setIncreasing(true);

        if (increasing) return p + 1;
        else return p - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [started, increasing]);

  return (
    <div
      id="timer-container"
      className="grid grid-cols-1 w-full min-h-50 bg-[#78A4CB] hover:cursor-pointer"
      onClick={() => setStarted((p) => !p)}
      onMouseEnter={() => setTimerHovered(true)}
      onMouseLeave={() => setTimerHovered(false)}
    >
      <div
        className="transition-all [grid-area:1/1] min-h-50 bg-white/20"
        style={{
          width: `${increasing ? Math.round((elapsed / total) * 100) : 100 - Math.round((elapsed / total) * 100)}%`,
        }}
      ></div>
      <h1 className="[grid-area:1/1] h-full w-full flex items-center justify-center font-bold text-black/30 text-5xl">
        {timerHovered
          ? `Click to ${started ? "Reset" : "Start"}`
          : `${elapsed}`}{" "}
      </h1>
    </div>
  );
}
