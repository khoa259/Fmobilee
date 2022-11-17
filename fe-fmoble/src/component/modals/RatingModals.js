import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleCancle = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
    toast.success("Thanks for your review. It will apper soon");
  };
  const hanleModale = () => {
    if (user && user.token) {
      setShow(true);
    } else {
      navigate("/register");
    }
  };

  return (
    <>
      <div onClick={() => hanleModale()}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Button variant="primary" onClick={hanleModale}>
        Launch demo modal
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Rating star</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancle}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RatingModal;
