import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onDragStart,
  onDrop,
  draggable,
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <li
      className={`task-item ${task.completed ? "completed" : ""} ${theme}`}
      draggable={draggable}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <span onClick={onToggle} className="task-text">
        {task.text}
      </span>
      <button onClick={onDelete} className="task-delete-btn">
        ✕
      </button>
    </li>
  );
};

export default TaskItem;