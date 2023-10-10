import React from "react";

export default function CreateTask({
  taskTitle,
  taskDescription,
  setTaskTitle,
  setTaskDescription,
  DateTimePicker,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  categories,
  setTasks,
}) {
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
      setTasks((prevState) => [
        ...prevState,
        {
          id: uniqueId,
          taskTitle: taskTitle,
          taskDescription: taskDescription,
          dueDate: dueDate,
          category: selectedCategory,
        },
      ]);

      setTaskTitle("");
      setTaskDescription("");
      setSelectedDate(null);
      displayAddTaskModal(false);
    }
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
    <div className="flex-container">
      <button onClick={() => displayAddTaskModal(true)}>New Task</button>
      <div id="addTaskModal" className="modal">
        <div className="modal-content">
          <span onClick={() => displayAddTaskModal(false)} className="close">
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
              dayPlaceholder="dd"
              hourPlaceholder="hh"
              minutePlaceholder="mm"
              monthPlaceholder="MM"
              yearPlaceholder="yyyy"
              format="yyyy/MM/dd HH:mm"
            />
            <br /> <br />
            <label>Category: </label>
            <select
              name=""
              id=""
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((element) => {
                return <option value={element}>{element}</option>;
              })}
            </select>
            <br /> <br />
            <button onClick={(e) => addTask(e)}>Add Task</button>
          </form>
        </div>
      </div>
    </div>
  );
}
