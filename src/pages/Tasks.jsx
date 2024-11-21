import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Provider";
import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import UpdateForm from "../components/UpdateForm";
import moment from "moment";
import Loader from "../common/Loader";

const Tasks = () => {
  const [newTask, setNewTask] = useState("");

  const [updateBox, setUpdateBox] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async () => {
    try {
      // setLoading(true);
      const apires = await TodoApi.Tasks.list();
      setTaskList(apires);
      console.log("api response is=> ", apires);
    } catch (err) {
      if (err.status === 401)
        toast.error(
          `${err.response.body.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
      // setLoading(false);
    }
  };

  const addTask = async () => {
    const data = { name: newTask };
    try {
      setLoading(true);
      const apiRes = await TodoApi.Tasks.create(data);
      console.log("apiRes=>", apiRes);
      if (apiRes?._id) {
        toast.success("Task Added Successfully");
        setNewTask("");
        getTaskList();
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

  const deleteTask = async (id) => {
    try {
      const apiRes = await TodoApi.Tasks.delete(id);
      console.log("apiRes=>", apiRes);
      if (apiRes?._id) {
        toast.success("Deleted Successfully");
        getTaskList();
      }
    } catch (err) {
      if (err.status === 401)
        toast.error(
          `${err.response.body.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
    }
  };

  const handleUpdateBox = () => {
    setUpdateBox("");
  };

  const markTaskDone = async (task) => {
    const data = { name: task.name, done: !task.done };
    try {
      const apiRes = await TodoApi.Tasks.update(task._id, data);
      console.log("apiRes=>", apiRes);
      if (apiRes?.updatedTask?._id) {
        getTaskList();
      }
    } catch (err) {
      if (err.status === 401)
        toast.error(
          `${err.response.body.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
    }
  };

  return (
    <div>
      <h1 className="pt-3 pb-5">To do List</h1>
      {/* ADD Task */}
      {!updateBox && (
        <div className="row mb-5">
          <div className="col">
            <input
              type="text"
              className="form-control form-control-lg"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
              placeholder="Visit the doctor at 5pm"
            />
          </div>

          <div className="col-auto">
            <button
              onClick={addTask}
              className="btn btn-lg text-light btn-primary"
            >
              {loading ? <Loader loading={loading} /> : "Add Task"}
            </button>
          </div>
        </div>
      )}

      {/* Update Task */}
      {/* {updateBox && (
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
              onClick={() => setUpdateBox(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )} */}

      {updateBox && (
        <UpdateForm
          updateBox={updateBox}
          getTaskList={getTaskList}
          handleUpdateBox={handleUpdateBox}
        />
      )}

      {/* Task list  */}
      {taskList &&
        taskList
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => {
            return (
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.done ? "done" : ""}>
                    <span className="taskNumber me-3">{index + 1}</span>
                    <span className="taskText text-capitalize">
                      {task.name}
                    </span>
                  </div>
                  <div className="iconsWrap">
                    {/* <span className="text-white fs-6">
                      {moment(task.updatedAt).format("DD MMM YYYY HH:MM ")}
                    </span> */}
                    <span
                      className="Completed / Not Completed"
                      onClick={(e) => markTaskDone(task)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>
                    {task.done ? null : (
                      <span
                        className="Edit"
                        onClick={() => {
                          setUpdateBox(task);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                    )}
                    <span
                      className="Delete"
                      onClick={() => deleteTask(task._id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}

      {taskList && taskList.length ? "" : "No Tasks....."}
    </div>
  );
};

export default Tasks;
