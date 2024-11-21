import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoApi from "../utils/TodoApi";
import { GlobalContext } from "../context/Provider";
import Loader from "../common/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({ state: true, error: "" });
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(GlobalContext);

  useEffect(() => {
    if (errors.state && errors.error != "") {
      toast.error(`${errors.error}`);
    }
  }, [errors]);

  function validateForm() {
    if (!name || !email || !password || !cPassword) {
      setErrors({ state: true, error: "All fields are mandatory" });
      // toast.error(`${errors?.error}`);
      console.log("executed");
      return true;
    } else if (!(password === cPassword)) {
      setErrors({ state: true, error: "Passwords does not match" });
      // toast.error(`${errors?.error}`);
      return true;
    } else {
      setErrors({ state: false, error: "" });
      return false;
    }
  }

  const initialise = async (data) => {
    try {
      setLoading(true);
      const apiRes = await TodoApi.Users.create(data);
      console.log("apiRes=>", apiRes);
      if (apiRes?.access_token) {
        toast.success("Registered Successfully");
        emptyFields();
        navigate("/login");
      }
    } catch (err) {
      if (err.status === 403)
        toast.error(
          `${err.response.body.error_description}, Please login again`
        );
      if (err.status === 400)
        toast.error(`${err.response.body.error_description}`);
    } finally {
      setLoading(false);
    }
  };

  function submitForm(e) {
    e.preventDefault();
    validateForm();

    const formData = { name, email, password };
    if (!validateForm()) {
      initialise(formData);
    }
  }

  function emptyFields() {
    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
  }

  return (
    <>
      <div className="row">
        <form className="col-lg-4 mt-5 mx-auto">
          <h2 class="fw-bold mb-5">Sign up Now</h2>
          {/* Name input */}
          <div className="form-floating mb-4">
            <input
              type="text"
              id="form2Example0"
              className="form-control input-field"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
              placeholder=""
            />
            <label className="form-label" htmlFor="form2Example0">
              Your Name
            </label>
          </div>

          {/* Email input */}
          <div className="form-floating mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control input-field"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder=""
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
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              placeholder=""
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          {/* Confirm Password input */}
          <div className="form-floating mb-4">
            <input
              type="password"
              id="form2Example3"
              className="form-control input-field"
              onChange={(e) => setCPassword(e.target.value)}
              autoComplete="off"
              placeholder=""
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitForm(e);
                }
              }}
            />
            <label className="form-label" htmlFor="form2Example2">
              Confirm Password
            </label>
          </div>

          {/* Submit button */}
          <button
            onClick={(e) => submitForm(e)}
            type="button"
            className="btn btn-primary btn-block mb-4"
            disabled={loading}
          >
            {loading ? <Loader loading={loading} /> : "Sign up"}
          </button>
          <Link to="/login">Back to login</Link>
        </form>
      </div>
    </>
  );
};

export default Register;
