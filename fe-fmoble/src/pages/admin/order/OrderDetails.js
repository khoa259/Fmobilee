import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getDetailBill } from "../../../functions/Bill";
import dateFormat from "dateformat";
import { formatCash } from "../../../component/formatCash";
import { Badge, Descriptions } from "antd";
import { difference } from "lodash";

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
  console.log("order", data);
  // const { products } = order;
  // console.log("products", products?.price);
  return (
    <div>
      <h1 className="text-center">Chi tiết đơn hàng</h1>
      <div className="container border">
        <div>
          {/* {order?.map((info, inx) => ( */}
          <div>
            <div className="py-2 ">
              <span className="h4">Họ tên: {order.username}</span>
            </div>
            <div className="py-2">
              <span className="h4">Email: {order.email}</span>
            </div>
            <div className="py-2 ">
              <span className="h4">Số điện thoại: {order.phoneNumber}</span>
            </div>
            <div className="py-2 ">
              <span className="h4">Địa Chỉ: {order.address}</span>
            </div>
          </div>
          {/* ))} */}
          <div className="row pt-4">
            <div className="col-4">
              Ngày đặt hàng:{" "}
              <span className="h5">
                {dateFormat(data?.createdAt, "dd/mm/yyyy - hh:MM:ss TT")}
              </span>
            </div>
            <div className="col-4">
              Mã đơn hàng:
              <span className="h5">{data?.tradingCode}</span>
            </div>
            <div className="col-4">
              Phương thức thanh toán:{" "}
              <span className="h5">
                {order.cardType === "ATM" ? "Payment" : "COD"}
              </span>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Ảnh sản phẩm</th>
                <th scope="col">Tên Sản phẩm</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Giá tiền</th>
              </tr>
            </thead>

            <tbody>
              {data?.products?.map((item, i) => {
                console.log("item:", item);
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">
                      {data?.images[i].slice(0, 1).map((item, index) => {
                        return (
                          <div key={index}>
                            <img src={`${item.url}`} width={150} />
                          </div>
                        );
                      })}
                      {console.log("data.images[i].url", data?.images[i])}
                    </th>
                    <td className="h5">{item.title}</td>
                    {/*  */}
                    <td>{order.cardType !== "ATM" ? "3" : `${data.count}`}</td>
                    <td className="h5">{formatCash(`${item.price}`)} đ</td>
                  </tr>
                );
              })}
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
