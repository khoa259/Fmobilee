import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./spinner.css";
const Spiner = () => {
  return (
    //   <div className="text-center mt-3 spinner">
    //     <Spinner animation="border" />
    //   </div>
    // );
    <div className="text-center spinner">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spiner;
