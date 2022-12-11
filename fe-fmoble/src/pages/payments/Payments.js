import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatCash } from "../../component/formatCash";

//load stripe outside of components render to avoid
const Payments = () => {
  const [payment, setPayment] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/order/vnpay_return`, { vnpUrl: url })
  //     .then((res) => {
  //       window.location.pathname = res.data.url;
  //     });
  // }, []);
  const myKeyValue = window.location.search;
  console.log(myKeyValue);
  const urlParams = new URLSearchParams(myKeyValue);
  const vnp_Amount = urlParams.get("vnp_Amount");
  const vnp_BankCode = urlParams.get("vnp_BankCode");
  const vnp_PayDate = urlParams.get("vnp_PayDate");
  const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
  const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");

  return (
    <div className="container p-5 ">
      <h4 className="text-center">Đơn Hàng Thanh Toán</h4>
      <div className="col-md-8 offset-md-2 ">
        <div className="row mt-3 ">
          <div className="col-lg-9 col-2">
            <p>Tổng hóa đơn thanh toán</p>
          </div>
          <div className="col-3 text-success">
            <span>{formatCash(`${vnp_Amount}`)} đ</span>
          </div>
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
          <div>
            <span>
              kêt quả:
              {/* {vnp_ResponseCode?.vnp_ResponseCode !== "00" && (
                <strong className="text-success">Thanh toán thành công</strong>
              )} */}
            </span>
          </div>
        </div>
        <div className="text-center mt-5">
          <button type="button" class="btn btn-success text-center">
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
