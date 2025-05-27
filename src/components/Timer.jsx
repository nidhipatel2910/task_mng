import React, { useContext } from "react";
import usePomodoroTimer from "../hooks/usePomodoroTimer";
import { ThemeContext } from "../context/ThemeContext";

const TIMER_TOTAL = 1500; // 25 minutes

const Timer = () => {
  const { theme } = useContext(ThemeContext);
  const { time, isRunning, start, pause, reset } = usePomodoroTimer();

  // Calculate progress for circular bar
  const percent = Math.round(((TIMER_TOTAL - time) / TIMER_TOTAL) * 100);

  // Dynamic color: green > yellow > orange > red
  const getColor = () => {
    if (percent < 50) return "var(--accent)";
    if (percent < 80) return "#fbc02d";
    if (percent < 95) return "#ff7043";
    return "#e74c3c";
  };

  // Play sound and flash when complete
  React.useEffect(() => {
    if (time === 0) {
      const beep = new Audio(
        "https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae0e2.mp3"
      );
      beep.play();
      document.body.classList.add("timer-flash");
      setTimeout(() => document.body.classList.remove("timer-flash"), 1200);
    }
  }, [time]);

  // Format mm:ss
  const format = (t) =>
    `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(
      2,
      "0"
    )}`;

  return (
    <div className={`timer ${theme}`}>
      <h3>
        <span role="img" aria-label="Timer" style={{ marginRight: 8 }}>
          ⏰
        </span>
        Pomodoro Timer
      </h3>
      <div className="timer-canvas">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70"
            cy="70"
            r="60"
            stroke="var(--accent-light)"
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx="70"
            cy="70"
            r="60"
            stroke={getColor()}
            strokeWidth="10"
            fill="none"
            strokeDasharray={2 * Math.PI * 60}
            strokeDashoffset={
              2 * Math.PI * 60 * (1 - percent / 100)
            }
            style={{
              transition: "stroke-dashoffset 0.5s cubic-bezier(.4,2,.6,1), stroke 0.4s",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))",
            }}
            strokeLinecap="round"
          />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            fontSize="2.3rem"
            fontFamily="'Roboto Mono', monospace"
            fill={getColor()}
            dy=".3em"
          >
            {format(time)}
          </text>
        </svg>
      </div>
      <div className="timer-controls">
        <button
          onClick={start}
          disabled={isRunning || time === 0}
          aria-label="Start"
          title="Start"
        >
          <span role="img" aria-label="Start">
            ▶️
          </span>
        </button>
        <button
          onClick={pause}
          disabled={!isRunning || time === 0}
          aria-label="Pause"
          title="Pause"
        >
          <span role="img" aria-label="Pause">
            ⏸️
          </span>
        </button>
        <button
          onClick={reset}
          aria-label="Reset"
          title="Reset"
          style={{ background: "#e0e0e0", color: "#222" }}
        >
          <span role="img" aria-label="Reset">
            🔄
          </span>
        </button>
      </div>
      <div
        style={{
          marginTop: "0.7rem",
          fontSize: "0.98rem",
          color: "var(--accent)",
          opacity: 0.7,
        }}
      >
        {isRunning
          ? "Stay focused! 🍅"
          : time === 0
          ? "Time's up! Take a break! 🎉"
          : "Ready to start your session?"}
      </div>
    </div>
  );
};

export default Timer;