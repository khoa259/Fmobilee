import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, Col } from "react-bootstrap";
import { formatCash } from "../../component/formatCash";
import { showAverage } from "../../functions/ratings";

const CategoryHome = () => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{category.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map((product, index) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Card className="my-3 p-2 rounded card-prd" key={index}>
              <NavLink to={`/${product.slug}`}>
                <Card.Img
                  className="img-fluid"
                  src={
                    product.images && product.images.length
                      ? product.images[0].url
                      : ""
                  }
                  variant="top"
                />
              </NavLink>

              <Card.Body>
                <NavLink to={`/product/${product.slug}`}>
                  <h5>{product.title}</h5>
                </NavLink>
                {/* show ratings about products */}
                <h3>
                  {product && product.ratings && product.ratings.length > 0 ? (
                    showAverage(product)
                  ) : (
                    <div className="text-center pt-1 pb-3">No rating yet</div>
                  )}
                </h3>
                {/* <Card.Text as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
              </Card.Text> */}
                <Card.Text as="p" className="price">
                  {formatCash(`${product.price}`)} đ
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
