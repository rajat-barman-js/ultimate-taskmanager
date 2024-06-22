import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import TaskItem from "./TaskItem";
import { setFilter, setSort, setSearch } from "../redux/task-actions";
import { PRIORITY_ORDER } from "../constants/enum";
import { FILTER, SORT } from "../constants/common-constant";
import "./TaskList.css";

const TaskList = ({ setEditingTask }) => {
  const tasks = useSelector((state) => state.taskReducer.tasks);
  const filter = useSelector((state) => state.taskReducer.filter);
  const sort = useSelector((state) => state.taskReducer.sort);
  const search = useSelector((state) => state.taskReducer.search);
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

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === FILTER.COMPLETED) return task.completed;
        if (filter === FILTER.INCOMPLETE) return !task.completed;
        return true;
      })
      .filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.description.toLowerCase().includes(search.toLowerCase()),
      )
      .sort((a, b) => {
        if (!sort) return 0;
        if (sort === SORT.PRIORITY_ASC) {
          return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        }
        if (sort === SORT.PRIORITY_DESC) {
          return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
        }
        if (sort === SORT.DUE_DATE_ASC) {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sort === SORT.DUE_DATE_DESC) {
          return new Date(b.dueDate) - new Date(a.dueDate);
        }
        return 0;
      });
  }, [filter, sort, search, tasks]);

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
            <option value={SORT.PRIORITY_ASC}>Priority (Low to High)</option>
            <option value={SORT.PRIORITY_DESC}>Priority (High to Low)</option>
            <option value={SORT.DUE_DATE_ASC}>Due Date (Earliest First)</option>
            <option value={SORT.DUE_DATE_DESC}>Due Date (Latest First)</option>
          </select>
          <select
            onChange={(e) => handleFilter(e.target.value)}
            value={filter}
            aria-label="Filter tasks"
          >
            <option value="">Filter by</option>
            <option value={FILTER.COMPLETED}>Completed</option>
            <option value={FILTER.INCOMPLETE}>Incomplete</option>
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
