import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getDetailBill } from "../../../functions/Bill";
import dateFormat from "dateformat";
import { formatCash } from "../../../component/formatCash";
import { Badge, Descriptions } from "antd";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    const getProudct = async () => {
      const { data: newData } = await getDetailBill(id);
      console.log("data", newData);
      setData(newData);
      setOrder(newData);
    };
    getProudct();
  }, [id]);
  console.log("order", order);
  // const { products } = order;
  // console.log("products", products?.price);
  return (
    <div>
      <h1 className="text-center">Chi tiết đơn hàng</h1>
      <div className="container border">
        <div>
          <div>
            <div className="py-2 ">
              <span className="h4">Họ tên: {data?.orderdBy?.name}</span>
            </div>
            <div className="py-2">
              <span className="h4">Địa Chỉ: {data?.orderdBy?.address}</span>
            </div>
            <div className="py-2 ">
              <span className="h4">Email: {data?.orderdBy?.email}</span>
            </div>
            <div className="py-2 ">
              <span className="h4">
                Số điện thoại: {data?.orderdBy?.phoneNumber}
              </span>
            </div>
          </div>
          <div className="row pt-4">
            <div className="col-5">
              Ngày đặt hàng:{" "}
              <span className="h5">
                {dateFormat(data?.createdAt, "dd/mm/yyyy - hh:MM:ss TT")}
              </span>
            </div>
            <div className="col-4">
              Mã đơn hàng:
              <span className="h5">{data?.tradingCode}</span>
            </div>
            <div className="col-3">
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
              {data?.products?.map((item, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td className="h5">{item.title}</td>
                  <td>{item.count}</td>
                  <td className="h5">{formatCash(`${item.price}`)} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end row">
            <span className="h4 col-11 ">
              Tổng tiền: {formatCash(`${data?.billTotal}`)} đ
            </span>
          </div>
          <div className="pt-3">
            <Button type="primary">In hóa đơn</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
