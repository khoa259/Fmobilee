import React from "react";

import NewArrivels from "../component/home/NewArrivels";
import BestSeller from "../component/home/BestSeller";

const HomePage = () => {
  return (
    <>
      <div>
        <NewArrivels />
      </div>
      <div>
        <BestSeller />
      </div>
    </>
  );
};

export default HomePage;
