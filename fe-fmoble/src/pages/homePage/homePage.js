import React from "react";

import "./homePage.css";
import subBanner from "../../images/banner-doanh-nghiep.jpg";
import NewArrivels from "../../component/home/NewArrivels";
import BestSeller from "../../component/home/BestSeller";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div>
        <NewArrivels />
      </div>
      {/* <div>
        <BestSeller />
      </div> */}
      <div className="sub-banner container">
        <Link to="/products">
          <img src={subBanner} className="img-fluid" />
        </Link>
      </div>
    </>
  );
};

export default HomePage;
