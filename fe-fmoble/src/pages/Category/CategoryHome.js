import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Card, Col, Container } from "react-bootstrap";
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
    <div className="container">
      <Container>
        <div className="row">
          <div className="col">
            {loading ? (
              <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Loading...
              </h4>
            ) : (
              <h3 className="text-center p-3 mt-5 mb-5 ">{category.name}</h3>
            )}
          </div>
        </div>

        <div className="row">
          {products.map((product, index) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="card-prd" key={index}>
                {product?.quantity !== 0 ? (
                  <div className="position-absolute stock">còn hàng</div>
                ) : (
                  <div className="position-absolute is-stock">hết hàng</div>
                )}
                <Link to={`/${product.slug}`}>
                  <Card.Img
                    className="img-fluid"
                    src={
                      product.images && product.images.length
                        ? product.images[0].url
                        : ""
                    }
                    variant="top"
                  />
                </Link>

                <Card.Body>
                  <Link to={`/${product.slug}`}>
                    <span className="span">{product.title}</span>
                  </Link>

                  <Link to={`/${product.slug}`} className="price">
                    Giá từ {formatCash(`${product.price}`)}đ
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoryHome;
