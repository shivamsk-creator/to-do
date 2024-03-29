import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import { useEffect, useState } from "react";

const UpdateUserTask = ({ updateBox, getTaskList, handleUpdateBox }) => {
  const [updatedTask, setUpdatedTask] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    setUpdatedTask(updateBox.name);
    setUpdateStatus(updateBox.done);
  }, [updateBox]);

  const updateTask = async () => {
    const data = { name: updatedTask, done: updateStatus };

    try {
      const apiRes = await TodoApi.UserTasks.update(updateBox._id, data);

      if (apiRes?.updatedItem?._id) {
        toast.success("Updated Successfully");
        getTaskList();
        handleUpdateBox();
      }
    } catch (err) {
      if (err.status === 401)
        toast.error(`${err.response.body.message}, Please login again`);
      if (err.status === 400) toast.error(`${err.response.body.message}`);
    } finally {
    }
  };

  return (
    <>
      {/* Update Task */}
      <div className="row mb-5">
        <div className="col">
          <input
            type="text"
            className="form-control form-control-lg"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <button
            className="btn btn-lg text-light btn-primary mr-20"
            onClick={() => updateTask(updateBox)}
          >
            Update
          </button>
          <button
            className="btn btn-lg btn-warning"
            onClick={() => handleUpdateBox()}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateUserTask;
