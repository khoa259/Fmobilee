import React from "react";

import NewArrivels from "../component/home/NewArrivels";
import BestSeller from "../component/home/BestSeller";

const HomePage = () => {
  return (
    <>
      <div>
        <NewArrivels />
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSeller />
    </>
  );
};

export default HomePage;
