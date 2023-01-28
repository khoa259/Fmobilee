import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getDetailBill } from "../../../functions/Bill";
import dateFormat from "dateformat";
import { formatCash } from "../../../component/formatCash";
import { Badge, Descriptions } from "antd";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getProudct = async () => {
      const { data } = await getDetailBill(id);
      console.log("data", data);
      setOrder(data);
    };
    getProudct();
  }, [id]);
  console.log("order", order.username);
  // const { products } = order;
  // console.log("products", products?.price);
  return (
    <div>
      <h1 className="text-center">Chi tiết đơn hàng</h1>
      <div className="container border">
        <div>
          <div>
            <div className="py-2">
              <span className="h4">Họ tên: khoa10688</span>
            </div>
            <div className="py-2">
              <span className="h4">
                Địa Chỉ: số 12 ngõ 258/20 Hạ Đình, Thanh Xuân, Hà Nội{" "}
              </span>
            </div>
            <div className="py-2 ">
              <span className="h4">Email: khoa10688@gmail.com</span>
            </div>
            <div className="py-2 ">
              <span className="h4">Số điện thoại:0964184106</span>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-4">
              <span>Ngày đặt hàng: 15/01/2002</span>
            </div>
            <div className="col-4">
              <span>
                <span>Mã đơn hàng:554545484848</span>
              </span>
            </div>
            <div className="col-4">
              <span>Phương thức thanh toán: Payment</span>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên Sản phẩm</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Giá tiền</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </table>
          <div className="text-end row">
            <span className="h4 col-11 ">Tổng tiền: 15.000.000 đ </span>
          </div>
          <div>
            <Button type="primary">n hóa đơn</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
