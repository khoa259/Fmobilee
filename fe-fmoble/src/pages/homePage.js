import React from "react";

import NewArrivels from "../component/home/NewArrivels";
import BestSeller from "../component/home/BestSeller";

const HomePage = () => {
  return (
    <>
      <div>
        <NewArrivels />
      </div>
      <BestSeller />
    </>
  );
};

export default HomePage;
