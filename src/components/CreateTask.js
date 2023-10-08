import React from "react";

export default function CreateTask({
  displayAddTaskModal,
  addTask,
  taskTitle,
  taskDescription,
  setTaskTitle,
  setTaskDescription,
  DateTimePicker,
  selectedDate,
  setSelectedDate,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <div>
      <button onClick={() => displayAddTaskModal(true)}>New Task</button>
      <div id="addTaskModal" className="modal">
        <div class="modal-content">
          <span onClick={() => displayAddTaskModal(false)} class="close">
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
              onChange={(selected) => setSelectedCategory(selected)}
            >
              {categories.map((element) => {
                return element;
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
