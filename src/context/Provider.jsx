import { createContext, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoutSuccess from "./actions/auth/LogoutSuccess";
import auth from "./reducers/auth";
import { useEffect } from "react";
import TodoApi from "../utils/TodoApi";

export const GlobalContext = createContext({});

function GlobalProvider(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const [temp, setTemp] = useState("");

  const [authState, authDispatch] = useReducer(auth, {}, () => {
    const localAuthState = localStorage.getItem("userState");
    // console.log("localAuthState =>", localAuthState);
    // if (localAuthState)
    setTemp(localAuthState ? JSON.parse(localAuthState) : localAuthState);
    TodoApi.setToken(temp?.access_token);
    return localAuthState ? JSON.parse(localAuthState) : {};
  });

  const scrollToTop = () => {
    if (window) {
      window.scrollTo(0, 0);
    }
  };

  const logOutNow = () => {
    logoutSuccess({})(authDispatch);
    navigate("/to-do", { replace: true });
  };

  useEffect(scrollToTop, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("userState", JSON.stringify(authState));
    TodoApi.setToken(temp?.access_token);
  }, [authState]);

  useEffect(() => {
    if (!localStorage.getItem("userState")) {
      logOutNow();
    }
  }, [localStorage.getItem("userState")]);

  return (
    <GlobalContext.Provider
      value={{
        loading,
        setLoading,
        authState,
        authDispatch,
        logOutNow,
        ...props,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;
