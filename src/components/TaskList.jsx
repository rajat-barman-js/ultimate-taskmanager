import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { setFilter, setSort, setSearch } from "../redux/actions";
import { PRIORITY_ORDER } from "../constants/enum";
import "./TaskList.css";

const TaskList = ({ setEditingTask }) => {
  const tasks = useSelector((state) => state.tasks);
  const filter = useSelector((state) => state.filter);
  const sort = useSelector((state) => state.sort);
  const search = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const handleSort = (criteria) => {
    dispatch(setSort(criteria));
  };

  const handleFilter = (criteria) => {
    dispatch(setFilter(criteria));
  };

  const handleSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "incomplete") return !task.completed;
      return true;
    })
    .filter(
      (task) =>
        task.title.includes(search) || task.description.includes(search),
    )
    .sort((a, b) => {
      if (!sort) return 0;
      if (sort === "priorityAsc")
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      if (sort === "priorityDesc")
        return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
      if (sort === "dueDateAsc")
        return new Date(a.dueDate) - new Date(b.dueDate);
      if (sort === "dueDateDesc")
        return new Date(b.dueDate) - new Date(a.dueDate);
      return 0;
    });

  return (
    <section className="task-list" aria-label="Task List">
      <div className="controls">
        <input
          type="text"
          placeholder="Search tasks"
          value={search}
          onChange={handleSearch}
        />
        <div className="dropdowns">
          <select
            onChange={(e) => handleSort(e.target.value)}
            value={sort}
            aria-label="Sort tasks"
          >
            <option value="">Sort by</option>
            <option value="priorityAsc">Priority (Low to High)</option>
            <option value="priorityDesc">Priority (High to Low)</option>
            <option value="dueDateAsc">Due Date (Earliest First)</option>
            <option value="dueDateDesc">Due Date (Latest First)</option>
          </select>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            value={filter}
            aria-label="Filter tasks"
          >
            <option value="">Filter by</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>
      <div className="task-items">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} setEditingTask={setEditingTask} />
        ))}
      </div>
    </section>
  );
};

export default TaskList;
