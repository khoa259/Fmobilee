import React from "react";
import "./spinner.css";
const Spiner = () => {
  return (
    <div className="text-center spinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spiner;
