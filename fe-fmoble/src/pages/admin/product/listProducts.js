import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getProductsByCount } from "../../../functions/products";
import Spiner from "../../../component/spinner/spinner";
const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error list products", err);
      });
  };

  // panigation

  // const columns = [
  //   {
  //     title: "#",
  //     dataIndex: "key",
  //     key: "key",
  //   },
  //   {
  //     title: "Ảnh",
  //     dataIndex: "images",
  //     key: "images",
  //   },
  //   {
  //     title: "Tên sản phẩm",
  //     dataIndex: "title",
  //     key: "title",
  //   },
  //   {
  //     title: "Giá tiền",
  //     dataIndex: "price",
  //     key: "price",
  //   },
  //   {
  //     title: "Màu sắc",
  //     dataIndex: "color",
  //     key: "color",
  //   },
  //   {
  //     title: "Danh mục",
  //     dataIndex: "category",
  //     key: "name",
  //   },

  //   {
  //     title: "Số lượng",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //   },
  //   {
  //     title: "Vận chuyển",
  //     dataIndex: "shipping",
  //     key: "shipping",
  //   },
  //   {
  //     title: "Sửa",
  //     dataIndex: "edit",
  //     key: "edit",
  //   },
  //   {
  //     title: "Xóa",
  //     dataIndex: "remove",
  //     key: "remove",
  //   },
  // ];
  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
      });
  };
  // const dataSource = products.map((item, index) => {
  //   return {
  //     key: index + 1,
  //     title: item.title,
  //     price: formatCash(`${item.price}`),
  //     images: item.images,
  //     //   description: item.description,
  //     category: item.category,
  //     color: item.color,
  //     quantity: item.quantity,
  //     shipping: item.shipping,
  //   };
  // });

  return (
    <div>
      {loading ? (
        <Spiner />
      ) : (
        <h4 className="text-center">Danh Sách Sản Phẩm</h4>
      )}
      <div className="pt-5">
        <Link to="/admin/product">
          <button className="btn btn-outline-primary mb-4">
            <i className="fa-solid fa-plus"></i> Thêm sản phẩm
          </button>
        </Link>
      </div>

      <div>
        <h5>Có tổng {products.length} sản phẩm</h5>
      </div>
      <hr />
      <Table>
        <thead>
          <tr>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Màu sắc</th>
            <th>Số lượng</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.images} alt="#" />
              </td>
              <td>{item.title}</td>
              <td>{formatCash(`${item.price}`)}</td>
              <td>{item.color}</td>
              <td>
                {item.quantity > 0 ? (
                  item.quantity
                ) : (
                  <p className="text-red">hết hàng</p>
                )}
              </td>
              <td>
                <Link to="">Sửa</Link>
                <button> Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
