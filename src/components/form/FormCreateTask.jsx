import { useState } from "react";

export function FormCreateTask(params) {
    const {addTaskCallback} =params;
    const [task, setTask] = useState('');
    const [color, setColor] = useState('');

    function handleFormSubmit(e) {
        e.preventDefault();

        if (task.trim() === "") {
            return;
        }
        addTaskCallback(task);
    }
   

    return (
        <form onSubmit={handleFormSubmit}>
            <input onChange={e=>setTask(e.target.value)} value={task} type="text"/>
            <input onChange={e=>setColor(e.target.value)} value={color} type="color" />
            <button type="submit">Create task</button>
        </form>
    );
}