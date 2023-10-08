import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import TasksList from "./components/TasksList";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState();
  const [taskDescription, setTaskDescription] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const [editTaskId, setEditTaskId] = useState();

  const [categories, setCategories] = useState([
    <option value="work">Work</option>,
    <option value="personal">Personal</option>,
  ]);

  let time = new Date().toLocaleTimeString();
  let date = new Date().toDateString();
  const [currentTime, setCurrentTime] = useState(time);
  const [currentDate, setCurrentDate] = useState(date);

  function updateClock() {
    setCurrentTime(new Date().toTimeString().split(" ")[0]);
    setCurrentDate(new Date().toDateString());
  }

  setInterval(updateClock, 1000);

  useEffect(() => {
    if (localStorage.tasks !== undefined) {
      if (tasks.length === 0 && JSON.parse(localStorage.tasks).length !== 0) {
        setTasks(JSON.parse(localStorage.tasks));
      }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  function addTask(e) {
    e.preventDefault();
    if (taskTitle === "" || taskDescription === "") {
      return alert("Enter a task");
    }
    if (selectedDate === null) {
      return alert("Enter due date");
    } else {
      let uniqueId = Date.now();
      let dueDate = selectedDate.toString().substring(4, 21);
      console.log(selectedCategory);
      setTasks((prevState) => [
        ...prevState,
        {
          id: uniqueId,
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          dueDate: dueDate,
        },
      ]);
      setTaskTitle("");
      setTaskDescription("");
      setSelectedDate(null);
      displayAddTaskModal(false);
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
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function editTask(e) {
    e.preventDefault();
    const task = tasks.find(({ id }) => id === editTaskId);
    task.taskTitle = taskTitle;
    task.taskDescription = taskDescription;
    if (selectedDate.toString().length > 20) {
      task.dueDate = selectedDate.toString().substring(4, 21);
    }
    displayEditTaskModal(false);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function displayEditTaskModal(display, curId) {
    var editTaskModal = document.getElementById("editTaskModal");
    if (display === true) {
      editTaskModal.style.display = "block";
    } else {
      editTaskModal.style.display = "none";
      setTaskTitle("");
      setTaskDescription("");
      setSelectedDate(null);
      return;
    }
    const task = tasks.find(({ id }) => id === curId);
    setTaskTitle(task.taskTitle);
    setTaskDescription(task.taskDescription);
    setSelectedDate(task.dueDate);
    setEditTaskId(curId);
  }

  function displayAddTaskModal(display) {
    var addTaskModal = document.getElementById("addTaskModal");
    if (display === true) {
      addTaskModal.style.display = "block";
    } else {
      addTaskModal.style.display = "none";
      return;
    }
  }

  return (
    <div>
      <CreateTask
        displayAddTaskModal={displayAddTaskModal}
        addTask={addTask}
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        setTaskTitle={setTaskTitle}
        setTaskDescription={setTaskDescription}
        DateTimePicker={DateTimePicker}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <EditTask
        displayEditTaskModal={displayEditTaskModal}
        editTask={editTask}
        taskTitle={taskTitle}
        taskDescription={taskDescription}
        setTaskTitle={setTaskTitle}
        setTaskDescription={setTaskDescription}
        DateTimePicker={DateTimePicker}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TasksList
        tasks={tasks}
        deleteTask={deleteTask}
        timeLeft={timeLeft}
        displayEditTaskModal={displayEditTaskModal}
      />
      <div>
        {currentDate} <br />
        {currentTime}
      </div>
    </div>
  );
}
