import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StarOutlined } from "@ant-design/icons";
const RatingModal = ({ children, product }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { title } = product;

  const handleCancle = () => {
    setShow(false);
  };
  const handleClose = () => {
    setShow(false);
    toast.success(`Cảm ơn bạn đã đánh giá sản phẩm ${product.title}`);
  };
  const hanleModale = () => {
    if (user && user.token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div onClick={() => hanleModale()}>
        {user ? (
          <span className="rate">đánh giá</span>
        ) : (
          "Login to leave rating"
        )}
      </div>

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
