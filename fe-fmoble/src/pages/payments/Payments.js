import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatCash } from "../../component/formatCash";
import { getUserCart } from "../../functions/user";
//load stripe outside of components render to avoid
const Payments = () => {
  const { user } = useSelector((state) => ({ ...state }));
  // debugger;
  const urlPaymentReturn = window.location.search;
  console.log("urlPaymentReturn", urlPaymentReturn);
  const [products, setProducts] = useState([]);
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
  const myKeyValue = window.location.search;
  console.log(myKeyValue);
  const urlParams = new URLSearchParams(myKeyValue);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");

  const handleSubmit = () => {};
  return (
    <div className="container p-5 ">
      <h4 className="text-center">Đơn Hàng Thanh Toán</h4>
      <form>
        <div className="col-md-8 offset-md-2 ">
          <div className="row mt-3 ">
            <div className="col-lg-9 col-2">
              <p>Tổng hóa đơn thanh toán</p>
            </div>
            <div className="col-3 text-success">
              <span>{formatCash(`${vnp_Amount}`)} đ</span>
            </div>
          </div>
          <div className="row mt-3 ">
            <div className="col-lg-9 col-2">
              <p>Sản phẩm đã thanh toán</p>
            </div>
            {products.map((p, i) => (
              <>
                <div className="col-3 text-success">
                  <span>{p.product.title}</span>
                </div>
                <div className="col-3 text-success">
                  <span>{p.product.price}</span>
                </div>
              </>
            ))}
          </div>
          <div>
            <span> Người thanh toán: {user?.name}</span>
            <br></br>
            <span> Địa chỉ email: {user?.email}</span>
          </div>
          <hr />
          <div>
            <div>
              <span> Mã giao dịch: {vnp_TransactionNo}</span>
            </div>
            <div>
              <span>Ngân hàng: {vnp_BankCode}</span>
            </div>
            <div>
              <span>thời gian thanh toán: {vnp_PayDate}</span>
            </div>
          </div>
          <div className="text-center mt-5">
            <button
              type="submit"
              onClick={handleSubmit()}
              className="btn btn-success text-center"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payments;
