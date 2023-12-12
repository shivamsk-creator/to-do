import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import LoginSuccess from "../context/actions/auth/LoginSuccess";
import { GlobalContext } from "../context/Provider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ state: true, error: "" });
  const navigate = useNavigate();
  const { loading, setLoading, authDispatch } = useContext(GlobalContext);

  useEffect(() => {
    if (errors.state && errors.error != "") {
      toast.error(`${errors.error}`);
    }
  }, [errors]);

  const initialise = async (data) => {
    try {
      setLoading(true);
      const apiRes = await TodoApi.Users.login(data);
      console.log("apiRes=>", apiRes);
      if (apiRes.access_token) {
        const payload = apiRes.payload;
        LoginSuccess({
          access_token: apiRes.access_token,
          ...payload,
          role: "user",
        })(authDispatch);
        emptyFields();
        toast.success("Successfully LoggedIn");
        navigate("/");
      }
    } catch (err) {
      if (err.status === 401)
        toast.error(`${err.response.body.message}, Please login again`);
      if (err.status === 400) toast.error(`${err.response.body.message}`);
    } finally {
      setLoading(false);
    }
  };

  function validateForm() {
    if (!email || !password) {
      setErrors({ state: true, error: "All fields are mandatory" });
      // toast.error(`${errors?.error}`);
      console.log("executed");
      return true;
    } else {
      setErrors({ state: false, error: "" });
      return false;
    }
  }

  function submitForm(e) {
    e.preventDefault();
    validateForm();

    const formData = { email, password };
    if (!validateForm()) {
      initialise(formData);
    }
  }

  function emptyFields() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <div className="row">
        <form className="col-lg-4 mt-5 mx-auto">
          <h2 class="fw-bold mb-5">Sign in</h2>
          {/* Email input */}
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control input-field"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label text-white" htmlFor="form2Example1">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control input-field"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label  text-white" htmlFor="form2Example2">
              Password
            </label>
          </div>
          {/* 2 column grid layout for inline styling */}
          {/* <div className="row mb-4">
          <div className="col d-flex justify-content-center"> */}
          {/* Checkbox */}
          {/* <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue=""
                id="form2Example31"
                defaultChecked=""
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>
          <div className="col"> */}
          {/* Simple link */}
          {/* <a href="#!">Forgot password?</a>
          </div>
        </div> */}
          {/* Submit button */}
          <button
            onClick={(e) => submitForm(e)}
            type="button"
            className="btn btn-primary btn-block mb-4"
          >
            Sign in
          </button>
          <div>
            Don't have an account ??{" "}
            <Link to="/register" className="hover-text-light hover-underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
