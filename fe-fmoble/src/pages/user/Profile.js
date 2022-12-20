import React from "react";
import { Container } from "react-bootstrap";
import UserNav from "../../component/userNavbar/userNavbar";
const Profile = () => {
  return (
    <div>
      <Container>
        <div className="row mt-10">
          <div className="col-md-2 mt-20">
            <UserNav />
          </div>
          <div className="col text-center ">
            <h3 className="center mt-30">Profile about user</h3>
          </div>
        </div>
      </Container>
    </div>
  );
};
export default Profile;
