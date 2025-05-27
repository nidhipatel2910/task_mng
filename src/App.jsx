import React, { useReducer, useCallback } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";
import Timer from "./components/Timer";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { TaskStatsProvider } from "./context/TaskStatsContext";
import useLocalStorage from "./hooks/useLocalstorage";
import "./styles/app.css";

const initialTasks = [];

function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case "TOGGLE":
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case "DELETE":
      return state.filter((t) => t.id !== action.id);
    case "REORDER":
      const updated = [...state];
      const [removed] = updated.splice(action.from, 1);
      updated.splice(action.to, 0, removed);
      return updated;
    case "SET":
      return action.tasks;
    default:
      return state;
  }
}

const gradientBg = {
  background: "linear-gradient(135deg, var(--accent-light) 0%, var(--bg) 100%)",
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
  flexDirection: "column",
};

const glassCard = {
  background: "rgba(255,255,255,0.15)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
  backdropFilter: "blur(8px)",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.18)",
};

const App = () => {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", initialTasks);
  const [tasks, dispatch] = useReducer(tasksReducer, storedTasks);

  // Sync tasks to localStorage
  React.useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks, setStoredTasks]);

  // Load tasks on mount
  React.useEffect(() => {
    dispatch({ type: "SET", tasks: storedTasks });
    // eslint-disable-next-line
  }, []);

  const handleAdd = useCallback(
    (text) => dispatch({ type: "ADD", text }),
    []
  );
  const handleToggle = useCallback(
    (id) => dispatch({ type: "TOGGLE", id }),
    []
  );
  const handleDelete = useCallback(
    (id) => dispatch({ type: "DELETE", id }),
    []
  );
  const handleReorder = useCallback(
    (from, to) => dispatch({ type: "REORDER", from, to }),
    []
  );

  const [filter, setFilter] = React.useState("all");
  const [sort, setSort] = React.useState("asc");

  // Responsive horizontal layout for main content
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className={`app ${theme}`} style={gradientBg}>
            <header
              style={{
                justifyContent: "center",
                position: "relative",
                background: "transparent",
                boxShadow: "none",
                borderBottom: "none",
                marginBottom: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.7rem",
                  margin: "0 auto",
                  width: "fit-content",
                  padding: "0.7rem 2.5rem",
                  borderRadius: "18px",
                  ...glassCard,
                }}
              >
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: "0.5rem" }}
                >
                  <circle cx="19" cy="19" r="19" fill="var(--accent-light)" />
                  <path
                    d="M19 8V30M8 19H30"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <h1
                  style={{
                    margin: 0,
                    textAlign: "center",
                    fontWeight: 700,
                    fontSize: "2.1rem",
                    letterSpacing: "1px",
                    color: "var(--accent)",
                    background: "linear-gradient(90deg, var(--accent), var(--text))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Smart Task Manager
                </h1>
              </div>
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn"
                style={{
                  position: "absolute",
                  right: "2.5rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "2rem",
                  background: "rgba(255,255,255,0.25)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </header>
            <div
              className="main-content"
              style={{
                ...glassCard,
                display: "flex",
                flexDirection: "row",
                gap: "2rem",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "95vw",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "2rem 1rem",
              }}
            >
              {/* Left: Task List & Input */}
              <div style={{ flex: 2, minWidth: 320, maxWidth: 500 }}>
                <TaskStatsProvider tasks={tasks}>
                  <TaskStats />
                  <TaskInput onAdd={handleAdd} />
                  <div className="task-controls" style={{ marginBottom: "2rem" }}>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </select>
                  </div>
                  <TaskList
                    tasks={tasks}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    filter={filter}
                    sort={sort}
                    onReorder={handleReorder}
                  />
                </TaskStatsProvider>
              </div>
              {/* Right: Timer */}
              <div
                style={{
                  flex: 1,
                  minWidth: 260,
                  maxWidth: 340,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginTop: "1.5rem",
                }}
              >
                <Timer />
              </div>
            </div>
            <footer
              style={{
                textAlign: "center",
                marginTop: "2.5rem",
                color: "var(--accent)",
                opacity: 0.7,
                fontSize: "1rem",
                letterSpacing: "0.5px",
              }}
            >
              &copy; {new Date().getFullYear()} Smart Task Manager &mdash; React Dashboard
            </footer>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
};

export default App;