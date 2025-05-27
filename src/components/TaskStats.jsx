import React, { useContext, useMemo } from "react";
import { TaskStatsContext } from "../context/TaskStatsContext";
import { ThemeContext } from "../context/ThemeContext";

const iconStyle = {
  fontSize: "1.3rem",
  marginRight: "0.5rem",
  verticalAlign: "middle",
  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.07))",
};

const TaskStats = () => {
  const { tasks } = useContext(TaskStatsContext);
  const { theme } = useContext(ThemeContext);

  // Memoize stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total,
      completed,
      percent: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks]);

  return (
    <div className={`task-stats ${theme}`}>
      <span>
        {/* List icon */}
        <span role="img" aria-label="Total" style={iconStyle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect
              x="3"
              y="4"
              width="14"
              height="2"
              rx="1"
              fill="var(--accent)"
            />
            <rect
              x="3"
              y="9"
              width="14"
              height="2"
              rx="1"
              fill="var(--accent)"
            />
            <rect
              x="3"
              y="14"
              width="14"
              height="2"
              rx="1"
              fill="var(--accent)"
            />
          </svg>
        </span>
        Total: {stats.total}
      </span>
      <span>
        {/* Check icon */}
        <span role="img" aria-label="Completed" style={iconStyle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="10"
              fill="var(--accent-light)"
            />
            <path
              d="M6 10.5L9 13.5L14 8.5"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        Completed: {stats.completed}
      </span>
      <span>
        {/* Pie/percent icon */}
        <span role="img" aria-label="Percent" style={iconStyle}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="var(--accent-light)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d={describeArc(10, 10, 9, 0, (stats.percent / 100) * 360)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
            />
          </svg>
        </span>
        Completion: {stats.percent}%
      </span>
    </div>
  );
};

// Helper function to draw SVG arc for percent
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

export default TaskStats;