import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteTask, toggleTask } from "../redux/task-actions";
import { getLocalDate } from "../helper/common-helper";
import Popup from "../common-components/Popup";
import "./TaskItem.css";

const TaskItem = ({ task, setEditingTask, editingTask }) => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDelete() {
    setShowPopup(true);
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
        onClick={() => {
          if (editingTask?.id === task.id) {
            return;
          }
          dispatch(toggleTask(task.id));
          toast.info(
            `${task.title} Marked as ${
              task.completed ? "Incomplete" : "Complete" // it will become complete after this
            }`,
          );
        }}
        className={
          editingTask?.id === task.id
            ? "inactive"
            : task.completed
            ? "completed"
            : "incomplete"
        }
        aria-label={`Mark task ${task.completed ? "incomplete" : "complete"}`}
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
        className={editingTask?.id === task.id ? "inactive" : "edit"}
        aria-label={`Edit task ${task.title}`}
      >
        Edit
      </button>
      <button
        onClick={() => (editingTask?.id === task.id ? null : handleDelete())}
        className={editingTask?.id === task.id ? "inactive" : "delete"}
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </button>
      {showPopup && (
        <Popup
          message={"Are you sure you want to delete?"}
          onCancel={() => {
            setShowPopup(false);
          }}
          onConfirm={() => {
            dispatch(deleteTask(task.id));
            setShowPopup(false);
            toast.success("Task deleted successfully");
          }}
        />
      )}
    </div>
  );
};

export default TaskItem;
