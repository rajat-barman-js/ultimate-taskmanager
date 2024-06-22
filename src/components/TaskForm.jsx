import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTask, editTask } from "../redux/task-actions";
import { PriorityList, Priority } from "../constants/enum";
import "./TaskForm.css";

const TaskForm = ({ editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(Priority.LOW);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
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

  const validate = () => {
    const newErrors = {};

    if (!title || !title.trim()) newErrors.title = "Title is required";
    if (!description || !description.trim())
      newErrors.description = "Description is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!dueDate) {
      newErrors.dueDate = "Due Date is required";
    } else {
      const [year] = dueDate.split("-");
      const selectedDate = new Date(dueDate).setHours(0, 0, 0, 0);
      if (isNaN(selectedDate) || year.length > 4) {
        newErrors.dueDate = "Invalid Date. You planned for too far ahead";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const isValid = validate();
      if (!isValid) {
        return;
      }

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
        toast.success("Task edited successfully");
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
        toast.success("Task created successfully");
      }

      resetForm();
      setEditingTask(null);
    } catch (error) {
      toast.error("Error in Task Edit/Create");
    }
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
        <label htmlFor="task-title">
          Title <span className="required">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          aria-required="true"
        />
        {errors.title && <span className="error">* {errors.title}</span>}
      </div>
      <div>
        <label htmlFor="task-description">
          Description <span className="required">*</span>
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          aria-required="true"
        />
        {errors.description && (
          <span className="error">* {errors.description}</span>
        )}
      </div>
      <div>
        <label htmlFor="task-priority">
          Priority <span className="required">*</span>
        </label>
        <select
          id="task-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          aria-required="true"
        >
          {PriorityList.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        {errors.priority && <span className="error">* {errors.priority}</span>}
      </div>
      <div>
        <label htmlFor="task-due-date">
          Due Date <span className="required">*</span>
        </label>
        <input
          id="task-due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          min={new Date().toISOString().slice(0, 10)}
        />

        {errors.dueDate && <span className="error">* {errors.dueDate}</span>}
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
