Smart Task Manager Dashboard

A React-based dashboard designed to manage, update, and analyze tasks, demonstrating proficiency with core and advanced React Hooks.

Features

Task Management: Add, update, delete, and toggle task completion.

Task Analysis: Real-time statistics on tasks.

Pomodoro Timer: Integrated task-focused timer.

Theming: Light and dark mode toggle.

Responsive Design: Fully adaptable to desktop and mobile screens.

Drag-and-Drop: Reorder tasks easily.

PWA Support: Installable and offline-capable.

Project Structure

src
├── components
│   ├── TaskInput.jsx
│   ├── TaskList.jsx
│   ├── TaskStats.jsx
│   └── Timer.jsx
│
├── context
│   ├── ThemeContext.jsx
│   └── TaskStatsContext.jsx
│
├── hooks
│   ├── useLocalStorage.js
│   └── usePomodoroTimer.js
│
├── App.jsx
└── index.js

Hook usage:

useState: Managing task list state and toggling completion status.

useEffect: Syncing tasks with localStorage and loading them on mount.

useReducer: Handling task actions and managing timer logic.

useRef: Auto-focusing input and managing timer intervals.

useContext: Managing theme and sharing global task stats.

useMemo: Caching filtered tasks and memoizing stats.

useCallback: Efficiently handling task actions and timer controls.

useLayoutEffect: Scrolling to new tasks and adjusting layout.

useLocalStorage (custom): Persisting state in localStorage.

usePomodoroTimer (custom): Managing Pomodoro timer logic.