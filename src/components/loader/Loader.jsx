import React from "react";
import "./Loading.css";

const Loader = () => {
  return (
    <div className="loading">
      <input className="--input" type="checkbox" id="check" />
      <label className="--label" htmlFor="check">
        <div className="check-icon"></div>
      </label>
    </div>
  );
};

export default Loader;
