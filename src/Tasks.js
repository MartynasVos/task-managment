import React, { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import TasksList from "./components/TasksList";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import EditCategories from "./components/EditCategories";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [editTaskId, setEditTaskId] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    'ok'
  );

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

  useEffect(() => {
      if (categories.length === 0 && JSON.parse(localStorage.categories).length !== 0) {
        setCategories(JSON.parse(localStorage.categories));
      }
    
    localStorage.setItem("categories", JSON.stringify(categories));
    console.log(JSON.parse(localStorage.categories))
  }, [categories]);

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
    setSelectedCategory(task.category);
    setEditTaskId(curId);
  }

  return (
    <div>
      <CreateTask
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
        setTasks={setTasks}
      />
      <EditCategories categories={categories} setCategories={setCategories} />
      <EditTask
        displayEditTaskModal={displayEditTaskModal}
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
        tasks={tasks}
        editTaskId={editTaskId}
      />
      <TasksList
        tasks={tasks}
        setTasks={setTasks}
        displayEditTaskModal={displayEditTaskModal}
      />
      <div>
        {currentDate} <br />
        {currentTime}
      </div>
    </div>
  );
}
