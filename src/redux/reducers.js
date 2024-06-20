import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SET_FILTER,
  SET_SORT,
  SET_SEARCH,
} from "./actions";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filter: "",
  sort: "",
  search: "",
};

const rootReducer = (state = initialState, action) => {
  let newTasks;
  switch (action.type) {
    case ADD_TASK:
      newTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case EDIT_TASK:
      newTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task,
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case DELETE_TASK:
      newTasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case TOGGLE_TASK:
      newTasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return { ...state, tasks: newTasks };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
