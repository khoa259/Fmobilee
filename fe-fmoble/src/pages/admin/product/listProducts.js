import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { getProductsByCount, removeProduct } from "../../../functions/products";
import Spiner from "../../../component/spinner/spinner";
const ListProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { images } = product;

  console.log("prd", products);
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
  const handleRemove = (slug) => {
    // let answer = window.confirm("Delete?");
    if (window.confirm("Delete?")) {
      console.log("send delete request", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data} is deleted`);
        })
        .catch((err) => {
          if (err.response?.status === 400) toast.error(err.response.data);
          console.log("lỗi", err);
        });
    }
  };

  const formatCash = (str) => {
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ".") + prev;
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
            {/* <th>Danh mục </th> */}
            <th>Màu sắc</th>
            <th>Số lượng</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                {console.log(product.images)}
                <img
                  src={
                    product.images && product.images.length
                      ? product.images[0].url
                      : ""
                  }
                  alt={product.images}
                  style={{ height: "80px", objectFit: "cover" }}
                  className="m-2"
                />
              </td>
              <td>{product.title}</td>
              <td>{formatCash(`${product.price}`)}</td>
              <td>{product.color}</td>
              <td>
                {product.quantity > 0 ? (
                  product.quantity
                ) : (
                  <p className="text-red">hết hàng</p>
                )}
              </td>
              <td>
                <Link to={`/admin/product/${product.slug}`}>Sửa</Link>
                <button onClick={() => handleRemove(`${product.slug}`)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
