import React from "react";
import Rating from "./Rating";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <div>
      <Card className="my-3 p-3 rounded">
        <a href={`/products/${product._id}`}>
          <Card.Img src={product.image} variant="top" className="" />
        </a>
        <Card.Body>
          <a href={`/products/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </a>
        </Card.Body>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card>
    </div>
  );
};

export default Product;
