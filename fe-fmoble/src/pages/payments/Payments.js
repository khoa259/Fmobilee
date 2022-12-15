import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./payment.css";
import { Button, Modal, Result, Space } from "antd";
import { formatCash } from "../../component/formatCash";
import { getUserCart } from "../../functions/user";
import { createBill } from "../../functions/Bill";
//load stripe outside of components render to avoid
const Payments = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const { handleSubmit, register } = useForm();
  const { email } = user;
  const urlPaymentReturn = window.location.search;
  // console.log("urlPaymentReturn", urlPaymentReturn);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFail, setisModalFail] = useState(false);
  const navigate = useNavigate();

  console.log("email", email);
  //call APi return Vnpay
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/order/vnpay_return${urlPaymentReturn}`)
      .then((res) => {
        const getToken = localStorage.getItem("token");
        getUserCart(getToken).then((res) => {
          console.log("res Products", res);
          setProducts(res.data.products);
        });
      });
  }, []);

  // get value in url
  const myKeyValue = window.location.search;
  console.log("myKeyValue", myKeyValue);
  const urlParams = new URLSearchParams(myKeyValue);
  const vnp_Amount = urlParams.get("vnp_Amount");
  console.log("vnp_Amount", vnp_Amount);
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

  //Handle SUbmit form
  const onSubmit = (data) => {
    // const newData = {
    //   ...data,
    //   products: products.map((product) => product.product),
    // };
    // createBill(newData).then(showModal()).catch(showModalFail());
    console.log("data", data);
  };
  const showModalFail = () => {
    setisModalFail(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    navigate("/");
  };
  const handleOkFail = () => {
    setisModalFail(false);
    navigate("/");
  };

  const handleCancelFail = () => {
    setisModalFail(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Result
          status="success"
          title="Đơn hàng đã được xác nhận thành công"
          subTitle="Đơn hàng của quý khách đã được xác nhận thành công, cùng mua sắm tiếp nhé"
          extra={[<Button key="buy">Buy Again</Button>]}
        />
        ;
      </Modal>
      <Modal open={isModalFail} onOk={handleOkFail} onCancel={handleCancelFail}>
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Link to={"/"}>
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </Modal>
      <div className="container p-5 ">
        <h2 className="text-center">Đơn Hàng Thanh Toán</h2>
        <div className="pt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span></span>
            <div className="col-md-8 offset-md-2">
              {products.map((p, i) => (
                <div className="row" key={i}>
                  <div className="col-lg-4 ">
                    <input
                      className="input-bill-title"
                      type="text"
                      {...register("name")}
                      value={p?.product?.title}
                    />
                  </div>

                  <div className="col-lg-4 ">
                    <input
                      className="input-bill-title"
                      type="text"
                      {...register("price")}
                      value={formatCash(`${p?.product?.price}`)}
                    />
                    <br />
                  </div>

                  <div className="col-4 text-success">
                    <span className="bill">
                      {formatCash(`${p?.product?.price}`)} đ
                    </span>
                  </div>
                </div>
              ))}

              <div>
                <span className="bill">
                  Tên người đặt hàng
                  <input
                    className="input-bill"
                    type="text"
                    {...register("username")}
                    value={user?.email}
                  />
                </span>
              </div>
              <div>
                <span className="bill">
                  Tên người đặt hàng
                  <input
                    className="input-bill"
                    type="text"
                    {...register("idCart")}
                    value={"6399d0c17e5cac3f0852d6b1"}
                  />
                </span>
              </div>
              <div>
                <span className="bill">
                  Tên người đặt hàng
                  <input
                    className="input-bill"
                    type="text"
                    {...register("status")}
                    value={"6391f4358e713e3070f753bb"}
                  />
                </span>
              </div>

              <hr />
              <div>
                <div>
                  <span className="bill">
                    Mã giao dịch:
                    <input
                      className="input-bill"
                      type="text"
                      {...register("tradingCode")}
                      value={vnp_TransactionNo}
                    />
                  </span>
                </div>
                <div>
                  <span className="bill">
                    Thời gian thanh toán:{" "}
                    <input
                      className="input-bill"
                      type="text"
                      {...register("timePayment")}
                      value={vnp_PayDate}
                    />
                  </span>
                </div>
              </div>
              <div className="row mt-3 ">
                <div className="col-lg-9 col-2">
                  <span className="bill">Tổng hóa đơn thanh toán</span>
                </div>
                <div className="col-3 text-success">
                  <input
                    className="input-bill-total"
                    type="number"
                    {...register("billTotal")}
                    value={vnp_Amount / 100}
                  />
                </div>
              </div>
              <div className="text-center mt-5">
                <button className="btn btn-success text-center rounded">
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payments;
