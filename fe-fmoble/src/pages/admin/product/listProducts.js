import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getProductsByCount } from "../../../functions/products";
import Spiner from "../../../component/spiner";
const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error list products", err);
      });
  };
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "name",
    },

    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Vận chuyển",
      dataIndex: "shipping",
      key: "shipping",
    },
    {
      title: "Sửa",
      dataIndex: "edit",
      key: "edit",
    },
    {
      title: "Xóa",
      dataIndex: "remove",
      key: "remove",
    },
  ];

  const dataSource = products.map((item, index) => {
    return {
      key: index + 1,
      title: item.title,
      price: item.price,
      //   description: item.description,
      category: item.category,
      color: item.color,
      quantity: item.quantity,
      shipping: item.shipping,
    };
  });
  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <h4 className="text-center">Danh Sách Sản Phẩm</h4>
      )}
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default ListProducts;
