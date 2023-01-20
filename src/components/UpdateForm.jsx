const UpdateForm = ({ updateData, updateTask, changeHolder, cancelUpdate }) => {
  return (
    <>
      {/* Update Task */}
      <div className="row mb-5">
        <div className="col">
          <input
            type="text"
            className="form-control form-control-lg"
            value={updateData && updateData.title}
            onChange={(e) => changeHolder(e)}
          />
        </div>
        <div className="col-auto">
          <button
            className="btn btn-lg text-light btn-default mr-20"
            onClick={updateTask}
          >
            Update
          </button>
          <button className="btn btn-lg btn-cancel" onClick={cancelUpdate}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
