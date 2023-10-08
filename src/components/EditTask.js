import React from "react";

export default function EditTask({
  displayEditTaskModal,
  editTask,
  taskTitle,
  taskDescription,
  setTaskTitle,
  setTaskDescription,
  DateTimePicker,
  selectedDate,
  setSelectedDate
}) {
  return (
    <div id="editTaskModal" className="modal">
      <div class="modal-content">
        <span onClick={() => displayEditTaskModal(false)} class="close">
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
          <button onClick={(e) => editTask(e)}>Edit Task</button>
        </form>
      </div>
    </div>
  );
}
