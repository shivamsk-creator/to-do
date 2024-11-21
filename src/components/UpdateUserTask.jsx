import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

const UpdateUserTask = ({ updateBox, getTaskList, handleUpdateBox }) => {
  const [updatedTask, setUpdatedTask] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUpdatedTask(updateBox.name);
    setUpdateStatus(updateBox.done);
  }, [updateBox]);

  const updateTask = async () => {
    if (!updatedTask) return toast.error("Task name is required");

    const data = { name: updatedTask, done: updateStatus };

    try {
      setLoading(true);
      const apiRes = await TodoApi.UserTasks.update(updateBox._id, data);

      if (apiRes?.updatedTask?._id) {
        toast.success("Updated Successfully");
        getTaskList();
        handleUpdateBox();
      }
    } catch (err) {
      if (err.status === 401)
        toast.error(
          `${err.response.body.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
      setLoading(false);
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateTask(updateBox);
              }
            }}
            placeholder="Update Task"
          />
        </div>

        <div className="col-auto">
          <button
            className="btn btn-lg text-light btn-primary mr-20"
            onClick={() => updateTask(updateBox)}
          >
            {loading ? <Loader loading={loading} /> : "Update"}
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
