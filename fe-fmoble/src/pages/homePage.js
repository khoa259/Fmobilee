import React from "react";

import NewArrivels from "../component/home/NewArrivels";
import BestSeller from "../component/home/BestSeller";
import Category from "../component/category/Category";

const HomePage = () => {
  return (
    <>
      <div>
        <NewArrivels />
      </div>
      <BestSeller />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <Category />
    </>
  );
};

export default HomePage;
