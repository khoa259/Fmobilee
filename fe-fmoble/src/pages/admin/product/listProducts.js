import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { getProductsByCount, removeProduct } from "../../../functions/products";
import Spiner from "../../../component/spinner/spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../component/cards/AdminProductCard";
const ListProducts = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { title, description, images } = products;

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
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
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
            <th>Màu sắc</th>
            <th>Số lượng</th>
            <th>Handle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <div key={product._id} className="col-md-4">
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
