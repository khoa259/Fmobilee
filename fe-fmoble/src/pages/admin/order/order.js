import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import dateFormat from "dateformat";

import { getAllBill } from "../../../functions/Bill";
import { formatCash } from "../../../component/formatCash";
import { Link } from "react-router-dom";

const Order = () => {
  const [order, setOrder] = useState([]);
  console.log("order", order);
  useEffect(() => {
    getAllBill().then((res) => {
      console.log("res", res);
      setOrder(res.data);
    });
  }, []);
  console.log("order", order);
  const dataSource = order.map((item, index) => {
    return {
      key: index + 1,
      name: item?.username,
      billTotal: formatCash(`${item.billTotal}`),
      status: item.status,
      updatedAt: dateFormat(new Date(item.updatedAt), "dd/mm/yyyy"),
      detail: (
        <Link to={`/order/${item._id}`}>
          <Button type="primary">xem chi tiết</Button>
        </Link>
      ),
    };
  });

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên người đặt",
      dataIndex: "name",
    },
    {
      title: "Tổng Tiền",
      dataIndex: "billTotal",
      sorter: (a, b) => a.billTotal - b.billTotal,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "updatedAt",
    },
    {
      title: "trạng thái đơn hàng",
      dataIndex: "status",
    },
    {
      title: "Xử lý",
      dataIndex: "detail",
    },
  ];
  const onChange = (sorter) => {
    console.log("params", sorter);
  };
  return (
    <div>
      Order
      <h2>đơn hàng</h2>
      <Table dataSource={dataSource} columns={columns} onChange={onChange} />;
    </div>
  );
};

export default Order;
