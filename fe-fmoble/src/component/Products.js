import React from "react";
import { Card } from "react-bootstrap";
import products from "../product";

const Products = ({ products }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/products/${products._id}`}>
        <Card.Img src={products.image} variant="top" />
      </a>
      <Card.Body>
        <a href={`/products/${products._id}`}>
          <Card.Title as="div">
            <strong>{products.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <div className="my-3">
            {products.rating} from {products.numReviews} reviews
          </div>
        </Card.Text>
        <Card.Text as="h3">{products.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Products;
