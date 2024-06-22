import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/task-actions";
import { getLocalDate } from "../helper/common-helper";
import "./TaskItem.css";

const TaskItem = ({ task, setEditingTask }) => {
  const dispatch = useDispatch();
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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
      <button
        onClick={() => {
          setEditingTask(task);
          scrollToTop();
        }}
      >
        Edit
      </button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
