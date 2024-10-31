import React from "react";

const PageNotFound = () => {
  return (
    <section
      style={{
        background: "white",
        color: "black",
        padding: "50px 10px",
        marginTop: "10px",
      }}
    >
      <h2 className="my-3">Page not found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button className="btn btn-primary" onClick={() => window.history.back()}>
        Go back
      </button>
    </section>
  );
};

export default PageNotFound;
