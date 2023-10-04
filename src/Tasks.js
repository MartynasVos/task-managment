import React, { useState } from 'react'

export default function Tasks() {
    
    const [tasks, setTasks] = useState([]);

    function addTask() {
      const taskInput = document.getElementById('taskInput').value
      if (taskInput === "") {
        return alert("Enter a task")
      } else {
        setTasks(prevState => [...prevState, taskInput])
        console.log(taskInput)
      }
        
    }


  return (
    <div>
        <input id='taskInput' type="text" />
        <button onClick={e => addTask()}>Add Task</button>
        {tasks}
    </div>
  )
}
