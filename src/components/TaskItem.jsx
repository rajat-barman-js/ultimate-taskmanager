import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/actions";
import "./TaskItem.css";

function getLocalDate(dateString) {
  const localDate = new Date(dateString);

  // Get the current date
  const today = new Date();

  // Check if the given date is the same as today
  if (
    localDate.getFullYear() === today.getFullYear() &&
    localDate.getMonth() === today.getMonth() &&
    localDate.getDate() === today.getDate()
  ) {
    return "Today";
  }

  // Get the local date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  };
  const localDateTimeString = localDate.toLocaleString("en-US", options);

  return localDateTimeString;
}

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
      <p>Due: {getLocalDate(task.dueDate)}</p>
      <p>
        Priority: <span className={task.priority}>{task.priority}</span>
      </p>
      <button onClick={() => dispatch(toggleTask(task.id))}>
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <button onClick={() => setEditingTask(task)}>Edit</button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
