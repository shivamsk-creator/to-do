import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/Provider";

const Header = () => {
  const navigate = useNavigate();
  const { authState, logOutNow } = useContext(GlobalContext);

  return (
    <div className="d-flex justify-content-end">
      {!authState?.isLogin && (
        <button
          onClick={() => navigate("/to-do/login")}
          type="button"
          className="btn btn-outline-light h-fit"
        >
          Login
        </button>
      )}

      {/* user */}
      {authState?.isLogin && (
        <div className="dropdown text-end m-2">
          <a
            href="#"
            className="d-flex align-items-center justify-content-center link-dark text-decoration-none dropdown-toggle "
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {/* <img
              src="https://github.com/mdo.png"
              alt="mdo"
              width={32}
              height={32}
              className="rounded-circle"
            /> */}

            <div className=" avatar text-capitalize">
              {authState?.name.charAt(0)}
            </div>
          </a>
          <ul
            className="dropdown-menu text-small"
            aria-labelledby="dropdownUser1"
            style={{}}
          >
            <li>
              <a className="dropdown-item" href="#" onClick={() => logOutNow()}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
