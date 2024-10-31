import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <HashLoader color="#0053a6" />
        </div>
      )}
    </>
  );
};

export default Loader;
