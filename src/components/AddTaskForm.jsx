const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  return (
    <>
      {/* ADD Task */}
      <div className="row mb-5">
        <div className="col">
          <input
            type="text"
            className="form-control form-control-lg"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
        </div>
        <div className="col-auto">
          <button
            onClick={addTask}
            className="btn btn-lg text-light btn-default"
          >
            Add Task
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
