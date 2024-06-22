import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../redux/task-actions";
import { getLocalDate } from "../helper/common-helper";
import "./TaskItem.css";

const TaskItem = ({ task, setEditingTask, editingTask }) => {
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
      <button
        onClick={() =>
          editingTask?.id === task.id ? null : dispatch(toggleTask(task.id))
        }
        className={editingTask?.id === task.id ? "inactive" : ""}
      >
        {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
      </button>
      <button
        onClick={() => {
          if (editingTask?.id === task.id) {
            return;
          }
          setEditingTask(task);
          scrollToTop();
        }}
        className={editingTask?.id === task.id ? "inactive" : ""}
      >
        Edit
      </button>
      <button
        onClick={() =>
          editingTask?.id === task.id ? null : dispatch(deleteTask(task.id))
        }
        className={editingTask?.id === task.id ? "inactive" : ""}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
