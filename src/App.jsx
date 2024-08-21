import { useEffect, useState } from "react";
import { tasks } from "./data/tasks.js";
import { FormCreateTask } from "./components/form/FormCreateTask.jsx";
import { ListActions } from "./components/list-actions/ListActions.jsx";
import { TaskList } from "./components/task-list/TaskList.jsx";


function App() {
  const storageDataKey = 'todo-data';
  const storageIdKey = 'todo-last-id';
  const [taskList, setTaskList] = useState(readLocalData());
  const [id, setId] = useState(readLocalId());
  const [sortingAlgo, setSortingAlgo] = useState('timeAsc');

  function sortData(){

    const algorithmes = {
      timeAsc: (a, b) => a.id - b.id,
      timeDes: (a, b) => b.id - a.id,
      colorAsc: (a, b) => a.color < b.color ? -1 : a.color === b.color ? 0 : 1,
      colorDes: (a, b) => b.color < a.color ? -1 : a.color === b.color ? 0 : 1,
      titleAsc: (a, b) => a.text < b.text ? -1 : a.text === b.text ? 0 : 1,
      titleDes: (a, b) => b.text < a.text ? -1 : a.text === b.text ? 0 : 1,
      };
      return sortingAlgo in algorithmes
      ?taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);
      // return algorithmes[sortingAlgo] ?taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);
    // return (typeof algorithmes[sortingAlgo] ==='function' ?taskList.sort(algorithmes[sortingAlgo]) : taskList.sort(algorithmes.timeAsc);


    // switch(sortingAlgo) {
    //   case 'timeAsc':
    //     return taskList.sort((a,b) => a.id - b.id);

    //   case 'timeDes':
    //     return taskList.sort((a,b) => b.id - a.id);
      
    //   case 'timeAsc':
    //     return taskList.sort((a,b) => a.id - b.id);
      
    //   case 'timeAsc':
    //     return taskList.sort((a,b) => a.id - b.id);
    //     ...                 
    // }

    // if (sortingAlgo=== 'timeAsc'){
    //   return taskList.sort((a,b) => a.id - b.id);
    // }
    // if (sortingAlgo=== 'timeDes'){
    //   return taskList.sort((a,b) => b.id - a.id);
    // }
    // if (sortingAlgo=== 'colorAsc'){
    //   return taskList.sort((a,b) => a.color - b.color ? -1 : a.color===b.color? 0 : 1);
    // }
    // if (sortingAlgo=== 'colorDes'){
    //   return taskList.sort((a,b) => b.color - a.color ? -1 : b.color===a.color? 0 : 1);
    // }
    // if (sortingAlgo=== 'titleAsc'){
    //   return taskList.sort((a,b) => a.text - b.text ? -1 : a.text===b.text? 0 : 1);
    // }
    // if (sortingAlgo=== 'titleDes'){
    //   return taskList.sort((a,b) => b.text - a.text ? -1 : b.text===a.text? 0 : 1);
    // }
    // return taskList;
  }
 function updateSorting(newAlgoName) {
  // setSortingAlgo(prev => newAlgoName);
  setSortingAlgo(newAlgoName);
 }
  // func, be antro parametro
  // pasileidzia kai ispiesiamas komponentas
  // pasileidzia kai perpiesiamas komponentas
  useEffect(() => {
    console.log('Pasileidi "APP" komponentas...');
  });

  // func + []
  // antras parametras be reiksmiu (tuscias masyvas)
  // pasileidzia tik pirma karta piesiant komponenta
  useEffect(() => {
    console.log('"APP" - tuscias masyvas');
  }, []);

  // func + [...]
  // antras parametras yra ne tuscias masyvas
  // i ji ieina "useState" parametrai, kuriu reiksmems kintant
  // reikia paleisti sia funkcija
  useEffect(() => {
    localStorage.setItem(storageDataKey, JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem(storageIdKey, JSON.stringify(id));
  }, [id]);

  function readLocalData() {
    const localData = localStorage.getItem(storageDataKey);

    if (localData) {
      return JSON.parse(localData);
    }

    return [];
  }

  function readLocalId() {
    const localData = localStorage.getItem(storageIdKey);

    if (localData) {
      return JSON.parse(localData);
    }

    return 0;
  }

  function addTask(taskText, taskColor) {
    setTaskList(prev => [
      ...prev,
      {
        id: id + 1,
        text: taskText,
        color: taskColor,
        state: 'todo',
      },
    ]);
    setId(prev => prev + 1);
  }

  function updateTaskText(id, newText) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      text: task.id === id ? newText : task.text,
    })));
  }

  function updateTaskColor(id, newColor) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      color: task.id === id ? newColor : task.color,
    })));
  }

  function updateTaskState(id) {
    setTaskList(prev => prev.map(task => ({
      ...task,
      state: task.id === id ? 'done' : task.state,
    })));
  }

  function removeTask(id) {
    setTaskList(prev => prev.filter(task => task.id !== id));
  }

  window.addEventListener('keyup', (e) => {
    console.log(e.key);
  });

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
      <ListActions updateSorting={updateSorting} />
      <TaskList data={sortData()}
        updateTaskText={updateTaskText}
        updateTaskColor={updateTaskColor}
        updateTaskState={updateTaskState}
        removeTask={removeTask} />
    </main>
  );
}

export default App;