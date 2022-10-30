import React from "react";
import AdminNav from "../component/adminNav/adminNavbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">{children}</div>
    </div>
  );
};

export default AdminLayout;
