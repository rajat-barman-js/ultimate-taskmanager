import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/actions";

const TaskItem = ({ task, setEditingTask }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""}`}
      role="listitem"
      aria-label={`Task ${task.title}`}
    >
      <h3 id={`task-title-${task.id}`}>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => dispatch(toggleTask(task.id))}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
