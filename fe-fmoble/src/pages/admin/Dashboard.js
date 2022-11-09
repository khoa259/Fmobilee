import React from "react";
// import { Container } from "react-bootstrap";
import AdminNav from "../../component/adminNav/adminNavbar";
import { toast } from "react-toastify";

const Dashboard = () => {
  console.log("dashboard");
  return (
    <div className="Container">
      <div className="row">
        {/* <AdminNav /> */}
        <div className="col text-center">
          <h3 className="center">Admin dashboard</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
