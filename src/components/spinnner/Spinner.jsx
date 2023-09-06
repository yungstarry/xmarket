import "./spinner.css";

import React from "react";

const Spinner = () => {
  return (
    <>
      <input className="--spinnnerinput" type="checkbox" id="check" />
      <label className="--spinnerlabel" htmlFor="check">
        <div className="spinnercheck-icon"></div>
      </label>
    </>
  );
};

export default Spinner;
