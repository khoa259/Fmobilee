import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "antd";
import { getDetailBill } from "../../../functions/Bill";
import dateFormat from "dateformat";
import { formatCash } from "../../../component/formatCash";
import { Badge, Descriptions } from "antd";
import axios from "axios";

const OrderDetails = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getProudct = async () => {
      const data = await axios.get("http://localhost:8000/api/bill/" + id);
      console.log("data", data);
      setOrder(data.data);
    };
    getProudct();
  }, [id]);
  console.log("order", order);
  return (
    <div>
      <h1 className="text-center">Chi tiết đơn hàng</h1>
      <Descriptions title="User Info" bordered>
        <Descriptions.Item label="Product">
          {order.products.title}
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
        <Descriptions.Item label="Order time">
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default OrderDetails;
