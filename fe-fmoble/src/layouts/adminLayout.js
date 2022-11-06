import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../component/adminNav/adminNavbar";

const AdminLayout = () => {
  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col mt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
