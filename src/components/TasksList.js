import React from "react";

export default function TasksList({
  tasks,
  setTasks,
  displayEditTaskModal,
  currentCategory,
}) {
  function timeLeft(dueTime) {
    let yearsLeft = 0;
    const msLeft = new Date(dueTime) - new Date();
    const secondsLeft = msLeft / 1000;
    if (secondsLeft > 31556926) {
      yearsLeft = Math.floor(secondsLeft / 31556926);
      if (secondsLeft - 31556926 * yearsLeft > 2629743) {
        let monthsLeft = 0;
        monthsLeft = Math.floor((secondsLeft - 31556926 * yearsLeft) / 2629743);
        if (yearsLeft === 1) {
          if (monthsLeft === 1) {
            return yearsLeft + " year and " + monthsLeft + " month left";
          }
          return yearsLeft + " year and " + monthsLeft + " months left";
        }
        return yearsLeft + " years and " + monthsLeft + " months left";
      } else {
        if (yearsLeft === 1) {
          return yearsLeft + " year left";
        }
        return yearsLeft + " years left";
      }
    }
    if (secondsLeft > 2629743) {
      let monthsLeft = 0;
      monthsLeft = Math.floor(secondsLeft / 2629743);
      if (monthsLeft === 1) {
        return monthsLeft + " Month left";
      }
      return monthsLeft + " Months left";
    }
    if (secondsLeft > 86400) {
      let daysLeft = 0;
      daysLeft = Math.floor(secondsLeft / 86400);
      if (daysLeft === 1) {
        return daysLeft + " Day left";
      }
      return daysLeft + " Days left";
    }
    if (secondsLeft > 3600) {
      let hoursLeft = 0;
      hoursLeft = Math.floor(secondsLeft / 3600);
      if (secondsLeft - hoursLeft * 3600 > 60) {
        let minutesLeft = Math.floor((secondsLeft - hoursLeft * 3600) / 60);
        if (hoursLeft === 1) {
          if (minutesLeft === 1) {
            return hoursLeft + " Hour and " + minutesLeft + " Minute left";
          }
          return hoursLeft + " Hour and " + minutesLeft + " Minutes left";
        }
        return hoursLeft + " Hours and " + minutesLeft + " Minutes left";
      }
      if (hoursLeft === 1) {
        return hoursLeft + " Hour left";
      }
      return hoursLeft + " Hours left";
    }
    if (secondsLeft > 60) {
      let minutesLeft = Math.floor(secondsLeft / 60);
      if (minutesLeft === 1) {
        return minutesLeft + " Minute left";
      }
      return minutesLeft + " Minutes left";
    }
    if (secondsLeft < 1) {
      return "Time is up!";
    }
    return Math.floor(secondsLeft) + " Seconds left";
  }
  function deleteTask(id) {
    tasks.forEach((element) => {
      if (element.id === id) {
        tasks.splice(tasks.indexOf(element), 1);
      }
    });
    setTasks([...tasks]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  return (
    <div>
      {tasks
        .filter((element) => {
          if (element.category !== currentCategory && currentCategory !== "all") {
            return false
          }
          return element
        })
        .map((element) => {
          return (
            <div className="taskContainer" id={element.id}>
              <div>
                <p>Title:</p>
                <p className="taskTitle">{element.taskTitle}</p>
              </div>
              <div>
                <p>Description:</p>
                <p className="taskDescription">{element.taskDescription}</p>
              </div>
              <div>
                <p>Due Date:</p>
                {element.dueDate} <br />
                Time left: {timeLeft(element.dueDate)}
              </div>
              <div>
                <p className="category">Category: {element.category}</p>
              </div>
              <svg
                onClick={(e) => deleteTask(element.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
              </svg>
              <svg
                onClick={() => displayEditTaskModal(true, element.id)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </div>
          );
        })}
    </div>
  );
}
