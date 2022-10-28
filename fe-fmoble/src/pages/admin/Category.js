import React from "react";
import { Container } from "react-bootstrap";
import AdminNav from "../../component/adminNav/adminNavbar";

const Category = () => {
  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col text-center">
            <h3 className="center">Category create</h3>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
