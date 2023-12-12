import { useContext, useState } from "react";
// import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTaskForm from "./components/AddTaskForm";
import UpdateForm from "./components/UpdateForm";
import ToDo from "./components/ToDo";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import UserTasks from "./pages/UserTasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "./context/Provider";

function App() {
  const { authState } = useContext(GlobalContext);
  // To do list state
  const [toDo, setToDo] = useState([
    { id: 1, title: "Meeting with Client", status: false },
    { id: 2, title: "Lunch with Sam", status: false },
    { id: 3, title: "Coffee meet with Karan", status: false },
  ]);

  // Temp State
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  // Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      setToDo([...toDo, { id: num, title: newTask, status: false }]);
      setNewTask("");
    }
  };

  // Delete Task
  const deleteTask = (id) => {
    setToDo(toDo.filter((task) => task.id !== id));
  };

  // Mark task as done or completed
  const markDone = (id) => {
    setToDo(
      toDo.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  // Cancel Update
  const cancelUpdate = () => {
    setUpdateData("");
  };

  // Change task for Update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id);
    setToDo([...removeOldRecord, updateData]);

    setUpdateData("");
  };

  return (
    <div className="container App py-5">
      <Header />

      <Routes>
        <Route
          path="/"
          exact={true}
          element={authState?.isLogin ? <UserTasks /> : <Tasks />}
        />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/register" exact={true} element={<Register />} />
      </Routes>

      {/* Toastify */}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
