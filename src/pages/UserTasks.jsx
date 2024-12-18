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
import UpdateUserTask from "../components/UpdateUserTask";
import Loader from "../common/Loader";

const UserTasks = () => {
  const [newTask, setNewTask] = useState("");
  const [updateBox, setUpdateBox] = useState("");
  const [taskList, setTaskList] = useState([]);
  const { authState } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTaskList();
  }, []);

  const getTaskList = async () => {
    try {
      // setLoading(true);
      const apires = await TodoApi.UserTasks.getMytasks();
      setTaskList(apires);
      console.log("api response is=> ", apires);
    } catch (err) {
      // if (err.status === 403)
      //   toast.error(`${err.response.body.error_description}, Please login again`);
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
      // setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask) return toast.error("Task name is required");
    const data = { name: newTask, user: authState._id };
    try {
      setLoading(true);
      const apiRes = await TodoApi.UserTasks.create(data);
      console.log("apiRes=>", apiRes);
      if (apiRes?._id) {
        toast.success("Task Added Successfully");
        setNewTask("");
        getTaskList();
      }
    } catch (err) {
      console.log("err=>", err.response.body.error_description);

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
      const apiRes = await TodoApi.UserTasks.delete(id);
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
      const apiRes = await TodoApi.UserTasks.update(task._id, data);
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
      <h1 className="pt-3 pb-5">
        To do List -{" "}
        <span className="text-capitalize">{authState?.name.split(" ")[0]}</span>
      </h1>
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
              placeholder="Meeting with client"
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
      {updateBox && (
        <UpdateUserTask
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

export default UserTasks;
