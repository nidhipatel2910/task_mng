import React, { useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const TaskInput = ({ onAdd }) => {
  const inputRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value) {
      onAdd(value);
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`task-input ${theme}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task..."
        className="task-input-field"
      />
      <button type="submit" className="task-input-btn">
        Add
      </button>
    </form>
  );
};

export default TaskInput;