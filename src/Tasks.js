import React, { useState } from "react";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    if (taskTitle === "" || taskDescription === "") {
      return alert("Enter a task");
    } else {
      let uniqueId = Date.now();
      setTasks((prevState) => [
        ...prevState,
        { id: uniqueId, taskTitle: taskTitle, taskDescription: taskDescription },
      ]);
      displayModal(false)
    }
  }
  function deleteTask(id) {
    const updatedTasks = tasks;
    updatedTasks.forEach((element) => {
      if (element.id === id) {
        updatedTasks.splice(updatedTasks.indexOf(element), 1);
      }
    });
    setTasks([...updatedTasks]);
  }

  

  function displayModal(display) {
    var modal = document.getElementById("myModal")
    if (display === true) {
      modal.style.display = "block"
    }
    else {
      modal.style.display = "none"
    }
  }

  

  return (
    <div>
      <button onClick={(e) => displayModal(true)}>New Task</button>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span onClick={(e) => displayModal(false)} class="close">&times;</span>
          <p>Title</p>
          <input id="taskTitle" type="text" />
          <p>Description</p>
          <input id="taskDescription" type="text" /> <br /> <br />
          <button id="addTaskBtn"  onClick={(e) => addTask()}>Add Task</button>
        </div>
      </div>
      <div>
        {tasks.map((element) => {
          return (
            <div id={element.id}>
              {element.taskTitle}
              {element.taskDescription}
              <span onClick={(e) => deleteTask(element.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
