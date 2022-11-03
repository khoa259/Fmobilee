import React from "react";
import { Container } from "react-bootstrap";
import UserNav from "../../component/userNavbar/userNavbar";
const History = () => {
  return (
    <div>
      <Container>
        <div className="row mt-4">
          <div className="col-md-2">
            <UserNav />
          </div>
          <div className="col text-center">
            <h3 className="center">History about user</h3>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default History;
