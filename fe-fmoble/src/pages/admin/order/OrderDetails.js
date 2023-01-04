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
  console.log("order", order.products);
  // const { products } = order;
  // console.log("products", products?.price);
  return (
    <div>
      <h1 className="text-center">Chi tiết đơn hàng</h1>
      {/* {JSON.stringify(order.products)} */}
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Tên sản phẩm">
          {order?.products?.map((p, i) => (
            <div key={i}>
              <span className="h5">{p.title}</span>
            </div>
          ))}
          {/* {order.products.title} */}
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Thời gian đặt hàng">
          <span className="h5">
            {dateFormat(order.updatedAt, "dd/mm/yyyy - HH:MM:s")}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="Tổng tiền" span={2}>
          <span className="h5">{formatCash(`${order.billTotal}`)}đ</span>
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary">In hóa đơn</Button>
    </div>
  );
};

export default OrderDetails;
