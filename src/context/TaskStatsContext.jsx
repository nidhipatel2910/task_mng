import React, { createContext } from "react";

export const TaskStatsContext = createContext();

export const TaskStatsProvider = ({ tasks, children }) => (
  <TaskStatsContext.Provider value={{ tasks }}>
    {children}
  </TaskStatsContext.Provider>
);