import React from "react";
import { PropagateLoader, SyncLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <>
      {loading && (
        // <div className="d-flex justify-content-center my-5">
        <SyncLoader color="#ffffff" size={10} speedMultiplier={0.7} />
        // </div>
      )}
    </>
  );
};

export default Loader;
