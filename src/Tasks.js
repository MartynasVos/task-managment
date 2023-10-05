import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [selectedDate, setSelectedDate] = useState(null);

  function addTask(e) {
    e.preventDefault();
    if (selectedDate === null) {
      return alert("Enter due date")
    }
    if (taskTitle === "" || taskDescription === "") {
      return alert("Enter a task");
    } else {
      let uniqueId = Date.now();
      let dueDate = selectedDate.toString().substring(4, 21)
      setTasks((prevState) => [
        ...prevState,
        {
          id: uniqueId,
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          dueDate: dueDate
        },
      ]);
      setTaskTitle("");
      setTaskDescription("");
      setSelectedDate(null)
      displayModal(false);
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
    var modal = document.getElementById("myModal");
    if (display === true) {
      modal.style.display = "block";
    } else {
      modal.style.display = "none";
    }
  }
  return (
    <div>
      <button onClick={(e) => displayModal(true)}>New Task</button>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <span onClick={(e) => displayModal(false)} class="close">
            &times;
          </span>
          <form onSubmit="return false">
            <label>Title</label>
            <br />
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              type="text"
            />
            <br />
            <label>Description</label>
            <br />
            <input
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              type="text"
            />
            <br />
            <p>Due Date</p>
            <DateTimePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              disableClock
              dayPlaceholder = 'dd'
              hourPlaceholder = 'hh'
              minutePlaceholder = 'mm'
              monthPlaceholder = 'MM'
              yearPlaceholder = 'yyyy'
              format="yyyy/MM/dd h:mm a"
              onInvalidChange = {() => alert('Invalid datetime')}
            />
            <br /> <br />
            <button id="addTaskBtn" onClick={(e) => addTask(e)}>
              Add Task
            </button>
          </form>
        </div>
      </div>
      <div>
        {tasks.map((element) => {
          return (
            <div className="taskContainer" id={element.id}>
              <p>
                Title: <br />
                {element.taskTitle}
              </p>
              <p>
                Description: <br />
                {element.taskDescription}
              </p>
              <p>
                Due Date: <br />
                {element.dueDate}
              </p>
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
