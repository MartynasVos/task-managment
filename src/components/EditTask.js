export default function EditTask({
  displayEditTaskModal,
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
  tasks,
  editTaskId,
}) {
  function editTask(e) {
    e.preventDefault();
    const task = tasks.find(({ id }) => id === editTaskId);
    task.taskTitle = taskTitle;
    task.taskDescription = taskDescription;
    if (selectedDate.toString().length > 20) {
      task.dueDate = selectedDate.toString().substring(4, 21);
    }
    task.category = selectedCategory;
    displayEditTaskModal(false);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return (
    <div id="editTaskModal" className="modal">
      <div className="modal-content">
        <span onClick={() => displayEditTaskModal(false)} className="close">
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
          <button onClick={(e) => editTask(e)}>Edit Task</button>
        </form>
      </div>
    </div>
  );
}
