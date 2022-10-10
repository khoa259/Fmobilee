import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../component/Rating";
import product from "../product";
import { useParams } from "react-router-dom";

const ProductsScreen = () => {
  const { id } = useParams();
  const Products = product.find((p) => p._id === id);
  return (
    <>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={Products.image} alt={Products.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{Products.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={Products.rating}
                text={`${Products.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${Products.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: ${Products.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{Products.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {Products.countInStock > 0 ? "In Stock" : "Out In Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={Products.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductsScreen;
