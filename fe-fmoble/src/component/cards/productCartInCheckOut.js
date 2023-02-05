import { Modal, Result } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { emptyUserCart, updateQty } from "../../functions/user";
import { colorProduct } from "../../utils/contants";

import { formatCash } from "../formatCash";

const ProductCartInCheckOut = ({
  p,
  idCart,
  load,
  setLoad,
  total,
  setRemoveItem,
}) => {
  console.log("idCart", idCart);
  console.log("p", p);
  const [isModalFail, setisModalFail] = useState(false);
  const { user, cart } = useSelector((state) => ({ ...state }));
  // console.log("cart", p.product);
  const [quantityState, setQuantityState] = useState(p?.count || 1);
  const getToken = localStorage.getItem("token");
  const quantityPlus = () => {
    setQuantityState(quantityState + 1);
    setLoad(quantityState);
  };

  const decrementQty = () => {
    setQuantityState(quantityState - 1);
    if (quantityState === 1) {
      showModalFail();
    }
    setLoad(quantityState);
  };
  const saveUpdateQty = useCallback(() => {
    const payload = {
      idProduct: p._id,
      count: quantityState > 0,
      cartTotal: total,
    };
    updateQty(idCart, payload);
  }, [quantityState]);

  useEffect(() => {
    saveUpdateQty();
  }, [quantityState]);

  const handleColor = (color) => {
    const result = colorProduct.filter((colorItem) => colorItem.key == color);
    console.log("result", result[0]?.color);
    return result[0]?.color;
  };

  const removeItem = () => {
    emptyUserCart(getToken, idCart, p._id);
    setRemoveItem(p._id);
  };
  const showModalFail = () => {
    setisModalFail(true);
  };
  const handleOkFail = () => {
    setisModalFail(false);
    removeItem();
  };
  const handleCancelFail = () => {
    setisModalFail(false);
  };
  return (
    <>
      <Modal open={isModalFail} onOk={handleOkFail} onCancel={handleCancelFail}>
        <Result subTitle="Ban co muon xoa khong" />
      </Modal>
      <div className="mb-12 py-6 border-top border-bottom">
        <div className="row align-items-center mb-6 mb-md-3">
          <div className="col-12 col-md-8 col-lg-6 mb-6 mb-md-0">
            <div className="row align-items-center">
              <i
                className="fa-sharp fa-solid fa-circle-xmark remove-cart"
                onClick={removeItem}></i>

              <div className="col-12 col-md-4 mb-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-light"
                  style={{ width: 96, height: 128 }}>
                  <img
                    className="img-fluid"
                    style={{ objectFit: "contain" }}
                    src={p.images && p.images.length ? p.images[0].url : ""}
                    alt="#"
                  />
                </div>
              </div>
              <div className="col-6">
                <p className="h5">{p.product.title}</p>
                <br />
                <p className="">
                  PL:{" "}
                  <img
                    src={handleColor(p.color)}
                    style={{
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </p>
                <br />
              </div>
            </div>
          </div>
          <div className="d-none d-lg-block col-lg-2">
            <span className=" span mb-2 text-decoration-line-through">
              {formatCash(`${p.product.price}`)}đ
            </span>
          </div>
          <div className="col-auto col-md-2">
            <div className="d-inline-flex align-items-center px-4 fw-bold text-secondary border rounded-2">
              <button className="btn px-0 py-2" onClick={decrementQty}>
                <i className="fa-solid fa-minus"></i>
              </button>
              <input
                className="form-control px-2 py-4 text-center text-md-end border-0"
                style={{ width: 48 }}
                type="number"
                placeholder={1}
                min="0"
                value={quantityState}
                // onChange={handleQuantityChange}
              />
              <button className="btn px-0 py-2" onClick={quantityPlus}>
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
          <div className="col-auto col-md-2 text-end">
            <span className="span mb-2 text-decoration-line-through">
              {formatCash(`${p.product.price * quantityState}`)}đ
            </span>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default ProductCartInCheckOut;
