import { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
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
