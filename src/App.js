import React, { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [editingTask, setEditingTask] = useState(null);

  return (
    <Provider store={store}>
      <div className="app" aria-live="polite">
        <header>
          <h1>Ultimate TaskManager</h1>
        </header>
        <main>
          <TaskForm editingTask={editingTask} setEditingTask={setEditingTask} />
          <TaskList setEditingTask={setEditingTask} editingTask={editingTask} />
          <ToastContainer />
        </main>
      </div>
    </Provider>
  );
};

export default App;
