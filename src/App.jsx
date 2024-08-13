import { useState } from "react";

import { tasks } from "./data/tasks.js";
import { FormCreateTask } from "./components/form/FormCreateTask.jsx";
import { TaskList } from "./components/task-list/TaskList.jsx";
import { ListActions } from "./components/list-actions/ListActions.jsx";

function App() {
  const [taskList, setTaskList] = useState(tasks);

  function addTask(taskText, taskColor) {
    setTaskList(prev => [
      ...prev,
      {
        text: taskText,
        color: taskColor,
      },
    ]);
  }

  function removeTask(taskText, taskColor) {
    setTaskList(prev => prev.filter(task => task.text !== taskText));
  }

  return (
    <main>
      <h1>Todo</h1>
      <div>
        <p>Viso užduočių: {taskList.length}</p>
        <p>Likusios atlikti užduotys: {taskList.length}</p>
        <p>Atliktos užduotys: -</p>
        <p>Ištrintos užduotys: -</p>
      </div>
      <FormCreateTask addTaskCallback={addTask} />
      <ListActions />
      <TaskList data={taskList} removeTask={removeTask} />
    </main>
  );
}

export default App;