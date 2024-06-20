import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

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
          <TaskList setEditingTask={setEditingTask} />
        </main>
      </div>
    </Provider>
  );
};

export default App;
