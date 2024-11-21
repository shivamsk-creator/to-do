import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import LoginSuccess from "../context/actions/auth/LoginSuccess";
import { GlobalContext } from "../context/Provider";
import Loader from "../common/Loader";

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
        const payload = apiRes.data;
        LoginSuccess({
          access_token: apiRes.access_token,
          ...payload,
          role: "user",
        })(authDispatch);
        TodoApi.setToken(apiRes?.access_token);
        localStorage.setItem("token", apiRes?.access_token);
        emptyFields();
        toast.success("Successfully LoggedIn");
        navigate("/");
      }
    } catch (err) {
      console.log("err=>", err.response.body.error_description);

      if (err.status === 403)
        toast.error(
          `${err?.response?.body?.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err?.response.body?.error_description}`);
    } finally {
      setLoading(false);
    }
  };
  // hello

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
          <div className="form-floating mb-4 text-primary">
            <input
              type="email"
              id="form2Example1"
              className="form-control input-field"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@example.com"
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>
          {/* Password input */}
          <div className="form-floating mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control input-field"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitForm(e);
                }
              }}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* Submit button */}
          <button
            onClick={(e) => submitForm(e)}
            type="button"
            className="btn btn-primary btn-block mb-4"
          >
            {loading ? <Loader loading={loading} /> : "Sign in"}
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
