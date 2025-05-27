import { useReducer, useRef, useCallback } from "react";

const initialState = { time: 1500, isRunning: false };

function reducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "RESET":
      return { time: 1500, isRunning: false };
    case "TICK":
      return { ...state, time: Math.max(0, state.time - 1) };
    default:
      return state;
  }
}

function usePomodoroTimer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (!state.isRunning) {
      dispatch({ type: "START" });
      intervalRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
  }, [state.isRunning]);

  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
    clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    clearInterval(intervalRef.current);
  }, []);

  // Stop timer at 0
  if (state.time === 0 && state.isRunning) {
    pause();
  }

  return {
    time: state.time,
    isRunning: state.isRunning,
    start,
    pause,
    reset,
  };
}

export default usePomodoroTimer;