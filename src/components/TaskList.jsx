import React, { useMemo, useLayoutEffect, useRef } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  onToggle,
  onDelete,
  filter,
  sort,
  onReorder,
}) => {
  const listEndRef = useRef(null);

  // Memoize filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "completed") filtered = tasks.filter((t) => t.completed);
    if (filter === "active") filtered = tasks.filter((t) => !t.completed);
    if (sort === "asc")
      filtered = [...filtered].sort((a, b) => a.text.localeCompare(b.text));
    if (sort === "desc")
      filtered = [...filtered].sort((a, b) => b.text.localeCompare(a.text));
    return filtered;
  }, [tasks, filter, sort]);

  // Scroll to latest task
  useLayoutEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredTasks.length]);

  return (
    <ul className="task-list">
      {filteredTasks.map((task, idx) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
          onDragStart={(e) => e.dataTransfer.setData("taskIdx", idx)}
          onDrop={(e) => {
            const fromIdx = e.dataTransfer.getData("taskIdx");
            onReorder(Number(fromIdx), idx);
          }}
          draggable
        />
      ))}
      <div ref={listEndRef} />
    </ul>
  );
};

export default TaskList;