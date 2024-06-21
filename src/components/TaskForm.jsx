import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/actions";
import { PriorityList, Priority } from "../constants/enum";

const TaskForm = ({ editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(Priority.LOW);
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority(Priority.LOW);
    setDueDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      dispatch(
        editTask({
          ...editingTask,
          title,
          description,
          priority: priority,
          dueDate,
        }),
      );
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          description,
          priority: priority,
          dueDate,
          completed: false,
        }),
      );
    }

    resetForm();
    setEditingTask(null);
  };

  const cancelEdit = (e) => {
    resetForm();
    setEditingTask(null);
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={editingTask ? "Edit Task Form" : "Add Task Form"}
    >
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
      <div>
        <label htmlFor="task-title">Title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          aria-required="true"
        >
          {PriorityList.map((priority) => (
            <option value={priority}>{priority}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="task-due-date">Due Date</label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          min={new Date().toISOString().slice(0, 10)}
        />
      </div>
      <button type="submit">{editingTask ? "Save Changes" : "Add Task"}</button>
      {editingTask ? (
        <button onClick={cancelEdit} className="delault-button">
          Cancel Edit
        </button>
      ) : (
        <button
          onClick={(e) => {
            resetForm();
            e.preventDefault();
          }}
          className="delault-button"
        >
          Reset Form
        </button>
      )}
    </form>
  );
};

export default TaskForm;
