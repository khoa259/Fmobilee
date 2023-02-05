import React, { useEffect, useState } from "react";
import { Table, Button, Select } from "antd";
import dateFormat from "dateformat";

import { getAllBill } from "../../../functions/Bill";
import { formatCash } from "../../../component/formatCash";
import { Link } from "react-router-dom";
import { getListStatus } from "../../../functions/status";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Order = () => {
  const [order, setOrder] = useState([]);
  const [status, setStatus] = useState([]);

  const { orderBy } = order;
  console.log("orderBy", orderBy);
  useEffect(() => {
    getAllBill().then((res) => {
      console.log("res", res);
      setOrder(res.data);
    });
    const getStatus = axios
      .get("http://localhost:8000/api/status")
      .then((res) => setStatus(res.data))
      .catch((error) => console.log("error", error.message));
  }, []);
  console.log("orders-----", order.orderBy);
  console.log("status", status);
  const onChangStatus = async (billId, dataStatus) => {
    try {
      const changeStatus = await axios.put(
        `http://localhost:8000/api/bill/${billId}`,
        {
          status: dataStatus,
        }
      );
      toast.success("Change Status Success");
    } catch (error) {
      toast.warning("Change Status Fail");
    }
  };
  const dataSource = order?.map((item, index) => {
    console.log("item", item);
    return {
      key: index + 1,
      name: item?.orderdBy?.name,
      billTotal: formatCash(`${item.billTotal}`),
      status: (
        <Select
          onChange={(data) => onChangStatus(item._id, data)}
          defaultValue={item.status}
          style={{
            width: 180,
          }}
          disabled={
            item.status === "63dfc0780bc8b74b60a7eab2" ||
            item.status === "6391f48b8e713e3070f753c3"
          }
          options={status.map((item) => {
            return {
              value: item._id,
              label: item.name,
            };
          })}
        />
      ),
      updatedAt: dateFormat(new Date(item.updatedAt), "dd/mm/yyyy"),
      detail: (
        <Link to={`${item._id}`}>
          <Button type="primary">xem chi tiết</Button>
        </Link>
      ),
    };
  });

  console.log("dataSource", dataSource);
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
